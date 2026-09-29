# Writing Shape: make every paragraph earn its place

**Source status: in-progress / beta, excluded from the promoted plugin.**

**Port bet: pilot.** Shape a fixed body of raw material into a separate article through deliberate paragraph and format choices.

## Source and reading map

- [SKILL.md:7-26](../source/skills/in-progress/writing-shape/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/writing-shape/SKILL.md#L7)
- [SKILL.md:28-57](../source/skills/in-progress/writing-shape/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/writing-shape/SKILL.md#L28)
- [SKILL.md:59-77](../source/skills/in-progress/writing-shape/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/writing-shape/SKILL.md#L59)
- [agents/openai.yaml:1-5](../source/skills/in-progress/writing-shape/agents/openai.yaml) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/writing-shape/agents/openai.yaml#L1)

## Understand the source

Writing-shape is a collaborative composing procedure for a fixed pile of material. The input can be fragments, a transcript, a rough draft, or unstructured prose. The assistant must read it end to end, then create a separate article rather than editing the source. It establishes the reader's prior knowledge, drafts two or three openings that imply different theses or angles, and asks the author to choose or combine them. The chosen opening creates obligations for what follows.

The central question is “What does the reader need to hear next?” The answer becomes a paragraph or another kind of block. The assistant must argue for its form: prose, list, table, quotation, code, or callout. Each agreed block is saved immediately, with no batching into a surprise complete draft. The user decides when the article is done. Before every write, the assistant rereads the article and preserves edits made outside the conversation.

Like writing-beats, it tracks concepts that are grounded either as prerequisites or by earlier text. Unlike writing-beats, its emphasis is not a menu of next narrative pivots. It is the commitment created by an opening and the editorial justification for each next block. The source supplies sharp questions: what new work does this paragraph do, what breaks if it is cut, and has the draft drifted away from what the opening promised? These are tests of necessity, not merely polish.

## Why the method is worth studying

Many assistant-generated drafts are locally fluent and globally indecisive. Each paragraph sounds plausible, yet no paragraph is indispensable. Writing-shape tries to solve that by attaching every block to the reader's next need and the article's developing argument. It also gives form a function. A list works because its items are parallel; a table works because repeated comparison dimensions matter; a quote works because the wording itself matters. Those are better reasons than a general preference for scannability.

Use it when the raw material already exists and the author wants to participate closely in turning it into an argument. It suits essays, technical explainers, conceptual articles, and substantial statements where voice and sequence matter. It is less useful for mechanical copyediting, a fixed-template report, or a request to produce a complete draft autonomously. Its recurring discussion of format would be excessive for a two-paragraph email.

The source's strongest restraint is that the pile is a quarry, not a script. An anecdote can be split, two observations can merge, and a fragment can be paraphrased. This authorizes real composition while protecting the source file. The assistant should not merely preserve the order in which ideas happened to be spoken. At the same time, an absent example remains absent: the source explicitly says to name the gap and either obtain material or cut the section.

## Worked example: from transcript to argument

Suppose the raw transcript concerns remote meetings. It contains an irritated story about a status meeting, a useful design review, a claim that meetings destroy focus, and a note that shared ambiguity sometimes needs conversation. Candidate opening A begins with the status-meeting scene and promises a diagnosis of unnecessary synchronization. B begins with the design review and promises a distinction between coordination and joint thinking. C starts with the broad anti-meeting claim, but it may promise more than the material supports.

Choosing B changes the article. The next block should establish what happened in the design review that a document could not accomplish. A list of complaints would be premature because it answers a different opening. After the example, a paragraph can identify uncertainty that changed through interaction. A compact table may then compare situations in which everyone needs the same update with situations in which participants must construct a shared model. The table earns its place because the same dimensions recur.

If the author asks for a sweeping conclusion that no meeting should exceed fifteen minutes, the assistant should name the gap: nothing in the supplied material supports that threshold. It can offer a narrower conclusion about purpose and preparation instead. If the author rewrites the opening to foreground attention costs, the rest of the sequence must be reconsidered. Preserving their literal edit does not mean pretending its consequences stop at the first paragraph.

## Strengths, criticism, and the case for the original

The technique makes the author an editor with meaningful choices, rather than a person repeatedly saying “less generic.” The source's cut test is particularly valuable: it forces the assistant to distinguish an attractive sentence from a necessary sentence. Grounding protects reader comprehension, while immediate writes reduce the risk that an entire session's agreed prose disappears into chat history.

The main concern is interaction overhead. “Argue format choices out loud” can become a tedious debate over obvious decisions. The original asks the assistant to force a choice of opening, which may be productive in a workshop but unnecessarily rigid when the author delegates. Another weakness is the absolute language around concepts being grounded forever. A late passage may stretch an earlier concept into a new meaning; the assistant must notice that change rather than rely on a checklist.

The strongest reason to keep Matt's version is that its forcefulness is part of the pedagogy. An author learning to edit may benefit from having every form choice made explicit. A pragmatic port should therefore distinguish material editorial forks from routine formatting decisions without making the discussion disappear. It should preserve the original method as the default for an explicit shaping session and accept user delegation of the small decisions when that preference is clear.

## The refactor and a falsifiable collaboration bet

The proposed version retains full input reading, source immutability, different openings, conceptual grounding, paragraph-level commitment, and immediate saving. It changes forced choices into recommended choices with explicit user delegation available. It asks for reasons only when a format decision changes the reader's experience, and it uses a short opening promise as the test for drift. It also requires checking affected downstream transitions after rewriting an earlier block.

My bet is a pilot for substantial writing rather than universal adoption. Compared with asking for a whole draft, the method should reduce structural rewrites and produce paragraphs the author can explain the purpose of. The falsifier is that the process consumes more attention than it saves while leaving the same global problems. Another is that the assistant repeatedly wins small arguments about form while losing the author's voice. Count accepted blocks and later structural reversals, but also ask whether the user feels they are composing rather than approving generated prose.

Portability is excellent: no executable helper, provider-specific tool, or unusual file format is required. An editor capable of targeted changes and rereading is sufficient. The only mandatory interaction is the collaborative shaping requested by the user. The source remains beta and explicit-only; the refactor preserves both the experimental framing and invocation policy.

## An original proposal: thesis-stress-test

Thesis-stress-test asks whether a piece's central claim actually earns the scope and force with which it is expressed. It examines the strongest available support, the most damaging plausible counterexample, the causal mechanism, and the difference between what the author values and what the evidence establishes. The output is a revised thesis and a precise account of what would have to be added to defend the stronger version.

Applied to the meeting article, “Meetings destroy focus” may become “Recurring status meetings impose an attention cost when their main function is distributing information that people can read independently.” The narrower sentence is not automatically better: perhaps the author intended a polemic or a personal essay. The skill first identifies the kind of claim being made and preserves legitimate rhetorical purpose. It challenges an empirical universal differently from a stated preference or a metaphor.

The proposal fills a gap adjacent to the collection's writing tools: those tools test sequence, grounding, and form, while this one tests the claim-support relationship at the center of the piece. It costs a concentrated diagnostic pass and may require abandoning an attractive thesis. It fails if every interesting claim is weakened into triviality, or if an assistant's imagined objections outweigh actual evidence. The best result is a stronger, better bounded proposition that still gives the article a reason to exist.

## Study exercises and connections

Take a draft and write a five-word function beside each paragraph. If two neighboring paragraphs have the same function, decide whether they repeat, deepen, or contradict one another. Then remove one paragraph and identify the specific reader inference that becomes impossible. If nothing changes, consider cutting it.

Turn one paragraph into a list and one list into prose. Explain what changes in the relationship among the ideas; do not judge only by appearance. Finally, write the strongest opening your material cannot yet support and name exactly what is missing. Compare [writing-beats](writing-beats.md) for narrative branching, [writing-fragments](writing-fragments.md) for collection without composition, and [pr](pr.md) for a much shorter genre in which form serves a review decision.

## Semantic delta: what the refactor changes

1. **Preserve the editorial unit.** Keep one agreed block at a time, the raw pile read-only, and the opening as a commitment. **Tradeoff:** Retains a slower workshop workflow instead of maximizing draft speed.

2. **Scale discussion to the decision.** Explain meaningful format forks while accepting explicit delegation of routine choices. **Tradeoff:** Less pedagogical repetition than the original insistence on arguing every choice.

3. **Audit consequences of revision.** Check later grounding and transitions after a changed earlier block. **Tradeoff:** A targeted rewrite can reveal additional work that must be named.

4. **Clarify claim provenance.** Name absent factual support and distinguish proposed wording from invented evidence. **Tradeoff:** Some polished transitions must remain unfinished until support exists.

5. **Adapt Codex packaging without changing invocation.** Omit Claude-only disable-model-invocation and argument-hint keys while preserving explicit-only policy in the copied agents/openai.yaml. **Tradeoff:** The study package targets Codex metadata rather than being a byte-identical cross-host manifest.

The full executable instructions are in [the refactor](../refactored/writing-shape/SKILL.md). Existing invocation policy is preserved through copied agents/openai.yaml: explicit invocation only. Claude-only frontmatter keys are omitted from the Codex package; that packaging change does not change who may invoke it. The original proposal has ordinary discovery and lives in [thesis-stress-test](../original-skills/thesis-stress-test/SKILL.md). These are study packages, not installed skills.

## Evaluation boundary

The authorial recommendation above is a hypothesis, not an evaluation result. [The independent evaluation](../evals/writing-shape.md) contains the recorded trial responses and judgments. That run record takes precedence over predictions in this chapter. Reading the instructions and inspecting their syntax cannot prove improved collaboration; that requires a task with an observable result and an informative failure case. The source, proposed port, and original proposal should be distinguishable in any comparison.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. The fixed read-only quarry, separate article, full initial read, reader prerequisites, competing openings, grounding, deliberate block forms, immediate saving, and user-decided closure remain. Explicit delegation can now settle routine choices without forcing repeated debates, while consequential choices remain visible. The candidate preserves the source's argumentative pushback and gap naming. Rereading before writes protects concurrent edits; checking downstream grounding after revisions improves on blindly changing one paragraph. The skill still ends before publication. No actionable semantic defect found.

None. Ensure an explicitly delegated choice is not mistaken for permission to compose the entire article ahead.

Evidence: [source/skills/in-progress/writing-shape/SKILL.md:9-26](../source/skills/in-progress/writing-shape/SKILL.md), [source/skills/in-progress/writing-shape/SKILL.md:30-77](../source/skills/in-progress/writing-shape/SKILL.md); [refactored/writing-shape/SKILL.md:8-20](../refactored/writing-shape/SKILL.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **thesis-stress-test**: **repair**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It distinguishes claim types, inspects the inference from support to thesis, and preserves rhetorical interest when narrowing. The revised thesis and paragraph make the advice usable. The claim-type distinction gives this a stronger editorial foundation than generic counterexample search. Counterimage should become its scene-based mode rather than a second overlapping skill.

**Weakness:** The final instruction demands an observation that would make every revised thesis fail, contradicting the earlier recognition that normative positions, personal reports, and metaphors need different support.

**Suggested improvement:** Branch the closing test by claim type: counterevidence for empirical claims, competing values and unacceptable implications for normative claims, fidelity for personal reports, and explanatory limits for metaphor.

A proposed test was: Review this essay's claim that a community owes newcomers hospitality. Strengthen its reasoning without converting a moral position into a scientific hypothesis. Success would mean: The revision preserves the kind of claim being made, exposes its actual support and tradeoff, and answers a relevant challenge without manufacturing empirical falsifiability. This is a test proposal, not an observed outcome.

**Repair to thesis-stress-test:** the final challenge now follows the kind of claim. Empirical claims invite counterevidence; normative claims invite competing values or unacceptable implications; personal reports invite fidelity and scope checks; metaphors invite questions about explanatory use and limits. The skill no longer requires every thesis to become an empirically falsifiable prediction. [Current review](../reviews/original-followup.json) and [targeted probe](../evals/FOLLOWUP-RESULTS.md).

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
