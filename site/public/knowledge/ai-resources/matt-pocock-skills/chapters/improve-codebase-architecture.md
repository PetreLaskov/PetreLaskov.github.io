# Improve Codebase Architecture — make the next real change easier

**Study question:** what evidence would make a refactor worth doing now?

## Understand the original

This skill surveys a codebase for deepening opportunities. It is not an instruction to rewrite everything that looks untidy. A candidate should put useful behavior behind a smaller, more coherent interface so tests and callers do less coordination. The explicit goals are testability and easier navigation for an AI agent. It borrows the vocabulary of codebase-design and the project's domain terms, while existing architectural decisions constrain what should be reconsidered. [S1]

The source begins with scope. If the user names a module or pain point, follow that direction. Otherwise inspect recent history and prefer areas that change often. A refactor earns its cost through future work; improving dormant code may never pay back. Exploration then looks for experienced friction: understanding one concept requires bouncing among tiny modules, callers repeat policy, tests protect helpers while real failures occur in their composition, or dependencies leak through supposed seams.

The distinctive output is visual. Every candidate gets files, problem, solution, benefits, strength, and a before/after diagram. The report goes to a temporary HTML file and names a top recommendation. Only after the user chooses a candidate should an interview begin. That sequencing separates selecting worthwhile work from designing how to do it. The source explicitly says not to propose interfaces before selection. [S2]

After selection, grilling explores constraints, dependencies, the new module shape, and surviving tests. Domain terms can be sharpened in CONTEXT.md as actual decisions arise. A rejection with a durable reason can become an ADR so future surveys do not keep suggesting the same thing. This is stronger than merely remembering that a user once said no: the recorded reason lets future work judge whether the condition still applies.

## A worked example

Suppose a billing change requires edits in three handlers, two formatting helpers, and a payment adapter. The upcoming feature is partial refunds. Recent commits show that refund and cancellation rules have repeatedly changed together. A survey reads the actual call paths and finds that each handler independently chooses currency rounding and decides when a refund is final.

A useful candidate is “centralize refund outcome policy behind one refund interface.” Its before diagram shows the repeated decisions at three callers; its after diagram shows those callers supplying a request and receiving an explicit outcome. The benefit is not that six files become two. It is that the meaning of a final refund and the rounding rule have one owner, and a test can exercise the behavior through the same seam used by all callers.

Another candidate might collapse two wrappers that simply rename payment SDK operations. It should be weaker if those wrappers express a deliberate adapter boundary or if nobody changes them. The top recommendation should explain the difference using actual upcoming work. A report with three speculative candidates should be allowed to recommend doing none of them.

When the user selects refund policy, interface design becomes appropriate. Before that, elaborate types and a multi-agent comparison would be premature investment in an unchosen direction. The survey should leave the production code unchanged, although the later conversation may produce agreed documentation updates.

## What it gets right

The skill makes architecture discussable. A before/after visual can reveal caller knowledge and scattered policy more quickly than paragraphs about “maintainability.” It asks the agent to name the files and explain the gain in locality or leverage, which makes the recommendation more concrete than an abstract architecture lecture.

Hot-spot scoping is also pragmatic. The question is not whether a design could be more elegant in principle, but whether the cost will be repaid. Linking a candidate to the next planned feature makes that judgment even stronger. The source documentation itself describes “how can we make this change easy?” as an effective way to invoke the survey.

The strongest reason to retain the original is its refusal to implement on discovery. Architecture improvements are consequential judgments. Finding friction does not establish that a particular consolidation is worth migration risk. A report and selection checkpoint let the user see the option before the agent commits to it. The skill's visual ambition should survive; replacing it with a generic risk checklist would lose much of its teaching value.

## Criticism and limits

A survey framed to surface opportunities has a finding bias. The documentation admits that it rarely says the codebase is fine; “all speculative” becomes an indirect substitute. The refactor allows the direct conclusion: no justified improvement in the inspected scope. That is a valuable result if it saves us from spending a day polishing a stable area.

Recent churn is evidence of activity, not necessarily architectural pain. A generated file, a formatting migration, or a dependency update can dominate the log. Likewise, an agent feeling friction may reflect unfamiliarity rather than bad structure. Candidates should cite a concrete caller obligation, defect pattern, or repeated change, not merely the number of files opened.

The source calls the report self-contained, yet the scaffold loads Tailwind and Mermaid from CDNs and uses loose Mermaid security settings. Offline or restricted browsers can show unstyled output or missing diagrams. The public docs identify this and note that the workflow does not render the result. Inline CSS and SVG are a straightforward portability improvement for a static report. This is not a claim that all remote scripts are unsafe; the dependency is simply unnecessary for the promised artifact. [S3, S4]

