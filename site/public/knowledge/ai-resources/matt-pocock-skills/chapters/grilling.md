# Grilling: ask the decisions that are ready

**Source:** [source/skills/productivity/grilling/SKILL.md](../source/skills/productivity/grilling/SKILL.md) at [Matt Pocock commit c55ee46073ed](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/grilling/SKILL.md). Human commentary: [source/docs/productivity/grilling.md](../source/docs/productivity/grilling.md). These are the pinned study materials, not claims about the latest upstream release.

**Collaboration bet: PILOT.** Pilot dependency-aware interviews for consequential plans; measure user effort and later rework, not question count.


## Understand the skill

Grilling is an interview primitive. Its point is not to generate a clever list of questions; it is to reach shared understanding by resolving decisions in an order that respects their dependencies. Matt calls the structure a **design tree**. If you have not chosen the audience for a course, asking which exercises to include may be premature. Once the audience is known, exercise format and distribution channel may be independent enough to discuss together. The skill distinguishes those cases rather than choosing between always asking one question and always asking everything.

The **frontier** is every decision whose prerequisites are settled. One round asks that whole frontier, with numbered questions and the agent's recommendation beneath each. Then the agent waits. Your answers reshape the tree and produce the next frontier. A question depending on another unanswered question belongs in a later round (source SKILL.md:6–24). This can reduce conversational turns without pretending uncertainty is independent.

The second division is facts versus decisions. The agent investigates facts retrievable from files or tools, using a subagent when available. Research running in the background blocks only its dependents. The user chooses decisions. The final boundary is explicit: the session completes when the frontier is empty, and the agent obtains confirmation of shared understanding before acting (SKILL.md:26–28). This is an inquiry contract, not blanket permission to implement.

## A worked example

Suppose you want an export feature without defining “export.” An opening frontier might ask “Who receives the export?” and “Does it contain a snapshot or a continuing feed?” These may be independent. “What retention period applies to the receiver's stored copy?” may depend on the receiver and therefore waits. Meanwhile the agent can inspect the current implementation and storage providers without asking you to recite the repository.

The recommendation should help rather than obscure the decision. “Choose a snapshot because the request is for one-time archival” is easier to answer than “Should we avoid streaming?” followed by “Yes, use snapshots.” The human docs explicitly note this polarity problem. A refactor can label the recommended option directly so agreement has a stable meaning.

If investigation finds exports are already incremental, the assistant reports the fact, explains which question it changes, and reopens the affected branch. It should not quietly reinterpret an earlier answer. If you say “I cannot tell until I see the review screen,” the session has found a prototype question. Repeating the interview with different adjectives will not resolve it.

## When it earns its cost

Use grilling when important choices remain implicit and you want active interrogation. It applies to writing, product work, business decisions, and research design as well as software. It is less appropriate for a narrow edit, a complete instruction, or a factual answer. Discoverability does not mean every request should become a workshop.

Its strongest benefit is explicit dependency management. Recommendations make tradeoffs concrete; a round lets you compare adjacent choices; the pause preserves your authorship. Numbering makes substantial answers practical: “1 operations team; 2 snapshot; 3 unsure” need not quote every question.

Matt deliberately rejects numeric caps in source/out-of-scope/question-limits.md. The rationale is that a ceiling confuses useful depth with redundancy. Natural-language steering is the intended control: stop, narrow, summarize, or move on. The human docs support one-at-a-time pacing as an override. A faithful refactor should improve question quality and respect pacing rather than quietly impose a five-question ceiling.

## Criticism and the case for retaining the original

“Every branch” has no natural finite boundary. Almost any plan can generate another choice at a finer level. Taken literally, completeness manufactures an endless interview; taken loosely, it licenses stopping after generic questions. The missing ingredient is the level of decision required for the user's next action. That is a scope boundary, not a count cap.

The source also assumes its frontier is correct. Real dependencies are often discovered only after an answer. Its documentation acknowledges that the tree is model judgment, not a computed graph. A robust loop needs to reopen decisions and acknowledge mistaken grouping. Otherwise orderly presentation substitutes for sound reasoning.

Recommendations can anchor the user. They are valuable because an assistant should contribute judgment, but successive “recommended” answers can become the assistant designing the project while the user assents. The strongest defense of the original is that interrogation was requested, recommendations remain visible, and the user still decides. Its brevity leaves room for an engaged conversation. Mandatory scoring tables and decision ledgers might make assent more tedious without making it more thoughtful.

There is also a coordination cost hidden in “find facts yourself.” Some facts require unavailable access or another person's expertise. The skill should not make an assistant infer them simply to avoid asking. The practical distinction is between a question the environment can answer now, a missing external fact, and a preference the user owns. Only the last is a decision to choose.

## Portability and collaboration bet

The package is ordinarily discoverable and has no support procedures. Its subagent instruction needs a fallback when delegation is unavailable: investigate directly, without pretending work is parallel. Waiting remains essential even in a harness biased toward autonomous execution. A surrounding implementation request can authorize subsequent work but does not settle a user-owned choice.

My bet is **pilot**, not universal adoption. I expect fewer premature solutions and more explicit tradeoffs on ambiguous work. I would compare decision-relevant questions, reopened assumptions, user effort, and downstream rework. The bet fails if sessions regularly ask answered questions, present a frontier too large to use, or produce decisions no better than brief direct discussion. High question count is not success.

