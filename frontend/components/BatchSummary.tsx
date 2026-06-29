"use client";

import type { BatchAnalysis } from "@/types/api";

type Props = {
  batches: BatchAnalysis[];
};

/**
 * Tiny status strip showing how the analysis was sliced into LLM calls.
 * Batching is meant to be transparent — this badge just gives curious users
 * the reassurance that nothing was lost: e.g. "10 references → 2 batches of
 * 5 → 4 winners → theme match".
 */
export function BatchSummary({ batches }: Props) {
  if (!batches || batches.length === 0) return null;

  const total = batches.reduce((acc, b) => acc + b.results.length, 0);
  const winners = batches.reduce((acc, b) => acc + b.winner_indices.length, 0);
  const batchCount = batches.length;

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
      <span className="inline-flex h-5 items-center rounded-full bg-primary-100 px-2 text-[10px] font-semibold uppercase tracking-wide text-primary-700 dark:bg-primary-900/40 dark:text-primary-200">
        Processing
      </span>
      <span>
        <strong className="font-semibold text-slate-800 dark:text-slate-100">{total}</strong>{" "}
        reference{total === 1 ? "" : "s"}
        {" "}→ <strong className="font-semibold text-slate-800 dark:text-slate-100">{batchCount}</strong>{" "}
        batch{batchCount === 1 ? "" : "es"}
        {" "}→ <strong className="font-semibold text-slate-800 dark:text-slate-100">{winners}</strong>{" "}
        winner{winners === 1 ? "" : "s"} advanced to the theme round
      </span>
    </div>
  );
}