# Retro: change the environment that produced the failure

**Source status: in-progress / beta, excluded from the promoted plugin.**

**Port bet: pilot.** Review an actual coding session and recommend targeted improvements to navigation, checks, instructions, and information access.

## Source and reading map

- [SKILL.md:7-25](../source/skills/in-progress/retro/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/retro/SKILL.md#L7)
- [SKILL.md:27-44](../source/skills/in-progress/retro/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/retro/SKILL.md#L27)
- [agents/openai.yaml:1-5](../source/skills/in-progress/retro/agents/openai.yaml) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/retro/agents/openai.yaml#L1)

## Understand the source and its status

Retro looks backward at a coding session to improve the environment in which future agents work. It is not primarily a celebration, blame exercise, or summary of tasks completed. The assistant reads primary session material, defaults to the current session if none is specified, and looks for recurring friction in navigation, automated checks, coding standards, globally loaded instructions, tool economy, no-op instructions, and information access. It then presents candidates in severity order.

The bucket README calls this skill a stub with design notes, yet the pinned SKILL.md contains a substantive procedure and detailed judgments. Both facts matter. We should neither pretend it is an empty placeholder nor silently promote it to an upstream production recommendation. It remains in-progress, explicit-only, and excluded from the promoted plugin. The source also asks for writing-for-agents as a writing guide; that dependency concerns concise environmental instructions, not the core retrospective analysis.

Several distinctions are unusually valuable. An existing check that is unwired or broken is a different finding from a missing check. Mechanical patterns should usually be enforced deterministically rather than added to prose. Navigation pointers can be more effective than copying documentation into a global instruction file. Information access, such as visible server logs, can solve a failure that no exhortation to “be more careful” will fix.

## The mechanism: move learning to the right place

Suppose an agent repeatedly imports from private module paths. One response is to add “Do not import internals” to AGENTS.md. Another is to add an import-boundary rule to the existing linter and link the relevant convention near the module. Retro asks which intervention changes future behavior most reliably at the least context cost. A deterministic rule can catch a mechanical violation every time; prose depends on recall and interpretation.

For a judgment call, the answer differs. “This API exposes too much internal state” is not a simple syntactic pattern. A review standard with examples may be appropriate. For a navigation failure, a pointer from the entry file to the real ownership document may be enough. For missing runtime evidence, making logs accessible may be better than adding another instruction to inspect logs. The skill's value is this placement decision.

Use it after a session with informative friction: repeated rediscovery, an avoidable defect, expensive tool calls, a missed check, or a wrong assumption caused by inaccessible information. It can also improve a smoothly completed session if there is a specific repeated cost to remove. Do not force a retrospective after every tiny change or generate new rules merely to justify running it. A useful retrospective can conclude that no environment change is warranted.

## Worked example: the missing linter that already existed

Imagine a TypeScript session where the agent introduced an import cycle, discovered it late, and spent time untangling modules. The repository already has a boundary-check script, but the umbrella check command omits it. A superficial retrospective recommends installing another dependency scanner. The source explicitly guards against this: inspect package scripts and CI first. The real intervention is to wire the existing check where developers and agents actually run validation.

The report should cite the session moment when the cycle became costly, the existing command, and the missing connection. It should explain why wiring the check would have caught this class of problem earlier. A small negative fixture can later demonstrate that the rule rejects a cycle. Merely finding a configuration file does not establish that it executes, and a passing clean run does not prove it rejects violations.

Now consider a different failure in the same session: the agent chose a poor abstraction because it misunderstood business ownership. Adding a mechanical import rule cannot fix that. The retrospective might recommend a short domain pointer near the entrypoint or a focused reviewer question. These are separate causal claims and should not be bundled under a vague “improve agent instructions” recommendation.

## What it gets right and where it overstates

The source's environmental focus is strong because many repeated assistant failures arise from affordances, not a lack of general intelligence. It also takes context pressure seriously. Always-loaded instructions have a recurring cost, so moving detail behind useful pointers can improve both discovery and attention. Tool economy is included without pretending token reduction is the sole objective.

The source overstates several generalizations. It treats the absence of a pre-commit or CI guardrail as a finding in itself, even when the repository is a disposable experiment or documentation-only artifact. It says mechanical violations get deterministic checks “full stop,” which ignores maintenance cost and rule complexity. It also assumes reviewers need little exploration because they receive a diff, and that coding standards belong to review rather than implementation. In practice, reviewers often need substantial surrounding context, and implementation sometimes needs a critical invariant before code is written.

The strongest reason to keep the original is that its strong defaults counter a real bad habit: responding to every failure by making AGENTS.md longer. A softer refactor must retain that challenge. The right correction is not “anything depends”; it is to demand a causal connection between the observed failure, the intervention, and the next behavior it should change, while comparing the intervention's ongoing cost.

## Refactor and collaboration bet

The port retains all seven environmental categories but uses them as search lenses, not required output headings. Each proposed improvement includes the observed friction, likely mechanism, smallest change, and a way to tell whether it worked. Existing tooling is inspected before replacement. Mechanical checks are preferred when their benefit justifies maintenance; judgment guidance is routed to the point where it is needed, which may be implementation, review, or both. No changes are made merely because a retrospective was requested.

My bet is a pilot after a few substantial sessions. It should reduce recurrence of a specific failure without steadily expanding the instruction surface. The falsifier is repeated accumulation of rules with no observed behavioral improvement, or interventions that would not actually have prevented the cited failure. A second falsifier is causal overconfidence from one anecdote: a slow search does not automatically prove missing navigation was the cause.

Portability depends on access to the relevant session record and repository configuration. It does not require full access to all personal history. Logs may be incomplete, so the report should state coverage limits. The source's request to suggest improvements does not itself authorize global configuration edits, new tool access, or external service changes. A port can prepare precise patches and apply them when the surrounding task authorizes implementation.

## An original proposal: instruction-ablation

Instruction-ablation tests whether a particular piece of agent guidance changes behavior enough to deserve its context and maintenance cost. It selects a consequential instruction, identifies the behavior it is meant to affect, and compares otherwise similar small tasks with and without that instruction. The test should include a case where the instruction helps and a neighboring case where it might misroute work. It is a practical way to investigate the source's “no-op” category.

For example, a paragraph demanding an elaborate plan before every edit might help a cross-cutting migration but slow a typo correction. An ablation can reveal that the rule should be scoped to uncertain or multi-file work rather than deleted outright. Conversely, a navigation pointer may look trivial but materially reduce time to find the right file. The skill measures observable decisions and artifacts, not whether the model repeats the instruction's vocabulary.

The proposal is novel within this collection as a controlled test of instruction value rather than an editorial judgment about wording. Its cost is duplicated small tasks and some unavoidable variance. It fails if the comparison changes several things at once, gives one condition more context, or treats one lucky result as a general law. It should generate a cautious retain, narrow, rewrite, or remove recommendation, with the actual sample size and limits visible.

## Study exercises and connections

Choose one avoidable failure from a session and propose three interventions: prose guidance, a deterministic check, and an information-access change. Explain which causal mechanism each addresses. Reject any intervention that merely sounds generally beneficial without touching the observed failure.

Then identify an instruction you suspect is a no-op. Design two small tasks that would reveal whether it matters, including one where it could impose needless cost. Compare [writing-for-agents](writing-for-agents.md) for instruction design, [setup-pre-commit](setup-pre-commit.md) for one enforcement surface, and [setup-ts-deep-modules](setup-ts-deep-modules.md) for a concrete architectural rule that can be tested negatively.

## Semantic delta: what the refactor changes

1. **Use causal candidates instead of category completion.** Connect each recommendation to a session event, mechanism, and observable next-run effect. **Tradeoff:** Requires more reasoning per recommendation and often yields fewer suggestions.

2. **Qualify deterministic-check absolutism.** Prefer mechanical enforcement when the pattern and maintenance economics justify it. **Tradeoff:** Some rare mechanical mistakes will remain handled by ordinary review.

3. **Route standards by need.** Give implementers critical invariants when needed instead of reserving all standards for reviewers. **Tradeoff:** May add a small amount of implementation context.

4. **Separate diagnosis from mutation.** Present or prepare improvements without treating retrospective analysis as permission to alter global tooling. **Tradeoff:** Some useful changes remain proposals until implementation is in scope.

5. **Retain status honesty.** Treat the source as a substantive beta procedure despite its bucket description as a stub. **Tradeoff:** Readers must carry a slightly untidy upstream status distinction.

6. **Adapt Codex packaging without changing invocation.** Omit Claude-only disable-model-invocation and argument-hint keys while preserving explicit-only policy in the copied agents/openai.yaml. **Tradeoff:** The study package targets Codex metadata rather than being a byte-identical cross-host manifest.

The full executable instructions are in [the refactor](../refactored/retro/SKILL.md). Existing invocation policy is preserved through copied agents/openai.yaml: explicit invocation only. Claude-only frontmatter keys are omitted from the Codex package; that packaging change does not change who may invoke it. The original proposal has ordinary discovery and lives in [instruction-ablation](../original-skills/instruction-ablation/SKILL.md). These are study packages, not installed skills.

## Evaluation boundary

The authorial recommendation above is a hypothesis, not an evaluation result. [The independent evaluation](../evals/retro.md) contains the recorded trial responses and judgments. That run record takes precedence over predictions in this chapter. Reading the instructions and inspecting their syntax cannot prove improved collaboration; that requires a task with an observable result and an informative failure case. The source, proposed port, and original proposal should be distinguishable in any comparison.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. The source's distinctive target, the agent's environment, remains central. The refactor connects observed session events to navigation, tooling, checks, instruction placement, and information access, rather than producing generic self-improvement advice. It inspects existing enforcement before adding more and distinguishes a broken check from a missing one. Relaxing the absolute preference for checks and the claim that reviewers need no exploration improves applicability without removing deterministic enforcement as a useful option. Proposed, applied, and verified changes are separated. No actionable loss found.

None. Assess recommendations against actual session evidence and their likely effect on a later run.

Evidence: [source/skills/in-progress/retro/SKILL.md:7-25](../source/skills/in-progress/retro/SKILL.md), [source/skills/in-progress/retro/SKILL.md:29-44](../source/skills/in-progress/retro/SKILL.md); [refactored/retro/SKILL.md:8-18](../refactored/retro/SKILL.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **instruction-ablation**: **repair**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It specifies paired tasks, frozen criteria, fresh contexts, isolated workspaces, negative cases, and observable behavior. That is a credible design for testing instruction costs and benefits. This directly tests collaboration machinery rather than merely recommending better prompts. Its value depends on a valid contrast between the instruction-present and instruction-absent conditions.

**Weakness:** The instruction may still exist in inherited system guidance, another skill, or task wording. Fresh contexts alone do not establish that the intended treatment actually differs.

**Suggested improvement:** Before execution, audit both effective instruction contexts for contamination and interaction. If the rule cannot be removed or isolated, narrow the claim to an incremental wording test and prohibit causal removal recommendations.

A proposed test was: Test whether this 'always ask before editing' rule prevents mistakes or only delays work, using one genuinely ambiguous task and one already authorized edit. Success would mean: Conditions differ in the intended instruction, retain equal task and permission context, and produce preserved outputs judged against predefined behavior and effort criteria. This is a test proposal, not an observed outcome.

**Repair to instruction-ablation:** a fresh context does not ensure a clean absent condition. The skill now requires checking inherited and equivalent rules; an unavoidable duplicate rule makes the feasible experiment a comparison of incremental wording. A null contrast cannot show that the underlying behavior requirement is useless. [Current review](../reviews/original-followup.json) and [targeted probe](../evals/FOLLOWUP-RESULTS.md).

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
