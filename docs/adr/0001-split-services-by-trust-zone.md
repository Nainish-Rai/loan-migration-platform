# ADR-0001: Split services by trust zone

Status: accepted · 2026-10-29

## Context

Agents, raw PII and production writes need hard isolation. A process boundary plus its own credentials is the strongest boundary we can draw cheaply.

## Decision

Twelve bounded contexts become fifteen services in five zones (raw, masked, gate, control, production). The enforcement context runs as four processes (gate, ledger, broker, guard), because each holds a different key. Every service has its own database, SPIFFE identity and network policy. The model gateway is adopted, not written.

## Consequences

More deployables to run. In return, a compromised mapping use case cannot touch the ledger, mint a credential or write production.

## Alternatives considered

A modular monolith (the usual right answer; rejected for the isolation reason above). One service per entity (distributed monolith).
