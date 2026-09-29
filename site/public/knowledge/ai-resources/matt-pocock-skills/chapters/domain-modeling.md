# Domain modeling: make the concepts agree

**Source:** [source/skills/engineering/domain-modeling/SKILL.md](../source/skills/engineering/domain-modeling/SKILL.md) at [Matt Pocock commit c55ee46073ed](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/domain-modeling/SKILL.md). Human commentary: [source/docs/engineering/domain-modeling.md](../source/docs/engineering/domain-modeling.md). These are the pinned study materials, not claims about the latest upstream release.

**Collaboration bet: PILOT.** Pilot where ambiguous domain words cause real mistakes; keep the glossary small, context-specific, and separated from implementation decisions.


## Understand the skill

Domain-modeling is the active discipline of making a project's concepts precise. Reading existing vocabulary is not enough to trigger it. The skill challenges overloaded terms, proposes canonical words, invents concrete scenarios, compares user statements with code, and writes resolved definitions immediately (source SKILL.md:8, 44–64).

Its artifacts have distinct jobs. CONTEXT.md is a glossary and nothing else. A root CONTEXT-MAP.md, when present, points to several bounded contexts. ADRs record selected architectural decisions, under docs/adr/ by the source convention. Everything is created lazily: no term means no empty glossary, and no qualifying decision means no empty ADR directory (SKILL.md:10–40).

The glossary reference requires tight definitions of what something **is**, with aliases to avoid when competing names cause confusion. General programming concepts do not belong merely because the project uses them (CONTEXT-FORMAT.md:25–30). The same term can need different meanings in different contexts; the map supplies the boundary instead of forcing one universal definition.

The ADR bar is unusually selective. All three conditions must hold: hard to reverse, surprising without context, and the result of a real tradeoff (SKILL.md:66–74; ADR-FORMAT.md:29–47). The format can be one paragraph. Its value is preserving why a non-obvious choice was made, not filling a template.

## Worked example: one word, several concepts

Suppose the team uses “account” for a login identity, a paying organization, and a billing relationship. The agent should not choose the prettiest synonym and perform a global rename. It first asks which concept is meant in the current discussion and examines code where the distinction matters.

A concrete scenario reveals the model: one person signs into two organizations; an organization changes its billing contact; a suspended login leaves invoices intact. If one Account object cannot explain these cases cleanly, there may be several concepts. The user might settle on User, Organization, and Billing Account. The glossary records those definitions; code changes remain a separate authorized task.

Now suppose two contexts use “Customer” differently. Ordering means the party placing an order; Billing means the entity legally liable for payment. Forcing one definition could erase a real business distinction. A context map can name the boundary and relationship. The skill's purpose is conceptual agreement within the relevant context, not vocabulary uniformity everywhere.

If the team chooses to reference customers across contexts by identifier rather than share mutable objects, that may qualify for an ADR. If it simply chooses the clearer button label, it probably does not. Importance alone is not the ADR criterion.

## What it gets right

Concrete scenarios are the skill's strongest instrument. Abstract definitions can appear compatible until a case exposes conflicting ownership, identity, or lifecycle. A term is good when it supports consistent decisions in those cases, not when it sounds like domain-driven design.

Cross-checking the code is also valuable. The user may describe intended behavior while the code reflects an older model. Surfacing that mismatch lets the team distinguish current reality from a proposed change. Automatically treating either as authoritative would be a mistake: code can be wrong, and a remembered rule can be outdated.

Inline glossary updates preserve a resolved distinction before it is diluted by later discussion. The strict glossary boundary prevents the file from becoming a second specification. The minimal ADR format keeps the cost low enough that genuinely important reasoning may actually be recorded.

## When to use it and when to abstain

Use it when terms are overloaded, different people mean different things, an entity's identity is unclear, or an architectural decision needs its reason preserved. It can help document an existing repository, but that is active modeling work requiring the user's domain understanding—not simply extracting identifiers from code.

Do not invoke it merely to read CONTEXT.md. Do not build a glossary for every small script. A shared language earns maintenance when it prevents repeated ambiguity at naming boundaries such as interfaces, schema fields, statuses, and commands.

Ordinary prose can tolerate synonyms. Applying alias bans to every sentence can make communication rigid without improving the model. The refactor focuses correction on ambiguity that changes behavior or ownership. It preserves the source's precision while allowing natural explanation.

## Criticism and the strongest case for retaining the original

The source names fixed ADR paths and numbering. Teams with established conventions may already have accepted-decision formats elsewhere. A port that creates a parallel docs/adr directory can split the source of truth. Respecting the repository's existing convention is a small pragmatic change with high value.

The instruction to call out conflicting terminology immediately can interrupt useful flow for harmless wording. A phrase deserves interruption when it conceals a different concept, not merely because it uses a noncanonical synonym in ordinary conversation. Over-enforcement can make the glossary feel like a language police force.

The source compares code and current domain documents but does not direct the agent to search known prior decisions outside them. If a supplied issue or design note already settled a term, ignoring it can reopen debate unnecessarily. The repair should be targeted: inspect relevant referenced history, not search every closed issue on every noun.

The strongest case for the original is that these constraints keep it focused. Its two references are small and meaningful. Making it a general requirements ledger would undermine the glossary-only rule. The refactor should preserve the three-part ADR gate and lazy artifacts rather than “improve” them into comprehensive documentation.

## Portability and collaboration bet

