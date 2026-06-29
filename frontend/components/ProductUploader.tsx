"use client";

import { useCallback, useRef, useState } from "react";
import clsx from "clsx";
import { MAX_UPLOAD_MB, getImageUrl, uploadImages } from "@/lib/api";
import type { ImageDescriptor } from "@/types/api";

type Props = {
  product: ImageDescriptor | null;
  onUpload: (descriptor: ImageDescriptor) => void;
  onClear: () => void;
  disabled?: boolean;
};

const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp"];

/**
 * Compact uploader for the user's own product. The product image is sent
 * alongside the analyzed batch so the LLM can pick the most relevant
 * inspiration index.
 */
export function ProductUploader({ product, onUpload, onClear, disabled }: Props) {
  const [isOver, setIsOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = useCallback(
    async (file: File | undefined) => {
      if (!file) return;
      setError(null);

      if (!ALLOWED_MIME.includes(file.type)) {
        setError(`Unsupported type "${file.type || "unknown"}"`);
        return;
      }
      if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
        setError(`Exceeds ${MAX_UPLOAD_MB} MB`);
        return;
      }
      if (file.size === 0) {
        setError("Empty file");
        return;
      }

      setUploading(true);
      try {
        const uploaded = await uploadImages([file]);
        if (uploaded.length > 0) onUpload(uploaded[0]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [onUpload],
  );

  if (product) {
    return (
      <div className="flex items-center gap-4 rounded-xl border border-primary-200 bg-primary-50/50 p-3 dark:border-primary-800 dark:bg-primary-900/20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getImageUrl(product.id)}
          alt={product.filename}
          className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
            Product loaded
          </p>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">
            {product.filename}
          </p>
        </div>
        <button
          type="button"
          onClick={onClear}
          disabled={disabled}
          className="rounded-full p-1.5 text-slate-400 transition hover:bg-white hover:text-red-600 disabled:opacity-50 dark:hover:bg-slate-800"
          aria-label="Remove product"
          title="Remove product"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-disabled={disabled || uploading}
        aria-label="Upload your product image"
        onClick={() => !disabled && !uploading && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (disabled || uploading) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          if (disabled || uploading) return;
          e.preventDefault();
          setIsOver(true);
        }}
        onDragLeave={() => setIsOver(false)}
        onDrop={(e) => {
          if (disabled || uploading) return;
          e.preventDefault();
          setIsOver(false);
          void handleFile(e.dataTransfer.files?.[0]);
        }}
        className={clsx(
          "flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed p-4 text-center transition",
          isOver
            ? "border-primary-500 bg-primary-50/50 dark:bg-primary-900/20"
            : "border-slate-300 bg-white hover:border-primary-400 dark:border-slate-700 dark:bg-slate-900",
          (disabled || uploading) && "pointer-events-none opacity-50",
        )}
      >
        <div className="grid h-9 w-9 place-items-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-200">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
        <div className="text-left">
          <p className="text-sm font-medium">
            {uploading ? "Uploading…" : "Drop or browse your product"}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            We&apos;ll match it to the most relevant inspiration
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ALLOWED_MIME.join(",")}
          className="hidden"
          onChange={(e) => void handleFile(e.target.files?.[0])}
          disabled={disabled || uploading}
        />
      </div>
      {error && (
        <p
          role="alert"
          className="mt-2 rounded-lg border border-red-300 bg-red-50 p-2 text-xs text-red-800 dark:border-red-800 dark:bg-red-900/40 dark:text-red-100"
        >
          {error}
        </p>
      )}
    </div>
  );
}