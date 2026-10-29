# guard

Reads every tool result and prompt on the wire through Envoy's ext_proc: redacts identity numbers and flags injected instructions.

|              |                                                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Zone         | **Gate** (every agent action). The gate decides, the ledger remembers, the broker mints, guard reads. Each holds one key. |
| Runs as      | Python 3.13 · Temporal worker                                                                                             |
| In the pilot | Yes                                                                                                                       |
| Owns         | Nothing.                                                                                                                  |
| In           | Envoy ext_proc over gRPC.                                                                                                 |
| Out          | Redactions; findings to traces.                                                                                           |
| Libraries    | grpcio 1.85 · protobuf (Python) 7.36 · Presidio 2.2 · ONNX Runtime 1.31 · Prompt Guard 2 86M · Pydantic 2.14              |

## Layout

```
src/
  guard/
    adapters/
      inbound/
        ext_proc_server.py
      outbound/
        presidio_redactor.py
        prompt_guard_classifier.py
      __init__.py
    application/
      __init__.py
      ports.py
      screen_message.py
    domain/
      __init__.py
      finding.py
      screening_policy.py
    __init__.py
    main.py
tests/
  integration/
    test_ext_proc_server.py
  unit/
    test_screen_message.py
Dockerfile
project.json
pyproject.toml
```

Source files are shells: each says what goes there and what it may import. Imports point inward (domain ← application ← adapters ← main); the import-linter contracts in `pyproject.toml` fail CI otherwise. See [ARCHITECTURE.md](../../docs/ARCHITECTURE.md#1-boundaries-and-the-dependency-rule).
