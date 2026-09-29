# Implement Spec: schedule a graph, integrate a product

**Source status: in-progress / beta, excluded from the promoted plugin.**

**Port bet: conditional.** Implement a ticketed specification on one integration branch by scheduling ready work and validating each integrated dependency.

## Source and reading map

- [SKILL.md:7-15](../source/skills/in-progress/implement-spec/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/implement-spec/SKILL.md#L7)
- [SKILL.md:17-35](../source/skills/in-progress/implement-spec/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/implement-spec/SKILL.md#L17)
- [agents/openai.yaml:1-5](../source/skills/in-progress/implement-spec/agents/openai.yaml) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/implement-spec/agents/openai.yaml#L1)

## Understand the source

Implement-spec starts from a specification with associated implementation tickets and aims to deliver one pull request for the whole specification. Its key insight is that tickets form a dependency graph, not an ordered checklist. At any time, a frontier of unblocked tickets can be implemented. The assistant should run implementer subagents across that frontier, each in its own branch and worktree, then merge completed work onto the PR branch. A merger subagent handles integration. New frontier tickets are launched as dependencies complete.

Communication is deliberately sparse and pointer-based. Agents receive links or paths to the specification, tickets, research notes, and prior commits instead of duplicated briefing essays. An optional exploration agent can save shared notes outside the repository so implementers spend their context on implementation. The coordinator creates the branch and draft PR, marks it as closing the spec and tickets, runs code review after completion, assigns the resulting fixes to an implementer, marks the PR ready, and cleans up worktrees.

The source's primary optimization is maximum concurrency. This is understandable: a graph with independent tasks should not be executed serially merely because a ticket list is written top to bottom. But the desired final object is one integrated product. Parallel completion of tickets is useful only insofar as it shortens the path to a correct, reviewable implementation.

## Why the graph model matters

Imagine an account-settings feature. A storage migration blocks the persistence layer; the persistence API blocks the editor UI; copy changes and an accessibility review may be independent. A simple ordered list wastes time when an unrelated task sits behind the migration. The frontier model recognizes that the copy and migration can proceed together. It also makes the critical path visible: accelerating work outside that path may not reduce overall completion time.

The source's separation of implementer, explorer, and merger is a useful context-management idea. Research notes can be reused without asking every implementer to rediscover the same API. Integration can receive focused attention rather than being treated as an incidental git command. Separate worktrees isolate partially completed edits and let each implementer run its own checks.

Use this workflow for a specification large enough to contain truly separable tickets, with clear acceptance criteria and available agent concurrency. Do not use it for three tightly coupled changes in one small file. Separate branches do not create semantic independence. If every ticket changes a shared interface whose design remains unsettled, parallel implementation will manufacture integration work rather than save time. The graph must describe actual dependencies, including decisions and contracts, not just issue links.

## Worked execution and a hidden failure

Suppose ticket A defines a billing-plan API, B implements its UI, C adds reporting, and D updates documentation. B and C depend on A; D can draft from the spec. The coordinator dispatches A and D. A's agent reports completion and pushes a commit. The tempting move is to launch B and C immediately from that agent's branch. Yet A might not integrate cleanly, its API might fail existing checks, or the merger might alter its exported types.

The safe and efficient readiness condition is stronger: A has been integrated into the shared branch and its relevant acceptance checks pass there. B and C then start from the integration revision that contains the accepted contract. This avoids successors building on a state that never becomes authoritative. If B and C both edit a central router, their scheduling must also consider file ownership, even if their logical features are independent.

Now imagine D says “all plans export usage reports” because the spec promised it, but C exposes a feature flag and only one plan supports the capability. A final ticket count will not catch the discrepancy. The integration review needs to evaluate the spec's behavior across the assembled product, including documentation and migrations. A whole-spec PR is complete when its acceptance claims hold together, not when every worker says done.

## Strengths, criticism, and the best case for keeping the original

The graph/frontier language is excellent and transferable. The source also resists a common orchestration failure, enormous repeated context dumps, by making artifacts the communication medium. Drafting the PR early makes the integration destination visible and gives the work one review surface. Isolated worktrees are a meaningful implementation choice, not just a decorative role assignment.

The main omission is an explicit state machine. “Completes” could mean authored, tested locally, merged, or accepted. Those states have different implications for dependents. Maximum concurrency also ignores bottlenecks such as shared files, limited test resources, or unstable interfaces. The source says to fix all review issues in one implementer, which can concentrate work sensibly but should not convert every speculative review comment into an unquestioned requirement. Cleanup is underspecified: deleting a worktree too early can lose diagnostic or unfinished work.

The strongest argument for the original is that a capable coordinator may already know these distinctions, and the brief instruction set leaves room for good judgment. The port should not become a project-management platform. A small live table of ticket state, dependencies, ownership, and integrated revision is enough. The objective is to remove ambiguous scheduling decisions, not to replace engineering with bookkeeping.

## The proposed port and collaboration bet

The refactor defines readiness as all dependencies integrated and relevant checks passing. It starts each worker from a known integration revision, gives it a bounded ownership area and acceptance target, and serializes merges onto the integration branch. It limits concurrency where shared files or contracts collide. Review findings are triaged by validity and scope, then verified on the assembled branch. Worktree cleanup follows successful integration and an ownership check.

My bet is conditional adoption for substantial ticketed work. The improvement should appear as fewer integration reversals, fewer duplicate edits, and shorter elapsed time along the actual critical path. It is falsified if coordination overhead exceeds the concurrency gain, or if the source's simpler coordinator produces equal correctness with fewer exchanges. Ticket throughput alone is a misleading metric; measure time to a passing whole-spec outcome and amount of integration rework.

Portability depends on multiple agents, isolated checkouts, git, a PR provider, and a review capability. The source calls a named code-review skill; the port can use the host's available equivalent while preserving the review purpose. The native host's worktree and PR tools should be preferred when available. A missing provider does not justify claiming a PR exists; the agent should leave a reviewable branch and accurately report the remaining external step.

## An original proposal: integration-contracts

Integration-contracts tackles the main source of wasted parallel work before implementation: agents share nouns but not behavioral contracts. The skill identifies a small number of seams where independently developed components meet and writes concrete examples of inputs, outputs, errors, and timing. It does not specify every internal function. It produces enough agreement that two workers can implement separate sides without inventing incompatible meanings.

For billing, a contract might specify that a plan lookup returns a stable identifier and an explicit unavailable state, that price formatting belongs to the presentation layer, and that an expired response must not overwrite a newer selection. A small fixture can express more than a page of architectural prose. The skill distinguishes a settled requirement from a provisional implementation choice and identifies who owns changes to the shared seam.

Its novelty within this collection is the explicit focus on executable or example-based agreements at concurrent work boundaries. The graph skill schedules tasks; this proposal makes their independence real. Its cost is early design effort and possible overconstraint. It fails if it freezes an unproven abstraction or generates elaborate schemas for seams that no two workers actually share. A successful contract is small enough to read, concrete enough to test, and changed deliberately when integration evidence shows it is wrong.

## Study exercises and connections

Draw a dependency graph for a feature you know. Add edges for unsettled decisions and shared-file ownership, not only explicit ticket links. Identify a task that appears parallel on paper but would in practice conflict with another. Then define exactly when each dependency counts as satisfied.

Simulate a worker completing against an old integration revision. Decide whether to rebase, rerun checks, or reject the work, and explain the behavioral reason rather than only the git procedure. Compare [to-tickets](to-tickets.md) for constructing the graph, [implement](implement.md) for a smaller execution unit, and [resolving-merge-conflicts](resolving-merge-conflicts.md) for integration when branches actually disagree.

## Semantic delta: what the refactor changes

1. **Define dependency satisfaction.** Unlock a dependent only after its prerequisite integrates and relevant checks pass on the shared branch. **Tradeoff:** Reduces apparent concurrency while preventing work on rejected intermediate states.

2. **Add ownership-aware scheduling.** Include shared files and unstable contracts as real constraints alongside ticket edges. **Tradeoff:** Requires a little coordinator state beyond the source graph.

3. **Make integration a validated transition.** Serialize merges and rerun contract-relevant checks before accepting completion. **Tradeoff:** Adds integration work that per-ticket passing tests cannot replace.

4. **Qualify review and cleanup.** Fix valid in-scope findings and retire worktrees only after ownership and work are accounted for. **Tradeoff:** Avoids automatic action on speculative comments or unexamined checkouts.

5. **Adapt Codex packaging without changing invocation.** Omit Claude-only disable-model-invocation and argument-hint keys while preserving explicit-only policy in the copied agents/openai.yaml. **Tradeoff:** The study package targets Codex metadata rather than being a byte-identical cross-host manifest.

The full executable instructions are in [the refactor](../refactored/implement-spec/SKILL.md). Existing invocation policy is preserved through copied agents/openai.yaml: explicit invocation only. Claude-only frontmatter keys are omitted from the Codex package; that packaging change does not change who may invoke it. The original proposal has ordinary discovery and lives in [integration-contracts](../original-skills/integration-contracts/SKILL.md). These are study packages, not installed skills.

## Evaluation boundary

The authorial recommendation above is a hypothesis, not an evaluation result. [The independent evaluation](../evals/implement-spec.md) contains the recorded trial responses and judgments. That run record takes precedence over predictions in this chapter. Reading the instructions and inspecting their syntax cannot prove improved collaboration; that requires a task with an observable result and an informative failure case. The source, proposed port, and original proposal should be distinguishable in any comparison.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. The full-spec integration branch and PR, task-graph frontier, isolated worker branches, context pointers, serial merging, final review, and cleanup remain. The candidate strengthens the crucial unlock rule: dependencies must be integrated and verified, not merely reported done by a worker. It also models undeclared shared-file conflicts and verifies cross-ticket interactions before delivery. Worktree retirement is tied to accounted-for work and inactive processes. Missing external PR capability is honestly reported. No material lost invariant or unsupported completion claim was found in static inspection.

None. A runtime without isolation/delegation still needs an explicit execution strategy rather than pretending worker infrastructure exists.

Evidence: [source/skills/in-progress/implement-spec/SKILL.md:7-35](../source/skills/in-progress/implement-spec/SKILL.md); [refactored/implement-spec/SKILL.md:8-20](../refactored/implement-spec/SKILL.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **integration-contracts**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It resolves a concrete case that plausible implementations would handle differently, assigns a shared contract location and change authority, and tests actual behavior during integration. The mechanism applies intent examples to independently owned components, adding coordination, version-sensitive agreement, and compatibility checks. Those additions justify a separate operational skill.

**Weakness:** When the contract changes during active parallel work, 'change the contract and consumers together' may not be possible without a transition or explicit acknowledgment from each owner.

**Suggested improvement:** Add a lightweight change rule for active work: identify affected owners and compatible versions before updating a shared contract. Avoid declaring integration readiness from example agreement alone.

A proposed test was: Two agents are building export production and download delivery independently. Define the minimum shared contract for readiness, absence, failure, and duplicate completion events. Success would mean: Both sides use the same concrete examples, no consequential seam ambiguity is mislabeled independent, and integrated behavior is checked against the agreed boundary. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
