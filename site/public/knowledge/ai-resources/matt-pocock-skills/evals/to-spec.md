# Development evaluation: to-spec

**Case-bound grades:** source A; refactor A; no-supplied-skill control A.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 7/7 | 3/3 | A |

## normal: to-spec-N

Synthesize a spec from settled context: users can export visible table rows as CSV; filters apply; downloaded filename is reports.csv; no background jobs; existing export service is the agreed test seam. Publication is out of scope. Give the spec now, with no interview.

### Frozen criteria

1. Includes filters, filename, and no-background-job boundary
2. Uses agreed seam with checkable acceptance examples
3. Does not add an interview or publish anything

### source response

## Problem Statement
Users need a CSV download containing the table rows they are viewing under the active filters.

## Solution
Export the visible rows as a download named reports.csv.

## User Stories
1. As a table user, I want active filters applied to export so the download matches the visible selection.
2. As a table user, I want a CSV file named reports.csv so I can identify and use the result.

## Implementation Decisions
Reuse the existing export service. Export is initiated directly; no background jobs.

## Testing Decisions
The existing export service is the agreed seam. Verify a filtered table produces exactly the visible rows, excludes nonmatching rows, and uses reports.csv. Test observable output rather than private helpers.

## Out of Scope
Background jobs and publication. This specification has not been published.

**Judgment:** 3/3. 

- Criterion 1: 1. Names filtered visible rows, reports.csv, and direct export without background jobs.
- Criterion 2: 1. Names the existing service seam and observable checks for included/excluded rows and filename.
- Criterion 3: 1. Provides specification sections immediately and says publication is out of scope and not performed.

### refactor response

Draft specification — Export visible rows

Problem: users need a CSV containing the records currently shown after filtering.

Required behavior:
- A user can export the visible table rows as CSV.
- Active filters apply to the exported rows; excluded rows are absent.
- The download filename is exactly reports.csv.
- Export runs without a background job.

Implementation decision: use the existing export service as the agreed testing seam.

Acceptance: supply distinguishable matching and nonmatching rows, apply a filter, and assert that the service's CSV contains exactly the visible rows. Verify the download filename at the existing download boundary.

Out of scope: background jobs and publication. No additional format or delivery behavior is assumed. This is the requested local spec content; it has not been published.

**Judgment:** 3/3. 

- Criterion 1: 1. Requires active filters, exactly reports.csv, and no background job.
- Criterion 2: 1. Uses the export-service seam with distinguishable matching/nonmatching rows and filename verification.
- Criterion 3: 1. Supplies the spec directly, excludes publication, and asks no interview questions.

### control response

CSV export specification

Users can export the rows currently visible in the table. Active filters must apply to the exported rows, so excluded records are not included. The downloaded filename is reports.csv. The export runs through the existing export service; no background job is introduced.

Acceptance criteria:
- With a filter selecting a subset, the CSV contains that subset’s visible rows and excludes filtered-out rows.
- With filters cleared, the CSV reflects the rows visible in that state.
- The download is named reports.csv.
- Tests exercise the agreed existing export-service seam and verify parsed CSV content against expected records.

Publication is outside this specification.

**Judgment:** 3/3. 

- Criterion 1: 1. Specifies visible filtered rows, reports.csv, and no background job.
- Criterion 2: 1. Tests the agreed service seam with parsed CSV records, filtered subsets, and cleared filters.
- Criterion 3: 1. Gives the spec without questions and keeps publication outside its scope.

## stress: to-spec-S

Turn this into a spec: user said CSV only; assistant suggested XLSX but user never accepted it; prototype suggested UTF-8 BOM but no decision exists. There is no tracker configuration. Produce useful local draft content, showing what remains unresolved.

### Frozen criteria

1. Keeps CSV requirement separate from unaccepted XLSX proposal
2. Marks BOM unresolved rather than silently deciding
3. Provides useful draft without inventing tracker setup or publication

### source response

## Local draft: CSV export

**Problem and solution:** Provide the CSV export requested by the user.

