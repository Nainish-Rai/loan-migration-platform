# model-gateway

Routes model calls to Claude on Bedrock over PrivateLink, or to open weights on vLLM inside the bank. Pins versions per run and enforces token budgets.

|              |                                                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Zone         | **Gate** (every agent action). The gate decides, the ledger remembers, the broker mints, guard reads. Each holds one key. |
| Runs as      | Adopted open source, configured here                                                                                      |
| In the pilot | Yes                                                                                                                       |
| Owns         | Routes and budgets, as configuration in deploy/model-gateway.                                                             |
| In           | OpenAI-compatible HTTP behind Envoy.                                                                                      |
| Out          | Bedrock or vLLM.                                                                                                          |
| Libraries    | Agent Router 1.2 · vLLM · Claude via Bedrock · Qwen3 on vLLM · olmOCR                                                     |

## Layout

```
backends.yaml
budgets.yaml
routes.yaml
```

Nothing here is our code: the gateway is configured, pinned and upgraded like any other platform component.
