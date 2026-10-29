# verification

Climbs the ladder on every record, L0 structure to L5 downstream feeds, and stores evidence that names the exact snapshot it checked.

|              |                                                                                                                                                                                                                                                                                                 |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zone         | **Control** (deterministic). Plain code orchestrates, compiles, loads and checks. No agent runs in this zone.                                                                                                                                                                                   |
| Runs as      | TypeScript · NestJS 12 on Node.js 24 LTS                                                                                                                                                                                                                                                        |
| In the pilot | Yes                                                                                                                                                                                                                                                                                             |
| Owns         | Evidence index in Postgres; evidence tables in Iceberg.                                                                                                                                                                                                                                         |
| In           | MCP tools for the verifier; activities.                                                                                                                                                                                                                                                         |
| Out          | Verdicts.                                                                                                                                                                                                                                                                                       |
| Libraries    | Node.js LTS 24 · NestJS 12.2 · Fastify adapter 5.12 · Zod 4.6 · OpenTelemetry JS 3.0 · pino + nestjs-pino 10.4 · cockatiel 4.0 · Connect-ES 2.2 · protobuf-es 2.16 · Temporal TS SDK 1.24 · Kysely 0.29 · node-postgres 8.23 · node-pg-migrate 9.0 · DuckDB Node 1.5.6 · MCP TypeScript SDK 2.3 |

## Layout

```
migrations/
  0001_evidence_index.sql
src/
  adapters/
    inbound/
      mcp/
        verification-tools.mcp-server.ts
      temporal/
        verification.activities.ts
    outbound/
      duckdb/
        duckdb-rung-runner.ts
      postgres/
        kysely-evidence-index.ts
      spark/
        spark-rung-runner.ts
  application/
    ports/
      evidence-index.ts
      rung-runner.ts
    climb-ladder.ts
  domain/
    evidence.ts
    ladder.ts
    rung-result.ts
    verdict.ts
  main/
    config.ts
    main.ts
    verification.module.ts
test/
  integration/
    duckdb-rung-runner.spec.ts
  unit/
    climb-ladder.spec.ts
    ladder.spec.ts
Dockerfile
package.json
tsconfig.json
```

Source files are shells: each says what goes there and what it may import. Imports point inward (domain ← application ← adapters ← main); `.dependency-cruiser.cjs` and Nx module boundaries fail CI otherwise. See [ARCHITECTURE.md](../../docs/ARCHITECTURE.md#1-boundaries-and-the-dependency-rule).
