# Codebase Design — buy capability with less caller knowledge

**Study question:** is a small interface actually simple to use?

## Understand the original

Codebase-design is the vocabulary underneath several engineering skills. Its central claim is that a useful module hides substantial behavior behind an interface that asks little of its callers. The caller gains leverage; the maintainer gains locality. A correction belongs in one place, and callers do not repeatedly learn how the mechanism works. The skill deliberately makes “module” scale-independent: a function, class, package, or larger slice can have this property. Folder count is not the measure. [S1]

The most important definition is interface. It includes far more than method signatures: ordering rules, invariants, errors, configuration, and performance characteristics are all facts the caller must know. An operation named save() may look tiny in a type declaration yet require the caller to open a transaction, normalize identifiers, retry a conflict, and invalidate three caches. Its true interface is large. A carefully designed save() can instead own those obligations, provided it can do so without hiding consequential choices the caller must control.

Depth means capability per unit of interface knowledge. The source rejects a ratio of implementation lines to interface lines because that would reward bloated internals. It uses a deletion test: imagine removing the module. If the only thing lost is forwarding, perhaps the module is not earning its place. If complicated policy reappears in many callers, the module is probably doing useful work. This is a powerful thought experiment because it asks where complexity goes rather than whether a file looks tidy. [S2]

The supporting Deepening reference classifies dependencies. Pure computation can be exercised directly; a local substitute can support realistic tests; an owned remote service can sit behind a port with production and test adapters; a true external service can use a mock adapter. Another reference, Design It Twice, asks parallel agents to explore radically different interfaces under contrasting constraints. The alternatives include minimum surface, maximum flexibility, and convenience for the common caller. Comparison turns on depth, locality, and seam placement. [S3, S4]

## A worked example

Suppose importing a customer currently requires callers to invoke parseRow, normalizeEmail, validateRegion, findExistingCustomer, chooseMergePolicy, saveCustomer, and emitImportedEvent in the correct order. Each helper may be individually clean and well tested. The caller nevertheless owns the real policy. A new import path can easily skip normalization or emit an event before persistence.

A deeper interface could be importCustomer(row, importPolicy), returning a typed outcome: created, updated, rejected, or already processed. The implementation owns the stable order, transaction behavior, and event decision. The caller still supplies importPolicy if that is a real business choice. Hiding it behind a default merely to reduce parameter count would not be improvement. The interface contract should state how duplicate input is treated, whether retrying is safe, and which failures are recoverable.

Now apply the deletion test. Removing a pass-through CustomerImportFacade that merely repeats all seven calls as public methods loses little. Removing the proposed importCustomer operation redistributes coordination and error handling to every import path. That suggests real leverage. Then design twice: compare one row-at-a-time operation with a batch operation that can report partial failures. The batch interface may have more types yet impose less caller work for the actual use case. Depth is not equivalent to the fewest entrypoints.

## What it gets right

The source gives humans and agents shared words for distinctions that otherwise blur. “Make it cleaner” is vague; “move duplicate merge policy behind the import interface so both callers use it” is inspectable. The vocabulary also unifies implementation and testing. Testing through the caller-facing interface tends to protect behavior that survives internal restructuring, while mocks between every helper can freeze the very design we want to improve.

Design It Twice is valuable because alternative constraints can yield actual alternatives. Asking three agents for “the best design” may produce three versions of the same obvious answer. Asking one for minimal surface and another for the common caller creates a reason to diverge. The source also asks for error modes and usage examples, not just type declarations. That makes the proposals comparable in practice.

The strongest reason to keep the original is its memorable, opinionated language. A small set of sharp heuristics can improve design discussions more than a nuanced treatise nobody remembers. “Where does complexity go when this disappears?” is a usable question during real work. Porting should preserve that question, not dissolve it into a general instruction to weigh tradeoffs.

## Criticism and limits

The glossary sometimes becomes vocabulary policing. Forbidding “API,” “service,” or “boundary” everywhere is counterproductive when those words name real deployment or protocol facts. It is useful to distinguish a TypeScript signature from the entire interface contract; it is unnecessary to rename a third-party REST API in every sentence. Consistency should serve distinctions, not suppress them.

Several heuristics are expressed as laws. Two adapters are good evidence that variation is real, but a single implementation can still sit behind a justified policy or ownership boundary. Conversely, a gratuitous test adapter does not automatically justify an abstraction. “Fewer methods means fewer tests” also overstates matters: one method with a dozen modes may need many more behavioral tests than several narrow operations.

