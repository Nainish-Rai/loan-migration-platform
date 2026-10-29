# release

Opens a merge request with spec, code, evidence and gaps; records approvals; refuses self-approval; needs two people on money fields.

|              |                                                                                                                                                                                                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zone         | **Control** (deterministic). Plain code orchestrates, compiles, loads and checks. No agent runs in this zone.                                                                                                                                                         |
| Runs as      | TypeScript · NestJS 12 on Node.js 24 LTS                                                                                                                                                                                                                              |
| In the pilot | Yes                                                                                                                                                                                                                                                                   |
| Owns         | Change requests and approvals in Postgres.                                                                                                                                                                                                                            |
| In           | Temporal activities; GitLab webhooks.                                                                                                                                                                                                                                 |
| Out          | change-request.approved events.                                                                                                                                                                                                                                       |
| Libraries    | Node.js LTS 24 · NestJS 12.2 · Fastify adapter 5.12 · Zod 4.6 · OpenTelemetry JS 3.0 · pino + nestjs-pino 10.4 · cockatiel 4.0 · @nestjs/swagger 12.0 · Temporal TS SDK 1.24 · Kysely 0.29 · node-postgres 8.23 · node-pg-migrate 9.0 · undici 8.12 · sigstore-js 5.0 |

## Layout

```
migrations/
  0001_change_requests.sql
src/
  adapters/
    inbound/
      http/
        gitlab-webhook.controller.ts
      temporal/
        release.activities.ts
    outbound/
      gitlab/
        gitlab-code-review-host.ts
      postgres/
        kysely-change-request-repository.ts
        postgres-event-outbox.ts
      sigstore/
        sigstore-artifact-verifier.ts
  application/
    ports/
      artifact-verifier.ts
      change-request-repository.ts
      code-review-host.ts
      event-outbox.ts
    open-change-request.ts
    record-approval.ts
  domain/
    approval-rule.ts
    approval.ts
    change-request.ts
  main/
    config.ts
    main.ts
    release.module.ts
test/
  contract/
    gitlab-webhook.contract.spec.ts
  integration/
    kysely-change-request-repository.spec.ts
  unit/
    approval.spec.ts
Dockerfile
package.json
tsconfig.json
```

Source files are shells: each says what goes there and what it may import. Imports point inward (domain ← application ← adapters ← main); `.dependency-cruiser.cjs` and Nx module boundaries fail CI otherwise. See [ARCHITECTURE.md](../../docs/ARCHITECTURE.md#1-boundaries-and-the-dependency-rule).
