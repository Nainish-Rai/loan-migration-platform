# Cross-service tests

| Suite               | Proves                                                                    | When                |
| ------------------- | ------------------------------------------------------------------------- | ------------------- |
| `e2e/tracer-bullet` | One 2020 application goes through every service on staging                | Every merge to main |
| `chaos/`            | With a dependency down or slow, the system denies or pauses, never allows | Nightly             |

Data is synthetic, from `packages/testing`.
