# ADR-0010: Agents write specs; a compiler writes Spark

Status: accepted · 2026-10-29

## Context

Reviewers can read 300 lines of spec, not 30,000 lines of generated code.

## Decision

The mapper agent proposes a declarative spec. mapping compiles it to a logical plan and emits PySpark, the same way every time.

## Consequences

A spec format and a compiler to build before the first run.

## Alternatives considered

Agents writing migration scripts directly (unreviewable, different every run).
