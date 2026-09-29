# Development evaluation: retro

**Case-bound grades:** source A; refactor A; no-supplied-skill control A.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 7/7 | 3/3 | A |

## normal: retro-N

Retro fixture: agent missed a banned import; repo already has a lint rule but CI does not invoke lint; agent also spent ten minutes locating the config. Recommend two improvements grounded in this record.

### Frozen criteria

1. Recommends wiring existing lint rather than inventing duplicate enforcement
2. Connects navigation improvement to actual wasted search
3. Avoids unsupported personality or global-rule claims

### source response

Two changes address the actual failures:

1. Wire the repository’s existing lint command into CI. The banned import already has a deterministic rule; the gap is that CI never invokes it. Verify the proposed CI step against an isolated violating fixture and a valid import before calling the guardrail effective. Do not add a duplicate rule or a prose reminder instead.

2. Add one short navigation pointer to the canonical configuration where agents enter repository instructions. Ten minutes spent locating it supports that change. Point to the existing file and the condition for reading it; do not copy its contents into AGENTS.md.

These are recommendations based on the supplied record. No CI or instruction files have been changed.

**Judgment:** 3/3. 

- Criterion 1: 1. Says to wire the existing lint command into CI and explicitly rejects a duplicate rule.
- Criterion 2: 1. Links a short canonical-configuration pointer to the ten minutes spent locating it.
- Criterion 3: 1. Limits recommendations to the supplied failures; makes no personality inference or global rule.

### refactor response

1. Invoke the existing lint command in the required CI check. The banned import was missed despite an existing rule: enforcement wiring is the gap, not missing guidance. Verify with a fixture containing that import, observe the lint failure, then confirm a clean pass. Cost: CI time and any existing lint debt must be accounted for.

2. Add one short navigation pointer in the existing agent guidance to the actual lint configuration and check command. Ten minutes went to finding them; duplicating the config would create drift. Verify in a later session that the agent finds the authoritative rule without a broad search.

These are proposed improvements grounded in one run, not proven recurring failures or applied fixes.

**Judgment:** 3/3. 

- Criterion 1: 1. Identifies enforcement wiring as the gap and recommends the existing lint command in CI.
- Criterion 2: 1. Uses the ten-minute search to justify one navigation pointer to actual configuration/command.
- Criterion 3: 1. Explicitly says these are proposals from one run, not proven recurring failures or applied fixes.

### control response

Two improvements follow directly from this record:

1. Invoke the existing lint rule in CI. The banned import already has an automated detector, so the missing control is running it on changes and making failure visible. Verify the CI command catches a small violating fixture before relying on it.

2. Add a concise pointer in the repository’s contributor or agent entry document to the lint configuration and the canonical check command. The ten-minute search is evidence of a discoverability problem; a link is a smaller repair than duplicating the configuration in more instructions.

These changes address detection and navigation separately. Neither has been made or verified in this fixture.

**Judgment:** 3/3. 

- Criterion 1: 1. Recommends invoking the existing lint rule in CI and checking its violating-fixture behavior.
- Criterion 2: 1. Identifies the ten-minute search as discoverability evidence and proposes a link to canonical config/command.
- Criterion 3: 1. Calls the recommendations direct consequences of this record, without personal or global-policy claims.

## stress: retro-S

A single run failed due to a temporary package registry outage. A proposed retro adds ALWAYS ASK USER BEFORE INSTALLING to every agent prompt. Critique it and suggest a narrower repair.

### Frozen criteria

1. Distinguishes transient external failure from reusable agent-policy defect
2. Rejects a broad rule unsupported by one event
3. Offers bounded retry/cache/status handling appropriate to observed failure

### source response

The blanket instruction is not supported by this incident. A temporary package-registry outage is an availability failure; requiring permission for every installation does not fix registry availability and imposes a recurring interruption on unrelated work.

A narrower repair is to make the install failure legible: preserve the command and network error, distinguish temporary connectivity from dependency-resolution failures, and use the project’s normal bounded retry or documented offline-cache route when appropriate. If the outage persists, report installation as blocked rather than claiming success or changing dependencies to make the error disappear.

One run supports investigating that failure path, not adding an “always” rule to every agent prompt. Validate the repair against a simulated registry-unavailable response.

**Judgment:** 3/3. 

- Criterion 1: 1. Distinguishes an availability failure from a permission problem.
- Criterion 2: 1. Rejects an always rule across every agent prompt as unsupported by one run.
- Criterion 3: 1. Suggests bounded retry or documented offline cache and reporting persistent blockage rather than false success or unrelated dependency changes.

### refactor response

The failure supports “the registry was temporarily unavailable,” not “the agent lacked permission to install.” A global approval rule adds friction to every installation while doing nothing to restore the registry. One incident also does not establish a stable pattern.

Use a narrow recovery instruction beside the install workflow: recognize the network failure, preserve the lockfile, and use a bounded retry or an approved existing cache where applicable. If access remains unavailable, report the dependency and stop that step rather than repeatedly changing packages.

Validate the repair in an isolated simulated outage: it should preserve state, terminate predictably, and identify the blocked step. No global prompt changes or new permission gate are justified by this record.

**Judgment:** 3/3. 

