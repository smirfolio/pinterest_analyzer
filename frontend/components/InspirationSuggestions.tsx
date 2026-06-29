"use client";

import { useState } from "react";
import {
  PRODUCT_CATEGORY_LABELS,
  type InspiredProduct,
  type ProductCategory,
} from "@/types/api";

type Props = {
  products: InspiredProduct[];
};

/**
 * Displays 3 creative product ideas inspired by the analyzed image's mood.
 * Each card surfaces the category, a catchy name, the rationale, and a
 * relevance score so users can quickly spot the most promising direction.
 */
export function InspirationSuggestions({ products }: Props) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  if (!products || products.length === 0) return null;

  const sorted = [...products].sort((a, b) => b.relevance_score - a.relevance_score);

  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Inspired product directions
      </h4>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Click one to highlight it as your starting point.
      </p>
      <ul className="mt-3 grid gap-3 sm:grid-cols-3">
        {sorted.map((p, idx) => {
          const isSelected = selectedIdx === idx;
          const label = PRODUCT_CATEGORY_LABELS[p.category as ProductCategory] ?? p.category;
          return (
            <li key={`${p.name}-${idx}`}>
              <button
                type="button"
                onClick={() => setSelectedIdx(isSelected ? null : idx)}
                className={`flex h-full w-full flex-col rounded-xl border p-3 text-left transition ${
                  isSelected
                    ? "border-primary-500 bg-primary-50 shadow-md dark:bg-primary-900/30"
                    : "border-slate-200 bg-white hover:border-primary-300 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-600 dark:bg-slate-700 dark:text-slate-200">
                    {label}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      p.relevance_score >= 80
                        ? "text-emerald-600 dark:text-emerald-400"
                        : p.relevance_score >= 60
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-slate-500 dark:text-slate-400"
                    }`}
                    title="Relevance to the analyzed image"
                  >
                    {p.relevance_score}%
                  </span>
                </div>
                <h5 className="mt-2 text-sm font-semibold leading-snug text-slate-900 dark:text-slate-50">
                  {p.name}
                </h5>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  {p.rationale}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}