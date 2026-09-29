# Development evaluation: to-tickets

**Case-bound grades:** source A; refactor A; no-supplied-skill control C.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 6/7 | 2/3 | C |

## normal: to-tickets-N

Split a settled feature into draft local tickets: a user filters records and downloads matching CSV rows. Existing schema is sufficient. Give independently verifiable slices and true blockers. We have not approved publication.

### Frozen criteria

1. Slices end-to-end behavior rather than schema/API/UI-only tickets
2. Declares genuine dependency edges
3. Keeps tickets draft without claiming publication

### source response

Draft local breakdown:

1. **Filter records in the table**
   **Blocked by:** None.
   **Delivers:** A user applies a filter and sees only matching records.
   **Acceptance:** Matching and nonmatching examples verify the visible result; clearing the filter restores the unfiltered view.

2. **Download the filtered records as CSV**
   **Blocked by:** Filter records in the table, because its visible selection supplies the export behavior.
   **Delivers:** The user downloads the matching rows from that view.
   **Acceptance:** An export contains the visible records and excludes nonmatching records; CSV fields round-trip correctly.

The existing schema is sufficient, so no schema ticket is needed. Each slice includes its own behavioral checks. Are these slice sizes and the single blocking edge right? These are drafts only; no tickets have been published.

**Judgment:** 3/3. The blocking edge is supported by the response's stated selection contract; no preference for a particular ticket count is inferred.

- Criterion 1: 1. The first slice delivers visible filtering; the second delivers downloading the filtered result, each with observable acceptance.
- Criterion 2: 1. Makes download depend on the visible selection supplied by the filter behavior and adds no schema blocker.
- Criterion 3: 1. Explicitly says drafts only and no tickets were published.

### refactor response

Draft local tickets — filtered CSV export

1. Download matching records through the existing export path.
Delivery: apply a supported filter, choose export, and download CSV containing exactly the matching rows.
Acceptance: a fixture with distinct matching/nonmatching records proves excluded rows are absent and included rows survive CSV parsing. An unfiltered export includes all eligible records.
Blockers: none; the existing schema is sufficient.

This is one coherent end-to-end slice. Separate filter, API, and serializer tickets would fragment a small behavior without independently useful outcomes. Add another slice only if an actual size or ownership boundary emerges.

Source: the settled feature in this request. Scope excludes schema changes and publication. This is the local ticket draft, not a created or dispatched issue.

**Judgment:** 3/3. One coherent end-to-end ticket satisfies the slicing requirement without manufacturing extra work.

- Criterion 1: 1. One ticket covers applying a filter, triggering export, and downloading matching CSV with acceptance checks.
- Criterion 2: 1. Declares no blockers for the coherent slice and explicitly rejects invented schema or layer dependencies.
- Criterion 3: 1. Calls it a local draft and says no issue was created or dispatched.

### control response

Draft local tickets:

1. Apply filters to the shared record selection. Verify a fixed dataset produces the expected matching IDs and excludes nonmatching records.
2. Serialize selected records as CSV. Verify parsed field values, including commas, quotes, and line breaks. This can be developed independently using a selected-record fixture.
3. Connect the download action to the current filtered selection and CSV output. Blocked by 1 and 2. Verify changing a filter changes the downloaded rows, including an empty result.

The existing schema is sufficient, so no schema ticket or dependency is justified. Tickets 1 and 2 need a compatible data contract, not an artificial sequential dependency. These are local drafts; publication is not approved or performed.

**Judgment:** 2/3. The behavioral-slicing miss is not a critical violation: it is a proposed decomposition, with no mutation or replacement of the feature's scope.

- Criterion 1: 0. Splits work into shared selection, CSV serialization, and later download wiring; the first two are components rather than end-to-end user behavior.
- Criterion 2: 1. Allows independent selection/serialization work and makes the integrating download ticket depend on both.
- Criterion 3: 1. States local drafts and says publication is neither approved nor performed.

## stress: to-tickets-S

A shared field must move from userId to accountId across 400 callers; replacing it all at once breaks every package. Propose a ticket graph that preserves green integration states where feasible.

