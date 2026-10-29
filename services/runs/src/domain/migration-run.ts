/**
 * One run for one migration unit: who started it, which snapshot, which target schema version,
 * which models. Fixed when the run starts.
 *
 * Ring 1 · domain: Entities, value objects and domain rules. Imports nothing outside its own
 * domain folder except @lmp/shared-kernel.
 */
