"use client";

import type { BatchAnalysis, ImageDescriptor, ThemeAnalysis } from "@/types/api";

type Props = {
  theme: ThemeAnalysis;
  productImageUrl: string;
  bestMatchImageUrl: string;
  bestMatchFilename?: string;
  product?: ImageDescriptor | null;
};

/**
 * Surfaces the cross-batch cohesive-theme result. Shows:
 *   - The shared theme tying the winning references together
 *   - A short product description (LLM-generated)
 *   - The single winner that best fits the product, side-by-side
 *   - The reasoning behind the match
 */
export function ThemeAnalysisCard({
  theme,
  productImageUrl,
  bestMatchImageUrl,
  bestMatchFilename,
  product,
}: Props) {
  return (
    <section className="card overflow-hidden p-0">
      <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 p-[1px]">
        <div className="bg-white p-5 dark:bg-slate-950 sm:p-6">
          <header className="flex items-center gap-2">
            <span className="inline-flex h-7 items-center rounded-full bg-gradient-to-r from-primary-600 to-accent-500 px-3 text-xs font-bold uppercase tracking-wider text-white">
              Cohesive theme · product match
            </span>
          </header>

          <div className="mt-4 grid gap-5 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-xl font-bold leading-snug sm:text-2xl">
                {theme.cohesive_theme}
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Product · {theme.product_description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={productImageUrl}
                  alt={product?.filename ?? "Your product"}
                  className="h-24 w-24 rounded-xl border border-slate-200 object-cover dark:border-slate-700"
                />
                <p className="mt-1 text-[10px] uppercase tracking-wide text-slate-500">
                  Your product
                </p>
              </div>
              <span className="text-2xl text-slate-400">→</span>
              <div className="text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={bestMatchImageUrl}
                  alt={bestMatchFilename ?? "Best inspiration"}
                  className="h-24 w-24 rounded-xl border-2 border-primary-500 object-cover shadow-glow"
                />
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">
                  Best match
                </p>
              </div>
            </div>
          </div>

          <blockquote className="mt-5 rounded-xl border-l-4 border-accent-500 bg-accent-50 p-4 text-sm text-accent-900 dark:bg-accent-900/20 dark:text-accent-100">
            <span className="text-xs font-semibold uppercase tracking-wide opacity-70">
              Why this match
            </span>
            <p className="mt-1">{theme.match_reason}</p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

export function getBestMatchGlobalIndex(
  theme: ThemeAnalysis | null | undefined,
  winnerGlobalIndices: number[],
): number | null {
  if (!theme) return null;
  const idx = winnerGlobalIndices[theme.best_match_local_index];
  return typeof idx === "number" ? idx : null;
}

export function winnerGlobalIndicesForBatches(
  batches: BatchAnalysis[],
  batchSize: number,
): number[] {
  const out: number[] = [];
  for (const b of batches) {
    for (const local of b.winner_indices) {
      out.push(b.batch_index * batchSize + local);
    }
  }
  return out;
}