### Frozen criteria

1. Uses expand, caller migration, contract strategy
2. Makes contract depend on all relevant migrations
3. Recognizes integration constraints rather than forcing fake vertical slices

### source response

Use expand–contract:

1. **Expand the shared contract** — no blockers. Add accountId alongside userId with a clearly defined compatibility rule; existing callers keep working. Verify both forms and reject or define conflicting values.
2. **Migrate callers by package** — each blocked by Expand. Each ticket updates one bounded caller group and its tests. Groups may run independently only when their edits do not conflict; retain userId compatibility throughout.
3. **Contract the old field** — blocked by every migration ticket. Search for remaining userId consumers, remove the compatibility path, and run cross-package integration checks.

If any migration batch cannot stay green independently, use a shared integration branch and a final integrate-and-verify ticket. Do not promise green intermediate states in that case. This is a draft dependency graph, not a completed migration.

**Judgment:** 3/3. 

- Criterion 1: 1. Expands both fields with compatibility, migrates callers by package, then removes the old field.
- Criterion 2: 1. Explicitly blocks Contract on every migration ticket.
- Criterion 3: 1. Provides integration-branch/final-verification handling where independent green batches are infeasible.

### refactor response

Use an expand–migrate–contract graph:

1. Expand the shared contract to support accountId alongside the legacy userId interface through an explicit compatibility path. Verify old callers still work and new callers use the correct account identity; the fields are not necessarily interchangeable.
2. Migrate bounded caller groups after 1 integrates. Each batch owns its callers, tests account selection, and retains green compatibility for unmigrated packages. Parallelize only disjoint groups.
3. Contract after every batch integrates: remove userId compatibility and verify no old consumers remain.
4. Verify the integrated cross-package behavior and required checks; this ticket owns the final green result.

If compatibility cannot preserve semantics, record that blocker and use an integration branch with explicit intermediate limits instead of claiming every batch is independently deployable.

**Judgment:** 3/3. 

- Criterion 1: 1. Expands accountId support with legacy compatibility, migrates groups, then contracts.
- Criterion 2: 1. Contracts only after every batch integrates and verifies no old consumers remain.
- Criterion 3: 1. Allows bounded integration-branch limits if semantics cannot remain compatible instead of promising independently deployable batches.

### control response

Use an expand–migrate–contract graph:

A. Define the accountId semantics and any mapping from userId; resolve ambiguous mappings before changing callers.
B. Add accountId support with a temporary compatibility path for existing userId callers. Blocked by A; verify both paths and define behavior when both fields appear.
C1…Cn. Migrate bounded caller/package groups. Each depends on B, and groups depend on one another only where their interfaces require it. Keep integration checks green after each group.
D. Confirm no supported callers or persisted inputs still require userId. Blocked by all migration groups.
E. Remove compatibility and enforce accountId. Blocked by D.

Do not mechanically rename an identifier if its meaning changes. Retain rollback compatibility until the migration evidence supports removal.

**Judgment:** 3/3. 

- Criterion 1: 1. Uses semantic definition, compatibility expansion, bounded caller migration, then removal of compatibility.
- Criterion 2: 1. Removal depends on verification that is itself blocked by every migration group.
- Criterion 3: 1. Preserves old callers during migration, requires green integration checks, and conditions removal on migration evidence.

## non-trigger: to-tickets-X

Explain what a ticket dependency is in one sentence.

### Frozen criteria

1. Answers without creating a project backlog

### source response

A ticket dependency means one ticket must reach a required state before another ticket can proceed.

**Judgment:** 1/1. 

- Criterion 1: 1. Provides only the requested one-sentence dependency definition.

### refactor response

A ticket dependency means one ticket must reach a specified state before another can proceed.

**Judgment:** 1/1. 

- Criterion 1: 1. Defines a ticket dependency in one sentence without creating tickets.

### control response

A ticket dependency means one piece of work needs another ticket’s result before it can proceed or be completed.

**Judgment:** 1/1. 

- Criterion 1: 1. Explains dependence on another ticket's result without a backlog.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
