/**
 * Starts the ledger: telemetry, Connect and the audit API on Fastify, then the worker for its
 * schedules. Refuses to start unless the database commits synchronously to its standby.
 *
 * Ring 4 · main: Composition root. The only place that knows every concrete class; wires them,
 * reads config and starts the process.
 */
