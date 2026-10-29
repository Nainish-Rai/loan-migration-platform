# cutover

Moves applications by status in small cohorts. Legacy stays the record until a parallel run matches within written tolerances.

|              |                                                                                                                                                                                                                                                                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zone         | **Production** (the new platform). Only cutover writes production, and only after two approvals sit in the ledger.                                                                                                                                                                                                                                   |
| Runs as      | TypeScript · NestJS 12 on Node.js 24 LTS                                                                                                                                                                                                                                                                                                             |
| In the pilot | No. It waits for the first scheduled cohort.                                                                                                                                                                                                                                                                                                         |
| Owns         | Cohorts and parallel-run results in Postgres; flags in Unleash.                                                                                                                                                                                                                                                                                      |
| In           | Temporal activities; REST for the migration lead.                                                                                                                                                                                                                                                                                                    |
| Out          | Writes production, nothing else does.                                                                                                                                                                                                                                                                                                                |
| Libraries    | Node.js LTS 24 · NestJS 12.2 · Fastify adapter 5.12 · Zod 4.6 · OpenTelemetry JS 3.0 · pino + nestjs-pino 10.4 · cockatiel 4.0 · @nestjs/swagger 12.0 · Connect-ES 2.2 · protobuf-es 2.16 · Temporal TS SDK 1.24 · Kysely 0.29 · node-postgres 8.23 · node-pg-migrate 9.0 · Confluent Kafka JS 1.11 · Schema Registry client 1.11 · Unleash SDK 6.12 |

## Layout

```
migrations/
  0001_cohorts.sql
src/
  adapters/
    inbound/
      http/
        cohorts.controller.ts
      kafka/
        change-request-approved.consumer.ts
      temporal/
        cutover.activities.ts
    outbound/
      broker/
        broker-grant-source.ts
      postgres/
        kysely-cohort-repository.ts
        platform-db-writer.ts
      unleash/
        unleash-feature-flags.ts
  application/
    ports/
      cohort-repository.ts
      feature-flags.ts
      grant-source.ts
      platform-writer.ts
    cut-cohort.ts
    roll-back-cohort.ts
    start-parallel-run.ts
  domain/
    cohort.ts
    parallel-run-result.ts
    tolerance.ts
  main/
    config.ts
    cutover.module.ts
    main.ts
test/
  integration/
    platform-db-writer.spec.ts
  unit/
    cut-cohort.spec.ts
Dockerfile
package.json
tsconfig.json
```

Source files are shells: each says what goes there and what it may import. Imports point inward (domain ← application ← adapters ← main); `.dependency-cruiser.cjs` and Nx module boundaries fail CI otherwise. See [ARCHITECTURE.md](../../docs/ARCHITECTURE.md#1-boundaries-and-the-dependency-rule).
