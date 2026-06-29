"""Upload / image response schemas."""

from __future__ import annotations

from typing import List

from pydantic import BaseModel, Field


class ImageDescriptor(BaseModel):
    """Lightweight handle to an image stored in the in-memory IMAGE_STORE."""

    id: str = Field(..., description="UUID used to fetch the bytes later")
    filename: str
    size: int = Field(..., ge=0, description="Raw uploaded size in bytes")
    content_type: str


class UploadResponse(BaseModel):
    images: List[ImageDescriptor]


class UploadError(BaseModel):
    filename: str
    detail: str