## Refactor and numbered delta

The refactor retains the tree, frontier, recommendations, factual legwork, and confirmation boundary. It defines “relentless” as pursuing useful clarity rather than consuming all available attention.

1. **Bound the tree by the next useful commitment.** Stop opening branches that cannot change the chosen scope. Distant questions remain visibly unexamined.
2. **Name the recommended option.** Preserve recommendations while removing yes/no polarity confusion. Presentation changes; ownership does not.
3. **Repair discovered dependencies.** If an answer changes another question's premise, reopen it explicitly. The graph is provisional.
4. **Keep unavailable facts blocked.** Research what can be retrieved. Missing access is not a user preference.
5. **Respect steering without a ceiling.** An early wrap-up lists unresolved consequential decisions rather than claiming exhaustive completion.
6. **Route ungrillable questions outward.** Prototypes, source searches, and other people may produce information the interview cannot.

A revealing evaluation includes a late-discovered dependency, a request to stop after one round, and a factual prerequisite being researched. Inspect what the agent actually asks and waits for, rather than whether it uses the word “frontier.” A polished list can still violate every important dependency.

## Original proposal: reversible-bets

This original asks a neighboring question: when uncertainty remains, what small reversible commitment can produce useful evidence? Grilling tries to settle choices before action. Sometimes discussion cannot settle them, and the right next move is a trial with a cost ceiling and rollback condition.

For example, a team wonders whether asynchronous review will reduce meetings without delaying decisions. Instead of interviewing everyone until they predict the future, try it on one small project, preserve the previous meeting as a fallback, and name the signal that would justify continuing. The skill defines the choice, reversible move, evidence, ceiling, and return path. It does not launch the trial or contact participants merely because a plan exists.

The novelty claim is limited to this collection: prototypes test concrete artifacts, while reversible-bets can test a working arrangement, publishing cadence, or operational choice. Its cost is interpreting small, noisy trials carefully. It can fail by dressing a preferred choice as an experiment or selecting measures that cannot distinguish outcomes. Its falsifier is repeated trials that neither change decisions nor prevent costly commitment. Then the skill is paperwork around ordinary trying.

The strongest use is where delay itself has a cost, the downside can be bounded, and preferences do not already determine the answer. It is a poor fit for irreversible moves disguised as pilots, or for choices whose consequences take years to observe.

## Study exercises and connections

Draw the first two rounds for an uncertain project. For every round-two question, name the answer it depends on. Move independent questions into the first round. Identify a question that cannot honestly be answered by talking and choose the smallest source, artifact, or real-world trial that could help.

Rewrite a question with confusing recommendation polarity. Practice stopping: summarize a partially resolved plan without calling it complete. Compare [grill-me](grill-me.md) for the stateless front door, [grill-with-docs](grill-with-docs.md) for selective persistence, and [to-questionnaire](to-questionnaire.md) for knowledge owned by another person.

## Package and evaluation record

Read the [complete refactored skill](../refactored/grilling/SKILL.md), the [original proposal](../original-skills/reversible-bets/SKILL.md), and the [author metadata](../reviews/author-grilling.json). The metadata accounts for every source support file. The refactor retains Matt's MIT notice and existing invocation policy; the original proposal uses ordinary discovery. Neither package is installed by this chapter.

[Independent behavioral evaluation](../evals/grilling.md) now records the trial responses and case-bound grades. The bet above remains a design hypothesis, not a demonstrated collaboration gain. Judge the recorded trial on the behavior it actually tested; tidy formatting alone cannot establish improvement.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **tradeoff**. The dependency-aware frontier, whole-ready-round pacing, factual legwork, recommendations, and user-owned decisions survive. Bounding the tree by the next useful commitment deliberately relaxes the source's demand to visit every branch; this is a sensible defense against endless hypothetical questioning, but shifts judgment about which uncertainties matter onto the interviewer. The candidate makes that scope explicit, allows reopening a missed dependency, and retains confirmation before plan execution. This is a transparent pragmatic tradeoff rather than an identified defect.

Retain the scope bound. In trials, watch whether consequential branches are incorrectly dismissed as distant hypotheticals.

Evidence: [source/skills/productivity/grilling/SKILL.md:6-28](../source/skills/productivity/grilling/SKILL.md); [refactored/grilling/SKILL.md:7-22](../refactored/grilling/SKILL.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **reversible-bets**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It translates indecision into a bounded commitment with an explicit reversal, fallback, observation, and decision rule. Preferences are correctly separated from empirical uncertainty. The useful addition beyond generic advice is the precommitted review rule and accounting for costs that cannot be reversed. Evidence-fork selects observations; this skill designs an actual trial.

**Weakness:** A superficially cheap trial may poorly represent sustained use. The procedure warns about causal uncertainty but does not explicitly inspect representativeness or temporary novelty effects.

**Suggested improvement:** Add one representativeness check: state which important conditions the small trial omits and how that limits the resulting decision. Preserve the preference-versus-observation distinction.

A proposed test was: We cannot choose between weekly written updates and a short coordination meeting. Design a two-week reversible trial that could actually change our choice. Success would mean: The plan names a baseline, bounded cost, observable decision-relevant outcome, reversal procedure, and possible results that lead to different next actions. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
