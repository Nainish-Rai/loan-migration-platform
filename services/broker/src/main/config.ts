/**
 * Zod schema: OpenBao address and auth role, SPIRE trust domain and JWKS URL, ledger address,
 * maximum TTL of 300 seconds.
 *
 * Ring 4 · main: Composition root. The only place that knows every concrete class; wires them,
 * reads config and starts the process.
 */
