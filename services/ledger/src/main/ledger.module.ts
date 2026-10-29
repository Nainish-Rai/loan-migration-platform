/**
 * Composition root. Picks the KMS or transit signer from config and builds the use cases with
 * useFactory.
 *
 * Ring 4 · main: Composition root. The only place that knows every concrete class; wires them,
 * reads config and starts the process.
 */
