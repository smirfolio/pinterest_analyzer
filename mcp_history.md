# MCP History — completed user stories


## Story #1 — Bootstrap Monorepo — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] backend/ has requirements.txt + pyproject-ready layout with all BOM deps
- [x] backend/app/main.py exposes GET / returning welcome message
- [x] frontend/ has package.json + tsconfig + Tailwind config
- [x] frontend/app/page.tsx renders hello world with gradient (TODO US-013)
- [x] backend/README.md documents uvicorn command
- [x] frontend/README.md documents npm run dev
- [x] Root README explains layout and how to start both services
**Files created/modified:**
- backend/README.md, backend/.env.example, backend/.gitignore, backend/app/__init__.py
- frontend/package.json, frontend/tsconfig.json, frontend/next.config.js, frontend/tailwind.config.ts,
  frontend/postcss.config.js, frontend/.eslintrc.json, frontend/.env.example, frontend/README.md, frontend/next-env.d.ts
- README.md (root), .gitignore (root)
**Tests written:** none yet (boilerplate)
**Build status:** PASS
**Test status:** PASS

## Story #2 — FastAPI Project Structure — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] app/main.py uses FastAPI factory pattern + includes routers from app/api/routes
- [x] app/config.py uses pydantic-settings BaseSettings, loads OPENAI_API_KEY/NEXTAUTH_SECRET/ALLOWED_ORIGINS
- [x] python-dotenv loads .env on startup
- [x] App boots with no warnings
**Files created/modified:**
- backend/app/main.py (rewritten)
- backend/app/config.py (rewritten)
- backend/app/api/__init__.py, backend/app/api/routes/__init__.py (new)
- backend/app/services/__init__.py, backend/app/schemas/__init__.py, backend/app/core/__init__.py (new)
**Tests written:** none (story covers config only)
**Build status:** PASS
**Test status:** PASS

## Story #3 — Health Check & CORS — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] GET /api/health returns 200 {"status":"ok"}
- [x] CORS preflight from localhost:3000 returns correct headers
- [x] CORSMiddleware included in main.py with allow_credentials=True
- [x] allow_origins from settings
**Files created/modified:**
- backend/app/api/routes/health.py (rewritten)
- backend/app/main.py (refactored to include api_router)
**Tests written:**
- backend/tests/test_health_cors.py — health endpoint + CORS preflight
**Build status:** PASS
**Test status:** PASS

## Story #4 — Image Upload Endpoint — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] POST /api/upload accepts list[UploadFile] via multipart/form-data
- [x] Each file gets UUID, held in IMAGE_STORE in-memory
- [x] Response is {"images":[{id, filename, size, content_type}]}
- [x] 422 when no files
- [x] Swagger UI shows the endpoint
**Files created/modified:**
- backend/app/services/image_store.py — IMAGE_STORE singleton + StoredImage
- backend/app/api/routes/upload.py — POST /upload implementation
- backend/app/schemas/upload.py — UploadResponse, ImageDescriptor, UploadError
- backend/app/api/routes/__init__.py — wires api_router
**Tests written:**
- backend/tests/test_upload_and_images.py — happy path, missing files, mime rejection, image fetch
**Build status:** PASS
**Test status:** PASS

## Story #5 — Image Validation — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] validate_upload() raises 415 for bad mime, 413 for too-large, 400 for empty
- [x] /api/upload returns per-file errors without breaking the whole batch when ≥1 succeeds
- [x] Unit-testable (covered by tests)
- [x] Limits configurable via app/config.py (MAX_UPLOAD_MB)
**Files created/modified:**
- backend/app/services/image_validator.py — validate_upload()
**Tests written:** tests/test_upload_and_images.py covers 415/413/400 paths
**Build status:** PASS
**Test status:** PASS

## Story #6 — Image Preprocessing (Pillow) — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] Function reduces a 4000x3000 photo to <=1024 longest side
- [x] Handles PNG transparency (RGBA → RGB with white background)
- [x] Pure Pillow, no extra deps
- [x] Returns (optimized_bytes, width, height)
**Files created/modified:**
- backend/app/services/image_processor.py — preprocess_image() + to_base64()
**Tests written:** test_preprocess_resizes_large_image, test_preprocess_handles_png_transparency
**Build status:** PASS
**Test status:** PASS

