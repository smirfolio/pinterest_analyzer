"""Pydantic schemas for the analyze endpoint and structured LLM output."""

from __future__ import annotations

from typing import List, Literal, Optional

from pydantic import BaseModel, Field

CRITERION_KEYS = (
    "attractiveness",
    "color_balance",
    "selling_idea",
    "trending_viral_concept",
    "marketing_message",
    "product_presentation",
    "value_message",
)

ProductCategory = Literal[
    "cosmetics",
    "health_product",
    "3d_printing",
    "fashion",
    "food_beverage",
    "tech",
    "home_decor",
    "fitness",
    "other",
]


class CriterionScores(BaseModel):
    attractiveness: int = Field(ge=0, le=10)
    color_balance: int = Field(ge=0, le=10)
    selling_idea: int = Field(ge=0, le=10)
    trending_viral_concept: int = Field(ge=0, le=10)
    marketing_message: int = Field(ge=0, le=10)
    product_presentation: int = Field(ge=0, le=10)
    value_message: int = Field(ge=0, le=10)


class InspiredProduct(BaseModel):
    """A concrete product idea inspired by an image's aesthetic."""

    category: ProductCategory
    name: str = Field(..., min_length=1, max_length=80)
    rationale: str = Field(..., min_length=1, max_length=400)
    relevance_score: int = Field(ge=0, le=100)


class ImageAnalysis(BaseModel):
    image_index: int = Field(ge=0)
    scores: CriterionScores
    summary: str
    strongest_criterion: str
    weakest_criterion: str
    recommendation: str
    confidence: int = Field(ge=0, le=100)

    # --- Inspiring add-ons ---
    color_palette: List[str] = Field(
        default_factory=list,
        description="3-5 dominant colors as hex codes, e.g. ['#E8C5B5', '#5D4037'].",
    )
    color_trend: str = Field(
        default="",
        description="1-2 sentence analysis of the color/aesthetic trend this image taps into.",
    )
    inspired_products: List[InspiredProduct] = Field(
        default_factory=list,
        description="3 creative product ideas (cosmetics, health, 3D printing, ...) inspired by the image.",
    )
    background_scene_prompt: str = Field(
        default="",
        description="A copy-pasteable prompt for an AI image generator describing a background scene that complements a product.",
    )


class BatchAnalysis(BaseModel):
    """One slice of the user-supplied references analysed in a single LLM call.

    `winner_indices` are LOCAL indices inside this batch (0..len(results)-1).
    Frontend maps them to global indices by adding ``batch_index * batch_size``.
    """

    batch_index: int = Field(ge=0)
    results: List[ImageAnalysis]
    winner_indices: List[int] = Field(
        default_factory=list,
        description="Local indices of the top winners advanced to the theme round.",
    )


class ThemeAnalysis(BaseModel):
    """Cross-winner analysis produced AFTER the per-batch scoring rounds.

    The LLM is given the top winners from each batch plus the user's product
    image and must identify the cohesive theme they share and how that
    theme maps to the product.
    """

    cohesive_theme: str = Field(
        ...,
        description="1-2 sentences: the aesthetic / color / narrative thread that ties the winners together.",
    )
    product_description: str = Field(
        ...,
        description="1 sentence describing what the product looks like.",
    )
    best_match_local_index: int = Field(
        ...,
        ge=0,
        description="Local index (0..N-1) of the winner that best fits the product, inside the winner set sent to the LLM.",
    )
    match_reason: str = Field(
        ...,
        description="1-2 sentences explaining the match in terms of theme + product.",
    )


class ProductMatch(BaseModel):
    """Simplified single-image product match — kept for backward compatibility
    when only one inspiration is involved (no batching)."""

    best_inspiration_index: int = Field(ge=0)
    product_description: str
    match_reason: str


class AnalysisResult(BaseModel):
    """Final response payload.

    `results` always contains ALL reference-image analyses (one per uploaded
    reference) in the original order — batching is transparent to the caller.
    """

    results: List[ImageAnalysis]
    winner_index: int = Field(ge=0)
    overall_summary: str
    batches: List[BatchAnalysis] = Field(
        default_factory=list,
        description="How references were sliced into LLM calls (1+ entries).",
    )
    theme_analysis: Optional[ThemeAnalysis] = Field(
        default=None,
        description="Populated when a product image was provided AND >=2 winners were promoted.",
    )
    product_match: Optional[ProductMatch] = Field(
        default=None,
        description="Simplified single-shot match for the legacy / no-batching flow.",
    )


class AnalyzeRequest(BaseModel):
    image_ids: List[str] = Field(..., min_length=1)
    product_image_id: Optional[str] = Field(
        default=None,
        description="Optional product image. When set, a theme analysis is produced.",
    )
    prompt: Optional[str] = Field(
        default=None,
        description="Custom prompt; ignored when use_default_prompt is True.",
    )
    use_default_prompt: bool = Field(default=True)


class AnalyzeResponse(BaseModel):
    analysis: AnalysisResult
    image_urls: List[str] = Field(
        default_factory=list,
        description="Pre-built preview URLs of the form /api/images/{id}.",
    )
    product_image_url: Optional[str] = Field(
        default=None,
        description="Preview URL for the uploaded product, if any.",
    )
    prompt_used: str = Field(
        description="The prompt actually sent to the LLM (truncated for safety).",
    )
    custom_prompt: bool = False