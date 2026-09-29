# Development evaluation: writing-for-agents

**Case-bound grades:** source A; refactor A; no-supplied-skill control A.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 7/7 | 3/3 | A |

## normal: writing-for-agents-N

Rewrite this agent instruction for a small local CSV exporter: "Always be excellent. Read everything. Ask permission before any change. Finish when done." The actual invariant is that quoted commas and newlines must round-trip, and a failed export must preserve the previous file. Give usable instructions and a way to verify them.

### Frozen criteria

1. Preserves both CSV round-trip and previous-file-on-failure invariants
2. Gives observable verification rather than defining success as completion
3. Removes irrelevant universal process overhead

### source response

Implement the CSV exporter so every field survives export and re-import unchanged, including embedded commas, double quotes, and newlines. Read the exporter, its callers, and existing tests to find the current format and write path. Keep the previous export intact until the replacement has been fully written successfully; use a temporary file and a safe replacement operation suited to the filesystem.

Verify through the public export seam: export rows containing “a,b”, an embedded quote, and a multiline field, then parse them with an independent CSV parser and compare exact values. Inject a write failure with an existing destination file and assert its bytes remain unchanged. Completion requires these checks to pass and a report of the commands and results; identify any checks that could not run.

**Judgment:** 3/3. 

- Criterion 1: 1. Requires exact comma/quote/newline round trips and preserves the previous export until safe replacement.
- Criterion 2: 1. Specifies independent CSV parsing, exact comparisons, and injected-write-failure byte checks.
- Criterion 3: 1. Limits reading to exporter, callers, and tests; removes read-everything and blanket permission demands.

### refactor response

Fix the local CSV exporter so quoted commas and embedded newlines round-trip exactly. Read the exporter and its existing tests; inspect other files only when a dependency requires it. Preserve unrelated edits.

Write to a temporary file beside the destination, finish and close it successfully, then replace the destination using the platform's supported atomic operation. If serialization, writing, or replacement fails, report failure and leave the previous destination intact.

Verify a round-trip containing a comma, a quoted word, and an embedded newline against literal original values. Inject a write failure with an existing destination and compare its bytes before and after. Finish with the changed files, checks actually run, and any unmet invariant.

**Judgment:** 3/3. 

- Criterion 1: 1. Requires exact quoted-field round trips and says serialization, write, or replacement failure leaves the previous destination intact.
- Criterion 2: 1. Compares literal original values and destination bytes after an injected failure.
- Criterion 3: 1. Scopes reading to exporter/tests and dependencies; no blanket permission requirement.

### control response

Implement the CSV exporter so every field survives a write-and-read round trip, including commas, quotation marks, and embedded newlines. Escape embedded quotes by doubling them and quote fields containing delimiters, quotes, or line breaks. Write to a temporary file in the destination directory; replace the previous export only after the new file is fully written and closed. On failure, retain the previous export and report the error.

Verify through the export interface: export records containing ordinary text, a comma, an embedded quote, and a multiline field, then parse the CSV and compare every field with the originals. Inject a write failure and confirm the previous file remains byte-for-byte unchanged.

**Judgment:** 3/3. 

- Criterion 1: 1. Requires comma/quote/newline round trips and retaining the previous export on failure.
- Criterion 2: 1. Checks parsed fields against originals and prior bytes after an injected write failure.
- Criterion 3: 1. Gives only relevant CSV/write instructions and verification, without universal process overhead.

## stress: writing-for-agents-S

A 30-line source skill routes to a 400-line provider reference only for one provider. A proposed rewrite inlines the reference, deletes a warning about duplicate charges on retry, and says "use best judgment". Review this change and suggest the smallest justified repair.

### Frozen criteria

1. Retains the retry/duplicate-charge invariant
2. Keeps conditional detail discoverable without loading it universally
3. Explains a concrete repair rather than praising brevity alone

### source response

Keep the short router and restore the duplicate-charge warning. The provider reference belongs behind a conditional pointer because only one provider needs it; inlining 400 lines makes unrelated runs carry that branch.

Smallest repair: “When using Provider X, read the provider reference before issuing or retrying a charge. An uncertain response may already represent a successful charge; follow the reference’s reconciliation and retry rules before trying again.” Preserve the reference’s actual conditions rather than replacing them with “use best judgment.”

Review the diff for other lost constraints, then exercise two text scenarios: a different provider should stay on its own route, and an uncertain Provider X charge must reach the retry warning. This proposal has not been tested.

**Judgment:** 3/3. 

- Criterion 1: 1. States an uncertain response may already be successful and requires reconciliation/retry rules.
- Criterion 2: 1. Keeps provider detail behind a conditional pointer.
- Criterion 3: 1. Supplies replacement routing text and two proposed scenarios to check it.

### refactor response

The rewrite removes a real safety constraint and makes every invocation pay for one provider's reference. “Use best judgment” does not preserve the warning's operational meaning.

Keep the short entrypoint and restore a precise pointer: “When using provider X, read the provider reference before submitting or retrying a charge.” Restore the original duplicate-charge warning beside its retry guidance; do not invent a new retry guarantee.

Retain any common obligations in the entrypoint. No broader restructuring is justified by the facts given. Compare a provider-X retry case, another provider's ordinary case, and a nearby non-trigger request before claiming improvement. Those trials have not run; this is a proposed repair.

**Judgment:** 3/3. 

- Criterion 1: 1. Restores the original duplicate-charge warning beside retry guidance without inventing guarantees.
- Criterion 2: 1. Keeps the short entrypoint and provider-specific reference pointer.
- Criterion 3: 1. Specifies a scoped restoration and proposed provider, other-provider, and non-trigger trials.

### control response

The rewrite increases every reader’s context burden while removing the most consequential constraint. “Use best judgment” does not replace an explicit warning about duplicate charges; a retry after an ambiguous result may repeat a successful payment.

Restore the short provider routing instruction and keep the 400-line reference separate. Restore the duplicate-charge warning in the relevant provider path, with a concise instruction to check the prior request’s result or use the provider’s supported idempotency mechanism before retrying. Preserve unrelated source text. Check that the provider link resolves and that an ambiguous payment outcome leads to verification rather than an unconditional retry. No wider rewrite is justified by these facts.

**Judgment:** 3/3. 

- Criterion 1: 1. Restores the duplicate-charge warning and requires prior-result checking or supported idempotency before retry.
- Criterion 2: 1. Restores the short provider router and keeps the 400-line reference separate.
- Criterion 3: 1. Names the exact warning/pointer repair and checks link resolution plus ambiguous-payment behavior.

## non-trigger: writing-for-agents-X

Fix the punctuation in this sentence only: "The job finished but the report didnt."

### Frozen criteria

1. Provides corrected sentence without an instruction-design workflow

### source response

The job finished, but the report didn’t.

**Judgment:** 1/1. 

- Criterion 1: 1. Returns only the sentence with a comma and the apostrophe in didn't.

### refactor response

The job finished, but the report didn't.

**Judgment:** 1/1. 

- Criterion 1: 1. Returns only: The job finished, but the report didn't.

### control response

The job finished, but the report didn’t.

**Judgment:** 1/1. 

- Criterion 1: 1. Returns only the sentence with a comma and the apostrophe in didn't.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
