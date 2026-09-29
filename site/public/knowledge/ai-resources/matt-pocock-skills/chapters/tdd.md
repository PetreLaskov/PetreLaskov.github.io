# TDD — one meaningful disagreement with the code at a time

**Study question:** what makes a test capable of telling us something we did not already assume?

## Understand the original

Matt's TDD skill is a reference for a particular loop: one failing behavioral test, then enough implementation to pass, then the next slice. It is not a comprehensive testing strategy or a universal instruction to test every changed line. The distinctive emphasis is on tests worth keeping: public behavior, independent expected values, and seams agreed before implementation. [S1]

A seam is where the test observes behavior without reaching into the mechanism. The source insists that these seams be confirmed with the user before tests are written. That rule attempts to spend testing effort on important paths and complex logic rather than automatically covering every helper. In the larger flow, to-spec should settle the seams; implement then uses them. If the interface itself is undecided, codebase-design supplies the vocabulary.

Three anti-patterns anchor the skill. Implementation-coupled tests mock internal collaborators or assert private structure, so harmless refactors break them. Tautological tests compute expected values using the same logic as the implementation, so the test and code can share the same mistake. Horizontal slicing writes a large batch of tests before any implementation, fixing an imagined structure before one real path has been learned. Vertical slices avoid that by letting each cycle inform the next.

The source's actual loop is red-green, not the conventional red-green-refactor phrase still present in some metadata. It explicitly moves refactoring into the review stage. The documentation says this was a deliberate response to agent behavior, not an accidental omission. That is important to teach accurately before proposing a different balance. [S4]

## A worked example

Suppose an invoice total must include a fixed five-unit delivery charge only when the order is below fifty units. A useful first example might be an order totaling forty units, with expected total forty-five. The expected value comes from the stated rule and a worked example. It does not call the same helper or repeat the same conditional used by the production code.

Write the test through the public invoice calculation interface, run it, and see it fail because the delivery charge is absent. Then implement only enough behavior to pass. The next slice tests the threshold exactly: an order of fifty should remain fifty. That boundary case might reveal whether “below” was implemented as less-than-or-equal. A third test can address an empty order only if the contract specifies that behavior and it matters to the feature.

Now compare a weak test. It calculates the expected value by summing line items and applying the same shipping conditional copied from the implementation. Both can get the threshold wrong together. Another weak test asserts that calculateInvoice calls deliveryCalculator once, even though callers care about the total, not the internal call graph. Renaming or inlining the helper would break the test without changing behavior.

A boundary interaction can be different. If the contract says an accepted payment emits exactly one receipt, an assertion on an external email adapter may protect real behavior. “Never assert call counts” is too crude; the question is whether the count belongs to the public contract or merely to today's implementation.

## What it gets right

The source's best insight is oracle independence. Test-first order alone does not make a test valuable. A test can be written first and still encode the same misunderstanding as the code. Known literals, worked examples, or an independently defined property give the assertion a chance to disagree meaningfully.

Vertical slicing also improves learning. A single path through the real interface exposes setup costs, error semantics, and unexpected constraints early. Writing twenty imagined tests before implementing any behavior can produce a rigid suite around a design that has not met reality. The source gives the agent a reason to keep the next step small without reducing the whole feature to disconnected horizontal layers.

The strongest reason to keep the original is its consistency. A team that has suffered brittle mock-heavy tests may benefit from a sharp rule against testing internals and a strict separation between implementation and structural review. A softened prompt can let the model rationalize every internal assertion. The refactor should preserve the default and require a concrete contract for exceptions.

## Criticism and limits

The source asks where to test but does not first ask whether the change warrants a new test. Config wiring, type-only edits, or a one-line delegation can provoke assertions that merely restate the implementation. The documentation identifies this gap directly. A good port should choose a meaningful verification method rather than force every change into the red-green shape. [S4]

Seam confirmation is another friction point. Asking “component or integration?” without explaining what each catches gives the user labels instead of a decision. The agent should recommend a seam, explain its important omissions and cost, and reuse agreement already established upstream. Repeated confirmation is not more respect for user agency; it can be a failure to read the conversation.

