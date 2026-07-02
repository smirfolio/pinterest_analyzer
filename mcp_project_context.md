# Project: Creatives design analyser

- **Project ID:** `517`
- **Status:** ENABLED
- **Created:** 2026-06-28 21:52:07.284965
- **Updated:** 2026-06-28 22:04:08.557942

---

## High-Level Description

Create an python app that would upload multiple images to be analysed with an multimodal llm ai model, the criteria of analyses is find most attractive, color balance, selling idea, trending and viral concept, maketing messag, well presented product, values messages
User must be able to select default prompt that would query an llm with exact instruction, or provide his own criteria, for now a simple input text where the user can write his own prompt and checkbox to select default prompt usage  with a placeholder of the default prompt, simple UI but mainfull output anaylizing, slik UI modern layout

---

## Elaborated Description & Advice

# Project Analysis: AI-Powered Image Analysis App

## Project Overview

This is a **legitimate IT project** — a Python application that leverages multimodal Large Language Models (LLMs) to perform visual analysis on uploaded images based on customizable criteria (attractiveness, color balance, marketing appeal, trending concepts, etc.). It combines AI integration, image processing, and a user-friendly interface.

---

## 📋 5 Pieces of Advice for Project Elaboration

### 🎯 Advice 1: Define the Scope & LLM Strategy Clearly

- **Choose your multimodal LLM provider carefully**: Options include OpenAI (GPT-4o, GPT-4 Vision), Anthropic (Claude 3.5 Sonnet with vision), Google (Gemini 1.5 Pro Vision), or open-source alternatives like LLaVA or Qwen-VL. Each has different cost structures, rate limits, and capabilities.
- **Decide on deployment model**: Will it be a **desktop app** (using PyQt/Tkinter/CustomTkinter), a **web app** (Flask/FastAPI + React), a **SaaS platform**, or a quick **prototype with Streamlit/Gradio**? This affects infrastructure, hosting, and user access patterns.
- **Establish image constraints upfront**: Define max file size, supported formats (JPEG, PNG, WEBP), resolution limits, and whether to compress images before API submission (critical for cost management).
- **Plan for API cost management**: Multimodal API calls are expensive (e.g., $0.01–$0.05+ per image). Implement usage tracking, caching, and possibly a credit/token system for production use.

### 🎯 Advice 2: Nail the Default Prompt Engineering

- **Craft a structured, comprehensive default prompt** that systematically addresses all your criteria (attractiveness, color balance, selling idea, trending concept, marketing message, product presentation, value messaging). Use a JSON or structured output format so results are parseable.
- **Implement prompt versioning**: Store default prompts as configurable templates so they can be updated without code changes. This allows you to iterate on prompt quality based on user feedback.
- **Use placeholder tokens** in custom prompts (e.g., `{image_count}`, `{criteria_focus}`) to make user customization more powerful and consistent.
- **Consider chain-of-thought prompting**: Encourage the LLM to reason step-by-step through each criterion for more accurate and explainable results.

### 🎯 Advice 3: Design a Meaningful & Modern UI/UX

- **Drag-and-drop multi-image upload zone** with thumbnail previews, reorder capability, and individual image removal. Consider a card-based layout for visual clarity.
- **Side-by-side comparison view** that displays all uploaded images alongside their individual analysis results — this is essential for the user to compare "most attractive" or "best presented product" effectively.
- **Rich output presentation**: Don't just show raw text — use visual indicators (score bars, color-coded ratings, emoji indicators), expandable sections per criterion, and an overall summary card with a winner/recommendation.
- **Progressive disclosure pattern**: Show a quick summary first, then allow users to drill down into detailed analysis per image or per criterion. This prevents information overload.
- **Dark/light mode toggle**, smooth animations, skeleton loaders during processing, and a clean typography hierarchy (e.g., Inter or SF Pro fonts).
- **Recommended tech stack for UI**: CustomTkinter (desktop) or **Next.js + Tailwind CSS + shadcn/ui** (web) for that "sleek modern layout" the user requested.

### 🎯 Advice 4: Architecture & Performance Considerations

- **Build an async processing pipeline**: Image upload → validation → preprocessing (resize/optimize) → batch API calls to LLM → result parsing → formatted output. Use async/await to avoid blocking the UI during analysis.
- **Implement smart batching**: Group images into single API calls where possible (some LLMs accept multiple images per request) to reduce API costs by 50-70%.
- **Add a local cache layer** (SQLite or Redis) to store analysis results — if a user re-uploads the same images, return cached results instantly.
- **Error handling & retry logic**: API calls can fail due to rate limits, timeouts, or content policy violations. Implement exponential backoff and graceful degradation with clear user feedback.
- **Export functionality**: Allow users to download analysis results as PDF reports, JSON, or CSV — extremely valuable for marketers who need to share findings with teams.

### 🎯 Advice 5: Add Value Through Smart Features

- **Historical analysis dashboard**: Track which images were analyzed, when, and what scores they received. Allow users to revisit past analyses.
- **A/B comparison mode**: Let users upload two sets of images (e.g., "Product A vs Product B") and get a head-to-head marketing analysis.
- **Industry-specific prompt presets**: Beyond the default, offer curated prompts for e-commerce, social media, print advertising, etc.
- **Confidence scoring**: Have the LLM provide a confidence level (0-100%) for each criterion, helping users gauge reliability.
- **Multi-language support** for both UI and analysis output — useful for international marketing teams.

---

## 🔑 Key Features to Focus On (Priority Matrix)

| Priority | Feature | Rationale |
|----------|---------|-----------|
| 🔴 High | Multi-image upload with previews | Core functionality |
| 🔴 High | Default prompt + custom prompt toggle | Core functionality |
| 🔴 High | Structured LLM output (JSON/parsed) | Enables rich UI display |
| 🔴 High | Per-criterion scoring & visualization | Delivers "meaningful output" |
| 🟡 Medium | Comparison view across images | Differentiator |
| 🟡 Medium | Export results (PDF/JSON) | Adds practical value |
| 🟡 Medium | Image preprocessing & compression | Cost optimization |
| 🟢 Low | History/dashboard | Nice-to-have |
| 🟢 Low | Multi-language support | Future expansion |
| 🟢 Low | User authentication | Only if multi-tenant |

---

## ✅ Detailed Task List

### Phase 1: Foundation & Setup (Week 1)
- [ ] Define project requirements document (PRD)
- [ ] Choose deployment model (desktop/web/SaaS)
- [ ] Select multimodal LLM provider and obtain API key
- [ ] Set up Python virtual environment and project structure
- [ ] Initialize version control (Git) with proper `.gitignore`
- [ ] Create requirements.txt / pyproject.toml with dependencies

### Phase 2: Backend Development (Week 2)
- [ ] Implement image upload handler with validation (format, size)
- [ ] Build image preprocessing module (resize, compress, format conversion)
- [ ] Integrate multimodal LLM API with async support
- [ ] Design and implement the default analysis prompt
- [ ] Create prompt template engine with placeholder support
- [ ] Implement structured response parsing (JSON schema)
- [ ] Add error handling and retry logic for API calls
- [ ] Set up local caching (SQLite) for results

### Phase 3: UI/UX Development (Week 3)
- [ ] Design wireframes/mockups (use Figma or similar)
- [ ] Build main upload interface with drag-and-drop
- [ ] Implement thumbnail gallery with reorder/remove
- [ ] Create prompt selection UI (toggle + custom input)
- [ ] Design analysis results display (cards, score bars, expandable sections)
- [ ] Add loading states and progress indicators
- [ ] Implement dark/light mode toggle
- [ ] Ensure responsive design (mobile-friendly if web)

### Phase 4: Output & Visualization (Week 4)
- [ ] Create per-image analysis cards with criterion breakdowns
- [ ] Build comparative visualization across multiple images
- [ ] Add "winner" / ranking system based on aggregated scores
- [ ] Implement export functionality (PDF report, JSON, CSV)
- [ ] Add copy-to-clipboard for individual sections

### Phase 5: Testing & Refinement (Week 5)
- [ ] Unit tests for image processing module
- [ ] Integration tests for LLM API calls (with mocks)
- [ ] UI/UX testing with real users (5-10 testers)
- [ ] Performance testing with large image batches
- [ ] Cost analysis — measure API spend per analysis
- [ ] Security review — image data privacy, API key storage

### Phase 6: Deployment & Documentation (Week 6)
- [ ] Package application (PyInstaller for desktop, or deploy web app)
- [ ] Write comprehensive README with setup instructions
- [ ] Create user guide with screenshots
- [ ] Document API integration and prompt engineering decisions
- [ ] Set up CI/CD pipeline (GitHub Actions)
- [ ] Plan for monitoring and iteration based on user feedback

---

## 🛠️ Recommended Tech Stack

| Layer | Recommended Tools |
|-------|-------------------|
| **UI Framework (Desktop)** | CustomTkinter or PyQt6 |
| **UI Framework (Web)** | Next.js + Tailwind CSS + shadcn/ui |
| **Quick Prototype** | Streamlit or Gradio |
| **Backend (Web)** | FastAPI (async, fast, modern) |
| **Image Processing** | Pillow (PIL), OpenCV |
| **LLM Integration** | OpenAI SDK, Anthropic SDK, or LiteLLM (unified) |
| **Caching** | SQLite (simple) or Redis (scalable) |
| **PDF Export** | ReportLab or WeasyPrint |
| **Testing** | pytest, pytest-asyncio |
| **Packaging** | PyInstaller (desktop), Docker (web) |

---

## ⚠️ Critical Considerations

1. **Cost Awareness**: A single analysis of 10 images could cost $0.10–$0.50. Always display estimated cost before analysis.
2. **Privacy & Data**: Uploaded images may contain sensitive content. Implement clear privacy policy and consider on-premise LLM deployment for sensitive use cases.
3. **Rate Limiting**: Most LLM APIs have rate limits (e.g., 60 req/min). Implement queue-based processing for large batches.
4. **Prompt Injection Safety**: If users provide custom prompts, sanitize inputs and set system-level guardrails to prevent misuse.
5. **Result Reliability**: LLM outputs for visual analysis can be subjective. Be transparent with users about this and provide confidence scores.

---

## Key Features

# 🔑 Key Features for AI-Powered Image Analysis App

1. **Multi-Image Drag-and-Drop Upload with Smart Preprocessing** — A core scope-defining feature that allows users to batch-upload multiple images simultaneously, with automatic validation (format, size, resolution), client-side compression, thumbnail previews, and reorder/remove capabilities. This feature anchors the entire user workflow and directly impacts UI/UX by setting the first impression and reducing friction during input. Smart preprocessing also controls API costs and prevents invalid submissions before they reach the LLM.

2. **Dynamic Prompt Configuration System (Default vs. Custom)** — A flexible scope feature that gives users a checkbox-driven toggle between a curated, expertly-engineered default prompt (covering attractiveness, color balance, selling idea, trending/viral concept, marketing message, presentation, and value messaging) and a free-form custom prompt input with placeholder hints. This dual-mode approach keeps the product accessible to non-technical users while empowering power users with full control — a critical UI/UX balance for adoption.

3. **Structured LLM Output with Rich Per-Criterion Visualization** — The "meaningful output" centerpiece of the project, where LLM responses are parsed into a structured JSON schema (score per criterion, summary, recommendation, confidence level) and rendered visually as score bars, color-coded badges, expandable criterion cards, and an aggregated "winner" indicator. This transforms raw AI text into actionable, scannable insights — the single biggest UI/UX differentiator that justifies the app's value over manual review.

4. **Side-by-Side Comparative Analysis Dashboard** — A UI/UX-defining feature that displays all analyzed images together in a comparison grid, allowing users to evaluate them against each other on each criterion (e.g., which is "most attractive," which has the "best color balance," which has the "strongest selling idea"). This view turns multi-image analysis from a list into a decision-making tool, directly serving the project's marketing and product-selection use case.

5. **Asynchronous Processing State Management with Progress Feedback** — A scope-and-UX-critical feature that handles the long-running nature of multimodal LLM calls through non-blocking async processing, real-time progress indicators (per-image status: queued → analyzing → complete), skeleton loaders during inference, estimated cost display before submission, and graceful error handling with retry options. This feature ensures the UI feels responsive and trustworthy even when API calls take 10–30 seconds per image batch.

---

## 🛠️ Stack Alignment & Importance

- **Python** — The foundational language chosen for this project is essential because it provides the richest ecosystem for AI/ML integration (native SDKs for OpenAI, Anthropic, Google), mature image-processing libraries (Pillow, OpenCV), and rapid prototyping capabilities — all of which align directly with the project's core scope of multimodal LLM orchestration and image manipulation.
- **FastAPI** — Selected for the backend layer because its native `async/await` support is critical for handling multiple concurrent image uploads and parallel LLM API calls without blocking, while its automatic OpenAPI documentation, Pydantic-based validation (perfect for enforcing the structured JSON prompt/response schema), and high performance make it ideal for serving a modern web frontend at scale.
- **TailwindCSS** — The styling framework is crucial for achieving the "sleek, modern layout" requirement efficiently, as its utility-first approach enables rapid iteration on the responsive drag-and-drop upload zone, comparison dashboard, and dark/light mode toggle without writing custom CSS — keeping the UI development velocity high while maintaining visual consistency.
- **NextAuth** — The authentication library (paired with Next.js on the frontend) is important for this project because it enables secure user sessions, which become essential if the app evolves to support saved analysis history, personalized prompt libraries, usage-based cost tracking per user, or multi-tenant SaaS deployment — protecting API keys on the server-side and ensuring only authorized users can trigger expensive LLM calls.

---

## Core Requirements

# Core Requirements

> Generated based on the project idea, suggested key features, and project elaboration. Focused on architectural and stack-level concerns for **Python**, **FastAPI**, **TailwindCSS**, and **NextAuth**.

---

## 📦 Category 1 — Image Processing & Upload

### REQ-01: Multi-Image Upload & Preprocessing Pipeline
- Users batch-upload multiple images (`JPEG`, `PNG`, `WEBP`) via drag-and-drop or file picker.
- A FastAPI endpoint accepts `multipart/form-data`, validates file type/size, and queues each image for processing.
- Python-side preprocessing (Pillow) resizes and compresses images before forwarding to the LLM to control token and API costs.
- The TailwindCSS frontend surfaces thumbnail previews, drag-to-reorder, and per-image removal.
- **Architecture impact:** Defines the async upload handling pattern, a temporary file strategy (in-memory vs. disk) to avoid blocking FastAPI's event loop, and the contract for image handoff between frontend and backend.

---

## 🤖 Category 2 — LLM Integration & Prompting

### REQ-02: Multimodal LLM Integration & Prompt Orchestration
- The system supports two modes: a curated **default prompt** (covering attractiveness, color balance, selling idea, trending/viral concept, marketing message, product presentation, and value messaging) and a **custom user-defined prompt** selected via a checkbox toggle with a text input.
- FastAPI exposes endpoints that receive the prompt selection and forward the request to a multimodal LLM (e.g., OpenAI, Anthropic, Google) via the official Python SDK.
- A lightweight prompt template engine supports placeholder tokens so default and custom prompts can be standardized.
- **Architecture impact:** Requires an async HTTP client (`httpx`), retry/backoff logic, and a thin LLM-provider abstraction layer so the provider can be swapped without touching downstream components.

---

## 📊 Category 3 — Output & Visualization

### REQ-03: Structured LLM Output Schema with Pydantic Validation
- LLM responses are forced into a structured JSON schema (per-criterion score, summary, recommendation, confidence level).
- FastAPI uses **Pydantic** models to validate both incoming requests and parsed LLM responses, returning 422 errors for malformed payloads.
- The TailwindCSS frontend renders parsed results as score bars, color-coded badges, expandable criterion cards, and an aggregated "winner" indicator.
- **Architecture impact:** Establishes a strict contract between the FastAPI backend and the frontend, decoupling the LLM provider from UI rendering logic.

### REQ-04: Comparative Analysis Dashboard
- All uploaded images are displayed together in a side-by-side comparison grid with per-criterion breakdowns so users can compare across images (e.g., "most attractive," "best color balance," "strongest selling idea").
- The UI includes skeleton loaders, real-time progress indicators (queued → analyzing → complete), and dark/light mode.
- **Architecture impact:** Requires frontend state management for multi-image results and an async progress channel (polling or Server-Sent Events) between FastAPI and the frontend to keep the UI responsive during long-running inference.

---

## 🔐 Category 4 — Authentication & Security

### REQ-05: User Authentication & Session Management with NextAuth
- **NextAuth** (paired with Next.js on the frontend) provides OAuth-based session handling.
- The FastAPI backend validates NextAuth-issued JWT tokens on protected endpoints using a shared secret or JWKS endpoint.
- All LLM provider API keys are stored **server-side only** in FastAPI environment variables and are never exposed to the browser.
- **Architecture impact:** Enforces authenticated access to expensive LLM endpoints, defines the security boundary between the Next.js frontend and the FastAPI backend, and enables per-user usage tracking, rate limiting, and future history/persistence features.

---

## Summary Mapping

| # | Requirement | Primary Stack Impact |
|---|-------------|----------------------|
| REQ-01 | Multi-Image Upload & Preprocessing | FastAPI + Python (Pillow), TailwindCSS |
| REQ-02 | Multimodal LLM Integration & Prompting | FastAPI + Python SDKs |
| REQ-03 | Structured Output Schema | FastAPI + Pydantic, TailwindCSS |
| REQ-04 | Comparative Analysis Dashboard | TailwindCSS + async progress from FastAPI |
| REQ-05 | Auth & Session Management | NextAuth + FastAPI JWT validation |

---

## User Stories

# 📘 User Stories — AI Image Analysis App (Proof-of-Concept Skeleton)

> **Goal:** Bootstrap a runnable proof-of-concept app with a working skeleton covering multi-image upload, multimodal LLM analysis with default/custom prompts, structured results, comparative dashboard, and basic NextAuth wiring — all without data persistence (in-memory only) and with minimal security (skeleton-level JWT validation).
>
> **Stack contract:** Python 3.11+, FastAPI, Pydantic v2, Next.js 14 (App Router, TypeScript), TailwindCSS 3, NextAuth v4.

---

### US-001: Bootstrap Monorepo with FastAPI + Next.js Skeleton ("Hello World")

**As a** developer
**I want** to initialize a monorepo containing a runnable Python/FastAPI backend and a Next.js + TailwindCSS frontend
**So that** I have a verifiable "hello world" foundation to build features on.

**Description:**
Create a top-level project folder (e.g., `image-analyzer/`) with two sub-folders: `backend/` (Python/FastAPI) and `frontend/` (Next.js + TailwindCSS). Wire them up so both run with a single command (e.g., `make dev` or two terminals).

**Acceptance Criteria:**
- [ ] `backend/` contains a Python virtualenv-ready folder with a `pyproject.toml` or `requirements.txt` listing: `fastapi`, `uvicorn[standard]`, `python-multipart`, `pillow`, `pydantic`, `httpx`, `openai`, `pyjwt`, `python-dotenv`.
- [ ] `backend/main.py` exposes `GET /` returning `{"message": "Hello from FastAPI"}`.
- [ ] `frontend/` is bootstrapped with `create-next-app` (TypeScript, App Router, ESLint, TailwindCSS).
- [ ] `frontend/app/page.tsx` renders a centered "Hello from Next.js + TailwindCSS" headline with a gradient background.
- [ ] `backend/README.md` documents `uvicorn main:app --reload --port 8000`.
- [ ] `frontend/README.md` documents `npm run dev` on port 3000.
- [ ] A root `README.md` explains the layout and how to start both services.

**Technical Notes:**
- **Python:** ≥3.11.
- **FastAPI:** `app = FastAPI(title="Image Analyzer API", version="0.1.0")`.
- **Uvicorn:** launched with `--reload` in dev.
- **Next.js:** App Router, TypeScript strict mode, Tailwind enabled out of the box.
- **TailwindCSS:** default `tailwind.config.ts` and `globals.css` with `@tailwind base/components/utilities`.

