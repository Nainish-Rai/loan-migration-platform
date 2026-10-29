# staging

Creates one masked copy of landed data per run, loads it by key range idempotently, and destroys it when the run ends.

|              |                                                                                                                                                                                                                                                                                                                                              |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zone         | **Control** (deterministic). Plain code orchestrates, compiles, loads and checks. No agent runs in this zone.                                                                                                                                                                                                                                |
| Runs as      | TypeScript · NestJS 12 on Node.js 24 LTS                                                                                                                                                                                                                                                                                                     |
| In the pilot | Yes                                                                                                                                                                                                                                                                                                                                          |
| Owns         | The registry of copies and load batches in Postgres.                                                                                                                                                                                                                                                                                         |
| In           | Temporal activities; REST.                                                                                                                                                                                                                                                                                                                   |
| Out          | A staging copy, then nothing.                                                                                                                                                                                                                                                                                                                |
| Libraries    | Node.js LTS 24 · NestJS 12.2 · Fastify adapter 5.12 · Zod 4.6 · OpenTelemetry JS 3.0 · pino + nestjs-pino 10.4 · cockatiel 4.0 · @nestjs/swagger 12.0 · Connect-ES 2.2 · protobuf-es 2.16 · Temporal TS SDK 1.24 · Kysely 0.29 · node-postgres 8.23 · node-pg-migrate 9.0 · pg-copy-streams 7.0 · AWS SDK · RDS 3.1155 · AWS SDK · S3 3.1155 |

## Layout

```
migrations/
  0001_registry.sql
src/
  adapters/
    inbound/
      http/
        copies.controller.ts
      temporal/
        staging.activities.ts
    outbound/
      aurora/
        aurora-database-cloner.ts
      broker/
        broker-grant-source.ts
      postgres/
        copy-stream-batch-loader.ts
        kysely-copy-registry.ts
        template-database-cloner.ts
  application/
    ports/
      batch-loader.ts
      copy-registry.ts
      database-cloner.ts
      grant-source.ts
    create-copy.ts
    destroy-expired-copies.ts
    load-batches.ts
  domain/
    load-batch.ts
    staging-copy.ts
  main/
    config.ts
    main.ts
    staging.module.ts
test/
  integration/
    copy-stream-batch-loader.spec.ts
  unit/
    staging-copy.spec.ts
Dockerfile
package.json
tsconfig.json
```

Source files are shells: each says what goes there and what it may import. Imports point inward (domain ← application ← adapters ← main); `.dependency-cruiser.cjs` and Nx module boundaries fail CI otherwise. See [ARCHITECTURE.md](../../docs/ARCHITECTURE.md#1-boundaries-and-the-dependency-rule).
