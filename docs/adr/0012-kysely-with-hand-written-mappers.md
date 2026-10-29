# ADR-0012: Kysely, with hand-written mappers

Status: accepted · 2026-10-29

## Context

Persistence types must not leak into the domain, and the ledger's SQL (row locks, synchronous commit) must be exactly the SQL we write.

## Decision

Kysely as a typed query builder on pg, hand-written mappers between rows and domain objects, and plain SQL migrations with node-pg-migrate.

## Consequences

Mappers to write and test, and no schema-first code generation.

## Alternatives considered

Drizzle (1.0 is still a release candidate); Prisma 7 (its own client, and generated types that tempt a leak into the domain); TypeORM (decorated entities become the domain); raw pg (no types).
