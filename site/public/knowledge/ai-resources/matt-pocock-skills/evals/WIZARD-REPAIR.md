# Wizard repair: executed regression checks

Executed Bash library fixtures with synthetic input and a stubbed gh function. The live example stages, browser operations, real secrets, and remote writes were never run. These checks cover input/failure/completion behavior only; they do not validate the entire dotenv serializer, generated stages, repository targeting, or a live setup.

The invariants were selected after an independent audit found contradictions in the initial candidate. They are regression tests, not unseen benchmark results. Both the pinned source and archived first candidate are run alongside the repair.

| Version | Checks met |
|---|---:|
| source | 4/14 |
| v1 | 4/14 |
| repaired | 14/14 |

| Case | Source | Initial candidate | Repaired candidate |
|---|---|---|---|
| ask-eof-with-saved-value | fail | fail | pass |
| secret-eof-with-saved-value | fail | fail | pass |
| ask-empty-required | fail | fail | pass |
| secret-empty-required | fail | fail | pass |
| ask-explicit-enter-reuses | pass | pass | pass |
| secret-explicit-enter-reuses | pass | pass | pass |
| ask-new-value | pass | pass | pass |
| pause-eof | fail | fail | pass |
| secret-auth-failure | fail | fail | pass |
| secret-write-failure | fail | fail | pass |
| variable-write-failure | fail | fail | pass |
| finish-after-failure | fail | fail | pass |
| success-completes | pass | pass | pass |
| failed-stage-stops-before-write | fail | fail | pass |

An explicit Enter still accepts a saved nonempty value. EOF or missing required values fail before a later write, and failed required remote operations return nonzero. Even if a caller catches that failure, finish reports incomplete and returns nonzero. Successful stubbed operations still complete. All output was checked for leakage of the synthetic secret.

See [raw records](wizard-repair-tests.json) and [versioned changes](../reviews/audit-repairs.json). The 114-case text trial continues to describe the archived v1 candidate.
