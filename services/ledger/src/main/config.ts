/**
 * Zod schema: database, signer and key id, archive bucket, checkpoint interval. Parsed once at
 * boot.
 *
 * Ring 4 · main: Composition root. The only place that knows every concrete class; wires them,
 * reads config and starts the process.
 */
