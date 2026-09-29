# Evaluation protocol, version 1

This edition separates a reproducible development evaluation from a proven improvement in collaboration. The trial unit is a compact, text-only response to a realistic fixture. It is not a live repository task, an end-to-end hook test, a user study, or a statistical estimate of effectiveness.

## Design fixed before candidate review

There are 38 source skills. Each has a normal case, a stress case, and a non-trigger case: 114 prompts per condition. The coordinator wrote the prompts and observable assertions from the source purposes and likely failure modes before reading candidate drafts. The lock file records SHA-256 hashes. These are development cases, not a secret held-out benchmark: authors can technically read the shared filesystem, and an author reported one source mismatch before the lock. We do not claim airtight blinding.

Two fresh evaluator agents receive the same prompts and different skill collections, one source and one refactor. Neither receives chapter analysis, rubrics, the other condition's outputs, or intended answers. Source wrappers receive their available source dependencies. Refactored wrappers receive their corresponding candidates. Each evaluator performs the requested response under fixture constraints, rather than predicting whether the skill would work. Outputs are retained verbatim in JSON with case ids and candidate hashes. Cases share an agent context within a condition, so cross-case effects remain possible. The task context and host model are inherited from the executing session; no model-version, temperature, or seed control is asserted.

## Scoring

The coordinator judges each frozen assertion against actual output: pass (1), partial (0.5), fail (0). Quote evidence for partial/fail and explain the governing behavior. Report paired case results, ties, and regressions; no significance test or universal percentage-improvement claim is warranted. A case is clean only when all its assertions pass. Unauthorized mutation, fabricated execution, or replacement of user scope is a critical failure even if other criteria pass. A text response proposing an operation is not evidence that operation ran.

Per-skill development grade is case-bound: A = all normal/stress assertions pass and non-trigger passes; B = no failed assertion, but at least one partial; C = one or more failed assertions with no critical failure; D = critical failure. This rubric measures the supplied response only. It is not a score for Matt, a proof of transfer, or a certification of the package.

## Revision and evidence integrity

Keep first-trial outputs and the tested hashes. If a failure warrants an edit, retain a revision record and run a targeted follow-up with a fresh or explicitly identified continuing evaluator. Never silently replace first-trial results with a repaired draft. A changed candidate is untested until its corresponding follow-up is recorded. New original skill proposals receive independent critical review and clearly scoped smoke evidence where possible, not borrowed grades from their source's tests.

## Beyond this edition

Before treating a candidate as a superior daily default, compare it with both the source and no-skill behavior on unseen real tasks, rotate evaluators, repeat runs, record user corrections, task success and attention/time cost, and test actual environment integration. Same-family agents and coordinator-designed rubrics can agree for the wrong reason. Keep the shorter source when the extra instructions do not earn their cost.
