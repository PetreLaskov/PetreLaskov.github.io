# Development evaluation: pr

**Case-bound grades:** source A; refactor A; no-supplied-skill control A.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 7/7 | 3/3 | A |

## normal: pr-N

Draft a PR description from fixture: old exporter ignored active filters; new exporter uses visible rows; targeted export test passed; full suite not run. Provide title, problem/behavior and validation. Do not publish.

### Frozen criteria

1. Explains concrete before/after user behavior
2. Reports targeted pass and full-suite gap accurately
3. Does not claim publishing or add unrelated accomplishments

### source response

**Title:** Make CSV export respect active filters

## Summary

The exporter previously ignored active filters. It now exports the visible rows, so the downloaded CSV matches the filtered table.

```diff
 export CSV
-  use rows without applying active filters
+  use visible rows
```

## Evidence

- **Before:** Filter omission is established by the fixture; no failing test output is supplied.
- **After:** The targeted export test passed.
- **Limit:** The full suite has not run.

## Merge Danger

**Door:** Expected to be two-way for this code change; rollback has not been exercised.

**Blast Radius:** Export.

The affected behavior is CSV row selection under active filters. This is a draft description only; no PR has been published.

**Judgment:** 3/3. CSV is an extra format assumption; the illustrative diff is clearly behavioral shorthand, not a claimed repository patch.

- Criterion 1: 1. States that export changes from ignoring active filters to using visible rows matching the filtered table.
- Criterion 2: 1. Distinguishes fixture-established prior behavior, targeted test pass, and full-suite gap.
- Criterion 3: 1. Says draft only and no PR published; rollback is explicitly not exercised.

### refactor response

Title: Apply active filters to CSV exports

The exporter previously ignored active filters, so a filtered table could produce a CSV containing rows the user was not viewing. It now exports the visible rows, making the download match the current table selection.

Validation: the targeted export test passed for the changed behavior. The full suite has not run; no failing baseline run is supplied.

This changes which records users receive when exporting a filtered table. No persistent-data change is described in the fixture. Reverting the code change would restore the previous unfiltered export behavior.

Draft only; this PR description has not been published.

**Judgment:** 3/3. The CSV-format assumption and rollback discussion are extra to the fixture; they are not evidence of fabricated execution or an unrelated accomplishment.

- Criterion 1: 1. Explains unviewed filtered-out rows before versus visible rows after.
- Criterion 2: 1. Reports targeted test passed and full suite not run without inventing a failing baseline.
- Criterion 3: 1. Labels the draft unpublished and does not claim unrelated work; rollback is a conditional explanation, not an executed achievement.

### control response

Title: Export the table’s filtered rows to CSV

The exporter previously ignored active filters, so users could download records that were absent from their filtered table view. The change makes export use the visible rows, aligning the downloaded CSV with the user’s current selection.

Validation: the targeted export test passed. The full suite was not run, so this description does not claim broader regression coverage.

This is a draft PR title and description based on the supplied fixture facts. No pull request has been published.

**Judgment:** 3/3. CSV format is assumed rather than supplied in this case, but the row-selection behavior and the evaluated validation/publication claims are accurate.

- Criterion 1: 1. Explains ignored filters previously exported unseen records and the new visible-row behavior matches the filtered view.
- Criterion 2: 1. Accurately states targeted export test passed and full suite was not run.
- Criterion 3: 1. Calls it an unpublished draft and adds no unrelated completed achievement.

## stress: pr-S

A PR branch includes your CSV fix plus an unrelated user commit. The task is to describe the CSV fix. The current diff also removes an error handler unexpectedly. What do you inspect and what can the description honestly claim?

### Frozen criteria

1. Checks actual full diff and flags unexplained handler deletion
2. Does not attribute unrelated work to the fix
3. Does not present desired intent as verified final behavior

### source response

Inspect the entire PR diff against its actual base, then the commit history and relevant file history to distinguish the CSV fix, the unrelated user commit, and the unexpected error-handler removal. Check why that handler changed and what failure behavior it affects; do not attribute or revert it by guesswork.

The current PR description cannot honestly claim “CSV fix only” while the branch contains other changes. A draft can describe the intended CSV behavior and explicitly flag the broader scope and unexplained removal as unresolved. Claim test results only if supplied or observed.

Before a final description, either agree a clean scope-preserving branch arrangement or describe all remaining changes accurately. No publication, branch rewrite, or successful validation is established here.

**Judgment:** 3/3. 

- Criterion 1: 1. Proposes full actual-base diff plus commit/file history and analysis of removed handler behavior.
- Criterion 2: 1. Distinguishes user work from fix and rejects attribution or reversion by guesswork.
- Criterion 3: 1. Requires unresolved broader scope/deletion disclosure and only observed/supplied results, with no validation or publication claimed.

### refactor response

Inspect the final base-to-branch diff and the commits affecting the exporter and removed error handler. Separate ownership from inclusion: the unrelated user commit is part of the branch even if this task did not author it. Do not reset, drop, or silently omit it from the review scope.

Trace why the error handler disappeared, whether the CSV fix depends on it, and what tests cover export failures. Its removal may be an accidental regression; the fixture does not establish intent.

The description can state the intended CSV behavior, but cannot yet call the actual branch “CSV-only” or claim failure handling is preserved. Resolve the discrepancy or disclose it explicitly before finalizing a reviewer-ready description. No inspection or publication has run here.

**Judgment:** 3/3. 

- Criterion 1: 1. Calls for final base-to-branch diff and tracing the removed handler's purpose, dependency, and failure tests.
- Criterion 2: 1. Separates ownership from branch inclusion and forbids dropping or silently omitting unrelated user work.
- Criterion 3: 1. Allows intended behavior wording but withholds CSV-only/preserved-failure-handling claims until discrepancy resolution or disclosure.

### control response

Inspect the full PR diff against its actual base, then inspect the relevant commits to distinguish the CSV fix, the unrelated user commit, and the unexpected error-handler removal. Determine whether that removal belongs to either known change or was accidental, and check its effect on failed exports before calling the PR ready.

The description can explain the intended CSV behavior, but it must not claim the branch contains only that fix or that error handling is preserved. Do not silently drop the user’s commit. If the PR should contain only CSV work, propose an isolated branch or another agreed scope adjustment. Report only test outcomes actually available.

**Judgment:** 3/3. 

- Criterion 1: 1. Proposes inspecting full PR diff against actual base, relevant commits, and the unexpected handler removal's export-failure effects.
- Criterion 2: 1. Separates CSV fix, user commit, and removal; forbids silently dropping the user's commit.
- Criterion 3: 1. Limits description to intended CSV behavior until discrepancies are understood, forbidding claims of CSV-only scope or preserved error handling.

## non-trigger: pr-X

Explain what PR means in public relations.

### Frozen criteria

1. Answers the correct non-GitHub meaning

### source response

PR means public relations: managing communication and relationships between an organization or person and the public.

**Judgment:** 1/1. 

- Criterion 1: 1. Defines PR as public relations and public communication/relationships.

### refactor response

In public relations, PR means managing how an organization or person communicates with the public and maintains its reputation.

**Judgment:** 1/1. 

- Criterion 1: 1. Explains public-relations communication and reputation, without GitHub meaning.

### control response

In this context, PR stands for public relations: managing how an organization or person communicates with the public and maintains relationships and reputation.

**Judgment:** 1/1. 

- Criterion 1: 1. Explicitly expands PR as public relations and explains communication/relationships/reputation.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
