# Diagnosing Bugs — build the instrument before believing the theory

**Study question:** what would let us tell a real fix from a persuasive explanation?

## Understand the original

Diagnosing-bugs is a forceful intervention against a familiar coding-agent habit: read a bug report, scan some code, select the first plausible explanation, and patch it. Matt instead makes the feedback loop the first product. The agent needs one command, already run, that exercises the actual path and detects the user's exact symptom. Only then should the full hypothesis-testing process begin. The distinctive invariant is not “write more tests.” It is that the diagnosis must answer to an observation that can go red. [S1]

The source offers a ladder of loop-building methods: a failing test, HTTP request, command-line fixture, browser script, replayed capture, small harness, property or fuzz loop, bisection, differential execution, and finally a human-in-the-loop script. This breadth matters. Some failures are inaccessible to a neat unit test, and insisting on one particular testing style can produce a fake reproduction around a simplified model of the problem. The loop must reach the real failure pattern.

Once the loop exists, the skill asks to tighten it: reduce time, sharpen the assertion, stabilize inputs, and raise the reproduction rate for intermittent problems. It then minimizes the scenario, ranks three to five falsifiable hypotheses, selects probes that distinguish them, and changes one variable at a time. Debug logs receive a unique prefix so they can be removed later. Performance diagnosis uses measurements and bisection rather than indiscriminate logging. [S2]

A regression test is added before the fix only when there is a correct seam. That qualification is unusually good. A test around one helper cannot protect a failure that emerges from two callers interacting. If the architecture offers no suitable seam, the source treats that absence as a finding rather than producing a shallow test to satisfy the ritual. The original scenario must be rerun after the fix, not merely the minimized case.

## A worked example

Imagine duplicate invoices occasionally appearing when a client retries a timed-out request. A quick guess might add a check for an existing invoice before insertion. That looks reasonable but can still race when two requests check simultaneously. The right reproduction sends two requests with the same business key under controlled timing and observes the externally visible invoice count and outcomes.

Suppose the loop reproduces the duplicate in thirty of one hundred runs. We first ensure this is the user's symptom: two persisted invoices for one logical operation, rather than two log messages for one invoice. We then remove unrelated fields and background tasks while keeping the concurrent requests and persistence behavior. Plausible hypotheses include a missing uniqueness constraint, a wrongly scoped idempotency key, and a transaction ordering issue. Each needs a distinct prediction.

A probe showing both requests pass the existence check before either inserts distinguishes the race from an incorrect lookup key. The durable fix may need a database invariant and a well-defined retry outcome. A unit test that mocks “invoice exists” to return true does not reach the bug pattern. The regression test needs both requests through a seam that includes the relevant persistence semantics. Finally we rerun the original client-style scenario and report the number of observed failures under the same schedule.

## What it gets right

The strongest contribution is making evidence production the hard part of debugging. Once a reliable signal exists, many search strategies become possible. Without it, apparent progress can be a series of edits that merely move the symptom. The skill also separates reproduction from causation: seeing a failure is necessary evidence, but the ranked hypotheses and discriminating probes are what support an explanation.

Its insistence on the exact user symptom prevents a common substitution. An agent can discover a nearby error and “fix” it while the requested problem remains. Returning to the original scenario closes that loophole. Tagged instrumentation and an explicit cleanup phase address another real cost of debugging: temporary probes easily become permanent noise.

The strongest reason to keep the original's severity is anchoring. A permissive instruction such as “try to reproduce if convenient” is easy to satisfy with a mock example and then ignore. The hard red-loop gate creates a noticeable change in behavior. Refactoring should retain that pressure, especially for bugs already resistant to a first look.

## Criticism and source contradictions

A strict ban on any hypothesis before a loop exists is not fully workable. To construct a harness, one often needs a provisional idea about which path or environmental condition matters. The useful distinction is between an idea guiding evidence collection and a causal conclusion justifying a fix. The refactor permits the former and blocks the latter. It does not let “this is probably it” stand in for an observed reproduction.

The minimization criterion is also overly absolute: every remaining element must be load-bearing. A minimal case is valuable, but proving a global minimum can become a separate research problem. Keep reducing while it meaningfully improves the signal or narrows the hypothesis space. Stop when the remaining setup is justified or the cost of further reduction exceeds the diagnostic benefit.