The docs and source also differ in emphasis. “Never changes code” is consistent with the survey, but the later workflow can update domain documentation. A study guide should say that precisely rather than promise a completely read-only session. Reports of runaway grilling are important context, but an arbitrary question cap is not the best fix. The repository explicitly rejects fixed caps because useful depth varies. The refactor preserves that stance while requiring selected scope and meaningful progress. [S5]

## Porting bet and dependency cost

**Bet: pilot around real upcoming changes.** I expect the skill to help when we can name an area whose current structure makes work expensive. I am less confident about periodic untargeted scans. The falsifier is whether the chosen improvement reduces the caller coordination or change spread it claimed to address. Track one before/after change rehearsal or actual follow-on feature; do not count prettier diagrams as architectural success.

The dependencies are codebase-design, relevant domain documentation, optional exploration agents, and an HTML viewer. The refactor uses the available host tools rather than assuming a particular named agent or desktop opener. It preserves explicit-only invocation. It does not need a tracker to produce a report, and the absence of CONTEXT.md is not a reason to create empty documentation before inspection.

The supporting report reference is rewritten rather than discarded. It still gives candidate cards, visual patterns, a legend, and a top recommendation. It adds the evidence location and a concise uncertainty statement so the diagram cannot quietly present a speculative after-state as an observed fact.

## Refactor: turn the survey into a decision aid

The revised process starts with the user's direction or a justified hot spot, reads relevant decisions, and gathers enough evidence to support a small set of candidates. Each candidate must say what callers currently know, what a proposed module would own, and why the change matters now. It also names migration cost. A deepening can improve future work while being a poor use of today's effort.

The report comes first and the skill stops. A report-only request is fully satisfied there. If a candidate is chosen, the conversation can continue into design and record durable decisions. Rejecting an option for “not this week” does not become an ADR banning it forever. The stopping condition is a useful decision, not exhaustion of every possible architectural question.

## Original proposal: Subtract a Dependency

The related original proposal takes architecture in the opposite direction from feature construction. It asks whether a dependency, abstraction, workflow step, or data copy can be removed while preserving the outcome users need. The exercise begins with what the dependency actually supplies and what consumes it. It then designs a subtraction experiment rather than assuming replacement is necessary.

For the billing example, perhaps a formatting service exists only to translate a single currency value into a string. Removing it may let the owned refund module use an already available formatter. Alternatively the dependency may encode an essential regulatory convention; the experiment should reveal that and keep it. The point is not minimalism as taste. It is reducing maintenance obligations that no longer buy useful capability.

The novelty claim is limited: dependency reduction and deletion are established engineering practices. The skill packages them as a deliberate option-generation method, useful when the normal assistant bias is to add another library, adapter, or process. Its cost is mapping consumers and checking less visible obligations such as deployment or licensing. Its falsifier is any demonstrated loss of required behavior or a replacement that creates more obligations than it removes.

## Study and transfer

1. Pick a recent hot spot and explain whether its churn is policy change or mechanical noise.
2. Draw the caller knowledge before and after a proposed deepening.
3. Write a “no worthwhile refactor” conclusion with a clear inspection scope.
4. Identify a dependency that looks removable, then argue the strongest reason to keep it.

Read [codebase-design](codebase-design.md) for the design lens and [diagnosing-bugs](diagnosing-bugs.md) for the missing-test-seam route into this survey. The refactor aims to improve the quality of a choice, not maximize the amount of architecture work generated.

## Numbered semantic delta

1. **D1: Permit no justified candidates and separate evidence from speculative payoff.** A survey should not manufacture cleanup demand. Tradeoff: Some runs produce a short report instead of attractive diagrams.

2. **D2: Retain hot-spot scoping but relate candidates to actual upcoming changes.** Recent churn alone can reflect generated code or mechanical edits. Tradeoff: May need one additional source of context.

3. **D3: Use offline HTML with inline CSS/SVG and inspect rendering when possible.** The supplied self-contained report depends on remote scripts and can silently fail. Tradeoff: More manual diagram layout, less automatic graph rendering.

4. **D4: Report first, then explore only a selected candidate; honor report-only requests.** Source docs describe unwanted long interviews before options. Tradeoff: The process ends before an implementation-ready design unless selected.

5. **D5: Record recurring rejected candidates only for durable reasons and actual user decision.** Temporary deprioritization is not a permanent architecture prohibition. Tradeoff: Some suggestions may recur when conditions change.

