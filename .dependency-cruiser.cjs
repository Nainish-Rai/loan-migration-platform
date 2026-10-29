/**
 * The dependency rule, checked on every merge request by `pnpm arch` (dependency-cruiser). Every rule
 * is an error, and each one stays inside a single service.
 *
 * - domain-is-pure: src/domain imports only its own folder and @lmp/shared-kernel. No packages and
 *   no Node built-ins.
 * - application-owns-ports: src/application imports the domain and its own ports. Never NestJS, an
 *   SDK or a wire type.
 * - adapters-never-import-main: only main knows every concrete class.
 * - no-cross-service-imports: a service calls another through a contract and never imports its code.
 * - packages-never-import-services: shared packages sit below every service.
 * - no-dev-deps-in-src: production code can't import a test or build tool.
 * - no-circular: a cycle is a build error, inside a service and across packages.
 *
 * Build output (dist) and generated code (src/gen) are skipped.
 */
