# ADR-0015: OpenBao for secrets

Status: accepted · 2026-10-29

## Context

The broker needs dynamic database credentials, transit signing and SPIFFE-based login, under a licence the bank can run air-gapped.

## Decision

OpenBao (MPL-2.0) with JWT auth against SPIRE's OIDC discovery endpoint. No static tokens anywhere.

## Consequences

No vendor support contract by default; the bank's platform team runs it.

## Alternatives considered

Vault 2.x (BSL licence, and SPIFFE auth is Enterprise-only); cloud secret managers (no air-gap story).
