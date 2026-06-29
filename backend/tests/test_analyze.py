"""Tests for US-008/009/010/011/012 — LLM service + analyze endpoint."""

from __future__ import annotations

from io import BytesIO
from typing import Callable

import pytest

from app.services.llm_service import LLMError, analyze_images
from app.services.image_store import IMAGE_STORE
from tests._helpers import make_jpeg


# ---------------------------------------------------------------------------
# US-009 — prompts
# ---------------------------------------------------------------------------

def test_default_prompt_is_non_empty_and_has_schema():
    from app.services.prompts import DEFAULT_PROMPT

    assert len(DEFAULT_PROMPT) > 200
    assert "results" in DEFAULT_PROMPT
    for k in (
        "attractiveness",
        "color_balance",
        "selling_idea",
        "trending_viral_concept",
        "marketing_message",
        "product_presentation",
        "value_message",
    ):
        assert k in DEFAULT_PROMPT
    assert "Return ONLY valid JSON" in DEFAULT_PROMPT or "ONLY the JSON" in DEFAULT_PROMPT

    for k in (
        "color_palette",
        "color_trend",
        "inspired_products",
        "background_scene_prompt",
        "cosmetics",
        "health_product",
        "3d_printing",
    ):
        assert k in DEFAULT_PROMPT, f"missing token in prompt: {k}"


def test_theme_prompt_requests_cohesive_theme():
    from app.services.prompts import THEME_PROMPT

    for k in ("cohesive_theme", "product_description", "best_match_local_index", "match_reason"):
        assert k in THEME_PROMPT, f"missing token in theme prompt: {k}"


# ---------------------------------------------------------------------------
# US-010 — Pydantic schemas
# ---------------------------------------------------------------------------

def test_analysis_result_schema_validation():
    from app.schemas.analysis import AnalysisResult

    valid = {
        "results": [
            {
                "image_index": 0,
                "scores": {k: 7 for k in (
                    "attractiveness",
                    "color_balance",
                    "selling_idea",
                    "trending_viral_concept",
                    "marketing_message",
                    "product_presentation",
                    "value_message",
                )},
                "summary": "ok",
                "strongest_criterion": "color_balance",
                "weakest_criterion": "selling_idea",
                "recommendation": "try X",
                "confidence": 80,
            }
        ],
        "winner_index": 0,
        "overall_summary": "good",
        "batches": [{"batch_index": 0, "results": [], "winner_indices": []}],
    }
    res = AnalysisResult.model_validate(valid)
    assert res.results[0].confidence == 80

    bad = {**valid, "results": [{**valid["results"][0], "confidence": 150}]}
    with pytest.raises(Exception):
        AnalysisResult.model_validate(bad)


def test_analyze_request_empty_image_ids_rejected():
    from app.schemas.analysis import AnalyzeRequest

    with pytest.raises(Exception):
        AnalyzeRequest(image_ids=[])


# ---------------------------------------------------------------------------
# US-008 — LLM service (mocked)
# ---------------------------------------------------------------------------

class _FakeMessage:
    def __init__(self, content: str) -> None:
        self.content = content


class _FakeChoice:
    def __init__(self, content: str) -> None:
        self.message = _FakeMessage(content)


class _FakeResponse:
    def __init__(self, content: str) -> None:
        self.choices = [_FakeChoice(content)]


class _FakeChatCompletions:
    """Returns payloads from a queue (one per call). When the queue is empty,
    the last payload is replayed. Supports ``fail_first_n`` to inject errors."""

    def __init__(self, payloads: list[str], fail_first_n: int = 0) -> None:
        self._payloads = payloads or ["{}"]
        self._fails = fail_first_n
        self.calls = 0
        self.kwargs_history: list[dict] = []

    async def create(self, **kwargs):
        self.kwargs_history.append(kwargs)
        self.calls += 1
        if self.calls <= self._fails:
            raise RuntimeError("upstream down")
        idx = min(self.calls - 1 - self._fails, len(self._payloads) - 1)
        return _FakeResponse(self._payloads[idx])


