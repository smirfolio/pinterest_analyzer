# Backend — Creatives Design Analyser

FastAPI backend for the AI Image Analysis POC.

## Prerequisites
- Python ≥ 3.11
- A virtual environment

## Setup
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env       # fill in OPENAI_API_KEY + AI_PROVIDER_URL + OPENAI_MODEL + NEXTAUTH_SECRET
```

## Run
```bash
uvicorn app.main:app --reload --port 8000
```

- API root:  http://localhost:8000/
- Health:    http://localhost:8000/api/health
- Swagger:   http://localhost:8000/docs

## Environment

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `OPENAI_API_KEY` | yes | — | API key for the configured provider |
| `AI_PROVIDER_URL` | no | _(unset → OpenAI)_ | Any OpenAI-compatible endpoint. Examples: `https://api.cerebras.ai/v1`, `http://localhost:11434/v1` (Ollama), `http://localhost:8000/v1` (vLLM). |
| `OPENAI_MODEL` | no | `gpt-4o-mini` | Vision-capable model on your provider. On Cerebras the only vision-capable model is `gemma-4-31b`. |
| `NEXTAUTH_SECRET` | yes | — | HS256 secret shared with the frontend |
| `ALLOWED_ORIGINS` | no | `http://localhost:3000` | CORS allowlist (comma-separated) |
| `MAX_UPLOAD_MB` | no | `10` | Per-image size limit (in MB) |

## Hardcoded processing limits

These are intentionally **not** env-configurable — changing them would break the batching contract with the AI provider.

| Constant | Value | Effect |
|---|---|---|
| `MAX_REFERENCE_IMAGES` | `10` | Reject uploads above this with HTTP 413 |
| `LLM_BATCH_SIZE` | `5` | References are split into chunks of this size before each LLM call. Matches Cerebras's multimodal cap. |
| `TOP_WINNERS_PER_BATCH` | `2` | The top-N scoring winners per chunk are promoted to the theme round |

## Endpoints

### `POST /api/upload`
Accepts `multipart/form-data` with one or more image files (JPEG / PNG / WEBP). Returns descriptors (UUID + metadata) the analyzer endpoint can later reference.

- 413 if `len(files) > MAX_REFERENCE_IMAGES`
- 415 for unsupported MIME types
- 413 for files exceeding `MAX_UPLOAD_MB`

### `POST /api/analyze`
Body:
```json
{
  "image_ids": ["uuid-1", "uuid-2", "..."],
  "product_image_id": "uuid-product",   // optional
  "prompt": "...",                        // ignored if use_default_prompt=true
  "use_default_prompt": true
}
```

Response (`AnalysisResult`):
```jsonc
{
  "results": [ /* ALL N ImageAnalysis, original order */ ],
  "winner_index": 7,
  "overall_summary": "Analyzed 10 references in 2 batches...",
  "batches": [
    { "batch_index": 0, "results": [...], "winner_indices": [2, 0] },
    { "batch_index": 1, "results": [...], "winner_indices": [4, ...] }
  ],
  "theme_analysis": {            // only when product uploaded
    "cohesive_theme": "...",
    "product_description": "...",
    "best_match_local_index": 1,
    "match_reason": "..."
  },
  "product_match": { "best_inspiration_index": 2, ... }  // mirrors theme_analysis
}
```

#### Internal flow (transparent to the API caller)
1. **Validate** counts (`len(image_ids) ≤ MAX_REFERENCE_IMAGES`) and image existence.
2. **Split** references into chunks of `LLM_BATCH_SIZE`.
3. **Score** each chunk in parallel via `asyncio.gather` — each call returns per-image scores + color palette + color trend + inspired products + image-generation prompt.
4. **Promote** the top `TOP_WINNERS_PER_BATCH` per chunk by aggregate score.
5. **(Optional)** if a `product_image_id` is supplied, run **one** additional LLM call with the shortlist (≤4) + product (1) = ≤5 images. The LLM returns a cohesive theme and the local index of the winner that best fits the product.
6. **Merge** results into a single ordered list (`results`) — the user always sees every analysis.

## Test
```bash
pytest -q        # 33 tests, including batching + theme round coverage
```

## Project layout

```
backend/app
├── api/routes
│   ├── analyze.py        # batched + theme round
│   ├── health.py
│   ├── images.py         # static serving for stored uploads
│   └── upload.py         # bounded by MAX_REFERENCE_IMAGES
├── core
│   └── security.py       # JWT validation
├── schemas
│   └── analysis.py       # ImageAnalysis, BatchAnalysis, ThemeAnalysis, …
├── services
│   ├── image_processor.py   # Pillow preprocessing
│   ├── image_store.py       # in-memory image store
│   ├── image_validator.py   # MIME / size checks
│   ├── llm_service.py       # AsyncOpenAI wrapper + aggregate_score()
│   └── prompts.py           # DEFAULT_PROMPT + THEME_PROMPT
├── config.py             # pydantic-settings + batch constants
└── main.py               # FastAPI app
```