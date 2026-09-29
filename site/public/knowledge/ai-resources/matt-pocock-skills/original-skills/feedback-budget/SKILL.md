---
name: feedback-budget
description: "Place engineering checks at the right workflow moments by balancing defect detection, feedback delay, reliability, and developer effort."
---

# Feedback Budget

Use when checks are too slow, too late, routinely bypassed, or scattered across a repository. Inventory the checks that already exist before proposing new tools. For each consequential check, identify the defect class, scope, typical duration, determinism, and external dependencies. Measure representative runs when feasible; label estimates.

Map each check to the decision it should influence: editing, committing, publishing a branch, merging, or maintaining a deployed system. A check is useful when its result arrives early enough to change that decision. Do not optimize latency by dropping coverage without naming the resulting risk.

Choose a minimal placement plan across existing surfaces such as editor, local command, pre-commit, pre-push, CI, or scheduled runs. Keep fast, reliable, broadly relevant signals close to editing. Route expensive or conditional checks according to affected behavior, using existing task-graph or incremental tooling when available.

Identify one high-value change: wire an omitted check, remove duplicate work, eliminate watch mode, cache a stable result, or move an expensive check to a better point. Preserve mandatory policy and do not introduce a new toolchain merely to make the map elegant.

When authorized, implement the smallest change and verify both failure visibility and continued coverage. Report measured before/after feedback time when available, the defect signal improved, and any tradeoff. Keep the resulting map short enough to maintain. Revisit it when real bypasses, delays, or missed defects contradict the design.
