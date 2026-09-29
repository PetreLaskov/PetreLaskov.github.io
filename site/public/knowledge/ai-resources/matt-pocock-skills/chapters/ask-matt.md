# Ask Matt — route by the obstacle, preserve the reason

**Study question:** when should an assistant help choose a method, and when should it simply do the work?

## Understand the original

Ask Matt is a map of a particular toolkit. Its unit is the *flow*: a route through skills conditional on the situation. A user with a settled small change does not need the same route as someone holding a foggy project, and neither needs the route for an incoming report. The skill is valuable because knowing twenty command names is different from knowing which uncertainty each one resolves. It makes those distinctions legible. The source's main route is interview, perhaps prototype, then either implementation directly or spec plus tickets before implementation. Triage and diagnosis join that route from different starting situations. [S1]

The prototype detour is especially instructive. Some questions cannot be settled by more articulate discussion: the user has to see an interaction, or a state transition has to run. The router sends those questions to throwaway code, carries the learning back, and returns to planning. The prototype is an experiment supporting a decision; it is not quietly promoted into the production implementation. Likewise, wayfinder produces decisions across a large map, and to-spec must collapse that map into a buildable account before tickets are made. These are distinctions about the kind of knowledge needed, not merely project size.

The map also separates references from drivers. Domain-modeling and codebase-design supply vocabulary under other processes; they need not launch new work. A substantial part of good routing is declining to call a process when the user only needs a definition. The standalone list serves a different purpose: a merge conflict, a manual credential step, or a message that did not make sense can interrupt any phase. Those tools are reached according to the immediate obstacle, not a ceremonial sequence. [S2]

Its second contribution is the phase boundary. At a natural pause between interview, implementation, and review, the agent considers whether to continue, clear, hand off, delegate, or compact. The order matters. Staying preserves the reasoning verbatim; a summary can lose the distinction that made a decision correct. Clearing is sensible when the previous material is irrelevant, while handoff is for material that must travel. Delegation can keep the main conversation intact while a tightly scoped task runs elsewhere. Compaction becomes the remaining choice when relevant context needs room. The original calls these judgments rather than objective tests, which is one of its most sensible qualifications. [S3]

## A worked example

Suppose we have agreed that a search page needs saved filters, but are unsure whether nested filters make sense to users. A keyword router might select implement because the sentence names a feature. Ask Matt should instead locate the unresolved question: a visible interaction. Its recommendation is to preserve the current discussion, take a bounded prototype detour, and return with the interaction decision. If the eventual change fits a single working session, implementation can proceed from that same discussion. If it spans sessions, the selected interface and constraints belong in a spec and self-contained tickets.

Now change one fact: the feature is already completely specified, and the user says, “I know I want to implement; please start.” Routing is no longer useful. A good map has done its job when the user knows where to go. It should not force another interview merely because interview appears at the head of the canonical chain. Finally, change the task again: “Which of these skills should I use?” Here the correct artifact is a recommendation with a reason and the next invocation, followed by a stop. The public documentation makes that recommend-and-stop contract explicit even though the source entrypoint does not. [S4]

## What it gets right, and the strongest case for keeping it

The best idea is routing by the *kind of work left*. Facts to gather, decisions to settle, code to write, and manual actions to perform are different bottlenecks. A single generic “plan, execute, review” recipe obscures them. Ask Matt teaches a small process language that makes collaboration less mysterious. It also prevents redundant work: tickets already prepared by to-tickets should not be sent back through incoming-request triage.

There is a strong case for keeping the original almost untouched when a team has deliberately adopted Matt's whole system. Its opinionated map is shared infrastructure. People can say “prototype detour” or “phase boundary” and mean something specific. Replacing that with a fully generic skills marketplace could erase the coordination benefit. The prose also explains why branches exist; a compressed table alone can make the system feel like arbitrary rules.

## Criticism and limits

The map is a secondary source. Its own documentation reports cases in which the router confidently described behavior without reading the named skill, and cases in which explicit-only skills disappeared from the injected discovery list and were declared uninstalled. Those are reported issues in this pinned source bundle, not independently reproduced findings from this study. They nevertheless identify an exact design weakness: availability evidence and behavioral evidence are not the same thing. [S4]

Some claims are too absolute. A working directory does not by itself make a stateful interview superior; a user may explicitly want a short, disposable conversation. The approximate 150,000-token “smart zone” is model- and workload-dependent. More basically, continuing does have costs: stale assumptions and irrelevant material can interfere with reasoning, even while retaining information. Conversely, delegation does not necessarily replace the main primary source; it can add a separate evidence stream. These corrections do not demolish the ordered tree. They make its claims narrower and more accurate.

