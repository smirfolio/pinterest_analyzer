"use client";

import clsx from "clsx";

type Props = {
  useDefault: boolean;
  onToggle: (next: boolean) => void;
  disabled?: boolean;
};

export function PromptToggle({ useDefault, onToggle, disabled }: Props) {
  return (
    <label
      className={clsx(
        "flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition dark:border-slate-700 dark:bg-slate-900",
        disabled && "pointer-events-none opacity-60",
      )}
    >
      <input
        type="checkbox"
        checked={useDefault}
        onChange={(e) => onToggle(e.target.checked)}
        disabled={disabled}
        className="mt-0.5 h-4 w-4 accent-primary-600"
        aria-describedby="prompt-toggle-help"
      />
      <span className="flex-1">
        <span className="block text-sm font-medium">Use default analysis prompt</span>
        <span
          id="prompt-toggle-help"
          className="mt-1 block text-xs text-slate-500 dark:text-slate-400"
        >
          Covers attractiveness, color balance, selling idea, trending/viral concept,
          marketing message, product presentation, and value messaging.
        </span>
      </span>
    </label>
  );
}