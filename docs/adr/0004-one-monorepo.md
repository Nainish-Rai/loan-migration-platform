# ADR-0004: One monorepo: pnpm, Nx and uv

Status: accepted · 2026-10-29

## Context

Contracts, policies and fifteen services change together often. Cross-repo changes would be the common case.

## Decision

One repository. pnpm 12 workspaces with a strict catalog, a one-week minimum release age and an allow-list for install scripts; Nx 24 for the task graph, affected builds and project tags; uv for the Python workers. Nx's cache stays local, or on our own server that refuses overwrites: Nx deprecated its bucket caches after CVE-2025-36852.

## Consequences

One repo to secure and one CI to keep fast.

## Alternatives considered

Polyrepo per service (version drift on contracts); Turborepo 2.11 (good, but its boundary rules are still experimental).