class _FakeChat:
    def __init__(self, payloads: list[str], fail_first_n: int = 0) -> None:
        self.completions = _FakeChatCompletions(payloads, fail_first_n)


class _FakeAsyncOpenAI:
    def __init__(self, payloads: list[str], fail_first_n: int = 0) -> None:
        self.chat = _FakeChat(payloads, fail_first_n)


def _install_fake(
    monkeypatch,
    payloads: list[str] | str,
    fail_first_n: int = 0,
) -> _FakeAsyncOpenAI:
    if isinstance(payloads, str):
        payloads = [payloads]
    fake = _FakeAsyncOpenAI(payloads, fail_first_n)
    monkeypatch.setattr("app.services.llm_service.AsyncOpenAI", lambda *a, **k: fake)
    from app.services import llm_service as svc
    svc.reset_client_for_tests()
    return fake


@pytest.mark.asyncio
async def test_analyze_images_returns_parsed_dict(monkeypatch):
    payload = '{"results":[{"image_index":0,"scores":{"attractiveness":9,"color_balance":8,"selling_idea":7,"trending_viral_concept":6,"marketing_message":8,"product_presentation":7,"value_message":9},"summary":"nice","strongest_criterion":"attractiveness","weakest_criterion":"trending_viral_concept","recommendation":"more viral hooks","confidence":85}],"winner_index":0,"overall_summary":"best overall"}'
    fake = _install_fake(monkeypatch, payload)
    out = await analyze_images([make_jpeg()], "PROMPT")
    assert out["winner_index"] == 0
    assert fake.chat.completions.calls == 1


@pytest.mark.asyncio
async def test_analyze_images_retries_then_raises(monkeypatch):
    from app.services import llm_service as svc

    _install_fake(monkeypatch, "{}", fail_first_n=5)
    svc.settings.OPENAI_MODEL = "gpt-4o-mini"
    with pytest.raises(LLMError):
        await analyze_images([make_jpeg()], "PROMPT", max_retries=2)


# ---------------------------------------------------------------------------
# US-011 / US-012 — analyze endpoint
# ---------------------------------------------------------------------------

def _img_result_payload(local_idx: int, score: int) -> str:
    """One ImageAnalysis entry. ``local_idx`` is what the LLM emits (0-based
    inside the batch); ``score`` is the value for ALL seven criteria so the
    aggregate score is simply ``7 * score``."""
    return (
        f'{{"image_index":{local_idx},'
        f'"scores":{{"attractiveness":{score},"color_balance":{score},'
        f'"selling_idea":{score},"trending_viral_concept":{score},'
        f'"marketing_message":{score},"product_presentation":{score},'
        f'"value_message":{score}}},'
        f'"summary":"img {local_idx}","strongest_criterion":"color_balance",'
        f'"weakest_criterion":"selling_idea","recommendation":"x","confidence":80,'
        f'"color_palette":["#000000"],"color_trend":"t",'
        f'"inspired_products":[],"background_scene_prompt":"b"}}'
    )


def _batch_payload(
    batch_index: int,
    count: int,
    winner_local: int,
    *,
    winner_score: int = 9,
    base_score: int = 6,
) -> str:
    """Generate a batch response. The LLM emits local ``image_index``
    0..count-1; the route re-stamps with ``batch_index * LLM_BATCH_SIZE``.
    Winner has score ``winner_score``, others have ``base_score``."""
    results = ",".join(
        _img_result_payload(i, winner_score if i == winner_local else base_score)
        for i in range(count)
    )
    return (
        f'{{"results":[{results}],'
        f'"winner_index":{winner_local},"overall_summary":"batch {batch_index}"}}'
    )


def _theme_payload(best_local: int) -> str:
    return (
        '{"cohesive_theme":"warm minimalism ties winners together",'
        '"product_description":"amber dropper bottle",'
        f'"best_match_local_index":{best_local},'
        '"match_reason":"earth tones echo the amber glass"}'
    )


GOOD_PAYLOAD = _batch_payload(0, 1, 0)


