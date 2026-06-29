"""LLM service — thin async wrapper around OpenAI multimodal SDK.

The wrapper is intentionally provider-aware but provider-agnostic at the
call site: ``analyze_images`` accepts ``list[bytes]`` (JPEG) and a prompt
and returns a parsed dict. Provider swapping means replacing this module.
"""

from __future__ import annotations

import asyncio
import base64
import json
import logging
import time
from enum import Enum
from typing import Any, Sequence

from openai import AsyncOpenAI

from app.config import settings

logger = logging.getLogger(__name__)


class LLMProvider(str, Enum):
    OPENAI = "openai"


class LLMError(Exception):
    """Raised when the LLM provider fails in a non-recoverable way."""

    def __init__(self, message: str, status_code: int = 502) -> None:
        super().__init__(message)
        self.status_code = status_code


_client: AsyncOpenAI | None = None


def get_client() -> AsyncOpenAI:
    """Singleton accessor for the AsyncOpenAI client.

    When ``settings.AI_PROVIDER_URL`` is set, the client is created with a
    custom ``base_url`` so any OpenAI-compatible endpoint (e.g. local Ollama,
    vLLM, LM Studio, Azure OpenAI) can be used without code changes.
    """
    global _client
    if _client is None:
        kwargs: dict[str, Any] = {"api_key": settings.OPENAI_API_KEY}
        if settings.AI_PROVIDER_URL:
            kwargs["base_url"] = settings.AI_PROVIDER_URL
            logger.info("llm.provider base_url=%s", settings.AI_PROVIDER_URL)
        _client = AsyncOpenAI(**kwargs)
    return _client


def reset_client_for_tests() -> None:
    global _client
    _client = None


def _build_messages(images: Sequence[bytes], prompt: str) -> list[dict[str, Any]]:
    """Build a single user message containing the prompt and all images."""
    content: list[dict[str, Any]] = [{"type": "text", "text": prompt}]
    for img in images:
        b64 = base64.b64encode(img).decode("ascii")
        content.append(
            {
                "type": "image_url",
                "image_url": {"url": f"data:image/jpeg;base64,{b64}"},
            }
        )
    return [{"role": "user", "content": content}]


def aggregate_score(analysis: dict[str, Any]) -> int:
    """Sum of all 7 criterion scores. Used to pick top-winners deterministically."""
    scores = (analysis.get("scores") or {})
    return sum(int(scores.get(k, 0) or 0) for k in (
        "attractiveness",
        "color_balance",
        "selling_idea",
        "trending_viral_concept",
        "marketing_message",
        "product_presentation",
        "value_message",
    ))


async def analyze_images(
    images: list[bytes],
    prompt: str,
    *,
    model: str | None = None,
    max_retries: int = 3,
) -> dict[str, Any]:
    """Send ``images`` + ``prompt`` to the configured LLM and parse the JSON.

    Retries with exponential backoff (max ``max_retries`` attempts). Raises
    ``LLMError`` on failure.
    """
    if not images:
        raise LLMError("No images provided", status_code=400)

    client = get_client()
    model_name = model or settings.OPENAI_MODEL
    messages = _build_messages(images, prompt)

    last_err: Exception | None = None
    for attempt in range(1, max_retries + 1):
        started = time.perf_counter()
        try:
            logger.info(
                "llm.analyze attempt=%s model=%s images=%s",
                attempt,
                model_name,
                len(images),
            )
            response = await client.chat.completions.create(
                model=model_name,
                messages=messages,
                response_format={"type": "json_object"},
                temperature=0.4,
            )
            elapsed_ms = int((time.perf_counter() - started) * 1000)
            logger.info("llm.analyze ok images=%s latency_ms=%s", len(images), elapsed_ms)
            content = response.choices[0].message.content or "{}"
            return json.loads(content)
        except Exception as exc:  # noqa: BLE001
            last_err = exc
            elapsed_ms = int((time.perf_counter() - started) * 1000)
            logger.warning(
                "llm.analyze failed attempt=%s latency_ms=%s err=%s",
                attempt,
                elapsed_ms,
                exc,
            )
            if attempt < max_retries:
                await asyncio.sleep(2 ** (attempt - 1))

    raise LLMError(f"LLM analysis failed: {last_err}", status_code=502)