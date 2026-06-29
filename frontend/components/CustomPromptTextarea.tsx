"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

const MAX_CHARS = 2000;

type Props = {
  value: string;
  onChange: (next: string) => void;
  disabled?: boolean;
};

export function CustomPromptTextarea({ value, onChange, disabled }: Props) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  // Auto-grow up to ~6 lines.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 12 * 24)}px`;
  }, [value]);

  const remaining = MAX_CHARS - value.length;
  const nearLimit = remaining < 100;

  return (
    <div>
      <label className="block">
        <span className="text-sm font-medium">Custom prompt</span>
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, MAX_CHARS))}
          placeholder="e.g., Focus on product photography lighting and emotional appeal…"
          rows={4}
          maxLength={MAX_CHARS}
          disabled={disabled}
          aria-describedby="prompt-help"
          className="input-base mt-1 resize-none"
        />
      </label>
      <div className="mt-1 flex items-center justify-between text-xs">
        <span id="prompt-help" className="text-slate-500 dark:text-slate-400">
          The LLM should still return the standard JSON schema (scores, summary, …).
        </span>
        <span
          className={clsx(
            "tabular-nums",
            nearLimit ? "text-red-600 dark:text-red-400" : "text-slate-500 dark:text-slate-400",
          )}
        >
          {value.length} / {MAX_CHARS}
        </span>
      </div>
    </div>
  );
}