# Deploy

Everything runs inside the bank: in its AWS account (EKS, Aurora, S3, KMS) or on its own Kubernetes with Ceph RGW and OpenBao, from one signed air-gap bundle.

| Folder                    | What it configures                                                                         |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| `helm/`                   | One application chart, instantiated once per service by the `lmp-platform` umbrella chart  |
| `envoy/`                  | The agent sidecar: ext_authz to the gate, ext_proc to guard                                |
| `k8s/`                    | Namespaces per zone, Cilium policies, the gVisor runtime class, the agent sandbox template |
| `spire/`, `openbao/`      | Workload identity and the broker's secrets engines                                         |
| `model-gateway/`, `vllm/` | The adopted model gateway and the open-weights models behind it                            |
| `kafka/`, `temporal/`     | Debezium connectors, topics and the Temporal namespace                                     |
| `terraform/`              | AWS infrastructure: modules plus one folder per environment                                |
| `observability/`          | The OpenTelemetry Collector and the alerts that page                                       |
| `airgap/`                 | The Zarf package: images, charts, model weights, SBOMs and signatures                      |
