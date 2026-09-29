# Writing for agents: instructions as behavior design

**Source:** [source/skills/productivity/writing-for-agents/SKILL.md](../source/skills/productivity/writing-for-agents/SKILL.md) at [Matt Pocock commit c55ee46073ed](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/writing-for-agents/SKILL.md). Human commentary: [source/docs/productivity/writing-for-agents.md](../source/docs/productivity/writing-for-agents.md). These are the pinned study materials, not claims about the latest upstream release.

**Collaboration bet: ADOPT.** Adopt behavioral pruning and context-pointer discipline; treat claims about leading words and negation as hypotheses to test.


## Understand the skill

The subject is writing that another agent will consume: project instructions, skill files, specifications, references, and runtime prompts. Matt is not teaching elegant human exposition here. He is asking what each sentence makes the agent do differently. The central move is to remove a sentence that contributes no behavior, rather than polishing it until it sounds authoritative. Agent instructions often become a sediment of general virtues: be careful, be clear, consider edge cases, follow best practices. Such lines can sound reassuring while giving a capable agent no useful decision rule.

The entrypoint is a reference rather than a mandatory recipe. Its two budgets are **context load**, paid whenever material sits in the model's context, and **cognitive load**, paid by the human remembering where instructions live and when to invoke them. Neither is automatically bad. An explicit-only tool transfers discovery work to the human, which can preserve agency in decisions that ought to remain deliberate. An always-discoverable skill pays a recurring cost to remove that burden. This is an architectural choice about attention, not merely a character-count optimization. See source SKILL.md:20–27.

A **context pointer** says what a reference contains and when the agent should read it. “See migration.md” names a file; “Before changing database schemas, read migration.md for compatibility and rollback requirements” carries a trigger. If an important reference is missed, Matt's first repair is to sharpen the pointer, not paste the whole reference into the main instructions. Steps belong where the agent needs to execute them; conditional reference belongs behind a pointer. Co-location keeps one concept's rules together. These are distinct from duplication: fragments scattered around a file increase reconstruction effort even when no sentence repeats (SKILL.md:10–43).

Completion criteria are another mechanism. “Review the changes” and “Account for every changed public interface” demand different legwork. Matt distinguishes the clarity of a done-condition from how much it demands, and warns that visible later steps can pull an agent prematurely toward completion. Splitting helps only across a real context boundary; another heading in the same prompt does not hide the future (SKILL.md:45–59). This matters in an investigative workflow whose final deliverable otherwise becomes a magnet for premature drafting.

## Worked example and appropriate use

Imagine an instruction file that says: “Be meticulous. Run tests. Check docs. Be security-conscious. Consult RELEASE.md when relevant. Then publish.” A superficial edit shortens the sentences. A behavioral edit asks which obligations are real. The result might say: “For a release, read RELEASE.md before selecting the version and distribution target. Complete its compatibility checks and report their results. Publish under the authorization established for this release.” The content changes because the weak pointer and vague demands were the failure, while three adjectives added nothing.

Now imagine RELEASE.md repeats the current package-manager command. If that command is cheap to discover in the repository, repeating it creates a stale cache. A genuinely hidden convention—why release candidates must stay on a particular channel—is harder to rediscover and earns its space. The skill encourages this distinction (SKILL.md:76–81). It is not a ban on documenting commands: a costly or error-prone lookup can justify a cache, particularly when the document is used outside the repository.

Use this skill when editing durable instructions, reviewing a skill that has grown after repeated failures, or separating common rules from specialized branches. It is less valuable for an ordinary email, an explanation to a beginner, or a one-off task already solved by a clear request. Human teaching often needs repetition and examples that an agent-facing control document can omit. Applying the pruning rule indiscriminately would damage the very compendium you are reading.

## What it gets right and what to challenge

Its best contribution is a vocabulary for diagnosing failure before adding another rule. A missed reference is a pointer problem; an irrelevant branch is a disclosure problem; a forgotten exception may be a completion or hierarchy problem. This discourages adding bold warnings everywhere. The distinction between preserving process and preserving identical output also matters. A research instruction should reliably seek the right evidence while allowing different answers when the evidence changes.

The strongest case for keeping the original is that it practices its method: a concentrated reference with one small skill-specific branch, leaving a capable model room to reason. Turning it into an enormous prompt-engineering framework would betray it. Many of the best lines are judgments, not steps, and would lose force if converted into a checklist.

Some explanations are too categorical. The text says negation activates prohibited behavior and advocates positive phrasing (SKILL.md:74); it describes pretrained leading words as compact behavioral anchors (SKILL.md:61–72). These are useful design hypotheses, not universal laws established by this repository. A clear prohibition can be indispensable. “Never overwrite the source file” may be more precise than an elaborate positive paraphrase. Likewise, “tight” can mean different things to different models and readers. Compressing three requirements into one word can remove distinctions the task depends on.

The no-op test also needs evidence. A line that appears obvious on normal examples may protect against a rare but consequential failure. Removing it after one happy-path run confuses absence of observed benefit with proof of uselessness. The original's instruction to settle disagreements by running the document is the right direction, but it does not supply a test design.

## Portability and collaboration bet

The prose discipline is portable. SKILL-MECHANICS.md:5–22 is less so: it describes a particular skill system and recommends explicit-only invocation whenever independent discovery is unnecessary. In this Codex target, ordinary discovery is the default for new skills, and agents/openai.yaml carries invocation policy. The refactor preserves the current package policy and rewrites the reference that would teach the wrong default.

My adoption bet is that reusable instructions become easier to revise without reducing coverage. The falsifier is specific: representative tasks plus known failure cases lose more obligations or require more rereading under the edited instruction. Fewer tokens alone would not vindicate it. I would retain a longer sentence that reliably prevents a meaningful mistake. No behavioral superiority has yet been measured in this authoring pass.

