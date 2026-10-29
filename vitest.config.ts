/**
 * One Vitest config for every TypeScript project, through `test.projects`.
 *
 * - Each service and package is its own project, so `nx affected -t test` runs only what changed.
 * - unplugin-swc compiles tests with decorator metadata, which NestJS dependency injection needs.
 * - Unit tests (test/unit) run with in-memory fakes and no network.
 * - Integration tests (test/integration) start containers from Harbor through Testcontainers, and are
 *   tagged so a laptop without Docker can skip them.
 * - Coverage thresholds apply to domain and application only: that is where the rules live.
 */