@pytest.fixture(autouse=True)
def _clear_store():
    IMAGE_STORE.clear()
    yield
    IMAGE_STORE.clear()


def _upload_one(client) -> str:
    files = [("files", ("a.jpg", BytesIO(make_jpeg()), "image/jpeg"))]
    r = client.post("/api/upload", files=files)
    return r.json()["images"][0]["id"]


def _upload_n(client, n: int) -> list[str]:
    files = [
        ("files", (f"img_{i}.jpg", BytesIO(make_jpeg()), "image/jpeg"))
        for i in range(n)
    ]
    r = client.post("/api/upload", files=files)
    assert r.status_code == 201, r.text
    return [d["id"] for d in r.json()["images"]]


def test_analyze_default_prompt_mode(client, monkeypatch):
    _install_fake(monkeypatch, GOOD_PAYLOAD)
    image_id = _upload_one(client)
    r = client.post("/api/analyze", json={"image_ids": [image_id]})
    assert r.status_code == 200
    body = r.json()
    assert body["analysis"]["winner_index"] == 0
    assert body["custom_prompt"] is False
    assert body["image_urls"][0].endswith(f"/api/images/{image_id}")
    assert body["analysis"]["batches"][0]["batch_index"] == 0


def test_analyze_custom_prompt_used(client, monkeypatch):
    _install_fake(monkeypatch, GOOD_PAYLOAD)
    image_id = _upload_one(client)
    r = client.post(
        "/api/analyze",
        json={"image_ids": [image_id], "use_default_prompt": False, "prompt": "Focus on lighting"},
    )
    assert r.status_code == 200
    assert r.json()["custom_prompt"] is True
    assert "lighting" in r.json()["prompt_used"]


def test_analyze_default_flag_ignores_user_prompt(client, monkeypatch):
    _install_fake(monkeypatch, GOOD_PAYLOAD)
    image_id = _upload_one(client)
    r = client.post(
        "/api/analyze",
        json={
            "image_ids": [image_id],
            "use_default_prompt": True,
            "prompt": "should be ignored",
        },
    )
    assert r.status_code == 200
    assert "should be ignored" not in r.json()["prompt_used"]


def test_analyze_custom_empty_prompt_rejected(client, monkeypatch):
    _install_fake(monkeypatch, GOOD_PAYLOAD)
    image_id = _upload_one(client)
    r = client.post(
        "/api/analyze",
        json={"image_ids": [image_id], "use_default_prompt": False, "prompt": ""},
    )
    assert r.status_code == 422


def test_analyze_custom_prompt_too_long_rejected(client, monkeypatch):
    _install_fake(monkeypatch, GOOD_PAYLOAD)
    image_id = _upload_one(client)
    r = client.post(
        "/api/analyze",
        json={
            "image_ids": [image_id],
            "use_default_prompt": False,
            "prompt": "x" * 5000,
        },
    )
    assert r.status_code == 422


def test_analyze_unknown_image_id_404(client, monkeypatch):
    _install_fake(monkeypatch, GOOD_PAYLOAD)
    r = client.post("/api/analyze", json={"image_ids": ["does-not-exist"]})
    assert r.status_code == 404


def test_analyze_llm_failure_returns_502(client, monkeypatch):
    _install_fake(monkeypatch, "{}", fail_first_n=10)
    image_id = _upload_one(client)
    r = client.post("/api/analyze", json={"image_ids": [image_id]})
    assert r.status_code == 502


