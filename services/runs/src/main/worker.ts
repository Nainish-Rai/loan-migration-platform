/**
 * Starts the Temporal worker on queue runs. Workflow code is bundled separately and can't import
 * NestJS or anything with I/O.
 *
 * Ring 4 · main: Composition root. The only place that knows every concrete class; wires them,
 * reads config and starts the process.
 */
