/**
 * TypeScript mirrors of the FastAPI Pydantic schemas.
 * Keep in sync manually for the POC.
 */

export type CriterionKey =
  | "attractiveness"
  | "color_balance"
  | "selling_idea"
  | "trending_viral_concept"
  | "marketing_message"
  | "product_presentation"
  | "value_message";

export type CriterionScores = Record<CriterionKey, number>;

export type ProductCategory =
  | "cosmetics"
  | "health_product"
  | "3d_printing"
  | "fashion"
  | "food_beverage"
  | "tech"
  | "home_decor"
  | "fitness"
  | "other";

export interface InspiredProduct {
  category: ProductCategory;
  name: string;
  rationale: string;
  relevance_score: number;
}

export interface ImageAnalysis {
  image_index: number;
  scores: CriterionScores;
  summary: string;
  strongest_criterion: CriterionKey;
  weakest_criterion: CriterionKey;
  recommendation: string;
  confidence: number;

  // --- Inspiring add-ons ---
  color_palette: string[];
  color_trend: string;
  inspired_products: InspiredProduct[];
  background_scene_prompt: string;
}

export interface BatchAnalysis {
  batch_index: number;
  results: ImageAnalysis[];
  /** Local indices (inside this batch) of the top winners. */
  winner_indices: number[];
}

export interface ThemeAnalysis {
  cohesive_theme: string;
  product_description: string;
  /** Local index of the best-fit winner inside the shortlist sent to the LLM. */
  best_match_local_index: number;
  match_reason: string;
}

export interface ProductMatch {
  best_inspiration_index: number;
  product_description: string;
  match_reason: string;
}

export interface AnalysisResult {
  /** ALL reference-image analyses, in the original order (batching is transparent). */
  results: ImageAnalysis[];
  winner_index: number;
  overall_summary: string;
  /** Per-batch breakdown so the UI can label winners. */
  batches: BatchAnalysis[];
  /** Populated only when a product was uploaded AND ≥2 winners were promoted. */
  theme_analysis?: ThemeAnalysis | null;
  /** Legacy single-shot match (mirrors theme_analysis when no batching). */
  product_match?: ProductMatch | null;
}

export interface ImageDescriptor {
  id: string;
  filename: string;
  size: number;
  content_type: string;
}

export interface UploadResponse {
  images: ImageDescriptor[];
}

export interface AnalyzeRequest {
  image_ids: string[];
  product_image_id?: string | null;
  prompt?: string | null;
  use_default_prompt?: boolean;
}

export interface AnalyzeResponse {
  analysis: AnalysisResult;
  image_urls: string[];
  product_image_url?: string | null;
  prompt_used: string;
  custom_prompt: boolean;
}

export interface ApiErrorPayload {
  detail?: string | { message?: string; errors?: Array<{ filename: string; detail: string }> };
}

export const CRITERION_LABELS: Record<CriterionKey, string> = {
  attractiveness: "Attractiveness",
  color_balance: "Color Balance",
  selling_idea: "Selling Idea",
  trending_viral_concept: "Trending / Viral Concept",
  marketing_message: "Marketing Message",
  product_presentation: "Product Presentation",
  value_message: "Value Message",
};

export const CRITERION_KEYS: CriterionKey[] = [
  "attractiveness",
  "color_balance",
  "selling_idea",
  "trending_viral_concept",
  "marketing_message",
  "product_presentation",
  "value_message",
];

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  cosmetics: "Cosmetics",
  health_product: "Health Product",
  "3d_printing": "3D Printing",
  fashion: "Fashion",
  food_beverage: "Food & Beverage",
  tech: "Tech",
  home_decor: "Home Decor",
  fitness: "Fitness",
  other: "Other",
};