The testing references make some broad prohibitions. Database observation can be a side channel when the public behavior is user retrieval, but the database may itself be the contract in a migration or persistence adapter test. Mocking something “owned” can also be appropriate across a real remote boundary. The key is not ownership alone; it is whether the double preserves the interaction being claimed and whether actual integration is tested elsewhere. [S2, S3]

The strict removal of refactoring from the loop has a defensible purpose, but it can accumulate local duplication or misleading names that make the next slice harder. The proposed version allows small behavior-preserving cleanup under green tests while keeping broad architectural changes for deliberate review. This is a substantive philosophical delta, not a claim that the source intended conventional TDD all along.

## Porting bet and dependency cost

**Bet: adopt with proportional use.** This can improve collaboration when behavior has a clear input, observable outcome, and independent source of truth. It should be less automatic for appearance tweaks, mechanical edits, or exploratory prototypes. The falsifier is whether the resulting tests catch plausible wrong behavior and survive harmless internal refactoring. Merely observing more test files or higher coverage does not establish value.

The workflow depends on a runnable test environment and an agreed contract. Existing domain vocabulary helps name tests meaningfully. Codebase-design is useful when interface shape is the actual open question, but the refactored skill can describe the minimum seam concept without making another installed package mandatory for every cycle.

The two supporting resources are preserved as focused references. The examples remain concrete and contrast bad with good, but the absolute bans are tied to observable behavior. The original UI metadata is copied exactly, including its older short-description wording; the chapter records the mismatch rather than quietly rewriting invocation metadata the port was asked to preserve.

## Refactor: evidence that the check can fail

The revised entrypoint starts with testing value. What behavior is changing, what would show it wrong, and is a new test the best check? If the answer is mechanical verification, the agent can use typechecking, a build, or an appropriately scoped manual inspection.

For behavioral work, the red phase is an observed event. The test must fail because the promised behavior is missing or wrong, not because the test harness cannot import a module. If it is already green, determine whether the behavior already exists or the assertion is ineffective. Then implement the smallest slice and rerun. This makes the central invariant inspectable.

The refactor also preserves modest scope. One logical behavior can require several assertions; “one test” is a learning unit, not a contest to write the fewest expectations. Tests should explain the capability without freezing incidental internal structure. Wider restructuring remains a separate review choice.

## Original proposal: Change the Representation

Sometimes a problem stays difficult because we keep describing it in the same form. The original proposal deliberately changes representation: prose into a state machine, a vague comparison into a table of dimensions, a long process into a worked trace, or a calculation into units and constraints. The goal is to reveal a distinction the current form hides.

For the delivery-charge example, a truth table with order total below, equal to, and above fifty makes the threshold unambiguous. For a cancellation feature, a state-transition table may reveal that “cancelled” means both requested cancellation and completed refund. For a collaboration plan, a dependency graph may expose a circular prerequisite hidden in paragraphs.

This is not a claim to invent representational reasoning. The proposal packages it as a targeted move when discussion repeats without resolving a structural ambiguity. Its cost is translation and possible loss of nuance. Its falsifier is whether the new representation exposes a useful invariant, contradiction, or decision; a prettier diagram that repeats the same uncertainty does not help. The skill should translate the insight back into ordinary language so the representation supports the work rather than becoming a new jargon barrier.

## Study and transfer

1. Write an expected value independently from the implementation.
2. Explain a test that fails for the wrong reason.
3. Name one interaction count that is a real contract and one that is implementation detail.
4. Turn a fuzzy behavior into a small truth table before selecting tests.

Read [code-review](code-review.md) for a separate check of requirements and standards, and [diagnosing-bugs](diagnosing-bugs.md) for the difference between constructing planned behavior and finding a cause.

## Numbered semantic delta

1. **D1: Ask whether the change has meaningful behavior and an independent oracle before adding tests.** Mechanical changes can induce tautological tests. Tradeoff: Some work is verified by type/build/manual checks rather than a new test.

2. **D2: Reuse existing seam agreement and explain catches, misses, and cost for new choices.** A label-only seam question transfers expert judgment to the user without help. Tradeoff: A new seam proposal includes a little more explanation.

3. **D3: Require observing the intended red failure, not just creating a test before code.** An import error or already-green assertion does not establish sensitivity. Tradeoff: Each meaningful slice includes an explicit execution.

