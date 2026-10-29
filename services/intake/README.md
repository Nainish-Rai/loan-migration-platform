# intake

Reads the legacy sources read-only, at one point in time, and lands every byte once under its hash.

|              |                                                                                                                                                                                                                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zone         | **Raw** (unmasked PII). Only intake and the sanitizer read raw files. No agent and no model can reach this zone.                                                                                                                                                                                                                  |
| Runs as      | TypeScript · NestJS 12 on Node.js 24 LTS                                                                                                                                                                                                                                                                                          |
| In the pilot | Yes                                                                                                                                                                                                                                                                                                                               |
| Owns         | Manifests and control totals in Postgres; landed objects in S3, or Ceph RGW on-prem, under Object Lock.                                                                                                                                                                                                                           |
| In           | REST for engineers; Temporal activities on queue intake.                                                                                                                                                                                                                                                                          |
| Out          | object.landed and snapshot.completed events.                                                                                                                                                                                                                                                                                      |
| Libraries    | Node.js LTS 24 · NestJS 12.2 · Fastify adapter 5.12 · Zod 4.6 · OpenTelemetry JS 3.0 · pino + nestjs-pino 10.4 · cockatiel 4.0 · @nestjs/swagger 12.0 · Temporal TS SDK 1.24 · Kysely 0.29 · node-postgres 8.23 · node-pg-migrate 9.0 · AWS SDK · S3 3.1155 · Confluent Kafka JS 1.11 · Schema Registry client 1.11 · undici 8.12 |

## Layout

```
migrations/
  0001_manifest.sql
src/
  adapters/
    inbound/
      http/
        snapshots.controller.ts
      temporal/
        intake.activities.ts
    outbound/
      debezium/
        snapshot-connector.ts
      kafka/
        debezium-record-reader.ts
      onbase/
        onbase-export-reader.ts
      postgres/
        kysely-manifest-repository.ts
        postgres-event-outbox.ts
      s3/
        s3-object-store.ts
  application/
    ports/
      event-outbox.ts
      manifest-repository.ts
      object-store.ts
      source-reader.ts
    close-snapshot.ts
    land-object.ts
    take-snapshot.ts
  domain/
    control-totals.ts
    landed-object.ts
    quarantine.ts
    snapshot.ts
    source.ts
  main/
    config.ts
    intake.module.ts
    main.ts
test/
  integration/
    s3-object-store.spec.ts
  unit/
    control-totals.spec.ts
    land-object.spec.ts
Dockerfile
package.json
tsconfig.json
```

Source files are shells: each says what goes there and what it may import. Imports point inward (domain ← application ← adapters ← main); `.dependency-cruiser.cjs` and Nx module boundaries fail CI otherwise. See [ARCHITECTURE.md](../../docs/ARCHITECTURE.md#1-boundaries-and-the-dependency-rule).
