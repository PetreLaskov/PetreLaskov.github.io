# Prototype: build the question, then preserve the answer

**Source:** [source/skills/engineering/prototype/SKILL.md](../source/skills/engineering/prototype/SKILL.md) at [Matt Pocock commit c55ee46073ed](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/prototype/SKILL.md). Human commentary: [source/docs/engineering/prototype.md](../source/docs/engineering/prototype.md). These are the pinned study materials, not claims about the latest upstream release.

**Collaboration bet: ADOPT.** Adopt narrow prototypes for uncertainty discussion cannot settle; preserve runnable evidence and require a real user verdict on subjective choices.


## Understand the skill

A prototype is throwaway code that answers a question (source SKILL.md:8). That definition excludes two tempting substitutes: a miniature production application and a vague demo with no decision attached. The question determines the artifact. Does a state model behave sensibly? Build a logic demo. What should a screen look like? Build structurally different UI variants (SKILL.md:10–17).

The two branches are deliberately different. LOGIC.md specifies one self-contained HTML file, with a pure logic module separated from the page, readable state, free-play actions, and guided scenarios that reset to a known initial state. Domain experts should be able to open it without a development environment (LOGIC.md:18–58).

UI.md prefers variants embedded in an existing page, preserving its data fetching and surrounding application. A new throwaway route is the fallback. Three variants are the default and five the cap; they differ in structure, hierarchy, and affordance, not merely color. A query parameter selects the variant and a floating bar supports arrows and keyboard navigation without capturing typing keys (UI.md:14–92).

Both branches minimize persistence, hardening, and abstraction. They surface relevant state. The completed prototype is preserved as a primary artifact on an isolated throwaway branch, with a pointer from the implementation issue; the validated decision belongs in the real work (SKILL.md:19–26). “Throwaway” describes construction and maintenance expectations, not automatic destruction.

## Worked example: partial refunds

You are unsure how partial refunds interact with a multi-item order. A logic prototype states the question visibly and exposes actions such as add item, pay, refund one item, refund the remaining amount, and attempt an invalid extra refund. Its state panel shows amounts and item status in business language. A pure reducer enforces the proposed model; button handlers merely call it.

Guided scenarios include the normal path, mixed partial refunds, and an illegal action. The user can also press actions in an unexpected order. The interesting outcome is “That should not be allowed” or “I thought the refundable amount included shipping.” Those observations revise the idea before it acquires production callers.

A beautiful page that permits anything because its reducer is wrong cannot provide useful evidence. The source's “no tests” instruction should prevent production test suites and hardening, not excuse failing to check that the demonstration actually represents the proposed model. The refactor therefore requires proportionate smoke checks of the paths that answer the question.

If the uncertainty were instead how users discover refund actions, the UI branch is appropriate. It might compare a table, a focused item inspector, and a step-based flow in the existing order page. All use the same representative data so the comparison concerns design rather than content differences.

## What it gets right

The question-first rule is the skill's most valuable constraint. It gives the work a natural stop and prevents a prototype becoming the application by momentum. The source human docs explicitly distinguish this from a full sales demo.

The logic/page separation is another strong invariant. A pure state model can remain useful after the demo shell is retired. It also makes the page's explanations easier to trust because domain behavior does not hide in event handlers.

For UI, existing-page embedding improves the realism of judgment. A layout that looks elegant on a blank route may fail under real navigation, data density, or authentication context. Structural variation also avoids wasting three alternatives on cosmetic changes.

Finally, preserving the artifact alongside the verdict is excellent. A prose summary loses the concrete thing that convinced people. A later reader can revisit the evidence, discover a limitation, and change the decision without reconstructing the entire exploration.

## When to use it and when to skip it

Use it at an uncertainty that needs something to react to. Stop grilling when the user is repeatedly guessing how an interaction will feel. Prototype when state transitions are too tangled to hold in working memory. Use ordinary implementation when the decision is already settled.

The source is not a general bug-diagnosis skill. If production behavior is wrong and the desired behavior is known, a reproduction and diagnosis loop may be better. Nor should an assistant create variants merely because options seem impressive. The unresolved question must justify the cost.

A prototype need not prove the full production design. It can establish that a concept is plausible or reveal a flaw while leaving performance, accessibility, or integration untested. The verdict should state that scope. Otherwise a convincing toy can become unsupported confidence.

## Criticism and strongest case for the original

The broad “no tests” language is too absolute if interpreted as no verification. A broken demo can produce a false design conclusion. The narrow repair is to check runnable behavior at the question's critical paths, without converting the artifact into a production-quality project.

Preserving a branch also has assumptions: a Git repository exists, the branch can be referenced later, and someone maintains its availability. A branch is not eternal evidence. The refactor keeps the source's preservation intent and gives a non-Git fallback, while avoiding automatic pushing or PR creation.

The UI source hides the switcher in production but does not as clearly require all variant selection to be unreachable there. A bar disappearing does not prevent a query parameter selecting experimental rendering. The refactor explicitly gates the prototype behavior and restores the original page in production.

The strongest case for the original is its speed and vivid specificity. The detailed demo shapes make outputs much more usable than “build a proof of concept.” Too much experimental-method bureaucracy would destroy that advantage. The refactor therefore adds only a question, a meaningful check, a human verdict when needed, and honest evidence limits.

