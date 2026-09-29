# To Tickets — make each unit own a result and its prerequisites

**Study question:** what can a fresh collaborator complete without borrowing hidden context?

## Understand the original

To-tickets turns a settled plan, spec, or conversation into independently workable units. Its central rule is the tracer bullet: a narrow but complete path through the relevant layers, producing behavior that can be demonstrated or verified when the ticket finishes. A database ticket, then an API ticket, then a UI ticket may look orderly, but each is incomplete until the others exist. A vertical slice owns a small result. [S1]

The skill also makes dependencies explicit. Each ticket names what blocks it, and a ticket with no remaining blockers belongs to the frontier of available work. This is more than a numbered task list. It distinguishes ordering that is truly required from ordering that merely reflects how the planner happened to think of the tasks.

The process reads the full supplied context, optionally explores current code, looks for prefactoring, drafts slices, and quizzes the user on granularity and blocking edges before publishing. Local mode writes one file per ticket under the feature's issues directory. Remote mode publishes one issue per ticket, blockers first, so later tickets can refer to real identifiers. It preserves the parent issue rather than closing or rewriting it. [S2]

There is an important exception to vertical slicing. A wide mechanical refactor may break thousands of callers if applied atomically. The source uses expand-contract: introduce the new form alongside the old, migrate callers in batches, then remove the old form after every batch completes. If even batches cannot remain green independently, they share an integration branch and the final integration ticket owns the green result. This exception prevents a useful principle from becoming dogma.

## A worked example

A project needs saved search filters. A horizontal decomposition might create “database table,” “save endpoint,” “list endpoint,” and “screen.” None of the first tickets gives a user a working capability. An alternative first slice lets one user save a named filter and retrieve it after reload, including storage, interface, and a minimal interaction. A second slice renames it; a third deletes it; a fourth handles sharing if sharing is actually in scope.

The first slice has a concrete demo path: set a filter, save it, reload, reopen it, and observe the same values. Its acceptance criteria distinguish the base state from the completed state. “The app still builds” is useful verification but not the feature's completion criterion. “Sharing permissions work” would be wrong if sharing belongs to another ticket.

Dependencies should be real. Rename and delete may both depend on the first saved-filter path but not on each other. They can sit on the frontier together if their shared interface is settled. Parent membership under the feature spec is organizational; it does not make one sibling block another.

Now replace the feature with renaming a widely used identifier type. A vertical user story may be impossible without breaking callers. Expand-contract becomes appropriate: introduce compatibility, migrate bounded consumer groups, then delete the old type. The ticket graph should show contract removal blocked by every migration. This is a coherent exception, not permission to split every ordinary feature by layer.

## What it gets right

The source makes the output useful to a fresh context. A ticket is not a reminder for the person who wrote it; it is a portable contract for someone who has not seen the discussion. Behavioral descriptions, acceptance criteria, and explicit blockers reduce reliance on memory.

The user quiz is also well placed. Granularity and dependency decisions influence cost across every future implementation run. Reviewing them before publication is cheaper than discovering that twenty tickets are incorrectly sliced. The agent proposes a concrete breakdown, so the user is reacting to real choices rather than answering abstract questions about project management.

The strongest reason to keep the original is its forceful vertical-slice bias. Models often decompose by nouns or file layers because that is easy to enumerate. Repeatedly asking what becomes demonstrable at the end of a ticket counters that tendency. The source also includes the wide-refactor exception, so preserving its intention does not mean enforcing vertical slicing at all costs.

## Criticism and limits

“Fits a fresh context window” is directionally useful but not a precise sizing unit. The capacity depends on the model, repository complexity, and verification cost. A ticket with few acceptance bullets can still require extensive discovery; a larger mechanical migration can be straightforward. The refactor sizes by coherent scope, evidence burden, and known interfaces, using context capacity as a constraint rather than a magic threshold.

Acceptance criteria need stronger discipline. The documentation reports criteria already true at the base, criteria owned by sibling work, and criteria that merely restate the request. The refactor asks what observation would show a criterion false and which ticket owns making it true. Not every criterion must literally be red at the base—preserved compatibility can be essential—but new capability should have a discriminating observation. [S3]

