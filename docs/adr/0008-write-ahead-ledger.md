# ADR-0008: Write the decision before the action

Status: accepted · 2026-10-29

## Context

An auditor must be able to prove no action happened without a recorded decision.

## Decision

The gate only returns allow with a ledger receipt. The ledger is append-only and hash-chained, with signed checkpoints anchored to Object Lock storage.

## Consequences

A synchronous write on every agent action and a fail-closed dependency.

## Alternatives considered

Asynchronous audit logging (an action can happen with no record); an external transparency log as the primary store (one more system on the critical path).