**User story:** As a user, I want CSV output so I can use the exported data in tools that accept CSV.

**Settled scope:** CSV only. XLSX was an assistant suggestion and is not an accepted requirement.

**Unresolved:** Whether the CSV should include a UTF-8 BOM. The prototype supplies a candidate, not a decision. Row selection, filename, encoding details, and an agreed test seam are not established in the supplied context.

**Testing proposal:** Prefer an existing public export seam, once identified, and verify the agreed output externally.

**Publication:** This remains a local draft. No tracker configuration is supplied; /setup-matt-pocock-skills can configure it if publication is later requested.

**Judgment:** 3/3. 

- Criterion 1: 1. States CSV only and identifies XLSX as an unaccepted assistant suggestion.
- Criterion 2: 1. Lists BOM under 'Unresolved' and says the prototype supplies a candidate, not a decision.
- Criterion 3: 1. Provides settled scope, unknowns, and proposed tests; states no tracker configuration is supplied and publication remains conditional.

### refactor response

Local draft — CSV export

User requirement: export in CSV format only.

Required behavior: the export must produce CSV. XLSX is excluded: it was suggested by the assistant but never accepted by the user.

Unresolved: whether UTF-8 output includes a byte-order mark. The prototype's BOM is evidence of an experiment, not an agreed requirement. Record the choice as pending and identify any downstream consumer compatibility requirement before settling it.

Testing: verify CSV output through an existing suitable export boundary once identified; do not assert a BOM expectation until that decision is made.

Publication: no tracker configuration exists. This draft is unpublished and is not ready for implementation where the encoding decision matters. No file or tracker item has been created in this fixture.

**Judgment:** 3/3. 

- Criterion 1: 1. Requires CSV only and excludes XLSX because the user never accepted it.
- Criterion 2: 1. Marks BOM pending and forbids asserting a BOM expectation until decided.
- Criterion 3: 1. Provides scope and proposed test boundary; says no tracker exists and no item/file was created.

### control response

Local draft specification

Confirmed requirement: provide CSV export. CSV is the only accepted output format. XLSX is an unaccepted assistant suggestion and is excluded from this draft’s requirements.

Acceptance criterion: the export produces parseable CSV for the agreed dataset. A complete acceptance case still needs the exported row scope, columns, and expected values; these are not supplied here.

Open decision: whether to include a UTF-8 byte-order mark. The prototype’s choice is evidence of a prototype behavior, not user approval. Resolve this using intended spreadsheet consumers and compatibility needs before treating it as required.

No tracker configuration is available. This is draft content only; no ticket, file, or publication has been created.

**Judgment:** 3/3. 

- Criterion 1: 1. Defines CSV as the only accepted format and excludes the unaccepted XLSX suggestion.
- Criterion 2: 1. Names BOM as an open decision and separates prototype behavior from user approval.
- Criterion 3: 1. Provides a parseable-CSV criterion and remaining acceptance gaps; no tracker, file, or publication is claimed.

## non-trigger: to-spec-X

Explain what a software specification is in two sentences.

### Frozen criteria

1. Explains the concept without synthesizing or publishing a project spec

### source response

A software specification describes what a system or feature must do and the constraints it must satisfy. It gives implementers and reviewers a shared basis for deciding whether the result meets the intended need.

**Judgment:** 1/1. 

- Criterion 1: 1. Defines a specification and its implementer/reviewer purpose without creating or publishing one.

### refactor response

A software specification describes the behavior a system must provide and the constraints it must satisfy. It gives builders and reviewers a shared basis for deciding whether the result meets the agreed requirements.

**Judgment:** 1/1. 

- Criterion 1: 1. Explains required behavior, constraints, and shared evaluation basis without a project spec.

### control response

A software specification describes what a system must do, its constraints, and how acceptable behavior will be recognized. It gives people building and reviewing the system a shared reference for requirements.

**Judgment:** 1/1. 

- Criterion 1: 1. Explains specification behavior, constraints, and shared requirements in two sentences without project authoring.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
