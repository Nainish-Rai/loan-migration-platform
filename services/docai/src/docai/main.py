# Composition root: builds the use cases from the adapters and starts the Temporal worker on queue
# docai-gpu.
#
# Ring 4 · main: Composition root. The only place that knows every concrete class; wires them,
# reads config and starts the process.
