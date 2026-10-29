# Architecture

This repository is the structure of a platform that moves a 30-year-old bank's loan applications (Oracle records, OnBase documents, loose PDFs and forms) into a new platform's database. AI agents do the first 80 percent of the mapping work. People approve the rest. Every agent action passes one gate, and the gate writes the decision down before the action happens.

It is a shell of sample files: every source file says what goes there and what it may import, and the manifests list each service's libraries and versions. The guided walkthrough explains the product; this document explains the code.

## 1. Boundaries and the dependency rule

**Decision.** Split services by trust zone, not by noun. Inside every service, use the same four rings.

| Zone       | Services                                      | Rule                                                                                                       |
| ---------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Raw        | intake, sanitizer                             | Only these two read unmasked files. No agent, no model.                                                    |
| Masked     | docai, knowledge, agents                      | Documents arrive masked. Agents run in a gVisor sandbox with no network except Envoy.                      |
| Gate       | gate, ledger, broker, guard, model-gateway    | The gate decides, the ledger remembers, the broker mints. Each holds one key.                              |
| Control    | runs, mapping, staging, verification, release | Deterministic services. No agent code runs here.                                                           |
| Production | cutover                                       | The only writer to the new platform's production database, and only after two approvals sit in the ledger. |

Inside a service:

```
src/domain        entities, value objects, rules         imports: nothing outside domain (+ @lmp/shared-kernel)
src/application   use cases + the ports they own         imports: domain, own ports
src/adapters      controllers, consumers, gateways       imports: application, domain, libraries, @lmp/contracts
src/main          NestJS modules, config, bootstrap      imports: anything; nothing imports main
```

- NestJS decorators appear only in `adapters` and `main`. Use cases are plain classes; the Nest module builds them with `useFactory`, so a test can wire them by hand.
- Data crosses a ring as plain objects. Protobuf messages, Kysely rows, Kafka records and SDK types stay in adapters.
- Services share wire contracts (`packages/contracts`), never domain code. The one exception is `packages/shared-kernel`: money, identifiers and citations, which every context must agree on.
- The rule is enforced, not hoped for: `.dependency-cruiser.cjs` (rings, cross-service imports, cycles), Nx project tags (zones and package types), and import-linter for the Python workers. A wrong import fails CI.

**Alternatives considered.**
- _A modular monolith._ The right default for most new apps. Rejected here because the gate, the ledger and the broker must not share a process or credentials with the agents and services they control. A compromised mapping use case must not be able to rewrite the ledger or mint a credential.
- _One service per entity._ Rejected: it produces a distributed monolith with chatty synchronous calls. A service here is a bounded context with its own database.

## 2. Contexts and language

| Subdomain                                                                                    | Kind       | Service                     | Why                                                                                  |
| -------------------------------------------------------------------------------------------- | ---------- | --------------------------- | ------------------------------------------------------------------------------------ |
| Mapping specs, candidates, review, compiler                                                  | Core       | mapping                     | Where the migration is won or lost. Deep modeling.                                   |
| Verification ladder L0–L5                                                                    | Core       | verification                | The proof the bank signs. Every record, not a sample.                                |
| Enforcement: decide, record, mint, screen                                                    | Core       | gate, ledger, broker, guard | The guarantee an auditor checks. Four processes, because each holds a different key. |
| Intake and landing                                                                           | Supporting | intake                      | Read-only, once, hash-addressed.                                                     |
| Sanitise and mask                                                                            | Supporting | sanitizer                   | Must happen before anything else reads a file.                                       |
| Document understanding                                                                       | Supporting | docai                       | Open-source models; we own the taxonomy and citations.                               |
| Legacy knowledge graph                                                                       | Supporting | knowledge                   | Meaning of a field lives in the code that writes it.                                 |
| Agent execution                                                                              | Supporting | agents                      | Five narrow agents in a sandbox, with no credentials of their own.                   |
| Runs and orchestration                                                                       | Supporting | runs                        | Durable, waits for people.                                                           |
| Staging copies                                                                               | Supporting | staging                     | Masked copy per run, thrown away after.                                              |
| Change requests and approvals                                                                | Supporting | release                     | Four eyes on money fields.                                                           |
| Cohort cutover                                                                               | Supporting | cutover                     | Small cohorts, parallel run, rehearsed rollback.                                     |
| Workflow engine, identity, secrets, messaging, model routing and serving, flags, code review | Generic    | adopted                     | Temporal, Keycloak, SPIRE, OpenBao, Kafka, Agent Router, vLLM, Unleash, GitLab.      |

Relationships (see [context-map.md](context-map.md)):
- **Published language.** Protobuf for synchronous calls, AsyncAPI-described events on Kafka, the Cedar schema for policy, and activity interfaces for Temporal.
- **Anti-corruption layers.** The legacy schema, OnBase type codes and index files never leave intake and knowledge as legacy shapes. They are parsed as data, and their names never reach another context's domain.
- **Conformist.** The new platform's target schema is not ours to change. mapping conforms to it and pins its version per run.

Aggregates stay small and reference each other by id: `MappingSpec` (one target table, versioned), `ReviewTask`, `MigrationRun`, `LandedObject`, `DecisionRecord`, `ChangeRequest`, `Cohort`. Terms are defined in [glossary.md](glossary.md).

