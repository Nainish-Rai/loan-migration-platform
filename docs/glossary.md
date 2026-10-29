# Glossary

One meaning per word, everywhere: code, tickets, dashboards and conversations with the bank.

| Term             | Meaning                                                                                    | Lives in                     |
| ---------------- | ------------------------------------------------------------------------------------------ | ---------------------------- |
| Application      | One loan application: a legacy record plus 10 to 50 documents.                             | everywhere (`ApplicationId`) |
| Source           | A legacy system we read: the LOS database, the document store, loose files, bureau feeds.  | intake                       |
| Snapshot         | A consistent read of one source at a fixed log position (an Oracle SCN).                   | intake                       |
| Landed object    | A byte-identical copy of a source object, addressed by its SHA-256. Never changes.         | intake                       |
| Control totals   | Counts and sums that must match the source exactly.                                        | intake, verification         |
| Quarantine       | Where an object waits when we refuse to guess: locked, unreadable or unknown.              | intake                       |
| Masked document  | A document with identity numbers masked in text and in the image.                          | sanitizer                    |
| Extraction       | A field value read from a document, with its page and box.                                 | docai                        |
| Gap              | A disagreement between the record and a document. Flagged, never silently fixed.           | docai, mapping               |
| Evidence dossier | Everything known about one target field: profile, the code that sets it, document values.  | knowledge                    |
| Mapping spec     | A declarative description of how one target table is filled. Versioned.                    | mapping                      |
| Candidate        | One possible source for a target field, with confidence. "No match" is always a candidate. | mapping                      |
| Review task      | A question for a field's owner, with the top three candidates.                             | mapping                      |
| Gold mapping     | An approved answer, reused by the next run.                                                | mapping                      |
| Run              | One durable workflow for one migration unit, started by one engineer.                      | runs                         |
| Staging copy     | A masked copy of landed data for one run, thrown away after.                               | staging                      |
| Rung             | One level of the verification ladder, L0 structure to L5 downstream feeds.                 | verification                 |
| Evidence         | A check result that names the exact data snapshot it checked.                              | verification                 |
| Change request   | A merge request carrying spec, generated code, evidence, gaps and open questions.          | release                      |
| Cohort           | A group of applications that cuts over together, chosen by status.                         | cutover                      |
| Parallel run     | Old and new systems on the same input until outputs match within written tolerances.       | cutover                      |
| Action           | Anything an agent asks to do: read, propose, check, call a model.                          | gate                         |
| Principal chain  | Engineer → run → agent. Each hop can only narrow what the previous one allowed.            | gate, broker                 |
| Decision         | Allow or deny for one action, with reasons and the policy version.                         | gate                         |
| Receipt          | Proof that a decision was durably recorded: sequence number and chain hash.                | ledger                       |
| Grant            | A credential for one run, one agent, one resource, for at most 300 seconds.                | broker                       |
