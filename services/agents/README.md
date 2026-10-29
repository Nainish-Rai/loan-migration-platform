# agents

Runs five narrow agents as Temporal activities in a gVisor sandbox. Holds no credentials; every call leaves through Envoy.

|              |                                                                                                                                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Zone         | **Masked** (agents read here). Documents arrive masked. Agents run in a gVisor sandbox whose only way out is Envoy.                                                                                                                  |
| Runs as      | TypeScript · a Temporal worker on Node.js 24 LTS, no NestJS                                                                                                                                                                          |
| In the pilot | Yes                                                                                                                                                                                                                                  |
| Owns         | Nothing. Transcripts go to traces; decisions go to the ledger.                                                                                                                                                                       |
| In           | Temporal activities on queue agents.                                                                                                                                                                                                 |
| Out          | MCP tool calls and model calls, all through Envoy.                                                                                                                                                                                   |
| Libraries    | Node.js LTS 24 · Zod 4.6 · OpenTelemetry JS 3.0 · pino + nestjs-pino 10.4 · Temporal TS SDK 1.24 · Temporal × AI SDK 1.0 · AI SDK 7.0 · AI SDK · OpenAI-compatible 3.0 · MCP TypeScript SDK 2.3 · Claude via Bedrock · Qwen3 on vLLM |

## Layout

```
src/
  adapters/
    inbound/
      temporal/
        agents.activities.ts
    outbound/
      mcp/
        mcp-tool-client.ts
      model/
        gateway-model.ts
  application/
    ports/
      model.ts
      tool-client.ts
    prompts/
      evidence-reader.md
      mapper.md
      verifier.md
    check-mapping.ts
    propose-mappings.ts
    read-evidence.ts
  domain/
    agent-role.ts
    finding.ts
    mapping-proposal.ts
  main/
    composition.ts
    config.ts
    main.ts
test/
  evals/
    mapper-gold.eval.ts
  unit/
    propose-mappings.spec.ts
Dockerfile
package.json
tsconfig.json
```

Source files are shells: each says what goes there and what it may import. Imports point inward (domain ← application ← adapters ← main); `.dependency-cruiser.cjs` and Nx module boundaries fail CI otherwise. See [ARCHITECTURE.md](../../docs/ARCHITECTURE.md#1-boundaries-and-the-dependency-rule).
