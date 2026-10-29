/**
 * Maps Envoy's AttributeContext to an Action and a PrincipalChain: SPIFFE id, Mcp-Method and
 * Mcp-Name headers, path. An unknown shape becomes a deny, never a guess.
 *
 * Ring 3 · adapters: Controllers, consumers and gateways. Translate wire formats to use-case input
 * and implement ports with real libraries.
 */
