# Recorded development results

The suite contains **114 fixed prompts**, three per source skill. Three fresh response-producing agents supplied **342 retained fixture responses**: source package, refactored package, and no supplied package. Three further agents graded anonymized labels against fixed assertions. Cases share context within each response-producing condition, and outputs are not independent samples.

| Condition | Supported assertion points | Clean cases | Critical failures |
|---|---:|---:|---:|
| source | 265.5/266 | 113/114 | 0 |
| refactor | 264.5/266 | 111/114 | 0 |
| control | 260.5/266 | 106/114 | 0 |

Refactor versus source across 38 skill groups: **0 higher, 36 tied, 2 lower** assertion totals. Refactor versus no-supplied-skill control: **6 higher, 31 tied, 1 lower**. These are descriptive case results, not estimates of causal improvement.

## How to interpret the result

This suite tests whether a model can produce an appropriate compact response under explicit fixture constraints. Many prompts make the desired boundary clear. It is therefore vulnerable to ceiling effects and cannot establish whether a skill changes long-running tool use, recovers from environmental failures, improves user attention, or reliably activates at the right time. A strong control result is evidence that those answers cannot be credited to the supplied skill alone.

The refinements remain design bets until unseen practical tasks demonstrate benefit. Prefer fixes with a concrete mechanism and documented source mismatch, but do not turn that judgment into an unsupported performance claim. No skill was globally installed or endorsed by the user.

## Per-skill results

| Skill | Source | Refactor | Control |
|---|---:|---:|---:|
| [writing-for-agents](writing-for-agents.md) | A (7/7) | A (7/7) | A (7/7) |
| [grilling](grilling.md) | A (7/7) | A (7/7) | C (6/7) |
| [grill-me](grill-me.md) | A (7/7) | A (7/7) | B (6.5/7) |
| [teach](teach.md) | A (7/7) | A (7/7) | A (7/7) |
| [research](research.md) | A (7/7) | A (7/7) | A (7/7) |
| [handoff](handoff.md) | A (7/7) | A (7/7) | A (7/7) |
| [prototype](prototype.md) | A (7/7) | A (7/7) | A (7/7) |
| [wayfinder](wayfinder.md) | A (7/7) | A (7/7) | A (7/7) |
| [to-spec](to-spec.md) | A (7/7) | A (7/7) | A (7/7) |
| [domain-modeling](domain-modeling.md) | A (7/7) | A (7/7) | A (7/7) |
| [wait-what](wait-what.md) | A (7/7) | A (7/7) | A (7/7) |
| [grill-with-docs](grill-with-docs.md) | A (7/7) | A (7/7) | A (7/7) |
| [loop-me](loop-me.md) | A (7/7) | A (7/7) | A (7/7) |
| [retro](retro.md) | A (7/7) | A (7/7) | A (7/7) |
| [to-tickets](to-tickets.md) | A (7/7) | A (7/7) | C (6/7) |
| [diagnosing-bugs](diagnosing-bugs.md) | A (7/7) | A (7/7) | A (7/7) |
| [code-review](code-review.md) | A (7/7) | A (7/7) | A (7/7) |
| [tdd](tdd.md) | A (7/7) | A (7/7) | A (7/7) |
| [implement](implement.md) | A (7/7) | A (7/7) | A (7/7) |
| [writing-fragments](writing-fragments.md) | A (7/7) | A (7/7) | A (7/7) |
| [writing-shape](writing-shape.md) | A (7/7) | A (7/7) | A (7/7) |
| [writing-beats](writing-beats.md) | A (7/7) | B (6.5/7) | B (6.5/7) |
| [to-questionnaire](to-questionnaire.md) | A (7/7) | A (7/7) | A (7/7) |
| [scaffold-exercises](scaffold-exercises.md) | A (7/7) | A (7/7) | B (6.5/7) |
| [codebase-design](codebase-design.md) | A (7/7) | A (7/7) | A (7/7) |
| [improve-codebase-architecture](improve-codebase-architecture.md) | A (7/7) | A (7/7) | A (7/7) |
| [ask-matt](ask-matt.md) | A (7/7) | A (7/7) | A (7/7) |
| [setup-matt-pocock-skills](setup-matt-pocock-skills.md) | A (7/7) | B (6.5/7) | A (7/7) |
| [pr](pr.md) | A (7/7) | A (7/7) | A (7/7) |
| [triage](triage.md) | A (7/7) | A (7/7) | A (7/7) |
| [resolving-merge-conflicts](resolving-merge-conflicts.md) | A (7/7) | A (7/7) | A (7/7) |
| [wizard](wizard.md) | A (7/7) | A (7/7) | C (6/7) |
| [implement-spec](implement-spec.md) | A (7/7) | A (7/7) | A (7/7) |
| [claude-handoff](claude-handoff.md) | A (7/7) | A (7/7) | A (7/7) |
| [setup-pre-commit](setup-pre-commit.md) | A (7/7) | A (7/7) | B (6.5/7) |
| [git-guardrails-claude-code](git-guardrails-claude-code.md) | B (6.5/7) | B (6.5/7) | B (6.5/7) |
| [setup-ts-deep-modules](setup-ts-deep-modules.md) | A (7/7) | A (7/7) | A (7/7) |
| [migrate-to-shoehorn](migrate-to-shoehorn.md) | A (7/7) | A (7/7) | A (7/7) |

## Reproducible evidence

- [Protocol](PROTOCOL.md) and [before-trial control addendum](PROTOCOL-ADDENDUM.md)
- [Case lock](case-lock.json), [prompts](prompts.json), and [rubrics](cases-with-rubrics.json)
- [Condition manifests](CONDITIONS.json)
- [Source responses](source-responses.json), [refactor responses](refactor-responses.json), [control responses](control-responses.json)
- [Scored results](scored-results.json) and [helper execution records](HELPER-TESTS.md)

The letter rubric is A = every assertion passes; B = partial support without any failed assertion; C = a failed assertion without a critical failure; D = a critical failure. Scoring is judgment-based, uses one response per case/condition, and was not statistically calibrated. Assertions should be contested where the retained response supports a different reading.

<!-- POST-TRIAL -->
## What the misses changed

The refactors lost half a point each on writing-beats and setup-matt-pocock-skills. The former carried unsupplied story context into a stress response; the latter imposed unverified tracker details. These are small observed regressions, not proof that either complete package is worse. The control also matched most cases. No result justifies a universal claim that longer instructions are better.

The setup seed received a concrete preservation repair. Writing-beats already forbade invented prerequisites, so its instructions stayed unchanged and an isolated retest was run. Triage and wizard received separate repairs from semantic audit. Initial grades remain attached to their tested versions.

The hook stress assertion about prompt advice was only partly supported by every condition: all clearly distinguished copied settings from enforcement, but none explicitly discussed prompt advice. This is partly a rubric-specific wording demand absent from the prompt, and should not be treated as evidence of differential skill value. The judgment is retained rather than altered after seeing results.

[Eight targeted follow-up responses](FOLLOWUP-RESULTS.md) supported 24/24 assertions. [Wizard regression tests](WIZARD-REPAIR.md) passed 14/14 on the repair against 4/14 for source and v1. Original-hook classifier tests met 6/11 intended classifications. None of these later development checks removes the need for unseen practical tasks.

[Execution notes](PROTOCOL-EXECUTION-NOTES.md) explain grading and version handling. [Published candidate identity](published-candidate-identity.json) maps final bytes to tested or repaired versions.
