# ADR-0009: Python where the models live

Status: accepted · 2026-10-29

## Context

Document AI, PII detection and prompt-injection classifiers are Python ecosystems.

## Decision

sanitizer, docai and guard are Python workers with the same four rings, enforced by import-linter. Spark jobs are PySpark.

## Consequences

Two toolchains in one repo.

## Alternatives considered

Wrapping Python libraries behind TypeScript services (an extra hop for no gain); rewriting them in TypeScript (no).