4. **D4: Preserve separate structural review while allowing necessary local cleanup under green tests.** Broad redesign should not derail the loop, but an absolute ban can accumulate avoidable duplication. Tradeoff: This deliberately differs from the source's strict review-only refactoring rule.

5. **D5: Qualify blanket bans on call counts and database observations by the actual contract.** A notification boundary may promise exactly one send; a persistence interface may be the real public contract. Tradeoff: Requires understanding the seam rather than matching forbidden syntax.

## Artifacts and evaluation

[Refactored skill](../refactored/tdd/SKILL.md) · [Original proposal: change-the-representation](../original-skills/change-the-representation/SKILL.md) · [Exact source diff](../diffs/tdd.diff) · [Independent evaluation](../evals/tdd.md)

These are authored candidates, not installed skills. The linked independent evaluation records the actual text responses, case-bound grades and limitations. The design bet in this chapter is distinct from those observations. Source documentation issue reports are historical claims in the pinned bundle, not independently reproduced measurements.

## Source locators

- **S1:** [skills/engineering/tdd/SKILL.md, lines 8-38](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/tdd/SKILL.md#L8-L38) ([local snapshot](../source/skills/engineering/tdd/SKILL.md)).
- **S2:** [skills/engineering/tdd/tests.md, lines 5-77](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/tdd/tests.md#L5-L77) ([local snapshot](../source/skills/engineering/tdd/tests.md)).
- **S3:** [skills/engineering/tdd/mocking.md, lines 3-59](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/tdd/mocking.md#L3-L59) ([local snapshot](../source/skills/engineering/tdd/mocking.md)).
- **S4:** [docs/engineering/tdd.md, lines 19-75](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/docs/engineering/tdd.md#L19-L75) ([local snapshot](../source/docs/engineering/tdd.md)).

## Supporting-resource disposition

- tests.md: **rewrite** — Retain behavioral versus implementation-coupled and tautological examples; explain assertions that genuinely represent boundary contracts.
- mocking.md: **rewrite** — Retain external-boundary substitution and domain-shaped operations; distinguish doubles from verified production semantics.
- agents/openai.yaml: **copy** — Preserve source UI metadata and invocation policy exactly.
- source/LICENSE: **copy** — Retain Matt Pocock MIT attribution in every refactored package.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **tradeoff**. Observed red before green, one behavioral slice, agreed caller-facing seams, independent expectations, and avoidance of imagined bulk tests remain intact. The support files now permit meaningful external interaction assertions and clearly scope what doubles establish, resolving source overgeneralizations. Allowing small behavior-preserving cleanup under green tests intentionally differs from the source's ban on refactoring during the loop. That is compatible with the skill's useful test-first purpose and the wider implementation workflow. The candidate narrows ritual tests for mechanical edits without abandoning meaningful behavioral protection.

Retain the adaptation. Watch whether 'small cleanup' is used to smuggle broader redesign into a slice.

Evidence: [source/skills/engineering/tdd/SKILL.md:14-38](../source/skills/engineering/tdd/SKILL.md), [source/skills/engineering/tdd/tests.md:38-59](../source/skills/engineering/tdd/tests.md), [source/skills/engineering/tdd/mocking.md:3-14](../source/skills/engineering/tdd/mocking.md); [refactored/tdd/SKILL.md:8-24](../refactored/tdd/SKILL.md), [refactored/tdd/tests.md:3-11](../refactored/tdd/tests.md), [refactored/tdd/mocking.md:3-11](../refactored/tdd/mocking.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **change-the-representation**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It maps hidden distinctions to appropriate forms and requires an insight to return to plain language and action. Unknowns and representational losses are preserved rather than disguised. The broad action is familiar good reasoning, but the form-selection examples and stop-if-uninformative rule make it a useful short intervention for genuinely stalled prose.

**Weakness:** The trigger remains subjective, and a polished diagram may be mistaken for discovery. The procedure does not explicitly compare what became decidable before and after the transformation.

**Suggested improvement:** Keep the lightweight escape hatch. Require a brief before-and-after statement of the unresolved distinction, and prefer existing task artifacts over creating a separate visualization deliverable by default.

A proposed test was: We keep talking past each other about retry states. Turn the current rules into the smallest state table that exposes missing or conflicting transitions. Success would mean: The new representation reveals a specific contradiction, missing state, or decision-relevant unknown, or the assistant candidly reports that it added no information. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
