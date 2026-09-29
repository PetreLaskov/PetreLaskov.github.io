# Wayfinder: a map of decisions, not a disguised build queue

**Source:** [source/skills/engineering/wayfinder/SKILL.md](../source/skills/engineering/wayfinder/SKILL.md) at [Matt Pocock commit c55ee46073ed](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/wayfinder/SKILL.md). Human commentary: [source/docs/engineering/wayfinder.md](../source/docs/engineering/wayfinder.md). These are the pinned study materials, not claims about the latest upstream release.

**Collaboration bet: CONDITIONAL.** Use only when planning genuinely exceeds one session; keep destination, dependencies, claims, and user-owned decisions explicit.


## Understand the skill

Wayfinder handles an effort whose destination can be named but whose route is unclear and too large for one session. It creates a shared map on the issue tracker and resolves **decision tickets**, not implementation slices (source SKILL.md:7–13). This distinction is the whole design. The output of a normal map is a clear route, after which specification or implementation can begin.

The map is an index. It contains the destination, notes, one-line links to resolved decisions, fog not yet sharp enough to ticket, and exclusions. Open work is found by querying child issues rather than copying a second list into the map (SKILL.md:19–53). Details live in tickets. This low-resolution entrypoint allows a later session to orient without loading all prior debate.

The **frontier** is the open, unblocked, unclaimed child tickets. Claims use assignment; dependency relationships should be native to the tracker where possible. Human-facing references use issue titles with links, not bare numbers (SKILL.md:55–71). These are operational details with a human purpose: the map should be readable and work should not be accidentally duplicated.

## The four ticket types

A grilling ticket resolves a choice through live discussion and domain modeling. A prototype ticket produces a concrete artifact for the user to judge. Both are human-in-the-loop: the agent cannot answer on the user's behalf and call the choice resolved.

Research tickets gather facts through background workers. They are the exception to one ticket per session. Task tickets perform prerequisite work that unlocks a decision, such as obtaining access or making a sample available. They are not a loophole for implementing the destination (SKILL.md:73–80).

This taxonomy distinguishes kinds of uncertainty. A human preference cannot be settled by research; an API limit cannot be settled by a vote; an interaction may require something to see. The scheduling layer is valuable when it routes each uncertainty to an appropriate method.

## Fog, tickets, and scope

The map is deliberately incomplete. **Fog** means an in-scope area whose question cannot yet be stated sharply. A ticket means the question can be stated, even if blocked. Excluded work is neither: it lies outside the destination and should not later graduate into a ticket unless the effort is redefined (SKILL.md:82–101).

This is a subtle distinction. “We will need to consider migration” can be fog before the target model is chosen. “Can existing identifiers be preserved under model B?” is a sharp ticket even if model B's selection is pending. “Redesign the company's entire data platform” may simply be out of scope.

Resolution advances the frontier and may sharpen new questions. Graduated fog disappears from the map section so it does not live in two places. A ticket discovered to be out of scope is closed and linked under exclusions, not celebrated as a resolved step on the route.

## Worked example: replacing a legacy import system

A team wants a decision-ready design for replacing an import pipeline without losing customer mapping rules. The destination is not “build the new platform.” It is a supported migration design with unresolved implementation details small enough to plan afterward.

The opening breadth-first discussion identifies several questions: what behavior users rely on, what the current parser actually supports, whether the new data model represents exception cases, and who owns ambiguous mappings. Research can inspect external format specifications. A prototype can demonstrate difficult mapping cases. Grilling can settle ownership. A task may obtain an authorized anonymized sample that blocks the prototype.

The map should not pre-create twenty implementation tickets before these answers exist. It can keep “operational rollout shape” as fog until the migration behavior is understood. If the prototype reveals that a proposed entity model cannot represent a common case, downstream questions must change. Preserving the earlier decision as unquestionable would turn mapping into bureaucracy.

When all consequential questions within scope are resolved, the map points to the decisions and stops. A specification can synthesize them. The map's completion does not mean the importer has been built.

## What it gets right

Wayfinder's strongest idea is progressive planning. It lets unknown work remain visibly unknown without pretending a detailed backlog exists. The index/detail split also fits finite context: load the map, zoom into relevant tickets, and preserve history through links.

The separate ticket types are practical. They prevent every uncertainty being forced into an interview. The one-ticket-per-session rule protects concentration and makes a closure understandable. Research parallelism is useful because the user need not answer each source-reading task.

The strongest case for the original is that its vocabulary forms a coherent mental model. Destination, fog, frontier, and map are easier to reason with than a dense taxonomy of planning artifacts. Its detailed tracker mechanics make the metaphor executable rather than merely motivational.

## Criticism grounded in its mechanics

The planning boundary has an escape hatch: Notes can allow execution within the map (SKILL.md:13). But the agent writes those Notes. Without requiring a user-authorized exception, it can grant itself permission by editing its own instructions. The refactor closes that narrow hole without forbidding user-directed execution.

Assignment is also not a perfect concurrency lock. Two sessions can observe the same unassigned ticket before either writes. The skill needs to verify the claim and current blockers before acting, use stronger tracker primitives when available, and admit when exclusivity cannot be established. Prose cannot invent atomicity.

The source says to launch every created research ticket at charting time (SKILL.md:115), although the general frontier model contains blockers. A faithful repair launches only ready research. “Research is parallel” must not mean “dependencies do not matter.”

