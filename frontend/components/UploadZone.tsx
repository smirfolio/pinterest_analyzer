"use client";

import { useCallback, useRef, useState } from "react";
import clsx from "clsx";
import { MAX_UPLOAD_FILES, MAX_UPLOAD_MB } from "@/lib/api";

const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp"];

type Props = {
  onFiles: (files: File[]) => void;
  disabled?: boolean;
  currentCount?: number;
};

export function UploadZone({ onFiles, disabled, currentCount = 0 }: Props) {
  const [isOver, setIsOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const remaining = Math.max(0, MAX_UPLOAD_FILES - currentCount);

  const validate = useCallback((files: File[]): { ok: File[]; bad: string[] } => {
    const ok: File[] = [];
    const bad: string[] = [];
    let slotsLeft = remaining;

    for (const f of files) {
      if (!ALLOWED_MIME.includes(f.type)) {
        bad.push(`${f.name}: unsupported type "${f.type || "unknown"}"`);
        continue;
      }
      if (f.size > MAX_UPLOAD_MB * 1024 * 1024) {
        bad.push(`${f.name}: exceeds ${MAX_UPLOAD_MB} MB`);
        continue;
      }
      if (f.size === 0) {
        bad.push(`${f.name}: empty file`);
        continue;
      }
      if (slotsLeft <= 0) {
        bad.push(`${f.name}: would exceed the ${MAX_UPLOAD_FILES}-image limit`);
        continue;
      }
      ok.push(f);
      slotsLeft -= 1;
    }
    return { ok, bad };
  }, [remaining]);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      setError(null);
      const files = Array.from(fileList);
      const { ok, bad } = validate(files);
      if (bad.length > 0) setError(bad.join("\n"));
      if (ok.length > 0) onFiles(ok);
    },
    [onFiles, validate],
  );

  const reachedLimit = currentCount >= MAX_UPLOAD_FILES;

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-disabled={disabled || reachedLimit}
        aria-label="Drop images here, or press Enter to browse"
        onClick={() => !disabled && !reachedLimit && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (disabled || reachedLimit) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          if (disabled || reachedLimit) return;
          e.preventDefault();
          setIsOver(true);
        }}
        onDragLeave={() => setIsOver(false)}
        onDrop={(e) => {
          if (disabled || reachedLimit) return;
          e.preventDefault();
          setIsOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={clsx(
          "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition",
          isOver
            ? "border-primary-500 bg-primary-50/50 dark:bg-primary-900/20"
            : "border-slate-300 bg-white hover:border-primary-400 dark:border-slate-700 dark:bg-slate-900",
          (disabled || reachedLimit) && "pointer-events-none opacity-50",
        )}
      >
        <div className="grid h-12 w-12 place-items-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-200">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </div>
        <p className="mt-4 text-base font-medium">
          {reachedLimit ? `Limit reached (${MAX_UPLOAD_FILES} images)` : "Drag & drop images here"}
        </p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {reachedLimit
            ? "Remove one above to add another."
            : `or click to browse — JPG, PNG, WEBP up to ${MAX_UPLOAD_MB} MB each`}
        </p>
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          {currentCount} / {MAX_UPLOAD_FILES} images
          {remaining > 0 && !reachedLimit && ` · ${remaining} slot${remaining === 1 ? "" : "s"} left`}
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ALLOWED_MIME.join(",")}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          disabled={disabled || reachedLimit}
        />
      </div>
      {error && (
        <p
          role="alert"
          className="mt-3 whitespace-pre-line rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-900/40 dark:text-red-100"
        >
          {error}
        </p>
      )}
    </div>
  );
}