# Teach: build ability across sessions

**Source:** [source/skills/productivity/teach/SKILL.md](../source/skills/productivity/teach/SKILL.md) at [Matt Pocock commit c55ee46073ed](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/teach/SKILL.md). Human commentary: [source/docs/productivity/teach.md](../source/docs/productivity/teach.md). These are the pinned study materials, not claims about the latest upstream release.

**Collaboration bet: PILOT.** Pilot a dedicated learning workspace with a small baseline check, source-grounded lessons, and evidence of transfer; do not equate a polished lesson with learning.


## Understand the skill

Teach is a stateful learning workspace, not a conversational explanation. The source assumes the user intends to learn a topic across sessions (SKILL.md:8–20). The workspace carries a mission, trusted resources, numbered HTML lessons, compressed references, reusable assets, learning records, and preferences. A later session reads those artifacts to decide what to teach next. The directory is the continuity mechanism.

Its philosophy divides learning into knowledge from good sources, skills developed through practice, and wisdom from real-world interaction (SKILL.md:22–46, 91–120). It distinguishes immediate fluency from durable storage strength. Lessons should be small, mission-linked, and appropriately challenging, with retrieval practice, spacing, and interleaving where useful. These are the source's design commitments; a generated lesson mentioning them does not demonstrate that they occurred.

The strongest unit distinction is **lesson versus reference**. A lesson introduces one capability and gives practice. A reference compresses what is useful later: syntax, a process, a diagram, or a glossary. A learning record is different again. It captures non-obvious demonstrated understanding, stated prior knowledge, corrected misconceptions, or a mission change. It explicitly excludes material merely covered (LEARNING-RECORD-FORMAT.md:29–46). This prevents an activity log from becoming a false model of the learner.

## How a session should work

The mission explains why the person is learning and what they want to do. If it is missing, the source asks about purpose before teaching (SKILL.md:71–89). The resource file supplies trusted material rather than letting the model improvise factual instruction. The agent then chooses a short lesson within the learner's inferred zone of development.

The source's lesson requirements include clear HTML, links to related lessons and references, citations, a recommended primary source, and immediate feedback where possible. Reusable components live in assets, with a shared stylesheet as the first reusable component. Existing assets are read before authoring another lesson (SKILL.md:47–69). This creates a course rather than a pile of unrelated pages.

The source says each lesson is self-contained while also requiring linked assets. A practical interpretation is that each lesson is a coherent unit that works with the workspace bundle, not necessarily one physically standalone file. The refactor makes that distinction explicit and allows a separate bundled export when the user needs a single portable file.

## Worked example: learning SQL for real analysis

A learner wants to answer recurring questions from a sales database. “Learn SQL” is too broad to steer the next lesson. A useful mission is “Independently answer monthly customer and revenue questions from the approved reporting database.” Prior experience may include spreadsheets but no joins.

The original could infer a level from those statements and immediately generate a joins lesson. The refactor first uses a tiny relevant task: interpret a table, filter rows, or predict what a simple query returns. This is not a formal entrance exam. It tells the teacher whether the next obstacle is syntax, grouping, or the idea that one customer can have many orders.

A lesson might teach one-to-many joins using a small local dataset and immediate feedback. A reference preserves the join pattern. A learning record says the learner correctly predicted duplicate customer rows after a join, rather than “completed joins lesson.” Later, a changed dataset tests whether the concept transfers beyond the original example. If the learner struggles, the next session reviews the relevant distinction instead of producing the next numbered lesson automatically.

## What it gets right

This is one of the collection's most ambitious skills. It treats learning as accumulating capability rather than accumulating explanations. Mission grounding resists endless topic drift. Learning records can stop the assistant from repeatedly teaching what the user already knows. References separate durable utility from introductory exposition.

Its source discipline is also valuable. Procedural teaching can fail badly when a model confidently invents a sequence. Citations do not eliminate error, but they provide a route to check a claim. The resource file records why a source is useful, not just a link.

The source also respects a learner who does not want community participation. Its wisdom section recommends real interaction while allowing opt-out. That preference belongs in the workspace rather than being renegotiated each session. This is a good example of persistence serving the learner instead of serving the system's desire to track everything.

## Criticism and strongest case for the original

Several defects are visible in the actual files. Paths beginning with ./ refer sometimes to installed skill references and sometimes to learner output (SKILL.md:14–19). Without distinct roots, an agent can write lessons into the skill installation. GLOSSARY-FORMAT.md exists but the entrypoint does not link it. The source infers level from mission and records but has no first-session assessment. These are concrete gaps rather than speculative concerns.

The multiple-choice rule requires answers to have equal word counts and, if possible, equal character counts (SKILL.md:110). This fights one superficial cue but can produce awkward distractors and does not address answer-position bias. Better item design and keyed shuffling are more direct. Open responses often provide stronger evidence than recognizing an option anyway.

Spacing is a principle, not a scheduler. Nothing in the skill creates reminders or guarantees delayed retrieval. Nor is there a clear rule for moving from new lessons to review or independent practice. A workspace can become excellent at generating the next lesson while never checking whether the mission is achieved.

The strongest case for the original is its integrated vision. Overcorrecting these issues by adding diagnostics, scoring dashboards, and mandatory review schedules would bury the learner's actual goal. The right refactor keeps each session small, uses evidence proportionately, and does not pretend a few exercises establish a psychometric profile.

## Portability and collaboration bet