def test_analyze_response_includes_inspiring_fields(client, monkeypatch):
    payload = (
        '{"results":[{'
        '"image_index":0,"scores":{"attractiveness":9,"color_balance":8,"selling_idea":7,'
        '"trending_viral_concept":6,"marketing_message":8,"product_presentation":7,'
        '"value_message":9},"summary":"nice","strongest_criterion":"attractiveness",'
        '"weakest_criterion":"trending_viral_concept","recommendation":"more viral hooks",'
        '"confidence":85,'
        '"color_palette":["#E8C5B5","#5D4037","#F5E6D3"],'
        '"color_trend":"Warm earth tones tapping into quiet luxury.",'
        '"inspired_products":['
        '{"category":"cosmetics","name":"Velvet Glow Serum","rationale":"Soft rose-gold fits.","relevance_score":92},'
        '{"category":"health_product","name":"Adaptogen Tonic","rationale":"Earthy palette.","relevance_score":78},'
        '{"category":"3d_printing","name":"Bio-Print Vase","rationale":"Organic shapes.","relevance_score":71}'
        '],'
        '"background_scene_prompt":"Soft beige linen backdrop."'
        '}],'
        '"winner_index":0,"overall_summary":"best"}'
    )
    _install_fake(monkeypatch, payload)
    image_id = _upload_one(client)
    r = client.post("/api/analyze", json={"image_ids": [image_id]})
    assert r.status_code == 200
    body = r.json()
    first = body["analysis"]["results"][0]
    assert first["color_palette"] == ["#E8C5B5", "#5D4037", "#F5E6D3"]
    assert "quiet luxury" in first["color_trend"].lower()
    assert len(first["inspired_products"]) == 3
    cats = {p["category"] for p in first["inspired_products"]}
    assert {"cosmetics", "health_product", "3d_printing"} <= cats
    assert first["background_scene_prompt"]
    assert body["analysis"]["theme_analysis"] is None


def test_analyze_unknown_product_image_returns_404(client, monkeypatch):
    _install_fake(monkeypatch, GOOD_PAYLOAD)
    image_id = _upload_one(client)
    r = client.post(
        "/api/analyze",
        json={"image_ids": [image_id], "product_image_id": "does-not-exist"},
    )
    assert r.status_code == 404


# ---------------------------------------------------------------------------
# Hardcoded MAX_REFERENCE_IMAGES enforcement
# ---------------------------------------------------------------------------

def test_upload_batch_too_large_returns_413(client):
    from app.config import MAX_REFERENCE_IMAGES

    files = [
        ("files", (f"img_{i}.jpg", BytesIO(make_jpeg()), "image/jpeg"))
        for i in range(MAX_REFERENCE_IMAGES + 1)
    ]
    r = client.post("/api/upload", files=files)
    assert r.status_code == 413
    assert f"App limit is {MAX_REFERENCE_IMAGES}" in r.text


def test_analyze_too_many_images_returns_413(client, monkeypatch):
    # Upload while the default (generous) limit is in place, then tighten.
    _install_fake(monkeypatch, GOOD_PAYLOAD)
    ids = _upload_n(client, 3)
    import app.config as cfg
    original = cfg.MAX_REFERENCE_IMAGES
    cfg.MAX_REFERENCE_IMAGES = 2
    try:
        r = client.post("/api/analyze", json={"image_ids": ids})
        assert r.status_code == 413
        assert "App limit is 2" in r.text
    finally:
        cfg.MAX_REFERENCE_IMAGES = original


# ---------------------------------------------------------------------------
# Batching behaviour (transparent to user)
# ---------------------------------------------------------------------------

def test_six_references_split_into_two_batches(client, monkeypatch):
    """6 references → 2 LLM calls (5 + 1). Response still contains all 6."""
    payloads = [
        _batch_payload(0, 5, winner_local=3),
        _batch_payload(1, 1, winner_local=0),
    ]
    fake = _install_fake(monkeypatch, payloads)
    ids = _upload_n(client, 6)

    r = client.post("/api/analyze", json={"image_ids": ids})
    assert r.status_code == 200
    body = r.json()
    # All 6 analyses present, original order.
    assert len(body["analysis"]["results"]) == 6
    assert [a["image_index"] for a in body["analysis"]["results"]] == [0, 1, 2, 3, 4, 5]
    # Exactly 2 batches.
    assert len(body["analysis"]["batches"]) == 2
    assert [b["batch_index"] for b in body["analysis"]["batches"]] == [0, 1]
    # LLM was hit twice (no theme call because no product).
    assert fake.chat.completions.calls == 2
    # No theme analysis when no product uploaded.
    assert body["analysis"]["theme_analysis"] is None


