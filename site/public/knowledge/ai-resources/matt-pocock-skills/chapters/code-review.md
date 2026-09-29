# Code Review — keep standards and specification separate

**Study question:** can code be well written and still be the wrong change?

## Understand the original

Matt's code-review is deliberately narrower than a general bug hunt. It asks two questions: does the change follow the repository's documented standards, and does it satisfy the originating specification? Each question gets a separate subagent, then the reports remain separate. A passing standards report cannot compensate for a failed requirement. Conversely, a correct feature can still violate an important architectural rule. This is the defining mechanism, and it should survive a refactor. [S1]

The workflow starts by resolving a user-supplied fixed point and checking for a nonempty diff. It gathers the commits, locates the spec through issue references or local files, and collects repository standards. If the spec cannot be found, it asks; if no spec exists, that axis is skipped explicitly. It does not infer a specification from the implementation and then congratulate the implementation for matching it. That restraint is more valuable than another long generic review checklist.

Standards include a baseline of twelve Fowler smells: ambiguous names, duplicated logic, feature envy, data clumps, primitive obsession, repeated switches, shotgun surgery, divergent change, speculative generality, message chains, middle men, and refused inheritance. These are labeled judgments rather than hard violations. A documented repository convention wins over the baseline, and concerns already enforced by tooling are skipped. The review is therefore anchored in local intent while retaining a useful floor when documentation is sparse. [S2]

The final report uses separate Standards and Spec blocks, with finding counts and a worst issue within each axis. The source forbids merging or reranking the axes. That is a principled choice about preserving information, not a claim that a reader can never prioritize work. If a convention violation and a missing feature both exist, the user sees both rather than a blended “mostly good” grade.

## A worked example

Consider a change adding CSV export. The specification says that exported rows must use the same visibility filters as the current screen and contain a stable column order. The repository requires database access through an existing query module. The new endpoint reaches directly into the database, but otherwise produces correctly escaped CSV.

The Standards reviewer should identify the concrete documented query-module rule and the hunk bypassing it. The Spec reviewer should inspect whether the visibility filters and stable column order are actually carried through. Suppose the endpoint omits the user's active filter. That is a separate finding even if the same line contributes to both. The result is not “two issues, medium quality”; it is an architectural violation and a missing behavior, each with its own evidence.

Now remove the specification. The Spec report should say it could not evaluate compliance. It may still be possible to perform an ordinary correctness review, but that is a different review scope and should be named as such. The absence of a source does not authorize inventing requirements such as “CSV export should always include every field.” Finally, leave the change uncommitted. Under the shipped command, the review compares the merge-base to HEAD and may never see the new endpoint. This is a workflow defect, not a subtle issue of model judgment. [S3]

## What it gets right

The separation produces diagnostic clarity. Review comments often mix correctness, taste, product preferences, and speculative future needs. Matt imposes two evidence types: a rule or labeled smell for Standards, and a requirement for Spec. The user can challenge a finding by checking its source rather than negotiating with an assistant's sense of elegance.

Parallel reviewers can also reduce cross-contamination. A reviewer told that a design is “clean and idiomatic” may become less skeptical of behavior; a reviewer told that the user is delighted may overlook local standards. Independent briefs reduce this specific framing effect. They do not establish statistical independence or guarantee objectivity, especially when reviewers share a model and inherited context. The design earns a practical advantage without needing that stronger claim.

The strongest reason to retain the original is its narrowness. Adding performance, security, accessibility, naming, testing, architecture, maintainability, and deployment axes can make every review expensive and unfocused. This skill provides a comprehensible contract. It should remain a standards/spec review even if another tool performs a defect hunt alongside it.

## Criticism and evidence boundaries

The largest concrete problem is artifact scope. The description advertises work-in-progress review, while the command excludes staged and working-tree changes. Its partner implement invokes review before committing. The public documentation explicitly identifies that mismatch. A review against the wrong bytes can be fluent, cited, and completely irrelevant. Fixing scope is more important than adding sophistication to the prompts. [S3]

