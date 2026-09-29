# Implement — execute the settled contract and close the evidence loop

**Study question:** what does it mean for an assistant to finish work that has already been decided?

## Understand the original

Implement is strikingly short. It says to build the specified work, use TDD at pre-agreed seams where possible, typecheck and run focused tests during the work, run the full suite at the end, review, and commit to the current branch. The operational body is only a handful of sentences. Its value comes partly from what it refuses to redo: the thinking already settled in a spec or ticket. [S1]

This is the execution step in Matt's larger flow. Interviews resolve decisions; a spec consolidates them; tickets create bounded units. Implement is supposed to trust that upstream work and turn it into a commit. A fresh agent otherwise has a tendency to reopen choices, propose an improved architecture, or expand scope while “helping.” This small driver tells it to execute the agreement.

The source documentation clarifies that a small agreed plan in the current conversation can also be the input, even though the entrypoint only mentions specs and tickets. It describes one ticket per invocation and a fresh context between self-contained tickets. The ticket should contain enough context that losing the previous implementation session is harmless. “Pre-agreed seams” means the behavioral boundaries chosen for testing, either upstream or during the opening exchange. [S2]

Its explicit-only invocation matters. This is not a background rule that commits whenever a user discusses a feature. Calling the skill intentionally selects an execution workflow whose normal endpoint includes a local commit. The copied Codex metadata preserves that invocation boundary. User instructions such as “leave the changes uncommitted” still override the default.

## A worked example

Suppose a ticket says: “A signed-in user can rename one saved filter. The new name is visible after reload; names containing only whitespace are rejected. No changes to filter sharing.” The spec already chooses the save-filter interface as the test seam. Implement should resolve that exact ticket, read the contract and relevant project instructions, and build the narrow behavior.

The first test can demonstrate that renaming a filter persists through a read via the public interface. After it fails for the intended reason, the smallest implementation makes it pass. A second slice can protect the whitespace rejection. Focused checks run during development; the repository's required checks run at the appropriate end point. The review then compares the actual patch to the ticket and standards.

Now consider a trap: the user passes “#2” in a fresh conversation, and a local checklist also contains item 2. A capable implementation of the wrong item is still a failed task. The work identity must be resolved through the configured tracker, an explicit path, or a full reference, and the title should be stated before edits. This is not another planning interview. It is checking what the task is.

Another trap appears at close-out. If the work is still uncommitted and review only looks at HEAD, the new rename behavior is invisible. The refactor reviews a pinned working patch, fixes material findings, and commits the scoped result. If the user authorized tracker completion, the acceptance evidence should also be reflected there so dependent work becomes visibly available.

## What it gets right

The source is an example of appropriate prompt minimalism. It assumes the agent can code, discover commands, and navigate a repository. It adds only a few decisions: follow the settled input, test through agreed seams, use focused feedback frequently, review, and commit. A much longer implementation manifesto could interfere with local conventions while adding little.

The focus on a bounded ticket is also valuable. A single task can be evaluated against a concrete contract. The agent need not carry every prior planning conversation if the artifact is self-contained. That makes execution easier to parallelize safely in separate workspaces and easier to restart when context is lost.

The strongest reason to keep the original is exactly this restraint. It is a driver, not a second specification system. Porting should not add a mandatory mini-PRD, architectural review, risk register, and checkpoint ceremony to every feature. The improvements should close real joints between existing steps, not replace the workflow with administration.

## Criticism and limits

The largest gap is that the driver's partner contracts do not align. The review step occurs before commit, while the shipped code-review compares a fixed point to HEAD. The public documentation identifies the resulting invisible-change problem. It also states that implementation does not act on review findings. A review that sees no work, or finds issues that remain unfixed, is not meaningful close-out. [S3]

“Commit your work” is underspecified in a shared checkout. An unrelated staged file can be included accidentally, and another agent can move HEAD or alter the index while this task is running. The docs describe serious concurrency failures in one checkout. The correct lesson is not to prohibit collaboration; it is to give each writer a stable working area or explicitly coordinate ownership and sequence. Worktrees help isolate files and index, while some Git state remains shared.