def test_ten_references_produce_four_winners_and_theme_call(client, monkeypatch):
    """Max-cap flow: 10 refs → 2 batches of 5 → 4 winners → 1 theme call."""
    payloads = [
        _batch_payload(0, 5, winner_local=2),
        _batch_payload(1, 5, winner_local=4),
        _theme_payload(best_local=1),  # theme call (3rd LLM call)
    ]
    fake = _install_fake(monkeypatch, payloads)
    ids = _upload_n(client, 10)
    product_id = _upload_one(client)

    r = client.post(
        "/api/analyze",
        json={"image_ids": ids, "product_image_id": product_id},
    )
    assert r.status_code == 200
    body = r.json()
    assert len(body["analysis"]["results"]) == 10
    assert len(body["analysis"]["batches"]) == 2
    # 2 winners per batch (one with score 9 + the next-best with score 6).
    assert len(body["analysis"]["batches"][0]["winner_indices"]) == 2
    assert 2 in body["analysis"]["batches"][0]["winner_indices"]
    assert 4 in body["analysis"]["batches"][1]["winner_indices"]
    # Theme call happened.
    assert fake.chat.completions.calls == 3
    # Theme call saw 4 winners + 1 product = 5 images (the Cerebras cap).
    theme_kwargs = fake.chat.completions.kwargs_history[2]
    msgs = theme_kwargs["messages"]
    assert len(msgs) == 1
    content = msgs[0]["content"]
    images_in_call = sum(1 for c in content if c.get("type") == "image_url")
    assert images_in_call == 5
    # Theme analysis parsed.
    theme = body["analysis"]["theme_analysis"]
    assert theme is not None
    assert "warm minimalism" in theme["cohesive_theme"].lower()
    assert "amber" in theme["product_description"].lower()
    # best_match_local_index=1 → second winner in sorted ascending order.
    # Sort: [0, 2, 4, X] → index 1 → value 2.
    assert body["analysis"]["product_match"]["best_inspiration_index"] == 2
    assert body["product_image_url"].endswith(f"/api/images/{product_id}")


def test_global_winner_picked_across_batches(client, monkeypatch):
    """The single overall winner must come from ANY batch, not just batch 0."""
    payloads = [
        _batch_payload(0, 5, winner_local=0, winner_score=5, base_score=4),
        _batch_payload(1, 5, winner_local=2, winner_score=9, base_score=7),
    ]
    _install_fake(monkeypatch, payloads)
    ids = _upload_n(client, 10)

    r = client.post("/api/analyze", json={"image_ids": ids})
    assert r.status_code == 200
    body = r.json()
    # batch 0 max aggregate = 7*5 = 35, batch 1 max = 7*9 = 63 → global winner is
    # batch 1 local 2 → global 5*1 + 2 = 7.
    assert body["analysis"]["winner_index"] == 7


def test_theme_round_bad_payload_returns_502(client, monkeypatch):
    """Empty {} for theme round fails ThemeAnalysis validation → 502."""
    payloads = [
        _batch_payload(0, 5, winner_local=2),
        _batch_payload(1, 5, winner_local=4),
        "{}",  # missing required theme fields
    ]
    _install_fake(monkeypatch, payloads)
    ids = _upload_n(client, 10)
    product_id = _upload_one(client)

    r = client.post(
        "/api/analyze",
        json={"image_ids": ids, "product_image_id": product_id},
    )
    assert r.status_code == 502


def test_theme_round_upstream_error_returns_502(client, monkeypatch):
    """Force the 3rd call to raise; we expect the route to return 502."""
    payloads = [
        _batch_payload(0, 5, winner_local=2),
        _batch_payload(1, 5, winner_local=4),
    ]
    # 2 successes followed by infinite failures.
    _install_fake(monkeypatch, payloads, fail_first_n=99)
    ids = _upload_n(client, 10)
    product_id = _upload_one(client)

    r = client.post(
        "/api/analyze",
        json={"image_ids": ids, "product_image_id": product_id},
    )
    assert r.status_code == 502