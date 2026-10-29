/**
 * Zod schema: Temporal address, Envoy's local listener, the gateway's model names. Parsed once at
 * boot.
 *
 * Ring 4 · main: Composition root. The only place that knows every concrete class; wires them,
 * reads config and starts the process.
 */