## Refactor and numbered delta

The refactor keeps the two loads, pointers, progressive disclosure, demanding completion criteria, and behavioral pruning. Its ambition is precision rather than volume. It adds a compact procedure for comparing a proposed edit with actual task cases, while refusing to make every writing job run a formal experiment.

1. **Separate required behavior from explanatory theory.** Leading words and positive phrasing become options whose value depends on an observed effect. This avoids presenting a prompt metaphor as settled cognitive science. The tradeoff is less rhetorical certainty.
2. **Prune against invariants and counterexamples.** Before deleting a protective line, identify its obligation and include the failure case it addresses. This costs review time but protects semantic compression.
3. **Use destination invocation rules.** Keep current policy; do not infer explicit-only discovery from sensitivity or personal taste. The support file describes portable principles and the actual Codex boundary.
4. **Distinguish demonstration from proof.** A useful trial can justify a local edit without showing model-independent superiority. Say what was tried and what remains unknown.
5. **Keep the small-file option.** A simple instruction need not gain a router, reference tree, report template, or evaluator merely because those mechanisms exist.

A useful trial compares an ordinary release, a schema migration with a hidden compatibility requirement, and a harmless task that should not trigger the migration reference. The last case matters: better recall bought by reading every reference is not a clean win.

## Original proposal: decision-preserving compression

The new skill targets a neighboring problem the collection does not isolate: compressing a decision-rich artifact while preserving its commitments. It is not another style skill. Its unit is the **commitment**: who must do what, under which condition, with which exception, status, and reason. This includes refusals and undecided points, which ordinary summaries often erase.

Suppose a meeting settled “exports may be retried twice, but only before the receiver acknowledges delivery; manual retries after acknowledgment need an operator.” A smooth summary might become “exports support retries.” The new skill extracts the condition and exception, then compresses the surrounding discussion while retaining those parts. It returns the compact artifact plus material losses the user must know about. It does not produce a traceability database for every paragraph.

The limited novelty claim is that this collection has many compression-producing workflows—handoffs, specs, glossaries—but no standalone compression pass whose success condition is retained decision semantics. The cost is one comparison pass and friction when the requested length cannot carry all commitments. The falsifier is a fresh reader making the same wrong decisions from the compressed version as from a naive summary. If that happens regularly, extraction has become ceremony.

## Study exercises and connections

Take an instruction file you use. Mark one pointer, one completion condition, one genuine exception, and one sentence you believe is a no-op. Remove only the last one, then construct a task where its absence would matter. If you cannot construct such a task, deletion becomes more plausible; it still is not proven by aesthetics.

Replace a vague virtue with a checkable outcome without adding a rigid universal workflow. Compress a decision paragraph to half its length and have another reader recover its conditions and exclusions. Compare [handoff](handoff.md), whose portability depends on references, and [to-spec](to-spec.md), whose synthesis must not invent decisions. [Wait-what](wait-what.md) offers the counterpoint: a repair for human understanding may add context while removing jargon.

## Package and evaluation record

Read the [complete refactored skill](../refactored/writing-for-agents/SKILL.md), the [original proposal](../original-skills/decision-preserving-compression/SKILL.md), and the [author metadata](../reviews/author-writing-for-agents.json). The metadata accounts for every source support file. The refactor retains Matt's MIT notice and existing invocation policy; the original proposal uses ordinary discovery. Neither package is installed by this chapter.

[Independent behavioral evaluation](../evals/writing-for-agents.md) now records the trial responses and case-bound grades. The bet above remains a design hypothesis, not a demonstrated collaboration gain. Judge the recorded trial on the behavior it actually tested; tidy formatting alone cannot establish improvement.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. The refactor retains the source's useful machinery: conditional pointers, distinct branches, information placement, co-location, observable completion, and behavioral pruning. It also preserves the distinction between a real context boundary and merely opening another file. The added requirement to compare representative behavior is consistent with the source's model-relative no-op test rather than bureaucratic expansion. Supporting mechanics explicitly address the Codex port, and the existing per-skill invocation policies remain in agents/openai.yaml. No actionable semantic defect found.

None from static inspection. Behavioral trials remain necessary to substantiate improved routing or brevity.

Evidence: [source/skills/productivity/writing-for-agents/SKILL.md:12-59](../source/skills/productivity/writing-for-agents/SKILL.md), [source/skills/productivity/writing-for-agents/SKILL.md:78-81](../source/skills/productivity/writing-for-agents/SKILL.md), [source/skills/productivity/writing-for-agents/SKILL-MECHANICS.md:9-22](../source/skills/productivity/writing-for-agents/SKILL-MECHANICS.md); [refactored/writing-for-agents/SKILL.md:11-28](../refactored/writing-for-agents/SKILL.md), [refactored/writing-for-agents/SKILL-MECHANICS.md:3-9](../refactored/writing-for-agents/SKILL-MECHANICS.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **decision-preserving-compression**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

The reader-action check is a useful mechanism: compress first, then compare a normal case and a boundary case against the source. Exact exceptions and status survive. More specific than ordinary summarization, though it shares commitment extraction and semantic comparison with decision-thread. Its distinct deliverable is a shorter usable artifact.

**Weakness:** The proposed check can miss a rare but decisive exception if both selected cases are convenient. 'Material omissions' also needs a destination-relative interpretation.

**Suggested improvement:** Retain the compact procedure. Select the boundary case from the most consequential exception, and distinguish omissions that change action from narrative intentionally removed.

A proposed test was: Reduce this incident handoff to 250 words while preserving who may restart processing, retry limits, and every condition requiring approval. Success would mean: The shortened handoff produces the same actions as the source on selected normal, exception, and unresolved-status cases, with accessible references for omitted detail. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