The source conflates native blocking and sub-issue relationships in one publication sentence. These are different relationships. A parent organizes work; a blocker prevents it from starting. A planner can preserve both without claiming that one represents the other. This distinction matters for any automated frontier query.

The blanket ban on file paths aims at durability, but it can discard helpful evidence. A stable symbol or a path pinned to the inspected commit can help a fresh implementer find the relevant area. The refactor permits explicitly non-normative locator hints while keeping behavior and interfaces authoritative. A ticket should not command “edit line 42,” but it need not force everyone to rediscover a known entry point from scratch.

## Porting bet and dependency cost

**Bet: adopt for multi-session builds.** This is likely to improve collaboration when the work will outlive one conversation or be divided among agents. For a small coherent change, skip tickets. The falsifier is execution friction: how often a fresh implementer needs missing decisions, how often criteria depend on unfinished sibling work, and how much rework arises from wrong edges. Ticket count and apparent parallelism are poor success measures.

The dependencies are a settled source contract and a configured publication destination. Local Markdown is sufficient. A remote tracker adds authentication, label existence, and relationship capabilities. The refactor does not assume a particular current CLI flag merely because the pinned docs mention it; it uses the repository's verified tracker instructions.

The package remains a single entrypoint with copied explicit-only metadata and MIT attribution. It deliberately does not become a dispatcher. Creating a correct work graph and running that graph are different responsibilities, with different concurrency and ownership concerns.

## Refactor: own the observation, validate the graph

The new version begins by checking whether splitting earns its cost. It drafts the fewest slices that each deliver a coherent result, makes the demonstration path explicit, and names pre-agreed test seams and relevant exclusions. Prefactoring goes first only when it demonstrably reduces the upcoming work rather than becoming a general cleanup opportunity.

Before publication, it checks for cycles, missing blockers, false dependencies, and criteria owned by another ticket. It presents the breakdown for the user's consequential decisions, reusing any prior approval. The wide-refactor path keeps expand-contract and clearly labels where green verification is promised.

Publication is treated as a resumable operation. Record identifiers as tickets are created, read back bodies and relations, and report partial success precisely if a later operation fails. A retry should continue from known IDs rather than duplicate the first half of the plan. The final artifact remains a graph of work the user can choose to dispatch.

## Original proposal: Design the Learning Sequence

The inspired proposal applies sequencing to learning rather than implementation. A study plan often lists topics in textbook order without considering which exercise gives the learner useful feedback next. This skill builds a sequence of small tasks whose outputs demonstrate understanding, with prerequisites tied to actual capability.

For studying this compendium, one sequence could begin with explaining a skill in one's own words, then applying it to a small case, then identifying a failure mode, then designing a counterexample, and only then modifying the skill. Each step produces an observable result. Reading ten chapters before attempting anything resembles horizontal slicing: the learner may accumulate vocabulary without discovering where understanding fails.

The skill adapts the next task from the learner's demonstrated result, not from a fixed personality profile. If the explanation is fluent but the worked example fails, more definitions may not help; a contrasting case might. Its novelty claim is limited: scaffolding, retrieval practice, and mastery-based sequencing are established educational ideas. The proposal packages them as a pragmatic collaboration tool that creates useful work rather than a long syllabus.

Its cost is designing and reviewing exercises. Its falsifier is transfer: can the learner handle a new case with less guidance? Completion of a checklist or recognition of terminology is insufficient. The skill should not overpersonalize from sparse interactions or treat a single mistake as a stable trait.

## Study and transfer

1. Turn a three-layer feature plan into one narrow demonstrable slice.
2. Identify a criterion that preserves compatibility and one that proves new capability.
3. Draw a graph in which siblings share a parent but are not mutually blocked.
4. Build a three-step learning sequence for one chapter and state what each output reveals.

Read [implement](implement.md) for the consumer of these tickets and [setup-matt-pocock-skills](setup-matt-pocock-skills.md) for the tracker contract. Good decomposition is a service to future execution, not a performance of planning sophistication.

## Numbered semantic delta

1. **D1: Test whether decomposition is needed and prefer the fewest independently useful slices.** A small coherent change should not become a ticket bureaucracy. Tradeoff: Less parallelism when splitting would create coordination without value.