## 3. Size

| Quantity                    | Estimate                       | How                                           |
| --------------------------- | ------------------------------ | --------------------------------------------- |
| Applications                | 400 pilot; 400,000 in the book | brief                                         |
| Pages                       | ~40 million                    | 400,000 × 30 documents × ~3.3 pages           |
| Gated agent actions per run | ~15,000                        | ~600 target fields × ~25 tool and model calls |
| Gated actions per day       | ~150,000                       | 10 runs a day at full pace                    |
| Decision rate               | ~2/s average, ~50/s peak       | 150,000 ÷ 86,400, with bursty runs            |
| Ledger growth               | ~150 MB/day, ~55 GB/year       | ~1 KB per decision                            |
| Landed files                | ~12 TB                         | ~300 KB per scanned page                      |

**Verdict.** The control plane is tiny. One Postgres cluster with one database per service, no cache, no sharding, no read replicas except the ledger's synchronous standby. Kafka exists because change capture needs a log, not for scale. The data plane is the heavy part: OCR on ~40 million pages is GPU-bound and scales out with Karpenter; Spark does the bulk loads and the checks.

## 4. Data

| Service      | Store                                                        | Role                                             | Consistency notes                                                                                                                                     |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| intake       | S3 or Ceph RGW, Object Lock (compliance) + Postgres manifest | **System of record** for what was read           | Put-if-absent by SHA-256. Re-runs read here, never the source.                                                                                        |
| ledger       | Postgres, synchronous standby + Object Lock checkpoints      | **System of record** for decisions               | One writer per chain; chain head locked `FOR UPDATE`; `synchronous_commit = remote_apply`. If the standby is gone, appends block and the gate denies. |
| mapping      | Postgres                                                     | System of record for specs and answers           | Spec versions are immutable; approval is a new version, never an update.                                                                              |
| release      | Postgres                                                     | System of record for approvals                   | `UNIQUE (change_request_id, approver)` and an author ≠ approver check in one transaction.                                                             |
| runs         | Temporal history + Postgres read model                       | History is the record; the read model is derived | Read model rebuilt from workflow history if lost.                                                                                                     |
| knowledge    | Neo4j (graph + vector index)                                 | Derived                                          | Rebuilt from landed data and parse results.                                                                                                           |
| docai        | Iceberg tables on S3 or Ceph RGW                             | Derived                                          | Every extraction cites document, page and box.                                                                                                        |
| verification | Iceberg evidence + Postgres index                            | Derived, replayable                              | Each result names the exact Iceberg snapshot it checked.                                                                                              |
| staging      | Aurora clone or Postgres template copy                       | Disposable                                       | One copy per run, destroyed by a sweeper after its TTL.                                                                                               |
| cutover      | Postgres + Unleash                                           | System of record for cohort state                | A cohort switch is a flag flip after a recorded two-person decision.                                                                                  |
- Events leave a service through a transactional outbox, relayed by Debezium's outbox event router. No dual writes.
- Consumers are idempotent: each keeps an inbox table keyed by event id.
- Bulk loads are idempotent by batch id, so a failed batch is simply re-run.

## 5. Appetite

**Six weeks, 400 applications, three eras.** What ships in the pilot and what waits for a trigger is in the table below. Speculative abstractions are cut: no plugin system for sources (there are four), no multi-tenant layer (one bank per install), no event sourcing beyond the ledger, no GraphQL federation, no custom review UI beyond what Argilla and GitLab already give us.

| Ships in the pilot                                  | Waits for a trigger                                                 |
| --------------------------------------------------- | ------------------------------------------------------------------- |
| intake (snapshot only), sanitizer, docai, knowledge | Change capture in intake: when cutover planning starts              |
| agents: evidence reader, mapper, verifier           | Scoper and PR author as agents: until then, a script and a template |
| gate, ledger, broker, guard, model gateway          | Hard-page vision model route: until then, hard pages go to review   |
| runs, mapping (with review), staging                | L5 downstream-feed rung: when the first cohort is scheduled         |
| verification L0–L4                                  | cutover service and Unleash: when the first cohort is scheduled     |
| release (GitLab merge request)                      | GPU autoscaling with Karpenter: past ~50,000 applications           |

## 6. Stack

- **TypeScript services:** NestJS 12 on Node.js 24 LTS with the Fastify adapter ([ADR-0003](adr/0003-nestjs-on-node-lts.md)). The agents worker is a plain Temporal worker.
- **Persistence:** Kysely with hand-written mappers and plain SQL migrations ([ADR-0012](adr/0012-kysely-with-hand-written-mappers.md)).
- **Messaging:** Kafka through Confluent's librdkafka client, behind a port ([ADR-0013](adr/0013-kafka-client-behind-a-port.md)); Debezium relays every outbox.
- **Object storage:** the S3 API only; Ceph RGW with Object Lock on-prem ([ADR-0014](adr/0014-s3-api-and-ceph-rgw.md)).
- **Secrets and identity:** OpenBao with SPIRE ([ADR-0015](adr/0015-openbao-for-secrets.md)); Keycloak for people.
- **Every version** is in the catalog in `pnpm-workspace.yaml` and in each `pyproject.toml`.

## Decisions

Architecture decision records live in [adr/](adr/). Each one names the alternatives it rejected.
