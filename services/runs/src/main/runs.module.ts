/**
 * Composition root. Builds every use case with useFactory from concrete adapters, so use cases
 * stay plain classes; the only file that knows every class.
 *
 * Ring 4 · main: Composition root. The only place that knows every concrete class; wires them,
 * reads config and starts the process.
 */
