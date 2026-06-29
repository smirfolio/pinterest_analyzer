"""Analyze route — calls the LLM and returns a structured AnalysisResult.

Multi-batch flow (transparent to the user):

1. Validate image_ids (max ``MAX_REFERENCE_IMAGES``).
2. Split references into chunks of ``LLM_BATCH_SIZE``.
3. For each chunk, ask the LLM to score / inspire.
4. Pick the top ``TOP_WINNERS_PER_BATCH`` winners per chunk.
5. If a product image was supplied, run ONE additional call with
   the shortlist + product image to obtain ``theme_analysis``.
6. Return the merged ``results`` (all references, original order) plus
   per-batch metadata so the UI can show "winners from batch X" badges.
"""

from __future__ import annotations

import asyncio
import logging
import time

from fastapi import APIRouter, Depends, HTTPException, Request, status

from app import config as app_config
from app.config import LLM_BATCH_SIZE, TOP_WINNERS_PER_BATCH, settings
from app.core.security import get_optional_user
from app.schemas.analysis import (
    AnalyzeRequest,
    AnalyzeResponse,
    AnalysisResult,
    BatchAnalysis,
    ImageAnalysis,
    ProductMatch,
    ThemeAnalysis,
)
from app.services.llm_service import LLMError, aggregate_score, analyze_images
from app.services.prompts import (
    CUSTOM_PROMPT_MAX_CHARS,
    DEFAULT_PROMPT,
    THEME_PROMPT,
)
from app.services.image_store import IMAGE_STORE

logger = logging.getLogger(__name__)

router = APIRouter()


def _load_payload(image_id: str) -> bytes:
    stored = IMAGE_STORE.get(image_id)
    if stored is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Image {image_id} not found",
        )
    return stored.optimized_bytes or stored.raw_bytes


def _load_stored(image_id: str):
    stored = IMAGE_STORE.get(image_id)
    if stored is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Image {image_id} not found",
        )
    return stored


def _resolve_prompt(req: AnalyzeRequest) -> tuple[str, bool]:
    """Return (prompt_to_use, was_custom)."""
    if req.use_default_prompt:
        return DEFAULT_PROMPT, False

    custom = (req.prompt or "").strip()
    if not custom:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Custom prompt cannot be empty when use_default_prompt is False",
        )
    if len(custom) > CUSTOM_PROMPT_MAX_CHARS:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Custom prompt exceeds {CUSTOM_PROMPT_MAX_CHARS} characters",
        )
    logger.info("analyze.custom_prompt chars=%s", len(custom))
    return custom, True


def _renumber_results(results: list[dict], offset: int) -> list[dict]:
    """Re-stamp ``image_index`` so each result has a global index in [0..N-1]."""
    for r in results:
        if "image_index" in r:
            r["image_index"] = offset + int(r["image_index"])
    return results


async def _score_batch(
    batch_index: int,
    images: list[bytes],
    prompt: str,
) -> BatchAnalysis:
    """Score one batch and return its parsed BatchAnalysis."""
    parsed = await analyze_images(images, prompt)
    offset = batch_index * LLM_BATCH_SIZE
    _renumber_results(parsed.get("results", []), offset)
    batch = BatchAnalysis.model_validate(
        {
            "batch_index": batch_index,
            "results": parsed.get("results", []),
            "winner_indices": [],
        }
    )
    # Pick top winners by aggregate score.
    scored = sorted(
        enumerate(batch.results),
        key=lambda kv: aggregate_score(kv[1].model_dump()),
        reverse=True,
    )
    top_k = min(TOP_WINNERS_PER_BATCH, len(scored))
    batch.winner_indices = [local for local, _ in scored[:top_k]]
    return batch


async def _theme_round(
    winner_images: list[bytes],
    winner_global_indices: list[int],
    product_bytes: bytes,
    product_filename: str,
) -> ThemeAnalysis:
    """Single-shot theme call: shortlist (≤4) + product (1) = ≤5 images."""
    parsed = await analyze_images(
        winner_images + [product_bytes],
        THEME_PROMPT,
    )
    # The LLM must only return theme fields; reject anything else defensively.
    return ThemeAnalysis.model_validate(parsed)


