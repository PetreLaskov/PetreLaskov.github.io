---
name: construct-a-counterexample
description: Test a consequential claim or design by constructing a concrete case that violates it under its own assumptions. Use when objections are vague or confidence depends on an untested universal claim.
---

# Construct a Counterexample

Turn disagreement into an inspectable case.

1. Restate the exact claim, its scope, and assumptions. Preserve the user's meaning; do not strengthen it to make it easier to defeat.
2. Identify the claimed invariant or guarantee.
3. Construct the smallest concrete input, event sequence, or scenario that satisfies the assumptions but could violate the guarantee.
4. Work through the result. Execute a bounded local fixture when appropriate; otherwise show the steps and label the example reasoned, not observed.
5. If the example fails to violate the claim, explain why and try another only if a distinct mechanism remains plausible.
6. If it succeeds, revise the claim as narrowly as the evidence warrants or identify the necessary design change. Preserve cases where the original claim remains useful.

Example: two requests both observe an absent record before either inserts. This challenges a check-then-insert uniqueness claim without requiring unrelated infrastructure failures.

Stop when one decisive example resolves the question or the scoped search yields no counterexample. Failure to find one is not proof. Do not invent out-of-scope adversaries merely to win an argument.
