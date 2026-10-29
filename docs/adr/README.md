# Architecture decision records

Each record states the context, the decision, what it costs and the alternatives it beat.

| ADR                                                 | Decision                                           |
| --------------------------------------------------- | -------------------------------------------------- |
| [0001](0001-split-services-by-trust-zone.md)        | Split services by trust zone                       |
| [0002](0002-clean-architecture-in-every-service.md) | Clean Architecture rings in every service          |
| [0003](0003-nestjs-on-node-lts.md)                  | NestJS 12 on Node.js 24 LTS                        |
| [0004](0004-one-monorepo.md)                        | One monorepo: pnpm, Nx and uv                      |
| [0005](0005-contracts-first.md)                     | Contracts: protobuf for calls, AsyncAPI for events |
| [0006](0006-temporal-for-runs.md)                   | Temporal for runs                                  |
| [0007](0007-cedar-default-deny.md)                  | Cedar, default deny, signed bundles                |
| [0008](0008-write-ahead-ledger.md)                  | Write the decision before the action               |
| [0009](0009-python-where-the-models-live.md)        | Python where the models live                       |
| [0010](0010-specs-not-code.md)                      | Agents write specs; a compiler writes Spark        |
| [0011](0011-adopt-a-model-gateway.md)               | Adopt a model gateway, don't build one             |
| [0012](0012-kysely-with-hand-written-mappers.md)    | Kysely, with hand-written mappers                  |
| [0013](0013-kafka-client-behind-a-port.md)          | Confluent's Kafka client, behind a port            |
| [0014](0014-s3-api-and-ceph-rgw.md)                 | The S3 API everywhere; Ceph RGW on-prem            |
| [0015](0015-openbao-for-secrets.md)                 | OpenBao for secrets                                |
