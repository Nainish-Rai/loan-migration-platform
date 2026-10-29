# Image for intake. Built from the repo root: docker build -f services/intake/Dockerfile .
#
# Stage 1, build: node:24-bookworm-slim from Harbor (glibc, because Temporal's native core has no musl
#   build). `pnpm fetch` from the npm mirror, `pnpm install --offline --frozen-lockfile`,
#   `pnpm nx build @lmp/intake`, then `pnpm deploy --filter @lmp/intake --prod /out` for a pruned tree.
# Stage 2, run: a distroless Node.js 24 image mirrored in Harbor. Non-root (uid 10001), read-only root
#   filesystem, no shell and no package manager. Only /out is copied in.
#
# CI writes an SBOM with Syft and signs the image and the SBOM with cosign before it reaches Harbor.