The map's scope should stay honest. It covers Matt's promoted set, not every skill installed on the machine. It also cannot know that configuring a tracker is complete just because a route assumes it. The right response to uncertain availability is a conditional recommendation or a quick local check, not an invented workaround that changes the method without saying so.

## Porting bet and dependency cost

**Bet: pilot.** I expect the route distinctions to help when we are deciding how to approach substantial work, especially when a prototype or fresh execution context is genuinely useful. I do not expect frequent invocation to help ordinary requests. My falsifier is simple: over several real routing questions, count recommendations that changed our next action usefully, against extra turns and misroutes. If we repeatedly knew the answer already, or the router adds mandatory planning to settled work, keep this as a study reference rather than an active skill.

The dependency surface is broad because the map names nearly the whole suite. The refactor therefore keeps a bounded catalog and verifies the one or two claims that determine the route. It does not scan every skill on every invocation. It retains explicit-only invocation in the copied Codex metadata and does not install or launch anything. The phase-boundary reference remains a real resource, rewritten to avoid unsupported host-specific commands and numerical thresholds.

## Refactor: the smallest reliable map

The proposed version gives the user one recommended next step, the deciding fact, a short conditional continuation, and any actual prerequisite. When two routes are close, it explains the test that distinguishes them. It reads the target skill if skipping, sequencing, or describing that skill is consequential. This is not a research project into the whole catalog; it is checking the exact claim on which the advice depends.

It also names the stop condition inside the entrypoint: recommendation is the deliverable. That protects the user's intention when they ask for orientation. The operational map keeps the source's differentiating branches, including the prototype detour, multi-session spec/ticket path, incoming-report restriction, and distinction between reference and driver. The numbered delta list below records what changes and what is deliberately surrendered.

## Original proposal: Find the Binding Constraint

The original proposal moves one level earlier than routing. Before deciding which method to use, identify what is actually preventing a useful next result. The obstacle might be missing evidence, an unresolved preference, unavailable access, excessive scope, or an implementation defect. The skill then chooses the cheapest action that would distinguish these explanations. Its output is a short diagnosis of the obstacle and a concrete next move, not a personality model or a giant workflow.

Imagine repeatedly revising a project plan. We could invoke a better planning skill, but the real obstacle may be that nobody has decided who the project is for. Alternatively the audience may be settled and the missing fact is whether the required data can be obtained. These situations look similar in conversation yet need different actions. The proposed skill asks what observation would change the next step, checks what is already known, and tests that uncertainty first.

The novelty claim is limited: constraint analysis and value-of-information reasoning are established ideas. The proposal packages them as a collaboration repair move, independent of a named skill catalog. Its cost is a small amount of reflection that can become annoying if used on every request. The falsifier is whether the chosen action resolves the stated blocker; if it produces another abstract plan while the same obstacle remains, the method failed. It should retire itself immediately when the next action is already evident.

## Study and transfer

1. Take a past task that became complicated. Separate the initial obstacle from the workflow eventually used. Was the workflow solving that obstacle?
2. Explain why “new session” does not automatically mean “handoff.” Identify what actually needs to travel.
3. Compare a reference skill with a driver using [codebase-design](codebase-design.md). What should invoking each one authorize?
4. Test the router on an explicitly small task and on a design question needing an experiment. A good answer should change because the uncertainty changed.

Read [to-tickets](to-tickets.md) for the cost of making work portable across sessions and [implement](implement.md) for the handoff that the map ultimately supports. The refactored and original packages below are proposals; the evaluation link records independent assessment rather than a self-awarded score.

## Numbered semantic delta

1. **D1: State recommend-and-stop in the entrypoint.** The source documentation promises this but the source skill leaves it implicit. Tradeoff: Requires a separate invocation to execute the recommendation.

2. **D2: Verify only load-bearing target claims against its actual SKILL.md.** A map is secondary evidence and can lag its territory. Tradeoff: A little more reading before confident routing.

3. **D3: Treat hidden explicit-only skills as availability unknown, not absent.** Discovery listings can omit installed skills. Tradeoff: May leave a capability unresolved rather than invent a substitute.

4. **D4: Replace the fixed smart-zone token figure with host evidence and observable context risk.** Capacity and degradation vary by model and task. Tradeoff: Loses an easy numeric rule of thumb.

