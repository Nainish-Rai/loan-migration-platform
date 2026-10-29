/**
 * The order of a run as a pure state machine: from the current state and an event, the next step.
 * No Temporal, no I/O, so every path is unit-tested.
 *
 * Ring 1 · domain: Entities, value objects and domain rules. Imports nothing outside its own
 * domain folder except @lmp/shared-kernel.
 */
