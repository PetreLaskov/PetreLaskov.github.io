---
name: test-the-oracle
description: Check whether tests or acceptance criteria distinguish plausible wrong behavior from correct behavior. Use when green checks may be tautological, shallow, or misleading.
---

# Test the Oracle

Choose a consequential success claim and challenge the observation that declares it true.

1. Read the requirement, its current check, and the code path. State the observable behavior the check claims to protect.
2. Describe a plausible wrong implementation that preserves superficial success: wrong ordering, missing filter, duplicate side effect, invalid boundary value, or another contract-specific defect.
3. In an isolated fixture or reversible local mutation, introduce the smallest such error. Do not mutate production or unrelated user changes. If safe execution is unavailable, produce a test design and label it unexecuted.
4. Run the relevant check. Record exact mutation, command, and whether the check caught the intended error. A syntax/type failure does not prove the behavioral oracle works.
5. Restore the fixture. If the check missed the error, improve the assertion from an independent requirement/example, then demonstrate that it rejects the wrong case and accepts the correct case.
6. Stop after the selected claim is resolved. Expand only when a newly observed blind spot warrants it.

Prefer one revealing challenge over a large set of trivial mutants. Do not infer total suite quality from a successful sample. Report the protected behavior and remaining limits, not a coverage percentage.
