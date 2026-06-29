"use client";

import { useState } from "react";

type Props = {
  hexes: string[];
  title?: string;
};

/**
 * Renders a row of dominant color swatches extracted from the analyzed image.
 * Handles any malformed hex by falling back to a neutral swatch.
 */
export function ColorPalette({ hexes, title = "Color palette" }: Props) {
  const [copied, setCopied] = useState<string | null>(null);

  if (!hexes || hexes.length === 0) return null;

  const handleCopy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      window.setTimeout(() => setCopied(null), 1200);
    } catch {
      /* clipboard may be blocked; silent fail */
    }
  };

  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {title}
      </h4>
      <div className="mt-2 flex flex-wrap gap-2">
        {hexes.map((hex, idx) => {
          const isValid = /^#([0-9a-fA-F]{6})$/.test(hex);
          const display = isValid ? hex.toUpperCase() : "#CCCCCC";
          return (
            <button
              key={`${hex}-${idx}`}
              type="button"
              onClick={() => handleCopy(display)}
              className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 text-xs transition hover:border-primary-400 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800"
              title={`Copy ${display}`}
            >
              <span
                className="block h-6 w-6 rounded-full border border-black/10"
                style={{ backgroundColor: display }}
              />
              <span className="font-mono text-slate-700 dark:text-slate-200">
                {display}
              </span>
              <span className="opacity-0 transition group-hover:opacity-100 text-slate-400">
                {copied === display ? "✓" : "⧉"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}