**Requirements:** Foundation for REQ-01 → REQ-05.

---

### US-002: FastAPI Project Structure & Configuration Module

**As a** backend developer
**I want** a clean FastAPI project layout with separated concerns
**So that** the codebase is maintainable as features grow.

**Description:**
Restructure `backend/main.py` into a modular layout:
```
backend/
  app/
    __init__.py
    main.py            # FastAPI app factory
    config.py          # Pydantic Settings
    api/
      __init__.py
      routes/
        __init__.py
        health.py
        upload.py
        analyze.py
    services/
      __init__.py
      image_processor.py
      llm_service.py
    schemas/
      __init__.py
      analysis.py
    core/
      __init__.py
      security.py      # JWT validation skeleton
```

**Acceptance Criteria:**
- [ ] `app/main.py` uses `FastAPI()` factory pattern and includes routers from `app/api/routes/`.
- [ ] `app/config.py` uses `pydantic-settings` `BaseSettings` to load env vars (`OPENAI_API_KEY`, `NEXTAUTH_SECRET`, `ALLOWED_ORIGINS`).
- [ ] `python-dotenv` loads `.env` on startup.
- [ ] App boots with no warnings.

**Technical Notes:**
- **Stack:** FastAPI, Pydantic v2, pydantic-settings.
- Keep `requirements.txt` minimal — no DB, no ORM.

**Requirements:** Foundation for REQ-01 → REQ-05.

---

### US-003: Health Check & CORS Configuration

**As a** frontend developer
**I want** the FastAPI backend to expose a `/health` endpoint and allow CORS from `localhost:3000`
**So that** the frontend can verify connectivity and call APIs during development.

**Description:**
Add `GET /health` returning `{"status": "ok"}` and configure CORSMiddleware with origins from `ALLOWED_ORIGINS` env var (default `http://localhost:3000`).

**Acceptance Criteria:**
- [ ] `GET /health` returns 200 with `{"status": "ok"}`.
- [ ] `curl -X OPTIONS -H "Origin: http://localhost:3000" http://localhost:8000/api/upload` returns the correct CORS headers.
- [ ] `app/main.py` includes `CORSMiddleware` after router registration.
- [ ] CORS allows credentials (needed for NextAuth cookies).

**Technical Notes:**
- **FastAPI:** `from fastapi.middleware.cors import CORSMiddleware`.
- Use `allow_origins=[...]`, `allow_credentials=True`, `allow_methods=["*"]`, `allow_headers=["*"]`.

**Requirements:** REQ-05 (foundational for cookie-based auth).

---

### US-004: Image Upload Endpoint (multipart/form-data)

**As a** user
**I want** to upload multiple images at once to the backend
**So that** I can submit them for analysis.

**Description:**
Implement `POST /api/upload` that accepts a list of files via `UploadFile = File(...)`, validates them, stores them temporarily in memory (BytesIO), and returns a list of image IDs for later analysis.

**Acceptance Criteria:**
- [ ] Endpoint accepts `files: list[UploadFile]` via multipart/form-data.
- [ ] Each file gets a UUID and is held in an in-memory dict `IMAGE_STORE: dict[str, bytes]`.
- [ ] Response: `{"images": [{"id": "uuid", "filename": "photo.jpg", "size": 12345, "content_type": "image/jpeg"}]}`.
- [ ] Returns 422 if no files provided.
- [ ] Swagger UI at `/docs` shows the endpoint with a "Try it out" form.

**Technical Notes:**
- **FastAPI:** `from fastapi import UploadFile, File`.
- **python-multipart:** required dependency (already in BOM).
- In-memory only (no persistence per skeleton scope).

**Requirements:** REQ-01.

---

### US-005: Image Validation (Type, Size, MIME)

**As a** backend developer
**I want** to validate uploaded images against allowed types and size limits
**So that** bad uploads are rejected before they reach the LLM (saving cost and preventing errors).

**Description:**
Add validation rules:
- Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`.
- Max size per image: 10 MB.
- Reject empty files.

**Acceptance Criteria:**
- [ ] Helper function `validate_image(file: UploadFile) -> None` raises `HTTPException(415)` for unsupported types, `413` for too-large files, `400` for empty files.
- [ ] `/api/upload` returns per-file error messages without breaking the whole batch.
- [ ] Unit-testable (use `UploadFile` mock).
- [ ] Configurable limits via `app/config.py`.

**Technical Notes:**
- **FastAPI:** `HTTPException` from `fastapi`.
- Use `python-magic` only if MIME sniffing is required (otherwise trust `UploadFile.content_type`).

**Requirements:** REQ-01.

---

### US-006: Image Preprocessing with Pillow

**As a** backend developer
**I want** to resize and compress uploaded images before forwarding them to the LLM
**So that** API costs and latency are controlled.

**Description:**
Implement `services/image_processor.py` with:
- `preprocess_image(raw_bytes: bytes, max_side: int = 1024, quality: int = 85) -> bytes`
- Resize so longest side ≤ `max_side` (preserve aspect ratio).
- Convert RGBA → RGB.
- Re-encode as JPEG `quality=quality`.
- Return optimized bytes + base64 string (for LLM SDK).

**Acceptance Criteria:**
- [ ] Function reduces a 4000×3000 photo to ~1024×768 and ≥50% smaller byte size.
- [ ] Handles PNG transparency gracefully (white background fallback).
- [ ] Pure Pillow — no extra deps.
- [ ] Returns `(optimized_bytes, base64_str, dimensions)`.

**Technical Notes:**
- **Python:** Pillow ≥10.0.
- `Image.open(BytesIO(raw_bytes))`, `.convert("RGB")`, `.thumbnail((max_side, max_side))`, `.save(buf, "JPEG", quality=quality)`.

**Requirements:** REQ-01.

---

### US-007: Static File Serving for Image Previews

**As a** frontend developer
**I want** the backend to serve uploaded images via a public URL
**So that** the Next.js UI can render thumbnails without base64.

**Description:**
Add `GET /api/images/{image_id}` that returns the optimized JPEG bytes with `Content-Type: image/jpeg`.

**Acceptance Criteria:**
- [ ] Returns 404 if `image_id` not in `IMAGE_STORE`.
- [ ] Returns 200 with proper `Cache-Control: private, max-age=300`.
- [ ] Works in browser at `http://localhost:8000/api/images/<uuid>`.

**Technical Notes:**
- **FastAPI:** `from fastapi.responses import Response`.
- Cache headers keep the network light without persistence.

**Requirements:** REQ-01.

---

### US-008: LLM Service — Configuration & Client Wrapper

**As a** backend developer
**I want** a thin, swappable wrapper around the multimodal LLM SDK
**So that** the LLM provider can be changed without touching route logic.

**Description:**
Create `services/llm_service.py` exposing:
- `class LLMProvider(str, Enum): OPENAI = "openai"` (extensible).
- `async def analyze_images(images: list[bytes], prompt: str) -> dict` returning parsed JSON.
- Uses `openai.AsyncOpenAI` with `OPENAI_API_KEY` from settings.
- Calls model `gpt-4o` (or `gpt-4o-mini` for cost-saving) with `response_format={"type": "json_object"}`.

**Acceptance Criteria:**
- [ ] Function is async-safe (uses `AsyncOpenAI`).
- [ ] Includes retry with exponential backoff (max 3 attempts).
- [ ] Raises a custom `LLMError` with status code on failure.
- [ ] Logs request ID, image count, and latency.

**Technical Notes:**
- **openai SDK:** ≥1.30, use `AsyncOpenAI`.
- Messages format: `[{"role": "user", "content": [{"type": "text", "text": prompt}, {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{b64}"}}, ...]}]`.

**Requirements:** REQ-02.

---

### US-009: Default Analysis Prompt Template

**As a** user
**I want** a well-engineered default prompt that covers all my criteria
**So that** I get consistent, meaningful results without writing my own prompt.

**Description:**
Define a `DEFAULT_PROMPT` constant in `services/llm_service.py` (or a separate `prompts.py`):
```
You are an expert marketing creative director. Analyze each provided image and return a JSON object with the following structure:
{
  "results": [
    {
      "image_index": 0,
      "scores": {
        "attractiveness": 0-10,
        "color_balance": 0-10,
        "selling_idea": 0-10,
        "trending_viral_concept": 0-10,
        "marketing_message": 0-10,
        "product_presentation": 0-10,
        "value_message": 0-10
      },
      "summary": "1-2 sentence overall assessment",
      "strongest_criterion": "...",
      "weakest_criterion": "...",
      "recommendation": "concrete improvement suggestion",
      "confidence": 0-100
    }
  ],
  "winner_index": 0,
  "overall_summary": "1-2 sentence comparison"
}
```

**Acceptance Criteria:**
- [ ] Prompt produces valid JSON on 3 test images (manual verification).
- [ ] Each criterion score is integer 0-10.
- [ ] Includes explicit instruction: "Return ONLY valid JSON, no markdown."
- [ ] Stored as a Python constant for easy iteration.

**Technical Notes:**
- Keep prompt in code for the POC; later move to DB/config.
- Use chain-of-thought wording: "Think step by step before scoring."

**Requirements:** REQ-02, REQ-03.

---

### US-010: Pydantic Schemas for Structured LLM Output

**As a** backend developer
**I want** Pydantic models that mirror the LLM's JSON schema
**So that** invalid responses are caught and the frontend gets a typed payload.

**Description:**
Create `schemas/analysis.py`:
```python
class CriterionScores(BaseModel):
    attractiveness: int = Field(ge=0, le=10)
    color_balance: int = Field(ge=0, le=10)
    selling_idea: int = Field(ge=0, le=10)
    trending_viral_concept: int = Field(ge=0, le=10)
    marketing_message: int = Field(ge=0, le=10)
    product_presentation: int = Field(ge=0, le=10)
    value_message: int = Field(ge=0, le=10)

class ImageAnalysis(BaseModel):
    image_index: int
    scores: CriterionScores
    summary: str
    strongest_criterion: str
    weakest_criterion: str
    recommendation: str
    confidence: int = Field(ge=0, le=100)

class AnalysisResult(BaseModel):
    results: list[ImageAnalysis]
    winner_index: int
    overall_summary: str

class AnalyzeRequest(BaseModel):
    image_ids: list[str]
    prompt: str | None = None  # if None, use DEFAULT_PROMPT
    use_default_prompt: bool = True

class AnalyzeResponse(BaseModel):
    analysis: AnalysisResult
    image_urls: list[str]  # pre-built preview URLs
```

**Acceptance Criteria:**
- [ ] `AnalysisResult.model_validate_json(...)` raises `ValidationError` on malformed LLM output.
- [ ] FastAPI returns 422 if `image_ids` is empty.
- [ ] All fields have explicit types and constraints.
- [ ] Schemas are importable from `app.schemas.analysis`.

**Technical Notes:**
- **Pydantic:** v2 with `Field(ge=, le=)` constraints.
- Use `model_dump()` for serialization to frontend.

**Requirements:** REQ-03.

---

### US-011: Analyze Endpoint — Default Prompt Mode

**As a** user
**I want** to trigger analysis with the default prompt
**So that** I get standardized results across my images.

**Description:**
Implement `POST /api/analyze` that:
1. Validates the `AnalyzeRequest` payload.
2. Loads each image by ID from `IMAGE_STORE`.
3. Calls `llm_service.analyze_images(...)` with `DEFAULT_PROMPT` (or `prompt` if `use_default_prompt=False`).
4. Validates the response with `AnalysisResult`.
5. Returns `AnalyzeResponse` with pre-built `/api/images/{id}` URLs.

**Acceptance Criteria:**
- [ ] Returns 200 with full `AnalyzeResponse`.
- [ ] Returns 404 for any unknown `image_id`.
- [ ] Returns 502 with a clear message on LLM failure.
- [ ] Per-image latency logged.
- [ ] Auto-generated Swagger docs show request/response schemas.

**Technical Notes:**
- **FastAPI:** route in `app/api/routes/analyze.py`.
- Use `BackgroundTasks` if requests get long, but for POC, await inline.

**Requirements:** REQ-02, REQ-03, REQ-04.

---

### US-012: Analyze Endpoint — Custom Prompt Mode

**As a** user
**I want** to provide my own analysis criteria via a custom prompt
**So that** I can adapt the tool to my specific use case.

**Description:**
When `use_default_prompt=False`, the endpoint uses the user-supplied `prompt` string verbatim. The response still uses the same `AnalysisResult` schema — i.e., the custom prompt must instruct the LLM to return the same JSON structure.

**Acceptance Criteria:**
- [ ] `use_default_prompt=False` + `prompt="..."` uses the user prompt.
- [ ] `use_default_prompt=True` + `prompt="..."` ignores user prompt and uses default.
- [ ] `use_default_prompt=False` + empty `prompt` returns 422.
- [ ] Custom prompt is logged for debugging.
- [ ] Custom prompt has a 2000-character limit (sanity check).

**Technical Notes:**
- For the POC, trust the user prompt structure. Later versions may inject a "respond with this JSON schema" prefix.

**Requirements:** REQ-02.

---

### US-013: Next.js Base Layout & Modern Design System

**As a** user
**I want** to land on a clean, modern interface with consistent typography and colors
**So that** the app feels polished from the first second.

**Description:**
Configure `frontend/app/layout.tsx` with:
- Inter font from `next/font/google`.
- TailwindCSS theme tokens in `tailwind.config.ts`:
  - Custom color palette: `primary` (indigo), `accent` (violet), `surface`, `surface-elevated`.
  - Border radius scale.
  - Custom shadows for cards.
- Root layout includes a top navbar with logo "Image Analyzer" and a placeholder dark-mode toggle.

**Acceptance Criteria:**
- [ ] Default page shows a gradient hero with the project name and tagline.
- [ ] Inter font is loaded and applied.
- [ ] Tailwind utility classes resolve (e.g., `bg-primary`).
- [ ] Layout is responsive (works at 1440px and 375px widths).

**Technical Notes:**
- **Next.js:** App Router, `app/layout.tsx`, `app/page.tsx`.
- **TailwindCSS:** extend theme via `tailwind.config.ts` `theme.extend`.

**Requirements:** REQ-04 (foundation).

---

### US-014: API Client for FastAPI Backend

**As a** frontend developer
**I want** a typed API client to call the FastAPI backend
**So that** I get autocomplete and type safety.

**Description:**
Create `frontend/lib/api.ts` exporting:
- `uploadImages(files: File[]): Promise<UploadResponse>`
- `analyzeImages(req: AnalyzeRequest): Promise<AnalyzeResponse>`
- `getImageUrl(id: string): string`

Reads `NEXT_PUBLIC_API_BASE_URL` (default `http://localhost:8000`).

**Acceptance Criteria:**
- [ ] Uses native `fetch` — no extra HTTP deps.
- [ ] Throws typed errors with status code and message.
- [ ] Sends credentials (`include`) so NextAuth cookies pass through.
- [ ] Returns parsed JSON typed with shared interfaces (mirror Pydantic schemas).

**Technical Notes:**
- Define TypeScript interfaces in `frontend/types/api.ts` matching backend Pydantic.
- No codegen needed for POC; manual mirror.

**Requirements:** REQ-02, REQ-03.

---

### US-015: Drag-and-Drop Image Upload Zone

**As a** user
**I want** to drag-and-drop multiple images onto a clearly marked upload zone
**So that** I can quickly add images without clicking through file dialogs.

**Description:**
Build `components/UploadZone.tsx`:
- Full-width drop area with dashed border.
- Accepts `image/jpeg`, `image/png`, `image/webp`.
- Validates type/size client-side (mirror backend rules).
- Supports click-to-browse fallback.
- Disabled state while uploading.

**Acceptance Criteria:**
- [ ] Dropping files triggers `uploadImages()` and stores returned IDs in parent state.
- [ ] Invalid file types show inline error.
- [ ] Drag-over state shows visual feedback (border color change).
- [ ] Keyboard-accessible (`Enter`/`Space` opens picker).

**Technical Notes:**
- **React:** `onDragOver`, `onDrop`, `useState<DragEvent>`.
- **TailwindCSS:** `border-dashed`, `transition-colors`, `hover:border-primary`.

**Requirements:** REQ-01, REQ-04.

---

### US-016: Image Preview Thumbnails with Remove

**As a** user
**I want** to see thumbnails of my uploaded images and remove ones I don't want
**So that** I have full control over what gets analyzed.

**Description:**
Build `components/ImageGallery.tsx`:
- Responsive grid (2-6 columns depending on viewport).
- Each thumbnail shows the image (from `getImageUrl(id)`), filename, and size.
- Hover reveals a remove (×) button.
- Empty state when no images uploaded.

**Acceptance Criteria:**
- [ ] Thumbnails load from `/api/images/{id}`.
- [ ] Remove button updates parent state immediately.
- [ ] Loading skeleton while image bytes arrive.
- [ ] Empty state has a friendly illustration/text.

**Technical Notes:**
- **Next.js:** use `next/image` with custom `loader` that points to FastAPI base URL.
- Or fallback to `<img>` for the POC to avoid Next/Image domain config.

**Requirements:** REQ-01, REQ-04.

---

### US-017: Default Prompt Toggle (Checkbox)

**As a** user
**I want** a checkbox to enable the default prompt
**So that** I can opt in/out of the curated analysis criteria.

**Description:**
Build `components/PromptConfig.tsx` containing:
- Checkbox labeled "Use default analysis prompt".
- When checked: show a read-only preview/placeholder of `DEFAULT_PROMPT` (collapsed).
- When unchecked: hide the placeholder, enable custom input.

**Acceptance Criteria:**
- [ ] Default state: checked.
- [ ] Toggling updates a `usePromptConfig` Zustand or React state store.
- [ ] Disabled while analysis is running.
- [ ] Accessible (`<label htmlFor>` + `aria-describedby`).

**Technical Notes:**
- Tailwind form styling: `accent-primary` for native checkbox theming.

**Requirements:** REQ-02.

---

### US-018: Custom Prompt Textarea

**As a** user
**I want** a textarea to write my own prompt when default mode is off
**So that** I can tailor the analysis to my needs.

**Description:**
When `use_default_prompt=False`, show a `<textarea>` with:
- Placeholder: `"e.g., Focus on product photography lighting and emotional appeal..."`.
- Character counter (max 2000).
- Helper text reminding the user the LLM should still return JSON.

**Acceptance Criteria:**
- [ ] Textarea auto-grows up to 6 lines.
- [ ] Character counter updates live and turns red near limit.
- [ ] Empty textarea + unchecked default = Analyze button disabled.
- [ ] Persists in component state across uploads.

**Technical Notes:**
- **TailwindCSS:** `resize-none`, `focus:ring-2 focus:ring-primary`.
- Min/max rows via inline style or `field-sizing-content` (modern CSS).

**Requirements:** REQ-02.

---

### US-019: Analyze Button with Loading State

**As a** user
**I want** a prominent "Analyze Images" button that shows progress
**So that** I know the system is working.

**Description:**
Build `components/AnalyzeButton.tsx`:
- Disabled until ≥1 image is uploaded AND (default checked OR custom prompt non-empty).
- On click: calls `analyzeImages()`, shows spinner + "Analyzing X images..." text.
- On success: hides, results view appears.
- On error: shows inline error toast.

**Acceptance Criteria:**
- [ ] Button shows spinner during request (uses local state, not a spinner lib).
- [ ] Disabled state visually distinct (`opacity-50 cursor-not-allowed`).
- [ ] Optimistic UI: results section scrolls into view automatically.

**Technical Notes:**
- Use Tailwind animation: `animate-spin` for SVG spinner.

**Requirements:** REQ-02, REQ-04.

---

### US-020: Per-Image Analysis Result Card