A second problem is recursive delegation. The documentation reports reviewers invoking the same skill again and spawning further reviewers. No guard in the source makes the leaf role explicit. A brief that says “perform only this axis directly; do not invoke this router or delegate” addresses the actual failure without banning delegation everywhere.

A third problem is unverified aggregation. The coordinator lightly cleans or repeats subagent output. A cited finding can still quote an irrelevant standard, point to a stale line, or misread the code. Verification should remove unsupported claims, not merge the axes. The refactor separates evidence checking from ranking.

Smells also need friction evidence. A function with three parameters is not automatically primitive obsession; two similar conditionals may express independent policies. The suggested fixes in the original are useful starting moves, but extraction can create coupling and polymorphism can make a simple branch harder to follow. A good smell finding names what the current shape makes harder and offers a proportionate change.

## Porting bet and operating cost

**Bet: adopt, with the artifact-scope correction.** This should improve our collaboration when work has a real spec or meaningful repository rules. Its falsifier is a sequence of representative reviews in which findings are mostly unsupported, purely cosmetic, or redundant with tooling, while important missing requirements remain invisible. Count verified actionable findings, missed seeded violations, and minutes spent checking false positives; do not count raw finding volume as success.

Dependencies are modest but real: Git for scope, optional tracker access for a spec, local standards, and subagents for separation. A local spec path should work without installing tracker setup. If independent agents are unavailable, sequential isolated passes are a disclosed fallback rather than pretend parallelism. The package preserves ordinary discovery and the source UI metadata. No review output itself authorizes code changes.

## Refactor: review the right object, then verify the claim

The new entrypoint resolves an exact base and target state before delegation. For a committed branch, it uses the merge-base and pinned commit. For a requested working-tree review, it creates or records a read-only patch snapshot that includes the intended staged, unstaged, and relevant untracked files without committing them. Both reviewers receive the same scope and source contract. A mutable branch name alone is insufficient if the checkout changes during review.

The coordinator checks each proposed finding against the cited rule or requirement and relevant code. A weak claim can be dropped or marked uncertain. The final report still has two axes, no blended score, and a worst issue within each. The baseline moves into a reference because it is useful detail rather than routing logic. A no-findings result is permitted; repeated review is not a mechanism for manufacturing work.

## Original proposal: Test the Oracle

The inspired proposal asks whether our tests and acceptance checks could tell a wrong answer from a right one. TDD can produce a beautiful red-green sequence around an impoverished oracle. A review can map every criterion to a test while both criterion and test miss the same requirement. Test the Oracle deliberately challenges the observation that declares success.

For CSV export, temporarily removing the visibility filter in an isolated fixture should cause an appropriate check to fail. If all tests remain green, the issue is a blind oracle, even if line coverage is excellent. Another useful challenge is a wrong column order, an empty result, or a value containing a delimiter. The point is not a huge mutation-testing campaign; it is one or two plausible wrong implementations selected from the actual contract.

The proposal's novelty is modest. Mutation testing and independent test oracles are established techniques. The packaging focuses on a collaboration problem: assistants can produce tests that share their own implementation assumptions. A small adversarial check interrupts that circularity. Its cost is fixture setup and interpreting a failed challenge. Its falsifier is whether the exercise finds any previously unrecognized blind spot or changes confidence in a justified way. If it only proves that obvious syntax errors fail to compile, it has not tested the oracle.

## Study and transfer

1. Write one Standards finding and one Spec finding for the CSV example. Make each checkable without accepting the reviewer's judgment.
2. Explain why “all tests pass” does not settle either axis.
3. Review the same uncommitted patch using the original scope and the proposed scope. First check which bytes each sees.
4. Select one acceptance criterion from [to-tickets](to-tickets.md). Describe a plausible wrong implementation it should reject.

Read [tdd](tdd.md) for independent expected values and [implement](implement.md) for review's place before a commit. The evaluation link below is the place to assess whether the refactor improves behavior rather than merely sounding more careful.

## Numbered semantic delta

1. **D1: Pin both base and reviewed state, including working changes when requested.** HEAD-only comparison cannot review implement's uncommitted result. Tradeoff: Snapshot preparation adds a small step and untracked files need explicit handling.

