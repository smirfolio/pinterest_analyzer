"use client";

import { getImageUrl } from "@/lib/api";
import type { ImageDescriptor } from "@/types/api";

type Props = {
  images: ImageDescriptor[];
  onRemove: (id: string) => void;
};

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function ImageGallery({ images, onRemove }: Props) {
  if (images.length === 0) {
    return (
      <div className="card flex flex-col items-center justify-center p-10 text-center text-sm text-slate-500 dark:text-slate-400">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        <p className="mt-3">No images uploaded yet.</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {images.map((img) => (
        <li
          key={img.id}
          className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getImageUrl(img.id)}
              alt={img.filename}
              loading="lazy"
              className="h-full w-full object-cover transition group-hover:scale-105"
            />
          </div>
          <div className="p-3">
            <p className="truncate text-sm font-medium" title={img.filename}>
              {img.filename}
            </p>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {formatSize(img.size)}
            </p>
          </div>
          <button
            type="button"
            aria-label={`Remove ${img.filename}`}
            onClick={() => onRemove(img.id)}
            className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-slate-900/70 text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-600"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
}