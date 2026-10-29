/**
 * Zod schema for the gate's environment: ledger address and deadline, bundle reference, trust
 * roots. Parsed once at boot.
 *
 * Ring 4 · main: Composition root. The only place that knows every concrete class; wires them,
 * reads config and starts the process.
 */
