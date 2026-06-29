"use client";

import type { AnalysisResult } from "@/types/api";

type Props = {
  analysis: AnalysisResult;
  imageUrl: string;
  filename?: string;
};

export function WinnerBanner({ analysis, imageUrl, filename }: Props) {
  const winner = analysis.results[analysis.winner_index];
  if (!winner) return null;

  return (
    <section className="animate-fade-in-up overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 p-[1px] shadow-glow">
      <div className="rounded-2xl bg-white p-6 dark:bg-slate-950">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 ring-2 ring-primary-500/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt={filename ?? "Winner"} className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-600 to-accent-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              🏆 Overall Winner
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              Image #{analysis.winner_index + 1}
              {filename && (
                <span className="ml-2 text-base font-normal text-slate-500 dark:text-slate-400">
                  · {filename}
                </span>
              )}
            </h2>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
              {analysis.overall_summary}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Confidence {winner.confidence}% · {winner.summary}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}