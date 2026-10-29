/**
 * Starts knowledge: telemetry first, then the Nest app on Fastify over HTTP/2, then the Temporal
 * worker on queue knowledge. A config error stops the process before it serves anything.
 *
 * Ring 4 · main: Composition root. The only place that knows every concrete class; wires them,
 * reads config and starts the process.
 */
