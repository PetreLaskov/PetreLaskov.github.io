# Grill with docs: inquiry plus selective memory

**Source:** [source/skills/engineering/grill-with-docs/SKILL.md](../source/skills/engineering/grill-with-docs/SKILL.md) at [Matt Pocock commit c55ee46073ed](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/grill-with-docs/SKILL.md). Human commentary: [source/docs/engineering/grill-with-docs.md](../source/docs/engineering/grill-with-docs.md). These are the pinned study materials, not claims about the latest upstream release.

**Collaboration bet: PILOT.** Pilot for repositories with unsettled language; distinguish glossary, durable decision, and temporary discussion.


## Understand the skill

The source body calls two skills: grilling and domain-modeling (SKILL.md:7). Grilling provides the interview; domain-modeling provides active vocabulary work and selective architecture records. The wrapper is explicit-only in agents/openai.yaml:4–5. Its tiny size hides a real composition boundary: loading only one dependency produces a plausible but incomplete workflow.

The intended product is shared understanding plus a particular paper trail. Resolved terms go into CONTEXT.md during discussion. A decision earns an ADR only if hard to reverse, surprising without context, and a real tradeoff. Other decisions stay in the conversation. The human docs state this distinction explicitly (docs/engineering/grill-with-docs.md:29–41). This is not a general transcript-to-spec mechanism.

“Docs” can therefore mislead. It does not mean “save everything we agree.” CONTEXT.md is a glossary, and ADRs are scarce. A session can work correctly while creating no ADR. It can also fail by loading only grilling and never writing a term that qualified. Those outcomes look similar unless the agent knows what was resolved and what persisted.

## When and why to use it

Use it in a repository when the change is fuzzy and conceptual boundaries matter. “Can an order be partly cancelled?” is promising because words, business behavior, and code may disagree. An existing repository without domain documentation can also be the subject; a new feature is not required.

Use grill-me for discussion without files, wayfinder for planning across sessions, and domain-modeling directly when only vocabulary or a qualifying ADR needs attention. To-spec follows when settled decisions must survive the current context. These are different products, not increasing levels of rigor.

A glossary pays at naming boundaries: statuses, interfaces, tables, commands, and issue titles. It may offer little in a one-day script with obvious language. If the user already understands the concepts and requests a small edit, a mandatory interview introduces cost without a clear benefit.

## Worked example: cancellation

The code cancels whole Orders, but the user asks for “cancelling one shipment.” The agent reads the relevant model and glossary rather than treating the phrase as an innocent synonym. It asks whether the user means cancelling an unfulfilled line, recalling a shipment, or refunding something delivered. These are different operations.

When the user settles “Cancellation applies to an unfulfilled order line,” the glossary captures that definition tightly. It does not include endpoint paths, database updates, or migration steps. An asynchronous coordination choice across contexts may qualify for an ADR after its tradeoff is discussed. A routine reversible button label probably does not.

Suppose the user also decides that refunds preserve the original tax calculation. That may be crucial implementation input without being glossary material or clearing every ADR gate. It remains in the discussion unless an appropriate artifact is requested. The danger is assuming “with docs” makes every important decision durable.

## What it gets right

Capturing vocabulary when it becomes precise is the strongest move. An end-of-session glossary reconstructs a distinction from memory; an inline update gives the user something concrete to correct before the conversation moves on.

The second strength is restraint. Glossaries and ADRs have different jobs and different bars. This prevents a generic context file from absorbing everything until nobody can trust it. Lazy creation is equally sound: an empty scaffold is not evidence of modeling progress.

The wrapper preserves independent primitives. A repair to interviewing or vocabulary discipline benefits this composition without duplicating the whole process. That modularity is worth retaining even when portable loading requires a few more lines.

Its human documentation also reveals an important limit: the glossary may improve coordination among humans more than model performance itself. That would still be valuable. The claim worth testing is fewer misunderstandings and more consistent decisions, not a magical capability boost from canonical nouns.

## Criticism and strongest case for the original

The one-line instruction assumes both dependencies load. The source has no verification or fallback. A convincing interview can conceal that the writing half never ran. Repeating the skill names in the final answer would not fix this; the files must actually be read or invoked.

Selective memory is the deeper limitation. Numbers, negative requirements, and ordering constraints can be softened in a later spec. Expanding CONTEXT.md to hold them would corrupt the glossary; making ADRs for every answer would destroy their selectivity. The gap is real, but a separate scoped capability is cleaner than a ledger silently attached to every interview.

The strongest defense of the original is its narrowness. On a reliable harness, invoking two good primitives is enough. Most conversations do not need another persistence system. An ambitious refactor should improve composition, not use “with docs” as permission to archive the whole conversation.

Multiple writers add another risk. A term can be revised while another session still reasons from the earlier definition. This skill cannot guarantee concurrency control through prose alone. It should read current files before editing and preserve changes, but large collaborative modeling needs repository workflow beyond this wrapper.

## Portability and collaboration bet

