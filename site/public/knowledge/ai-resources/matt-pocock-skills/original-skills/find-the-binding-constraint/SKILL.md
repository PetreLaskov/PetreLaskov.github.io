---
name: find-the-binding-constraint
description: Identify the concrete obstacle preventing progress and choose a small action that resolves it. Use when work is circling, methods keep changing, or the next useful move is unclear.
---

# Find the Binding Constraint

Produce a next action that changes the situation, not another general plan.

1. State the desired observable result using the user's current scope.
2. Name the present obstacle. Distinguish missing fact, unresolved choice, unavailable access, oversized task, implementation failure, and coordination conflict. These are hypotheses, not mandatory categories.
3. Check conversation and available artifacts for evidence the obstacle is already resolved. Do not ask the user to repeat known information.
4. If several obstacles seem plausible, choose the cheapest observation that distinguishes them. State what each possible result would imply for the next action.
5. Perform a bounded authorized check when possible. If the next move is a consequential user choice, present the concrete alternatives and your recommendation. If access is missing, specify the minimum missing input.
6. Update the obstacle once from the observed result. Stop with the executable next action or resume the user's task if that was already authorized.

Use no permanent tracker for a short intervention. If the check would consume more effort than simply doing the requested work, proceed with the work instead.

Example: repeated revisions of an import feature could mean an unsettled input format or a broken parser. Read one actual sample first. A sample resolving the format makes parsing the next task; incompatible samples make a format decision the blocker.

Success means the selected action removed the stated obstacle or ruled it out. A more elegant description of the same stalemate is not success.