2. **D2: Pass leaf-review briefs that forbid recursive invocation or further delegation.** The documented fan-out failure arises from ambiguous subagent scope. Tradeoff: Leaf reviewers cannot independently recruit specialists.

3. **D3: Verify evidence before reporting a finding while preserving separate axes.** Aggregation should not launder an unsupported subagent claim into a conclusion. Tradeoff: Coordinator reads relevant hunks again.

4. **D4: Prefer a user-supplied spec over inferred issue references.** The user can explicitly identify the authoritative contract. Tradeoff: A mistaken supplied source must be surfaced rather than silently substituted.

5. **D5: Keep smell baseline in a conditional reference and require concrete change cost.** Names of smells should not generate cosmetic churn. Tradeoff: Some weak style leads are intentionally omitted.

## Artifacts and evaluation

[Refactored skill](../refactored/code-review/SKILL.md) · [Original proposal: test-the-oracle](../original-skills/test-the-oracle/SKILL.md) · [Exact source diff](../diffs/code-review.diff) · [Independent evaluation](../evals/code-review.md)

These are authored candidates, not installed skills. The linked independent evaluation records the actual text responses, case-bound grades and limitations. The design bet in this chapter is distinct from those observations. Source documentation issue reports are historical claims in the pinned bundle, not independently reproduced measurements.

## Source locators

- **S1:** [skills/engineering/code-review/SKILL.md, lines 6-41](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/code-review/SKILL.md#L6-L41) ([local snapshot](../source/skills/engineering/code-review/SKILL.md)).
- **S2:** [skills/engineering/code-review/SKILL.md, lines 43-87](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/code-review/SKILL.md#L43-L87) ([local snapshot](../source/skills/engineering/code-review/SKILL.md)).
- **S3:** [docs/engineering/code-review.md, lines 48-76](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/docs/engineering/code-review.md#L48-L76) ([local snapshot](../source/docs/engineering/code-review.md)).

## Supporting-resource disposition

- agents/openai.yaml: **copy** — Preserve source UI metadata and invocation policy exactly.
- source/LICENSE: **copy** — Retain Matt Pocock MIT attribution in every refactored package.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. The separate Standards and Spec axes, repository-over-heuristic precedence, changed-code evidence, and unblended reporting remain. The refactor materially improves the reviewed object: both workers see pinned identical bytes, including intended working changes, rather than a HEAD diff that silently omits new work. Leaf-worker instructions prevent recursive review delegation, and unsupported findings are checked before presentation. The extracted smell reference retains all twelve source heuristics without treating them as universal violations. No actionable loss of the source's distinctive review contract found.

None. Static agreement does not establish whether future reviews will identify real defects.

Evidence: [source/skills/engineering/code-review/SKILL.md:6-87](../source/skills/engineering/code-review/SKILL.md); [refactored/code-review/SKILL.md:8-34](../refactored/code-review/SKILL.md), [refactored/code-review/SMELLS.md:3-18](../refactored/code-review/SMELLS.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **test-the-oracle**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It challenges a check with a plausible behavioral defect, rejects syntax failures as evidence, and requires the improved oracle to reject wrong behavior while accepting correct behavior. This is a strong mechanism beyond ordinary review because it tests the observation declaring success. Fixture-truth diagnoses a narrower cause of the same false-positive testing problem.

**Weakness:** Restoration is specified, but the final clean-state verification is implicit. Also, one mutant can be caught for an unrelated behavioral reason rather than the intended assertion.

**Suggested improvement:** Pilot early. Add explicit failure-reason inspection and restoration verification. Incorporate fixture-truth as a diagnostic branch when hidden defaults or mock boundaries prevent the mutation from exercising the claimed behavior.

A proposed test was: This duplicate-payment test is green. Introduce one isolated plausible duplicate side effect and prove that the intended assertion, rather than a setup failure, catches it. Success would mean: Recorded execution shows the original correct case passes, the selected semantic defect fails for the intended reason, and the working state is restored. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