For intermittent failures, “raise the rate” is sensible, but the source's numerical rhetoric is too confident. A rare bug can be debuggable through tracing or invariant checks; adding sleeps can change the very schedule that matters. Report the baseline failure count, repetitions, and environment. Zero failures in a small sample supports a narrower claim than “fixed forever.”

There is important drift inside this source bundle. The public documentation says redaction is an open, unimplemented issue, but the pinned SKILL.md already contains a Redact section requiring secrets to be replaced before output is shown. The chapter and refactor follow the actual instruction file. The docs also report overly broad activation on ordinary problem descriptions; that is a reported experience, not an independently reproduced rate. [S1, S4]

## Porting bet and dependency cost

**Bet: adopt for hard defects, with a discriminating trigger.** I expect this to improve the reliability of our fixes more than it improves the speed of easy answers. Its falsifier is whether completed diagnoses actually demonstrate the exact symptom before and after the change. If the process repeatedly builds toy models detached from the failing path, or spends large effort manufacturing a loop for a one-message explanation, it is misapplied.

The skill needs runnable access to enough of the system to observe the symptom. It cannot conjure production behavior from unavailable data. When blocked, the useful output is a concise record of attempted loops and the minimum missing access or captured artifact. Temporary production instrumentation is a separate action requiring appropriate authorization.

The bundled human-in-loop script is copied unchanged. It prints captured observations back to the terminal, so it is suitable for redacted error descriptions, not credentials. It requires a terminal the human can actually use; writing a script that waits on inaccessible agent stdin does not create a human feedback loop. No source script was executed while preparing this package.

## Refactor: preserve the gate, calibrate the claim

The new version retains six phases but clarifies evidence and stopping conditions. Existing triage reproduction can be reused after checking that environment and symptom match. Hypotheses remain ranked and falsifiable, with alternatives sufficient to prevent premature commitment rather than a quota of invented explanations. The test must exercise the real interaction; absence of a correct seam becomes an explicit architectural follow-up.

It also defines proportional activation. A question asking why an error message occurs can receive a direct explanation. Escalate to the full discipline for hard or uncertain diagnosis, an intermittent bug, a measured regression, or an explicit request. This preserves the value of rigor without treating every use of the word “slow” as a mandate for a long investigation.

## Original proposal: Construct a Counterexample

The new proposal generalizes one aspect of debugging to reasoning and design. Given a consequential claim, construct the smallest concrete situation in which it would fail. A counterexample can be a sequence of events, an input, a user journey, or a worked calculation. It must satisfy the claim's stated assumptions; changing the problem is not a refutation.

For example, “checking before insertion prevents duplicates” is defeated by two requests interleaving between check and insert. Writing that schedule can clarify the problem before building the full concurrent harness. In a planning task, “every ticket can be completed independently” is challenged by a ticket whose acceptance depends on a sibling's unavailable interface. The skill is useful beyond code because it turns vague disagreement into an inspectable case.

The novelty claim is limited: counterexample construction is a classical method. The original contribution here is a compact collaboration protocol that asks the agent to instantiate objections, not merely list risks. Its cost is adversarial effort that can distract from routine work. Its falsifier is whether the example obeys the original assumptions and changes the claim or our confidence. A fanciful edge case outside the agreed scope does not win.

## Study and transfer

1. Distinguish a failing test of the reported bug from a failing test of a nearby concern.
2. Write two alternative hypotheses for duplicate invoices and a probe that separates them.
3. Explain why a passing minimized case does not replace rerunning the original scenario.
4. Read [codebase-design](codebase-design.md) and identify what a correct seam must include.

The related [triage](triage.md) chapter covers shallow verification before committing to diagnosis. [TDD](tdd.md) covers building planned behavior rather than discovering a cause.

## Numbered semantic delta

1. **D1: Narrow activation to hard diagnosis or a demonstrated need for the full loop.** The broad broken/slow trigger overreaches ordinary explanatory questions. Tradeoff: Some tasks start with a lightweight inspection before escalation.

2. **D2: Allow provisional ideas needed to construct a repro, but no causal conclusion or fix without symptom evidence.** Reading code to find a runnable path is often necessary. Tradeoff: Requires discipline to keep provisional harness ideas from becoming assumed causes.

3. **D3: Minimize until further reduction no longer improves diagnosis, rather than demand a global minimum.** A strict every-element-load-bearing gate can consume more time than the diagnosis. Tradeoff: Repros may retain harmless scaffolding.

