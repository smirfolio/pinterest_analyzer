"""Application configuration loaded from environment / .env."""

from __future__ import annotations

from functools import lru_cache
from typing import List

from dotenv import load_dotenv
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

load_dotenv()


# ---------------------------------------------------------------------------
# Hardcoded processing limits
# ---------------------------------------------------------------------------
# The AI provider we target (Cerebras) caps multimodal chat-completions
# requests at 5 images. To stay under that ceiling transparently we:
#   1. Cap the user's reference image upload at MAX_REFERENCE_IMAGES,
#   2. Split those references into chunks of LLM_BATCH_SIZE,
#   3. Promote the top TOP_WINNERS_PER_BATCH per chunk to the final
#      theme round (winners + the user's product image stays ≤ 5).
# All three numbers are intentionally hardcoded — there is no env knob.
# ---------------------------------------------------------------------------
MAX_REFERENCE_IMAGES: int = 10
LLM_BATCH_SIZE: int = 5
TOP_WINNERS_PER_BATCH: int = 2


class Settings(BaseSettings):
    """Strongly-typed application settings.

    Values are loaded first from process env, then from `.env`.
    `ALLOWED_ORIGINS` is read as a comma-separated string and exposed as a
    list via the `allowed_origins` property to keep the env file simple.
    """

    OPENAI_API_KEY: str = Field(default="sk-placeholder")
    AI_PROVIDER_URL: str | None = Field(default=None)
    NEXTAUTH_SECRET: str = Field(default="dev-nextauth-secret-change-me")
    ALLOWED_ORIGINS: str = Field(default="http://localhost:3000")
    MAX_UPLOAD_MB: int = Field(default=10, description="Max size per file in MB.")
    DATABASE_URL: str = Field(
        default="postgresql://projectai:S3cretPrj@127.0.0.1/pinterest_analyzer"
    )
    OPENAI_MODEL: str = Field(default="gpt-4o-mini")
    APP_TITLE: str = Field(default="Creatives Design Analyser API")
    APP_VERSION: str = Field(default="0.1.0")

    @property
    def allowed_origins(self) -> List[str]:
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",") if o.strip()]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    """Cached settings accessor (singleton)."""
    return Settings()


settings = get_settings()