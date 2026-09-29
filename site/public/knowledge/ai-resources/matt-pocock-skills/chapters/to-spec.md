# To spec: preserve settled intent as a buildable contract

**Source:** [source/skills/engineering/to-spec/SKILL.md](../source/skills/engineering/to-spec/SKILL.md) at [Matt Pocock commit c55ee46073ed](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/to-spec/SKILL.md). Human commentary: [source/docs/engineering/to-spec.md](../source/docs/engineering/to-spec.md). These are the pinned study materials, not claims about the latest upstream release.

**Collaboration bet: PILOT.** Pilot for work spanning sessions; preserve exact decisions, confirm only unsettled test seams, and keep readiness distinct from execution.


## Understand the skill

To-spec synthesizes a conversation and codebase understanding into a specification, then publishes it to the configured issue tracker. It explicitly says not to interview the user (source SKILL.md:7). The premise is that the deciding already happened. This is a record of choices, not a fresh product workshop.

There is one deliberate exception: before writing, it sketches testing seams and checks them with the user (SKILL.md:13–19). A seam is the interface at which observable behavior will be tested. Existing seams are preferred, the highest possible seam is favored, and fewer are better. Those choices become part of the specification used by later implementation and review.

The template includes problem, solution, extensive user stories, implementation decisions, testing decisions, exclusions, and notes (SKILL.md:21–75). It avoids file paths and code snippets that may become stale, except a decision-rich prototype snippet such as a state machine or schema when code expresses the decision more precisely than prose.

The source applies ready-for-agent without further triage. It assumes tracker and label vocabulary were configured by setup; otherwise it tells the user to run that setup. These are meaningful operational semantics, not incidental formatting.

## Worked example: settled export behavior

A prior conversation settled that exports are snapshots, preserve a consistent ordering, omit deleted records, and remain retrievable for seven days. The specification should carry those exact commitments. “Users can export their data” is too weak, even if it sounds like a polished user story.

The agent inspects the existing export interface and proposes testing through the current service boundary. If that seam was already agreed in the discussion, it should reuse the agreement rather than ask again. If the seam is new, the narrow check is appropriate. The instruction not to interview does not mean invent a testing architecture in silence.

Suppose the retention period is still undecided. The agent should mark it unresolved and avoid presenting the spec as ready for execution. It should not fill the gap with a conventional default merely because the template expects a complete solution. Synthesis preserves what is known; it does not manufacture agreement.

If a prototype produced a small reducer defining legal export states, the source allows including that decision-rich code. This is a carefully chosen exception to the anti-snippet rule. It preserves an exact model without embedding the throwaway page or all implementation details.

## Why it is valuable

The skill addresses context loss across sessions. A long discussion can contain decisions no fresh implementer will reconstruct from a short task title. The specification becomes the place those choices are available together.

Its focus on test seams before prose is particularly good. Testability is not an afterthought delegated to whichever agent happens to implement the work. Agreeing the observable boundary also discourages tests that mirror internal helpers and break under harmless refactoring.

The out-of-scope section preserves explicit refusals. These often matter more than a generic solution summary because assistants tend to expand useful-looking work. “No continuous synchronization” is a concrete limit that should survive even if the specification contains a sophisticated export design.

## When to use it and when to skip it

Use it after deciding, when work must cross several sessions or people. A completed wayfinder map is another input: follow its decision links, then synthesize them into one usable contract. A map is not already a specification.

For a small change that fits one session, a separate spec may add another compression step without enough benefit. If the idea is still unclear, use an inquiry workflow first. To-spec should not become a way to launder an unexamined proposal into an authoritative issue.

The source template fits user-facing features better than architectural refactors. A refactor may need invariants, interface contracts, and migration constraints more than a long list of actor stories. A faithful improvement should preserve exhaustive behavior coverage without forcing every task into product-management grammar.

## Criticism and strongest case for the original

“LONG” and “extremely extensive” user-story requirements can reward volume rather than distinct coverage (SKILL.md:33–41). A model may invent stories to satisfy the demand or repeat one requirement through many actors. The important invariant is complete capture of agreed behavior, including negative requirements, not a long list for its own sake.

The seam preference can also be overcompressed into “one test boundary is always best.” A high seam is useful when it observes the behavior reliably, but a single end-to-end interface may obscure failures or make a critical invariant hard to check. The refactor preserves existing, high-level seams while allowing a justified second boundary.

The ready-for-agent label is more consequential than the source treats it. The human docs describe workers that poll that label and start building the entire spec. Readiness and execution authorization are different, but a machine may not distinguish them. The target should inspect configured label meaning before applying it.

The source also does not explicitly check for an overlapping issue or link the ADRs it respects. A narrow related-work search and relevant decision links improve reuse without turning synthesis into an audit. Existing history is valuable when it changes this specification, not as a reason to read every issue.

The strongest case for the original is its decisive phase boundary. No endless re-interview, a concrete template, and immediate publication make the workflow useful. Refactoring should not insert an unnecessary approval ceremony after the user already asked to publish a spec. It should handle actual unresolved decisions and task authorization, not hypothetical caution.

## Portability and collaboration bet

The package is explicit-only and depends on tracker configuration, domain vocabulary, and repository evidence. The refactor retains that policy through agents/openai.yaml. If configuration is missing, it can prepare a concrete local draft and identify the missing publication prerequisite. That advances the requested work while keeping publication status honest.