This skill is explicit-only and needs an explicitly identified writable teaching root. Source references resolve against the installed package; learner artifacts resolve against the teaching root. A dedicated topic workspace is sensible. It should not be created inside an unrelated project merely because that is the current shell directory.

My **pilot** bet is improved continuity and retention on a real multi-session learning goal. The falsifier is attractive artifacts without improved independent performance, a learner model built from exposure rather than evidence, or excessive maintenance of files compared with practice. A source-rich explanation can still be badly sequenced or too advanced. Evaluate the learner's next task, not the page's polish.

## Refactor and numbered delta

1. **Separate installation and output roots.** This prevents misplaced courses and makes links predictable. The small cost is naming the root explicitly.
2. **Add a tiny baseline check.** Use a relevant task or targeted question when evidence is absent. Do not require an assessment when the user already supplied sufficient evidence.
3. **Restore the glossary pointer.** Promote terms after demonstrated use, following the support reference. Do not mistake introducing a term for learning it.
4. **Replace equal-length options with sound items.** Prefer retrieval or application; when multiple choice is useful, use plausible parallel options and key-based shuffled ordering. This changes a brittle formatting rule into a behavior target.
5. **Make review and exit choices explicit.** Choose among new material, retrieval, transfer, and real practice from current evidence. Mention a useful future review point without scheduling anything unless asked.
6. **Clarify asset portability.** Lessons work within the workspace bundle. Reuse real components; do not build a speculative component library.
7. **Record modest evidence.** Claimed prior knowledge and demonstrated performance remain distinct. No blanket claim of mastery comes from one correct response.

## Original proposal: transfer-test

Transfer-test isolates the question “Can the person use this away from the example?” It can follow a lesson, a tutorial, or self-study without adopting the entire teaching workspace.

Suppose the learner can solve a join exercise that uses Customers and Orders. The transfer test changes the surface to Authors and Publications while preserving the relational structure, then introduces one genuinely new boundary. It defines what success would show, lets the learner attempt the task, and diagnoses the failure in terms of a concept or strategy rather than a fixed trait.

The limited novelty is a standalone test of transfer, distinct from producing lessons. Its cost is designing a fair task that changes the right things. If every feature changes at once, failure is uninterpretable. Its falsifier is a task that merely repeats the example or assumes unrelated prerequisites. A useful transfer test is neither a trick nor a certificate; it provides evidence for what to practice next.

## Study exercises and connections

Design one lesson with a single tangible win, then write three different statements: material covered, performance observed, and capability still untested. Notice how easily a course record can blur them.

Create an exercise that changes surface details without changing the underlying concept. Then create a boundary case. Compare [wait-what](wait-what.md) for immediate explanation repair, [research](research.md) for gathering knowledge, and [handoff](handoff.md) for moving a learning detour out of a live design session.

## Package and evaluation record

Read the [complete refactored skill](../refactored/teach/SKILL.md), the [original proposal](../original-skills/transfer-test/SKILL.md), and the [author metadata](../reviews/author-teach.json). The metadata accounts for every source support file. The refactor retains Matt's MIT notice and existing invocation policy; the original proposal uses ordinary discovery. Neither package is installed by this chapter.

[Independent behavioral evaluation](../evals/teach.md) now records the trial responses and case-bound grades. The bet above remains a design hypothesis, not a demonstrated collaboration gain. Judge the recorded trial on the behavior it actually tested; tidy formatting alone cannot establish improvement.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. The candidate preserves a mission-led, stateful learning workspace, trusted resources, short HTML lessons, reusable assets, meaningful practice, glossary discipline, and learning records distinct from coverage. Its formats consistently resolve outputs at the teaching root and distinguish claimed knowledge from demonstrated learning. The original single-file lesson language conflicted with shared assets; the new bundle/export distinction resolves that tension. Retrieval and transfer remain present, while future retrieval is suggested without pretending a schedule exists. No actionable semantic loss found.

None from inspection. Verify actual lesson interactions and learning claims during use.

Evidence: [source/skills/productivity/teach/SKILL.md:12-20](../source/skills/productivity/teach/SKILL.md), [source/skills/productivity/teach/SKILL.md:34-69](../source/skills/productivity/teach/SKILL.md), [source/skills/productivity/teach/LEARNING-RECORD-FORMAT.md:29-46](../source/skills/productivity/teach/LEARNING-RECORD-FORMAT.md); [refactored/teach/SKILL.md:7-26](../refactored/teach/SKILL.md), [refactored/teach/LEARNING-RECORD-FORMAT.md:3-7](../refactored/teach/LEARNING-RECORD-FORMAT.md), [refactored/teach/GLOSSARY-FORMAT.md:3-5](../refactored/teach/GLOSSARY-FORMAT.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **transfer-test**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It separates transferable capability from fluent repetition and distinguishes conceptual failure from slips, prerequisites, and confounded tasks. The learner gets a real attempt before solution disclosure. Its standalone value is a short assessment after learning, rather than an entire course or exercise-design package. It is the terminal assessment component of design-the-learning-sequence.

**Weakness:** A changed surface alone does not guarantee a new reasoning demand. An almost identical example could reward pattern copying while being labeled transfer.

**Suggested improvement:** State what shortcut from the original example no longer works. Keep this callable alone, but share its assessment procedure with the larger learning sequence instead of duplicating instructions.

A proposed test was: I can explain closures from the example we used. Give me one unfamiliar practical task that checks whether I can apply the idea without hints. Success would mean: The learner-facing task requires the target principle in a new setting, and feedback cites actual reasoning and output without claiming mastery from one answer. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
