"use client";

import clsx from "clsx";

type Props = {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  imageCount: number;
};

export function AnalyzeButton({ onClick, loading, disabled, imageCount }: Props) {
  const isDisabled = disabled || loading || imageCount === 0;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
      className={clsx(
        "btn-primary px-6 py-3 text-base",
        isDisabled && "opacity-50 cursor-not-allowed",
      )}
    >
      {loading ? (
        <>
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
            <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" />
          </svg>
          Analyzing {imageCount} image{imageCount === 1 ? "" : "s"}…
        </>
      ) : (
        <>
          Analyze {imageCount > 0 ? imageCount : ""} image{imageCount === 1 ? "" : "s"}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </>
      )}
    </button>
  );
}