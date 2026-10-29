/**
 * Starts runs: telemetry, then the REST API on Fastify. The workflow worker runs as its own
 * process from worker.ts.
 *
 * Ring 4 · main: Composition root. The only place that knows every concrete class; wires them,
 * reads config and starts the process.
 */