The source's trust in upstream planning also has a limit. A ticket may refer to a removed interface, depend on unfinished work, or contradict an explicit current instruction. Implement should not redesign the task on taste, but it must surface demonstrated incompatibility. Blind execution of stale assumptions is not fidelity to user intent.

Finally, a commit is not the same as completion. Acceptance criteria can remain unchecked, a deployment can be pending, or a tracker dependency can stay blocked because no issue was closed. The refactor reports those states separately. It does not claim that every implementation request implies deployment or public posting.

## Porting bet and dependency cost

**Bet: adopt as a small execution driver.** This fits a useful collaboration pattern: we settle the target once, then the assistant carries it through without repeatedly reopening decisions. The falsifier is the rate of rework caused by misresolved tickets, untested criteria, invisible review scope, or premature completion claims. A good implementation skill should reduce those failures without increasing needless conversation.

Dependencies are the input contract, relevant repository commands, a behavioral testing method where it adds value, and a review method. The refactor does not require a tracker for a conversation-sized plan or local spec. If TDD is unavailable, the agent can apply the same red-first behavioral discipline directly while stating that it did not invoke a missing skill. If a full suite cannot run, the limitation is part of the final state rather than a fabricated pass.

The source has no supporting resources beyond metadata. The refactor intentionally remains one instruction file. Its additional lines identify operational seams, not an elaborate new framework. The UI metadata is copied; Claude-specific discovery frontmatter is omitted in the Codex-target package while the explicit-only policy remains.

## Refactor: preserve momentum, make the endpoint real

The revised driver opens by pinning the work reference, accepted behavior, test seams, branch, and unrelated changes. That can be one concise statement. It then works in behavioral slices, uses focused feedback, and handles only demonstrated blockers to the agreement. New ideas discovered while coding become notes unless they are necessary to meet the contract.

At close-out it reviews the actual task-owned bytes, resolves material findings within scope, and reruns checks justified by the fixes. It avoids an endless loop of taste-based review until no suggestion remains. Then it commits when that is part of the selected workflow, preserving unrelated changes. The final report connects each acceptance criterion to evidence and names anything still pending.

Tracker completion is treated as part of the authorized deliverable when applicable, not as a blanket assumption. A local status update can be routine; public comments or issue closure follow the user's actual authorization and host policies. This keeps the skill useful across local notes and external trackers without making every request a publishing request.

## Original proposal: Finish the Last Mile

The inspired original asks a different question: after the main artifact exists, what prevents the user from actually using it? Assistants often stop at a generated file, a passing test, or a working local demo. The remaining step might be a documented command, an import, a missing configuration value, a visible preview, or a clear handoff to the human. This skill searches the user's intended path from receipt to use.

For the saved-filter example, the feature may compile but the UI route is inaccessible from the navigation. For a report, the file may exist but its internal links are broken. For a data transformation, the output may lack the column names the receiving system expects. Finish the Last Mile chooses the smallest concrete usability check and performs authorized finishing work. It does not inflate the task into marketing, deployment, or lifelong maintenance.

The novelty claim is limited: acceptance testing and delivery discipline are established. The proposal focuses them on the collaboration boundary between “I made it” and “you can use it.” Its cost is a short walkthrough that can become redundant on trivial tasks. Its falsifier is whether it uncovers or removes a real obstacle; an extra polished summary without a better usable result is not improvement.

## Study and transfer

1. Separate implementation complete, verified, committed, and usable for one recent task.
2. Explain why checking a ticket title is different from reopening its plan.
3. Describe what a review must include before an uncommitted change can be called reviewed.
4. Identify one last-mile action that belongs to the task and one that would expand it.

Read [to-tickets](to-tickets.md) for making the execution contract portable and [code-review](code-review.md) for the corrected review scope. The refactor is intentionally compact: it should support momentum rather than become another phase to manage.

## Numbered semantic delta

1. **D1: Resolve exact work identity and accept an agreed conversation plan as input.** Bare issue numbers and file-only assumptions can select the wrong work. Tradeoff: A brief start-of-work contract adds a few lines.

2. **D2: Reuse agreed seams and ask only when the missing choice affects implementation.** Pre-agreed should not mean silently skipped or repeatedly reapproved. Tradeoff: Requires reading prior decisions carefully.

