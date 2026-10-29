# gate

Decides every agent action against default-deny Cedar policies, writes the decision to the ledger first, and fails closed.

|              |                                                                                                                                                                                                          |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zone         | **Gate** (every agent action). The gate decides, the ledger remembers, the broker mints, guard reads. Each holds one key.                                                                                |
| Runs as      | TypeScript · NestJS 12 on Node.js 24 LTS                                                                                                                                                                 |
| In the pilot | Yes                                                                                                                                                                                                      |
| Owns         | Nothing. Policy bundles are signed OCI artifacts in Harbor.                                                                                                                                              |
| In           | Envoy ext_authz over gRPC.                                                                                                                                                                               |
| Out          | Ledger appends.                                                                                                                                                                                          |
| Libraries    | Node.js LTS 24 · NestJS 12.2 · Fastify adapter 5.12 · Zod 4.6 · OpenTelemetry JS 3.0 · pino + nestjs-pino 10.4 · cockatiel 4.0 · Connect-ES 2.2 · protobuf-es 2.16 · Cedar (WASM) 4.14 · sigstore-js 5.0 |

## Layout

```
src/
  adapters/
    inbound/
      ext-authz/
        authorization.grpc.ts
        check-request.mapper.ts
      http/
        health.controller.ts
    outbound/
      cedar/
        cedar-entities.mapper.ts
        cedar-policy-engine.ts
      harbor/
        oci-bundle-source.ts
      ledger/
        ledger-decision-log.ts
      sigstore/
        sigstore-signature-verifier.ts
  application/
    ports/
      bundle-source.ts
      decision-log.ts
      policy-engine.ts
      signature-verifier.ts
    decide-action.ts
    load-policy-bundle.ts
  domain/
    action.ts
    decision.ts
    deny-reason.ts
    policy-bundle.ts
    principal-chain.ts
  main/
    config.ts
    gate.module.ts
    main.ts
test/
  contract/
    ext-authz.contract.spec.ts
  integration/
    cedar-policy-engine.spec.ts
  unit/
    decide-action.spec.ts
    principal-chain.spec.ts
Dockerfile
package.json
tsconfig.json
```

Source files are shells: each says what goes there and what it may import. Imports point inward (domain ← application ← adapters ← main); `.dependency-cruiser.cjs` and Nx module boundaries fail CI otherwise. See [ARCHITECTURE.md](../../docs/ARCHITECTURE.md#1-boundaries-and-the-dependency-rule).