## Portability and collaboration bet

The logic branch is highly portable because it requires only a browser. The UI branch is intentionally repository-specific, using its router and component system. A pure one-file demo should not be turned into a React application merely for the assistant's convenience.

My **adopt** bet is earlier discovery of conceptual mistakes and clearer user choices. The falsifier is prototypes consuming substantial effort without changing a decision, or their simplified behavior creating confidence that later fails immediately in reality. Track the question settled and the rework avoided, not how many variants were generated.

## Refactor and numbered delta

1. **State the question and verdict boundary.** Identify what observation would answer it and what remains outside the demo.
2. **Keep the two artifact branches.** Single-file pure logic and in-context UI variants remain distinct; a generic sandbox would lose their usefulness.
3. **Replace absolute no-verification with proportionate smoke checks.** No production suite is required, but the paths providing evidence must work.
4. **Gate all experimental UI behavior.** Production should retain the normal page, not merely hide the switcher.
5. **Keep subjective selection with the user.** An assistant may recommend a variant; it should not call a preference validated by choosing it itself.
6. **Separate preservation from promotion.** Preserve the prototype and answer, then harden or rewrite production code only within the authorized task.
7. **Provide a non-Git evidence fallback.** A clearly marked snapshot can carry the same purpose when no branch exists.

## Original proposal: assumption-budget

Assumption-budget is an upstream tool for deciding what to prototype or investigate. It identifies the few assumptions whose failure would cause the most rework and chooses how much evidence each deserves. It does not attempt to eliminate uncertainty.

For a proposed collaboration tool, assumptions might include users needing live editing, an API permitting the required access, and a team accepting a new workflow. These differ in uncertainty, consequence, and reversibility. The skill prioritizes a cheap API check or workflow trial before polishing a dashboard.

The novelty claim is limited to this collection: wayfinder maps decisions, while assumption-budget ranks untested premises by the consequence of being wrong. Its output is a small evidence allocation, not a full map. The cost is judgment under uncertainty. Its falsifier is a ranking that repeatedly spends effort on low-consequence assumptions while missing the premise that later breaks the project.

## Study exercises and connections

Take a proposed feature and write one question a prototype can settle. List what it cannot establish. Choose the logic or UI shape and explain why. Design one awkward scenario that could change the model.

Then examine three assumptions behind the feature and choose which one deserves evidence first. Compare [grilling](grilling.md), [research](research.md), and [wayfinder](wayfinder.md): conversation, source reading, and a concrete artifact each resolve different uncertainty.

## Package and evaluation record

Read the [complete refactored skill](../refactored/prototype/SKILL.md), the [original proposal](../original-skills/assumption-budget/SKILL.md), and the [author metadata](../reviews/author-prototype.json). The metadata accounts for every source support file. The refactor retains Matt's MIT notice and existing invocation policy; the original proposal uses ordinary discovery. Neither package is installed by this chapter.

[Independent behavioral evaluation](../evals/prototype.md) now records the trial responses and case-bound grades. The bet above remains a design hypothesis, not a demonstrated collaboration gain. Judge the recorded trial on the behavior it actually tested; tidy formatting alone cannot establish improvement.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. Both distinctive branches survive in their support files: a portable pure-model logic demo with guided and free-play paths, and structurally different UI variants in realistic application context. Relevant state remains visible, subjective validation requires the user's verdict, and experimental evidence is preserved. The refactor improves the source's ambiguous promotion rule by separating a validated decision from production-quality implementation. It also gates both UI selection and prototype rendering out of production. Smoke checks are appropriate for trustworthy demonstrations and do not erase the throwaway purpose.

None. Actual run and production-gating checks are still required for generated prototypes.

Evidence: [source/skills/engineering/prototype/SKILL.md:14-26](../source/skills/engineering/prototype/SKILL.md), [source/skills/engineering/prototype/LOGIC.md:24-48](../source/skills/engineering/prototype/LOGIC.md), [source/skills/engineering/prototype/UI.md:16-32](../source/skills/engineering/prototype/UI.md), [source/skills/engineering/prototype/UI.md:85-112](../source/skills/engineering/prototype/UI.md); [refactored/prototype/SKILL.md:7-20](../refactored/prototype/SKILL.md), [refactored/prototype/LOGIC.md:3-11](../refactored/prototype/LOGIC.md), [refactored/prototype/UI.md:3-11](../refactored/prototype/UI.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **assumption-budget**: **merge**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It prioritizes uncertainty by consequence, reversibility, and evidence cost without invented scoring. Leaving cheap reversible assumptions explicit helps prevent endless preparatory research. The ranking step is useful, but most of the skill is an upstream selector for evidence-fork or reversible-bets rather than an independent end-to-end collaboration mechanism.

**Weakness:** The output can remain a tidy list of assumptions unless the selected evidence move is actually carried into the authorized task. 'Smallest set' lacks a concrete stopping basis.

**Suggested improvement:** Merge it into a compact uncertainty-to-action family as the triage stage. Preserve its ranking criteria, but require an explicit handoff to observation, trial, or authorized implementation.

A proposed test was: Before building this importer, identify which unknowns could force expensive rework and which we can safely learn while implementing. Success would mean: The output selects a small number of decision-changing unknowns, explains why others can wait, and specifies a next observation with a result that changes the plan. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