The source also has a setup ambiguity: if a tracker is missing, tell the user to run setup, but also default to local Markdown (SKILL.md:25). The refactor makes the fallback concrete and avoids silently claiming remote issue creation. Local records need identities, parent links, and blockers too.

Finally, an empty frontier does not prove completion. All remaining tickets could be blocked, claimed elsewhere, or part of a dependency cycle. Completion requires no unresolved in-scope tickets and no consequential fog, not merely no ticket immediately available.

## Portability and collaboration bet

This is the heaviest workflow in the set. It depends on tracker conventions and several skills. It is a poor default for small work. Its ticket-size reference to a 100K-token session is source-specific; the target should size a ticket to one bounded working session without assuming a fixed model capacity.

My bet is **conditional**. Use it when session boundaries and multiple uncertainty types already create lost context. It fails if the map adds more maintenance than clarity, if most early tickets are invalidated by speculative planning, or if it repeatedly becomes an implementation queue under another name. A map should reduce confusion and coordination cost, not merely make work look organized.

## Refactor and numbered delta

1. **Require a bounded destination and planning default.** Notes can record user-authorized execution scope, but cannot create it.
2. **Make tracker fallback explicit.** Use configured operations or local records with real identities and links; do not block all useful planning on setup.
3. **Verify claim and blockers.** Preserve assignment semantics while acknowledging concurrency limits.
4. **Launch ready research only.** Parallelism respects the same dependency model as other tickets.
5. **Preserve changed-decision history.** Reopen or supersede invalidated choices with reasons instead of silently designing around them or deleting their evidence.
6. **Separate no frontier from done.** Report blocked, claimed, or cyclic work accurately.
7. **Keep session boundaries.** Charting stops after mapping; a working session resolves at most one nonresearch ticket.

## Original proposal: stop-rule

Stop-rule defines when additional effort stops being worth its cost. It can govern research, design iteration, editorial polishing, or investigation without requiring a multi-session map. It asks what useful decision the work serves, what “good enough to act” means, and which unresolved issue would justify continuing.

For a research question, the rule might be: stop when the decision's two material facts are supported or their unavailability is clear; continue only if another source could reverse the conclusion. For a design, it might be a usable representative flow with no unresolved blocking interaction, not universal aesthetic satisfaction.

The limited novelty is a standalone stopping discipline across task types. Existing skills contain completion criteria, but do not isolate the tradeoff between residual uncertainty and further work. Its cost is that a premature rule can institutionalize shallow work. Its falsifier is stopping before the user's actual requirement is met, or continuing indefinitely because every possible improvement is classified as essential.

## Study exercises and connections

Classify five uncertainties as research, prototype, grilling, task, or fog. For each ticket, state the decision it unlocks. If a task directly delivers the product, explain why it probably belongs downstream.

Construct a map with no available frontier but unresolved work. Identify why it is not done. Compare [grilling](grilling.md), [research](research.md), [prototype](prototype.md), and [to-spec](to-spec.md). The map is useful when it coordinates those methods while preserving their boundaries.

## Package and evaluation record

Read the [complete refactored skill](../refactored/wayfinder/SKILL.md), the [original proposal](../original-skills/stop-rule/SKILL.md), and the [author metadata](../reviews/author-wayfinder.json). The metadata accounts for every source support file. The refactor retains Matt's MIT notice and existing invocation policy; the original proposal uses ordinary discovery. Neither package is installed by this chapter.

[Independent behavioral evaluation](../evals/wayfinder.md) now records the trial responses and case-bound grades. The bet above remains a design hypothesis, not a demonstrated collaboration gain. Judge the recorded trial on the behavior it actually tested; tidy formatting alone cannot establish improvement.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. The decision-map model remains intact: bounded destination, index rather than duplicated storage, precise tickets versus unresolved fog, separate exclusions, native blockers when available, ownership, and one nonresearch resolution per session. Research dispatch now respects readiness and avoids recursive workers. Human judgments remain with the user. The added distinction between an empty frontier and genuine completion closes a real gap around claims, cycles, and blocked tickets. Local fallback is explicit. No material lost invariant was found in the inspected planning path.

None for the default planning path. Keep explicit execution exceptions tied to their actual user-authorized scope.

Evidence: [source/skills/engineering/wayfinder/SKILL.md:21-101](../source/skills/engineering/wayfinder/SKILL.md), [source/skills/engineering/wayfinder/SKILL.md:105-128](../source/skills/engineering/wayfinder/SKILL.md); [refactored/wayfinder/SKILL.md:7-38](../refactored/wayfinder/SKILL.md), [refactored/setup-matt-pocock-skills/issue-tracker-local.md:9-11](../refactored/setup-matt-pocock-skills/issue-tracker-local.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **stop-rule**: **defer**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It protects explicit requirements, separates blockers from optional improvements, and ties stopping to usability rather than fatigue or output volume. These are sound completion principles. As written, it mainly restates competent task management. It does not offer a specialized stopping mechanism beyond identifying the required outcome and comparing progress with it.

**Weakness:** Research saturation, engineering acceptance, and aesthetic refinement need different evidence. The broad trigger can create another planning conversation without reducing actual overwork.

**Suggested improvement:** Defer standalone installation. Keep these principles in general working guidance, or narrow the skill to repeated research with an explicit decision-sensitivity test showing why another source could or could not matter.

A proposed test was: We have researched three viable vendors and keep opening new comparisons. Define what remaining evidence could still change the selection and when to decide. Success would mean: A stated review point ends optional exploration once requirements are met, while a specific unresolved blocker still causes continued work. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
