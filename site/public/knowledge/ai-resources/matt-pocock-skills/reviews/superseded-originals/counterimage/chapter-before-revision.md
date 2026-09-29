# Writing Fragments: preserve the material before choosing its shape

**Source status: in-progress / beta, excluded from the promoted plugin.**

**Port bet: pilot.** Mine heterogeneous writing fragments through conversation without prematurely imposing an outline.

## Source and reading map

- [SKILL.md:7-18](../source/skills/in-progress/writing-fragments/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/writing-fragments/SKILL.md#L7)
- [SKILL.md:23-40](../source/skills/in-progress/writing-fragments/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/writing-fragments/SKILL.md#L23)
- [SKILL.md:42-77](../source/skills/in-progress/writing-fragments/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/writing-fragments/SKILL.md#L42)
- [agents/openai.yaml:1-5](../source/skills/in-progress/writing-fragments/agents/openai.yaml) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/writing-fragments/agents/openai.yaml#L1)

## Understand the source

This is a workshop for noticing, not an article generator. Matt separates exploration, which widens what might be written, from exploitation, which commits to a structure. The skill occupies exploration deliberately. The assistant interviews the author, extracts fragments from both sides of the conversation, and appends them to one Markdown document. Its unit is anything the author might want to keep: a sentence, incident, objection, half-thought, snippet, confession, or cluster of observations. A fragment need not make sense to a stranger. It needs to remain intelligible and alive to its author.

The exact file contract matters. One working-title H1 heads the document; horizontal rules separate fragments. There are no body headings, tags, dates, metadata, or imposed ordering. The assistant captures useful material from the initial request, not only from later answers. It asks for a save path once, appends without repeatedly requesting permission, and rereads the file before each write to preserve the author's concurrent edits. Targeted edits are allowed when the user asks to cut, sharpen, or merge fragments. This is a small but unusually concrete model of shared authorship.

The strongest distinctive claim is that a leading word can organize the eventual work. A compact metaphor such as a workshop's own term for a recurring tension can become a title, transition device, and conceptual handle. The assistant is encouraged to seek that word when the conversation keeps circling an idea. This is not a requirement to invent a brand name for every observation. The instruction is trying to capture the moment when language makes previously scattered experience available for thought.

## When and why it earns its place

Use it when the material is richer than the author's present formulation: an essay the author cannot yet outline, a talk based on lived practice, notes around a technical frustration, or an argument whose compelling examples appear before its thesis. It is particularly helpful when a conventional assistant immediately supplies six headings and thereby makes every subsequent answer serve an outline chosen too early. The fragment file reduces working-memory pressure without pretending that collection is already composition.

Do not use it when the user needs a finished announcement in ten minutes, already has a settled outline, or primarily needs factual research. The skill can preserve an interesting claim, but cannot turn that claim into established evidence. Nor is the raw file a publishable transcript. The fragments may combine voice, conjecture, quotation, and proposed wording. That heterogeneity is productive for an author and hazardous for anyone who later treats the file as an attributed record.

The value comes from postponing one particular decision, article structure, while making smaller productive decisions immediately. The assistant still exercises taste: what deserves keeping, where a question might uncover a sharper incident, and when an abstraction needs a lived example. It is not a dump-everything system. Its effectiveness depends on selecting material without narrowing the possible article too soon.

## Worked session and mechanism

Suppose the author starts: “Every productivity system I adopt eventually gives me another inbox.” A weak assistant asks for the target audience, desired word count, and preferred outline. This skill first saves the sentence. It might ask: “What was the last system that did this, and what new thing did you have to check?” The answer supplies a scene: a task dashboard sends a reminder to check a dashboard. That becomes another fragment, not automatically an introduction.

The assistant then probes the counterexample: “Is there any system that removed an inbox?” A kitchen timer or paper shopping list may complicate the thesis. Keep that complication. If the author says “The trouble is attention rent,” that phrase becomes a candidate leading word. It may survive; it may be too grand. The assistant can offer one alternative while leaving the author's term visible. The eventual piece might be about notification design, maintenance labor, or self-trust. The fragments preserve all three routes.

The storage protocol is part of the mechanism. If the author deletes the dashboard anecdote while answering the next question, the assistant's reread prevents a stale full-file replacement from restoring it. If the user says “cut the attention-rent thing,” that instruction affects the named fragment rather than causing a whole-document rewrite. The important invariant is that conversation can remain fluid while the working material accumulates reliably.

## What it gets right, and the strongest criticism

The separation of phases is excellent. The fragment bar is also well judged: demanding self-contained prose would remove precisely the unfinished ideas that make exploration valuable. Silent appending treats persistence as background service rather than a ceremony. A shared file makes the author an active editor instead of a respondent waiting for the assistant to finish.

The weakness is not insufficient structure; it is insufficient distinction between kinds of material. The source explicitly captures fragments from either participant but does not explain how a later shaping agent knows which anecdotes are real, which quotations are exact, and which lines were inventions offered by the assistant. A single-file, no-metadata aesthetic can remain intact while using ordinary prose attribution where it matters. “Possible example: …” is not a database schema. It is a necessary guard against converting a brainstorm into autobiography.

“Relentlessly” also risks turning an exploratory exchange into an exhausting interview. Some answers need silence or a sideways prompt; others need a direct challenge. The source's leading-word preference can encourage premature conceptual branding, the very narrowing the broader skill resists. The strongest reason to keep the original is its sparseness: an accomplished author may want a responsive notebook, and each additional rubric can reduce the feeling of discovery. A port should improve provenance and pacing without filling the notebook with administration.

## The proposed port and collaboration bet

The refactor preserves the raw-file contract, immediate capture, heterogeneous material, and reread-before-write behavior. It makes the assistant choose the next question by what is missing from the material: a concrete scene, a counterexample, a distinction, or a strong line. It adds a light stopping condition: offer a pause when answers become repetitive, and switch to shaping only on the user's instruction. Most importantly, it marks invented scenes and uncertain quotations in natural language so later composition does not silently upgrade them.

My bet is a pilot, not automatic adoption for all writing. On two exploratory sessions, it should produce more usable, nonredundant material and fewer premature outline commitments than ordinary chat. A practical falsifier is that the author must spend more time cleaning assistant-created phrases and provenance ambiguity than the notebook saves. Another is that the questioning suppresses the author's own train of thought. Judge the result by fragments the author actually reuses, not raw fragment count.

Portability is high: a filesystem or editable document, ordinary conversation, and a known save path are enough. The source calls its method a grilling session, but this package need not require a separate installed grilling skill. There is no executable helper to port. The original source is beta and explicitly invoked; the proposal retains that invocation boundary.

## An original proposal: counterimage

The companion skill, counterimage, develops an essay through the concrete scene that most seriously complicates its favored claim. This is not ordinary devil's advocacy and does not require a symmetrical “both sides” section. Its input is a thesis that feels too easy; its output is one credible image, incident, or boundary case that the author must accommodate. The assistant distinguishes an actual supplied experience from a hypothetical example and asks whether the thesis should narrow, split, or survive the confrontation.

For the inbox essay, the counterimage might be a checklist used in a noisy emergency room: another visible list that reduces attention demands because it replaces memory under pressure. That example forces a better question than “Are systems bad?” It asks when an external structure removes demands and when it creates an ongoing obligation to monitor itself. The resulting thesis can become stronger without becoming blander.

Its novelty claim is limited to this collection: the writing skills mine and arrange material, but do not isolate a strongest concrete counterimage as a distinct editorial operation. Its cost is one deliberate detour and possible attachment loss when a favorite formulation fails. The proposal fails if the assistant invents a cinematic anecdote and lets it masquerade as fact, or if every essay becomes hedged and shapeless. A successful use preserves a sharper claim and a memorable test of where it applies.

## Study exercises and connections

Take ten minutes of your own conversation and extract six fragments without writing an outline. Include an actual scene, a claim, a counterexample, and an unfinished thought if the conversation contains them; do not manufacture missing categories. Then mark only the places where source status would otherwise be confusing. Notice whether the resulting file still feels like usable writing.

Next, test two candidate leading words against the same material. Which reveals a real relation, and which merely sounds impressive? Finally, hand the file to another reader and ask what they would mistakenly infer about the author. That is a more revealing audit than checking heading counts. Continue with [writing-beats](writing-beats.md) for branching narrative movement or [writing-shape](writing-shape.md) for paragraph-level argumentative composition. Compare [loop-me](loop-me.md), which also interviews but converges on implementable workflows rather than preserving a field of possibilities.

## Semantic delta: what the refactor changes

1. **Preserve rawness while marking origin.** Retain the single-file fragment format, but identify invented examples and proposed claims when needed to prevent false attribution. **Tradeoff:** A little visible attribution interrupts an otherwise seamless notebook.

2. **Replace relentless questioning with responsive pursuit.** Keep the interview vigorous while selecting questions by the material they can uncover and recognizing repetition. **Tradeoff:** The assistant must exercise editorial judgment rather than follow a forceful slogan.

3. **Make the phase transition explicit.** Stop at a pause or a user-chosen move to composition; do not smuggle in an outline. **Tradeoff:** A user expecting an immediate finished article needs a different workflow.

4. **Adapt Codex packaging without changing invocation.** Omit Claude-only disable-model-invocation and argument-hint keys while preserving explicit-only policy in the copied agents/openai.yaml. **Tradeoff:** The study package targets Codex metadata rather than being a byte-identical cross-host manifest.

The full executable instructions are in [the refactor](../refactored/writing-fragments/SKILL.md). Existing invocation policy is preserved through copied agents/openai.yaml: explicit invocation only. Claude-only frontmatter keys are omitted from the Codex package; that packaging change does not change who may invoke it. The original proposal has ordinary discovery and lives in [counterimage](../original-skills/counterimage/SKILL.md). These are study packages, not installed skills.

## Evaluation boundary

The authorial recommendation above is a hypothesis, not an evaluation result. [The independent evaluation](../evals/writing-fragments.md) is pending at authorship. Its actual run record, when present, takes precedence over predictions in this chapter. Reading the instructions and inspecting their syntax cannot prove improved collaboration; that requires a task with an observable result and an informative failure case. The source, proposed port, and original proposal should be distinguishable in any comparison.