There are no executable scripts. The package depends on repository reads, targeted file edits, and a conversation capable of resolving ambiguity. Its ordinary discovery policy should remain. ADRs are offered rather than automatically assumed, and any existing authorization to record decisions should be respected without repeatedly asking for the same permission.

My **pilot** bet is reduced re-explanation and fewer concept-level mistakes where the domain is complex enough to justify a glossary. The falsifier is a growing artifact that the user cannot defend, definitions that merely rename code, or continued conceptual mistakes despite perfect vocabulary compliance. Correct nouns over a wrong model are not progress.

## Refactor and numbered delta

1. **Begin with the relevant context and conventions.** Read the map or root glossary and existing ADR practice. This avoids a competing documentation system.
2. **Distinguish current and intended behavior.** When code and conversation disagree, surface the mismatch without automatically rewriting either.
3. **Challenge consequential ambiguity.** Preserve active modeling while avoiding needless correction of harmless prose.
4. **Keep definitions and decisions separate.** The original glossary-only invariant and all-three ADR gate remain intact.
5. **Consult relevant known history.** Follow a supplied decision reference when it bears on the term. Do not turn vocabulary work into a repository-wide audit.
6. **Preserve inline capture and lazy creation.** The refactor does not defer glossary updates until a polished final report.

A meaningful trial should include a harmless synonym, a genuine overloaded term, a code/intention mismatch, and a routine decision that fails one ADR gate. Creating a file in every case would be failure, not thoroughness.

## Original proposal: boundary-cases

Boundary-cases is a compact modeling tool for any proposed category or rule. It constructs nearby cases that differ in one decisive property, then asks whether the rule classifies them as intended. Unlike domain-modeling, it does not require a repository or glossary. Its output is the clarified boundary and the cases that make it understandable.

Suppose a policy distinguishes “minor” from “major” changes. The skill chooses a change with tiny code size but large user impact, and another with large internal churn but unchanged behavior. Those cases expose whether the boundary concerns effort, risk, compatibility, or experience. It does not merely list edge cases; it selects cases that discriminate between competing meanings.

Within this collection, this isolates a mechanism used implicitly by several skills but not packaged as a standalone capability. Its cost is that invented cases may be unrealistic. The skill therefore checks relevance and stops when more cases do not change the rule. Its falsifier is a list of exotic hypotheticals that adds anxiety without making the boundary more usable.

## Study exercises and connections

Choose a term used in three places in a project. Write a concrete scenario where two meanings diverge. Decide whether the fix is a definition, separate concepts, or separate contexts. Do not rename anything until that decision is clear.

Apply the ADR's three conditions to three recent choices. Explain the failed condition for each rejected record. Compare [grill-with-docs](grill-with-docs.md) for the composed interview, [to-spec](to-spec.md) for implementation commitments, and [writing-for-agents](writing-for-agents.md) for keeping the resulting artifacts precise.

## Package and evaluation record

Read the [complete refactored skill](../refactored/domain-modeling/SKILL.md), the [original proposal](../original-skills/boundary-cases/SKILL.md), and the [author metadata](../reviews/author-domain-modeling.json). The metadata accounts for every source support file. The refactor retains Matt's MIT notice and existing invocation policy; the original proposal uses ordinary discovery. Neither package is installed by this chapter.

[Independent behavioral evaluation](../evals/domain-modeling.md) now records the trial responses and case-bound grades. The bet above remains a design hypothesis, not a demonstrated collaboration gain. Judge the recorded trial on the behavior it actually tested; tidy formatting alone cannot establish improvement.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. Active model building remains distinct from merely consuming vocabulary. The candidate preserves concrete scenario testing, code-versus-intent reconciliation, immediate capture of resolved terms, lazy creation, glossary-only content, and the three-part ADR bar. Existing support formats match those obligations and retain multi-context lookup. Allowing established project conventions avoids forcing a parallel documentation system. No source invariant requires the old presumption that either code or a user statement is automatically right; the candidate correctly surfaces that conflict. No actionable semantic defect found.

None. Continue capturing only resolved definitions, not polished summaries of unresolved disputes.

Evidence: [source/skills/engineering/domain-modeling/SKILL.md:8-74](../source/skills/engineering/domain-modeling/SKILL.md), [source/skills/engineering/domain-modeling/CONTEXT-FORMAT.md:25-60](../source/skills/engineering/domain-modeling/CONTEXT-FORMAT.md); [refactored/domain-modeling/SKILL.md:7-17](../refactored/domain-modeling/SKILL.md), [refactored/domain-modeling/ADR-FORMAT.md:29-37](../refactored/domain-modeling/ADR-FORMAT.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **boundary-cases**: **merge**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

Minimal pairs differing in one decisive property are a precise way to expose classification rules. The skill protects contested categories and distinguishes values from factual premises. It has a recognizable classification use case, but its core mechanism and output substantially overlap intent-examples and contrastive-explanation. It works best as a named mode.

**Weakness:** A single clarified rule may be inappropriate when different authorities legitimately use different boundaries. The final format suggests one rule even though the cautions allow contestation.

**Suggested improvement:** Merge into intent-examples as a classification mode, retaining minimal pairs and explicit decision authority. Permit an authority-indexed set of rules or an unresolved boundary instead of forcing one final definition.

A proposed test was: Our policy says 'active customers receive support.' Use nearby cases to clarify whether paused subscriptions, trial accounts, and overdue renewals count. Success would mean: The resulting cases isolate consequential classification properties, expose genuine policy choices, and preserve multiple valid conventions where no single authority settles them. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
