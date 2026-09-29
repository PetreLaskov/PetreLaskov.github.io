# Studying and rebuilding Matt Pocock's skills

This is a complete study edition of the 38 skills in the pinned local collection. Each chapter begins with Matt's design and the problem it solves, then argues for and against using it, proposes a refactor, explains the changes, and develops an original skill. The rewritten skills and original proposals are actual packages you can inspect. They are candidates, not installed defaults or statements of your preferences.

## The question worth answering

The useful target is not "Can we make all 38 prompts look more sophisticated?" It is: **What does each skill contribute beyond a capable assistant, how can that contribution be made more reliable and economical, and what important capabilities does the collection leave open?** That preserves your request for ambition while making the ambition answerable. Sometimes the strongest refactor is a small repair. Sometimes the original should remain the default. Sometimes the right addition is a separate skill rather than more instructions inside the old one.

The consequential edit is to separate elegance on paper, observed behavior on a fixture, and improvement in our actual collaboration. All three matter, but they are different claims. The chapters give judgments about design. The laboratory section contains retained responses and case-bound grades. Only use over time can establish whether the package saves your attention, improves the result, or creates ceremony that gets in the way.

## What is inside

- **38 chapters:** mechanisms, context, worked examples, strengths, criticisms, porting bets, alternatives, and exercises.
- **38 refactored packages:** ready to inspect as local skill folders, with necessary references, source-license attribution and preserved explicit-only invocation where applicable.
- **38 original proposals:** complete skill instructions, accompanied by their own rationale, examples and failure conditions. Original here means newly proposed in this edition; it is not a claim that nobody has invented the idea elsewhere.
- **Exact package diffs:** additions, deletions and replacements between the preserved source snapshot and the proposed package. Chapter deltas explain why the textual changes matter.
- **Evaluation records:** fixed prompts, rubrics, candidate hashes, original and candidate responses, grading evidence, critical review and limitations. Read the method before treating any letter grade as a verdict.

The source is commit `c55ee46073ed923f86ce59a5eb3b6d895095d1b7`. This edition studies that snapshot, not an unverified claim about today's upstream repository. It contains 18 engineering, 7 productivity, 9 in-progress and 4 miscellaneous skills. "In-progress" and "miscellaneous" were Matt's categories at the snapshot, not new ratings assigned here. His promoted plugin set is smaller than the full collection being studied.

## How to read a chapter

First ask whether you can explain the original's distinctive move without borrowing its terminology. For example, a frontier means questions or tasks whose prerequisites are settled; a deep module hides a useful amount of complexity behind a manageable interface. The terms are useful only if they make a decision clearer.

Next examine the worked example. Could you recognize the situation in actual work? A skill with a compelling theory but no recognizable trigger is difficult to use well. Then read the criticism before the refactor. The criticism should identify a failure mechanism or a real cost, not merely prefer a different tone.

Read the proposed instructions as an operator would: what will they make an assistant do differently, and what will they prevent it from doing? Look at the exact diff when an omission or a new requirement concerns you. The source includes support files; a short entrypoint can be misleading if its operational detail lives elsewhere. Each author audit accounts for the support it read and what the refactor retained, replaced or removed.

Finally compare the original proposal with the refactor. The refactor is accountable to Matt's purpose. The original proposal has a wider remit. It can expose a missing capability or suggest a different mode of collaboration, but it still needs a discriminating trigger, useful output and believable cost. A novel title does not itself justify another skill.

## The strongest ideas running through the collection

**Dependencies organize attention.** Grilling asks what can be decided now. Tickets ask what can be built now. Wayfinder asks which uncertainty can be resolved now. These are related structures with different outputs. Confusing them turns conversation into an implementation backlog or sends an agent to build before the governing decision exists.

**Concrete artifacts make disagreement productive.** A prototype offers something to react to. A specification describes behavior that can be checked. A questionnaire directs an information gap to someone who can answer it. A writing beat makes an actual move in the reader's experience. The artifact is useful when it exposes a choice; it becomes overhead when produced solely to satisfy a workflow.

**Interfaces determine what evidence is possible.** TDD, bug diagnosis, codebase design and review keep returning to the seam where behavior can be observed. If a test cannot reach the reported failure, a passing assertion has little value. If every caller must know a module's internals, a small exported API may still be a large conceptual interface. These are practical distinctions worth studying even if you never install the skills.

**Preserving context is a design problem.** Glossaries, decision records, handoffs and tracker links can make future work cheaper. They can also preserve a confident mistake. A pointer is useful only if the next reader can access it and understand what it establishes. A handoff should not turn a proposed decision into an accepted one simply by summarizing it neatly.

**Exploration and commitment need different behavior.** Writing-fragments widens the available material. Writing-shape and writing-beats commit to a reader journey. Research gathers support; a decision still needs judgment. Planning and execution can be intentionally combined, but changing modes silently is a common source of wasted work.

## Where the collection is most vulnerable

One vulnerability is composition. Individually plausible skills can disagree when joined: a review that examines committed HEAD changes cannot automatically validate an implementation that has not been committed. A wrapper may depend on tools or skills that the receiving host cannot load. The refactors should repair these connections without turning every skill into an installation framework.

