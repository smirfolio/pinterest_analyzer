# Creatives Design Analyser

AI-powered image analysis for marketing creatives — upload up to 10 reference images, optionally drop in your own product, and get back per-criterion scoring, color trend analysis, inspired product directions (cosmetics, health, 3D printing, …), ready-to-use image-generation prompts for background scenes, and a cross-batch theme match against your product.

The LLM provider is swappable through a single env var (`AI_PROVIDER_URL`) — works with OpenAI, [Cerebras](https://inference-docs.cerebras.ai/), Ollama, vLLM, LM Studio, etc. Batching and the theme round stay transparent to the user.

## Architecture

```
┌──────────────┐   HTTP/JSON    ┌──────────────────┐   OpenAI SDK          ┌────────────────┐
│   Next.js    │ ─────────────► │   FastAPI        │ ────────────────────► │  OpenAI-compat │
│  (App Router │                │   (Python 3)     │   batched chunks      │  LLM (vision)  │
│  + Tailwind) │ ◄───────────── │   + Pillow       │ ◄──────────────────── │  e.g. Cerebras │
└──────────────┘   JWT (NextAuth)│   + batching     │                       │  gemma-4-31b   │
       ▲                       └──────────────────┘                       └────────────────┘
       │                                ▲
    NextAuth                          pyjwt
    (JWT)                            (HS256)
```

### Batch + theme flow (transparent to users)

```
N reference images (N ≤ 10)               + 1 product (optional)
   │
   ├─── split into chunks of 5 (Cerebras cap)
   │
   ├─── LLM call #1..#K  (scored in parallel via asyncio.gather)
   │       each returns per-image: scores + color palette + trend
   │                            + inspired products + background prompt
   │
   ├─── pick top-2 winners per chunk (deterministic, by aggregate score)
   │
   └─── if product uploaded:
           LLM call #K+1   shortlist (≤4) + product (1) = ≤5 images
              returns: cohesive_theme + product_description
                     + best_match_local_index + match_reason
```

`AnalysisResult.results` always contains **all N analyses in original order** — batching is invisible to the API caller. `AnalysisResult.batches` carries per-batch metadata (so the UI can label "Batch winner" cards), and `AnalysisResult.theme_analysis` carries the cross-batch product match.

## Repository Layout

```
.
├── backend/                Python · FastAPI · Pillow · OpenAI SDK
│   ├── app/
│   │   ├── api/routes/     health, upload, analyze
│   │   ├── core/           security (JWT)
│   │   ├── schemas/        Pydantic models (ImageAnalysis, BatchAnalysis, ThemeAnalysis, …)
│   │   ├── services/       image_processor, image_store, image_validator, llm_service, prompts
│   │   ├── config.py       pydantic-settings + hardcoded batch/winner caps
│   │   └── main.py         FastAPI app
│   ├── alembic/            DB migrations (production-grade schema)
│   └── requirements.txt
└── frontend/               Next.js 14 · TypeScript · TailwindCSS · NextAuth
    ├── app/                App Router pages
    ├── components/         UploadZone, AnalysisCard, ThemeAnalysisCard, BatchSummary, …
    ├── lib/                API client, helpers
    └── types/              TypeScript mirrors of backend schemas
```

## Prerequisites
- Python ≥ 3.11
- Node.js ≥ 20
- An API key for an OpenAI-compatible multimodal provider (OpenAI, Cerebras, …)

## Setup

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env       # then edit OPENAI_API_KEY (+ AI_PROVIDER_URL + OPENAI_MODEL)
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local  # then edit NEXTAUTH_SECRET
npm run dev
```

Open http://localhost:3000.

## Environment Variables

| Service | Variable | Default | Purpose |
|---|---|---|---|
| backend | `OPENAI_API_KEY` | — | API key for the multimodal provider |
| backend | `AI_PROVIDER_URL` | _(unset)_ | Optional. Swap to any OpenAI-compatible endpoint (`https://api.cerebras.ai/v1`, `http://localhost:11434/v1`, …). Leave unset for the official OpenAI API. |
| backend | `OPENAI_MODEL` | `gpt-4o-mini` | Vision-capable model on your provider. Cerebras: `gemma-4-31b`. |
| backend | `NEXTAUTH_SECRET` | — | HS256 secret shared with frontend |
| backend | `ALLOWED_ORIGINS` | `http://localhost:3000` | CORS allowlist (comma-separated) |
| backend | `MAX_UPLOAD_MB` | `10` | Per-image size limit |
| frontend | `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:8000` | FastAPI base URL |
| frontend | `NEXT_PUBLIC_MAX_UPLOAD_MB` | `10` | Mirror of backend `MAX_UPLOAD_MB` for client-side pre-check |
| frontend | `NEXTAUTH_SECRET` | — | Must match backend `NEXTAUTH_SECRET` |
| frontend | `NEXTAUTH_URL` | `http://localhost:3000` | Used by NextAuth callbacks |

### Hardcoded processing limits
The following are intentionally **not** env-configurable — changing them would silently break the batching contract with Cerebras.

| Constant | Value | Where |
|---|---|---|
| `MAX_REFERENCE_IMAGES` | `10` | `app/config.py` — upload cap |
| `LLM_BATCH_SIZE` | `5` | `app/config.py` — max images per LLM call (Cerebras cap) |
| `TOP_WINNERS_PER_BATCH` | `2` | `app/config.py` — winners promoted to the theme round |

## Tests
- Backend: `cd backend && pytest -q` (33 tests)
- Frontend: `cd frontend && npm run build`

## Known Limitations (POC scope)
- `IMAGE_STORE` is in-memory — images and analyses are lost when the backend restarts.
- Auth is skeleton-level: any email is accepted via the NextAuth credentials provider.
- The PostgreSQL schema in `backend/alembic/versions/` exists for upgrade-path demonstration but is **not** wired into the running POC.
- LLM outputs are validated server-side; if the provider returns malformed JSON the route returns 502 (Retry on the toast).

## User Story Status

| ID | Title | Status |
|---|---|---|
| US-001 | Bootstrap Monorepo | ✅ |
| US-002 | FastAPI Project Structure | ✅ |
| US-003 | Health Check & CORS | ✅ |
| US-004 | Image Upload Endpoint | ✅ |
| US-005 | Image Validation | ✅ |
| US-006 | Image Preprocessing (Pillow) | ✅ |
| US-007 | Static File Serving | ✅ |
| US-008 | LLM Service Wrapper | ✅ |
| US-009 | Default Prompt Template | ✅ |
| US-010 | Pydantic Schemas | ✅ |
| US-011 | Analyze Endpoint (Default) | ✅ |
| US-012 | Analyze Endpoint (Custom) | ✅ |
| US-013 | Next.js Base Layout | ✅ |
| US-014 | API Client | ✅ |
| US-015 | Drag-and-Drop Upload Zone | ✅ |
| US-016 | Image Preview Thumbnails | ✅ |
| US-017 | Default Prompt Toggle | ✅ |
| US-018 | Custom Prompt Textarea | ✅ |
| US-019 | Analyze Button + Loading | ✅ |
| US-020 | Per-Image Analysis Card | ✅ |
| US-021 | Score Visualization | ✅ |
| US-022 | Comparison Dashboard | ✅ |
| US-023 | Winner Banner | ✅ |
| US-024 | NextAuth Skeleton | ✅ |
| US-025 | Protected Route | ✅ |
| US-026 | FastAPI JWT Validation | ✅ |
| US-027 | Token Forwarding | ✅ |
| US-028 | Error Handling | ✅ |
| US-029 | Dark/Light Mode | ✅ |
| US-030 | Responsive Layout | ✅ |
| US-031 | E2E Smoke Runbook | ✅ |
| US-032 | README & Onboarding | ✅ |
| US-033 | Swappable LLM provider (`AI_PROVIDER_URL`) | ✅ |
| US-034 | Inspiring per-image output (color palette, trend, product ideas, image-gen prompt) | ✅ |
| US-035 | Product upload + match (single-batch flow) | ✅ |
| US-036 | 10-image hard cap + client-side counter | ✅ |
| US-037 | Transparent batch processing (5/LLM call, top-2 winners) | ✅ |
| US-038 | Cross-batch cohesive theme round against uploaded product | ✅ |

See `RUNBOOK.md` for the full E2E walkthrough.