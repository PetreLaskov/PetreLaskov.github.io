# Resolving Merge Conflicts — combine intentions, not marker blocks

**Study question:** how can a merge compile and still erase somebody's work?

## Understand the original

The source is a five-step skill. Inspect the in-progress merge or rebase, recover the primary sources behind each change, resolve each hunk by intent, run the project's checks, and finish the operation. Its distinctive contribution is the second step. A conflict is not merely two strings competing for a place in a file; it is two changes made for reasons that may be compatible even when their text is not. [S1]

Commit messages, pull requests, and original issues help reconstruct those reasons. If both branches touch the same validation function, one may add support for a new identifier format while the other closes an input-validation gap. Choosing one side wholesale can silently remove the other behavior. A careful resolution composes both when possible and names a tradeoff when the intentions genuinely conflict.

The skill also insists on finishing. It does not stop when markers disappear. It discovers and runs the repository's checks, fixes merge-induced failures, and continues every remaining step of a rebase. The source's “never abort” rule expresses persistence: the user invoked a resolver because the merge is intended to happen. Aborting returns to the same problem later. [S2]

This is a small skill with a narrow margin over a capable base model. The documentation admits that. It exists to make source recovery and verification routine rather than optional. There is no issue-tracker setup dependency, no elaborate report template, and no claim to redesign the combined feature.

## A worked example

One branch changes an upload endpoint to reject files above a size limit. Another replaces the storage client and changes the error-handling structure. The conflict appears in a few lines around the upload call. Taking the new client branch as-is may discard the limit; taking the old branch may restore a deprecated client.

The resolver should read both changes and their tests. The size-limit ticket may clarify whether the limit applies to compressed or original bytes. The storage migration may require a different stream ownership contract. A correct resolution preserves the limit at the appropriate point in the new flow, uses the new client, and retains the intended error outcome. That can produce code which is not textually identical to either branch while still inventing no new product behavior.

Checks need to target both intentions. A compilation pass proves only that the new client is called in a valid way. A size-limit test protects the rejected upload. A storage integration test protects the migration. The final explanation can be brief: both requirements survive, and these checks exercise them.

Now imagine the branches deliberately choose different size limits. The code alone does not say which is correct. If the merge's stated goal is to bring the approved new limit into the release branch, that resolves the choice. If no source establishes precedence, the resolver should surface the exact decision rather than select the larger number because it seems friendlier. It can still complete unrelated hunks while that one remains pending.

## What it gets right

Intent-based resolution is a practical antidote to destructive shortcuts. The words ours and theirs are convenient Git labels, but they do not mean right and wrong. During a rebase, those labels are especially easy to misunderstand because commits are being replayed onto a different base. Reading the three-way content and history gives a better basis for action.

The source also resists scope creep. “Do not invent new behavior” means the resolver should not redesign the endpoint while reconciling it. Minimal synthesis is often necessary, but a new caching policy or a new validation rule belongs to another task. This restraint keeps the merge reviewable.

The strongest reason to keep the original is its low overhead. Most conflicts do not need a bespoke planning system. A short reminder to recover intent, preserve both sides, verify, and finish can be enough. The refactor should stay short and reserve more care for actual ambiguity, generated artifacts, or broad semantic interactions.

## Criticism and limits

“Always resolve” and “never abort” become problematic if treated as unconditional laws. The user may discover that the branch should not be merged, or a source may reveal incompatible requirements without an agreed priority. Persistence cannot supply a missing product decision. The refactor retains no-abort as the default for an authorized resolution but respects explicit cancellation and permits a narrow pause on genuine ambiguity.

“Stage everything” is an avoidable hazard. The checkout can contain unrelated edits, generated output, or another contributor's staged work. A resolver should stage the files and hunks it owns after inspecting the index. Clean tree is also not a universal completion criterion if unrelated local work existed before the operation. The meaningful outcome is a completed operation with the user's other changes preserved.

