# PR: give the reviewer a model of the change

**Source status: in-progress / beta, excluded from the promoted plugin.**

**Port bet: pilot.** Write concise pull request bodies that explain changed behavior, show appropriate evidence, and identify concrete reversal costs.

## Source and reading map

- [SKILL.md:1-41](../source/skills/in-progress/pr/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/pr/SKILL.md#L1)
- [SKILL.md:43-154](../source/skills/in-progress/pr/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/pr/SKILL.md#L43)
- [SKILL.md:156-168](../source/skills/in-progress/pr/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/pr/SKILL.md#L156)
- [CREDITS.md:1-3](../source/skills/in-progress/pr/CREDITS.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/pr/CREDITS.md#L1)
- [agents/openai.yaml:1-3](../source/skills/in-progress/pr/agents/openai.yaml) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/pr/agents/openai.yaml#L1)

## Understand the source

The pr skill is a reference for writing a pull request body. It supplies three sections: Summary, Evidence, and Merge Danger. The summary is primarily a small visual representation of the change. Evidence pairs before and after observations. Merge Danger identifies whether the change is a one-way or two-way door and gives its blast radius. The assistant should avoid preambles, write briefly, and use the user's domain vocabulary from CONTEXT.md.

Most of the source is a gallery of representations. Algorithms can be pseudocode; runtime control can be a call tree; UI structure can be a component tree; responsibilities can be a file tree; interactions can use Mermaid; changes to an existing structure can use a diff sketch. A full block is appropriate when most of it is new or omitted context would hide ownership or order. The rule is to use the smallest view that makes the key point clear, not to use every format.

The evidence guidance favors screenshots for visual changes when the environment supports them and execution results for behavioral changes. The door metaphor concerns reversibility: a code revert may be cheap, while destructive data changes or persistent external effects can be difficult to undo. The skill's metadata and CREDITS.md attribute the visual-shaping material to Dex Horthy's show-me. That attribution is part of the source package, not optional decoration.

## A source boundary worth noticing

The bucket README describes a somewhat richer skill than the actual SKILL.md: it mentions a summary from the primary source and material deliberately left out. The pinned instruction file does not explicitly require either. A careful port should not silently credit those mechanics to the source body. They can be useful additions, but the delta should say so. This illustrates why a compendium must inspect the actual package rather than summarize its catalog description.

The original source is model-invoked, unlike most of its beta neighbors. It is meant to become relevant whenever a PR body is being written. That broad trigger is reasonable because the task is a particular artifact rather than an autonomous external action. Writing a proposed body and posting or updating a PR remain different operations governed by the surrounding task.

Use this skill when a reviewer needs to understand a change quickly, especially when its shape is clearer in a small diagram than in a file-by-file narration. A PR description should answer what changed in the product or system, why that change exists, what demonstrates it, and what matters when merging. It should not merely repeat the diff in prose. The source's visual emphasis is a way to expose structure at a glance.

## Worked example: stale search results

Suppose a search UI can display the result of an earlier slow request after a later fast request has completed. A useful summary begins with the observable problem: older responses can replace results for the current query. A tiny state sketch can show the repair: send request with generation N; accept its response only if N is still current. That is more informative than listing changes to a hook, a component, and a test file.

Evidence might show a deterministic test in which the second request resolves first. Before the change, resolving the first request afterward displays the wrong results. Afterward, the display stays aligned with the current query. If the author did not run the failing test on the old revision, the description should not imply that they did. It can distinguish a reproduction of old behavior, a new regression test, and a predicted failure derived from inspection.

The reversal discussion is equally concrete. Reverting the UI code restores the old behavior; no stored data or public API changes. The impact is limited to the search-results view, including loading and error states. “Two-way door; small blast radius” is a shorthand, but the useful information lies in those specifics. If the same PR changed a persisted query format, a simple code revert might no longer restore compatibility. The door metaphor should lead to that analysis rather than replace it.

## Strengths and criticism

The strongest feature is representational judgment. A well-chosen sketch lets a reviewer ask the right questions sooner. The before/after pair also pressures an author to connect the change to observed behavior rather than claim that tests passed in the abstract. Reversibility is a good review concern because line count is a poor measure of deployment risk.

The template can become too rigid. A one-line typo fix does not need a diagram, and a one-word blast-radius label can hide important distinctions. Screenshots are not inherently stronger than tests; they answer different questions. A visual comparison can establish layout while missing keyboard behavior, and a passing unit test can miss integration. The phrase “show the exact test … using pseudocode” risks mixing executable evidence with an illustrative sketch. A port must label those clearly.

The strongest reason to keep the original is that it is memorable. A team that consistently omits evidence might benefit from a firm template more than from a nuanced menu. The refactor should therefore preserve its three useful ideas while letting detail scale to the change. The goal is faster, better review, not a polished narrative that obscures what was actually verified.

## Refactor and collaboration bet

The proposed version begins with the concrete trigger and resulting behavior, uses a visual only when it improves understanding, and labels actual evidence precisely. It adds intentional exclusions when reviewers would otherwise infer a broader scope. The door call becomes a concrete account of rollback, persistent effects, and affected users or consumers. Existing repository templates remain authoritative, so these elements can fit inside the expected structure instead of replacing it.

My bet is a pilot across several meaningful PRs. The improvement should appear as fewer clarification comments and faster identification of real review concerns. It is falsified if the descriptions become longer without helping reviewers, or if attractive diagrams distract from missing evidence. A blind reader should be able to state the user-visible change and the main merge concern after a brief read. That is a more useful outcome than compliance with every heading.

Portability is high. The skill needs a diff, the task's primary requirement, and actual validation results. A repository may have no CONTEXT.md; the port uses the issue, spec, and surrounding language instead of inventing a file. The visual guidance is reusable across providers. The attribution is retained in metadata and CREDITS.md, and the derived package includes Matt's repository license.

## An original proposal: reviewer-rehearsal

Reviewer-rehearsal tests whether the PR's explanation enables a fresh reviewer to inspect the right behavior. Give a reader the proposed body and the relevant diff, then ask what changed, which claim needs checking, where they would inspect first, and what could make the merge unsafe. Do not tell them the expected concern. Their reading reveals whether the description points toward the actual difficult part or merely sounds convincing.

For stale search results, a good rehearsal reader should inspect response ordering and state updates, not spend most of the review on naming. If they believe the patch cancels network requests when it only ignores stale responses, the description has created a false mental model. That misunderstanding is cheap to correct before a real review. The skill can also expose an evidence gap: the body may claim loading-state correctness while the test only checks displayed text.

The novelty within this collection is the receiving-side test of a review artifact. It does not replace code-review or provide another bug-hunting persona. It evaluates whether communication directs review attention correctly. Its cost is a small independent pass, appropriate for complex changes rather than every PR. It fails if the rehearsal is shown expected answers, if it only praises clarity, or if its output is mistaken for actual approval to merge.

## Study exercises and connections

Choose a PR and write three possible summaries: a file list, a behavior statement, and a small structural sketch. Ask which one lets a new reviewer form the most accurate model in thirty seconds. Then inspect every evidence sentence and classify it as observed execution, static inspection, illustration, or unverified expectation.

Finally, attempt to reverse the change on paper. Which effects would remain after reverting code? Compare [code-review](code-review.md) for finding defects, [implement-spec](implement-spec.md) for assembling a whole-spec PR, and [writing-shape](writing-shape.md) for the broader principle that a block's form should serve its reader's next need.

## Semantic delta: what the refactor changes

1. **Lead with behavior and primary intent.** Add a concise problem/result statement grounded in the requirement, rather than relying on a visual alone. **Tradeoff:** A little prose precedes the source preferred sketch.

2. **Scale the representation.** Use the smallest useful visual and omit it when it adds no information. **Tradeoff:** Less uniformity across PR bodies.

3. **Separate evidence from illustration.** Report actual before/after observations and label pseudocode or unrun expectations. **Tradeoff:** Some PRs will honestly show less evidence than the template appears to promise.

4. **Explain reversal concretely.** Replace a bare door and one-word blast radius with persistent effects and rollback requirements. **Tradeoff:** Risk discussion may need more than a label.

5. **Retain attribution.** Preserve source credits metadata and CREDITS.md for the borrowed visual guidance. **Tradeoff:** Adds a small support file to the derived package.

The full executable instructions are in [the refactor](../refactored/pr/SKILL.md). Existing invocation policy is preserved through copied agents/openai.yaml: ordinary discovery. Claude-only frontmatter keys are omitted from the Codex package; that packaging change does not change who may invoke it. The original proposal has ordinary discovery and lives in [reviewer-rehearsal](../original-skills/reviewer-rehearsal/SKILL.md). These are study packages, not installed skills.

## Evaluation boundary

The authorial recommendation above is a hypothesis, not an evaluation result. [The independent evaluation](../evals/pr.md) contains the recorded trial responses and judgments. That run record takes precedence over predictions in this chapter. Reading the instructions and inspecting their syntax cannot prove improved collaboration; that requires a task with an observable result and an informative failure case. The source, proposed port, and original proposal should be distinguishable in any comparison.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. The refactor retains the source's useful demand for visible change shape, before/after evidence, and practical reversal consequences. It scales the visual to whether it helps and defers structure to the repository template rather than forcing three headings on every small change. Illustrative sketches are explicitly separated from execution evidence, and missing baselines are not fabricated. Credit remains present without introducing an unavailable show-me dependency. The preserved credit prose describes older near-verbatim wording, but that is an attribution-maintenance issue, not a behavioral blocker.

No workflow repair needed. Update the credit prose to describe adaptation rather than near-verbatim reproduction when maintaining attribution.

Evidence: [source/skills/in-progress/pr/SKILL.md:12-168](../source/skills/in-progress/pr/SKILL.md), [source/skills/in-progress/pr/CREDITS.md:3-3](../source/skills/in-progress/pr/CREDITS.md); [refactored/pr/SKILL.md:14-24](../refactored/pr/SKILL.md), [refactored/pr/CREDITS.md:3-3](../refactored/pr/CREDITS.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **reviewer-rehearsal**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

A fresh reader reconstructs behavior, evidence, inspection priority, and merge concern without receiving expected answers. Comparing claims with the diff gives the rehearsal an observable output. This is a specialized comprehension probe, distinct from code review: it tests whether the explanation directs review attention correctly rather than trying to approve the implementation.

**Weakness:** The supplied diff may let the reader repair a misleading PR body silently. A correct reconstruction therefore does not necessarily demonstrate that the body itself was helpful.

**Suggested improvement:** Have the reader explicitly attribute each key conclusion to body, diff, or inference. If necessary, stage body-first then diff inspection to isolate which wording misdirects attention without revealing expected answers.

A proposed test was: Rehearse this complex migration PR with a fresh reader. Find whether its description gives the right model of rollback and directs attention to the consequential paths. Success would mean: The review records what the body communicates versus what the diff establishes, identifies any material misunderstanding, and links a minimal explanation repair to it. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
