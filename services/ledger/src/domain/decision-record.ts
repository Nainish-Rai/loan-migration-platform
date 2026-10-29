/**
 * One decision as canonical bytes: id, principal chain, action, outcome, reasons, policy version
 * and time. The bytes, not the object, get hashed.
 *
 * Ring 1 · domain: Entities, value objects and domain rules. Imports nothing outside its own
 * domain folder except @lmp/shared-kernel.
 */