@router.post(
    "/analyze",
    response_model=AnalyzeResponse,
    summary="Run a multimodal analysis over the supplied images",
)
async def analyze(
    req: AnalyzeRequest,
    request: Request,
    current_user: dict | None = Depends(get_optional_user),
) -> AnalyzeResponse:
    started = time.perf_counter()

    prompt, was_custom = _resolve_prompt(req)

    # ------------------------------------------------------------------
    # 1. Validate counts (hardcoded)
    # ------------------------------------------------------------------
    if len(req.image_ids) > app_config.MAX_REFERENCE_IMAGES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=(
                f"Too many reference images ({len(req.image_ids)}). "
                f"App limit is {app_config.MAX_REFERENCE_IMAGES} per request."
            ),
        )

    # Validate every id up front so the LLM never sees a missing image.
    for image_id in req.image_ids:
        if IMAGE_STORE.get(image_id) is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Image {image_id} not found",
            )

    images: list[bytes] = [_load_payload(iid) for iid in req.image_ids]

    product_filename: str | None = None
    product_bytes: bytes | None = None
    if req.product_image_id:
        if IMAGE_STORE.get(req.product_image_id) is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Product image {req.product_image_id} not found",
            )
        product_bytes = _load_payload(req.product_image_id)
        product_filename = _load_stored(req.product_image_id).filename

    # ------------------------------------------------------------------
    # 2. Split into batches of LLM_BATCH_SIZE and run them in parallel
    # ------------------------------------------------------------------
    batches_in: list[list[bytes]] = [
        images[i : i + LLM_BATCH_SIZE] for i in range(0, len(images), LLM_BATCH_SIZE)
    ]
    logger.info(
        "analyze.start user=%s images=%s batches=%s product=%s",
        current_user,
        len(images),
        len(batches_in),
        bool(product_bytes),
    )
    try:
        batches: list[BatchAnalysis] = list(
            await asyncio.gather(
                *[_score_batch(idx, chunk, prompt) for idx, chunk in enumerate(batches_in)]
            )
        )
    except LLMError as exc:
        logger.error("analyze.llm_error user=%s err=%s", current_user, exc)
        raise HTTPException(status_code=exc.status_code, detail=str(exc))

    # Merge per-batch results into the global ``results`` list (original order).
    merged_results: list[ImageAnalysis] = []
    for batch in batches:
        merged_results.extend(batch.results)

    # Global winner = highest aggregate score across ALL references.
    global_winner_idx = max(
        range(len(merged_results)),
        key=lambda i: aggregate_score(merged_results[i].model_dump()),
    )

    # ------------------------------------------------------------------
    # 3. Theme round (if product uploaded)
    # ------------------------------------------------------------------
    theme_analysis: ThemeAnalysis | None = None
    product_match: ProductMatch | None = None

    if product_bytes is not None:
        # Pick the global indices of every winner across every batch, in
        # original order so the LLM sees them sorted.
        winner_global_indices: list[int] = []
        for batch in batches:
            for local in batch.winner_indices:
                winner_global_indices.append(batch.batch_index * LLM_BATCH_SIZE + local)

        if winner_global_indices:
            winner_global_indices.sort()
            winner_images = [images[i] for i in winner_global_indices]
            try:
                theme = await _theme_round(
                    winner_images,
                    winner_global_indices,
                    product_bytes,
                    product_filename or "product",
                )
                theme_analysis = theme
                # The best-match local index in the theme call corresponds
                # to the shortlist position, which equals position in
                # ``winner_global_indices``.
                best_global = winner_global_indices[theme.best_match_local_index]
                product_match = ProductMatch(
                    best_inspiration_index=best_global,
                    product_description=theme.product_description,
                    match_reason=theme.match_reason,
                )
            except LLMError as exc:
                logger.error("analyze.theme_round_failed user=%s err=%s", current_user, exc)
                raise HTTPException(status_code=exc.status_code, detail=str(exc))
            except Exception as exc:  # noqa: BLE001
                # ValidationError or any other parse failure → 502 so the
                # caller knows the theme step blew up.
                logger.error(
                    "analyze.theme_round_invalid user=%s err=%s", current_user, exc
                )
                raise HTTPException(
                    status_code=status.HTTP_502_BAD_GATEWAY,
                    detail=f"LLM theme response did not match expected schema: {exc}",
                )
        else:
            logger.warning("analyze.no_winners user=%s", current_user)

    # ------------------------------------------------------------------
    # 4. Build response (overall_summary is the best per-batch one when
    #    multi-batch, else reuse the only batch's).
    # ------------------------------------------------------------------
    overall_summary = ""
    if len(batches) == 1 and batches[0].results:
        # Re-parse the batch raw dict to recover overall_summary cleanly.
        # Simpler: parse again — but to avoid an extra LLM call, reuse a
        # precomputed string built from the top winner.
        top = merged_results[global_winner_idx]
        overall_summary = (
            f"Top pick is image #{global_winner_idx + 1} "
            f"({top.summary}) with confidence {top.confidence}%."
        )
    else:
        top = merged_results[global_winner_idx]
        overall_summary = (
            f"Analyzed {len(merged_results)} references in {len(batches)} batches. "
            f"Top pick is image #{global_winner_idx + 1} "
            f"({top.summary}) with confidence {top.confidence}%."
        )

    result = AnalysisResult(
        results=merged_results,
        winner_index=global_winner_idx,
        overall_summary=overall_summary,
        batches=batches,
        theme_analysis=theme_analysis,
        product_match=product_match,
    )

    elapsed_ms = int((time.perf_counter() - started) * 1000)
    base = str(request.base_url).rstrip("/")
    image_urls = [f"{base}/api/images/{iid}" for iid in req.image_ids]
    product_image_url = (
        f"{base}/api/images/{req.product_image_id}" if req.product_image_id else None
    )

    logger.info(
        "analyze.ok user=%s images=%s batches=%s winners=%s theme=%s latency_ms=%s",
        current_user,
        len(images),
        len(batches),
        sum(len(b.winner_indices) for b in batches),
        bool(theme_analysis),
        elapsed_ms,
    )

    prompt_echo = prompt if len(prompt) <= 500 else prompt[:500] + "…"
    return AnalyzeResponse(
        analysis=result,
        image_urls=image_urls,
        product_image_url=product_image_url,
        prompt_used=prompt_echo,
        custom_prompt=was_custom,
    )