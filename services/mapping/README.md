# mapping

Keeps mapping specs, sends uncertain fields to their owners, reuses approved answers and compiles each spec into a PySpark job.

|              |                                                                                                                                                                                                                                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Zone         | **Control** (deterministic). Plain code orchestrates, compiles, loads and checks. No agent runs in this zone.                                                                                                                                                                                                                                    |
| Runs as      | TypeScript · NestJS 12 on Node.js 24 LTS                                                                                                                                                                                                                                                                                                         |
| In the pilot | Yes                                                                                                                                                                                                                                                                                                                                              |
| Owns         | Specs, candidates, review tasks and gold mappings in Postgres.                                                                                                                                                                                                                                                                                   |
| In           | MCP tools for the mapper; REST for reviewers; activities.                                                                                                                                                                                                                                                                                        |
| Out          | Compiled jobs in the artifact store.                                                                                                                                                                                                                                                                                                             |
| Libraries    | Node.js LTS 24 · NestJS 12.2 · Fastify adapter 5.12 · Zod 4.6 · OpenTelemetry JS 3.0 · pino + nestjs-pino 10.4 · cockatiel 4.0 · @nestjs/swagger 12.0 · Connect-ES 2.2 · protobuf-es 2.16 · Temporal TS SDK 1.24 · Kysely 0.29 · node-postgres 8.23 · node-pg-migrate 9.0 · MCP TypeScript SDK 2.3 · AWS SDK · S3 3.1155 · undici 8.12 · Argilla |

## Layout

```
migrations/
  0001_specs.sql
src/
  adapters/
    inbound/
      http/
        review.controller.ts
      mcp/
        mapping-tools.mcp-server.ts
      temporal/
        mapping.activities.ts
    outbound/
      argilla/
        argilla-review-queue.ts
      postgres/
        kysely-spec-repository.ts
      pyspark/
        pyspark-job-emitter.ts
      s3/
        s3-artifact-store.ts
  application/
    ports/
      artifact-store.ts
      job-emitter.ts
      review-queue.ts
      spec-repository.ts
    answer-review-task.ts
    compile-spec.ts
    record-proposal.ts
  domain/
    candidate.ts
    field-mapping.ts
    gold-mapping.ts
    logical-plan.ts
    mapping-spec.ts
    review-task.ts
  main/
    config.ts
    main.ts
    mapping.module.ts
test/
  integration/
    kysely-spec-repository.spec.ts
  unit/
    compile-spec.spec.ts
    mapping-spec.spec.ts
Dockerfile
package.json
tsconfig.json
```

Source files are shells: each says what goes there and what it may import. Imports point inward (domain ← application ← adapters ← main); `.dependency-cruiser.cjs` and Nx module boundaries fail CI otherwise. See [ARCHITECTURE.md](../../docs/ARCHITECTURE.md#1-boundaries-and-the-dependency-rule).
