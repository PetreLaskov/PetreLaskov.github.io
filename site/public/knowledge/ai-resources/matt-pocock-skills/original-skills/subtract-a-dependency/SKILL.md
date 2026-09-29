---
name: subtract-a-dependency
description: Explore removing a dependency, abstraction, workflow step, or redundant data copy while preserving required outcomes. Use when accumulated maintenance cost may exceed the capability it buys.
---

# Subtract a Dependency

Treat deletion as a design option, not a virtue by itself.

1. Select one dependency or obligation within the user's scope. Identify what it supplies, its consumers, and costs of maintaining it.
2. Name the required outcomes and less-visible obligations: runtime behavior, operational recovery, compatibility, ownership, and any relevant legal contract.
3. Propose the smallest subtraction: remove, inline, consolidate, or use an already-owned capability. Do not replace it with a larger new system merely to claim deletion.
4. Rehearse representative consumers and failure recovery without it. Where feasible, make a reversible isolated experiment and run meaningful checks.
5. Compare obligations before and after. Include migration cost and what becomes the new owner's responsibility.
6. Recommend remove, simplify, or keep with a concrete reason. Implement only within the authorized task.

A dependency that concentrates essential policy may earn its cost even when its code is tiny. Success is lower total obligation at preserved required behavior, not fewer packages or lines alone.
