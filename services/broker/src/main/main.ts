/**
 * Starts the broker: telemetry, Connect on Fastify over HTTP/2, the worker on queue broker. Ready
 * only when OpenBao and the ledger answer.
 *
 * Ring 4 · main: Composition root. The only place that knows every concrete class; wires them,
 * reads config and starts the process.
 */
