# ADR-0006: Temporal for runs

Status: accepted · 2026-10-29

## Context

A run lasts days, waits for people and must survive restarts.

## Decision

Each run is one Temporal workflow in runs. Every other service exposes activities on its own task queue.

## Consequences

A cluster to run and upgrade.

## Alternatives considered

BullMQ or a home-made job table (no durable waits on people); Step Functions (not available air-gapped); Airflow (batch, not interactive).
