# Contracts

Every format that crosses a service boundary, in one place, checked for breaking changes on every merge request.

| Folder    | Format                                                                     | Checked by                                                 |
| --------- | -------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `proto/`  | Protobuf for synchronous calls and for Python activity payloads            | `buf lint`, `buf breaking`                                 |
| `events/` | AsyncAPI 3 documents for Kafka events; Avro schemas registered in Apicurio | `asyncapi validate`, AsyncAPI diff, registry compatibility |

Generated code lives in `packages/contracts` (TypeScript) and `packages/contracts-py` (Python). A change here needs approval from both sides of the contract.
