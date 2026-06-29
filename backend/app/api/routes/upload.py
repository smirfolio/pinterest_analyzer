"""Upload route — accepts multiple image files."""

from __future__ import annotations

import uuid

from fastapi import APIRouter, File, HTTPException, UploadFile, status

from app.config import MAX_REFERENCE_IMAGES
from app.schemas.upload import ImageDescriptor, UploadError, UploadResponse
from app.services.image_processor import preprocess_image
from app.services.image_store import IMAGE_STORE, StoredImage
from app.services.image_validator import validate_upload

router = APIRouter()


@router.post(
    "/upload",
    response_model=UploadResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Upload one or more images",
)
async def upload_images(
    files: list[UploadFile] = File(..., description="Image files to analyze"),
) -> UploadResponse:
    """Accept a multipart upload, validate each file and persist it to the
    in-memory store. Returns descriptors that can later be used to trigger
    analysis.
    """
    if not files:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="At least one file must be provided",
        )
    if len(files) > MAX_REFERENCE_IMAGES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=(
                f"Too many files in batch ({len(files)}). "
                f"App limit is {MAX_REFERENCE_IMAGES} images per request."
            ),
        )

    accepted: list[ImageDescriptor] = []
    errors: list[UploadError] = []

    for f in files:
        try:
            validated = validate_upload(f)
            optimized, width, height = preprocess_image(validated.raw_bytes)
            image_id = str(uuid.uuid4())
            IMAGE_STORE.put(
                image_id,
                StoredImage(
                    raw_bytes=validated.raw_bytes,
                    filename=validated.filename,
                    content_type=validated.content_type,
                    size=len(validated.raw_bytes),
                    optimized_bytes=optimized,
                    width=width,
                    height=height,
                ),
            )
            accepted.append(
                ImageDescriptor(
                    id=image_id,
                    filename=validated.filename,
                    size=len(validated.raw_bytes),
                    content_type=validated.content_type,
                )
            )
        except HTTPException as exc:
            errors.append(
                UploadError(filename=f.filename or "<unknown>", detail=str(exc.detail))
            )

    if not accepted:
        # Whole batch failed.
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"message": "All uploads failed", "errors": [e.model_dump() for e in errors]},
        )

    return UploadResponse(images=accepted)