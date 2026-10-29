# ADR-0013: Confluent's Kafka client, behind a port

Status: accepted · 2026-10-29

## Context

NestJS's Kafka transport runs on KafkaJS, which hasn't shipped a release since February 2023.

## Decision

Confluent's librdkafka-based client with its Schema Registry serdes, used only in adapters and @lmp/platform-node. No @nestjs/microservices Kafka transport.

## Consequences

A native addon: its prebuilt binary is mirrored for the air gap, and images use glibc.

## Alternatives considered

KafkaJS through Nest's transport (unmaintained); @platformatic/kafka (pure TypeScript and younger; the fallback behind the same port).