A second is the conversion of a useful default into a universal rule. Relentless questioning, always recording a glossary, insisting on one test seam, and repeatedly asking for choices all have situations where they help. Each can also consume more attention than the uncertainty warrants. Matt explicitly rejects arbitrary caps on grilling questions; this edition takes that rationale seriously. The interesting issue is question value and dependency, not a magic maximum count.

A third is confidence from representation. A polished lesson is not learned knowledge. A finished specification is not an implemented feature. A clean diff is not correct behavior. A guard script copied into a folder is not an active enforcement boundary. The trial protocol and source audits keep those distinctions visible because the entire project would defeat its purpose if it merely made our claims sound more rigorous.

The answer is not to add a disclaimer to every paragraph. It is to place the relevant distinction where the assistant makes a consequential decision: whether to proceed, publish, mark complete, ask the user, retain an artifact or claim a result. The cheapest effective intervention is usually more durable than a long general checklist.

## A five-day study route

Treat these as study blocks, not deadlines or required working hours. Reading every package and trying the exercises can take considerably longer than reading the commentary.

**Day 1: Instructions and conversation.** Read writing-for-agents, grilling, grill-me, wait-what, grill-with-docs and domain-modeling. Compare a question that unlocks a decision with one that merely produces more conversation. Rewrite one paragraph of an instruction you actually use, and explain which observable behavior should change.

**Day 2: Learning and uncertainty.** Read teach, research, prototype, wayfinder, handoff and to-questionnaire. Practice distinguishing a fact the assistant can inspect, a judgment the user must make, and an experience neither can replace with a summary. Build a small decision map without pretending to specify what remains foggy.

**Day 3: Delivery and evidence.** Read to-spec, to-tickets, tdd, diagnosing-bugs, code-review, implement, implement-spec and pr. Follow one tiny feature through these stages and actively remove stages it does not need. Inspect the uncommitted-review case and ask what evidence would let you say the feature is finished.

**Day 4: Architecture and operating environment.** Read codebase-design, improve-codebase-architecture, resolving-merge-conflicts, triage, ask-matt, setup-matt-pocock-skills, wizard, setup-pre-commit, git-guardrails-claude-code, setup-ts-deep-modules and migrate-to-shoehorn. Concentrate on what is portable judgment and what depends on specific tooling. The specialist chapters are worth understanding without making them immediate installation priorities.

**Day 5: Writing, workflow and new capabilities.** Read writing-fragments, writing-shape, writing-beats, loop-me, retro, scaffold-exercises and claude-handoff. Return to the original proposals throughout the book. Select at most a few for real trials because they solve a recurring problem, not because the titles sound appealing. Record why the rest can wait.

After any block, try three checks: explain one mechanism in plain words; identify a situation where its skill should not activate; and name the strongest reason to retain Matt's version. Those checks encourage understanding rather than agreement with this edition.

## Porting bets are decisions under uncertainty

The table in PORTING-BETS.md contains author judgments, not a ranking measured on your life. "Adopt" means a strong design recommendation for a suitable setting; it still does not mean globally install now. "Pilot" means try a real task and watch for attention costs. "Conditional" means an environment or recurring need must justify it. "Defer" means the current benefit is unlikely to repay setup or maintenance.

Your history was used to locate the correct local collection and preserve the prior lesson. The proposed capabilities are not deductions about your personality. They range across writing, reasoning, learning, software work and coordination. You can reject the model of collaboration implicit in a proposal without rejecting the useful mechanism that inspired it.

Avoid installing the entire collection merely because the edition is complete. Overlapping triggers can make a large skill library less predictable. Choose the specific behavior you want to change, compare source and candidate on a task where that behavior matters, and retain the simpler effective version. This is a recommendation about adoption, not a restriction on what you asked us to create.

## Settled and open

This edition settles the preparation request when every source skill has its explanation, refactor, original proposal, accounted-for delta and recorded development evaluation. It does not settle which version you prefer, what you have learned, or whether any candidate improves long-term collaboration. Those remain live questions with concrete next evidence: unseen tasks, actual artifacts, your corrections, and the attention each workflow costs.

The strongest surviving objection is that a collection of carefully reasoned prompts can still be an elaborate substitute for watching a capable assistant work. The evaluations here reduce some uncertainty, but shared model tendencies, constructed cases and the authors' own design preferences can make the refactors look better than they will feel in daily use.

## What the recorded trials establish

The development suite retained 342 responses across 114 prompts: one source, one refactor and one no-supplied-skill response per prompt. Blinded response grading awarded 265.5/266 assertion points to the source, 264.5/266 to the refactors, and 260.5/266 to the control. The strong control and near-ceiling scores mean this suite does **not establish a general improvement from installing the skills**. Read [the complete results](evals/RESULTS.md) for local misses and limitations.

Independent semantic review found two defects that the response trials did not reliably expose: missing triage closure and contradictory wizard helper behavior. Both were repaired with version history intact. The [wizard regression checks](evals/WIZARD-REPAIR.md) directly exercise its changed executable contract. [Targeted follow-up probes](evals/FOLLOWUP-RESULTS.md) cover revised triage instructions and four original proposals. These are development checks selected after review, not unseen benchmark wins.

The [portfolio review](REVIEWS.md) also challenges overlapping and overly generic original proposals. Two duplicates were replaced, two validity defects repaired, and remaining merge/defer recommendations remain visible. The collection is complete for study; adoption should remain selective.
