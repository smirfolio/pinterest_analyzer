"use client";

import { useState } from "react";
import { ScoreBadge, ScoreBar } from "./ScoreBar";
import { ColorPalette } from "./ColorPalette";
import { InspirationSuggestions } from "./InspirationSuggestions";
import { BackgroundPromptCard } from "./BackgroundPromptCard";
import {
  CRITERION_KEYS,
  CRITERION_LABELS,
  type CriterionKey,
  type ImageAnalysis,
} from "@/types/api";

type Props = {
  analysis: ImageAnalysis;
  imageUrl: string;
  filename?: string;
  isBestMatch?: boolean;
  isBatchWinner?: boolean;
};

export function AnalysisCard({ analysis, imageUrl, filename, isBestMatch, isBatchWinner }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <article
      id={`analysis-card-${analysis.image_index}`}
      className={`card flex flex-col gap-5 p-5 transition hover:shadow-lg ${
        isBestMatch ? "ring-2 ring-primary-500" : ""
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-shrink-0">
          <div className="relative h-32 w-32 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 sm:h-40 sm:w-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt={filename ?? `Image ${analysis.image_index + 1}`} className="h-full w-full object-cover" />
            <div className="absolute left-1 top-1 flex flex-col gap-1">
              {isBatchWinner && !isBestMatch && (
                <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow">
                  Batch winner
                </span>
              )}
              {isBestMatch && (
                <span className="rounded-full bg-primary-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow">
                  Best match
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <header className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold">
              Image #{analysis.image_index + 1}
              {filename && <span className="ml-2 text-sm font-normal text-slate-500">· {filename}</span>}
            </h3>
            <ScoreBadge score={analysis.confidence} />
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Confidence {analysis.confidence}%
            </span>
          </header>

          <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{analysis.summary}</p>

          <dl className="mt-3 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Strongest</dt>
              <dd className="font-medium">{CRITERION_LABELS[analysis.strongest_criterion as CriterionKey]}</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Weakest</dt>
              <dd className="font-medium">{CRITERION_LABELS[analysis.weakest_criterion as CriterionKey]}</dd>
            </div>
          </dl>

          <blockquote className="mt-3 rounded-xl border-l-4 border-primary-500 bg-primary-50 p-3 text-sm text-primary-900 dark:bg-primary-900/30 dark:text-primary-100">
            <span className="text-xs font-semibold uppercase tracking-wide opacity-70">Recommendation</span>
            <p className="mt-1">{analysis.recommendation}</p>
          </blockquote>
        </div>
      </div>

      {/* --- Inspiring blocks --- */}
      {(analysis.color_palette?.length > 0 || analysis.color_trend) && (
        <div className="grid gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-900/50 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <ColorPalette hexes={analysis.color_palette} />
          </div>
          <div className="sm:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Color & trend
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-800 dark:text-slate-100">
              {analysis.color_trend}
            </p>
          </div>
        </div>
      )}

      {analysis.inspired_products?.length > 0 && (
        <InspirationSuggestions products={analysis.inspired_products} />
      )}

      <BackgroundPromptCard prompt={analysis.background_scene_prompt} />

      <div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-300"
          aria-expanded={open}
        >
          {open ? "Hide" : "Show"} score breakdown
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className={open ? "rotate-180 transition" : "transition"}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {open && (
          <div className="mt-3 grid gap-2">
            {CRITERION_KEYS.map((k) => (
              <ScoreBar key={k} score={analysis.scores[k]} label={CRITERION_LABELS[k]} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}