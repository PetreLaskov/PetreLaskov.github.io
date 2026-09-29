# Writing Beats: navigate an article through what the reader can now understand

**Source status: in-progress / beta, excluded from the promoted plugin.**

**Port bet: pilot.** Build an article one chosen beat at a time while tracking the concepts each beat requires and establishes.

## Source and reading map

- [SKILL.md:7-19](../source/skills/in-progress/writing-beats/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/writing-beats/SKILL.md#L7)
- [SKILL.md:25-38](../source/skills/in-progress/writing-beats/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/writing-beats/SKILL.md#L25)
- [SKILL.md:40-65](../source/skills/in-progress/writing-beats/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/writing-beats/SKILL.md#L40)
- [agents/openai.yaml:1-5](../source/skills/in-progress/writing-beats/agents/openai.yaml) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/writing-beats/agents/openai.yaml#L1)

## Understand the source

Writing-beats takes a fixed pile of material and turns it into a journey. It is the exploitation companion to fragment gathering: the time for unrestricted mining is over, and the task is to choose a path. The assistant first establishes what the audience already knows. It then offers two or three starting beats, each a different entry point, and explains which concepts each would establish. The user chooses one; the assistant writes only that beat. After rereading the article, it offers reachable next beats. The process repeats until the journey has a natural ending.

A beat is one move, not a fixed amount of text. It might establish a scene, make an argument, ask a question, or change the angle. One sentence can be a beat; several paragraphs can form a self-contained example. Conversely, a section that performs several unrelated moves should be split even if it is short. The source's “choose-your-own-adventure” language names a conversational interface for authorship: show meaningful nearby possibilities, let the author decide, then make the chosen branch concrete.

Its central mechanism is conceptual grounding. A beat requires some concepts and introduces others. It may rely only on concepts supplied as audience prerequisites or established by earlier beats. This is more sophisticated than banning jargon. A perfectly ordinary phrase can conceal an idea the reader has not acquired. When a beat introduces a term, it must land the idea and the name together. The grounded set changes which future beats become available.

## When and why it earns its place

Reach for it when a piece has several plausible routes and the author wants to discover the sequence through actual prose. It fits explanatory essays, talks, practical arguments, and stories with conceptual turns. It is especially useful when an outline looks correct but the paragraphs feel like a stack of summaries rather than a reader's experience. The beat is a more expressive unit than the heading and a more purposeful unit than the paragraph.

The reader-prerequisite decision is not clerical. An explanation for a specialist can begin with a failure mode; an explanation for a newcomer may need a concrete scene before the failure mode has meaning. Requiring every concept to be taught inside the article bloats the opening. Assuming everything loses the audience. The skill makes that tradeoff visible before it propagates across the draft.

Avoid this method when the user has requested a complete first draft in one pass, is editing an already settled sequence, or wants only copyediting. The interaction cost is real: a fifteen-beat article may require fifteen choices. The source intentionally trades throughput for authorial participation. A successful port should preserve that trade rather than silently automate the whole journey and call the result the same skill.

## Worked journey

Imagine an article about caching written from a pile containing a slow page, a stale price, cache keys, invalidation, and a team's debugging story. The audience knows websites and requests, but not caches. Candidate opening A shows the slow page and grounds repeated work. B opens with the stale price and grounds a mismatch between displayed and current information. C begins with the debugging story, but it is unreachable if it assumes readers already understand invalidation.

Choosing A might produce a short scene in which the same expensive calculation runs on every refresh. The next candidates could introduce a remembered result, compare repeated work with reuse, or show the cost to the user. A beat that suddenly recommends versioned cache keys would be premature. After a concrete reuse example establishes a cache, the stale-price incident becomes reachable. That incident can motivate invalidation before the term is introduced.

Now suppose the user rewrites the opening around displayed prices. The assistant must reread the file and rebuild what the opening actually establishes. Its old mental checklist is insufficient. A concept once grounded may have disappeared. The source says later choices should respond to substantial edits; the refactor turns that implication into an explicit recalculation step. The journey ends when the reader has the promised understanding, not when every fragment has been consumed.

## What it gets right, and what can go wrong

The strongest feature is local choice with visible consequences. The author does not need to evaluate a whole outline abstractly. They see two or three next moves and a preview of what those moves make possible. This is also a useful defense against generic writing: different choices genuinely produce different articles rather than cosmetically different introductions to an identical template.

The weakness is that conceptual grounding can become an administrative fiction. Listing “invalidation” as established does not mean the paragraph actually taught it. An assistant can tick a concept off after a vague definition and then write as though the reader possesses a working model. Grounding is a claim about a reader's capability, not just a word's earlier occurrence. Another risk is local optimization: every individual pivot can be plausible while the article as a whole fails to discharge its opening promise.

The source also allows promoting an inconvenient concept to a prerequisite. That can be legitimate when the audience was misidentified, but it must not be a quiet shortcut around explanatory difficulty. The strongest reason to keep the original is its directness. It already has a memorable mechanism and excellent editing discipline. Adding a full dependency graph, scoring rubric, or formal audience ontology would likely make the session worse. The proposed changes therefore concern how the lightweight state is interpreted, not how many documents are maintained.

## Refactor, portability, and collaboration bet

The port retains fixed material, user-chosen beats, two or three meaningful alternatives, and one-beat writes. It asks for a one-sentence reader promise alongside prerequisites and interprets grounding through what a reader can now distinguish or do. After a substantial edit, it recomputes the grounded set from the saved article. It treats missing factual support as a named gap instead of manufacturing connective evidence. None of these changes require a second file unless the session is long enough that a compact state note helps.

My bet is a pilot for essays whose sequence is genuinely unsettled. It should reduce unexplained conceptual leaps and increase the author's sense that the final order expresses a chosen argument. The falsifier is straightforward: give a fresh reader the resulting article and ask them to explain the central mechanism. If they still stumble at concepts marked “grounded,” the procedure has become performative. If the author finds the repeated choices tiring and delegates them all, a lighter outline-and-draft workflow is probably better.

The package needs access to the source pile and article file. It has no scripts and no necessary external service. A conversational document surface can substitute for a filesystem if it supports rereading and targeted edits. Its beta status matters: this is an interesting authoring experiment rather than an upstream claim of a settled production method.

## An original proposal: reader-state-simulation

Reader-state-simulation evaluates an existing explanation by walking through it as a specified reader and recording where understanding changes. Its output is not a stylistic grade. It identifies the first point at which the text asks the reader to infer something they have not been equipped to infer, then proposes the smallest repair. This separates the craft of composing a sequence from the task of testing what that sequence actually conveys.

For the caching article, the simulated reader may understand “save a previous result” yet assume the result remains correct forever. A later sentence about invalidation is then not merely new terminology; it contradicts an unstated model created earlier. The skill can locate the repair at the initial cache example by adding the condition “while its inputs still match.” That small addition may be better than a long glossary later.

The simulation must remain honest about its status. An AI representing a novice is not a novice participant, and knowledge the model already has can leak into its reading. The skill asks for observable comprehension questions and distinguishes predicted trouble from actual reader feedback. Its novelty within this collection is an explicit reader-capability audit after writing. Its cost is another pass through a draft. Its falsifier is repeated failure to predict the misunderstandings real readers report, or revisions that make prose slower without improving comprehension.

## Study exercises and connections

Build a five-beat explanation from six fragments, deliberately leaving one unused. For each beat write a short “requires / establishes” note, then delete one early beat and determine which later moves are no longer valid. Do not merely search for repeated words; look for missing distinctions and causal links.

Next, produce two openings for different audiences and compare the explanatory burden they create. Finally, let a reader answer one transfer question: can they apply the idea to a new case? A correct paraphrase alone may conceal fragile understanding. Study [writing-shape](writing-shape.md) for form and paragraph-level commitment, [writing-fragments](writing-fragments.md) for generating the pile, and [teach](teach.md) for the neighboring problem of helping a learner acquire understanding interactively.

## Semantic delta: what the refactor changes

1. **Make grounding behavioral.** Track what the reader can understand or distinguish rather than treating prior mention as sufficient. **Tradeoff:** The model must make a fallible prediction about understanding.

2. **Rebuild state after edits.** Recompute prerequisites actually established by the saved article after substantial user changes. **Tradeoff:** Adds a rereading step when a small edit changes meaning.

3. **Keep the whole promise visible.** Add a short reader promise to constrain locally attractive but globally drifting pivots. **Tradeoff:** Slightly narrows the original adventure-like freedom.

4. **Name absent support.** Handle missing facts or scenes as gaps, preserving the fixed-pile boundary. **Tradeoff:** Some tempting beats remain unavailable until the author supplies material.

5. **Adapt Codex packaging without changing invocation.** Omit Claude-only disable-model-invocation and argument-hint keys while preserving explicit-only policy in the copied agents/openai.yaml. **Tradeoff:** The study package targets Codex metadata rather than being a byte-identical cross-host manifest.

The full executable instructions are in [the refactor](../refactored/writing-beats/SKILL.md). Existing invocation policy is preserved through copied agents/openai.yaml: explicit invocation only. Claude-only frontmatter keys are omitted from the Codex package; that packaging change does not change who may invoke it. The original proposal has ordinary discovery and lives in [reader-state-simulation](../original-skills/reader-state-simulation/SKILL.md). These are study packages, not installed skills.

## Evaluation boundary

The authorial recommendation above is a hypothesis, not an evaluation result. [The independent evaluation](../evals/writing-beats.md) contains the recorded trial responses and judgments. That run record takes precedence over predictions in this chapter. Reading the instructions and inspecting their syntax cannot prove improved collaboration; that requires a task with an observable result and an informative failure case. The source, proposed port, and original proposal should be distinguishable in any comparison.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. The choose-the-next-beat mechanism survives distinctly from writing-shape: two or three reachable alternatives, explicit conceptual prerequisites, one chosen move written, then recomputation from the live article. The candidate strengthens the difference between mentioning a term and establishing understanding. It also makes the raw pile explicitly read-only and prohibits fabricated support. Requested revisions preserve other user changes while identifying downstream conceptual consequences. Ending when the journey fulfills its promise, rather than exhausting the pile, is faithful to the source. No actionable defect found.

None. Preserve the one-selected-beat boundary during actual use.

Evidence: [source/skills/in-progress/writing-beats/SKILL.md:9-38](../source/skills/in-progress/writing-beats/SKILL.md), [source/skills/in-progress/writing-beats/SKILL.md:56-65](../source/skills/in-progress/writing-beats/SKILL.md); [refactored/writing-beats/SKILL.md:8-18](../refactored/writing-beats/SKILL.md). This is static inspection, not proof of a completed workflow.

**Observed response miss:** the first candidate response correctly removed unemployment but assumed other story facts not supplied by its stress case. Its grade remains lower than the source for that case. Cases shared context, making cross-case carryover a plausible explanation rather than an established cause. The instructions already prohibit invented prerequisites, so they were not lengthened solely to target this fixture. [A fresh targeted retest](../evals/FOLLOWUP-RESULTS.md) supplies no other story facts; it does not erase the first result.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **reader-state-simulation**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It traces what the text has actually equipped the reader to infer, locates the first consequential gap, and links a predicted misunderstanding to a specific passage and repair. This is more precise than generic readability editing. It focuses on concept dependencies and supplies comprehension probes, while clearly labeling the exercise as model-based rather than human evidence.

**Weakness:** The imagined reader remains an assistant-generated model. Its first-gap judgment may miss multiple plausible reading paths or overestimate the importance of the assistant's own confusion.

**Suggested improvement:** Pilot with actual reader responses when available. Keep predicted and observed gaps separate, and avoid declaring the repaired explanation validated merely because the same model answers its own questions.

A proposed test was: Audit this explanation for someone who knows basic spreadsheets but no databases. Find the first place they would likely form a wrong model of joins. Success would mean: The review identifies a text-supported conceptual jump, proposes a minimal repair, and produces questions whose answers would distinguish the suspected misunderstanding from usable understanding. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