3. **D3: Review actual task changes before committing, then resolve material findings.** The source pair reviews HEAD while implement has not committed and does not act on review findings. Tradeoff: Review must support a working snapshot or a disclosed alternative.

4. **D4: Commit only task-owned changes to the intended current branch and report shared-checkout conflicts.** Stage-all and competing writers can mix work. Tradeoff: Some concurrent work must be isolated or serialized.

5. **D5: Reconcile acceptance evidence and authorized tracker completion.** A commit alone does not unblock a dependency graph. Tradeoff: Completion may remain partially pending when verification or tracker access is unavailable.

6. **P1: Omit Claude-only disable-model-invocation frontmatter while copying agents/openai.yaml explicit-only policy.** The target is Codex packaging; its metadata preserves invocation intent and the bundled validator accepts the supported frontmatter. Tradeoff: This package is not a byte-identical Claude entrypoint.

## Artifacts and evaluation

[Refactored skill](../refactored/implement/SKILL.md) · [Original proposal: finish-the-last-mile](../original-skills/finish-the-last-mile/SKILL.md) · [Exact source diff](../diffs/implement.diff) · [Independent evaluation](../evals/implement.md)

These are authored candidates, not installed skills. The linked independent evaluation records the actual text responses, case-bound grades and limitations. The design bet in this chapter is distinct from those observations. Source documentation issue reports are historical claims in the pinned bundle, not independently reproduced measurements.

## Source locators

- **S1:** [skills/engineering/implement/SKILL.md, lines 7-15](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/implement/SKILL.md#L7-L15) ([local snapshot](../source/skills/engineering/implement/SKILL.md)).
- **S2:** [docs/engineering/implement.md, lines 3-47](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/docs/engineering/implement.md#L3-L47) ([local snapshot](../source/docs/engineering/implement.md)).
- **S3:** [docs/engineering/implement.md, lines 49-75](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/docs/engineering/implement.md#L49-L75) ([local snapshot](../source/docs/engineering/implement.md)).
- **S4:** [skills/engineering/implement/agents/openai.yaml, lines 1-5](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/implement/agents/openai.yaml#L1-L5) ([local snapshot](../source/skills/engineering/implement/agents/openai.yaml)).

## Supporting-resource disposition

- agents/openai.yaml: **copy** — Preserve source UI metadata and invocation policy exactly.
- source/LICENSE: **copy** — Retain Matt Pocock MIT attribution in every refactored package.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. Settled-work execution, TDD where useful, recurring focused checks, final broader checks, review, and committing on the intended branch all survive. The refactor removes a practical composition failure by requiring review of the actual task patch, including uncommitted changes, and resolving supported findings before delivery. It also preserves unrelated work and distinguishes acceptance evidence from a commit or deployment claim. Its extra contract-identification step addresses ambiguous tickets without reopening agreed design for taste. No material lost invariant or unavailable mandatory tool found.

None. Required repository checks still govern the final verification scope.

Evidence: [source/skills/engineering/implement/SKILL.md:7-15](../source/skills/engineering/implement/SKILL.md); [refactored/implement/SKILL.md:8-22](../refactored/implement/SKILL.md), [refactored/code-review/SKILL.md:12-14](../refactored/code-review/SKILL.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **finish-the-last-mile**: **defer**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It checks the user's actual next step with the actual artifact and distinguishes created, checked, and externally completed. The explicit scope limits prevent an unnecessary delivery package. This is excellent general completion hygiene, but the core behavior is already expected of a competent assistant delivering a usable result. The design offers little specialized mechanism.

**Weakness:** A separately triggered skill risks making basic usability checks optional or adding a redundant finishing pass even when direct verification already occurred.

**Suggested improvement:** Promote the concise actual-artifact and next-action checks into ordinary delivery guidance. Defer standalone installation unless real failure examples show a recurring gap that a specifically triggered skill measurably reduces.

A proposed test was: The converted document is ready. Check that the delivered file opens in the intended viewer and that the user can reach the sections needed for review. Success would mean: The promised artifact supports the immediate intended action, with any consequential remaining dependency stated accurately and without unnecessary new deliverables. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
