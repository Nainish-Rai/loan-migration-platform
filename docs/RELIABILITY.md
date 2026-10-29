# Reliability

Production will send every failure eventually. This file says what each service does when a dependency is slow or gone. The rule for the enforcement path is short: **no record, no action**.

## Integration points

| Caller → dependency             | Timeout                                            | Retry                       | Breaker / bulkhead                           | When it is down                                                                             |
| ------------------------------- | -------------------------------------------------- | --------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Envoy → gate (ext_authz)        | 250 ms                                             | none                        | `failure_mode_allow: false`                  | Envoy returns 403. The agent activity fails; Temporal retries it with backoff.              |
| gate → ledger (append)          | 150 ms                                             | none inside the gate        | breaker opens after 5 failures in 10 s       | Deny. The run pauses, on-call is paged, nothing is lost.                                    |
| ledger → Postgres standby       | commit waits for `remote_apply`                    | n/a                         | single writer per chain                      | Appends block, the gate times out and denies. Durability beats availability here.           |
| broker → OpenBao                | 300 ms                                             | 1 retry, jittered           | breaker per secrets engine                   | No grant, so the tool call fails closed.                                                    |
| broker → ledger (receipt check) | 150 ms                                             | 1 retry                     | shared breaker with the gate's client config | No grant.                                                                                   |
| agents → model-gateway          | 120 s, streaming                                   | 2 retries on 429/5xx        | breaker per model                            | The run pauses. Models are pinned per run, so there is no silent fallback to another model. |
| docai → OCR on vLLM             | 90 s per page batch                                | 3 retries                   | separate Temporal task queue for GPU work    | Pages queue up; the control plane is unaffected.                                            |
| knowledge → Neo4j               | 2 s                                                | 2 retries                   | connection pool sized per service            | Agent tool calls fail; the activity retries.                                                |
| any consumer → Kafka            | consumer lag alert at 10 min                       | at-least-once + inbox table | one consumer group per service               | Lag grows; nothing is dropped.                                                              |
| runs → any activity             | start-to-close per activity, heartbeats every 30 s | Temporal retry policy       | task queue per service                       | Workflow waits. It can wait for days.                                                       |

## Steady state

- Staging copies carry a TTL. `staging` runs a sweeper that destroys expired copies every hour.
- Kafka retention: 14 days on change topics, compacted on state topics.
- Temporal namespace retention: 90 days; the ledger keeps decisions for the bank's retention period (default 10 years), checkpointed to Object Lock.
- Logs ship to the bank's collector; nothing is written to local disk except temp files under a size limit.

## Edge cases

- **Envoy gives up after the ledger has committed.** Envoy's 250 ms budget sits above the gate's 150 ms ledger deadline, but a slow network can still make Envoy time out after an append commits. The agent gets a 403 and nothing runs, because no tool acts without a grant. The ledger now holds an allow that never executed. A nightly job marks every allow with no grant exchange inside its window as _decided, not executed_, so an auditor never mistakes a decision for an action.
- **The same decision twice.** `append` is idempotent by decision id, so a retried append returns the first receipt.
- **A policy bundle that fails validation.** The gate keeps the last good bundle and pages security.

## Health and signals

- `/health/live` is shallow. `/health/ready` checks the service's own database, Kafka and Temporal connections.
- RED metrics on every endpoint and activity. Gate-specific: decisions per second, deny rate by reason, ledger append p99, open breakers.
- A nightly job recomputes the ledger chain from the last checkpoint. A mismatch pages security, not just on-call.
- Alerts that page: gate fail-closed, ledger chain mismatch, chain checkpoint missing, grants issued without a receipt (must be zero).

## Deploying safely

- Database changes are expand → migrate → contract, so the old and new versions run side by side.
- Cohort cutover is behind Unleash flags; turning a cohort back is a flag flip plus a rehearsed data rollback.
- Policy bundles are versioned and signed. The gate keeps the last good bundle if a new one fails validation.
