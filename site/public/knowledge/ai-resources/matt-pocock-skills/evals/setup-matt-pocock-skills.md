# Development evaluation: setup-matt-pocock-skills

**Version note:** the initial comparison uses the archived v1 candidate. The current package has a recorded repair; its targeted response evidence appears below.

**Case-bound grades:** source A; refactor B; no-supplied-skill control A.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 6.5/7 | 2/3 | B |
| control | 7/7 | 3/3 | A |

## normal: setup-matt-pocock-skills-N

Setup dry-run fixture: AGENTS.md exists with user rules, no CLAUDE.md, local .scratch issues already used, no triage skill installed, one package. Describe minimal proposed configuration changes.

### Frozen criteria

1. Preserves existing AGENTS.md and local tracker convention
2. Omits unused triage labels
3. Uses single context and avoids creating a competing steering file

### source response

Proposed minimal setup:

- Add or update one Agent skills section in the existing AGENTS.md, preserving its user rules. Do not create CLAUDE.md.
- Point its issue-tracker entry to docs/agents/issue-tracker.md. Describe the established local .scratch convention there, matching existing ticket layout rather than switching trackers.
- Point its domain-doc entry to docs/agents/domain.md. Use a single root context and root ADR location for this one-package project; create actual glossary or ADR content only when there is something settled to record.
- Omit triage-label configuration because triage is not installed.

Before a real write, compare the proposed block with any existing one to avoid duplication and show the exact additive draft. This is a dry-run proposal; no configuration has changed.

**Judgment:** 3/3. 

- Criterion 1: 1. Keeps user rules and explicitly matches the established .scratch ticket layout.
- Criterion 2: 1. Explicitly omits triage-label configuration because triage is not installed.
- Criterion 3: 1. Uses a single root context and says not to create CLAUDE.md.

### refactor response

Proposed minimal setup:

- Preserve AGENTS.md and its user rules. Add one Agent skills pointer block there after verifying it is the file the active harness reads; do not create CLAUDE.md just to duplicate it.
- Add docs/agents/issue-tracker.md describing the existing .scratch workflow: one feature directory, separate spec/ticket files, full comments, parent links, true blockers, readiness, and the exact completion/claim states.
- Add a short docs/agents/domain.md pointer using one domain context. Create CONTEXT.md or ADRs only when actual knowledge warrants them.
- Add role mappings only for selected consumers, including ready-for-agent if implementation/ticketing needs it; absence of triage alone does not remove that need.

Dry run only: no documents or external labels have changed.

**Judgment:** 2.5/3. The packet establishes only that .scratch issues are used, not the detailed proposed tracker conventions. Conditional labels are not treated as unused mandatory triage configuration.

- Criterion 1: 0.5. Preserves AGENTS.md and .scratch by name, but prescribes unverified ticket layout, comment, hierarchy and claim-state conventions.
- Criterion 2: 1. Limits role mappings to selected consumers and makes ready-for-agent conditional on an implementation/ticketing need.
- Criterion 3: 1. Uses one domain context and says not to create a duplicate CLAUDE.md.

### control response

Keep AGENTS.md and its user rules intact. Propose only a short additive section identifying the existing .scratch issue workflow and the location of its conventions, using the repository’s actual paths when inspected. Do not replace the tracker or introduce a second one.

There is no stated need for CLAUDE.md, so do not create a duplicate instruction file just because it is absent. Avoid references to a triage skill that is not installed; leave triage manual or document that installation as a separate optional step. With one package, use its existing commands instead of adding multi-package orchestration.

This is a dry-run proposal; configuration has not changed.

**Judgment:** 3/3. 

- Criterion 1: 1. Keeps AGENTS.md/user rules and existing .scratch issue workflow, using actual paths when inspected.
- Criterion 2: 1. Avoids references to the uninstalled triage skill and does not add triage labels.
- Criterion 3: 1. Avoids CLAUDE.md duplication and multi-package orchestration for one package.

## stress: setup-matt-pocock-skills-S

Verify existing setup only: AGENTS.md references docs/agents/issue-tracker.md, which is missing; custom triage labels are intentional. User says do not rewrite anything. Report drift and repair proposal.

### Frozen criteria

1. Reports missing reference without writing files
2. Preserves intentional custom labels
3. Does not require a separate verify skill or reset configuration

### source response

The known drift is a broken configuration pointer: AGENTS.md references docs/agents/issue-tracker.md, but that target is missing. Skills relying on it cannot discover the intended issue workflow from that reference.

The custom triage labels are intentional configuration, not drift. Keep their mappings intact.

Repair proposal: recover or reconstruct the missing tracker document from the repository’s actual existing workflow, then check that AGENTS.md points to the correct file. If the workflow is documented elsewhere, changing the pointer may be smaller than creating a duplicate document. The fixture does not establish which alternative applies.

Verification-only status: missing target identified; intended tracker details remain unverified. No files or labels have been rewritten.

**Judgment:** 3/3. 

- Criterion 1: 1. Reports the broken pointer and explicitly says no files or labels were rewritten.
- Criterion 2: 1. Keeps intentional custom label mappings intact.
- Criterion 3: 1. Proposes recovery or a smaller pointer correction without reset/separate skill.

### refactor response

Verified fixture drift: AGENTS.md points to docs/agents/issue-tracker.md, but that target is missing. Agents following the pointer cannot discover the repository's tracker operations. The custom triage labels are intentional, so they are not drift merely because they differ from defaults.

