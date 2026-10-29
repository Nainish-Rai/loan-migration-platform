/**
 * A legacy system we read: the LOS database, OnBase, loose files, bureau feeds. Read-only by
 * construction; nothing here can write to a source.
 *
 * Ring 1 · domain: Entities, value objects and domain rules. Imports nothing outside its own
 * domain folder except @lmp/shared-kernel.
 */
