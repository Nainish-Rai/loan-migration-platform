# ADR-0007: Cedar, default deny, signed bundles

Status: accepted · 2026-10-29

## Context

The bank must be able to read, change and export the rules agents run under.

## Decision

Policies are Cedar files in policies/, validated against one schema, tested per rule, signed in CI and loaded by the gate. Anything not permitted is denied.

## Consequences

A policy language for the bank to learn.

## Alternatives considered

OPA/Rego (more general, harder for non-engineers to read); rules in code (not reviewable by compliance).
