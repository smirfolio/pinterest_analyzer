"""Image validation rules — types, sizes, empty files."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Final

from fastapi import HTTPException, UploadFile, status

from app.config import settings

ALLOWED_MIME_TYPES: Final = {"image/jpeg", "image/png", "image/webp"}


@dataclass
class ValidatedFile:
    filename: str
    content_type: str
    raw_bytes: bytes


def _max_bytes() -> int:
    return settings.MAX_UPLOAD_MB * 1024 * 1024


def validate_upload(file: UploadFile) -> ValidatedFile:
    """Validate a single uploaded file against backend rules.

    Raises ``HTTPException`` with appropriate status codes:
    - 400 for empty files
    - 413 for too-large files
    - 415 for unsupported MIME types
    """
    content_type = (file.content_type or "").lower()
    if content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=(
                f"Unsupported content type '{content_type}'. "
                f"Allowed: {sorted(ALLOWED_MIME_TYPES)}"
            ),
        )

    raw = file.file.read()
    if not raw:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Empty file: {file.filename}",
        )

    if len(raw) > _max_bytes():
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=(
                f"File '{file.filename}' exceeds the {_max_bytes() // (1024*1024)} MB limit"
            ),
        )

    return ValidatedFile(
        filename=file.filename or "upload",
        content_type=content_type,
        raw_bytes=raw,
    )