5. **D5: Keep routes as a concise decision table with optional phase-boundary reference.** Preserves branches while reducing repeated narrative. Tradeoff: Less of Matt's conversational exposition inside the operational prompt.

6. **P1: Omit Claude-only disable-model-invocation frontmatter while copying agents/openai.yaml explicit-only policy.** The target is Codex packaging; its metadata preserves invocation intent and the bundled validator accepts the supported frontmatter. Tradeoff: This package is not a byte-identical Claude entrypoint.

## Artifacts and evaluation

[Refactored skill](../refactored/ask-matt/SKILL.md) · [Original proposal: find-the-binding-constraint](../original-skills/find-the-binding-constraint/SKILL.md) · [Exact source diff](../diffs/ask-matt.diff) · [Independent evaluation](../evals/ask-matt.md)

These are authored candidates, not installed skills. The linked independent evaluation records the actual text responses, case-bound grades and limitations. The design bet in this chapter is distinct from those observations. Source documentation issue reports are historical claims in the pinned bundle, not independently reproduced measurements.

## Source locators

- **S1:** [skills/engineering/ask-matt/SKILL.md, lines 13-46](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/ask-matt/SKILL.md#L13-L46) ([local snapshot](../source/skills/engineering/ask-matt/SKILL.md)).
- **S2:** [skills/engineering/ask-matt/SKILL.md, lines 48-90](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/ask-matt/SKILL.md#L48-L90) ([local snapshot](../source/skills/engineering/ask-matt/SKILL.md)).
- **S3:** [skills/engineering/ask-matt/PHASE-BOUNDARIES.md, lines 17-55](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/ask-matt/PHASE-BOUNDARIES.md#L17-L55) ([local snapshot](../source/skills/engineering/ask-matt/PHASE-BOUNDARIES.md)).
- **S4:** [docs/engineering/ask-matt.md, lines 48-90](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/docs/engineering/ask-matt.md#L48-L90) ([local snapshot](../source/docs/engineering/ask-matt.md)).

## Supporting-resource disposition

- PHASE-BOUNDARIES.md: **rewrite** — Keep ordered context-choice tree; remove fixed token folklore and distinguish recoverable transcript from lossy working context.
- agents/openai.yaml: **copy** — Preserve source UI metadata and invocation policy exactly.
- source/LICENSE: **copy** — Retain Matt Pocock MIT attribution in every refactored package.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. The router still locates work by its obstacle and offers the main idea-to-build flow, triage and debugging on-ramps, wayfinding, independent tools, and context transitions. Reading a target before making a consequential claim prevents the map from overriding its actual skill. The rewritten phase support removes an unsupported universal token threshold and recognizes lossiness and host capabilities. Recommendations explicitly stop before execution. Routing by desired persistence rather than merely being in a directory is a sound adaptation. No actionable semantic defect found.

None. Target-skill inspection should continue to override any simplified routing-table shorthand.

Evidence: [source/skills/engineering/ask-matt/SKILL.md:13-90](../source/skills/engineering/ask-matt/SKILL.md), [source/skills/engineering/ask-matt/PHASE-BOUNDARIES.md:19-55](../source/skills/engineering/ask-matt/PHASE-BOUNDARIES.md); [refactored/ask-matt/SKILL.md:8-39](../refactored/ask-matt/SKILL.md), [refactored/ask-matt/PHASE-BOUNDARIES.md:3-12](../refactored/ask-matt/PHASE-BOUNDARIES.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **find-the-binding-constraint**: **merge**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It checks whether the obstacle is already resolved, distinguishes types of blockage, and performs a cheap observation before generating another plan. Success is removal or elimination of a specific obstacle. The intervention is useful, but its causal core is evidence-fork applied to stalled work, preceded by a scope check. It is not a substantially new diagnostic mechanism.

**Weakness:** 'Binding' suggests a unique dominant constraint that may not exist. The instruction to update the obstacle once is arbitrary when the first check reveals a second inexpensive dependency.

**Suggested improvement:** Merge as the stalled-work entry point to evidence-fork. Drop the rigid single-update limit and stop by value: continue only while the next bounded check is cheaper than proceeding.

A proposed test was: We keep revising the import plan without progress. Determine whether the actual blocker is missing sample data, a format decision, or a parser failure. Success would mean: A bounded observation removes or rules out a stated obstacle and produces a concrete authorized action, rather than a more elaborate description of the stall. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
