/**
 * Composition root. Builds DecideAction with useFactory from the Cedar engine and the ledger
 * client; the only file that knows every concrete class.
 *
 * Ring 4 · main: Composition root. The only place that knows every concrete class; wires them,
 * reads config and starts the process.
 */
