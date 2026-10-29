# ledger

Keeps the decision log: append-only, hash-chained, durable on a synchronous standby before it answers, checkpointed to WORM storage.

|              |                                                                                                                                                                                                                                                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zone         | **Gate** (every agent action). The gate decides, the ledger remembers, the broker mints, guard reads. Each holds one key.                                                                                                                                                                                         |
| Runs as      | TypeScript · NestJS 12 on Node.js 24 LTS                                                                                                                                                                                                                                                                          |
| In the pilot | Yes                                                                                                                                                                                                                                                                                                               |
| Owns         | Decisions in Postgres with a synchronous standby; signed checkpoints under Object Lock.                                                                                                                                                                                                                           |
| In           | gRPC Append, GetReceipt, VerifyRange; read-only audit API.                                                                                                                                                                                                                                                        |
| Out          | Signed checkpoints.                                                                                                                                                                                                                                                                                               |
| Libraries    | Node.js LTS 24 · NestJS 12.2 · Fastify adapter 5.12 · Zod 4.6 · OpenTelemetry JS 3.0 · pino + nestjs-pino 10.4 · cockatiel 4.0 · @nestjs/swagger 12.0 · Connect-ES 2.2 · protobuf-es 2.16 · Kysely 0.29 · node-postgres 8.23 · node-pg-migrate 9.0 · AWS SDK · S3 3.1155 · AWS SDK · KMS 3.1155 · node-vault 0.13 |

## Layout

```
migrations/
  0001_chain.sql
src/
  adapters/
    inbound/
      grpc/
        ledger.grpc.ts
      http/
        audit.controller.ts
      temporal/
        ledger.activities.ts
    outbound/
      kms/
        kms-signer.ts
      openbao/
        transit-signer.ts
      postgres/
        postgres-chain-store.ts
      s3/
        object-lock-checkpoint-archive.ts
  application/
    ports/
      chain-store.ts
      checkpoint-archive.ts
      signer.ts
    append-decision.ts
    get-receipt.ts
    verify-range.ts
    write-checkpoint.ts
  domain/
    chain.ts
    checkpoint.ts
    decision-record.ts
    receipt.ts
  main/
    config.ts
    ledger.module.ts
    main.ts
test/
  integration/
    postgres-chain-store.spec.ts
  unit/
    append-decision.spec.ts
    chain.spec.ts
Dockerfile
package.json
tsconfig.json
```

Source files are shells: each says what goes there and what it may import. Imports point inward (domain ← application ← adapters ← main); `.dependency-cruiser.cjs` and Nx module boundaries fail CI otherwise. See [ARCHITECTURE.md](../../docs/ARCHITECTURE.md#1-boundaries-and-the-dependency-rule).
