/**
 * Adds an event to the outbox table inside the caller's transaction. Debezium's outbox router
 * relays it to Kafka, so there are no dual writes.
 */
