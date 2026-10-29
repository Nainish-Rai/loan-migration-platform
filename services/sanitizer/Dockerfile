# Image for sanitizer. Built from the repo root: docker build -f services/sanitizer/Dockerfile .
#
# Stage 1, build: `uv sync --frozen --package lmp-sanitizer --no-dev` from the PyPI mirror into /app/.venv.
# Stage 2, run: python:3.13-slim-bookworm plus Tesseract from the Debian mirror; spaCy's model for Presidio comes from the PyPI mirror. Non-root (uid 10001), read-only root filesystem, /tmp as a size-limited volume.
#
# CI writes an SBOM with Syft and signs the image and the SBOM with cosign before it reaches Harbor.