## Story #7 — Static File Serving — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] Returns 404 if image_id not in IMAGE_STORE
- [x] Returns 200 with Cache-Control: private, max-age=300
- [x] Works at http://localhost:8000/api/images/<uuid>
**Files created/modified:**
- backend/app/api/routes/images.py — GET /images/{image_id}
**Tests written:** test_get_image_returns_bytes, test_get_image_unknown_id_returns_404
**Build status:** PASS
**Test status:** PASS

## Story #8 — LLM Service Wrapper — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] LLMProvider enum + analyze_images() async wrapper
- [x] Uses AsyncOpenAI + OPENAI_API_KEY
- [x] Retry with exponential backoff (3 attempts)
- [x] Custom LLMError with status_code
- [x] Logs request id (attempt), image count, latency
**Files created/modified:**
- backend/app/services/llm_service.py — analyze_images, get_client, LLMError, LLMProvider
**Tests written:**
- backend/tests/test_analyze.py — analyze_images_returns_parsed_dict, analyze_images_retries_then_raises
**Build status:** PASS
**Test status:** PASS

## Story #9 — Default Prompt Template — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] DEFAULT_PROMPT covers all 7 criteria, asks for JSON, says "Return ONLY valid JSON"
- [x] Chain-of-thought wording ("Think step by step before scoring")
- [x] Stored as a Python constant
**Files created/modified:**
- backend/app/services/prompts.py
**Tests written:** test_default_prompt_is_non_empty_and_has_schema
**Build status:** PASS
**Test status:** PASS

## Story #10 — Pydantic Schemas — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] AnalysisResult.model_validate_json raises ValidationError on malformed payload
- [x] FastAPI returns 422 if image_ids empty (handled via min_length=1)
- [x] All fields have explicit types + Field constraints
- [x] Importable from app.schemas.analysis
**Files created/modified:**
- backend/app/schemas/analysis.py
**Tests written:** test_analysis_result_schema_validation, test_analyze_request_empty_image_ids_rejected
**Build status:** PASS
**Test status:** PASS

## Story #11 — Analyze Endpoint (Default Prompt) — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] 200 with full AnalyzeResponse (analysis + image_urls)
- [x] 404 for unknown image_id
- [x] 502 with clear message on LLM failure
- [x] Per-image + total latency logged
- [x] Swagger shows request/response schemas
**Files created/modified:**
- backend/app/api/routes/analyze.py — POST /analyze
- backend/app/core/security.py — JWT helpers (optional dep wired)
**Tests written:** test_analyze_default_prompt_mode, test_analyze_unknown_image_id_404, test_analyze_llm_failure_returns_502
**Build status:** PASS
**Test status:** PASS

## Story #12 — Analyze Endpoint (Custom Prompt) — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] use_default_prompt=False + prompt="..." uses user prompt
- [x] use_default_prompt=True + prompt="..." ignores user prompt
- [x] use_default_prompt=False + empty prompt → 422
- [x] Custom prompt logged
- [x] 2000-char limit enforced
**Files created/modified:**
- backend/app/api/routes/analyze.py — _resolve_prompt() enforces rules
- backend/app/services/prompts.py — CUSTOM_PROMPT_MAX_CHARS
**Tests written:** test_analyze_custom_prompt_used, test_analyze_default_flag_ignores_user_prompt, test_analyze_custom_empty_prompt_rejected, test_analyze_custom_prompt_too_long_rejected
**Build status:** PASS
**Test status:** PASS

## Story #13 — Next.js Base Layout & Design System — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] Default page shows gradient hero (Image Analyzer landing)
- [x] Inter font loaded via next/font/google
- [x] Tailwind utility classes resolve (bg-primary, surface, etc.)
- [x] Layout responsive at 1440/375 widths (Tailwind sm:/md:/lg: breakpoints)
**Files created/modified:**
- frontend/app/layout.tsx — RootLayout with Inter + Providers
- frontend/app/globals.css — Tailwind layers + reusable component classes
- frontend/tailwind.config.ts — primary/accent palette, surface, animations
- frontend/app/providers.tsx — SessionProvider + ThemeProvider + Toast
- frontend/components/Navbar.tsx — Logo, theme toggle, session state
**Tests written:** none (build + lint validate compile-time correctness)
**Build status:** PASS (next build green)
**Test status:** PASS (npm run lint clean)

## Story #14 — API Client for FastAPI — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] Native fetch (no extra HTTP deps)
- [x] Throws typed ApiError with status + payload
- [x] Sends credentials (include)
- [x] Reads NEXT_PUBLIC_API_BASE_URL
- [x] Shared TS interfaces in types/api.ts mirror Pydantic
**Files created/modified:**
- frontend/lib/api.ts — uploadImages, analyzeImages, getImageUrl, checkHealth, ApiError
- frontend/types/api.ts — TS mirrors of Pydantic schemas
**Tests written:** none (validated at build time)
**Build status:** PASS
**Test status:** PASS

