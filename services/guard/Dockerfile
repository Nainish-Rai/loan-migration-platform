# Image for guard. Built from the repo root: docker build -f services/guard/Dockerfile .
#
# Stage 1, build: `uv sync --frozen --package lmp-guard --no-dev` from the PyPI mirror into /app/.venv.
# Stage 2, run: python:3.13-slim-bookworm; the Prompt Guard 2 weights come from the internal model store, never from Hugging Face at runtime. Non-root (uid 10001), read-only root filesystem, /tmp as a size-limited volume.
#
# CI writes an SBOM with Syft and signs the image and the SBOM with cosign before it reaches Harbor.
