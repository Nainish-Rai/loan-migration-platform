/**
 * Starts the gate: telemetry, then Fastify on HTTP/2 for Connect and health, then the first
 * bundle. It reports ready only once a valid bundle is loaded.
 *
 * Ring 4 · main: Composition root. The only place that knows every concrete class; wires them,
 * reads config and starts the process.
 */
