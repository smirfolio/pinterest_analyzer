"""Image preprocessing with Pillow.

Resizes, re-encodes as JPEG, returns both raw optimized bytes and a
base64 string for use with the OpenAI multimodal SDK.
"""

from __future__ import annotations

import base64
import io
from typing import Tuple

from PIL import Image


def preprocess_image(
    raw_bytes: bytes,
    max_side: int = 1024,
    quality: int = 85,
) -> Tuple[bytes, int, int]:
    """Resize & re-encode an image.

    - Longest side becomes ``max_side`` (aspect preserved).
    - RGBA → RGB with white background.
    - Returns ``(optimized_jpeg_bytes, width, height)``.
    """
    with Image.open(io.BytesIO(raw_bytes)) as img:
        # Convert palette + alpha → RGB so we can re-encode as JPEG.
        if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
            background = Image.new("RGB", img.size, (255, 255, 255))
            img_rgba = img.convert("RGBA")
            background.paste(img_rgba, mask=img_rgba.split()[-1])
            img = background
        else:
            img = img.convert("RGB")

        img.thumbnail((max_side, max_side), Image.Resampling.LANCZOS)
        width, height = img.size

        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=quality, optimize=True)
        return buf.getvalue(), width, height


def to_base64(jpeg_bytes: bytes) -> str:
    return base64.b64encode(jpeg_bytes).decode("ascii")