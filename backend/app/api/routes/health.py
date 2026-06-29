"""Health check route."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def health() -> dict:
    """Liveness probe.

    Returns a tiny JSON body that the frontend can poll to verify
    connectivity from the browser.
    """
    return {"status": "ok"}