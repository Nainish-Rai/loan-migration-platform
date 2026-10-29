# ADR-0003: NestJS 12 on Node.js 24 LTS

Status: accepted · 2026-10-29

## Context

The owner's constraint was NestJS or Elysia. The services are gRPC-, Kafka- and Temporal-heavy and run in a regulated, possibly air-gapped bank.

## Decision

NestJS 12 on Node.js 24 LTS with the Fastify adapter for every TypeScript service, except the agents worker, which is a plain Temporal worker. Use cases are plain classes; NestJS stays in adapters and main.

## Consequences

Decorators and a DI container to keep out of the inner rings, and less raw throughput than Elysia on Bun, which ~2 decisions a second never notices. Node 24 rather than 26, because Temporal's TypeScript SDK supports 20, 22 and 24.

## Alternatives considered

Elysia on Bun: fast, light, end-to-end types. Rejected for now: Elysia 1.4 takes security fixes only and 2.0 is a release candidate; Bun has no FIPS mode; Temporal discourages workers outside Node.js; Confluent's Kafka client doesn't support Bun. Revisit when Elysia 2 is stable and Bun has a FIPS story.
