"""Security helpers — JWT validation skeleton (US-026)."""

from __future__ import annotations

from typing import Optional

import jwt
from fastapi import Header, HTTPException, status

from app.config import settings


def _decode(token: str) -> dict:
    return jwt.decode(token, settings.NEXTAUTH_SECRET, algorithms=["HS256"])


def get_current_user(authorization: str = Header(...)) -> dict:
    """FastAPI dependency that requires a valid Bearer token.

    Raises 401 when missing/invalid; returns the decoded payload.
    """
    if not authorization.lower().startswith("bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header must use the Bearer scheme",
        )
    token = authorization.split(" ", 1)[1].strip()
    try:
        return _decode(token)
    except jwt.PyJWTError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid token: {exc}",
        )


def get_optional_user(
    authorization: Optional[str] = Header(default=None),
) -> Optional[dict]:
    """Variant that returns ``None`` instead of raising 401.

    Used on routes where auth is encouraged but not required (POC skeleton).
    """
    if not authorization:
        return None
    if not authorization.lower().startswith("bearer "):
        return None
    token = authorization.split(" ", 1)[1].strip()
    try:
        return _decode(token)
    except jwt.PyJWTError:
        return None