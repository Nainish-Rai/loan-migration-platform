# Tech debt and design review

## Deep modules, not classitis

Each hop of the enforcement path is one module with one method, and a lot hidden behind it.

| Module       | Interface                                | What it hides                                                                          |
| ------------ | ---------------------------------------- | -------------------------------------------------------------------------------------- |
| gate         | `decide(action) → decision`              | Cedar entities, schema validation, bundle versions, the ledger call, fail-closed rules |
| ledger       | `append(decision) → receipt`             | Canonical bytes, hashing, chaining, locking, durability, checkpoints                   |
| broker       | `exchange(svid, receipt, scope) → grant` | SPIFFE verification, receipt checks, scope narrowing, OpenBao engines, TTLs            |
| mapping      | `compile(spec) → job`                    | Logical plan, type coercion, lookups, PySpark emission                                 |
| verification | `climb(run) → verdict`                   | Rung order, stop rules, Spark jobs, evidence snapshots                                 |

Rules that keep it that way:
- No pass-through services. A NestJS provider that only forwards to a repository is deleted.
- One decision, one place. The rule format for policies lives in `policies/`; the PySpark output format lives in one emitter.
- Errors are defined out of existence where we can: `append` is idempotent by decision id, loads are idempotent by batch id.

## Deliberate debt

| Id    | Debt                                                         | Why we accept it                                                                                  | Pay it when                                                                                      | Owner        |
| ----- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------ |
| TD-1  | Scoper and PR author are a script and a template, not agents | The pilot doesn't need them                                                                       | Scope reports take longer than a day by hand                                                     | runs         |
| TD-2  | Hard pages go to a person, no vision-model route             | Keeps the pilot's model surface small                                                             | Review queue spends > 20% of its time on hard pages                                              | docai        |
| TD-3  | No change capture                                            | Pilot reads snapshots only                                                                        | Cutover planning starts                                                                          | intake       |
| TD-4  | Review UI is Argilla plus GitLab                             | No custom UI to build                                                                             | Data owners ask for a workflow Argilla can't do                                                  | mapping      |
| TD-5  | One Postgres cluster for all service databases               | Load is ~2 decisions per second                                                                   | Any service needs a different failover policy than the ledger                                    | platform     |
| TD-6  | TypeScript stays on 6.0                                      | typescript-eslint's type-aware rules need TypeScript's JavaScript API, which 7.0 doesn't ship yet | typescript-eslint supports 7.0                                                                   | platform     |
| TD-7  | Temporal's AI SDK integration is new (1.0.0, October 2026)   | It makes every model and tool call a durable activity                                             | Confirm its release stage before production; plain activities around the AI SDK are the fallback | agents       |
| TD-8  | DuckDB pinned to 1.5.6                                       | 2.0 shipped this month                                                                            | 2.0 has a month of patch releases behind it                                                      | verification |
| TD-9  | Our own NestJS tracing interceptor                           | The contrib NestJS instrumentation doesn't support NestJS 12 yet                                  | The contrib package supports 12                                                                  | platform     |
| TD-10 | Our own Temporal tracing                                     | Temporal's OpenTelemetry interceptor depends on OpenTelemetry 1.x; we run 3.0                     | Temporal ships an interceptor for OpenTelemetry 3                                                | platform     |

## Broken windows

A failing architecture check, a skipped test or an unexplained warning is fixed the same day or entered in the table above with an owner. Nothing sits silently.