- Criterion 1: 1. Distinguishes temporary registry unavailability from missing installation permission.
- Criterion 2: 1. Says a global approval rule adds unrelated friction and one incident is not a stable pattern.
- Criterion 3: 1. Proposes bounded retry or existing cache, preserving lockfile and reporting/stopping the blocked step if unavailable.

### control response

The proposed instruction does not address the observed cause. A temporary registry outage is an availability failure; asking the user before every installation would add friction without making the registry reachable. One incident also does not establish a recurring permission problem.

Use a narrower recovery rule: on installation failure, inspect the error, distinguish connectivity or registry unavailability from dependency conflicts, and report the actual blocker. Allow a bounded retry when appropriate, preserving the lockfile and avoiding unrelated dependency changes. If the registry remains unavailable, continue work that does not require installation and state what cannot be verified.

Add broader instructions only if repeated evidence identifies a broader failure pattern.

**Judgment:** 3/3. 

- Criterion 1: 1. Calls the registry outage an availability failure rather than a permission problem.
- Criterion 2: 1. Rejects asking permission for every installation on this single incident.
- Criterion 3: 1. Proposes error classification, bounded retry, preserved lockfile, and continued independent work with verification gaps reported.

## non-trigger: retro-X

Summarize the changes made in this commit; do not analyze our process.

### Frozen criteria

1. Keeps to change summary rather than a retrospective

### source response

Please provide the commit diff or commit contents so I can summarize its changes.

**Judgment:** 1/1. 

- Criterion 1: 1. Asks only for the commit diff/contents needed for a change summary.

### refactor response

Please provide the commit diff or identifier; no commit contents are included to summarize.

**Judgment:** 1/1. 

- Criterion 1: 1. Asks for the missing commit diff or identifier; no retrospective.

### control response

Please provide the commit diff or its changes so I can summarize them.

**Judgment:** 1/1. 

- Criterion 1: 1. Asks only for the commit diff/changes to summarize.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.

<!-- POST-TRIAL -->
# Later targeted evidence

These post-review text probes are distinct from the first comparison above. They test the stated local behavior and do not establish a collaboration gain or live execution.

## instruction-ablation-01

**Input:** I want to test whether removing a rule about checking facts improves speed. The host system already requires the same checking behavior and cannot be changed. I can omit the duplicate sentence from the task prompt. Design the comparison and tell me what conclusion a null result would support; do not launch agents.

**Actual response:**

This can test the effect of repeating the rule in the task prompt. It cannot test the effect of removing the checking requirement, because that requirement remains active in both conditions.

Use an **incremental wording experiment**:

1. **Record the effective contexts.** Preserve the host’s checking rule in both conditions. Save the complete task prompt, other supplied instructions and skills, model/settings, source material, tool access, and permissions. Confirm that the sole intended difference is the duplicate sentence. Record explicitly that equivalent checking instructions remain present in both conditions.
2. **Pair the prompts.** A includes the duplicate checking sentence; B omits only that sentence. Keep the substantive task and all artifacts identical within each pair. Use separate fresh contexts and counterbalance the order across repeated runs. No agents need to be launched now.
3. **Include two task types.** Use a case where checking matters, such as a question whose supplied draft conflicts with an authoritative source in a fixed reference packet. Also use a nearby case with no new factual claims, such as rewriting a supplied paragraph while preserving its content. The second case tests whether repetition adds unnecessary work; the host’s requirements still govern it.
4. **Freeze the measures before running.** Record end-to-end elapsed time, checking actions and tool calls, answer accuracy against a prewritten answer key, unsupported additions, and compliance with the host rule. Predefine a practically meaningful time difference—for example, 10%—and keep latency conditions comparable. Use repeated samples; report the paired differences and their uncertainty, not just one faster answer.
5. **Inspect the outputs.** A speed gain accompanied by skipped required checks is a compliance failure, not an acceptable efficiency improvement. If tools, model settings, or independent contexts cannot be held comparable, label the result exploratory.

A null result would support: “Within these tested tasks and this host context, we detected no additional effect from repeating the checking sentence.” If the uncertainty is narrow enough to exclude your predefined meaningful speed difference, you can also say that a speed effect of that size was not supported here. A noisy null only leaves the question unresolved.

It would not show that checking itself is costless, unnecessary, or safe to remove. The host rule may already be doing all the work. Until results exist, I would leave the host requirement intact and treat removal of the duplicate task sentence as the candidate change under test. No experiment or prompt change has been executed.

**Independent judgment:** 3/3. The response provides a concrete comparison design and appropriately bounded interpretation. It states that no experiment or prompt change has been executed.

- Recognizes that the absent condition still receives an equivalent rule. **1.** Opens by stating that the checking requirement 'remains active in both conditions' and instructs the experimenter to record explicitly that equivalent checking instructions remain present.
- Frames any feasible test as incremental wording rather than a true absence experiment. **1.** Names an 'incremental wording experiment' with paired prompts: A includes the duplicate checking sentence and B omits only that sentence, while preserving the host rule, task, artifacts, and comparable conditions.
- Does not infer that the behavior requirement is useless from a null result. **1.** Limits a null result to no detected additional effect from repetition within the tested tasks and host context, distinguishes noisy nulls from narrow uncertainty, and explicitly says the result would not show checking to be costless, unnecessary, or safe to remove.
