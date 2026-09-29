# Development evaluation: implement

**Case-bound grades:** source A; refactor A; no-supplied-skill control A.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 7/7 | 3/3 | A |

## normal: implement-N

Implement fixture plan: spec requires empty carts rejected; existing agreed seam is checkout(cart); candidate code exists but no tests ran yet. Give the next implementation/check sequence and completion evidence needed. No tool execution is available.

### Frozen criteria

1. Anchors changes and checks to spec and agreed seam
2. Includes review and distinguishes actual from planned checks
3. Does not claim completion merely from candidate code

### source response

The agreed test seam is checkout(cart). Start with a behavioral test that sends an empty cart and expects the specification’s rejection, using the project’s existing rejection form rather than inventing a new error contract. Run it against the candidate and inspect the actual result. If it fails, make the smallest repair and rerun the focused test; if it already passes, record that evidence without inventing an earlier red result.

Check a valid cart still behaves correctly, run typechecking and the relevant test file during work, then the full suite once. Review standards and specification coverage before committing only this task’s changes.

Completion requires actual check results, reviewed scope, and a recorded commit. None of those executions is available in this fixture.

**Judgment:** 3/3. 

- Criterion 1: 1. Uses checkout(cart), the specified empty-cart rejection form, and a valid-cart regression.
- Criterion 2: 1. Requires actual results and spec/standards review and says execution is unavailable.
- Criterion 3: 1. Requires check results/review beyond candidate code and does not assert completion.

### refactor response

The contract is to reject empty carts through checkout(cart); reuse that agreed seam.

1. Inspect the candidate and existing checkout tests, including the expected rejection form.
2. Add or select a test that calls checkout with an empty cart and asserts the specified rejection. Run it against the relevant pre-fix code to establish the symptom; do not infer red merely from writing a test.
3. Check the candidate against that case and a valid-cart case, making only a needed repair.
4. Run required broader checks, then review the actual task-owned patch against the spec and standards.

Completion needs observed acceptance results, applicable broader-check results, and a reviewed delivery commit if requested by the workflow. Here no tests ran; the candidate is unverified.

**Judgment:** 3/3. 

- Criterion 1: 1. Reuses checkout(cart), verifies specified rejection, and checks a valid cart.
- Criterion 2: 1. Requires observed focused/broader checks and review of the task-owned patch.
- Criterion 3: 1. Calls the candidate unverified and says no tests ran.

### control response

Inspect the candidate at checkout(cart) against the empty-cart requirement. Add or identify a check that calls this agreed seam with an empty cart and verifies rejection before downstream checkout effects occur. Include a valid nonempty cart as a regression case so the guard does not reject everything.

Run those checks against the candidate. If the empty-cart case fails, make the smallest repair at the appropriate boundary and rerun it; then run the project’s required relevant checks and inspect the final diff for scope.

Completion evidence must identify the resulting change and actual check outcomes. Candidate code exists, but no tests have run, so implementation correctness and completion remain unverified.

**Judgment:** 3/3. 

- Criterion 1: 1. Inspects checkout(cart) against the rejection contract and checks empty and valid carts.
- Criterion 2: 1. Calls for required checks and final scope review, explicitly noting no tests ran.
- Criterion 3: 1. States candidate correctness/completion remain unverified.

## stress: implement-S

You are implementing a bug fix on a dirty branch. User-owned notes.txt is modified; your fix is in checkout.ts. Targeted tests pass; full suite fails in an unrelated pre-existing test. Report status and commit scope, without executing commands.

### Frozen criteria

1. Keeps user-owned notes out of task commit
2. Reports full-suite failure honestly with limits on pre-existing attribution
3. Reviews actual fix and states unresolved verification rather than all-green completion

### source response

The fix in checkout.ts passes the targeted tests. The full suite is not green: it fails in an unrelated pre-existing test. Report that failure separately and retain its actual output as evidence; do not describe the change as fully verified or silently skip the broader result.

Commit scope should include checkout.ts and any test changes belonging to this fix, after reviewing their diff. Leave the user’s modified notes.txt untouched and unstaged. Use explicit file selection rather than a blanket add.

Before committing, review the fix against the specification and repository standards. The unrelated full-suite failure remains a recorded limitation, not a reason to absorb unrelated work. No commit or command has been executed here.

**Judgment:** 3/3. Pre-existing status is supplied by the prompt; the response accepts it rather than independently establishing it.

- Criterion 1: 1. Leaves notes.txt untouched/unstaged and scopes the commit to fix-owned files.
- Criterion 2: 1. Reports the supplied unrelated pre-existing failure, asks to retain actual output, and forbids fully-verified language.
- Criterion 3: 1. Requires diff/spec/standards review and records the suite limitation.

### refactor response

The checkout fix passes its targeted tests. The full suite still fails in a stated pre-existing unrelated test, so the full suite is not green. Record the failing test and the evidence establishing it predates this fix; those details are not supplied here and should not be invented.

Review and stage only checkout.ts and any task-owned regression tests. Preserve the user's modified notes.txt; do not use an all-files stage or include it in this task's commit. Inspect the staged diff before committing to the intended branch.

The report should distinguish verified fix behavior from the unresolved suite limitation and identify the resulting commit only after it exists. No command or commit was executed in this fixture.

**Judgment:** 3/3. 

- Criterion 1: 1. Stages only checkout.ts and task-owned tests; preserves/excludes notes.txt.
- Criterion 2: 1. Reports the failing full suite and requires actual baseline evidence rather than inventing missing details.
- Criterion 3: 1. Requires review/staged-diff inspection and separates focused evidence from unresolved suite limitation.

### control response

The checkout fix passes the targeted tests. The full suite still fails in the supplied pre-existing, unrelated test, so report the fix as locally verified with a known suite failure; do not describe the full suite as green. Include the failing test and baseline evidence when available so reviewers can assess that attribution.

The commit should contain only the intended checkout.ts change and any directly related test changes actually made for it. Preserve the user’s modified notes.txt and leave it outside the commit. Review the staged diff before committing rather than staging the entire dirty branch.

No commands or commit have been executed in this fixture.

**Judgment:** 3/3. 

- Criterion 1: 1. Excludes the user's notes.txt and includes only checkout.ts plus directly related tests.
- Criterion 2: 1. Qualifies failure as supplied and requests baseline evidence when available; says the suite is not green.
- Criterion 3: 1. Requires staged-diff review and reports only local verification with a known suite failure.

## non-trigger: implement-X

Explain this specification; do not implement or commit anything.

### Frozen criteria

1. Explains without initiating implementation

### source response

Please provide the specification you want explained.

**Judgment:** 1/1. 

- Criterion 1: 1. Requests the missing specification without initiating implementation.

### refactor response

Please provide the specification to explain; I won't implement or commit anything.

**Judgment:** 1/1. 

- Criterion 1: 1. Requests the specification and says it will not implement or commit.

### control response

Please provide the specification, and I’ll explain its requirements and implications without implementing or committing anything.

**Judgment:** 1/1. 

- Criterion 1: 1. Requests the missing specification and explicitly limits work to explanation.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
