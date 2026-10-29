/**
 * Zod schema for this service's environment, parsed once at boot, so a bad value fails the deploy
 * instead of the first request.
 *
 * Ring 4 · main: Composition root. The only place that knows every concrete class; wires them,
 * reads config and starts the process.
 */
