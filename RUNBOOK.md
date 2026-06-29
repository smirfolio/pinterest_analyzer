# RUNBOOK — Creatives Design Analyser

End-to-end manual walkthrough for the POC.

## Prerequisites
- Python ≥ 3.11 with backend dependencies installed (`pip install -r backend/requirements.txt`).
- Node.js ≥ 20 with frontend dependencies installed (`npm install` inside `frontend/`).
- A valid `OPENAI_API_KEY` in `backend/.env` for live analyses (the rest of the app runs without it).

## 1 · Start the backend
```bash
cd backend
cp .env.example .env       # fill OPENAI_API_KEY + AI_PROVIDER_URL + OPENAI_MODEL + NEXTAUTH_SECRET
uvicorn app.main:app --reload --port 8000
```

Verify:
```bash
curl http://localhost:8000/api/health
# {"status":"ok"}
```

Swagger UI: <http://localhost:8000/docs>

### Provider examples
```env
# OpenAI (default)
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini

# Cerebras
OPENAI_API_KEY=csk-...
AI_PROVIDER_URL=https://api.cerebras.ai/v1
OPENAI_MODEL=gemma-4-31b     # only vision-capable model on Cerebras

# Local Ollama
OPENAI_API_KEY=ollama
AI_PROVIDER_URL=http://localhost:11434/v1
OPENAI_MODEL=llava
```

## 2 · Start the frontend
```bash
cd frontend
cp .env.example .env.local  # fill NEXTAUTH_SECRET (must match backend)
npm run dev
```
Open <http://localhost:3000>.

## 3 · Sign in
1. Click **Sign in** in the navbar.
2. Enter any email (e.g. `[email protected]`).
3. Click **Sign in** → you land on `/analyzer`.

> The Credentials provider accepts any non-empty email; no password check is performed.

## 4 · Upload reference images
1. On `/analyzer`, drag one or more images onto the drop zone — or click to browse.
2. Supported: `image/jpeg`, `image/png`, `image/webp`, max **10 MB** each.
3. **Cap: 10 reference images per analysis** (hardcoded on both sides — matches Cerebras's 5/image limit × 2 batches).
4. The drop zone shows a live counter (`3 / 10 images · 7 slots left`) and disables itself at the cap.
5. Thumbnails appear with filename + size; click the × to remove.

## 5 · Add your own product *(optional)*
1. Use the **compact product drop-zone** below the reference images.
2. Drop **one** product image (the SKU you actually sell).
3. The backend will use it to identify the inspiration that best matches your product's positioning.

If skipped, you still get per-image scores, color trends, inspired product directions and image-generation prompts — but no theme match.

## 6 · Pick a prompt
- **Default mode (recommended):** leave the checkbox enabled. The curated prompt covers all seven criteria and the inspiring add-ons (color palette, color trend, inspired products, background scene prompt).
- **Custom mode:** uncheck the box and type your own prompt (≤ 2000 chars). The LLM still must return the standard JSON schema.

## 7 · Analyze
1. Click **Analyze N images**.
2. A spinner + "Analyzing …" appears.
3. Behind the scenes the backend may run **multiple LLM calls** transparently:
   - 1 call if ≤ 5 references,
   - 2 parallel calls (5 + 5) if 6–10 references,
   - +1 theme call if a product image was uploaded.
4. On success you see, in order:
   - **`BatchSummary`** badge *(only when > 1 batch)* — e.g. *"10 references → 2 batches → 4 winners advanced to the theme round"*.
   - **`ThemeAnalysisCard`** *(only if product uploaded)* — cohesive theme tying the winners together, side-by-side product ↔ best-match images, reasoning.
   - **🏆 Winner banner** — global best across all references.
   - **`ComparisonGrid`** — clickable table of all criteria.
   - **Per-image breakdown** cards. Each card shows:
     - summary, strongest/weakest criterion, recommendation
     - **Color palette** (click-to-copy swatches)
     - **Color trend** narrative
     - **3 inspired product directions** (cosmetics, health, 3D printing, …)
     - **AI image-generation prompt** for a complementary background scene (one-click copy)
     - expandable **score breakdown** (7 criteria)
     - badges: **`Batch winner`** (amber, top-2 in its batch) and/or **`Best match`** (primary, the single winner that best fits the product)

## 8 · Toggle dark/light mode
Use the sun/moon icon in the navbar. The choice persists in `localStorage`.

## 9 · Error scenarios

### 9.1 Invalid upload
- Drop a `.pdf` → the upload zone shows an inline error and only valid files are accepted.
- Drop more than 10 files → the excess are rejected with `"would exceed the 10-image limit"`; the drop-zone disables once full.
- Upload an empty file → backend returns 400 with detail; the frontend toast shows the message.

### 9.2 LLM failure (502 / upstream error)
1. Set `OPENAI_API_KEY=sk-invalid` in `backend/.env`.
2. Restart the backend, trigger an analysis.
3. The toast shows the LLM error with a **Retry** button.

### 9.3 Provider-specific: multimodal not enabled
Some providers reject multimodal requests for non-vision models. If you see `multimodal_not_enabled`:
- Confirm `OPENAI_MODEL` is vision-capable on your provider (e.g. `gemma-4-31b` on Cerebras).
- Set `OPENAI_MODEL` in `backend/.env` and restart.

### 9.4 Missing or invalid token (401)
1. Open DevTools → Application → Cookies → delete the `next-auth.session-token` cookie.
2. Click **Analyze**.
3. The toast shows "Session expired — please sign in again."

## 10 · Shutdown
- Ctrl-C in both terminal sessions.
- Note: in-memory `IMAGE_STORE` is wiped — re-upload needed after restart.

## 11 · Tests
```bash
# Backend (33 tests, includes batch + theme round coverage)
cd backend && pytest -q

# Frontend (type-check + production build)
cd frontend && npm run build
```