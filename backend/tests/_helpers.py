"""Helper to build in-memory test image bytes (JPEG/PNG/WEBP)."""

from __future__ import annotations

import io

from PIL import Image


def make_jpeg(width: int = 200, height: int = 150, color=(255, 0, 0)) -> bytes:
    img = Image.new("RGB", (width, height), color)
    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=90)
    return buf.getvalue()


def make_png(width: int = 300, height: int = 200, color=(0, 255, 0, 128)) -> bytes:
    img = Image.new("RGBA", (width, height), color)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return buf.getvalue()


def make_webp(width: int = 100, height: int = 100, color=(0, 0, 255)) -> bytes:
    img = Image.new("RGB", (width, height), color)
    buf = io.BytesIO()
    img.save(buf, format="WEBP")
    return buf.getvalue()