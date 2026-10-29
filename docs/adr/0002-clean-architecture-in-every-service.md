# ADR-0002: Clean Architecture rings in every service

Status: accepted · 2026-10-29

## Context

Frameworks, SDKs and models will change during a multi-year migration. The rules must not.

## Decision

Every service has domain, application, adapters and main. Imports point inward; dependency-cruiser fails the build otherwise. NestJS only in adapters and main.

## Consequences

A little ceremony on simple services. We collapse rings only where a service has no rules worth protecting, and say so in its README.

## Alternatives considered

Framework-first NestJS layout (controllers/services/repositories); hexagonal without explicit rings.
