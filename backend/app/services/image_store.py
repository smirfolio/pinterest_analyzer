"""In-memory image store.

Per POC scope the backend keeps uploaded bytes in process memory, keyed by
UUID. This is intentionally simple — see project context, "Persistence is
explicitly out of scope for this skeleton."
"""

from __future__ import annotations

import threading
from dataclasses import dataclass, field
from typing import Dict


@dataclass
class StoredImage:
    raw_bytes: bytes
    filename: str
    content_type: str
    size: int
    optimized_bytes: bytes | None = None
    width: int | None = None
    height: int | None = None


class ImageStore:
    """Thread-safe in-memory image store."""

    def __init__(self) -> None:
        self._images: Dict[str, StoredImage] = {}
        self._lock = threading.Lock()

    def put(self, image_id: str, image: StoredImage) -> None:
        with self._lock:
            self._images[image_id] = image

    def get(self, image_id: str) -> StoredImage | None:
        with self._lock:
            return self._images.get(image_id)

    def has(self, image_id: str) -> bool:
        with self._lock:
            return image_id in self._images

    def delete(self, image_id: str) -> None:
        with self._lock:
            self._images.pop(image_id, None)

    def clear(self) -> None:
        with self._lock:
            self._images.clear()


IMAGE_STORE = ImageStore()