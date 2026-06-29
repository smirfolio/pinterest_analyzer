"use client";

import clsx from "clsx";

export function scoreColor(score: number): "red" | "amber" | "green" {
  if (score <= 3) return "red";
  if (score <= 6) return "amber";
  return "green";
}

const COLOR_BG: Record<"red" | "amber" | "green", string> = {
  red: "bg-red-500",
  amber: "bg-amber-500",
  green: "bg-emerald-500",
};

const COLOR_TEXT: Record<"red" | "amber" | "green", string> = {
  red: "text-red-700 dark:text-red-300",
  amber: "text-amber-700 dark:text-amber-300",
  green: "text-emerald-700 dark:text-emerald-300",
};

type BarProps = {
  score: number;
  label?: string;
  max?: number;
};

export function ScoreBar({ score, label, max = 10 }: BarProps) {
  const pct = Math.max(0, Math.min(100, (score / max) * 100));
  const color = scoreColor(score);
  return (
    <div className="w-full">
      {label && (
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="text-slate-600 dark:text-slate-300">{label}</span>
          <span className="tabular-nums font-medium">{score} / {max}</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={max}
        className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
      >
        <div
          className={clsx("h-full rounded-full transition-all duration-300", COLOR_BG[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

type BadgeProps = {
  score: number;
  size?: "sm" | "md";
};

export function ScoreBadge({ score, size = "sm" }: BadgeProps) {
  const color = scoreColor(score);
  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center rounded-full font-semibold tabular-nums",
        size === "sm" ? "h-6 min-w-[2.5rem] px-2 text-xs" : "h-9 min-w-[3.5rem] px-3 text-sm",
        COLOR_BG[color],
        "text-white",
      )}
      aria-label={`Score ${score} of 10`}
    >
      {score}
    </span>
  );
}

export function ScoreLabel({ score }: { score: number }) {
  const color = scoreColor(score);
  return (
    <span className={clsx("text-xs font-semibold tabular-nums", COLOR_TEXT[color])}>
      {score}/10
    </span>
  );
}