/**
 * Starts one Temporal worker on queue agents with the AI SDK plugin. No HTTP server and no NestJS:
 * a worker needs neither.
 *
 * Ring 4 · main: Composition root. The only place that knows every concrete class; wires them,
 * reads config and starts the process.
 */
