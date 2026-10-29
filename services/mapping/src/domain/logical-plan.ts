/**
 * The compiler's middle form: scans, joins, projections, casts. Engine-free, so a second emitter
 * is possible.
 *
 * Ring 1 · domain: Entities, value objects and domain rules. Imports nothing outside its own
 * domain folder except @lmp/shared-kernel.
 */