**As a** user
**I want** a dedicated card showing each image's analysis
**So that** I can read the findings for that image in isolation.

**Description:**
Build `components/AnalysisCard.tsx`:
- Shows the image thumbnail on the left.
- Shows summary, recommendation, strongest/weakest criterion on the right.
- Collapsible "Score breakdown" section.

**Acceptance Criteria:**
- [ ] Card uses `surface-elevated` background, `rounded-2xl`, soft shadow.
- [ ] Summary is plain text; recommendation in a callout block.
- [ ] Confidence displayed as a percentage badge.
- [ ] Hover lifts the card (`hover:shadow-lg transition`).

**Technical Notes:**
- **React:** `useState<boolean>(false)` for collapse.

**Requirements:** REQ-03, REQ-04.

---

### US-021: Criterion Score Visualization (Bars + Badges)

**As a** user
**I want** to see scores as visual bars and color-coded badges
**So that** I can compare criteria at a glance.

**Description:**
Build `components/ScoreBar.tsx`:
- Horizontal bar, width proportional to score (0-10).
- Color: red (0-3), amber (4-6), green (7-10).
- Label + numeric value visible.

And `components/ScoreBadge.tsx` for compact score chips.

**Acceptance Criteria:**
- [ ] Bars animate from 0 to value on mount (200ms).
- [ ] Color thresholds are configurable.
- [ ] Accessible: `aria-valuenow`, `role="progressbar"`.

**Technical Notes:**
- **TailwindCSS:** `bg-red-500`, `bg-amber-500`, `bg-emerald-500`, `transition-all duration-300`.
- Use CSS `transition-[width]` for animation.

**Requirements:** REQ-03, REQ-04.

---

### US-022: Comparative Analysis Dashboard View

**As a** user
**I want** a side-by-side comparison of all my images
**So that** I can quickly pick the winner for each criterion.

**Description:**
Build `components/ComparisonGrid.tsx`:
- Grid of image thumbnails across the top.
- Grid of criterion rows underneath.
- Each cell shows the score bar for that image on that criterion.
- "Winner" column on the right shows the best image per criterion (highlighted).

**Acceptance Criteria:**
- [ ] Horizontally scrollable on mobile.
- [ ] Winner cell has a "🏆" indicator.
- [ ] Click on a cell scrolls to that image's full AnalysisCard.
- [ ] Sticky header row for criterion labels.

**Technical Notes:**
- Use CSS Grid: `grid-cols-[200px_repeat(N,minmax(120px,1fr))]`.

**Requirements:** REQ-04.

---

### US-023: Overall Winner & Recommendation Banner

**As a** user
**I want** a prominent banner showing the overall winner image
**So that** I immediately know which image scored best overall.

**Description:**
Build `components/WinnerBanner.tsx`:
- Large card at the top of the results section.
- Shows the winning image, its overall summary, and an "Overall Winner" badge.
- Animated entrance (`fade-in-up`).

**Acceptance Criteria:**
- [ ] Uses `winner_index` from API response.
- [ ] Smooth Tailwind animation on mount.
- [ ] Distinct color (gradient using `from-primary to-accent`).

**Requirements:** REQ-04.

---

### US-024: NextAuth Skeleton Setup (Credentials Provider)

**As a** developer
**I want** a minimal NextAuth setup with a Credentials provider
**So that** I have a session/JWT layer ready for the FastAPI backend to consume.

**Description:**
Create `frontend/app/api/auth/[...nextauth]/route.ts`:
- Configure NextAuth with `CredentialsProvider` (accepts any email for the POC).
- Use JWT session strategy.
- Set `NEXTAUTH_SECRET` in `.env.local`.