2. **D2: Give each ticket a demo/verification path and criterion that distinguishes the base from completion.** Acceptance can otherwise be already true or depend on another ticket's unowned work. Tradeoff: More thought per ticket before publication.

3. **D3: Validate blocker graph and distinguish parent membership from execution dependency.** Native sub-issue links do not mean blocked-by. Tradeoff: Some relationships need separate API operations.

4. **D4: Keep stable locator hints with provenance when they reduce rediscovery, without treating stale paths as requirements.** A blanket path ban can throw away useful evidence. Tradeoff: Hints must be explicitly non-normative and refreshed by implementers.

5. **D5: Read back published tickets and resume partial publication using created IDs.** A retry after partial success should not duplicate work items. Tradeoff: Publication has a small reconciliation step.

6. **P1: Omit Claude-only disable-model-invocation frontmatter while copying agents/openai.yaml explicit-only policy.** The target is Codex packaging; its metadata preserves invocation intent and the bundled validator accepts the supported frontmatter. Tradeoff: This package is not a byte-identical Claude entrypoint.

## Artifacts and evaluation

[Refactored skill](../refactored/to-tickets/SKILL.md) · [Original proposal: design-the-learning-sequence](../original-skills/design-the-learning-sequence/SKILL.md) · [Exact source diff](../diffs/to-tickets.diff) · [Independent evaluation](../evals/to-tickets.md)

These are authored candidates, not installed skills. The linked independent evaluation records the actual text responses, case-bound grades and limitations. The design bet in this chapter is distinct from those observations. Source documentation issue reports are historical claims in the pinned bundle, not independently reproduced measurements.

## Source locators

- **S1:** [skills/engineering/to-tickets/SKILL.md, lines 9-40](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/to-tickets/SKILL.md#L9-L40) ([local snapshot](../source/skills/engineering/to-tickets/SKILL.md)).
- **S2:** [skills/engineering/to-tickets/SKILL.md, lines 42-105](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/to-tickets/SKILL.md#L42-L105) ([local snapshot](../source/skills/engineering/to-tickets/SKILL.md)).
- **S3:** [docs/engineering/to-tickets.md, lines 56-80](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/docs/engineering/to-tickets.md#L56-L80) ([local snapshot](../source/docs/engineering/to-tickets.md)).

## Supporting-resource disposition

- agents/openai.yaml: **copy** — Preserve source UI metadata and invocation policy exactly.
- source/LICENSE: **copy** — Retain Matt Pocock MIT attribution in every refactored package.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. Vertical slices, true blockers, user agreement, one local file per ticket, remote publication, parent preservation, and the expand-migrate-contract exception remain. The refactor improves graph quality with cycle and false-dependency checks and assigns final integration ownership where intermediate batches cannot pass independently. It does not confuse parenthood with blocking or readiness with an empty blocker list. Partial-publication readback prevents duplicate issues. The added requirement for a distinguishing observation respects already-passing compatibility criteria. No material semantic defect found in the specified ticket workflow.

None. Keep configured label side effects within publication authorization, as already made explicit in to-spec.

Evidence: [source/skills/engineering/to-tickets/SKILL.md:25-67](../source/skills/engineering/to-tickets/SKILL.md), [source/skills/engineering/to-tickets/SKILL.md:105-105](../source/skills/engineering/to-tickets/SKILL.md); [refactored/to-tickets/SKILL.md:14-39](../refactored/to-tickets/SKILL.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **design-the-learning-sequence**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It sequences work by demonstrated capability and adapts to actual output. Ending with a fresh transfer case gives the sequence a stronger target than completing content. Its distinct role is orchestration across exercises. Transfer-test handles one assessment; misconception-lab constructs a diagnostic exercise. This can be the entry point for that family.

**Weakness:** The skill assumes usable subject material and assessment judgment without specifying how to handle uncertain answer keys or cases with several valid approaches.

**Suggested improvement:** Pilot it as the learning-family entry point. Reuse the other two mechanisms rather than repeating them, and validate the answer criterion before attributing disagreement to the learner.

A proposed test was: Turn these introductory concurrency readings into three short exercises that reveal what I can actually reason about, adapting after each answer. Success would mean: Each exercise has an observable capability and success criterion, later tasks respond to learner evidence, and the final report separates demonstrated performance from untested ability. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