Primary sources have limits. A commit message can be vague or incorrect; a PR can describe intent that the implementation never achieved. The resolver needs to compare the actual code and tests, not merely select the most persuasive narrative. If the linked issue is unavailable, it should distinguish inferred intent from verified intent and use the best local evidence.

Finally, semantic conflicts can exist outside marked hunks. Git may merge two changes cleanly that together violate an invariant. The source's automated-check step helps, but a good resolver also considers the immediate interaction surface: callers, generated schemas, lockfiles, and assumptions altered by the conflicting change. This does not mean reviewing the entire repository; it means checking the consequences of the chosen synthesis.

## Porting bet and dependency cost

**Bet: adopt.** This is a useful narrow instruction to have available when a merge stalls. Its falsifier is whether the resulting resolution loses a behavior from either branch that should have survived, or includes unrelated changes in the final commit. Evaluate on fixtures with two independent intents, a true incompatibility, a generated artifact, and unrelated local edits.

The tool dependencies are ordinary Git and project checks. Access to PRs or issues improves intent recovery but should not become a blanket prerequisite for a locally understandable conflict. The refactor does not require installing a tracker integration. It also does not automatically create a new worktree in the middle of an operation; it inspects and completes the existing operation unless the user directs otherwise.

There are no supporting files to preserve beyond the source UI metadata. The package keeps automatic discovery because this is a situational capability, not a global policy. It starts only when an actual merge or rebase is in progress and ends with the operation state reported accurately.

## Refactor: precise ownership and honest incompatibility

The revised workflow records the current operation, branch, unmerged paths, and pre-existing changes. For each conflict it reads base and both sides, recovers the reason for each change, and resolves compatible intentions. Generated files are regenerated from the correctly merged source when the repository provides a supported way to do that; hand-splicing a lockfile without understanding its generator is not automatically the simplest solution.

When intentions conflict, use a stated merge goal or authoritative decision. If neither exists, state the smallest unresolved choice and continue independent resolution. No abort is performed without the user's direction. After the relevant checks, stage operation-owned changes and continue until the merge or rebase actually ends, handling later conflicts in the same way.

The final result identifies any intentional tradeoff and the checks run. It avoids saying “everything is clean” if unrelated work remains. This is a small but important shift: completion is defined by the authorized operation, not by forcing the checkout into a cosmetically empty state.

## Original proposal: Compose Two Plans

The original proposal generalizes semantic merging beyond code. Users often have two good plans, drafts, or systems that cannot simply be concatenated. One optimizes speed, another quality; one assumes centralized ownership, another autonomy. Compose Two Plans first extracts the objectives, commitments, and dependencies of each, then identifies compatible elements and genuine collisions.

Imagine two plans for a study project. One proposes daily short practice, another weekly long synthesis. They may compose naturally if the short sessions feed the weekly one. But if both assume the same limited evening hours, combining every activity creates an impossible plan. The skill must preserve the useful intent while exposing the resource conflict. It recommends a coherent synthesis, or explains why choosing one plan is better.

The novelty claim is limited: synthesis and constraint reconciliation are established reasoning practices. The proposal packages them as an alternative to the assistant habit of “combine the best of both” without paying attention to incompatibility. Its cost is explicit comparison, which is unnecessary for two trivially compatible lists. Its falsifier is whether the result satisfies the retained commitments without hiding conflicting assumptions or silently discarding a named priority.

## Study and transfer

1. Find a conflict where neither whole side is correct. Explain the intentions that must survive.
2. Distinguish new implementation text from new product behavior.
3. Explain why an operation can be complete while the working tree remains dirty.
4. Compose two non-code plans and name one thing you intentionally excluded.

Read [implement](implement.md) for ownership in shared workspaces and [diagnosing-bugs](diagnosing-bugs.md) for failures that remain after a merge finishes. The narrowness of this skill is part of its strength: it should make a difficult transition dependable, then get out of the way.

## Numbered semantic delta

1. **D1: Inventory operation state and pre-existing changes before editing.** A conflict resolver needs to know which operation and changes it owns. Tradeoff: A short state check precedes resolution.

