/**
 * Hashes an object, writes it put-if-absent under Object Lock, records it and adds object.landed
 * to the outbox, in one transaction. Idempotent by hash.
 *
 * Ring 2 · application: Use cases and the ports they own. Imports the domain and its own ports;
 * never NestJS, an SDK or a wire type.
 */