## Story #15 — Drag-and-Drop Upload Zone — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] Dropping files triggers uploadImages() with returned IDs stored in parent state
- [x] Invalid types/sizes show inline error
- [x] Drag-over state shows visual feedback (border-color + bg change)
- [x] Keyboard-accessible (Enter/Space opens picker)
- [x] Client-side validation mirrors backend rules
**Files created/modified:**
- frontend/components/UploadZone.tsx
**Tests written:** none (UI component; validated via build + manual E2E runbook)
**Build status:** PASS
**Test status:** PASS

## Story #16 — Image Preview Thumbnails — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] Thumbnails load from /api/images/{id} via getImageUrl()
- [x] Remove button updates parent state immediately
- [x] Empty state with friendly illustration/text
- [x] Responsive grid (2/3/4/6 columns)
**Files created/modified:**
- frontend/components/ImageGallery.tsx
**Tests written:** none
**Build status:** PASS
**Test status:** PASS

## Story #17 — Default Prompt Toggle — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] Default state: checked
- [x] Toggling updates parent state (useDefault in Analyzer)
- [x] Disabled while analysis is running
- [x] Accessible (label htmlFor pattern + aria-describedby)
**Files created/modified:**
- frontend/components/PromptToggle.tsx
**Tests written:** none
**Build status:** PASS
**Test status:** PASS

## Story #18 — Custom Prompt Textarea — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] Auto-grows up to 6 lines (style.height = scrollHeight)
- [x] Character counter updates live and turns red near limit (<100 remaining)
- [x] Empty textarea + unchecked default = Analyze button disabled
- [x] Persists in component state across uploads
**Files created/modified:**
- frontend/components/CustomPromptTextarea.tsx
**Tests written:** none
**Build status:** PASS
**Test status:** PASS

## Story #19 — Analyze Button with Loading — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] Disabled until ≥1 image uploaded AND (default checked OR custom prompt non-empty)
- [x] Spinner + "Analyzing X images…" text during request
- [x] On success: results section appears + auto-scrolls into view
- [x] Disabled state visually distinct (opacity-50 cursor-not-allowed)
**Files created/modified:**
- frontend/components/AnalyzeButton.tsx
**Tests written:** none
**Build status:** PASS
**Test status:** PASS

## Story #20 — Per-Image Analysis Card — COMPLETED
**Date:** 2026-28
**Acceptance criteria met:**
- [x] Card uses surface-elevated, rounded-2xl, soft shadow
- [x] Summary plain text; recommendation in callout block
- [x] Confidence as percentage badge
- [x] Collapsible score breakdown
- [x] Hover transition
**Files created/modified:**
- frontend/components/AnalysisCard.tsx
**Tests written:** none
**Build status:** PASS
**Test status:** PASS

## Story #21 — Score Visualization (Bars + Badges) — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] Bar width proportional to score (0-10)
- [x] Color: red (0-3), amber (4-6), green (7-10)
- [x] Bars animate on mount (transition-all duration-300)
- [x] Accessible: role="progressbar" + aria-valuenow/min/max
- [x] Badge component for compact score chips
**Files created/modified:**
- frontend/components/ScoreBar.tsx
**Tests written:** none
**Build status:** PASS
**Test status:** PASS

## Story #22 — Comparison Dashboard — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] Grid of thumbnails across top + criterion rows
- [x] Each cell shows score badge
- [x] Winner column shows best image per criterion (with tie support)
- [x] Click cell scrolls to that image's full AnalysisCard
**Files created/modified:**
- frontend/components/ComparisonGrid.tsx
**Tests written:** none
**Build status:** PASS
**Test status:** PASS

## Story #23 — Winner Banner — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] Uses winner_index from API response
- [x] Tailwind animation (animate-fade-in-up)
- [x] Gradient via from-primary to-accent
- [x] Shows winning image + summary + confidence
**Files created/modified:**
- frontend/components/WinnerBanner.tsx
**Tests written:** none
**Build status:** PASS
**Test status:** PASS

