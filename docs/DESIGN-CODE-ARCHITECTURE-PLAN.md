# Design Code Architecture: journey tracker

This design was worked through in eight phases, in order. Each phase asked one question and wrote its answer down before the next one started. Where a stakeholder answer doesn't exist yet, the phase records a default and lists the open question.

| #   | Phase                | Question                                                                                        | Answer, in one line                                                                                                                                   | Recorded in                                                                               |
| --- | -------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 01  | Clean Architecture   | Do source-code dependencies point inward, so the core is testable with no DB, web or framework? | Yes. Four rings in every service; NestJS lives only in adapters and main; CI fails on an outward import.                                              | [ARCHITECTURE.md §1](ARCHITECTURE.md#1-boundaries-and-the-dependency-rule)                |
| 02  | Domain-Driven Design | Where does the business actually split, and what does each term mean?                           | Twelve bounded contexts in five trust zones. Enforcement runs as four processes, so fifteen services. Mapping, verification and enforcement are core. | [ARCHITECTURE.md §2](ARCHITECTURE.md#2-contexts-and-language), [glossary.md](glossary.md) |
| 03  | System Design        | How little system does our real load actually need?                                             | About 2 gated actions per second on average. One Postgres cluster, no cache, no sharding. GPUs are the only thing that scales out.                    | [ARCHITECTURE.md §3](ARCHITECTURE.md#3-size)                                              |
| 04  | Data-Intensive Apps  | Which data model, storage engine and consistency does each workload need?                       | The landing zone and the ledger are systems of record. Everything else is derived and can be rebuilt.                                                 | [ARCHITECTURE.md §4](ARCHITECTURE.md#4-data)                                              |
| 05  | Software Design      | Is complexity hidden behind deep modules, or is this classitis?                                 | Each hop of the enforcement path is one deep module with one method. No pass-through services.                                                        | [TECH-DEBT.md](TECH-DEBT.md)                                                              |
| 06  | Release It!          | Will it degrade gracefully when a dependency is slow or down?                                   | Timeouts on every call. The gate fails closed; everything else pauses the run and pages someone.                                                      | [RELIABILITY.md](RELIABILITY.md)                                                          |
| 07  | Pragmatic Programmer | What thin slice proves the boundaries, and what habits keep them reversible?                    | One 2020 loan file, end to end through every service, kept as a test. Every third party behind a port.                                                | [TESTING.md](TESTING.md), [TECH-DEBT.md](TECH-DEBT.md)                                    |
| 08  | The 37signals Way    | What is essential for v1, and what speculative abstraction do we cut?                           | A six-week pilot on 400 applications. Change capture, cutover and the downstream-feeds rung wait for a trigger.                                       | [ARCHITECTURE.md §5](ARCHITECTURE.md#5-appetite)                                          |

## Next open decision

Confirm the six-week appetite and the pilot cohort (400 applications from 1998, 2009 and 2020) with the bank's migration lead. Everything else in v1 follows from that answer.

## Open questions for the bank

- Which approver groups own which target fields (credit, operations, compliance)? This fills `CODEOWNERS` in the mappings repository.
- Is the bank's AWS account allowed to use Amazon Bedrock over PrivateLink, or is the deployment fully air-gapped? The model gateway config switches; no code changes.
- Which downstream feeds (bureau, regulator, servicing) must match before a cohort cuts over? This sets the L5 rung.