4. **D4: Record stochastic baseline, repetitions, and comparison conditions.** A few passing stress runs do not establish that a flake is gone. Tradeoff: Intermittent bugs need more careful result statements.

5. **D5: Reuse triage reproduction and explicitly hand off missing test seams.** Avoid redundant setup and make the architectural finding actionable. Tradeoff: Existing evidence must be checked for matching environment and symptom.

## Artifacts and evaluation

[Refactored skill](../refactored/diagnosing-bugs/SKILL.md) · [Original proposal: construct-a-counterexample](../original-skills/construct-a-counterexample/SKILL.md) · [Exact source diff](../diffs/diagnosing-bugs.diff) · [Independent evaluation](../evals/diagnosing-bugs.md)

These are authored candidates, not installed skills. The linked independent evaluation records the actual text responses, case-bound grades and limitations. The design bet in this chapter is distinct from those observations. Source documentation issue reports are historical claims in the pinned bundle, not independently reproduced measurements.

## Source locators

- **S1:** [skills/engineering/diagnosing-bugs/SKILL.md, lines 12-66](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/diagnosing-bugs/SKILL.md#L12-L66) ([local snapshot](../source/skills/engineering/diagnosing-bugs/SKILL.md)).
- **S2:** [skills/engineering/diagnosing-bugs/SKILL.md, lines 68-138](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/diagnosing-bugs/SKILL.md#L68-L138) ([local snapshot](../source/skills/engineering/diagnosing-bugs/SKILL.md)).
- **S3:** [skills/engineering/diagnosing-bugs/scripts/hitl-loop.template.sh, lines 9-44](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/diagnosing-bugs/scripts/hitl-loop.template.sh#L9-L44) ([local snapshot](../source/skills/engineering/diagnosing-bugs/scripts/hitl-loop.template.sh)).
- **S4:** [docs/engineering/diagnosing-bugs.md, lines 58-74](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/docs/engineering/diagnosing-bugs.md#L58-L74) ([local snapshot](../source/docs/engineering/diagnosing-bugs.md)).

## Supporting-resource disposition

- scripts/hitl-loop.template.sh: **copy** — Preserve small observational human-in-loop helper unchanged; constrain capture to redacted nonsecret observations and require a user-controlled terminal.
- agents/openai.yaml: **copy** — Preserve source UI metadata and invocation policy exactly.
- source/LICENSE: **copy** — Retain Matt Pocock MIT attribution in every refactored package.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. The exact-symptom loop still governs diagnosis, with observed red evidence, minimization, competing explanations, discriminating probes, a real regression seam, and rerunning the original scenario. Allowing provisional code reading to construct the loop repairs an overly rigid source prohibition. The candidate improves flaky-result calibration and avoids a toy reproduction that merely resembles the bug. The retained HITL template has an old comment saying the agent runs it, but the entrypoint explicitly requires adaptation for a user-controlled terminal; that clear controlling instruction prevents a material contradiction.

No behavioral repair required. Align the helper comment with the entrypoint when next touching that file.

Evidence: [source/skills/engineering/diagnosing-bugs/SKILL.md:18-138](../source/skills/engineering/diagnosing-bugs/SKILL.md); [refactored/diagnosing-bugs/SKILL.md:12-42](../refactored/diagnosing-bugs/SKILL.md), [refactored/diagnosing-bugs/scripts/hitl-loop.template.sh:3-16](../refactored/diagnosing-bugs/scripts/hitl-loop.template.sh). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **construct-a-counterexample**: **merge**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It asks for the smallest in-scope violating input or sequence and explicitly separates a reasoned example from an executed result. The concurrency example demonstrates the intended specificity. Its execution guidance is a useful refinement of counterexample-search, but the trigger, reasoning steps, stopping rule, and final claim repair are otherwise nearly identical.

**Weakness:** Keeping both skills would make selection depend on wording rather than a consequential procedural difference. Neither needs a second installed entry to cover concrete construction.

**Suggested improvement:** Merge with counterexample-search and retain this version's concrete sequence, isolated fixture, and evidence-status language. Give technical and nontechnical examples in one skill instead of creating separate generic challengers.

A proposed test was: Our cache claims readers never see an older value after a newer one. Build the smallest allowed event sequence that could break that guarantee. Success would mean: The case satisfies the stated assumptions, shows the contradiction step by step, labels execution status, and supports a proportionate change to the claim or design. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
