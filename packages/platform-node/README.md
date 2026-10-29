# @lmp/platform-node

Framework-free glue that every TypeScript service needs, so no service invents its own. Imported only by adapters and main; the agents worker uses it without NestJS.

| Export        | Holds                                                     |
| ------------- | --------------------------------------------------------- |
| `/telemetry`  | OpenTelemetry SDK start-up and Temporal tracing           |
| `/logging`    | pino with redaction                                       |
| `/resilience` | cockatiel policies for every outbound call                |
| `/config`     | Zod-validated configuration                               |
| `/postgres`   | Kysely factory, outbox writer, inbox                      |
| `/kafka`      | Confluent consumer with the inbox                         |
| `/grants`     | The broker client tool servers call before running a tool |
| `/spiffe`     | Reads the JWT-SVID that spiffe-helper writes              |
