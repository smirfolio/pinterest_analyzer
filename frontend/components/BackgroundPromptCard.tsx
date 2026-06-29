"use client";

import { useState } from "react";

type Props = {
  prompt: string;
};

/**
 * Displays the image-generation prompt produced for a given inspiration,
 * with a one-click copy button so users can paste it straight into
 * Midjourney / DALL-E / Flux / Stable Diffusion.
 */
export function BackgroundPromptCard({ prompt }: Props) {
  const [copied, setCopied] = useState(false);

  if (!prompt || prompt.trim().length === 0) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard may be blocked */
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 dark:border-slate-700 dark:from-slate-900 dark:to-slate-800">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          AI image-gen prompt · background scene
        </h4>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-full bg-primary-600 px-3 py-1 text-xs font-medium text-white shadow-sm transition hover:bg-primary-700 active:scale-95"
          aria-label="Copy image-generation prompt"
        >
          {copied ? "✓ Copied" : "Copy prompt"}
        </button>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-800 dark:text-slate-100">
        {prompt}
      </p>
      <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
        Paste into Midjourney, DALL-E, Flux or Stable Diffusion — drop your product in afterward.
      </p>
    </div>
  );
}