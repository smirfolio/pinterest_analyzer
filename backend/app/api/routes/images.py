"""Static file serving — return optimized JPEG bytes for a given image id."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, Response, status

from app.services.image_store import IMAGE_STORE

router = APIRouter()


@router.get(
    "/images/{image_id}",
    responses={200: {"content": {"image/jpeg": {}}}, 404: {"description": "Not found"}},
    summary="Fetch the optimized JPEG bytes for a stored image",
)
async def get_image(image_id: str) -> Response:
    stored = IMAGE_STORE.get(image_id)
    if stored is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Image {image_id} not found",
        )

    payload = stored.optimized_bytes or stored.raw_bytes
    content_type = (
        "image/jpeg"
        if (stored.optimized_bytes is not None or stored.content_type == "image/jpeg")
        else stored.content_type
    )
    return Response(
        content=payload,
        media_type=content_type,
        headers={"Cache-Control": "private, max-age=300"},
    )