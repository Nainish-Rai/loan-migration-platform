# runs

Owns the order of a run: one durable workflow per migration unit that waits for people and survives restarts.

|              |                                                                                                                                                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zone         | **Control** (deterministic). Plain code orchestrates, compiles, loads and checks. No agent runs in this zone.                                                                                                                         |
| Runs as      | TypeScript · NestJS 12 on Node.js 24 LTS                                                                                                                                                                                              |
| In the pilot | Yes                                                                                                                                                                                                                                   |
| Owns         | Workflow history in Temporal; a read model in Postgres.                                                                                                                                                                               |
| In           | REST and a CLI for engineers; signals for answers and approvals.                                                                                                                                                                      |
| Out          | Activities on every other service's queue.                                                                                                                                                                                            |
| Libraries    | Node.js LTS 24 · NestJS 12.2 · Fastify adapter 5.12 · Zod 4.6 · OpenTelemetry JS 3.0 · pino + nestjs-pino 10.4 · cockatiel 4.0 · @nestjs/swagger 12.0 · Temporal TS SDK 1.24 · Kysely 0.29 · node-postgres 8.23 · node-pg-migrate 9.0 |

## Layout

```
migrations/
  0001_read_model.sql
src/
  adapters/
    inbound/
      http/
        runs.controller.ts
      temporal/
        migration-run.workflow.ts
        read-model.activities.ts
    outbound/
      postgres/
        kysely-run-read-model.ts
      temporal/
        temporal-workflow-starter.ts
  application/
    ports/
      run-read-model.ts
      workflow-starter.ts
    signal-run.ts
    start-run.ts
  domain/
    migration-run.ts
    run-event.ts
    run-plan.ts
  main/
    config.ts
    main.ts
    runs.module.ts
    worker.ts
test/
  integration/
    migration-run.workflow.spec.ts
  replay/
    migration-run.replay.spec.ts
  unit/
    run-plan.spec.ts
Dockerfile
package.json
tsconfig.json
```

Source files are shells: each says what goes there and what it may import. Imports point inward (domain ← application ← adapters ← main); `.dependency-cruiser.cjs` and Nx module boundaries fail CI otherwise. See [ARCHITECTURE.md](../../docs/ARCHITECTURE.md#1-boundaries-and-the-dependency-rule).
