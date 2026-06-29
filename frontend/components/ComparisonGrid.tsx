"use client";

import { ScoreBadge } from "./ScoreBar";
import {
  CRITERION_KEYS,
  CRITERION_LABELS,
  type AnalysisResult,
  type CriterionKey,
} from "@/types/api";

type Props = {
  analysis: AnalysisResult;
  imageUrls: string[];
  filenames?: string[];
};

export function ComparisonGrid({ analysis, imageUrls, filenames }: Props) {
  const n = analysis.results.length;

  function scrollToCard(index: number) {
    const el = document.getElementById(`analysis-card-${index}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="card overflow-hidden">
      <div className="border-b border-slate-200 p-4 dark:border-slate-800">
        <h2 className="text-lg font-semibold">Comparative Analysis</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Click any cell to jump to that image&apos;s full card.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/40">
              <th className="sticky left-0 z-10 bg-slate-50 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800/40">
                Criterion
              </th>
              {Array.from({ length: n }, (_, i) => (
                <th key={i} className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-10 w-10 overflow-hidden rounded-md bg-slate-100 dark:bg-slate-700">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imageUrls[i]} alt={filenames?.[i] ?? `Image ${i + 1}`} className="h-full w-full object-cover" />
                    </div>
                    <span className="truncate text-[10px]">
                      {filenames?.[i] ?? `Image ${i + 1}`}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CRITERION_KEYS.map((key) => (
              <tr key={key} className="border-t border-slate-100 dark:border-slate-800">
                <th className="sticky left-0 z-10 bg-white px-3 py-2 text-left text-xs font-medium dark:bg-slate-900">
                  {CRITERION_LABELS[key as CriterionKey]}
                </th>
                {analysis.results.map((r, i) => (
                  <td key={i} className="px-3 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => scrollToCard(i)}
                      className="inline-flex flex-col items-center gap-1 hover:opacity-80"
                    >
                      <ScoreBadge score={r.scores[key]} />
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}