**Acceptance Criteria:**
- [ ] `signIn("credentials", { email: "[email protected]" })` returns a session.
- [ ] `useSession()` returns `{ user: { email } }` on client.
- [ ] Session token is a JWT (verify at https://jwt.io).
- [ ] No real password check (skeleton only).

**Technical Notes:**
- **next-auth:** v4.24+.
- Add `SessionProvider` in `app/layout.tsx`.

**Requirements:** REQ-05.

---

### US-025: Protected Route — Redirect Unauthenticated Users

**As a** user
**I want** to be redirected to a sign-in page if I'm not logged in
**So that** the app enforces authentication (skeleton level).

**Description:**
Wrap the main analyzer page in an auth check:
- If no session: redirect to `/signin`.
- If session: render the analyzer UI.

**Acceptance Criteria:**
- [ ] Unauthenticated visit to `/` → redirect to `/signin`.
- [ ] `/signin` page has a simple email form that calls `signIn("credentials")`.
- [ ] After sign-in, redirect back to `/`.

**Technical Notes:**
- Use Next.js middleware OR a client-side `useSession()` check + `useRouter().replace()`.

**Requirements:** REQ-05.

---

### US-026: FastAPI JWT Validation Skeleton

**As a** backend developer
**I want** FastAPI to validate NextAuth JWTs on protected endpoints
**So that** only authenticated users can trigger expensive LLM calls.

**Description:**
Create `app/core/security.py`:
- `get_current_user(authorization: str = Header(...)) -> dict` dependency.
- Decodes JWT using `NEXTAUTH_SECRET`.
- Returns `{"email": "..."}` payload.
- Apply to `/api/analyze` (not `/api/upload` for now, to keep onboarding simple).

**Acceptance Criteria:**
- [ ] Missing/invalid token → 401.
- [ ] Valid token → `current_user` available in route.
- [ ] Uses `pyjwt` with HS256 (NextAuth default).

**Technical Notes:**
- **FastAPI:** `from fastapi import Depends, Header, HTTPException`.
- **pyjwt:** `jwt.decode(token, SECRET, algorithms=["HS256"])`.
- Skeleton-level only — no JWKS, no key rotation.

**Requirements:** REQ-05.

---

### US-027: Send NextAuth Token from Frontend to FastAPI

**As a** frontend developer
**I want** my API client to automatically attach the NextAuth session JWT to FastAPI calls
**So that** backend auth works transparently.

**Description:**
Update `frontend/lib/api.ts`:
- Read session via `getSession()` (server) or `useSession()` (client).
- Add `Authorization: Bearer <token>` header.

**Acceptance Criteria:**
- [ ] All `analyzeImages()` calls include valid Bearer token.
- [ ] 401 response triggers client-side redirect to `/signin`.
- [ ] No token leaks to logs or browser devtools.

**Technical Notes:**
- For server components: `import { getSession } from "next-auth/react"` (or v4 helper).
- For client: `const { data: session } = useSession(); session?.accessToken`.

**Requirements:** REQ-05.

---

### US-028: Error Handling & User Feedback

**As a** user
**I want** clear error messages when something goes wrong (LLM failure, network error, invalid input)
**So that** I know what to do next.

**Description:**
Build `components/ErrorToast.tsx` and integrate:
- Catch errors in `analyzeImages()`.
- Show toast with red accent + dismiss button.
- Differentiate: 401 (redirect), 4xx (input), 5xx (retry button).

**Acceptance Criteria:**
- [ ] Toast auto-dismisses after 8 seconds.
- [ ] Retry button re-triggers the same request.
- [ ] Errors logged to console with stack trace.

**Technical Notes:**
- Tailwind animation: `animate-fade-in`, fixed positioning.

**Requirements:** REQ-04, REQ-05.

---

### US-029: Dark / Light Mode Toggle

**As a** user
**I want** to switch between dark and light themes
**So that** the app is comfortable to use in any lighting.

**Description:**
- Use `next-themes` or hand-rolled `darkMode: 'class'` in Tailwind.
- Toggle button in navbar (sun/moon icon).
- Persist choice in `localStorage`.

**Acceptance Criteria:**
- [ ] Default: respects `prefers-color-scheme`.
- [ ] Toggle transitions smoothly (no flash).
- [ ] All components render correctly in both modes (contrast check).

**Technical Notes:**
- **TailwindCSS:** `dark:bg-slate-900 dark:text-slate-100` etc.
- Set `class="dark"` on `<html>` element.

**Requirements:** REQ-04.

---

### US-030: Responsive Layout & Mobile Support

**As a** user
**I want** the app to be usable on mobile and tablet
**So that** I can review images on the go.

**Description:**
Verify and tune all major components for viewports down to 375px wide:
- Upload zone stacks vertically.
- Comparison grid becomes a stacked card list.
- Result cards switch to single-column.

**Acceptance Criteria:**
- [ ] No horizontal scroll at 375px width.
- [ ] Touch targets ≥44px.
- [ ] Tested on Chrome DevTools iPhone SE/Pixel 5 viewports.

**Technical Notes:**
- Tailwind breakpoints: `sm:`, `md:`, `lg:`.
- Use `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` patterns.

**Requirements:** REQ-04.

---

### US-031: End-to-End Smoke Test (Manual Runbook)

**As a** developer
**I want** a documented sequence to verify the full POC flow works
**So that** I can confidently demo the app and onboard new contributors.

**Description:**
Add a `RUNBOOK.md` at project root:
1. Start backend (`uvicorn app.main:app --reload`).
2. Start frontend (`npm run dev`).
3. Open `http://localhost:3000`.
4. Sign in with any email.
5. Upload 3 sample images.
6. Toggle default prompt ON.
7. Click Analyze.
8. Verify: results cards render, comparison grid shows scores, winner banner appears.

**Acceptance Criteria:**
- [ ] RUNBOOK covers happy path and 2 error cases (401, LLM timeout).
- [ ] Includes screenshots/GIFs (placeholders OK for skeleton).
- [ ] Documents all required env vars in `.env.example` files (both backend and frontend).

**Technical Notes:**
- `.env.example` files committed; real `.env` in `.gitignore`.

**Requirements:** Cross-cutting validation of REQ-01 → REQ-05.

---

### US-032: README & Developer Onboarding

**As a** new contributor
**I want** a clear README with prerequisites, setup steps, and architecture overview
**So that** I can run the project locally in under 15 minutes.

**Description:**
Root `README.md` sections:
- **Project intro** — 2-3 sentences.
- **Architecture diagram** — ASCII or markdown describing frontend ↔ backend ↔ LLM.
- **Prerequisites** — Python 3.11+, Node 20+, OpenAI API key.
- **Setup** — backend then frontend.
- **Env vars** — link to `.env.example` files.
- **How to run** — `make dev` (if Makefile present) or two commands.
- **Known limitations** — in-memory storage, no persistence, skeleton auth.

**Acceptance Criteria:**
- [ ] Fresh clone + README steps = working POC.
- [ ] Architecture diagram references FastAPI, Next.js, Tailwind, NextAuth, OpenAI.
- [ ] Lists all 30+ user stories with status (✅ / 🚧).

**Technical Notes:**
- Use a status table at the bottom mapping user stories → branches/PRs.

**Requirements:** Cross-cutting documentation.

---

## 📊 Story Coverage Matrix

| # | Story | REQ-01 | REQ-02 | REQ-03 | REQ-04 | REQ-05 |
|---|---|---|---|---|---|---|
| US-001 | Bootstrap monorepo | ✅ | ✅ | ✅ | ✅ | ✅ |
| US-002 | FastAPI project structure | ✅ | ✅ | ✅ | ✅ | ✅ |
| US-003 | Health check & CORS | — | — | — | — | ✅ |
| US-004 | Image upload endpoint | ✅ | — | — | — | — |
| US-005 | Image validation | ✅ | — | — | — | — |
| US-006 | Pillow preprocessing | ✅ | — | — | — | — |
| US-007 | Static file serving | ✅ | — | — | — | — |
| US-008 | LLM service wrapper | — | ✅ | — | — | — |
| US-009 | Default prompt template | — | ✅ | ✅ | — | — |
| US-010 | Pydantic schemas | — | — | ✅ | — | — |
| US-011 | Analyze endpoint (default) | — | ✅ | ✅ | ✅ | — |
| US-012 | Analyze endpoint (custom) | — | ✅ | ✅ | ✅ | — |
| US-013 | Next.js base layout | — | — | — | ✅ | — |
| US-014 | API client | — | ✅ | ✅ | — | — |
| US-015 | Drag-and-drop zone | ✅ | — | — | ✅ | — |
| US-016 | Image thumbnails | ✅ | — | — | ✅ | — |
| US-017 | Default prompt checkbox | — | ✅ | — | — | — |
| US-018 | Custom prompt textarea | — | ✅ | — | — | — |
| US-019 | Analyze button | — | ✅ | — | ✅ | — |
| US-020 | Result card | — | — | ✅ | ✅ | — |
| US-021 | Score bars & badges | — | — | ✅ | ✅ | — |
| US-022 | Comparison dashboard | — | — | — | ✅ | — |
| US-023 | Winner banner | — | — | — | ✅ | — |
| US-024 | NextAuth skeleton | — | — | — | — | ✅ |
| US-025 | Protected route | — | — | — | — | ✅ |
| US-026 | FastAPI JWT validation | — | — | — | — | ✅ |
| US-027 | Token forwarding | — | — | — | — | ✅ |
| US-028 | Error handling | — | — | — | ✅ | ✅ |
| US-029 | Dark/light mode | — | — | — | ✅ | — |
| US-030 | Responsive layout | — | — | — | ✅ | — |
| US-031 | E2E smoke runbook | ✅ | ✅ | ✅ | ✅ | ✅ |
| US-032 | README & onboarding | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## 🚀 Suggested Execution Order

1. **Foundation:** US-001 → US-002 → US-003 → US-013
2. **Backend upload:** US-004 → US-005 → US-006 → US-007
3. **Frontend upload UI:** US-014 → US-015 → US-016
4. **LLM integration:** US-008 → US-009 → US-010 → US-011 → US-012
5. **Frontend prompt + analyze:** US-017 → US-018 → US-019
6. **Frontend results:** US-020 → US-021 → US-022 → US-023
7. **Auth (skeleton):** US-024 → US-025 → US-026 → US-027
8. **Polish:** US-028 → US-029 → US-030
9. **Docs & verification:** US-031 → US-032

> **Persistence & advanced security are explicitly out of scope** for this skeleton — `IMAGE_STORE` is in-memory, auth is credentials-only with no real validation. These can be promoted to separate stories once the POC is validated.

---

## Bill of Materials (Dependencies)

# BOM Dependencies — AI Image Analysis App

> Since **NextAuth** is a JavaScript/TypeScript library (Next.js ecosystem) and the backend is **Python/FastAPI**, the architecture implies **two runtimes**. Therefore, two BOM files are produced: one for the Python backend, one for the Next.js frontend.

---

## 📦 BOM #1 — Python Backend (FastAPI)

### File: `bom.python.json`

```json
{
  "project": "AI Image Analysis App — Backend",
  "language": "Python",
  "stack": {
    "framework": "FastAPI",
    "ui_consumer": "TailwindCSS (rendered by Next.js)",
    "auth_consumer": "NextAuth (validates JWT issued by frontend)"
  },
  "dependencies": [
    {
      "name": "fastapi",
      "version": ">=0.110.0",
      "type": "runtime",
      "category": "Web Framework",
      "requirement_ref": "REQ-01, REQ-02, REQ-03, REQ-04, REQ-05",
      "purpose": "Core REST API framework handling image upload, LLM orchestration, structured responses, and authenticated endpoints."
    },
    {
      "name": "uvicorn[standard]",
      "version": ">=0.27.0",
      "type": "runtime",
      "category": "ASGI Server",
      "requirement_ref": "REQ-01, REQ-04",
      "purpose": "Production-grade ASGI server to run the FastAPI app, including file watching and websocket support for progress updates."
    },
    {
      "name": "python-multipart",
      "version": ">=0.0.9",
      "type": "runtime",
      "category": "File Upload",
      "requirement_ref": "REQ-01",
      "purpose": "Required by FastAPI to parse multipart/form-data payloads used for multi-image uploads."
    },
    {
      "name": "pillow",
      "version": ">=10.0.0",
      "type": "runtime",
      "category": "Image Processing",
      "requirement_ref": "REQ-01",
      "purpose": "Resize, compress, and convert uploaded images before forwarding them to the multimodal LLM to control token cost and latency."
    },
    {
      "name": "pydantic",
      "version": ">=2.6.0",
      "type": "runtime",
      "category": "Data Validation",
      "requirement_ref": "REQ-03",
      "purpose": "Define strict request/response schemas and validate the structured JSON output returned by the LLM."
    },
    {
      "name": "httpx",
      "version": ">=0.27.0",
      "type": "runtime",
      "category": "Async HTTP Client",
      "requirement_ref": "REQ-02, REQ-05",
      "purpose": "Async HTTP client used to call LLM provider APIs (with retry/backoff) and to fetch NextAuth JWKS keys for token verification."
    },
    {
      "name": "openai",
      "version": ">=1.30.0",
      "type": "runtime",
      "category": "LLM SDK",
      "requirement_ref": "REQ-02",
      "purpose": "Official Python SDK to call a multimodal LLM (e.g., GPT-4o) with image + text inputs and structured outputs."
    },
    {
      "name": "pyjwt",
      "version": ">=2.8.0",
      "type": "runtime",
      "category": "Auth Validation",
      "requirement_ref": "REQ-05",
      "purpose": "Decode and verify NextAuth-issued JWTs sent by the Next.js frontend on protected FastAPI endpoints."
    },
    {
      "name": "python-dotenv",
      "version": ">=1.0.0",
      "type": "runtime",
      "category": "Configuration",
      "requirement_ref": "REQ-02, REQ-05",
      "purpose": "Load LLM provider API keys and auth secrets from environment variables, keeping them server-side only."
    }
  ]
}
```

---

## 📦 BOM #2 — Next.js Frontend (JavaScript / TypeScript)

### File: `bom.frontend.json`

```json
{
  "project": "AI Image Analysis App — Frontend",
  "language": "TypeScript / JavaScript",
  "stack": {
    "framework": "Next.js (App Router)",
    "ui_framework": "TailwindCSS",
    "auth": "NextAuth"
  },
  "dependencies": [
    {
      "name": "next",
      "version": ">=14.2.0",
      "type": "runtime",
      "category": "Framework",
      "requirement_ref": "REQ-04, REQ-05",
      "purpose": "React-based framework providing routing, server components, API routes, and the host environment for NextAuth."
    },
    {
      "name": "react",
      "version": ">=18.3.0",
      "type": "runtime",
      "category": "UI Library",
      "requirement_ref": "REQ-01, REQ-03, REQ-04",
      "purpose": "Render the upload UI, prompt controls, and the comparative analysis dashboard."
    },
    {
      "name": "react-dom",
      "version": ">=18.3.0",
      "type": "runtime",
      "category": "UI Library",
      "requirement_ref": "REQ-04",
      "purpose": "DOM rendering for React components."
    },
    {
      "name": "next-auth",
      "version": ">=4.24.0",
      "type": "runtime",
      "category": "Authentication",
      "requirement_ref": "REQ-05",
      "purpose": "OAuth-based session management; issues JWTs consumed by the FastAPI backend to authorize LLM calls."
    },
    {
      "name": "tailwindcss",
      "version": ">=3.4.0",
      "type": "dev",
      "category": "UI Framework",
      "requirement_ref": "REQ-01, REQ-03, REQ-04",
      "purpose": "Utility-first CSS framework powering the modern, sleek UI: drag-and-drop zone, score bars, badges, skeleton loaders, dark/light mode."
    },
    {
      "name": "postcss",
      "version": ">=8.4.0",
      "type": "dev",
      "category": "Build Tool",
      "requirement_ref": "REQ-01, REQ-03, REQ-04",
      "purpose": "Required peer dependency for the TailwindCSS processing pipeline."
    },
    {
      "name": "autoprefixer",
      "version": ">=10.4.0",
      "type": "dev",
      "category": "Build Tool",
      "requirement_ref": "REQ-01, REQ-03, REQ-04",
      "purpose": "Required peer dependency for TailwindCSS to automatically add vendor prefixes."
    }
  ]
}
```

---

## 🔍 Notes & Rationale

| Concern | Decision |
|---|---|
| **Why two BOMs?** | NextAuth is a JavaScript/TypeScript library that runs inside Next.js, while the backend is Python. Each runtime requires its own dependency set. |
| **Minimum-set policy** | Only core framework, file-upload parser, image processing, validation, async HTTP, LLM SDK, JWT validator, and env loader are listed — no ORMs, no extra logging libs, no test runners (can be added later). |
| **TailwindCSS** | Listed as a dev dependency in the frontend BOM, as is standard for Next.js projects. |
| **Optional / dev-time additions** (not included to keep BOM minimal): `pytest`, `httpx[cli]` testing utilities, `ruff`/`black` linters, `prettier`, `eslint`, `typescript`, `@types/*`, `clsx` for class composition. Add only as your project scales. |
| **Provider swap** | If you switch from OpenAI to Anthropic or Gemini later, replace the `openai` package with `anthropic` or `google-generativeai` — no other FastAPI code change is required thanks to the abstraction layer recommended in REQ-02. |

---

## Database Schema Design

# 🗄️ PostgreSQL Schema — AI Image Analysis App

> **Aligned with:** Python · FastAPI · Next.js (App Router) · TailwindCSS · NextAuth · Pydantic · OpenAI multimodal
> **Derived from:** REQ-01 → REQ-05 + 32 user stories (US-001 → US-032)
> **Design goal:** a normalized, auditable relational schema that supports the proof-of-concept skeleton (US-001) but is shaped for production-grade persistence, history, replay, and analytics as the app evolves beyond in-memory storage.

---

## 1. 🧭 Overview of Entities

| # | Table | Purpose | Mapped Stories |
|---|---|---|---|
| 1 | `users` | NextAuth user accounts (canonical identity) | US-024 → US-027 |
| 2 | `accounts` | OAuth provider linkage (NextAuth) | US-024 |
| 3 | `sessions` | Optional DB session store (NextAuth) | US-024 |
| 4 | `verification_tokens` | NextAuth email verification | US-024 |
| 5 | `criteria` | Lookup of the 7 analysis dimensions | US-009, US-010, US-021 |
| 6 | `prompts` + `prompt_versions` | Default + user-saved prompt templates | US-009, US-017, US-018 |
| 7 | `images` | Uploaded image records + storage pointers | US-004 → US-007, US-015, US-016 |
| 8 | `analysis_runs` | A single batch analysis job | US-008, US-011, US-012, US-019 |
| 9 | `analysis_results` | Per-image findings inside a run | US-011, US-012, US-020 |
| 10 | `criterion_scores` | 0-10 scores per criterion per result | US-010, US-021, US-022 |

---

## 2. 🔗 Relationship Model

```
users 1───* accounts          (NextAuth OAuth links)
users 1───* sessions          (NextAuth DB sessions — optional)
users 1───* images            (uploaded files)
users 1───* prompts           (custom prompt templates)
users 1───* analysis_runs     (batch analysis jobs)

prompts 1───* prompt_versions     (audit trail of edits)
prompts 1───* analysis_runs      (FK: prompt_id — nullable)

analysis_runs 1───* analysis_results  (one row per image)
images        1───* analysis_results  (an image can be re-analyzed)
analysis_runs *───1 images (winner_image_id)  (overall winner pointer)

analysis_results 1───* criterion_scores
criteria         1───* criterion_scores
```

The **`users` ↔ `images` ↔ `analysis_runs` ↔ `analysis_results` ↔ `criterion_scores`** chain captures the entire data lifecycle described in the user stories.

---

## 3. 📚 Entity Details

### 3.1 Authentication Cluster (NextAuth-compatible)

- **`users`** — central identity record; mirrors what NextAuth expects (`id`, `email`, `name`, `image`, `email_verified`).
- **`accounts`** — NextAuth's per-provider link (Google, GitHub, etc.), used when non-credentials sign-in is added.
- **`sessions`** — present for NextAuth's database-session strategy; with the JWT strategy (US-024 default) it stays empty but available for a future toggle.
- **`verification_tokens`** — NextAuth's email-verification flow, optional for the POC.

### 3.2 Analysis Configuration

- **`criteria`** — a lookup table seeded with the **7 criteria** explicitly named in the project idea (attractiveness, color_balance, selling_idea, trending_viral_concept, marketing_message, product_presentation, value_message). Modeling them as rows (instead of an enum) lets you add new criteria, edit descriptions, or hide them without a schema migration.
- **`prompts`** — stores both the **system default** (`is_system_default = TRUE`) and **user-saved custom prompts**. The default row carries the well-engineered prompt written in US-009.
- **`prompt_versions`** — append-only history so a user can re-run an analysis with an older version of their prompt (auditability, A/B testing).

### 3.3 Image Storage

- **`images`** — one row per uploaded file. The actual binary lives outside Postgres (filesystem, S3, R2…) referenced by `storage_path`. The row also stores the `sha256_hash` for **deduplication and cache lookups** (an explicit pipeline described in the project elaboration). `width`/`height` come from the Pillow preprocessing step (US-006). `metadata` is a `JSONB` for EXIF and future enrichment.

### 3.4 Analysis Pipeline

- **`analysis_runs`** — one row per user-initiated batch analysis. Carries the **prompt mode** (`default`, `custom`, `hybrid`), the resolved `prompt_id` (if any), the verbatim `custom_prompt_text` (if `use_default_prompt = FALSE`), the `llm_provider` / `llm_model`, and the **overall winner** (`winner_image_id`) plus free-form `overall_summary`. Token counts and `latency_ms` enable cost dashboards. A `CHECK` constraint enforces the invariant that exactly one of `use_default_prompt` ↔ `custom_prompt_text` is meaningful.
- **`analysis_results`** — one row per image per run. Contains the human-readable fields (`summary`, `recommendation`, `strongest_criterion`, `weakest_criterion`, `confidence`) and the **full raw LLM response** in `JSONB` for replay/audit.
- **`criterion_scores`** — narrow table holding the **0-10 score per criterion per result**. Having one row per (result × criterion) makes "winner per criterion" queries simple (used by the comparison grid in US-022) and keeps updates to scoring scales a metadata change, not a schema change.

---

## 4. 🏷️ Naming Conventions

| Layer | Convention | Example |
|---|---|---|
| Tables | **plural**, `snake_case` | `analysis_runs`, `criterion_scores` |
| Columns | `snake_case` | `winner_image_id`, `created_at` |
| Primary key | `id` (UUID) | `id UUID PRIMARY KEY DEFAULT gen_random_uuid()` |
| Foreign key | `<referenced_table_singular>_id` | `user_id`, `image_id`, `result_id` |
| Timestamps | `created_at`, `updated_at`, `*_at` | `completed_at`, `email_verified` |
| Booleans | `is_*`, `use_*` | `is_active`, `use_default_prompt` |
| Enums (PG types) | `PascalCase` | `analysis_status`, `prompt_mode` |
| Indexes | `idx_<table>_<col_or_purpose>` | `idx_analysis_runs_user_created` |
| Triggers | `trg_<table>_<purpose>` | `trg_users_updated_at` |
| Constraints | `<table>_<purpose>` | `criterion_scores_range` |

---

## 5. ⚡ Indexing Strategy

| Index | Purpose |
|---|---|
| `users(email)` UNIQUE | NextAuth lookup; sign-in |
| `accounts(provider, provider_account_id)` UNIQUE | NextAuth OAuth link |
| `sessions(session_token)` UNIQUE + `sessions(expires)` | Session lookup + cleanup |
| `images(user_id)`, `images(user_id, sha256_hash)` | Per-user gallery + dedup lookups |
| `images(created_at DESC)` | Chronological sorting in galleries |
| `prompts(is_system_default) WHERE is_system_default = TRUE` | Partial index — single hot lookup |
| `analysis_runs(user_id, created_at DESC)` | History dashboards (US-031) |
| `analysis_runs(status)` | Queue/worker polling |
| `analysis_results(run_id)`, `analysis_results(image_id)` | Run detail page + re-analysis lookups |
| `criterion_scores(result_id)`, `criterion_scores(criterion_id)` | Comparison grid aggregations |
| `idx_prompt_versions_prompt_id` | Version history fetch |

Partial indexes and composite indexes are preferred over blanket indexes to keep write amplification low while still covering the read patterns of the comparison dashboard and history views.

---

## 6. ⚖️ Trade-offs & Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| **PK type** | `UUID` (`gen_random_uuid()`) | Avoids enumeration attacks on `/api/images/{id}` (US-007), allows client-side ID generation, plays well with distributed deploys. |
| **Criteria** | Lookup table (not enum) | Lets you add/edit criteria without DDL migrations (REQ-04 evolution). |
| **Prompt mode** | Enum + nullable FK + free text | Captures all US-009/US-011/US-012 states cleanly with a single `CHECK` invariant. |
| **Image bytes** | Out-of-DB (filesystem/S3) + path in row | Postgres TOAST would bloat the DB; S3/R2 is the natural home for media. |
| **Raw LLM response** | Stored in `JSONB` | Auditable, replayable, lets future versions re-score without re-calling the API. |
| **Winner** | Stored pointer + recomputable | Stored for fast "winner banner" render (US-023); recomputable via aggregation over `criterion_scores` when criteria evolve. |
| **Cascade rules** | `CASCADE` for owned data, `SET NULL` for cross-references, `RESTRICT` for lookup tables | Deleting a user wipes their data; deleting an image nulls the winner reference; deleting a `criteria` row is blocked if used. |
| **Sessions table** | Included but unused in JWT mode | Future-proofs a single-line NextAuth config swap to DB sessions. |
| **No `tags`, `comments`, `collections`** | Omitted | Not required by the 5 core requirements; can be added without breaking existing tables. |
| **No `comparisons` table** | Omitted | A/B comparison mode (project elaboration, "future") can be modeled later by adding a `comparison_id` column on `analysis_runs`. |

### What's intentionally NOT modeled
- **Real-time progress stream** (SSE/WebSocket) — handled by in-memory pub/sub in the FastAPI process; no DB row needed.
- **Token-usage billing ledger** — `analysis_runs.total_input_tokens` is enough for the POC; full ledger can be derived.
- **Audit log table** — `prompt_versions`, `raw_response JSONB`, and `updated_at` triggers cover current audit needs.

---

## 7. 🧱 DDL

```sql
-- ============================================================
-- PostgreSQL Schema: AI Image Analysis App
-- Aligned with: FastAPI + Next.js + TailwindCSS + NextAuth
-- Source: REQ-01..REQ-05, US-001..US-032
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";   -- gen_random_uuid()

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE analysis_status AS ENUM (
    'queued',
    'processing',
    'completed',
    'failed',
    'cancelled'
);

CREATE TYPE prompt_mode AS ENUM (
    'default',
    'custom',
    'hybrid'
);

CREATE TYPE llm_provider AS ENUM (
    'openai',
    'anthropic',
    'google',
    'other'
);

-- ============================================================
-- 1. USERS (NextAuth-compatible identity)
-- ============================================================
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(255),
    email           VARCHAR(320) NOT NULL,
    email_verified  TIMESTAMPTZ,
    image           TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT users_email_unique UNIQUE (email)
);

-- ============================================================
-- 2. ACCOUNTS (NextAuth OAuth provider links)
-- ============================================================
CREATE TABLE accounts (
    id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id               UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type                  VARCHAR(64) NOT NULL,
    provider              VARCHAR(64) NOT NULL,
    provider_account_id   VARCHAR(255) NOT NULL,
    refresh_token         TEXT,
    access_token          TEXT,
    expires_at            INTEGER,
    token_type            VARCHAR(64),
    scope                 TEXT,
    id_token              TEXT,
    session_state         TEXT,
    created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT accounts_provider_unique
        UNIQUE (provider, provider_account_id)
);

-- ============================================================
-- 3. SESSIONS (NextAuth DB session strategy — optional with JWT)
-- ============================================================
CREATE TABLE sessions (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_token VARCHAR(255) NOT NULL UNIQUE,
    user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires       TIMESTAMPTZ NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 4. VERIFICATION_TOKENS (NextAuth email verification)
-- ============================================================
CREATE TABLE verification_tokens (
    identifier  VARCHAR(255) NOT NULL,
    token       VARCHAR(255) NOT NULL,
    expires     TIMESTAMPTZ NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (identifier, token)
);

-- ============================================================
-- 5. CRITERIA (Catalog of analysis dimensions)
-- ============================================================
CREATE TABLE criteria (
    id           SERIAL PRIMARY KEY,
    key          VARCHAR(64) NOT NULL UNIQUE,
    label        VARCHAR(128) NOT NULL,
    description  TEXT,
    min_score    SMALLINT NOT NULL DEFAULT 0,
    max_score    SMALLINT NOT NULL DEFAULT 10,
    sort_order   INTEGER NOT NULL DEFAULT 0,
    is_active    BOOLEAN NOT NULL DEFAULT TRUE,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO criteria (key, label, description, sort_order) VALUES
    ('attractiveness',         'Attractiveness',          'How visually compelling and aesthetically pleasing the image is.', 1),
    ('color_balance',          'Color Balance',           'Quality of color harmony, contrast, and tonal composition.', 2),
    ('selling_idea',           'Selling Idea',            'Strength and clarity of the underlying commercial concept.', 3),
    ('trending_viral_concept', 'Trending / Viral Concept','Likelihood of resonating with current social/trend culture.', 4),
    ('marketing_message',      'Marketing Message',       'Clarity, persuasiveness and memorability of the marketing message.', 5),
    ('product_presentation',   'Well-presented Product',  'How effectively the product is staged, lit and showcased.', 6),
    ('value_message',          'Value Message',           'How clearly the perceived value proposition is communicated.', 7);

-- ============================================================
-- 6. PROMPTS (system default + user-saved templates)
-- ============================================================
CREATE TABLE prompts (
    id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id            UUID REFERENCES users(id) ON DELETE SET NULL,
    name               VARCHAR(255) NOT NULL,
    body               TEXT NOT NULL,
    is_system_default  BOOLEAN NOT NULL DEFAULT FALSE,
    version            INTEGER NOT NULL DEFAULT 1,
    is_active          BOOLEAN NOT NULL DEFAULT TRUE,
    created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT prompts_system_has_no_user CHECK (
        (is_system_default = FALSE AND user_id IS NOT NULL) OR
        (is_system_default = TRUE)
    )
);

CREATE TABLE prompt_versions (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prompt_id   UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
    version     INTEGER NOT NULL,
    body        TEXT NOT NULL,
    created_by  UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT prompt_versions_unique UNIQUE (prompt_id, version)
);

-- ============================================================
-- 7. IMAGES (uploaded image records)
-- ============================================================
CREATE TABLE images (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    filename        VARCHAR(512) NOT NULL,
    content_type    VARCHAR(64) NOT NULL,
    size_bytes      BIGINT NOT NULL,
    storage_path    TEXT NOT NULL,
    storage_backend VARCHAR(32) NOT NULL DEFAULT 'local',
    sha256_hash     CHAR(64) NOT NULL,
    width           INTEGER,
    height          INTEGER,
    status          VARCHAR(32) NOT NULL DEFAULT 'uploaded',
    error_message   TEXT,
    metadata        JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT images_status_valid CHECK (
        status IN ('uploaded', 'processing', 'ready', 'failed')
    ),
    CONSTRAINT images_size_positive CHECK (size_bytes >= 0)
);

-- ============================================================
-- 8. ANALYSIS_RUNS (a single batch analysis job)
-- ============================================================
CREATE TABLE analysis_runs (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    prompt_id           UUID REFERENCES prompts(id) ON DELETE SET NULL,
    custom_prompt_text  TEXT,
    use_default_prompt  BOOLEAN NOT NULL DEFAULT TRUE,
    prompt_mode         prompt_mode NOT NULL DEFAULT 'default',
    llm_provider        llm_provider NOT NULL DEFAULT 'openai',
    llm_model           VARCHAR(128) NOT NULL DEFAULT 'gpt-4o',
    status              analysis_status NOT NULL DEFAULT 'queued',
    image_count         INTEGER NOT NULL DEFAULT 0,
    winner_image_id     UUID REFERENCES images(id) ON DELETE SET NULL,
    overall_summary     TEXT,
    total_input_tokens  INTEGER,
    total_output_tokens INTEGER,
    latency_ms          INTEGER,
    error_message       TEXT,
    raw_response        JSONB,
    started_at          TIMESTAMPTZ,
    completed_at        TIMESTAMPTZ,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT analysis_runs_prompt_consistency CHECK (
        (prompt_mode = 'default'  AND use_default_prompt = TRUE  AND custom_prompt_text IS NULL) OR
        (prompt_mode = 'custom'   AND use_default_prompt = FALSE AND custom_prompt_text IS NOT NULL) OR
        (prompt_mode = 'hybrid'   AND custom_prompt_text IS NOT NULL)
    ),
    CONSTRAINT analysis_runs_image_count_positive CHECK (image_count >= 0),
    CONSTRAINT analysis_runs_tokens_non_negative CHECK (
        (total_input_tokens  IS NULL OR total_input_tokens  >= 0) AND
        (total_output_tokens IS NULL OR total_output_tokens >= 0)
    ),
    CONSTRAINT analysis_runs_completion_consistency CHECK (
        (status = 'completed' AND completed_at IS NOT NULL) OR
        (status <> 'completed')
    )
);

-- ============================================================
-- 9. ANALYSIS_RESULTS (per-image result inside a run)
-- ============================================================
CREATE TABLE analysis_results (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    run_id              UUID NOT NULL REFERENCES analysis_runs(id) ON DELETE CASCADE,
    image_id            UUID NOT NULL REFERENCES images(id) ON DELETE CASCADE,
    image_index         INTEGER NOT NULL,
    summary             TEXT,
    strongest_criterion VARCHAR(64),
    weakest_criterion   VARCHAR(64),
    recommendation      TEXT,
    confidence          SMALLINT,
    raw_response        JSONB,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT analysis_results_image_unique_per_run UNIQUE (run_id, image_id),
    CONSTRAINT analysis_results_image_index_unique   UNIQUE (run_id, image_index),
    CONSTRAINT analysis_results_confidence_range     CHECK (
        confidence IS NULL OR (confidence >= 0 AND confidence <= 100)
    ),
    CONSTRAINT analysis_results_index_non_negative    CHECK (image_index >= 0)
);

-- ============================================================
-- 10. CRITERION_SCORES (0-10 score per criterion per result)
-- ============================================================
CREATE TABLE criterion_scores (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    result_id    UUID NOT NULL REFERENCES analysis_results(id) ON DELETE CASCADE,
    criterion_id INTEGER NOT NULL REFERENCES criteria(id) ON DELETE RESTRICT,
    score        SMALLINT NOT NULL,
    rationale    TEXT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT criterion_scores_unique UNIQUE (result_id, criterion_id),
    CONSTRAINT criterion_scores_range  CHECK (score >= 0 AND score <= 10)
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_accounts_user_id                ON accounts(user_id);

CREATE INDEX idx_sessions_user_id                ON sessions(user_id);
CREATE INDEX idx_sessions_expires                ON sessions(expires);

CREATE INDEX idx_images_user_id                  ON images(user_id);
CREATE INDEX idx_images_created_at               ON images(created_at DESC);
CREATE INDEX idx_images_user_hash                ON images(user_id, sha256_hash);
CREATE INDEX idx_images_status                   ON images(status);

CREATE INDEX idx_prompts_user_id                 ON prompts(user_id);
CREATE INDEX idx_prompts_system_default_active
    ON prompts(is_system_default) WHERE is_system_default = TRUE;
CREATE INDEX idx_prompt_versions_prompt_id       ON prompt_versions(prompt_id);

CREATE INDEX idx_analysis_runs_user_id           ON analysis_runs(user_id);
CREATE INDEX idx_analysis_runs_status             ON analysis_runs(status);
CREATE INDEX idx_analysis_runs_user_created      ON analysis_runs(user_id, created_at DESC);
CREATE INDEX idx_analysis_runs_winner_image      ON analysis_runs(winner_image_id);

CREATE INDEX idx_analysis_results_run_id         ON analysis_results(run_id);
CREATE INDEX idx_analysis_results_image_id       ON analysis_results(image_id);

CREATE INDEX idx_criterion_scores_result_id      ON criterion_scores(result_id);
CREATE INDEX idx_criterion_scores_criterion_id   ON criterion_scores(criterion_id);

-- ============================================================
-- UPDATED-AT TRIGGERS
-- ============================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_accounts_updated_at
    BEFORE UPDATE ON accounts
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_prompts_updated_at
    BEFORE UPDATE ON prompts
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_images_updated_at
    BEFORE UPDATE ON images
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_analysis_runs_updated_at
    BEFORE UPDATE ON analysis_runs
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
```

---

## 8. ✅ Coverage Against the Project Backlog

| Requirement | Where it's satisfied |
|---|---|
| **REQ-01** (Multi-Image Upload & Preprocessing) | `images` table + indexes on `user_id`, `sha256_hash` (dedup), `width/height` (Pillow output). |
| **REQ-02** (Multimodal LLM & Prompt Orchestration) | `prompts`, `prompt_versions`, `analysis_runs.prompt_mode`, `llm_provider`, `llm_model`, `custom_prompt_text`. |
| **REQ-03** (Structured Output Schema) | `analysis_results` + `criterion_scores` mirror the Pydantic `AnalysisResult` from US-010; `raw_response JSONB` keeps the full payload for replay. |
| **REQ-04** (Comparative Analysis Dashboard) | Composite indexes on `analysis_runs`, plus per-criterion rows enabling fast "winner per criterion" queries (US-022) and a stored `winner_image_id` for the banner (US-023). |
| **REQ-05** (Authentication) | NextAuth-compatible `users` / `accounts` / `sessions` / `verification_tokens` — FastAPI validates the JWT, but the canonical user lives here (US-026, US-027). |

This schema gives the **proof-of-concept skeleton** a clean upgrade path: the very first iteration can keep `IMAGE_STORE` in memory as described in US-004, but the moment persistence is introduced, the table is already shaped to absorb the data with no API changes — only swapping the storage layer.

---

## Webflow / UI Flow

# Image Analyzer — User Flow & Screen Mockups

> **Stack:** Python · FastAPI · Next.js (App Router) · TailwindCSS · NextAuth · PostgreSQL
> **Source:** US-001 → US-032, REQ-01 → REQ-05
> **Mode:** Proof-of-concept skeleton (in-memory `IMAGE_STORE`, JWT-based auth, no DB persistence)

---

## User Flow

```mermaid
graph TD
    A[Landing Page<br/>Hello World Hero] --> B{Session Valid?}
    B -->|No| C[Sign In Page<br/>Credentials Provider]
    B -->|Yes| D[Main Analyzer Page<br/>Empty Upload State]
    C --> C1[Enter Email]
    C1 --> C2[Submit signIn credentials]
    C2 -->|Success| D
    C2 -->|Error| C

    D --> E[Drag-and-Drop Upload Zone]
    E -->|Drop / Browse| F[Upload Files<br/>POST /api/upload]
    F -->|Validation OK| G[Image Gallery<br/>Thumbnails + Remove]
    F -->|Validation Fail| D1[Inline Error Toast]
    D1 --> D

    G --> H{Prompt Mode?}
    H -->|Default checked| I[Default Prompt Config<br/>Prompt is_system_default=true]
    H -->|Default unchecked| J[Custom Prompt Textarea<br/>custom_prompt_text field]

    I --> K[Analyze Button<br/>POST /api/analyze]
    J --> K
    G --> K

    K --> L[Analysis Loading State<br/>queued → processing]
    L -->|LLM Success| M[Results Page]
    L -->|LLM Failure| N[Error Toast + Retry]
    N --> D

    M --> O[Winner Banner<br/>analysis_runs.winner_image_id]
    M --> P[Comparison Dashboard<br/>criterion_scores grid]
    M --> Q[Per-Image Analysis Cards<br/>analysis_results rows]

    P --> R[Score Visualization<br/>bars + badges]
    Q --> R

    R --> S{More Actions?}
    S -->|New Analysis| D
    S -->|Sign Out| C

    D --> T[Theme Toggle<br/>dark/light]
    T --> D
```

---

## Screen Mockups

### 1. Landing Page (US-001)

```
+------------------------------------------------------------+
|  [Logo]  Image Analyzer                  [☀/☾]   [Sign In] |
+------------------------------------------------------------+
|                                                            |
|                                                            |
|             ┌──────────────────────────────────┐           |
|             │     AI-Powered Image Analysis    │           |
|             └──────────────────────────────────┘           |
|                                                            |
|        Upload images. Get marketing insights in           |
|             seconds with multimodal AI.                    |
|                                                            |
|                   ┌─────────────────┐                     |
|                   │  Get Started  → │                     |
|                   └─────────────────┘                     |
|                                                            |
|       ✓ Multi-criteria scoring                            |
|       ✓ Default & custom prompts                          |
|       ✓ Side-by-side comparison                           |
|                                                            |
+------------------------------------------------------------+
```

---

### 2. Sign In Page (US-024, US-025)

```
+------------------------------------------------------------+
|  [Logo]  Image Analyzer                  [☀/☾]            |
+------------------------------------------------------------+
|                                                            |
|                                                            |
|             ┌────────────────────────────────┐             |
|             │          Sign In               │             |
|             └────────────────────────────────┘             |
|             │                                │             |
|             │  Email                         │             |
|             │  [_______________________]     │             |
|             │                                │             |
|             │  ┌───────────────────────┐     │             |
|             │  │      Sign In          │     │             |
|             │  └───────────────────────┘     │             |
|             │                                │             |
|             │  Powered by NextAuth           │             |
|             └────────────────────────────────┘             |
|                                                            |
|   No real password required — POC skeleton mode           |
+------------------------------------------------------------+
```

---

### 3. Main Analyzer Page — Empty State (US-013, US-015)

```
+------------------------------------------------------------+
|  [Logo]  Image Analyzer    [☀/☾]  [user@email.com]  [↪]  |
+------------------------------------------------------------+
|                                                            |
|  ┌──────────────────────────────────────────────────────┐ |
|  │  Upload Your Images                                   │ |
|  │  ┌────────────────────────────────────────────────┐   │ |
|  │  │                                                │   │ |
|  │  │              [ + ]                            │   │ |
|  │  │                                                │   │ |
|  │  │     Drag & drop images here                    │   │ |
|  │  │         or click to browse                     │   │ |
|  │  │                                                │   │ |
|  │  │   Supported: JPG, PNG, WEBP — max 10MB each   │   │ |
|  │  │                                                │   │ |
|  │  └────────────────────────────────────────────────┘   │ |
|  └──────────────────────────────────────────────────────┘ |
|                                                            |
|  ┌──────────────────────────────────────────────────────┐ |
|  │  Analysis Prompt                                      │ |
|  │  ┌────────────────────────────────────────────────┐   │ |
|  │  │ [x] Use default analysis prompt                │   │ |
|  │  │      (covers: attractiveness, color balance,   │   │ |
|  │  │       selling idea, trending, marketing msg,   │   │ |
|  │  │       product presentation, value message)    │   │ |
|  │  └────────────────────────────────────────────────┘   │ |
|  └──────────────────────────────────────────────────────┘ |
|                                                            |
|                          ┌─────────────────────┐          |
|                          │  Analyze Images  →  │          |
|                          │      (disabled)     │          |
|                          └─────────────────────┘          |
|                                                            |
+------------------------------------------------------------+
```

---

### 4. Main Analyzer Page — With Uploaded Images (US-016, US-017)

```
+------------------------------------------------------------+
|  [Logo]  Image Analyzer    [☀/☾]  [user@email.com]  [↪]  |
+------------------------------------------------------------+
|                                                            |
|  Uploaded Images (3)                  [ + Add More ]      |
|  ┌──────────┐   ┌──────────┐   ┌──────────┐               |
|  │  [IMG 1] │   │  [IMG 2] │   │  [IMG 3] │               |
|  │   [×]    │   │   [×]    │   │   [×]    │               |
|  │ photo1.jpg│   │photo2.png│   │photo3.webp│               |
|  │  1.2 MB  │   │  2.4 MB  │   │  0.8 MB  │               |
|  └──────────┘   └──────────┘   └──────────┘               |
|                                                            |
|  ┌──────────────────────────────────────────────────────┐ |
|  │  Analysis Prompt                                      │ |
|  │  ┌────────────────────────────────────────────────┐   │ |
|  │  │ [x] Use default analysis prompt                │   │ |
|  │  │      Default covers: attractiveness, color     │   │ |
|  │  │      balance, selling idea, trending/viral,    │   │ |
|  │  │      marketing msg, presentation, value.       │   │ |
|  │  └────────────────────────────────────────────────┘   │ |
|  └──────────────────────────────────────────────────────┘ |
|                                                            |
|                          ┌─────────────────────┐          |
|                          │ Analyze 3 Images  → │          |
|                          └─────────────────────┘          |
|                                                            |
+------------------------------------------------------------+
```

---

### 5. Custom Prompt Mode (US-018)

```
+------------------------------------------------------------+
|  ┌──────────────────────────────────────────────────────┐ |
|  │  Analysis Prompt                                      │ |
|  │  ┌────────────────────────────────────────────────┐   │ |
|  │  │ [ ] Use default analysis prompt                │   │ |
|  │  └────────────────────────────────────────────────┘   │ |
|  │                                                       │ |
|  │  ┌────────────────────────────────────────────────┐   │ |
|  │  │ Custom Prompt (max 2000 chars):                │   │ |
|  │  │ ┌────────────────────────────────────────────┐ │   │ |
|  │  │ │ e.g., Focus on product photography         │ │   │ |
|  │  │ │ lighting and emotional appeal...           │ │   │ |
|  │  │ │                                            │ │   │ |
|  │  │ │                                            │ │   │ |
|  │  │ └────────────────────────────────────────────┘ │   │ |
|  │  │                                       45 / 2000 │   │ |
|  │  │                                                │   │ |
|  │  │ ⚠ The LLM should still return the standard     │   │ |
|  │  │   JSON schema (scores, summary, etc.)         │   │ |
|  │  └────────────────────────────────────────────────┘   │ |
|  └──────────────────────────────────────────────────────┘ |
|                                                            |
+------------------------------------------------------------+
```

---

### 6. Analysis Loading State (US-019)

```
+------------------------------------------------------------+
|  [Logo]  Image Analyzer    [☀/☾]  [user@email.com]  [↪]  |
+------------------------------------------------------------+
|                                                            |
|                                                            |
|                       ◠  ◠  ◠                               |
|                     (  spinner  )                          |
|                       ◡  ◡  ◡                               |
|                                                            |
|           Analyzing 3 images with multimodal AI...         |
|                                                            |
|              ██████████████░░░░░░░░  60%                   |
|                                                            |
|              ▸ Image 1/3 ✓                                |
|              ▸ Image 2/3 …                                |
|              ▸ Image 3/3 queued                           |
|                                                            |
|              ⏱  This typically takes 15–30 seconds         |
|                                                            |
|                                                            |
+------------------------------------------------------------+
```

---

### 7. Results Page — Winner Banner (US-023)

```
+------------------------------------------------------------+
|  [Logo]  Image Analyzer    [☀/☾]  [user@email.com]  [↪]  |
+------------------------------------------------------------+
|                                                            |
|  ┌──────────────────────────────────────────────────────┐ |
|  │  🏆  OVERALL WINNER                                    │ |
|  │  ┌──────────┐                                          │ |
|  │  │          │  photo2.png  •  Confidence: 87%        │ |
|  │  │  IMG 2   │                                          │ |
|  │  │          │  "Excellent color balance and            │ |
|  │  └──────────┘   marketing message. Highly              │ |
|  │                  recommended for social media           │ |
|  │                  campaigns targeting Gen Z."           │ |
|  │                                                        │ |
|  │  [ View Full Analysis ↓ ]                              │ |
|  └──────────────────────────────────────────────────────┘ |
|                                                            |
|  Comparative Analysis                                     |
|  ────────────────────────                                  |
|                                                            |
+------------------------------------------------------------+
```

---

### 8. Comparison Dashboard (US-022)

```
+------------------------------------------------------------+
|  Comparative Analysis                                     |
|  ┌────────────┬─────────┬─────────┬─────────┬───────────┐  |
|  │ Criterion  │ [IMG 1] │ [IMG 2] │ [IMG 3] │  Winner   │  |
|  ├────────────┼─────────┼─────────┼─────────┼───────────┤  |
|  │ Attractive │ ███░ 7  │ ████ 8  │ █████ 9 │  🏆 IMG 3 │  |
|  │ Color Bal. │ ██████10│ ████ 8  │ ███  7  │  🏆 IMG 1 │  |
|  │ Selling    │ ████ 8  │ ████ 8  │ ██   5  │  🏆 TIE   │  |
|  │ Trending   │ ███  7  │ ███  6  │ █████ 9 │  🏆 IMG 3 │  |
|  │ Marketing  │ █████ 9 │ ████ 8  │ ███  7  │  🏆 IMG 1 │  |
|  │ Product Pr.│ ███  7  │ ██████10│ ████ 8  │  🏆 IMG 2 │  |
|  │ Value      │ ████ 8  │ ████ 8  │ ████ 8  │  🏆 TIE   │  |
|  └────────────┴─────────┴─────────┴─────────┴───────────┘  |
|                                                            |
|  Click any cell to jump to the per-image card below       |
+------------------------------------------------------------+
```

---

### 9. Per-Image Analysis Card (US-020)

```
+------------------------------------------------------------+
|  ┌──────────────────────────────────────────────────────┐ |
|  │  ┌────────┐  Image #2 — photo2.png                    │ |
|  │  │        │  Confidence:  87 %                        │ |
|  │  │ IMG 2  │                                             │ |
|  │  │        │  Summary:                                  │ |
|  │  └────────┘  "Excellent color balance with a clear     │ |
|  │              marketing message and strong value prop." │ |
|  │                                                       │ |
|  │  Strongest criterion:  product_presentation  (10/10)  │ |
|  │  Weakest  criterion:  trending_viral_concept (6/10)   │ |
|  │                                                       │ |
|  │  Recommendation:                                      │ |
|  │  ┌─────────────────────────────────────────────────┐  │ |
|  │  │ Add more viral hooks (e.g., trending audio,    │  │ |
|  │  │ meme references) to broaden appeal to Gen Z.    │  │ |
|  │  └─────────────────────────────────────────────────┘  │ |
|  │                                                       │ |
|  │  [ ▼  Score Breakdown  ]                              │ |
|  └──────────────────────────────────────────────────────┘ |
+------------------------------------------------------------+
```

---

### 10. Score Visualization (US-021)

```
+------------------------------------------------------------+
|  Score Breakdown — Image #2                               |
|                                                            |
|  Attractiveness           ████████░░   8 / 10   ●●●●○○○○  |
|  Color Balance            ████████░░   8 / 10   ●●●●○○○○  |
|  Selling Idea             ████████░░   8 / 10   ●●●●○○○○  |
|  Trending / Viral Concept ██████░░░░   6 / 10   ●●●○○○○○○  |
|  Marketing Message        ████████░░   8 / 10   ●●●●○○○○  |
|  Product Presentation     ██████████   10/ 10   ●●●●●●●●●  |
|  Value Message            ████████░░   8 / 10   ●●●●○○○○  |
|                                                            |
|   Legend: ● 0-3 (red)   ● 4-6 (amber)   ● 7-10 (green)    |
+------------------------------------------------------------+
```

---

### 11. Error Toast / Failure State (US-028)

```
+------------------------------------------------------------+
|  [Logo]  Image Analyzer    [☀/☾]  [user@email.com]  [↪]  |
+------------------------------------------------------------+
|                                                            |
|  ┌──────────────────────────────────────────────────────┐ |
|  │  ⚠  Analysis Failed                                  │ |
|  │                                                      │ |
|  │  The AI service did not respond (HTTP 502).          │ |
|  │  This may be due to a temporary rate limit           │ |
|  │  or upstream provider issue.                         │ |
|  │                                                      │ |
|  │                          [ Retry ]   [ Dismiss ]     │ |
|  └──────────────────────────────────────────────────────┘ |
|                                                            |
|  Uploaded Images (3)                                      |
|  ┌──────────┐   ┌──────────┐   ┌──────────┐               |
|  │  [IMG 1] │   │  [IMG 2] │   │  [IMG 3] │               |
|  └──────────┘   └──────────┘   └──────────┘               |
|                                                            |
+------------------------------------------------------------+
```

---

### 12. Theme Toggle — Dark Mode Navbar (US-029)

```
+------------------------------------------------------------+
|  [Logo]  Image Analyzer    [☾ Dark] [user@email.com] [↪]  |
+------------------------------------------------------------+
|                                                            |
|   (Surface: slate-900 · Text: slate-100 · Accent: indigo) |
|                                                            |
|   •  Cards use elevated surface (slate-800)               |
|   •  Score bars retain red/amber/green thresholds        |
|   •  Smooth transition on toggle (no flash)               |
|                                                            |
+------------------------------------------------------------+
```

---

### 13. Empty / Onboarding State (US-015 fallback)

```
+------------------------------------------------------------+
|  Welcome, user@email.com 👋                               |
|                                                            |
|  ┌──────────────────────────────────────────────────────┐ |
|  │       How it works                                    │ |
|  │                                                       │ |
|  │   1.  Upload up to N images (JPG, PNG, WEBP)          │ |
|  │   2.  Pick the default prompt OR write your own       │ |
|  │   3.  Click Analyze and review side-by-side scores     │ |
|  │                                                       │ |
|  │   [   Upload Your First Images   ]                    │ |
|  └──────────────────────────────────────────────────────┘ |
+------------------------------------------------------------+
```

---

## Story-to-Screen Mapping

| Story | Title | Mapped Flow Node(s) | Wireframe # |
|-------|-------|---------------------|-------------|
| US-001 | Bootstrap Monorepo | Landing Page | #1 |
| US-002 | FastAPI Project Structure | (Backend only) | — |
| US-003 | Health Check & CORS | (Backend only) | — |
| US-004 | Image Upload Endpoint | Upload Zone → Image Gallery | #3 → #4 |
| US-005 | Image Validation | Upload Zone (inline errors) | #3 |
| US-006 | Image Preprocessing (Pillow) | Image Gallery (server-side) | #4 |
| US-007 | Static File Serving | Image Gallery thumbnails | #4 |
| US-008 | LLM Service Wrapper | Analyze Button trigger | #4 → #6 |
| US-009 | Default Prompt Template | Default Prompt Config | #3, #4 |
| US-010 | Pydantic Schemas | Analyze Button → Results | #6 → #7 |
| US-011 | Analyze Endpoint (Default) | Analyze Button → Results | #4 → #6 → #7 |
| US-012 | Analyze Endpoint (Custom) | Custom Prompt Textarea → Analyze | #5 → #6 |
| US-013 | Next.js Base Layout | All screens (navbar/footer) | #3–#11 |
| US-014 | API Client for FastAPI | Analyze Button, Image Gallery | #4, #6 |
| US-015 | Drag-and-Drop Upload Zone | Upload Zone | #3 |
| US-016 | Image Preview Thumbnails | Image Gallery | #4 |
| US-017 | Default Prompt Toggle | Default Prompt Config | #3, #4 |
| US-018 | Custom Prompt Textarea | Custom Prompt Mode | #5 |
| US-019 | Analyze Button + Loading | Analyze Button → Loading | #4 → #6 |
| US-020 | Per-Image Analysis Card | Results Page | #9 |
| US-021 | Score Visualization | Score Breakdown | #10 |
| US-022 | Comparison Dashboard | Results Page | #8 |
| US-023 | Winner Banner | Results Page (top) | #7 |
| US-024 | NextAuth Skeleton Setup | Sign In Page (backend) | #2 |
| US-025 | Protected Route | Sign In Page | #2 |
| US-026 | FastAPI JWT Validation | Sign In Page (backend) | #2 |
| US-027 | Send Token to FastAPI | All authenticated screens | #3–#11 |
| US-028 | Error Handling & Feedback | Error Toast | #11 |
| US-029 | Dark/Light Mode Toggle | Theme Toggle navbar | #12 |
| US-030 | Responsive Layout | All screens (mobile variants) | #3–#11 |
| US-031 | E2E Smoke Test Runbook | (Docs) | — |
| US-032 | README & Onboarding | Onboarding State | #13 |

---

## Schema Entity Touchpoints per Screen

| Screen | Primary Schema Entities |
|--------|-------------------------|
| Sign In Page | `users`, `accounts` (NextAuth), `verification_tokens` |
| Main Analyzer Page (empty) | `prompts` (system default row) |
| Upload + Image Gallery | `images` (filename, content_type, size_bytes, sha256_hash, storage_path) |
| Custom Prompt Mode | `prompts` (user_id, is_system_default=false), `analysis_runs.custom_prompt_text` |
| Analyze → Loading | `analysis_runs` (status: queued → processing) |
| Winner Banner | `analysis_runs.winner_image_id`, `analysis_runs.overall_summary` |
| Comparison Dashboard | `criterion_scores`, `criteria` (key, label) |
| Per-Image Card | `analysis_results` (summary, recommendation, strongest_criterion, weakest_criterion, confidence) |
| Score Visualization | `criterion_scores` (score 0–10), `criteria.min_score` / `max_score` |
| Error Toast | `analysis_runs.status` (failed), `analysis_runs.error_message` |

---

## Detailed Task List (36 tasks)

| # | Task | Description | Estimate | Priority | Status |
|---|------|-------------|----------|----------|--------|
| 1 | Create users table migration | ## Description Create the foundational `users` table that serves as the canonical identity record for the NextAuth authentication layer. This is the first schema task because every other authenticated entity in the system (accounts, sessions, images, prompts, analysis_runs) carries a foreign key back to `users.id`. The table mirrors the columns NextAuth expects.  ## Design detail Implements the following DDL from `<project-schema-design>`: ```sql CREATE TABLE users (     id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),     name            VARCHAR(255),     email           VARCHAR(320) NOT NULL,     email_verified  TIMESTAMPTZ,     image           TEXT,     created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),     updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),     CONSTRAINT users_email_unique UNIQUE (email) ); ``` Affected columns and types: `id UUID PK DEFAULT gen_random_uuid()`, `email VARCHAR(320) NOT NULL UNIQUE`, `name VARCHAR(255)`, `email_verified TIMESTAMPTZ`, `image TEXT`, `created_at TIMESTAMPTZ`, `updated_at TIMESTAMPTZ`. No foreign keys introduced in this task.  Ordering rationale: This task is position 1 in the schema build sequence because every downstream table (accounts in task 2, sessions in task 3, images in task 8, prompts in task 6, analysis_runs in task 9) carries a FK back to `users.id`. Tasks at positions > 1 must not be required to compile or run this task — this is the absolute minimum set of columns required for the FastAPI app to boot with NextAuth JWT validation.  Webflow mapping: Foundational for nodes `B` (Session Valid?) and `C` (Sign In Page) — the NextAuth Credentials provider reads from this table.  ## Related user story - US-001 (Bootstrap Monorepo): establishes the Alembic migration directory layout. - US-024 (NextAuth Skeleton Setup): requires this `users` table for its database adapter. - US-026 (FastAPI JWT Validation): the JWT payload references `users.email`. | 2 | High | todo |
| 2 | Create accounts table migration (NextAuth OAuth) | ## Description Create the `accounts` table that links a `users` row to one or more OAuth provider identities (Google, GitHub, etc.). This is the standard NextAuth table for non-credentials sign-in and is created immediately after `users` since it depends on it.  ## Design detail Implements the following DDL from `<project-schema-design>`: ```sql CREATE TABLE accounts (     id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),     user_id               UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,     type                  VARCHAR(64) NOT NULL,     provider              VARCHAR(64) NOT NULL,     provider_account_id   VARCHAR(255) NOT NULL,     refresh_token         TEXT,     access_token          TEXT,     expires_at            INTEGER,     token_type            VARCHAR(64),     scope                 TEXT,     id_token              TEXT,     session_state         TEXT,     created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),     updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),     CONSTRAINT accounts_provider_unique UNIQUE (provider, provider_account_id) ); ``` Affected columns and types: `id UUID PK`, `user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE`, `type VARCHAR(64) NOT NULL`, `provider VARCHAR(64) NOT NULL`, `provider_account_id VARCHAR(255) NOT NULL`, `refresh_token TEXT`, `access_token TEXT`, `expires_at INTEGER`, `token_type VARCHAR(64)`, `scope TEXT`, `id_token TEXT`, `session_state TEXT`, plus `created_at`/`updated_at TIMESTAMPTZ`.  Foreign keys introduced: `accounts.user_id → users.id` with `ON DELETE CASCADE` so deleting a user wipes their OAuth links.  Ordering rationale: This task is position 2 because it requires `users.id` to exist (created in task 1). Tasks at positions > 2 must not be required to compile or run this task — once `users` exists, `accounts` can be created independently.  Webflow mapping: Supports node `C2` (Submit signIn credentials) when expanded beyond credentials-only auth.  ## Related user story - US-024 (NextAuth Skeleton Setup): NextAuth's standard adapter schema requires this table. | 1 | High | todo |
| 3 | Create sessions table migration (NextAuth DB sessions) | ## Description Create the `sessions` table that supports NextAuth's database-session strategy. Even though the POC uses JWT sessions by default (US-024), this table is created now to make a future toggle to DB sessions a one-line config change.  ## Design detail Implements the following DDL from `<project-schema-design>`: ```sql CREATE TABLE sessions (     id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),     session_token VARCHAR(255) NOT NULL UNIQUE,     user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,     expires       TIMESTAMPTZ NOT NULL,     created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW() ); ``` Affected columns and types: `id UUID PK`, `session_token VARCHAR(255) NOT NULL UNIQUE`, `user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE`, `expires TIMESTAMPTZ NOT NULL`, `created_at TIMESTAMPTZ`.  Foreign keys introduced: `sessions.user_id → users.id` with `ON DELETE CASCADE`.  Ordering rationale: This task is position 3 because it requires `users.id` (created in task 1). It is independent of `accounts` (task 2) and can be built in parallel.  Webflow mapping: Foundational for node `B` (Session Valid?) when DB-session strategy is enabled.  ## Related user story - US-024 (NextAuth Skeleton Setup): future-proofs the NextAuth session storage. | 1 | High | todo |
| 4 | Create verification_tokens table migration | ## Description Create the `verification_tokens` table used by NextAuth for email verification and magic-link sign-in flows. Optional for the POC but included now to round out the NextAuth schema cluster.  ## Design detail Implements the following DDL from `<project-schema-design>`: ```sql CREATE TABLE verification_tokens (     identifier  VARCHAR(255) NOT NULL,     token       VARCHAR(255) NOT NULL,     expires     TIMESTAMPTZ NOT NULL,     created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),     PRIMARY KEY (identifier, token) ); ``` Affected columns and types: `identifier VARCHAR(255) NOT NULL`, `token VARCHAR(255) NOT NULL`, `expires TIMESTAMPTZ NOT NULL`, `created_at TIMESTAMPTZ`. Composite primary key on `(identifier, token)`.  Foreign keys introduced: None. This table is intentionally self-contained.  Ordering rationale: This task is position 4 because it has no dependencies on other tables and can be created independently after the auth cluster is complete. Closing out the NextAuth schema cluster here allows subsequent domain tables (criteria, prompts) to proceed in parallel.  Webflow mapping: Supports node `C` (Sign In Page) when email-verification flow is added later.  ## Related user story - US-024 (NextAuth Skeleton Setup): completes the standard NextAuth schema quartet. | 1 | High | todo |
| 5 | Create criteria table with seed data | ## Description Create the `criteria` lookup table that catalogs the seven analysis dimensions named in the project idea (attractiveness, color_balance, selling_idea, trending_viral_concept, marketing_message, product_presentation, value_message). Modeling criteria as rows (instead of a hard-coded enum) lets new criteria be added without a schema migration.  ## Design detail Implements the following DDL from `<project-schema-design>`: ```sql CREATE TABLE criteria (     id           SERIAL PRIMARY KEY,     key          VARCHAR(64) NOT NULL UNIQUE,     label        VARCHAR(128) NOT NULL,     description  TEXT,     min_score    SMALLINT NOT NULL DEFAULT 0,     max_score    SMALLINT NOT NULL DEFAULT 10,     sort_order   INTEGER NOT NULL DEFAULT 0,     is_active    BOOLEAN NOT NULL DEFAULT TRUE,     created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW() ); ``` Affected columns and types: `id SERIAL PK`, `key VARCHAR(64) NOT NULL UNIQUE`, `label VARCHAR(128) NOT NULL`, `description TEXT`, `min_score SMALLINT DEFAULT 0`, `max_score SMALLINT DEFAULT 10`, `sort_order INTEGER DEFAULT 0`, `is_active BOOLEAN DEFAULT TRUE`, `created_at TIMESTAMPTZ`.  Seed data: Inserts the seven rows in `sort_order` 1-7 corresponding to the project's named criteria.  Foreign keys introduced: None.  Ordering rationale: This task is position 5 because it is the first domain table and has no dependencies. It must exist before `criterion_scores` (task 11) which carries a FK to it.  Webflow mapping: Provides the row labels rendered in nodes `P` (Comparison Dashboard) and `R` (Score Visualization).  ## Related user story - US-009 (Default Analysis Prompt Template): the prompt references these criteria by `key`. - US-010 (Pydantic Schemas): `CriterionScores` Pydantic model mirrors these seven keys. - US-021 (Score Visualization): the comparison grid iterates over `criteria.sort_order`. | 2 | High | todo |
| 6 | Create prompts table migration | ## Description Create the `prompts` table that stores both the system-default analysis prompt (`is_system_default = TRUE`) and any user-saved custom prompts. The default row will hold the curated prompt text from US-009; subsequent user-saved prompts have a non-null `user_id`.  ## Design detail Implements the following DDL from `<project-schema-design>`: ```sql CREATE TABLE prompts (     id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),     user_id            UUID REFERENCES users(id) ON DELETE SET NULL,     name               VARCHAR(255) NOT NULL,     body               TEXT NOT NULL,     is_system_default  BOOLEAN NOT NULL DEFAULT FALSE,     version            INTEGER NOT NULL DEFAULT 1,     is_active          BOOLEAN NOT NULL DEFAULT TRUE,     created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),     updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),     CONSTRAINT prompts_system_has_no_user CHECK (         (is_system_default = FALSE AND user_id IS NOT NULL) OR         (is_system_default = TRUE)     ) ); ``` Affected columns and types: `id UUID PK`, `user_id UUID NULLABLE REFERENCES users(id) ON DELETE SET NULL`, `name VARCHAR(255) NOT NULL`, `body TEXT NOT NULL`, `is_system_default BOOLEAN DEFAULT FALSE`, `version INTEGER DEFAULT 1`, `is_active BOOLEAN DEFAULT TRUE`, `created_at`/`updated_at TIMESTAMPTZ`.  Foreign keys introduced: `prompts.user_id → users.id` with `ON DELETE SET NULL` (system prompts have NULL user_id).  Ordering rationale: This task is position 6 because it depends on `users.id` (task 1). It must exist before `analysis_runs` (task 9) which carries `prompt_id` as a FK.  Webflow mapping: Powers nodes `I` (Default Prompt Config) and `J` (Custom Prompt Textarea).  ## Related user story - US-009 (Default Analysis Prompt Template): the curated prompt lives in this table. - US-017 (Default Prompt Toggle): the checkbox state maps to `prompts.is_system_default` lookup. - US-018 (Custom Prompt Textarea): saves user prompts here. | 2 | High | todo |
| 7 | Create prompt_versions table migration | ## Description Create the `prompt_versions` append-only audit table that records every edit to a prompt. Each row captures the prompt body at a specific version number, enabling A/B re-runs and historical reproducibility of analyses.  ## Design detail Implements the following DDL from `<project-schema-design>`: ```sql CREATE TABLE prompt_versions (     id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),     prompt_id   UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,     version     INTEGER NOT NULL,     body        TEXT NOT NULL,     created_by  UUID REFERENCES users(id) ON DELETE SET NULL,     created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),     CONSTRAINT prompt_versions_unique UNIQUE (prompt_id, version) ); ``` Affected columns and types: `id UUID PK`, `prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE`, `version INTEGER NOT NULL`, `body TEXT NOT NULL`, `created_by UUID NULLABLE REFERENCES users(id) ON DELETE SET NULL`, `created_at TIMESTAMPTZ`. UNIQUE constraint on `(prompt_id, version)`.  Foreign keys introduced: `prompt_versions.prompt_id → prompts.id`, `prompt_versions.created_by → users.id`.  Ordering rationale: This task is position 7 because it depends on both `prompts` (task 6) and `users` (task 1). It is independent of `images` (task 8) and later tables.  Webflow mapping: Supports future prompt-history UI not yet mapped to a node.  ## Related user story - US-009 (Default Prompt Template): versioned history of the system default. | 1 | High | todo |
| 8 | Create images table migration | ## Description Create the `images` table that records every uploaded image. Binary bytes live outside Postgres (filesystem/S3) and are referenced by `storage_path`; the row carries metadata including `sha256_hash` for deduplication and `width`/`height` populated by the Pillow preprocessing step.  ## Design detail Implements the following DDL from `<project-schema-design>`: ```sql CREATE TABLE images (     id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),     user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,     filename        VARCHAR(512) NOT NULL,     content_type    VARCHAR(64) NOT NULL,     size_bytes      BIGINT NOT NULL,     storage_path    TEXT NOT NULL,     storage_backend VARCHAR(32) NOT NULL DEFAULT 'local',     sha256_hash     CHAR(64) NOT NULL,     width           INTEGER,     height          INTEGER,     status          VARCHAR(32) NOT NULL DEFAULT 'uploaded',     error_message   TEXT,     metadata        JSONB NOT NULL DEFAULT '{}'::jsonb,     created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),     updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),     CONSTRAINT images_status_valid CHECK (status IN ('uploaded','processing','ready','failed')),     CONSTRAINT images_size_positive CHECK (size_bytes >= 0) ); ``` Affected columns and types: `id UUID PK`, `user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE`, `filename VARCHAR(512)`, `content_type VARCHAR(64)`, `size_bytes BIGINT`, `storage_path TEXT`, `storage_backend VARCHAR(32) DEFAULT 'local'`, `sha256_hash CHAR(64)`, `width INTEGER`, `height INTEGER`, `status VARCHAR(32)`, `error_message TEXT`, `metadata JSONB DEFAULT '{}'`.  Foreign keys introduced: `images.user_id → users.id` with `ON DELETE CASCADE`.  Ordering rationale: This task is position 8 because it depends on `users.id` (task 1). It must exist before `analysis_runs` (task 9) and `analysis_results` (task 10) which both carry FKs to `images.id`.  Webflow mapping: Powers nodes `G` (Image Gallery) thumbnails and `O` (Winner Banner) which references `winner_image_id`.  ## Related user story - US-004 (Image Upload Endpoint): creates rows in this table. - US-005 (Image Validation): populates `status` and `error_message`. - US-006 (Image Preprocessing): fills `width`, `height`, and updates `status` to 'ready'. | 2 | High | todo |
| 9 | Create analysis_runs table migration | ## Description Create the `analysis_runs` table that records a single batch analysis job. One row per user-initiated analysis, holding the resolved prompt (`prompt_id` and/or `custom_prompt_text`), LLM provider/model, status, the winning image, and observability fields (token counts, latency, raw response JSONB).  ## Design detail Implements the following DDL from `<project-schema-design>`: ```sql CREATE TABLE analysis_runs (     id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),     user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,     prompt_id           UUID REFERENCES prompts(id) ON DELETE SET NULL,     custom_prompt_text  TEXT,     use_default_prompt  BOOLEAN NOT NULL DEFAULT TRUE,     prompt_mode         prompt_mode NOT NULL DEFAULT 'default',     llm_provider        llm_provider NOT NULL DEFAULT 'openai',     llm_model           VARCHAR(128) NOT NULL DEFAULT 'gpt-4o',     status              analysis_status NOT NULL DEFAULT 'queued',     image_count         INTEGER NOT NULL DEFAULT 0,     winner_image_id     UUID REFERENCES images(id) ON DELETE SET NULL,     overall_summary     TEXT,     total_input_tokens  INTEGER,     total_output_tokens INTEGER,     latency_ms          INTEGER,     error_message       TEXT,     raw_response        JSONB,     started_at          TIMESTAMPTZ,     completed_at        TIMESTAMPTZ,     created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),     updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),     CONSTRAINT analysis_runs_prompt_consistency CHECK (...),     CONSTRAINT analysis_runs_image_count_positive CHECK (image_count >= 0),     CONSTRAINT analysis_runs_completion_consistency CHECK (...) ); ``` This task also creates the PG enums `analysis_status`, `prompt_mode`, `llm_provider`.  Foreign keys introduced: `analysis_runs.user_id → users.id` (CASCADE), `analysis_runs.prompt_id → prompts.id` (SET NULL), `analysis_runs.winner_image_id → images.id` (SET NULL).  Ordering rationale: This task is position 9 because it depends on `users` (task 1), `prompts` (task 6), and `images` (task 8). It must exist before `analysis_results` (task 10) which carries `run_id` as a FK.  Webflow mapping: Powers nodes `L` (Analysis Loading State, via `status`), `M` (Results Page), and `O` (Winner Banner via `winner_image_id`).  ## Related user story - US-008 (LLM Service): writes provider/model and raw_response. - US-011 (Analyze Endpoint - Default): creates default-mode rows. - US-012 (Analyze Endpoint - Custom): creates custom-mode rows with `custom_prompt_text`. - US-019 (Analyze Button): triggers run creation. - US-023 (Winner Banner): renders `winner_image_id`. | 3 | High | todo |
| 10 | Create analysis_results table migration | ## Description Create the `analysis_results` table that holds one row per image per analysis run. Each row carries the human-readable fields (summary, recommendation, strongest/weakest criterion, confidence) plus the per-image raw LLM response in `JSONB`.  ## Design detail Implements the following DDL from `<project-schema-design>`: ```sql CREATE TABLE analysis_results (     id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),     run_id              UUID NOT NULL REFERENCES analysis_runs(id) ON DELETE CASCADE,     image_id            UUID NOT NULL REFERENCES images(id) ON DELETE CASCADE,     image_index         INTEGER NOT NULL,     summary             TEXT,     strongest_criterion VARCHAR(64),     weakest_criterion   VARCHAR(64),     recommendation      TEXT,     confidence          SMALLINT,     raw_response        JSONB,     created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),     CONSTRAINT analysis_results_image_unique_per_run UNIQUE (run_id, image_id),     CONSTRAINT analysis_results_image_index_unique   UNIQUE (run_id, image_index),     CONSTRAINT analysis_results_confidence_range     CHECK (confidence IS NULL OR (confidence >= 0 AND confidence <= 100)),     CONSTRAINT analysis_results_index_non_negative    CHECK (image_index >= 0) ); ``` Affected columns and types: `id UUID PK`, `run_id UUID NOT NULL REFERENCES analysis_runs(id) ON DELETE CASCADE`, `image_id UUID NOT NULL REFERENCES images(id) ON DELETE CASCADE`, `image_index INTEGER NOT NULL`, `summary TEXT`, `strongest_criterion VARCHAR(64)`, `weakest_criterion VARCHAR(64)`, `recommendation TEXT`, `confidence SMALLINT`, `raw_response JSONB`, `created_at TIMESTAMPTZ`.  Foreign keys introduced: `analysis_results.run_id → analysis_runs.id`, `analysis_results.image_id → images.id`.  Ordering rationale: This task is position 10 because it depends on `analysis_runs` (task 9) and `images` (task 8). It must exist before `criterion_scores` (task 11) which carries `result_id` as a FK.  Webflow mapping: Powers node `Q` (Per-Image Analysis Cards).  ## Related user story - US-011 (Analyze Endpoint): writes one row per analyzed image. - US-012 (Analyze Endpoint): same for custom prompt. - US-020 (Per-Image Analysis Card): renders fields from this table. | 2 | High | todo |
| 11 | Create criterion_scores table migration | ## Description Create the `criterion_scores` table that holds one row per (result × criterion), storing the 0-10 score and optional rationale. This narrow-per-criterion layout is what enables fast "winner per criterion" aggregation queries used by the comparison dashboard.  ## Design detail Implements the following DDL from `<project-schema-design>`: ```sql CREATE TABLE criterion_scores (     id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),     result_id    UUID NOT NULL REFERENCES analysis_results(id) ON DELETE CASCADE,     criterion_id INTEGER NOT NULL REFERENCES criteria(id) ON DELETE RESTRICT,     score        SMALLINT NOT NULL,     rationale    TEXT,     created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),     CONSTRAINT criterion_scores_unique UNIQUE (result_id, criterion_id),     CONSTRAINT criterion_scores_range  CHECK (score >= 0 AND score <= 10) ); ``` Affected columns and types: `id UUID PK`, `result_id UUID NOT NULL REFERENCES analysis_results(id) ON DELETE CASCADE`, `criterion_id INTEGER NOT NULL REFERENCES criteria(id) ON DELETE RESTRICT`, `score SMALLINT NOT NULL`, `rationale TEXT`, `created_at TIMESTAMPTZ`. UNIQUE on `(result_id, criterion_id)`, CHECK `score BETWEEN 0 AND 10`.  Foreign keys introduced: `criterion_scores.result_id → analysis_results.id` (CASCADE), `criterion_scores.criterion_id → criteria.id` (RESTRICT — prevents deleting criteria that have scores).  Ordering rationale: This task is position 11 because it is the last table in the domain cluster and depends on `analysis_results` (task 10) and `criteria` (task 5).  Webflow mapping: Powers node `P` (Comparison Dashboard) and `R` (Score Visualization).  ## Related user story - US-010 (Pydantic Schemas): mirrors the `CriterionScores` model. - US-021 (Score Bars): reads `score` per criterion. - US-022 (Comparison Dashboard): aggregates `criterion_scores` to find winners per criterion. | 2 | High | todo |
| 12 | Create performance indexes on all tables | ## Description Create the supporting indexes from `<project-schema-design>` to keep read paths fast: per-user listings, dedup lookups, history dashboards, status polling for workers, and winner-per-criterion aggregations.  ## Design detail Implements the following `CREATE INDEX` statements from `<project-schema-design>`: ```sql CREATE INDEX idx_accounts_user_id                ON accounts(user_id); CREATE INDEX idx_sessions_user_id                ON sessions(user_id); CREATE INDEX idx_sessions_expires                ON sessions(expires); CREATE INDEX idx_images_user_id                  ON images(user_id); CREATE INDEX idx_images_created_at               ON images(created_at DESC); CREATE INDEX idx_images_user_hash                ON images(user_id, sha256_hash); CREATE INDEX idx_images_status                   ON images(status); CREATE INDEX idx_prompts_user_id                 ON prompts(user_id); CREATE INDEX idx_prompts_system_default_active   ON prompts(is_system_default) WHERE is_system_default = TRUE; CREATE INDEX idx_prompt_versions_prompt_id       ON prompt_versions(prompt_id); CREATE INDEX idx_analysis_runs_user_id           ON analysis_runs(user_id); CREATE INDEX idx_analysis_runs_status             ON analysis_runs(status); CREATE INDEX idx_analysis_runs_user_created      ON analysis_runs(user_id, created_at DESC); CREATE INDEX idx_analysis_runs_winner_image      ON analysis_runs(winner_image_id); CREATE INDEX idx_analysis_results_run_id         ON analysis_results(run_id); CREATE INDEX idx_analysis_results_image_id       ON analysis_results(image_id); CREATE INDEX idx_criterion_scores_result_id      ON criterion_scores(result_id); CREATE INDEX idx_criterion_scores_criterion_id   ON criterion_scores(criterion_id); ``` Note the partial index `idx_prompts_system_default_active` keeps the hot single-row lookup tiny.  Ordering rationale: This task is position 12 — all base tables exist (tasks 1-11) but no application code reads them yet. Adding indexes after table creation (rather than inline) keeps migration history clean and avoids duplicating index DDL in earlier tasks.  ## Related user story - US-031 (E2E Smoke Runbook): valid runbook exercise exercises these indexes. - US-022 (Comparison Dashboard): benefits from `criterion_scores_result_id` and `criterion_scores_criterion_id`. | 2 | High | todo |
| 13 | Create updated_at triggers for audit columns | ## Description Create a reusable `set_updated_at()` PL/pgSQL function and the `BEFORE UPDATE` triggers that maintain `updated_at` columns on the five mutable tables. This guarantees audit accuracy without relying on application code to remember.  ## Design detail Implements the following DDL from `<project-schema-design>`: ```sql CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$ BEGIN     NEW.updated_at = NOW();     RETURN NEW; END; $$ LANGUAGE plpgsql;  CREATE TRIGGER trg_users_updated_at          BEFORE UPDATE ON users          FOR EACH ROW EXECUTE FUNCTION set_updated_at(); CREATE TRIGGER trg_accounts_updated_at       BEFORE UPDATE ON accounts       FOR EACH ROW EXECUTE FUNCTION set_updated_at(); CREATE TRIGGER trg_prompts_updated_at        BEFORE UPDATE ON prompts        FOR EACH ROW EXECUTE FUNCTION set_updated_at(); CREATE TRIGGER trg_images_updated_at         BEFORE UPDATE ON images         FOR EACH ROW EXECUTE FUNCTION set_updated_at(); CREATE TRIGGER trg_analysis_runs_updated_at  BEFORE UPDATE ON analysis_runs  FOR EACH ROW EXECUTE FUNCTION set_updated_at(); ``` Affected columns: `updated_at TIMESTAMPTZ` on `users`, `accounts`, `prompts`, `images`, `analysis_runs`.  Ordering rationale: This task is position 13 because it requires all five target tables to exist (created in tasks 1, 2, 6, 8, 9). It is the final schema task before backend code begins reading/writing the tables.  ## Related user story - US-002 (FastAPI Project Structure): applies `updated_at` on every UPDATE through SQLAlchemy session. | 1 | High | todo |
| 14 | Bootstrap FastAPI app with project structure | ## Description Create the runnable FastAPI skeleton: a modular directory layout (`app/main.py`, `app/config.py`, `app/api/routes/`, `app/services/`, `app/schemas/`, `app/core/`), `requirements.txt`, and a `pyproject.toml`. `GET /` returns a hello-world JSON. The app boots with no warnings and Swagger UI is available at `/docs`.  ## Design detail Project layout (matches US-002): ``` backend/   app/     __init__.py     main.py            # FastAPI() factory     config.py          # Pydantic Settings     api/routes/{health,upload,analyze}.py     services/{image_processor,llm_service}.py     schemas/analysis.py     core/security.py   # JWT (added in task 23)   requirements.txt   pyproject.toml ``` Dependencies pinned in `requirements.txt`: `fastapi>=0.110`, `uvicorn[standard]>=0.27`, `pydantic>=2.6`, `pydantic-settings>=2.1`, `python-multipart>=0.0.9`, `pillow>=10.0`, `httpx>=0.26`, `openai>=1.30`, `pyjwt>=2.8`, `python-dotenv>=1.0`, `sqlalchemy>=2.0`, `alembic>=1.13`, `asyncpg>=0.29`.  Ordering rationale: This task is position 14 — the first backend task. It depends only on schema being planned (tasks 1-13) but not on any specific table existing yet. It compiles and boots even with an empty DB.  Webflow mapping: Provides the API surface used by nodes `E` (Drag-and-Drop Upload Zone), `F` (Upload Files), `K` (Analyze Button).  ## Related user story - US-001 (Bootstrap Monorepo): FastAPI side of the bootstrap. - US-002 (FastAPI Project Structure): implements the recommended layout. | 4 | High | todo |
| 15 | Configuration module, health check, and CORS middleware | ## Description Implement `app/config.py` (Pydantic Settings loaded from `.env`), `GET /health` returning `{"status":"ok"}`, and `CORSMiddleware` allowing the Next.js dev origin with credentials enabled.  ## Design detail `app/config.py` defines a `Settings(BaseSettings)` class with fields: `OPENAI_API_KEY: str`, `NEXTAUTH_SECRET: str`, `ALLOWED_ORIGINS: list[str] = ["http://localhost:3000"]`, `DATABASE_URL: PostgresDsn`, `MAX_UPLOAD_MB: int = 10`. `model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")`.  `app/api/routes/health.py`: ```python @router.get("/health") async def health() -> dict: return {"status": "ok"} ```  `app/main.py` adds `CORSMiddleware` AFTER routers with `allow_origins=settings.ALLOWED_ORIGINS`, `allow_credentials=True`, `allow_methods=["*"]`, `allow_headers=["*"]`.  Ordering rationale: This task is position 15 because other backend tasks (upload, analyze) read settings at startup; the CORS middleware must wrap all routes once.  Webflow mapping: Required for nodes `B` (Session Valid?) → cookies pass CORS; `E` (Upload Zone) → preflight succeeds.  ## Related user story - US-002 (FastAPI Project Structure): `app/config.py`. - US-003 (Health Check & CORS): full implementation. | 3 | High | todo |
| 16 | Image upload endpoint with validation | ## Description Implement `POST /api/upload` accepting `multipart/form-data` with a list of files. Each file is validated for MIME type (`image/jpeg\|png\|webp`), size (≤ `MAX_UPLOAD_MB`), and emptiness. Validated files are persisted as rows in the `images` table (created in task 8) and the optimized bytes are written to `images.storage_path`.  ## Design detail Route `app/api/routes/upload.py`: ```python @router.post("/upload", response_model=UploadResponse) async def upload(files: list[UploadFile] = File(...), db: AsyncSession = Depends(get_db), user = Depends(get_current_user)) -> UploadResponse:     ... ``` Validation rules (helper `validate_image`): `HTTPException(415)` for unsupported MIME, `HTTPException(413)` for >`MAX_UPLOAD_MB`, `HTTPException(400)` for empty bytes.  Affected schema: writes `images` rows — columns touched: `user_id`, `filename`, `content_type`, `size_bytes`, `storage_path`, `storage_backend`, `sha256_hash`, `status` (set to 'uploaded' initially).  Returns `{"images": [{"id": "<uuid>", "filename": "...", "size": 12345, "url": "/api/images/<uuid>"}, ...]}`.  Ordering rationale: This task is position 16 — requires `images` table (task 8), `users` (task 1), CORS (task 15), and config (task 15). It must precede the analyze endpoint (task 22) which references the uploaded image IDs.  Webflow mapping: Implements node `F` (Upload Files). Validation failures trigger node `D1` (Inline Error Toast).  ## Related user story - US-004 (Image Upload Endpoint). - US-005 (Image Validation). | 4 | High | todo |
| 17 | Image preprocessing service with Pillow | ## Description Implement `app/services/image_processor.py` that takes raw image bytes, resizes so the longest side ≤ `max_side` (default 1024), converts RGBA → RGB on a white background, re-encodes as JPEG quality 85, and returns the optimized bytes plus base64 + dimensions. The optimized bytes are written to disk and the `images` row is updated with `width`, `height`, `sha256_hash`, and `status='ready'`.  ## Design detail ```python def preprocess_image(raw_bytes: bytes, max_side: int = 1024, quality: int = 85) -> tuple[bytes, str, tuple[int,int]]:     img = Image.open(BytesIO(raw_bytes))     if img.mode in ("RGBA","P"): img = img.convert("RGB")     img.thumbnail((max_side, max_side))     buf = BytesIO(); img.save(buf, "JPEG", quality=quality, optimize=True)     return buf.getvalue(), base64.b64encode(buf.getvalue()).decode(), img.size ``` Pillow `>=10.0` required for the modern API. No extra dependencies.  Affected schema: updates `images.width`, `images.height`, `images.sha256_hash`, `images.storage_path`, `images.status`.  Ordering rationale: This task is position 17 — depends on `images` table (task 8). It runs after upload (task 16) but before analyze (task 22) which needs optimized base64 bytes.  Webflow mapping: Server-side stage of nodes `E` (Upload Zone) → `G` (Image Gallery). Drives thumbnail sizes rendered in `G`.  ## Related user story - US-006 (Image Preprocessing with Pillow). | 3 | High | todo |
| 18 | Static file serving endpoint for image previews | ## Description Implement `GET /api/images/{image_id}` that returns the optimized JPEG bytes from disk with `Content-Type: image/jpeg` and `Cache-Control: private, max-age=300`. Returns 404 if the `images.id` is unknown. This is the URL the Next.js `<Image>` component points to for thumbnails.  ## Design detail Route: ```python @router.get("/images/{image_id}") async def get_image(image_id: UUID, db: AsyncSession = Depends(get_db)) -> Response:     row = await db.get(Image, image_id)     if not row or row.user_id != current_user.id: raise HTTPException(404)     data = Path(row.storage_path).read_bytes()     return Response(content=data, media_type="image/jpeg", headers={"Cache-Control":"private, max-age=300"}) ``` Affected schema: read-only on `images.id`, `images.storage_path`, `images.user_id`.  Ordering rationale: This task is position 18 — depends on `images` table (task 8) and upload endpoint (task 16). Required by the frontend gallery (task 27) but independent of the analyze endpoint.  Webflow mapping: Provides bytes for node `G` (Image Gallery) and node `O` (Winner Banner).  ## Related user story - US-007 (Static File Serving for Image Previews). | 2 | High | todo |
| 19 | LLM service wrapper with retry and provider abstraction | ## Description Create `app/services/llm_service.py` exposing `analyze_images(images_b64: list[str], prompt: str) -> dict` that calls `AsyncOpenAI` with `gpt-4o` and `response_format={"type":"json_object"}`, applies exponential-backoff retry (max 3 attempts), and raises a typed `LLMError` on failure. Provider selection uses the `LLMProvider` enum and is extensible.  ## Design detail ```python class LLMProvider(str, Enum): OPENAI="openai"  async def analyze_images(images_b64: list[str], prompt: str) -> dict:     client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)     messages = [{"role":"user","content":[{"type":"text","text":prompt}] + [{"type":"image_url","image_url":{"url":f"data:image/jpeg;base64,{b}"}} for b in images_b64]}]     for attempt in range(3):         try:             resp = await client.chat.completions.create(model="gpt-4o", messages=messages, response_format={"type":"json_object"}, timeout=60)             return json.loads(resp.choices[0].message.content)         except (openai.RateLimitError, openai.APITimeoutError) as e:             if attempt == 2: raise LLMError(str(e)) from e             await asyncio.sleep(2 ** attempt) ``` Affected schema: writes `analysis_runs.llm_provider`, `analysis_runs.llm_model`, `analysis_runs.raw_response`, `analysis_runs.total_input_tokens`, `analysis_runs.total_output_tokens`, `analysis_runs.latency_ms` (when orchestrated in task 22).  Ordering rationale: This task is position 19 — depends only on settings (task 15) and openai SDK. It is independent of tables; analyze endpoint (task 22) wires it to schema writes.  Webflow mapping: Implements the brain behind node `K` (Analyze Button) → `L` (Analysis Loading State).  ## Related user story - US-008 (LLM Service — Configuration & Client Wrapper). | 5 | High | todo |
| 20 | Default analysis prompt template constant | ## Description Define the curated `DEFAULT_PROMPT` constant in `app/services/prompts.py` that instructs the multimodal LLM to return a strict JSON object with the seven criteria scores (attractiveness, color_balance, selling_idea, trending_viral_concept, marketing_message, product_presentation, value_message), per-image summary, strongest/weakest criterion, recommendation, confidence 0-100, and a `winner_index` plus `overall_summary`. The same text is also seeded into `prompts` (task 6) as the `is_system_default=TRUE` row.  ## Design detail ```python DEFAULT_PROMPT = """You are an expert marketing creative director. Analyze each provided image and return ONLY valid JSON with this exact structure: {   \"results\": [{     \"image_index\": 0,     \"scores\": {\"attractiveness\":0,\"color_balance\":0,\"selling_idea\":0,\"trending_viral_concept\":0,\"marketing_message\":0,\"product_presentation\":0,\"value_message\":0},     \"summary\": \"\",\"strongest_criterion\":\"\",\"weakest_criterion\":\"\",\"recommendation\":\"\",\"confidence\":0   }],   \"winner_index\": 0,   \"overall_summary\": \"\" } Think step by step. Return ONLY the JSON, no markdown.""" ``` Affected schema: read from `prompts` where `is_system_default=TRUE`; the seed inserts the same body.  Ordering rationale: This task is position 20 — independent of schema (the prompt text lives in code). It precedes the analyze endpoint (task 22) which references the constant.  Webflow mapping: Powers node `I` (Default Prompt Config) preview text.  ## Related user story - US-009 (Default Analysis Prompt Template). | 2 | High | todo |
| 21 | Pydantic schemas for structured LLM output | ## Description Create `app/schemas/analysis.py` with Pydantic v2 models that mirror the LLM's JSON contract: `CriterionScores` (7 ints 0-10 with `Field(ge=0, le=10)`), `ImageAnalysis` (with confidence 0-100), `AnalysisResult` (results list + winner_index + overall_summary), and request/response wrappers `AnalyzeRequest` (image_ids, prompt, use_default_prompt) and `AnalyzeResponse` (analysis + image_urls).  ## Design detail ```python class CriterionScores(BaseModel):     attractiveness:int=Field(ge=0,le=10); color_balance:int=Field(ge=0,le=10)     selling_idea:int=Field(ge=0,le=10); trending_viral_concept:int=Field(ge=0,le=10)     marketing_message:int=Field(ge=0,le=10); product_presentation:int=Field(ge=0,le=10)     value_message:int=Field(ge=0,le=10)  class ImageAnalysis(BaseModel):     image_index:int; scores:CriterionScores; summary:str     strongest_criterion:str; weakest_criterion:str; recommendation:str; confidence:int=Field(ge=0,le=100)  class AnalysisResult(BaseModel):     results:list[ImageAnalysis]; winner_index:int; overall_summary:str  class AnalyzeRequest(BaseModel):     image_ids:list[UUID]; prompt:str\|None=None; use_default_prompt:bool=True  class AnalyzeResponse(BaseModel):     analysis:AnalysisResult; image_urls:list[str] ``` These schemas are the contract between LLM output and DB writes (`analysis_results`, `criterion_scores`).  Ordering rationale: This task is position 21 — depends only on Python type system. It precedes the analyze endpoint (task 22) which imports these models.  Webflow mapping: Validates payloads for nodes `K` (Analyze Button) and frontend types for nodes `O`, `P`, `Q`, `R`.  ## Related user story - US-010 (Pydantic Schemas for Structured LLM Output). | 3 | High | todo |
| 22 | Analyze endpoint with default and custom prompt modes | ## Description Implement `POST /api/analyze` that validates an `AnalyzeRequest`, loads each image by ID, picks `DEFAULT_PROMPT` (when `use_default_prompt=True`) or the user `prompt` (when False), calls `llm_service.analyze_images()`, validates the response with `AnalysisResult`, writes an `analysis_runs` row plus one `analysis_results` row and seven `criterion_scores` rows per image, sets `winner_image_id`, and returns `AnalyzeResponse`.  ## Design detail Route `app/api/routes/analyze.py`: ```python @router.post("/analyze", response_model=AnalyzeResponse, dependencies=[Depends(get_current_user)]) async def analyze(req: AnalyzeRequest, db: AsyncSession = Depends(get_db)) -> AnalyzeResponse:     if not req.image_ids: raise HTTPException(422, "image_ids required")     if not req.use_default_prompt and not (req.prompt and req.prompt.strip()):         raise HTTPException(422, "custom prompt required when use_default_prompt=False")     if len(req.prompt or "") > 2000: raise HTTPException(422, "prompt > 2000 chars")     ... ``` Affected schema: writes to `analysis_runs` (all columns), `analysis_results` (one per image), `criterion_scores` (seven per result). Sets `analysis_runs.status='processing'` then 'completed' or 'failed'.  Ordering rationale: This task is position 22 — depends on every prior schema table (1-11), LLM service (19), prompt template (20), Pydantic schemas (21), image upload (16, 17). It is the convergence point of the backend.  Webflow mapping: Powers node `K` (Analyze Button) → `L` (Analysis Loading State) → `M` (Results Page) covering `O`, `P`, `Q`, `R`.  ## Related user story - US-011 (Analyze Endpoint — Default Prompt). - US-012 (Analyze Endpoint — Custom Prompt). | 6 | High | todo |
| 23 | JWT validation dependency for protected endpoints | ## Description Implement `app/core/security.py` with `get_current_user(authorization: str = Header(...)) -> User` that decodes the NextAuth JWT using `NEXTAUTH_SECRET` (HS256) and returns the `User` row matching the JWT `email`. Missing/invalid tokens yield 401. Apply this dependency to `/api/analyze` and `/api/upload`.  ## Design detail ```python import jwt from fastapi import Depends, Header, HTTPException  async def get_current_user(authorization: str = Header(...), db: AsyncSession = Depends(get_db)) -> User:     try:         scheme, token = authorization.split()         if scheme.lower() != "bearer": raise ValueError         payload = jwt.decode(token, settings.NEXTAUTH_SECRET, algorithms=["HS256"])     except Exception: raise HTTPException(401, "invalid token")     user = await db.scalar(select(User).where(User.email == payload["email"]))     if not user: raise HTTPException(401, "unknown user")     return user ``` Affected schema: read-only on `users.email` and `users.id`.  Ordering rationale: This task is position 23 — depends on `users` (task 1) and settings (task 15). It is the last backend task; frontend auth tasks (34, 35) depend on this dependency existing.  Webflow mapping: Guards nodes `F` (Upload Files), `K` (Analyze Button). 401 responses trigger client redirect to node `C` (Sign In Page).  ## Related user story - US-026 (FastAPI JWT Validation Skeleton). | 3 | High | todo |
| 24 | Next.js base layout with TailwindCSS design system | ## Description Bootstrap the frontend with `create-next-app` (TypeScript, App Router, ESLint, TailwindCSS). Configure `tailwind.config.ts` with custom color tokens (`primary` indigo, `accent` violet, `surface`, `surface-elevated`), border-radius scale, and shadows. `app/layout.tsx` loads the Inter font via `next/font/google`, sets up dark-mode class strategy, and renders a top navbar with logo, theme toggle placeholder, and session menu.  ## Design detail Tech pinned: `next@14.2.x`, `react@18.x`, `tailwindcss@3.4.x`, `typescript@5.x`, `next-auth@4.24.x`.  `tailwind.config.ts` extends: ```ts theme: { extend: { colors: { primary: { 50:"#eef2ff", 500:"#6366f1", 700:"#4338ca"}, accent: { 500:"#8b5cf6"}, surface: "#0f172a", "surface-elevated":"#1e293b" }, borderRadius: { "2xl":"1rem" }, boxShadow: { card:"0 4px 14px rgba(0,0,0,0.06)" } } } ``` `app/layout.tsx` sets `<html className={theme}>` and wraps children in `<SessionProvider>` (task 34 will fill).  Ordering rationale: This task is position 24 — first frontend task. It compiles and renders independently of API client or backend code.  Webflow mapping: Renders the chrome for all flow nodes (top of every screen mockup).  ## Related user story - US-013 (Next.js Base Layout & Modern Design System). | 4 | High | todo |
| 25 | TypeScript API client for FastAPI backend | ## Description Create `frontend/lib/api.ts` exporting `uploadImages(files)`, `analyzeImages(req)`, and `getImageUrl(id)` that call the FastAPI base URL with credentials enabled. Define TypeScript interfaces in `frontend/types/api.ts` mirroring the Pydantic schemas from task 21 (`CriterionScores`, `ImageAnalysis`, `AnalysisResult`, `AnalyzeRequest`, `AnalyzeResponse`). Reads `NEXT_PUBLIC_API_BASE_URL` (default `http://localhost:8000`).  ## Design detail ```ts export const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000"; export async function uploadImages(files: File[], token?: string): Promise<UploadResponse> {   const fd = new FormData(); files.forEach(f => fd.append("files", f));   const res = await fetch(`${API}/api/upload`, { method:"POST", body:fd, credentials:"include", headers: token? { Authorization:`Bearer ${token}` } : {} });   if (!res.ok) throw await toApiError(res);   return res.json(); } ``` TypeScript types mirror backend schema columns: `scores: { attractiveness: number; color_balance: number; ... }` — matches `criterion_scores.score` and `criteria.key`.  Ordering rationale: This task is position 25 — depends on layout (task 24). Other frontend tasks (upload zone, analyze button) import from this module.  Webflow mapping: Underpins every screen that talks to FastAPI: `E`, `F`, `G`, `K`, `L`, `M`.  ## Related user story - US-014 (API Client for FastAPI Backend). | 3 | High | todo |
| 26 | Drag-and-drop image upload zone component | ## Description Build `components/UploadZone.tsx`: a full-width dashed-border drop area with click-to-browse fallback. Accepts `image/jpeg\|png\|webp`, performs client-side validation (MIME + size ≤ 10MB), shows drag-over visual feedback, and calls `uploadImages()` on drop. Disabled state while uploading. Keyboard accessible (Enter/Space opens picker).  ## Design detail Uses native React handlers `onDragOver`, `onDragLeave`, `onDrop`. TailwindCSS classes: `border-2 border-dashed border-slate-300 dark:border-slate-700`, `hover:border-primary transition-colors`, `focus:ring-2 focus:ring-primary`. Disabled state: `opacity-50 cursor-not-allowed`.  Schema awareness: writes to `images` (created in task 8) via the API client; no direct DB writes.  Ordering rationale: This task is position 26 — depends on API client (task 25) and layout (task 24). Independent of prompt UI tasks.  Webflow mapping: Implements node `E` (Drag-and-Drop Upload Zone). Validation failures map to node `D1` (Inline Error Toast).  ## Related user story - US-015 (Drag-and-Drop Image Upload Zone). | 4 | Medium | todo |
| 27 | Image gallery with thumbnails and remove | ## Description Build `components/ImageGallery.tsx`: responsive 2-6 column grid of thumbnails. Each card shows the image (from `getImageUrl(id)`), filename, size, and a hover-revealed `×` remove button. Loading skeleton while bytes arrive; friendly empty state with onboarding text when zero images.  ## Design detail Uses `<img>` (not `next/image`) for the POC to avoid configuring remote patterns for `localhost:8000`. Tailwind: `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4`, `rounded-xl overflow-hidden`, `hover:shadow-card transition`.  Schema awareness: reads `images.id`, `images.filename`, `images.size_bytes`, `images.content_type` (all set by task 16).  Ordering rationale: This task is position 27 — depends on upload zone (task 26) and API client (task 25). Provides input to analyze button (task 30).  Webflow mapping: Implements node `G` (Image Gallery — Thumbnails + Remove).  ## Related user story - US-016 (Image Preview Thumbnails with Remove). | 4 | Medium | todo |
| 28 | Default prompt toggle checkbox component | ## Description Build `components/PromptConfig.tsx` (default-toggle portion): a checkbox labeled "Use default analysis prompt" with a collapsible read-only preview of `DEFAULT_PROMPT`. Default state: checked. Disabled while analyze is in flight. Accessible (`<label htmlFor>` + `aria-describedby`).  ## Design detail Local state `usePromptConfig` (lightweight Zustand store or React context). Tailwind: `accent-primary` for native checkbox theming, `text-sm text-slate-500` for helper text.  Schema awareness: checkbox state corresponds to `prompts.is_system_default` (read from task 6) and `analysis_runs.use_default_prompt` (written by task 22).  Ordering rationale: This task is position 28 — depends on layout (task 24). Sibling to task 29 (custom textarea); both write into the same prompt state store.  Webflow mapping: Implements node `I` (Default Prompt Config).  ## Related user story - US-017 (Default Prompt Toggle). | 2 | Medium | todo |
| 29 | Custom prompt textarea component | ## Description Extend `components/PromptConfig.tsx` with a `<textarea>` shown only when the default toggle is OFF. Auto-grows up to 6 lines, live character counter (red near 2000 limit), helper text reminding the LLM should still return JSON. Empty textarea + unchecked default = Analyze button disabled downstream.  ## Design detail Tailwind: `resize-none`, `focus:ring-2 focus:ring-primary focus:border-transparent`, `min-h-[6rem]`. Counter: `text-xs text-slate-400` switching to `text-red-500` past 1800 chars. Native HTML constraint `maxLength={2000}`.  Schema awareness: text maps to `analysis_runs.custom_prompt_text` (nullable column from task 9) and `prompts.body` when saved (task 6).  Ordering rationale: This task is position 29 — depends on task 28 (shares the prompt store). Independent of gallery and analyze button.  Webflow mapping: Implements node `J` (Custom Prompt Textarea).  ## Related user story - US-018 (Custom Prompt Textarea). | 3 | Medium | todo |
| 30 | Analyze button with loading state | ## Description Build `components/AnalyzeButton.tsx`: prominent button enabled only when ≥1 image is uploaded AND (default checked OR custom prompt non-empty). On click: calls `analyzeImages()`, shows spinner + "Analyzing X images..." text, hides on success, shows retry button on error. Auto-scrolls to results section on success.  ## Design detail Local state machine: `idle → loading → success \| error`. SVG spinner with `animate-spin`. Tailwind: `bg-primary hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg`, disabled `opacity-50 cursor-not-allowed`.  Schema awareness: triggers `POST /api/analyze` (task 22) which writes `analysis_runs`, `analysis_results`, `criterion_scores`.  Ordering rationale: This task is position 30 — depends on gallery (task 27), prompt config (tasks 28-29), and API client (task 25). It feeds results tasks (31-33).  Webflow mapping: Implements node `K` (Analyze Button) → `L` (Analysis Loading State).  ## Related user story - US-019 (Analyze Button with Loading State). | 3 | Medium | todo |
| 31 | Per-image analysis result card | ## Description Build `components/AnalysisCard.tsx`: rounded-2xl elevated card showing the image thumbnail, filename, confidence badge, summary paragraph, strongest/weakest criterion chips, recommendation in a callout block, and a collapsible score-breakdown section.  ## Design detail Tailwind: `bg-surface-elevated dark:bg-slate-800 rounded-2xl shadow-card p-6`, hover `hover:shadow-lg transition`. Confidence badge: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800`.  Schema awareness: renders fields from `analysis_results` (`summary`, `recommendation`, `strongest_criterion`, `weakest_criterion`, `confidence`) plus `images.filename` (task 8) and nested `criterion_scores` rows (task 11).  Ordering rationale: This task is position 31 — depends on analyze button (task 30) producing an `AnalyzeResponse`. Sibling to score bars (32) and comparison grid (33); all consume the same response payload.  Webflow mapping: Implements node `Q` (Per-Image Analysis Cards).  ## Related user story - US-020 (Per-Image Analysis Result Card). | 4 | Medium | todo |
| 32 | Score visualization bars and color-coded badges | ## Description Build `components/ScoreBar.tsx` and `components/ScoreBadge.tsx`. `ScoreBar` is a horizontal bar whose width is `(score/10)*100%`, color-coded red (0-3), amber (4-6), emerald (7-10), with numeric value and `aria-valuenow`. `ScoreBadge` is a compact chip variant for tight UIs.  ## Design detail Tailwind: bar `bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden` with inner `bg-{red\|amber\|emerald}-500 transition-[width] duration-500`. ARIA: `role="progressbar" aria-valuemin={0} aria-valuemax={10} aria-valuenow={score}`.  Schema awareness: reads `criterion_scores.score` (task 11) and `criteria.min_score`/`max_score` (task 5) for threshold derivation.  Ordering rationale: This task is position 32 — depends on the response shape (from task 30). Used inside the per-image card (task 31) and comparison grid (task 33).  Webflow mapping: Implements node `R` (Score Visualization).  ## Related user story - US-021 (Criterion Score Visualization). | 3 | Medium | todo |
| 33 | Comparative analysis dashboard and winner banner | ## Description Build `components/ComparisonGrid.tsx` (matrix of criteria × images with a 🏆 winner cell per row, sticky header, click-to-scroll to that image's card) and `components/WinnerBanner.tsx` (large gradient card at the top showing `winner_index` image, its summary, "Overall Winner" badge, animated entrance).  ## Design detail CSS Grid: `grid-cols-[180px_repeat(N,minmax(120px,1fr))]` with horizontal scroll on mobile. Winner cell highlight: `bg-emerald-50 dark:bg-emerald-900/20 ring-2 ring-emerald-400`. Banner: `bg-gradient-to-br from-primary to-accent text-white rounded-2xl p-8 shadow-2xl`, entrance `animate-fade-in-up`.  Schema awareness: `analysis_runs.winner_image_id` (task 9) drives the banner; `criterion_scores` × `criteria` aggregation drives per-row winners.  Ordering rationale: This task is position 33 — depends on score bars (task 32) and the response payload (task 30). Combines two user stories (US-022 + US-023) because they share state and styling.  Webflow mapping: Implements nodes `P` (Comparison Dashboard) and `O` (Winner Banner).  ## Related user story - US-022 (Comparative Analysis Dashboard View). - US-023 (Overall Winner & Recommendation Banner). | 5 | Medium | todo |
| 34 | NextAuth setup and protected routes | ## Description Create `frontend/app/api/auth/[...nextauth]/route.ts` configuring NextAuth with the `CredentialsProvider` (any email accepted for the POC, JWT session strategy, `NEXTAUTH_SECRET` in `.env.local`). Wrap the analyzer page in a session check that redirects to `/signin` when unauthenticated. Add `SessionProvider` in `app/layout.tsx`.  ## Design detail ```ts import NextAuth from "next-auth"; import CredentialsProvider from "next-auth/providers/credentials"; export const authOptions = { providers: [CredentialsProvider({ name:"Email", credentials:{ email:{} }, async authorize(c){ return c?.email ? { id:c.email, email:c.email } : null } })], session:{ strategy:"jwt" }, secret: process.env.NEXTAUTH_SECRET }; const handler = NextAuth(authOptions); export { handler as GET, handler as POST }; ``` Protected route pattern: client `useSession()` → `useEffect(()=>{ if(status==="unauthenticated") router.replace("/signin"); }, [status])`.  Schema awareness: requires `users.email` UNIQUE (task 1). `accounts` (task 2) ready for future OAuth providers.  Ordering rationale: This task is position 34 — depends on layout (task 24). The frontend token forwarding (task 35) depends on `session.accessToken` being available here.  Webflow mapping: Implements node `C` (Sign In Page) and the redirect edge from `B` (Session Valid?) → `D` (Main Analyzer Page).  ## Related user story - US-024 (NextAuth Skeleton Setup). - US-025 (Protected Route — Redirect Unauthenticated Users). | 4 | Medium | todo |
| 35 | Token forwarding to FastAPI and error handling UI | ## Description Update `frontend/lib/api.ts` (from task 25) to attach `Authorization: Bearer <jwt>` to every authenticated call using `getSession()` (server) or `useSession().data?.accessToken` (client). Build `components/ErrorToast.tsx`: fixed-position red-accented toast with `Retry` and `Dismiss` buttons, auto-dismiss after 8s, differentiated copy for 401 (redirect), 4xx (input), 5xx (retry).  ## Design detail ```ts import { getSession } from "next-auth/react"; export async function authedFetch(path: string, init: RequestInit = {}) {   const session = await getSession();   const res = await fetch(`${API}${path}`, { ...init, credentials:"include", headers:{ ...(init.headers\|\|{}), ...(session?.accessToken ? { Authorization:`Bearer ${session.accessToken}` } : {}) } });   if (res.status === 401) { window.location.href = "/signin"; throw new ApiError(401, "Unauthorized"); }   if (!res.ok) throw await toApiError(res);   return res.json(); } ``` Schema awareness: 401 means `get_current_user` (task 23) couldn't match `users.email` from the JWT.  Ordering rationale: This task is position 35 — depends on API client (task 25) and NextAuth (task 34). It is the bridge that closes the auth loop end-to-end.  Webflow mapping: Implements node `N` (Error Toast + Retry) and the `B → C` redirect edge on 401.  ## Related user story - US-027 (Send NextAuth Token from Frontend to FastAPI). - US-028 (Error Handling & User Feedback). | 4 | Medium | todo |
| 36 | Dark/light mode, responsive layout, E2E runbook and README | ## Description Final polish bundle: (a) implement `next-themes` dark/light toggle in the navbar with `localStorage` persistence and `prefers-color-scheme` default; (b) verify all screens work at 375px (iPhone SE), 768px (tablet), 1440px (desktop) viewports with `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` patterns and 44px+ touch targets; (c) author `RUNBOOK.md` with the step-by-step happy-path and 2 error scenarios (401, LLM timeout); (d) author root `README.md` with architecture diagram (ASCII showing Next.js ↔ FastAPI ↔ OpenAI), prerequisites, setup steps, env-var references, and a status table mapping each of the 32 user stories to its task.  ## Design detail - `next-themes@0.3.x` with `attribute="class"`, `defaultTheme="system"`. Navbar button: SVG sun/moon icons swapping on click. - Tailwind `dark:` variants across every component from tasks 24-35. Breakpoints: `sm:640 md:768 lg:1024 xl:1280`. - `RUNBOOK.md` sections: Prerequisites → Start services → Sign in → Upload 3 images → Toggle default prompt → Click Analyze → Verify (winner banner, comparison grid, score bars) → Error case A (invalid token → redirect) → Error case B (LLM timeout → retry toast). - `README.md` ASCII diagram:   ```   [Next.js 14 + TailwindCSS + NextAuth]               \|               \| HTTPS (JWT)               v   [FastAPI + Pillow + SQLAlchemy]  <-- reads/writes --> [PostgreSQL]               \|               \| async httpx               v        [OpenAI gpt-4o]   ```  Ordering rationale: This task is position 36 — the final task. It depends on every prior frontend task (24-35) being mergeable so the runbook and screenshots are accurate. Bundling four polish stories (US-029, US-030, US-031, US-032) is intentional because they are all non-blocking, late-stage work that lands together at project closure.  Webflow mapping: Implements node `T` (Theme Toggle), responsive variants of all nodes, and the documentation closeout for the entire flow `A → S`.  ## Related user story - US-029 (Dark / Light Mode Toggle). - US-030 (Responsive Layout & Mobile Support). - US-031 (End-to-End Smoke Test Runbook). - US-032 (README & Developer Onboarding). | 6 | Low | todo |