My **pilot** bet is that the revised skill preserves more exact constraints with fewer invented stories. The falsifier is a fresh implementer making an incompatible choice despite the original discussion settling it, or the refactor turning every synthesis into another interview. A longer spec is not stronger if it hides the decisive requirements.

## Refactor and numbered delta

1. **Capture settled commitments before formatting.** Preserve values, exclusions, ordering, and unresolved status. Template completeness cannot justify invention.
2. **Confirm only genuinely new seams.** Reuse existing agreement. Prefer the highest useful observable boundary, with additional seams justified by behavior.
3. **Adapt coverage to the work.** User stories for user-facing features; invariants and contracts for internal changes. Distinct coverage replaces length as the demand.
4. **Link applicable decisions and related work.** Search narrowly and avoid duplicate issues.
5. **Separate readiness from dispatch.** Apply configured ready labels only when their semantics match the user's authorized workflow. Otherwise publish as a spec without triggering unintended execution.
6. **Keep a concrete draft when publication is blocked.** Report what is missing and where the reviewable result lives.
7. **Preserve prototype precision.** Inline only the decision-rich fragment, clearly attributed, rather than a whole demo.

A useful evaluation includes an exact negative requirement, an unresolved default, an already-agreed seam, and a tracker where ready-for-agent is an execution trigger. Inspect the published or drafted artifact and label actions, not just the presence of familiar headings.

## Original proposal: intent-examples

Intent-examples turns a requirement into concrete examples and counterexamples before implementation. It is not a test-writing skill. It clarifies what outcomes count as satisfying the user's intent and exposes where prose still admits incompatible behavior.

For the export example, “omit deleted records” becomes a case with an item deleted before the snapshot, one deleted after it, and an explicit question about which time defines inclusion. The examples may reveal that a seemingly settled requirement was underspecified. The skill records that gap rather than inventing an answer.

The limited novelty in this collection is a standalone bridge from intent to discriminating examples across software and nonsoftware work. TDD focuses on implementation behavior; this proposal can also evaluate a research brief, document rewrite, or workflow design. Its cost is a few carefully chosen cases. Its falsifier is examples that merely restate the requirement or fail to distinguish reasonable competing interpretations.

The strongest examples are small enough to reason about and different enough to expose a boundary. They should not become a giant acceptance catalog for a trivial task. Their purpose is shared meaning, with executable tests as an optional downstream expression.

## Study exercises and connections

Take a discussion and extract three exact commitments plus one unresolved point. Write a short spec preserving all four statuses. Replace a vague story with an example that could reveal disagreement.

Compare [grill-with-docs](grill-with-docs.md) for deciding and vocabulary, [wayfinder](wayfinder.md) for the multi-session decision map, and [writing-for-agents](writing-for-agents.md) for behavioral precision. A specification earns its place by carrying intent across a boundary without quietly becoming the author of that intent.

## Package and evaluation record

Read the [complete refactored skill](../refactored/to-spec/SKILL.md), the [original proposal](../original-skills/intent-examples/SKILL.md), and the [author metadata](../reviews/author-to-spec.json). The metadata accounts for every source support file. The refactor retains Matt's MIT notice and existing invocation policy; the original proposal uses ordinary discovery. Neither package is installed by this chapter.

[Independent behavioral evaluation](../evals/to-spec.md) now records the trial responses and case-bound grades. The bet above remains a design hypothesis, not a demonstrated collaboration gain. Judge the recorded trial on the behavior it actually tested; tidy formatting alone cannot establish improvement.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. The refactor preserves synthesis from settled discussion, repository/domain context, testing seams, consequential implementation decisions, scope exclusions, and tracker publication. Replacing an obligatorily long user-story list with distinct behaviors or internal invariants makes the output fit non-user-facing work without reducing coverage. Prototype snippets retain their precision exception. New or missing decisions are not silently invented, and unresolved drafts are not presented as ready. Publication remains the invoked action, while dispatching labels are distinguished from ordinary issue creation. No actionable defect found.

None. Verify each agreed requirement against the actual generated spec rather than relying on template completeness.

Evidence: [source/skills/engineering/to-spec/SKILL.md:7-19](../source/skills/engineering/to-spec/SKILL.md), [source/skills/engineering/to-spec/SKILL.md:33-69](../source/skills/engineering/to-spec/SKILL.md); [refactored/to-spec/SKILL.md:7-24](../refactored/to-spec/SKILL.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **intent-examples**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It tests prose against plausible implementations that disagree, while distinguishing proposed cases from agreed decisions. This exposes ambiguity without requiring an implementation or test framework. The strongest mechanism is semantic clarification by examples tied to user intent. Boundary-cases is a classification-specialized version, and integration-contracts applies the same idea at a software seam.

**Weakness:** The procedure can merely illustrate an already chosen interpretation unless it deliberately constructs two reasonable outcomes for the same ambiguous case.

**Suggested improvement:** Make the two-plausible-interpretations test central. Keep the examples few, and route classification-only problems to a shared boundary-case mode rather than installing two competing generic triggers.

A proposed test was: Clarify 'users can cancel an export' with a few cases that distinguish queued, running, and already completed exports without silently choosing product policy. Success would mean: At least one case exposes a consequential ambiguity or confirms a needed boundary, and unresolved expectations remain labeled for the appropriate decision owner. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