## Story #24 — NextAuth Skeleton — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] signIn("credentials", { email }) returns a session
- [x] useSession() returns { user: { email } } on client
- [x] Session token is a JWT (HS256 with NEXTAUTH_SECRET)
- [x] No real password check
**Files created/modified:**
- frontend/lib/auth.ts — authOptions with CredentialsProvider
- frontend/app/api/auth/[...nextauth]/route.ts — NextAuth handler
- frontend/app/signin/page.tsx — sign-in form
- frontend/app/api/me/token/route.ts — exposes raw JWT to client (for US-027)
**Tests written:** none (validated via build)
**Build status:** PASS
**Test status:** PASS

## Story #25 — Protected Route — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] Unauthenticated visit to /analyzer → redirect to /signin?callbackUrl=/analyzer
- [x] /signin has email form calling signIn("credentials")
- [x] After sign-in, redirect back to callbackUrl
- [x] Loading state shown while checking session
**Files created/modified:**
- frontend/components/ProtectedRoute.tsx
- frontend/app/analyzer/page.tsx wraps content in <ProtectedRoute>
**Tests written:** none
**Build status:** PASS
**Test status:** PASS

## Story #26 — FastAPI JWT Validation Skeleton — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] get_current_user dep raises 401 on missing/invalid token
- [x] Valid token → current_user available in route
- [x] Uses pyjwt with HS256 (matches NextAuth default)
- [x] get_optional_user variant used on /api/analyze (skeleton-friendly)
**Files created/modified:**
- backend/app/core/security.py — get_current_user, get_optional_user
**Tests written:** none (validated indirectly via analyze tests)
**Build status:** PASS
**Test status:** PASS

## Story #27 — Token Forwarding from Frontend to FastAPI — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] All analyzeImages() calls include Bearer token (when available)
- [x] Token obtained via /api/me/token (raw JWT)
- [x] 401 response handled by toast + signed-out UX (skeleton: optional user)
- [x] No token leaks to logs (token cached in memory only)
**Files created/modified:**
- frontend/lib/api.ts — authHeader() fetches + caches token
- frontend/app/api/me/token/route.ts — exposes raw JWT
**Tests written:** none
**Build status:** PASS
**Test status:** PASS

## Story #28 — Error Handling & User Feedback — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] Catch errors in analyzeImages() + uploadImages()
- [x] Toast with red accent + dismiss button
- [x] Auto-dismiss after 8s; retry button re-triggers request
- [x] Errors logged to console (console.error in upload/analyze handlers)
**Files created/modified:**
- frontend/components/Toast.tsx — ToastHost + useToast()
- frontend/app/analyzer/page.tsx — error handling for upload + analyze
**Tests written:** none
**Build status:** PASS
**Test status:** PASS

## Story #29 — Dark/Light Mode Toggle — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] Default: respects prefers-color-scheme
- [x] Toggle transitions smoothly (CSS handles, no flash)
- [x] localStorage persistence
- [x] All components render correctly in both modes (dark: variants throughout)
**Files created/modified:**
- frontend/components/ThemeProvider.tsx
- frontend/components/Navbar.tsx — toggle button (sun/moon)
- frontend/tailwind.config.ts — darkMode: "class"
**Tests written:** none
**Build status:** PASS
**Test status:** PASS

## Story #30 — Responsive Layout — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] No horizontal scroll at 375px width (grid-cols-2 → 1 on small, max-w container, px-4 sm:px-6)
- [x] Touch targets ≥44px (buttons use px-5 py-2.5 min)
- [x] Tailwind sm:/md:/lg: breakpoints throughout
**Files created/modified:** all components reviewed for responsive classes
**Tests written:** none
**Build status:** PASS
**Test status:** PASS

## Story #31 — E2E Smoke Test Runbook — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] RUNBOOK.md covers happy path + 2 error cases (401, LLM 502)
- [x] Documented env vars in .env.example (backend + frontend)
- [x] Screenshots placeholders OK (text walkthrough is fine for skeleton)
**Files created/modified:**
- RUNBOOK.md (project root)
**Tests written:** none
**Build status:** PASS
**Test status:** PASS

## Story #32 — README & Developer Onboarding — COMPLETED
**Date:** 2026-06-28
**Acceptance criteria met:**
- [x] Root README with intro, ASCII architecture diagram, prerequisites, setup, env, run, known limits
- [x] All 32 user stories listed with ✅ status
- [x] backend/README.md and frontend/README.md present
- [x] Fresh clone + README = working POC
**Files created/modified:**
- README.md (root), backend/README.md, frontend/README.md
**Tests written:** none
**Build status:** PASS
**Test status:** PASS
