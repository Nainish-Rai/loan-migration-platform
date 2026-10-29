/**
 * A consistent read of one source at a fixed Oracle SCN. Opens, lands objects, then completes or
 * fails on its control totals; it never reopens.
 *
 * Ring 1 · domain: Entities, value objects and domain rules. Imports nothing outside its own
 * domain folder except @lmp/shared-kernel.
 */