The testing reference says to delete old shallow-module tests once interface tests exist. That can remove duplication, but the existence of a broader test does not prove it checks every meaningful invariant. Replacing coverage needs a behavioral comparison. Small algorithm tests may remain useful when they test a stable contract and diagnose failures efficiently. A deep public module can have legitimate internal structure and diagnostic tests without exposing those seams to callers. [S3]

The documentation describes a reference being mistaken for an autonomous design driver, with substantial unrequested exploration. It also discusses tool-specific portability problems that do not exactly match every line in this pinned source. Treat those pages as issue history, not a substitute for inspecting the current file. The refactor directly states the reference boundary and avoids asserting a particular tool name is required. [S5]

## Porting bet and dependency cost

**Bet: adopt as a reference.** I expect it to help us explain design choices and avoid helper-heavy structures that make the important behavior hard to find. I would not install it as a general command that rewrites a repository whenever architecture is mentioned. Its falsifier is caller work: if a proposed deepening makes a representative caller harder to write, increases hidden ordering obligations, or spreads the next likely change farther, the design did not become better merely because it uses fewer methods.

The base glossary requires no external service. Alternative design benefits from subagents, but a limited host can explore contrasting designs sequentially. Project vocabulary and ADRs supply local context when present. Missing files should not become a reason to invent a documentation project. Both supporting references remain in the refactored package because they perform distinct jobs and can be loaded only when needed.

## Refactor: sharpen the lens without launching the workshop

The entrypoint defines the same small vocabulary, makes the deletion test explicit, and evaluates total caller knowledge. It adds a clear rule: consult this reference inside the user's chosen task; do not begin a redesign merely because it was invoked. A request to design a selected interface can use the alternative-design reference. The resulting comparison includes common and awkward caller examples, failure semantics, and migration cost.

The Deepening reference preserves dependency categories but asks whether a stand-in reproduces the behavior being claimed. An in-memory database may be convenient while differing on concurrency or SQL semantics. The refactor neither rejects substitutes nor treats them as proof of production equivalence. Test replacement is tied to actual protected behavior, retaining diagnostic tests only when they earn their cost.

## Original proposal: Rehearse the Next Change

Architecture is often evaluated with diagrams and imagined flexibility. This proposal tests a design by rehearsing a few concrete future changes. Choose one likely change, one adverse but plausible change, and one caller we actually have. For each candidate, sketch the edits those changes require. Compare the obligations introduced, knowledge duplicated, and assumptions that become expensive to reverse.

For the import example, a likely change is a new merge policy; an adverse one is event delivery becoming asynchronous. If both changes require every caller to understand persistence sequencing, the proposed deepening has not hidden the right knowledge. If one giant import operation can accommodate them only through a growing mode object, the apparently small surface may be misleading. Rehearsal makes that visible before production code is rewritten.

This is not a claim to have invented change scenarios or architectural fitness analysis. The proposal packages a compact comparative exercise around an immediate decision. It should take enough effort to reveal consequences, not build three full implementations. Its cost is extra design time and the risk of optimizing for invented futures. Its falsifier is whether the selected scenarios were grounded in actual roadmaps, failure history, or caller needs, and whether later changes behave as predicted. Speculative scenarios should be labeled and given less weight.

## Study and transfer

1. Write the hidden interface of an operation you use: include timeouts, ordering, errors, and required configuration.
2. Apply the deletion test to one wrapper. Where does its knowledge go?
3. Compare two import interfaces by caller examples rather than method count.
4. Explain when a local test substitute is insufficient evidence.

Read [improve-codebase-architecture](improve-codebase-architecture.md) for selecting candidates and [tdd](tdd.md) for turning an agreed seam into tests. The original proposal turns this chapter's design vocabulary into a small experiment rather than an aesthetic verdict.

## Numbered semantic delta

1. **D1: Make reference-only behavior explicit and scope alternative design to the selected module.** A glossary should not authorize a redesign campaign. Tradeoff: The user or driver must actually select a design problem.

2. **D2: Keep defined vocabulary but permit exact project and technology terms.** Calling an HTTP API an API or a deployed service a service need not obscure module reasoning. Tradeoff: Slightly weaker enforced vocabulary uniformity.

3. **D3: Evaluate total caller obligations, not method count alone.** One method with modes, sequencing, and hidden errors may be a huge interface. Tradeoff: Depth remains a judgment rather than a numeric score.

4. **D4: Treat second-adapter and public-test heuristics as evidence, not universal laws.** Policy boundaries and localized diagnostic tests can be justified independently. Tradeoff: Requires explaining exceptions.

5. **D5: Replace shallow tests only after verifying that new tests preserve meaningful coverage.** Interface tests need not cover every old invariant automatically. Tradeoff: A temporary overlap may remain during migration.

