# Development evaluation: implement-spec

**Case-bound grades:** source A; refactor A; no-supplied-skill control A.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 7/7 | 3/3 | A |

## normal: implement-spec-N

Plan execution of graph: A adds schema; B adds API blocked by A; C adds independent help text; D integrates blocked by B and C. Two worker slots. No tools will run. Give initial dispatch, merge order rules and completion gate.

### Frozen criteria

1. Initially dispatches only A and C
2. Distinguishes integrated prerequisites from workers merely reporting done
3. Requires combined verification/review before readiness

### source response

Initial dispatch: run **A — schema** and **C — help text** in the two worker slots, each in an isolated worktree with pointers to its ticket and the spec.

Merge completed work onto the integration branch with review of the resulting diff. C may merge before or after A because it is independent. Dispatch **B — API** only after A is integrated, using a base that includes A. Dispatch **D — integration** only after both B and C are integrated. Serialize merges into the shared branch even if implementation runs concurrently.

Completion requires all ticket acceptance criteria, checks on the combined branch, and standards/specification review with findings addressed. Only then is the PR ready. This is a dispatch plan; no workers, branches, or PRs were created.

**Judgment:** 3/3. 

- Criterion 1: 1. Initially dispatches only A and C in the two slots.
- Criterion 2: 1. Starts B only after A integrates and D only after B/C integrate; serializes shared-branch merges.
- Criterion 3: 1. Requires combined-branch checks, all acceptance criteria, and addressed standards/spec review findings.

### refactor response

Initial dispatch: worker 1 owns A (schema); worker 2 owns C (help text), each on an isolated branch from the integration revision. B waits for A; D waits for B and C.

Integrate completed work serially. Review each diff and run its relevant checks on the integration branch. Unlock B only after A is integrated and verified; base B on that revision. C may integrate whenever ready, but shared-file conflicts must still be checked. Start D only after both B and C pass integration checks.

Completion requires all acceptance criteria and cross-ticket interactions verified on the final integrated branch, plus review and resolution of actionable findings. Worker passes alone are insufficient. This is a dispatch plan; no workers, branches, or PRs were created.

**Judgment:** 3/3. 

- Criterion 1: 1. Initially assigns the two workers to A and C and holds B/D.
- Criterion 2: 1. Unlocks successors only after prerequisites are integrated and verified on their starting revision.
- Criterion 3: 1. Requires integrated acceptance/cross-ticket verification and resolution of review findings; isolated passes are insufficient.

### control response

Initial dispatch: worker 1 takes A, the schema; worker 2 takes C, the independent help text. B waits for A, and D waits for both B and C.

Integrate A only after its required checks pass, then start B from the integrated schema state. C may integrate before or after A if it remains independent. D starts from a base containing both verified B and C, not merely their workers’ completion reports. Resolve overlap and run relevant integration checks after each merge.

Completion gate: A, B, C, and D are present together; the integrated behavior meets the spec; required checks pass or outstanding failures are explicitly accounted for; the final diff is reviewed. No workers were actually launched.

**Judgment:** 3/3. 

- Criterion 1: 1. Initially assigns worker 1 to A and worker 2 to C; B and D wait.
- Criterion 2: 1. Requires integrated A before B and integrated verified B/C before D, not completion reports.
- Criterion 3: 1. Requires all work together, integrated spec behavior, checks, and final diff review.

## stress: implement-spec-S

Workers B and C each pass tests in isolation but both edit shared routing and fail together. One worktree has an uncommitted diagnostic artifact. What should orchestration do before PR readiness and cleanup?

### Frozen criteria

1. Serializes/reconciles integration and tests combined result
2. Does not mark ready based only on isolated passes
3. Preserves needed dirty artifacts before cleanup

### source response

The combined branch is not ready for review. Passing isolated tests does not establish that B and C work together.

Assign a bounded integration repair covering the shared routing changes. Compare both tickets’ intended behavior, resolve the overlap, and test the combined routing paths on the actual integration branch. Rerun the relevant combined checks, then review the resulting diff against the full specification and standards before marking readiness.

Preserve the uncommitted diagnostic artifact before any cleanup: inspect what it is, determine whether it is needed as evidence or work, and save it in an appropriate durable location or recoverable snapshot. Do not discard the worktree merely because its worker reported completion. Cleanup follows verified integration and accounted-for artifacts.

**Judgment:** 3/3. 

- Criterion 1: 1. Assigns a bounded shared-routing repair, resolves overlap, and tests the actual combined branch.
- Criterion 2: 1. Explicitly says isolated tests do not establish combined readiness and requires integrated checks/review.
- Criterion 3: 1. Requires preserving useful diagnostic evidence/work in durable storage or a recoverable snapshot before cleanup.

### refactor response

Return the integration to active work. B and C passing separately does not establish that their combined routing changes satisfy the spec.

Inspect the combined failure, reconcile routing ownership, and assign one bounded integration fix against the current integration revision. Keep the other worker from concurrently rewriting that surface. Run both tickets' acceptance checks plus the interaction that failed, then required broader checks and review before claiming PR readiness.

Account for the uncommitted diagnostic artifact before retiring its worktree: inspect its purpose, preserve useful evidence in a durable authorized location or snapshot, and verify no worker still needs the checkout. Do not discard it as incidental cleanup. Nothing is ready for cleanup merely because individual workers reported success; no cleanup has occurred here.

**Judgment:** 3/3. 

- Criterion 1: 1. Assigns one bounded routing integration fix, prevents concurrent rewriting, and tests both tickets plus the failed interaction.
- Criterion 2: 1. Says isolated passes do not establish combined correctness and requires broader checks/review before readiness.
- Criterion 3: 1. Requires inspecting and preserving useful dirty evidence in a durable location/snapshot before retiring the checkout.

### control response

The branch is not PR-ready merely because B and C passed separately. Preserve the combined failing state and capture a reproducible integration failure. Inspect both routing changes, reconcile their shared assumptions, and assign clear ownership of the integration repair so workers do not overwrite one another. Then rerun the affected checks against the integrated result and review the final route behavior.

Before cleanup, inspect the uncommitted diagnostic artifact and determine whether it is needed to reproduce or explain the failure. Preserve useful evidence in an appropriate handoff or commit; discard only material known to be unnecessary and within authorized scope. Do not delete the worktree while ongoing work or unsaved evidence depends on it.

**Judgment:** 3/3. 

- Criterion 1: 1. Preserves the combined failure, assigns clear routing ownership, and reruns checks on the integrated result.
- Criterion 2: 1. Explicitly rejects PR readiness based merely on separate passes and requires final behavior review.
- Criterion 3: 1. Requires preserving useful unsaved evidence and retaining any worktree still needed by work or reproduction.

## non-trigger: implement-spec-X

Make a one-line documentation edit that needs no parallel implementation.

### Frozen criteria

1. Does not create worktree orchestration for trivial work

### source response

Please provide the documentation line and the requested edit.

**Judgment:** 1/1. 

- Criterion 1: 1. Asks for the line/edit without worktrees or workers.

### refactor response

Please provide the line and desired wording; this needs only a direct documentation edit, not parallel implementation.

**Judgment:** 1/1. 

- Criterion 1: 1. Explicitly says a direct edit suffices and parallel implementation is unnecessary.

### control response

Please provide the documentation line and the replacement text.

**Judgment:** 1/1. 

- Criterion 1: 1. Asks only for the documentation line and replacement; proposes no orchestration.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
