# Jobs

PySpark on the data plane: the heavy, every-record work. Jobs run as SparkApplications through the Spark Operator, read and write Iceberg tables, and name the snapshot they read in every result.

| Folder     | Jobs                                                                               |
| ---------- | ---------------------------------------------------------------------------------- |
| `parse/`   | EBCDIC files with COBOL copybooks; Oracle SQL inside legacy code                   |
| `profile/` | A profile of every landed table                                                    |
| `resolve/` | The same customer across sources                                                   |
| `load/`    | The runtime compiled jobs share; `compiled/` holds what the mapping compiler emits |
| `verify/`  | Rungs L0 to L5 of the ladder                                                       |

Hand-written jobs check and parse. Jobs that move data are generated from approved specs, never written by hand.
