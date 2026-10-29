/**
 * One masked copy of the target database for one run, with a TTL. Created, loaded, destroyed;
 * never reused by another run.
 *
 * Ring 1 · domain: Entities, value objects and domain rules. Imports nothing outside its own
 * domain folder except @lmp/shared-kernel.
 */
