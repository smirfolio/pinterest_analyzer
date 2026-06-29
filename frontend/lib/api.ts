"use client";

import type {
  AnalyzeRequest,
  AnalyzeResponse,
  ApiErrorPayload,
  ImageDescriptor,
} from "@/types/api";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

/**
 * Hardcoded app cap on reference images per analysis — mirrors backend
 * `MAX_REFERENCE_IMAGES` in `app/config.py`. Batching (≤5/LLM call) and
 * the theme round (4 winners + 1 product = 5) are handled server-side.
 */
export const MAX_UPLOAD_FILES = 10;

/** Max size per uploaded file in MB — mirrors backend `MAX_UPLOAD_MB`. */
export const MAX_UPLOAD_MB = (() => {
  const raw = process.env.NEXT_PUBLIC_MAX_UPLOAD_MB;
  const parsed = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 10;
})();

export function getImageUrl(id: string): string {
  return `${API_BASE_URL}/api/images/${id}`;
}

export class ApiError extends Error {
  status: number;
  payload?: ApiErrorPayload;

  constructor(message: string, status: number, payload?: ApiErrorPayload) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

function describeError(status: number, payload?: ApiErrorPayload): string {
  const detail = payload?.detail;
  if (typeof detail === "string") return detail;
  if (detail && typeof detail === "object") {
    return detail.message ?? JSON.stringify(detail);
  }
  return `Request failed (HTTP ${status})`;
}

let _cachedToken: string | null = null;
let _tokenPromise: Promise<string | null> | null = null;

async function fetchToken(): Promise<string | null> {
  try {
    const res = await fetch("/api/me/token", { credentials: "include" });
    if (!res.ok) return null;
    const data = (await res.json()) as { token: string | null };
    return data.token ?? null;
  } catch {
    return null;
  }
}

async function authHeader(): Promise<Record<string, string>> {
  if (_cachedToken) return { Authorization: `Bearer ${_cachedToken}` };
  if (!_tokenPromise) {
    _tokenPromise = fetchToken().then((t) => {
      _cachedToken = t;
      _tokenPromise = null;
      return t;
    });
  }
  await _tokenPromise;
  if (_cachedToken) return { Authorization: `Bearer ${_cachedToken}` };
  return {};
}

export function clearCachedToken() {
  _cachedToken = null;
  _tokenPromise = null;
}

export async function uploadImages(files: File[]): Promise<ImageDescriptor[]> {
  if (files.length === 0) return [];
  const form = new FormData();
  for (const f of files) form.append("files", f, f.name);

  const res = await fetch(`${API_BASE_URL}/api/upload`, {
    method: "POST",
    body: form,
    credentials: "include",
  });
  if (!res.ok) {
    let payload: ApiErrorPayload | undefined;
    try {
      payload = (await res.json()) as ApiErrorPayload;
    } catch {
      /* ignore */
    }
    throw new ApiError(describeError(res.status, payload), res.status, payload);
  }
  const data = (await res.json()) as { images: ImageDescriptor[] };
  return data.images;
}

export async function analyzeImages(req: AnalyzeRequest): Promise<AnalyzeResponse> {
  const headers = {
    "Content-Type": "application/json",
    ...(await authHeader()),
  };
  const res = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: "POST",
    headers,
    body: JSON.stringify(req),
    credentials: "include",
  });
  if (!res.ok) {
    let payload: ApiErrorPayload | undefined;
    try {
      payload = (await res.json()) as ApiErrorPayload;
    } catch {
      /* ignore */
    }
    throw new ApiError(describeError(res.status, payload), res.status, payload);
  }
  return (await res.json()) as AnalyzeResponse;
}

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`, { credentials: "include" });
    return res.ok;
  } catch {
    return false;
  }
}