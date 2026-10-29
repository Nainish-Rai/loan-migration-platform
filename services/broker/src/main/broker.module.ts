/**
 * Composition root. Builds ExchangeForGrant with useFactory from the SPIRE verifier, the ledger
 * client and the OpenBao minter.
 *
 * Ring 4 · main: Composition root. The only place that knows every concrete class; wires them,
 * reads config and starts the process.
 */
