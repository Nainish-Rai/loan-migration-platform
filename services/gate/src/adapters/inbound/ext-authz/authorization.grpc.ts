/**
 * Envoy's Authorization/Check over gRPC, served by Connect on HTTP/2. Calls decide-action and
 * answers OK or PERMISSION_DENIED; holds no rules.
 *
 * Ring 3 · adapters: Controllers, consumers and gateways. Translate wire formats to use-case input
 * and implement ports with real libraries.
 */
