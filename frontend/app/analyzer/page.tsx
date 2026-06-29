"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { UploadZone } from "@/components/UploadZone";
import { ImageGallery } from "@/components/ImageGallery";
import { PromptToggle } from "@/components/PromptToggle";
import { CustomPromptTextarea } from "@/components/CustomPromptTextarea";
import { AnalyzeButton } from "@/components/AnalyzeButton";
import { WinnerBanner } from "@/components/WinnerBanner";
import { ComparisonGrid } from "@/components/ComparisonGrid";
import { AnalysisCard } from "@/components/AnalysisCard";
import { ProductUploader } from "@/components/ProductUploader";
import { ThemeAnalysisCard } from "@/components/ThemeAnalysisCard";
import { BatchSummary } from "@/components/BatchSummary";
import { useToast } from "@/components/Toast";
import { analyzeImages, ApiError, getImageUrl, uploadImages } from "@/lib/api";
import type { AnalyzeResponse, ImageDescriptor } from "@/types/api";

const LLM_BATCH_SIZE = 5;

export default function AnalyzerPage() {
  return (
    <ProtectedRoute>
      <Analyzer />
    </ProtectedRoute>
  );
}

function Analyzer() {
  const toast = useToast();
  const [images, setImages] = useState<ImageDescriptor[]>([]);
  const [product, setProduct] = useState<ImageDescriptor | null>(null);
  const [useDefault, setUseDefault] = useState(true);
  const [customPrompt, setCustomPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);

  const imageIds = useMemo(() => images.map((i) => i.id), [images]);

  const handleFiles = useCallback(
    async (files: File[]) => {
      setResult(null);
      try {
        const uploaded = await uploadImages(files);
        setImages((prev) => [...prev, ...uploaded]);
        if (uploaded.length > 0) {
          toast.push({
            kind: "success",
            title: `${uploaded.length} image${uploaded.length === 1 ? "" : "s"} uploaded`,
          });
        }
      } catch (err) {
        const message = err instanceof ApiError ? err.message : "Upload failed";
        toast.push({ kind: "error", title: "Upload failed", message });
      }
    },
    [toast],
  );

  const handleRemove = useCallback((id: string) => {
    setImages((prev) => prev.filter((i) => i.id !== id));
    setResult(null);
  }, []);

  const handleProductUpload = useCallback(
    (descriptor: ImageDescriptor) => {
      setProduct(descriptor);
      setResult(null);
      toast.push({
        kind: "success",
        title: "Product uploaded",
        message: "We'll match it to the most relevant inspiration.",
      });
    },
    [toast],
  );

  const handleProductClear = useCallback(() => {
    setProduct(null);
    setResult(null);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (images.length === 0) return;
    if (!useDefault && customPrompt.trim().length === 0) {
      toast.push({
        kind: "error",
        title: "Custom prompt required",
        message: "Either enable the default prompt or write your own.",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await analyzeImages({
        image_ids: imageIds,
        product_image_id: product?.id ?? null,
        prompt: customPrompt,
        use_default_prompt: useDefault,
      });
      setResult(response);
      toast.push({ kind: "success", title: "Analysis complete" });
      requestAnimationFrame(() => {
        document
          .getElementById("analyzer-results")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        toast.push({
          kind: "error",
          title: "Session expired",
          message: "Please sign in again.",
        });
        return;
      }
      const message = err instanceof ApiError ? err.message : "Analysis failed";
      toast.push({
        kind: "error",
        title: "Analysis failed",
        message,
        action: { label: "Retry", onClick: () => handleAnalyze() },
      });
    } finally {
      setLoading(false);
    }
  }, [images.length, product?.id, useDefault, customPrompt, imageIds, toast]);

  useEffect(() => {
    setResult(null);
  }, [useDefault, customPrompt]);

  const canAnalyze =
    images.length > 0 && (useDefault || customPrompt.trim().length > 0) && !loading;

  // Compute winner + best-match metadata from the structured response.
  const batchSet = useMemo(() => {
    if (!result) return new Set<number>();
    const s = new Set<number>();
    for (const b of result.analysis.batches) {
      for (const local of b.winner_indices) {
        s.add(b.batch_index * LLM_BATCH_SIZE + local);
      }
    }
    return s;
  }, [result]);

  const bestMatchIdx = useMemo(() => {
    if (!result) return null;
    if (result.analysis.theme_analysis) {
      // Map theme_analysis.best_match_local_index (inside the shortlist)
      // back to a global image index.
      const winners: number[] = [];
      for (const b of result.analysis.batches) {
        for (const local of b.winner_indices) {
          winners.push(b.batch_index * LLM_BATCH_SIZE + local);
        }
      }
      const idx = winners[result.analysis.theme_analysis.best_match_local_index];
      return typeof idx === "number" ? idx : null;
    }
    if (result.analysis.product_match) {
      return result.analysis.product_match.best_inspiration_index;
    }
    return null;
  }, [result]);

  const themeBestImageId =
    bestMatchIdx !== null && bestMatchIdx !== undefined ? imageIds[bestMatchIdx] : undefined;

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Analyze your creatives
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Upload up to 10 marketing images, drop in your product, and let the AI score
          them across seven criteria — plus surface color trends, inspired product
          directions and a ready-to-use image-generation prompt for each winner.
        </p>
      </header>

      <section className="card p-5 sm:p-6">
        <h2 className="mb-4 text-base font-semibold">1 · Upload your reference images</h2>
        <UploadZone onFiles={handleFiles} disabled={loading} currentCount={images.length} />
        <div className="mt-6">
          <ImageGallery images={images} onRemove={handleRemove} />
        </div>
      </section>

      <section className="card p-5 sm:p-6">
        <h2 className="mb-1 text-base font-semibold">2 · Add your own product (optional)</h2>
        <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
          Drop in the product you actually sell — we&apos;ll point you to the reference
          image whose colors, mood and trend best fit it.
        </p>
        <ProductUploader
          product={product}
          onUpload={handleProductUpload}
          onClear={handleProductClear}
          disabled={loading}
        />
      </section>

      <section className="card p-5 sm:p-6">
        <h2 className="mb-4 text-base font-semibold">3 · Choose a prompt</h2>
        <div className="space-y-4">
          <PromptToggle useDefault={useDefault} onToggle={setUseDefault} disabled={loading} />
          {!useDefault && (
            <CustomPromptTextarea
              value={customPrompt}
              onChange={setCustomPrompt}
              disabled={loading}
            />
          )}
        </div>
      </section>

      <section className="flex flex-col items-center gap-3">
        <AnalyzeButton
          onClick={handleAnalyze}
          loading={loading}
          disabled={!canAnalyze}
          imageCount={images.length}
        />
        {!canAnalyze && images.length > 0 && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {!useDefault && customPrompt.trim().length === 0
              ? "Add a custom prompt or re-enable the default."
              : "Add at least one image to analyze."}
          </p>
        )}
      </section>

      {result && (
        <div id="analyzer-results" className="space-y-8">
          {result.analysis.batches.length > 1 && (
            <BatchSummary batches={result.analysis.batches} />
          )}

          <WinnerBanner
            analysis={result.analysis}
            imageUrl={getImageUrl(imageIds[result.analysis.winner_index])}
            filename={images.find((i) => i.id === imageIds[result.analysis.winner_index])?.filename}
          />

          {result.analysis.theme_analysis &&
            result.product_image_url &&
            themeBestImageId && (
              <ThemeAnalysisCard
                theme={result.analysis.theme_analysis}
                productImageUrl={result.product_image_url}
                bestMatchImageUrl={getImageUrl(themeBestImageId)}
                bestMatchFilename={
                  images.find((i) => i.id === themeBestImageId)?.filename
                }
                product={product}
              />
            )}

          {/* Legacy single-shot match (no batching) */}
          {!result.analysis.theme_analysis &&
            result.analysis.product_match &&
            result.product_image_url &&
            bestMatchIdx !== null && (
              <section className="card border-l-4 border-primary-500 p-5 sm:p-6">
                <h2 className="text-base font-semibold">
                  Best inspiration for your product
                </h2>
                <div className="mt-3 flex flex-col gap-4 sm:flex-row">
                  <div className="flex gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={result.product_image_url}
                      alt="Your product"
                      className="h-24 w-24 rounded-xl border border-slate-200 object-cover dark:border-slate-700"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getImageUrl(imageIds[bestMatchIdx])}
                      alt="Best matching inspiration"
                      className="h-24 w-24 rounded-xl border-2 border-primary-500 object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">
                      Product · {result.analysis.product_match.product_description}
                    </p>
                    <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                      {result.analysis.product_match.match_reason}
                    </p>
                  </div>
                </div>
              </section>
            )}

          <ComparisonGrid
            analysis={result.analysis}
            imageUrls={imageIds.map(getImageUrl)}
            filenames={imageIds.map(
              (id) => images.find((i) => i.id === id)?.filename ?? `Image ${imageIds.indexOf(id) + 1}`,
            )}
          />
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Per-image breakdown</h2>
            {result.analysis.results.map((r, i) => (
              <AnalysisCard
                key={r.image_index}
                analysis={r}
                imageUrl={getImageUrl(imageIds[i])}
                filename={images[i]?.filename}
                isBestMatch={bestMatchIdx === r.image_index}
                isBatchWinner={batchSet.has(r.image_index)}
              />
            ))}
          </section>
        </div>
      )}
    </div>
  );
}