6. **P1: Omit Claude-only disable-model-invocation frontmatter while copying agents/openai.yaml explicit-only policy.** The target is Codex packaging; its metadata preserves invocation intent and the bundled validator accepts the supported frontmatter. Tradeoff: This package is not a byte-identical Claude entrypoint.

## Artifacts and evaluation

[Refactored skill](../refactored/improve-codebase-architecture/SKILL.md) · [Original proposal: subtract-a-dependency](../original-skills/subtract-a-dependency/SKILL.md) · [Exact source diff](../diffs/improve-codebase-architecture.diff) · [Independent evaluation](../evals/improve-codebase-architecture.md)

These are authored candidates, not installed skills. The linked independent evaluation records the actual text responses, case-bound grades and limitations. The design bet in this chapter is distinct from those observations. Source documentation issue reports are historical claims in the pinned bundle, not independently reproduced measurements.

## Source locators

- **S1:** [skills/engineering/improve-codebase-architecture/SKILL.md, lines 9-35](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/improve-codebase-architecture/SKILL.md#L9-L35) ([local snapshot](../source/skills/engineering/improve-codebase-architecture/SKILL.md)).
- **S2:** [skills/engineering/improve-codebase-architecture/SKILL.md, lines 37-71](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/improve-codebase-architecture/SKILL.md#L37-L71) ([local snapshot](../source/skills/engineering/improve-codebase-architecture/SKILL.md)).
- **S3:** [skills/engineering/improve-codebase-architecture/HTML-REPORT.md, lines 3-55](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/improve-codebase-architecture/HTML-REPORT.md#L3-L55) ([local snapshot](../source/skills/engineering/improve-codebase-architecture/HTML-REPORT.md)).
- **S4:** [docs/engineering/improve-codebase-architecture.md, lines 52-96](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/docs/engineering/improve-codebase-architecture.md#L52-L96) ([local snapshot](../source/docs/engineering/improve-codebase-architecture.md)).
- **S5:** [out-of-scope/question-limits.md, lines 3-14](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/out-of-scope/question-limits.md#L3-L14) ([local snapshot](../source/out-of-scope/question-limits.md)).

## Supporting-resource disposition

- HTML-REPORT.md: **rewrite** — Retain visual candidate cards and before/after diagrams; use offline inline CSS/SVG, evidence labels, and actual rendering checks instead of CDN assumptions.
- agents/openai.yaml: **copy** — Preserve source UI metadata and invocation policy exactly.
- source/LICENSE: **copy** — Retain Matt Pocock MIT attribution in every refactored package.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. The survey remains separate from detailed interface design and implementation. User scope or meaningful history guides exploration; actual friction drives candidates; an offline visual before/after report precedes user selection. Domain context, ADR conflicts, recommendation strength, deepening benefits, and the subsequent selected-candidate conversation survive. The support file now genuinely works offline and distinguishes observed architecture from proposals, correcting the source's self-contained/CDN tension. No candidate is required when evidence supports none. No material lost invariant or unavailable rendering dependency found.

None. Inspect produced diagrams when rendering is available and keep unrendered review explicitly limited.

Evidence: [source/skills/engineering/improve-codebase-architecture/SKILL.md:20-71](../source/skills/engineering/improve-codebase-architecture/SKILL.md), [source/skills/engineering/improve-codebase-architecture/HTML-REPORT.md:3-16](../source/skills/engineering/improve-codebase-architecture/HTML-REPORT.md); [refactored/improve-codebase-architecture/SKILL.md:14-40](../refactored/improve-codebase-architecture/SKILL.md), [refactored/improve-codebase-architecture/HTML-REPORT.md:3-13](../refactored/improve-codebase-architecture/HTML-REPORT.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **subtract-a-dependency**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It treats deletion as an option, preserves hidden obligations, rehearses consumers and recovery, and compares total responsibility rather than celebrating fewer packages or lines. The explicit subtraction lens can reveal alternatives ordinary optimization misses. Its contract-preserving experiment is distinct from contract-surface-audit's focus on caller knowledge.

**Weakness:** The scope spans software, workflows, abstractions, and data copies, whose hidden obligations differ substantially. 'Lower total obligation' needs a concrete comparison to avoid rhetorical scoring.

**Suggested improvement:** Keep the subtraction mechanism but require an explicit before-and-after obligation list tied to actual consumers. Add short domain examples only if needed; avoid turning the list into a permanent governance artifact.

A proposed test was: Evaluate whether this small configuration package earns its cost or could be removed using existing platform capabilities, including migration and failure recovery. Success would mean: The recommendation names which obligations disappear, which move to another owner, what behavior remains verified, and whether transition cost justifies the change. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