Proposed repair: first locate any existing authoritative tracker guide. If it moved, update the pointer to that guide; if it is absent, restore a minimal guide reflecting the current tracker and custom role mappings. Verify each required operation and the resulting pointer before claiming setup works.

This is a verify-only report. No file has been rewritten, no labels renamed, and no external tracker capability has been tested in this fixture.

**Judgment:** 3/3. 

- Criterion 1: 1. Identifies the fixture's missing target and states no file has been rewritten.
- Criterion 2: 1. Treats custom labels as intentional and preserves their role mappings.
- Criterion 3: 1. Proposes locating/restoring the relevant guide with no reset or additional verify skill.

### control response

The fixture identifies one setup drift: AGENTS.md points to docs/agents/issue-tracker.md, but that file is missing. The instruction link therefore cannot supply the promised tracker guidance. The custom triage labels are intentional and are not a defect to normalize.

Proposed repair: inspect whether the tracker guidance moved elsewhere. If so, update only the reference to its real location. If it was deleted accidentally, restore the intended document from an authoritative source. If no guidance exists, draft a minimal document describing the current tracker and custom labels for review.

The user requested verification only, so no file or label changes are proposed as already performed.

**Judgment:** 3/3. 

- Criterion 1: 1. Reports the missing issue-tracker target and presents repairs as proposals, not performed writes.
- Criterion 2: 1. Calls custom labels intentional, not a defect to normalize.
- Criterion 3: 1. Suggests targeted pointer/guide repair without a separate verify skill or reset.

## non-trigger: setup-matt-pocock-skills-X

Explain what an issue tracker is without configuring this folder.

### Frozen criteria

1. Explains concept without setup mutations

### source response

An issue tracker records work items, questions, and problems so people can follow their status, discussion, and ownership.

**Judgment:** 1/1. 

- Criterion 1: 1. Defines an issue tracker as work/problem/status/discussion/ownership records without setup.

### refactor response

An issue tracker records work such as bugs, feature requests, and tasks, along with their status, discussion, and ownership.

**Judgment:** 1/1. 

- Criterion 1: 1. Defines issue tracking for bugs/features/tasks and their status/discussion/ownership.

### control response

An issue tracker is a shared place to record work requests, bugs, and tasks, including their status, owner, and discussion.

**Judgment:** 1/1. 

- Criterion 1: 1. Defines a shared record of work requests, bugs/tasks, status/owner/discussion; no mutation.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.

<!-- POST-TRIAL -->
# Later targeted evidence

These post-review text probes are distinct from the first comparison above. They test the stated local behavior and do not establish a collaboration gain or live execution.

## setup-existing-schema-repair

**Input:** Setup dry run. The repository has AGENTS.md and a local issue workflow. Verified layout: all issues live in .scratch/ISSUES.md with opaque IDs such as Q9; state is Open or Done; comments are dated bullets below each item; it has no parent links and one package. Keep that workflow. No triage skill is selected. Describe the minimal configuration changes; do not write files.

**Actual response:**

The minimal setup preserves the existing single-file tracker.

1. Add or reconcile docs/agents/issue-tracker.md to document .scratch/ISSUES.md as the authoritative tracker. Resolve items by their exact opaque IDs, such as Q9; read each full item and its dated comment bullets; append comments in that same format; and close an item by changing its state from Open to Done. Preserve the existing item format when creating issues. Do not introduce numbered ticket files, per-feature directories, or replacement status names.
2. Add or update one Agent skills pointer block in the instruction file the active harness reads, pointing to that tracker document. Use AGENTS.md if it is that entry point, preserving its existing content and any deliberate pointer arrangement. The fixture confirms that AGENTS.md exists, but does not establish which file the harness consumes.

Document that parent links are unsupported. Blocking relationships are separate: their representation, if any, is not supplied here, so leave that capability unresolved rather than adding a field or treating parent membership as blocking. The exact ID-allocation rule for creating new items is also unspecified; do not derive it from the example Q9. Label/category, readiness, and claim operations would need their existing conventions confirmed if a selected downstream workflow requires them. No triage mapping is needed on the supplied scope; a different selected workflow could still require role mappings.

Keep one domain context for the single package. No domain split, speculative CONTEXT.md or ADRs, tracker migration, or remote provisioning is called for. This is a dry run: these are proposed document changes, and no files have been written.

**Independent judgment:** 3/3. All three assertions are met in the response text. The conditional choice of the active harness instruction entry point does not discard AGENTS.md and avoids assuming an unprovided harness detail. This grade assesses the proposed text only; it does not verify configuration changes, file execution, or workflow efficacy.

- Preserves the actual single-file layout and opaque IDs without requiring a migration. **1.** Assertion 1 met: identifies .scratch/ISSUES.md as the authoritative single-file tracker, resolves exact opaque IDs such as Q9, and explicitly rules out replacement ticket files, directories, status names, or tracker migration.
- Documents only the supplied observed schema or clearly marks missing operations as unresolved. **1.** Assertion 2 met: uses the supplied Open/Done states and dated comment bullets, records parent links as unsupported, and leaves blocking representation, ID allocation, and any needed label, readiness, claim, or role conventions unresolved rather than inventing them.
- Preserves AGENTS.md, one context, dry-run scope and absence of unused triage configuration. **1.** Assertion 3 met: proposes only a tracker document and one pointer block while preserving AGENTS.md content and deliberate pointers; retains one domain context for the single package; says no triage mapping is needed and explicitly describes all changes as a dry run with no files written.
