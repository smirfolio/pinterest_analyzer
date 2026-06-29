# Frontend — Image Analyzer

Next.js 14 (App Router) + TypeScript + TailwindCSS.

## Prerequisites
- Node.js ≥ 20

## Setup
```bash
cd frontend
npm install
cp .env.example .env.local
```

## Environment

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | no | `http://localhost:8000` | FastAPI base URL |
| `NEXT_PUBLIC_MAX_UPLOAD_MB` | no | `10` | Mirror of backend `MAX_UPLOAD_MB` for client-side pre-check |
| `NEXTAUTH_SECRET` | yes | — | Must match backend `NEXTAUTH_SECRET` |
| `NEXTAUTH_URL` | no | `http://localhost:3000` | Used by NextAuth callbacks |

The **10-image cap is hardcoded** (`MAX_UPLOAD_FILES = 10` in `lib/api.ts`) — it mirrors the backend's hardcoded constant. Both layers must agree.

## Run
```bash
npm run dev
# open http://localhost:3000
```

## Build
```bash
npm run build
npm start
```

## Lint
```bash
npm run lint
```

## Feature tour

The `/analyzer` page is structured in 3 steps:

1. **Upload reference images** — drag & drop or browse. The drop-zone shows a live counter (`3 / 10 images · 7 slots left`) and disables itself at the cap. Each file is validated client-side for type and size before upload.
2. **Add your own product** *(optional)* — a compact drop-zone for a single product image. The backend uses it to run the cross-batch theme round.
3. **Choose a prompt** — default (curated) or custom (≤ 2000 chars).

Click **Analyze** and the backend runs the batched flow. The UI surfaces:

- **🏆 Winner banner** at the top with the global best.
- **`ThemeAnalysisCard`** when a product was uploaded — cohesive theme tying the batch winners together, side-by-side product ↔ best-match images, and the reasoning.
- **`BatchSummary`** badge (only when N > 5): `10 references → 2 batches → 4 winners advanced to the theme round`.
- **`ComparisonGrid`** — clickable table of all criteria, one column per image.
- **Per-image cards** — each shows summary, score breakdown, strongest/weakest criterion, recommendation, color palette (click-to-copy swatches), color trend, 3 inspired product directions (cosmetics / health / 3D printing / …), and a copy-pasteable AI image-generation prompt for a background scene. Winners of their batch get an amber "Batch winner" badge; the single best-fit for the product gets a primary "Best match" badge.

## Project layout

```
frontend
├── app
│   ├── analyzer/page.tsx     # the 3-step analyzer page
│   ├── api/                  # NextAuth route handlers
│   ├── signin/               # credentials sign-in
│   └── layout.tsx
├── components
│   ├── AnalysisCard.tsx      # per-image card + Batch winner / Best match badges
│   ├── BackgroundPromptCard.tsx
│   ├── BatchSummary.tsx      # transparent "10 → 2 → 4" status
│   ├── ColorPalette.tsx      # click-to-copy color swatches
│   ├── ComparisonGrid.tsx
│   ├── InspirationSuggestions.tsx
│   ├── ProductUploader.tsx   # compact uploader for the user's product
│   ├── ThemeAnalysisCard.tsx # cohesive-theme + product match
│   ├── UploadZone.tsx        # batch uploader with live counter
│   └── …
├── lib
│   └── api.ts                # fetch wrappers + MAX_UPLOAD_FILES = 10
└── types
    └── api.ts                # TS mirrors of Pydantic schemas
```