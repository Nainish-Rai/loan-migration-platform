/**
 * Records an approval from GitLab, refuses self-approval, and adds change-request.approved to the
 * outbox once the rule is met.
 *
 * Ring 2 · application: Use cases and the ports they own. Imports the domain and its own ports;
 * never NestJS, an SDK or a wire type.
 */
