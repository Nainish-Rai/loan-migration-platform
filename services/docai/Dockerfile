# Image for docai. Built from the repo root: docker build -f services/docai/Dockerfile .
#
# Stage 1, build: `uv sync --frozen --package lmp-docai --no-dev` from the PyPI mirror into /app/.venv.
# Stage 2, run: a CUDA runtime base for the GPU node pool; Docling's layout models come from the internal model store. Non-root (uid 10001), read-only root filesystem, /tmp as a size-limited volume.
#
# CI writes an SBOM with Syft and signs the image and the SBOM with cosign before it reaches Harbor.
