# broker

Trades a SPIFFE identity plus a ledger receipt for one credential, scoped to exactly what was decided, for at most 300 seconds.

|              |                                                                                                                                                                                                 |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zone         | **Gate** (every agent action). The gate decides, the ledger remembers, the broker mints, guard reads. Each holds one key.                                                                       |
| Runs as      | TypeScript · NestJS 12 on Node.js 24 LTS                                                                                                                                                        |
| In the pilot | Yes                                                                                                                                                                                             |
| Owns         | Nothing. OpenBao holds the secrets engines.                                                                                                                                                     |
| In           | gRPC ExchangeForGrant, with token-exchange semantics.                                                                                                                                           |
| Out          | Dynamic credentials from OpenBao.                                                                                                                                                               |
| Libraries    | Node.js LTS 24 · NestJS 12.2 · Fastify adapter 5.12 · Zod 4.6 · OpenTelemetry JS 3.0 · pino + nestjs-pino 10.4 · cockatiel 4.0 · Connect-ES 2.2 · protobuf-es 2.16 · jose 6.2 · node-vault 0.13 |

## Layout

```
src/
  adapters/
    inbound/
      grpc/
        broker.grpc.ts
      temporal/
        broker.activities.ts
    outbound/
      ledger/
        ledger-receipt-checker.ts
      openbao/
        openbao-credential-minter.ts
      spire/
        jwt-svid-verifier.ts
  application/
    ports/
      credential-minter.ts
      identity-verifier.ts
      receipt-checker.ts
    exchange-for-grant.ts
    revoke-run-grants.ts
  domain/
    grant.ts
    scope.ts
  main/
    broker.module.ts
    config.ts
    main.ts
test/
  integration/
    openbao-credential-minter.spec.ts
  unit/
    exchange-for-grant.spec.ts
    grant.spec.ts
Dockerfile
package.json
tsconfig.json
```

Source files are shells: each says what goes there and what it may import. Imports point inward (domain ← application ← adapters ← main); `.dependency-cruiser.cjs` and Nx module boundaries fail CI otherwise. See [ARCHITECTURE.md](../../docs/ARCHITECTURE.md#1-boundaries-and-the-dependency-rule).