2. **D2: Use three-way content and primary intent, with explicit rebase-side semantics.** Ours/theirs labels can mislead during replay and do not establish intent. Tradeoff: History reading may take longer than mechanical marker deletion.

3. **D3: Pause only genuinely incompatible, unresolved intent rather than inventing behavior.** Always resolve cannot justify choosing an unstated product goal. Tradeoff: Some conflicts remain pending a decision.

4. **D4: Stage only resolved operation-owned changes, not everything.** Unrelated local edits can otherwise be committed accidentally. Tradeoff: Requires file-level staging inspection.

5. **D5: Preserve no-abort default while allowing explicit user cancellation.** Persistence is appropriate until the user changes the goal. Tradeoff: The absolute source prohibition becomes scoped to the authorized operation.

## Artifacts and evaluation

[Refactored skill](../refactored/resolving-merge-conflicts/SKILL.md) · [Original proposal: compose-two-plans](../original-skills/compose-two-plans/SKILL.md) · [Exact source diff](../diffs/resolving-merge-conflicts.diff) · [Independent evaluation](../evals/resolving-merge-conflicts.md)

These are authored candidates, not installed skills. The linked independent evaluation records the actual text responses, case-bound grades and limitations. The design bet in this chapter is distinct from those observations. Source documentation issue reports are historical claims in the pinned bundle, not independently reproduced measurements.

## Source locators

- **S1:** [skills/engineering/resolving-merge-conflicts/SKILL.md, lines 6-14](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/resolving-merge-conflicts/SKILL.md#L6-L14) ([local snapshot](../source/skills/engineering/resolving-merge-conflicts/SKILL.md)).
- **S2:** [docs/engineering/resolving-merge-conflicts.md, lines 19-47](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/docs/engineering/resolving-merge-conflicts.md#L19-L47) ([local snapshot](../source/docs/engineering/resolving-merge-conflicts.md)).

## Supporting-resource disposition

- agents/openai.yaml: **copy** — Preserve source UI metadata and invocation policy exactly.
- source/LICENSE: **copy** — Retain Matt Pocock MIT attribution in every refactored package.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. Intent recovery from primary evidence, hunk-by-hunk synthesis, no invented product behavior, project checks, and finishing the full merge/rebase survive. The candidate fixes the source's dangerous stage-everything instruction by limiting staging to the operation's changes and preserving unrelated work. It also recognizes rebase role ambiguity and regeneration of derived files. A genuine unresolved product decision can be surfaced while independent hunks proceed; abort remains unavailable as an escape from difficulty but explicit cancellation is respected. No actionable semantic defect found.

None. Report the final Git operation state rather than treating resolved files alone as completion.

Evidence: [source/skills/engineering/resolving-merge-conflicts/SKILL.md:6-14](../source/skills/engineering/resolving-merge-conflicts/SKILL.md); [refactored/resolving-merge-conflicts/SKILL.md:8-16](../refactored/resolving-merge-conflicts/SKILL.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **compose-two-plans**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It compares intentions, commitments, assumptions, resources, and dependency order before synthesis. Permission to recommend one plan prevents a cosmetic compromise or simple concatenation. The mechanism is recognizable plan integration, but the explicit capacity check and realistic execution scenario make it more disciplined than ordinary 'combine these ideas' responses.

**Weakness:** Preserving useful intention while changing form can conceal a changed commitment. The instruction to identify consequential omissions helps, but transformed obligations also need visibility.

**Suggested improvement:** Include materially transformed commitments alongside omissions. When priorities do not decide a conflict, keep the proposed tradeoff explicitly provisional rather than allowing a polished unified plan to imply agreement.

A proposed test was: Combine these research and delivery plans into one feasible month of work, preserving hard commitments and identifying where the same people or deadlines conflict. Success would mean: The resulting plan has coherent responsibilities and order, fits actual resource constraints, and transparently explains material exclusions or changes to original commitments. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
