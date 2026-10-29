/**
 * The Temporal workflow: drives run-plan, calls activities on each service's task queue, waits on
 * signals for people. Deterministic: no I/O, no clock, no randomness.
 *
 * Ring 3 · adapters: Controllers, consumers and gateways. Translate wire formats to use-case input
 * and implement ports with real libraries.
 */
