# Composition root: loads the model once, builds the use case, starts the gRPC server for Envoy.
#
# Ring 4 · main: Composition root. The only place that knows every concrete class; wires them,
# reads config and starts the process.
