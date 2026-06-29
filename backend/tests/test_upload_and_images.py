"""Tests for US-004 / US-005 / US-006 / US-007.

- Upload endpoint stores images in memory and returns descriptors.
- Validator rejects empty / too-large / wrong-type files.
- Image serving returns bytes with correct content type.
- Pillow preprocessing reduces a large image.
"""

from io import BytesIO

import pytest
from fastapi import HTTPException, UploadFile

from app.services.image_processor import preprocess_image
from app.services.image_store import IMAGE_STORE
from app.services.image_validator import validate_upload
from tests._helpers import make_jpeg, make_png, make_webp


@pytest.fixture(autouse=True)
def _clear_store():
    IMAGE_STORE.clear()
    yield
    IMAGE_STORE.clear()


def test_upload_returns_descriptors(client):
    files = [
        ("files", ("a.jpg", BytesIO(make_jpeg()), "image/jpeg")),
        ("files", ("b.png", BytesIO(make_png()), "image/png")),
    ]
    r = client.post("/api/upload", files=files)
    assert r.status_code == 201
    body = r.json()
    assert len(body["images"]) == 2
    assert all("id" in img and img["size"] > 0 for img in body["images"])


def test_upload_no_files_returns_422(client):
    r = client.post("/api/upload", files=[])
    assert r.status_code == 422


def test_upload_unsupported_type_rejected(client):
    files = [
        ("files", ("doc.pdf", BytesIO(b"%PDF-1.4"), "application/pdf")),
    ]
    r = client.post("/api/upload", files=files)
    # batch failed → 400 with errors
    assert r.status_code == 400
    assert "errors" in r.json()["detail"]


def test_upload_empty_file_rejected(client):
    files = [
        ("files", ("empty.jpg", BytesIO(b""), "image/jpeg")),
    ]
    r = client.post("/api/upload", files=files)
    assert r.status_code == 400


def test_validate_helper_rejects_bad_mime():
    class _FakeUpload:
        filename = "x.gif"
        content_type = "image/gif"
        file = BytesIO(b"GIF89a")

    with pytest.raises(HTTPException) as exc:
        validate_upload(_FakeUpload())  # type: ignore[arg-type]
    assert exc.value.status_code == 415


def test_preprocess_resizes_large_image():
    big = make_jpeg(width=4000, height=3000)
    out, w, h = preprocess_image(big)
    assert w <= 1024 and h <= 1024
    assert len(out) < len(big)


def test_get_image_returns_bytes(client):
    files = [("files", ("x.jpg", BytesIO(make_jpeg()), "image/jpeg"))]
    r = client.post("/api/upload", files=files)
    image_id = r.json()["images"][0]["id"]

    r = client.get(f"/api/images/{image_id}")
    assert r.status_code == 200
    assert r.headers["content-type"].startswith("image/")
    assert r.headers.get("cache-control") == "private, max-age=300"


def test_get_image_unknown_id_returns_404(client):
    r = client.get("/api/images/does-not-exist")
    assert r.status_code == 404


def test_preprocess_handles_png_transparency():
    out, w, h = preprocess_image(make_png())
    # PNG with alpha → JPEG (white background); must succeed
    assert out[:3] == b"\xff\xd8\xff"  # JPEG magic bytes
    assert w > 0 and h > 0