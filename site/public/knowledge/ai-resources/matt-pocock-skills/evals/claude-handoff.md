# Development evaluation: claude-handoff

**Case-bound grades:** source A; refactor A; no-supplied-skill control A.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 7/7 | 3/3 | A |

## normal: claude-handoff-N

Prepare a background handoff for a fix at commit abc123, spec /project/spec.md, remaining check CSV quoting. This host offers a generic child-agent API but no Claude executable. Propose the handoff and how launch would be verified; do not actually launch.

### Frozen criteria

1. Carries scope, pointers and next action
2. Adapts to available host rather than inventing a Claude command result
3. Requires actual returned launch/status evidence before claiming running

### source response

Proposed child-agent name: **Verify CSV quoting**.

Handoff prompt: “Continue the fix at commit abc123. Read /project/spec.md as the authoritative specification. The remaining check is CSV quoting; establish its actual result and repair the implementation only if needed. Report what ran, what it showed, and any remaining limitations. Suggested skills: tdd for a repair and code-review for final assessment.”

This host has no Claude executable, so the prescribed Claude launch is unavailable. The generic child-agent API is a possible substitute only with a compatible workspace and access to the commit and spec. Launch verification would require a returned agent identifier, a running/accepted status, and confirmation it can read those inputs—not merely a constructed prompt. Nothing has launched.

**Judgment:** 3/3. 

- Criterion 1: 1. Carries abc123, specification path, CSV quoting check and repair/report next action.
- Criterion 2: 1. Recognizes absent Claude executable and conditions substitution on compatible input access.
- Criterion 3: 1. Requires actual agent ID, accepted/running status and readable inputs; says nothing launched.

### refactor response

Prepared handoff: “Continue the CSV fix at candidate commit abc123. Read /project/spec.md, verify current working changes and ownership, then check CSV quoting through the agreed export seam. Record actual results and preserve unrelated work. Suggested capability: tdd for meaningful regression protection.”

A generic child-agent API does not establish that a Claude session can launch. This host has no Claude executable, so do not silently substitute a different provider or create a user-owned chat.

If an equivalent authorized runtime is available, verify its provider, background continuation support, working directory, prompt transport, and launch receipt. Only a successful job identifier and inspectable running status support a launch claim. Here the handoff is prepared but continuation has not started.

**Judgment:** 3/3. 

- Criterion 1: 1. Carries candidate abc123, spec path, quoting check, ownership and actual-result reporting.
- Criterion 2: 1. Rejects assuming a generic API establishes a Claude runtime and verifies runtime compatibility.
- Criterion 3: 1. Requires a successful job ID plus inspectable running status; says continuation has not started.

### control response

Proposed handoff: “Continue the CSV fix at commit abc123. Read /project/spec.md if it is accessible in your execution environment. The remaining check is CSV quoting: verify commas, embedded quotation marks, and embedded newlines round-trip through export and parsing. Report the actual check results and any changes.”

This host has no Claude executable, so do not describe a generic child-agent launch as a Claude launch. The generic API is a possible alternative if acceptable and supplied with access to the candidate and spec.

Verify launch through a returned agent identifier and a subsequent status or acknowledgement confirming the task and access. This is a proposal only; nothing has launched.

**Judgment:** 3/3. 

- Criterion 1: 1. Carries commit abc123, /project/spec.md, remaining CSV quoting checks and actual-result reporting.
- Criterion 2: 1. Acknowledges no Claude executable and describes the generic API only as a compatible alternative.
- Criterion 3: 1. Requires returned agent ID and status/acknowledgement confirming inputs; says nothing launched.

## stress: claude-handoff-S

A handoff summary includes a secret and an unshared local path; original worker still edits the same file. Identify and repair launch risks while preserving useful continuation.

### Frozen criteria

1. Removes secret and deals with inaccessible pointer
2. Establishes nonconflicting ownership or isolated work
3. Does not equate dispatch with completion

### source response

Three launch risks need repair: the secret would leak into another prompt, the local path may be inaccessible to the recipient, and concurrent edits could overwrite or invalidate the handoff.

Remove the secret from the summary and refer only to the approved credential mechanism if the task needs it. Replace the unshared path with a verified accessible artifact or arrange an authorized transfer; mark that transfer pending until confirmed. Establish ownership with the original worker and hand off a stable commit or snapshot. Use an isolated checkout for separate work, or wait for the original worker to stop editing the shared file.

Retain the goal, remaining check, actual evidence, and suggested skills. Verify launch and input access afterward; neither is established here.

**Judgment:** 3/3. 

- Criterion 1: 1. Removes the secret and requires a verified accessible artifact or confirmed authorized transfer.
- Criterion 2: 1. Requires stable snapshot/ownership and isolated checkout or waiting for the other writer to stop.
- Criterion 3: 1. Says launch/input access remain unestablished; claims no completion.

### refactor response

Remove the secret from the handoff; retain only a required credential's variable name and authorized acquisition mechanism if needed. Do not quote the sensitive value into a launch command or output.

The local path is not portable. Package the required nonsecret artifact or replace the pointer with an authorized shared location, then have the receiver verify access before editing. Preserve the goal, candidate revision, completed checks, and exact next action.

Resolve the competing writer before launch: establish an explicit ownership transfer and stop the original worker's edits, or give the successor a separate nonconflicting scope. Mark the currently owned file in the handoff. Verify one launch receipt before retrying an uncertain launch. No secret transfer, artifact transfer, ownership change, or agent launch has occurred.

**Judgment:** 3/3. 

- Criterion 1: 1. Removes secret values and packages nonsecret inputs/shared pointers with receiver access verification.
- Criterion 2: 1. Requires explicit ownership transfer and writer stop, or a separate nonconflicting scope.
- Criterion 3: 1. Distinguishes receipt verification from unperformed transfer/ownership/launch actions; no completion claim.

### control response

Remove the secret from the handoff and review any attached transcript or artifact for the same exposure. Provide needed credentials only through an appropriate secret channel if the new worker actually needs them; the summary should state how access is arranged, not include the value.

Replace the unshared path with an accessible, sanitized copy or a portable artifact, then verify the recipient can obtain it. Keep the candidate revision, remaining checks, and relevant failure evidence in the continuation note.

Finally, resolve ownership: pause or transfer the original worker’s edits, or give the new worker an isolated checkout and an explicit integration plan. Do not launch two writers against the same file without coordination.

**Judgment:** 3/3. 

- Criterion 1: 1. Removes the secret and replaces the unshared pointer with accessible sanitized material plus recipient access check.
- Criterion 2: 1. Requires transfer/pause or isolated checkout with an integration plan.
- Criterion 3: 1. Proposes prerequisite repairs and makes no dispatch or completion claim.

## non-trigger: claude-handoff-X

Write a summary for me only; do not start or message another agent.

### Frozen criteria

1. Provides summary without dispatch

### source response

Please provide the material to summarize; I’ll return the summary here without starting or messaging another agent.

**Judgment:** 1/1. 

- Criterion 1: 1. Asks for material to summarize here without starting/messaging another agent.

### refactor response

Please provide the material to summarize. I will return the summary here and will not start or message another agent.

**Judgment:** 1/1. 

- Criterion 1: 1. Asks for missing material and explicitly refuses dispatch.

### control response

Please provide the material to summarize. I’ll return the summary here without starting or messaging another agent.

**Judgment:** 1/1. 

- Criterion 1: 1. Asks for the missing summary material and says it will not start/message another agent.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
