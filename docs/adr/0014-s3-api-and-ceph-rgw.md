# ADR-0014: The S3 API everywhere; Ceph RGW on-prem

Status: accepted · 2026-10-29

## Context

The landing zone and checkpoints need WORM storage in AWS and on-prem. MinIO's community server repository was archived in April 2026.

## Decision

Code speaks the S3 API only. AWS installs use S3 with Object Lock in compliance mode; on-prem installs use Ceph RGW with Object Lock.

## Consequences

Stores differ in details (checksums, conditional writes). One adapter handles them, with integration tests against both.

## Alternatives considered

MinIO community edition (archived); MinIO's commercial AIStor (a licence cost, fine if the bank already runs it); a filesystem with WORM features (no S3 API).
