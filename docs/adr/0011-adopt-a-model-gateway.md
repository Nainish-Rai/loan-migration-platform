# ADR-0011: Adopt a model gateway, don't build one

Status: accepted · 2026-10-29

## Context

Routing, budgets and model pinning are generic. Building them is not where our risk is.

## Decision

Agent Router (formerly Envoy AI Gateway, Apache-2.0) routes to Bedrock over PrivateLink or to vLLM in the bank. The agent's Envoy sidecar puts the gate and guard in front of it.

## Consequences

A young project to track: 1.0 shipped in June 2026.

## Alternatives considered

LiteLLM (Python on the model path, and a PyPI supply-chain incident); agentgateway (the fallback if agent-to-agent traffic matters); a home-made TypeScript gateway (months of generic work).
