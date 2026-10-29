# Policies

The rules every agent runs under, in Cedar, so the bank's security and compliance teams can read and change them.
- **Default deny.** Anything no policy permits is denied.
- **Guardrails are forbids.** A forbid beats any permit, so a guardrail can't be undone by a new permit.
- **Every rule has a test case** in `tests/`. CI validates every policy against `schema.cedarschema` and runs every case.
- **Shipped signed.** CI bundles the schema and policies, signs the bundle with cosign and pushes it to Harbor. The gate refuses an unsigned or invalid bundle and keeps the last good one.

The tool part of the schema is generated from the MCP servers' tool descriptions (`tools/scripts/generate-cedar-schema.ts`), so a renamed tool can't slip past a policy.
