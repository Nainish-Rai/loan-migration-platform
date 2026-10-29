# docai

Splits bundles, classifies pages into one taxonomy and extracts fields with page-and-box citations. Disagreements become flagged gaps.

|              |                                                                                                                                                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Zone         | **Masked** (agents read here). Documents arrive masked. Agents run in a gVisor sandbox whose only way out is Envoy.                                                                                                      |
| Runs as      | Python 3.13 · Temporal worker                                                                                                                                                                                            |
| In the pilot | Yes                                                                                                                                                                                                                      |
| Owns         | Extractions in Iceberg tables.                                                                                                                                                                                           |
| In           | Temporal activities on queue docai-gpu.                                                                                                                                                                                  |
| Out          | extraction.completed events.                                                                                                                                                                                             |
| Libraries    | Temporal Python SDK 1.35 · Pydantic 2.14 · Docling 2.144 · pdfplumber 0.11 · PyExifTool 0.5 · PyIceberg 0.12 · boto3 1.43 · HTTPX 0.28 · confluent-kafka (Python) 2.16 · protobuf (Python) 7.36 · olmOCR · Qwen3 on vLLM |

## Layout

```
src/
  docai/
    adapters/
      inbound/
        temporal_activities.py
      outbound/
        docling_layout.py
        exif_metadata.py
        gateway_page_classifier.py
        iceberg_extractions.py
        kafka_events.py
        olmocr_reader.py
        pdfplumber_text.py
      __init__.py
    application/
      __init__.py
      classify_pages.py
      extract_fields.py
      ports.py
      split_bundle.py
    domain/
      __init__.py
      extraction.py
      gap.py
      page_class.py
    __init__.py
    main.py
tests/
  unit/
    test_extract_fields.py
    test_split_bundle.py
Dockerfile
project.json
pyproject.toml
```

Source files are shells: each says what goes there and what it may import. Imports point inward (domain ← application ← adapters ← main); the import-linter contracts in `pyproject.toml` fail CI otherwise. See [ARCHITECTURE.md](../../docs/ARCHITECTURE.md#1-boundaries-and-the-dependency-rule).
