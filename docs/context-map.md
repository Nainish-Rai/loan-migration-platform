# Context map

```mermaid
flowchart LR
  subgraph legacy[Legacy bank system · read-only]
    LOS[(Oracle LOS)]
    ONB[(OnBase)]
  end
  subgraph raw[Raw zone]
    intake
    sanitizer
  end
  subgraph masked[Masked zone]
    docai
    knowledge
    agents
  end
  subgraph gatez[Gate zone]
    envoy{{Envoy}}
    gate
    ledger
    broker
    guard
    mgw[model-gateway]
  end
  subgraph control[Control zone]
    runs
    mapping
    staging
    verification
    release
  end
  subgraph prod[Production]
    cutover
    NEW[(New platform DB)]
  end
  LOS -- snapshot + CDC --> intake
  ONB -- export --> intake
  intake -- object.landed --> sanitizer
  sanitizer -- document.masked --> docai
  docai -- extraction.completed --> knowledge
  agents -- every call --> envoy
  envoy -- Check --> gate
  gate -- append first --> ledger
  envoy -- ext_proc --> guard
  envoy --> knowledge & mapping & verification & mgw
  broker -- 300 s grant --> staging
  runs -. activities .-> intake & sanitizer & docai & agents & mapping & staging & verification & release & cutover
  release -- change-request.approved --> cutover
  cutover --> NEW
```

| Upstream            | Downstream                    | Relationship          | Language                                                  |
| ------------------- | ----------------------------- | --------------------- | --------------------------------------------------------- |
| Legacy LOS, OnBase  | intake                        | Anti-corruption layer | Parsed as data; legacy names stop at intake and knowledge |
| intake              | sanitizer, docai, knowledge   | Published language    | `contracts/events/intake.yaml` (AsyncAPI)                 |
| gate                | agents, every tool service    | Open host service     | Envoy ext_authz + `policies/schema.cedarschema`           |
| ledger              | gate, broker, auditors        | Open host service     | `contracts/proto/lmp/ledger/v1`                           |
| New platform schema | mapping, staging, cutover     | Conformist            | Target schema version pinned per run                      |
| runs                | every service with activities | Customer–supplier     | `packages/contracts/src/activities`                       |
