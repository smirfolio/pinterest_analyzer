"""Routes package — health, upload, analyze, images."""

from fastapi import APIRouter

from app.api.routes import analyze, health, images, upload

api_router = APIRouter()
api_router.include_router(health.router, tags=["Health"])
api_router.include_router(upload.router, tags=["Upload"])
api_router.include_router(images.router, tags=["Images"])
api_router.include_router(analyze.router, tags=["Analyze"])