The refactor requires sibling grilling and domain-modeling packages, using normal invocation or direct reads. It preserves explicit-only metadata. Copying only the wrapper remains insufficient. Existing context maps and ADR conventions should be respected by the modeler rather than replaced.

My **pilot** bet is better conceptual consistency where ambiguity is actually expensive. The falsifier is documentation churn larger than the rework it saves, definitions the user cannot explain, or perfect vocabulary over a still-wrong model. Another failure is false persistence: the user believes a decision was saved when it only existed in chat.

A short closing distinction between changed artifacts and consequential conversation-only decisions helps without creating another default document. It tells the user what kind of continuation would preserve the rest.

## Refactor and numbered delta

1. **Load both dependencies with a fallback.** Report missing packages rather than substituting an improvised workflow. This adds a few lines.
2. **Compose during the session.** Run the interview and modeling discipline together; do not reconstruct all terms at the end.
3. **Retain selective persistence.** Glossary terms and qualifying ADRs keep their distinct rules. Specifications remain separate.
4. **Report what persisted.** Name changed domain artifacts and important decisions still carried only by conversation. This is a handoff cue, not a new ledger.
5. **Preserve invocation policy in Codex metadata.** Unsupported source-harness fields are omitted without enabling automatic selection.

Evaluation should include no qualifying term, a resolved term, and a missing dependency. Correct outputs differ. Counting files would reward overdocumentation and miss the core behavior.

## Original proposal: decision-thread

Decision-thread fills the loss boundary without changing the glossary. It follows selected commitments as work moves from discussion to specifications, tickets, or implementation. Each entry preserves exact meaning, status, and where the decision is now carried. Only commitments whose loss would change the work deserve tracking.

“Refunds retain the original tax calculation” may begin in conversation, enter the spec, and later be checked at the refund interface. The skill compares meanings across those transitions. It does not claim a test proves the business choice wise, nor fabricate a test link before one exists.

Its limited novelty in this collection is following semantic survival across artifact boundaries as a standalone capability. The cost is maintenance. The falsifier is a stale table that duplicates prose without catching losses. One-session work rarely needs it. The proposal deliberately remains optional so that the wrapper's elegant selective persistence is not sacrificed.

## Study exercises and connections

Classify statements from a design discussion as glossary term, qualifying ADR, temporary decision, unresolved fact, implementation detail, or out-of-scope idea. Explain why “important” alone does not determine the destination.

Trace one exact requirement into a short spec and identify what could be softened away. Compare [domain-modeling](domain-modeling.md), [to-spec](to-spec.md), and [handoff](handoff.md). The central lesson is that persistence is selective; naming the boundary is more honest than promising that “the docs” preserve everything.

## Package and evaluation record

Read the [complete refactored skill](../refactored/grill-with-docs/SKILL.md), the [original proposal](../original-skills/decision-thread/SKILL.md), and the [author metadata](../reviews/author-grill-with-docs.json). The metadata accounts for every source support file. The refactor retains Matt's MIT notice and existing invocation policy; the original proposal uses ordinary discovery. Neither package is installed by this chapter.

[Independent behavioral evaluation](../evals/grill-with-docs.md) now records the trial responses and case-bound grades. The bet above remains a design hypothesis, not a demonstrated collaboration gain. Judge the recorded trial on the behavior it actually tested; tidy formatting alone cannot establish improvement.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. The composition is real rather than nominal: both primitives must be loaded by host mechanism or exact sibling references, and missing dependencies are reported. The wrapper carries the source's interview-plus-domain-documentation intention without duplicating either body. It preserves inline resolved vocabulary, selective ADRs, and the shared-understanding boundary. Naming decisions that remain only in conversation clarifies the limits of this wrapper's persistence; it does not pretend every plan decision belongs in a glossary. No actionable dependency or semantic defect found.

None. Ensure package distribution includes both sibling primitives.

Evidence: [source/skills/engineering/grill-with-docs/SKILL.md:3-7](../source/skills/engineering/grill-with-docs/SKILL.md), [source/skills/engineering/domain-modeling/SKILL.md:60-74](../source/skills/engineering/domain-modeling/SKILL.md); [refactored/grill-with-docs/SKILL.md:7-11](../refactored/grill-with-docs/SKILL.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **decision-thread**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It traces selected commitments through artifact transitions and compares meaning rather than matching words. Status, exceptions, ownership, and exact values are the right details to preserve. This is an audit of continuity across artifacts; decision-preserving-compression instead produces a shorter artifact. Both share a semantic preservation primitive but solve different delivery problems.

**Weakness:** Selection of 'commitments at risk' is left intuitive. A plausible-looking destination can omit a crucial condition that was never selected for tracking.

**Suggested improvement:** Add a selection rule based on behavior-changing conditions and irreversible consequences. Reuse the extraction logic with compression, while keeping tracing optional and retiring it when continuity is established.

A proposed test was: Check that the approved retention exceptions and deletion timing survived from this design discussion into the implementation tickets, and patch only material losses. Success would mean: Each selected consequential commitment has a destination location or a specific reported loss, and no proposal is upgraded to agreement during repair. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
