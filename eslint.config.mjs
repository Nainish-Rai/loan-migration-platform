/**
 * Type-aware lint (typescript-eslint) and Nx module boundaries: the checks Biome can't do.
 *
 * Promises, because an unawaited one loses a Kafka offset or a Temporal heartbeat:
 * - no-floating-promises, no-misused-promises and await-thenable.
 * - switch-exhaustiveness-check, so a new decision or status can't fall through a switch.
 *
 * Project boundaries, from each project's type tag:
 * - A service imports kernel, contracts and platform packages. Never another service.
 * - The kernel imports nothing. Contracts import the kernel. Platform packages import the kernel,
 *   contracts and each other. Testing imports all of those.
 *
 * Zone rules, from each project's zone tag:
 * - zone:raw and zone:prod import no model SDK (ai, @ai-sdk/*, @temporalio/vercel-ai-sdk) and no
 *   MCP package: agents never see raw data and never touch production.
 * - zone:control imports no model SDK and no MCP client. Mapping and verification may serve tools
 *   to agents through the gate, but no control service calls a model or an agent itself.
 */
