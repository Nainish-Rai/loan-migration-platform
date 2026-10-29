# ADR-0005: Contracts: protobuf for calls, AsyncAPI for events

Status: accepted · 2026-10-29

## Context

Services must agree on wire formats without sharing domain code.

## Decision

Synchronous APIs are protobuf, linted and checked for breaking changes with Buf, served and called with Connect. Events are described in AsyncAPI and their schemas registered in Apicurio. Generated TypeScript lives in packages/contracts and Python in packages/contracts-py, imported only by adapters.

## Consequences

A code generation step in the build.

## Alternatives considered

OpenAPI everywhere (weak for streaming and internal RPC); shared TypeScript DTO packages (couples every service to every other).
