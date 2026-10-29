# knowledge

Joins application, party, document, field and the line of legacy code that writes it into one graph, and serves evidence dossiers to agents.

|              |                                                                                                                                                                                                                                                                                                |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zone         | **Masked** (agents read here). Documents arrive masked. Agents run in a gVisor sandbox whose only way out is Envoy.                                                                                                                                                                            |
| Runs as      | TypeScript · NestJS 12 on Node.js 24 LTS                                                                                                                                                                                                                                                       |
| In the pilot | Yes                                                                                                                                                                                                                                                                                            |
| Owns         | The graph and its vector index in Neo4j.                                                                                                                                                                                                                                                       |
| In           | MCP tools behind Envoy; Kafka consumer.                                                                                                                                                                                                                                                        |
| Out          | Nothing; it answers questions.                                                                                                                                                                                                                                                                 |
| Libraries    | Node.js LTS 24 · NestJS 12.2 · Fastify adapter 5.12 · Zod 4.6 · OpenTelemetry JS 3.0 · pino + nestjs-pino 10.4 · cockatiel 4.0 · Connect-ES 2.2 · protobuf-es 2.16 · neo4j-driver 6.2 · Confluent Kafka JS 1.11 · Schema Registry client 1.11 · MCP TypeScript SDK 2.3 · antlr4ng 3.0 · BGE-M3 |

## Layout

```
migrations/
  0001_constraints.cypher
src/
  adapters/
    inbound/
      kafka/
        extraction-completed.consumer.ts
      mcp/
        knowledge-tools.mcp-server.ts
      temporal/
        knowledge.activities.ts
    outbound/
      antlr/
        grammar/
          README.md
        plsql-code-parser.ts
      model/
        gateway-embedder.ts
      neo4j/
        queries/
          dossier.cypher
          lineage.cypher
        neo4j-graph-store.ts
  application/
    ports/
      code-parser.ts
      embedder.ts
      graph-store.ts
    build-dossier.ts
    index-legacy-code.ts
    link-extraction.ts
  domain/
    evidence-dossier.ts
    lineage.ts
    node-kinds.ts
  main/
    config.ts
    knowledge.module.ts
    main.ts
test/
  contract/
    knowledge-tools.contract.spec.ts
  integration/
    neo4j-graph-store.spec.ts
  unit/
    build-dossier.spec.ts
Dockerfile
package.json
tsconfig.json
```

Source files are shells: each says what goes there and what it may import. Imports point inward (domain ← application ← adapters ← main); `.dependency-cruiser.cjs` and Nx module boundaries fail CI otherwise. See [ARCHITECTURE.md](../../docs/ARCHITECTURE.md#1-boundaries-and-the-dependency-rule).