## Artifacts and evaluation

[Refactored skill](../refactored/codebase-design/SKILL.md) · [Original proposal: rehearse-the-next-change](../original-skills/rehearse-the-next-change/SKILL.md) · [Exact source diff](../diffs/codebase-design.diff) · [Independent evaluation](../evals/codebase-design.md)

These are authored candidates, not installed skills. The linked independent evaluation records the actual text responses, case-bound grades and limitations. The design bet in this chapter is distinct from those observations. Source documentation issue reports are historical claims in the pinned bundle, not independently reproduced measurements.

## Source locators

- **S1:** [skills/engineering/codebase-design/SKILL.md, lines 8-28](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/codebase-design/SKILL.md#L8-L28) ([local snapshot](../source/skills/engineering/codebase-design/SKILL.md)).
- **S2:** [skills/engineering/codebase-design/SKILL.md, lines 54-114](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/codebase-design/SKILL.md#L54-L114) ([local snapshot](../source/skills/engineering/codebase-design/SKILL.md)).
- **S3:** [skills/engineering/codebase-design/DEEPENING.md, lines 7-37](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/codebase-design/DEEPENING.md#L7-L37) ([local snapshot](../source/skills/engineering/codebase-design/DEEPENING.md)).
- **S4:** [skills/engineering/codebase-design/DESIGN-IT-TWICE.md, lines 9-44](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/codebase-design/DESIGN-IT-TWICE.md#L9-L44) ([local snapshot](../source/skills/engineering/codebase-design/DESIGN-IT-TWICE.md)).
- **S5:** [docs/engineering/codebase-design.md, lines 48-84](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/docs/engineering/codebase-design.md#L48-L84) ([local snapshot](../source/docs/engineering/codebase-design.md)).

## Supporting-resource disposition

- DEEPENING.md: **rewrite** — Retain four dependency categories and interface tests; replace blanket test deletion with demonstrated coverage substitution.
- DESIGN-IT-TWICE.md: **rewrite** — Retain contrasting design constraints and caller examples while supporting available concurrency and bounded design scope.
- agents/openai.yaml: **copy** — Preserve source UI metadata and invocation policy exactly.
- source/LICENSE: **copy** — Retain Matt Pocock MIT attribution in every refactored package.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. Depth as caller leverage, total interface obligations, module/seam/adapter distinctions, locality, the deletion test, dependency categories, and alternative interfaces remain. The refactor removes rigid vocabulary policing and the two-adapter quota without turning depth into a vague preference. Its support files preserve test invariants during deepening instead of ordering wholesale deletion of old tests. Competing designs remain grounded in actual constraints rather than invented flexibility. Reference use is scoped to the chosen task. No actionable contradiction between entrypoint and rewritten support found.

None. Broad design-quality claims still need evidence from actual callers and changes.

Evidence: [source/skills/engineering/codebase-design/SKILL.md:14-114](../source/skills/engineering/codebase-design/SKILL.md), [source/skills/engineering/codebase-design/DEEPENING.md:7-37](../source/skills/engineering/codebase-design/DEEPENING.md), [source/skills/engineering/codebase-design/DESIGN-IT-TWICE.md:11-44](../source/skills/engineering/codebase-design/DESIGN-IT-TWICE.md); [refactored/codebase-design/SKILL.md:12-33](../refactored/codebase-design/SKILL.md), [refactored/codebase-design/DEEPENING.md:3-11](../refactored/codebase-design/DEEPENING.md), [refactored/codebase-design/DESIGN-IT-TWICE.md:3-11](../refactored/codebase-design/DESIGN-IT-TWICE.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **rehearse-the-next-change**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It evaluates designs through concrete changes and actual callers, tracks moved knowledge rather than file count, and requires a fact that could reverse the recommendation. The design-rehearsal mechanism is substantive: sketching obligations under the same scenarios makes architecture comparisons inspectable without fully implementing competing designs.

**Weakness:** Scenario selection controls the conclusion. Even a grounded roadmap can omit present migration cost or favor the author's preferred future unless current operation is explicitly represented.

**Suggested improvement:** Pilot this early for consequential architecture choices. Include the current design as a baseline and count the cost of reaching each candidate, while keeping speculative futures visibly lower weight.

A proposed test was: Compare two notification-service designs by rehearsing adding a channel, changing retry policy, and supporting a real existing caller. Recommend one with concrete edit sketches. Success would mean: Both candidates face the same grounded scenarios, with visible contract, responsibility, migration, and verification consequences rather than abstract flexibility claims. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
