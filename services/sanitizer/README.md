# sanitizer

Strips macros and scripts, then masks identity numbers in text and in the image, before anything else reads a file.

|              |                                                                                                                                                                                                                         |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zone         | **Raw** (unmasked PII). Only intake and the sanitizer read raw files. No agent and no model can reach this zone.                                                                                                        |
| Runs as      | Python 3.13 · Temporal worker                                                                                                                                                                                           |
| In the pilot | Yes                                                                                                                                                                                                                     |
| Owns         | Nothing. Writes masked copies to the masked bucket; full numbers go to OpenBao.                                                                                                                                         |
| In           | Temporal activities on queue sanitize.                                                                                                                                                                                  |
| Out          | document.masked events.                                                                                                                                                                                                 |
| Libraries    | Temporal Python SDK 1.35 · Pydantic 2.14 · pikepdf 10.17 · oletools 0.60 · Magika 1.0 · Presidio 2.2 · Tesseract 5 · python-stdnum 2.2 · hvac 2.4 · boto3 1.43 · confluent-kafka (Python) 2.16 · protobuf (Python) 7.36 |

## Layout

```
src/
  sanitizer/
    adapters/
      inbound/
        temporal_activities.py
      outbound/
        image_redactor.py
        kafka_events.py
        magika_type_detector.py
        office_disarmer.py
        openbao_token_vault.py
        pdf_disarmer.py
        presidio_pii_finder.py
        s3_masked_store.py
      __init__.py
    application/
      __init__.py
      ports.py
      sanitize_document.py
    domain/
      __init__.py
      file_verdict.py
      identity_number.py
      masking_policy.py
    __init__.py
    main.py
tests/
  unit/
    test_identity_number.py
    test_sanitize_document.py
Dockerfile
project.json
pyproject.toml
```

Source files are shells: each says what goes there and what it may import. Imports point inward (domain ← application ← adapters ← main); the import-linter contracts in `pyproject.toml` fail CI otherwise. See [ARCHITECTURE.md](../../docs/ARCHITECTURE.md#1-boundaries-and-the-dependency-rule).
