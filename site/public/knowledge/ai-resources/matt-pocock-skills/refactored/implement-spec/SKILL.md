---
name: implement-spec
description: "Implement a ticketed specification on one integration branch by scheduling ready work and validating each integrated dependency."
---

# Implement Spec

Deliver the ticketed specification as one integrated branch and reviewable PR. Read the spec, tickets, repository guidance, and current work before scheduling. Resolve missing acceptance criteria or dependency cycles that prevent useful work; do not silently redesign the spec.

Maintain a compact task graph with dependencies, acceptance target, ownership, state, and integrated revision. A ticket is ready only when its blocking dependencies are integrated and their relevant checks pass. Track shared-file or unstable-interface conflicts even when tickets have no declared edge.

Create the integration branch and draft PR through available authorized tools. Link the actual spec and tickets; use closing references only for work this PR will fully deliver. If external creation is unavailable, retain the branch and report the limitation accurately.

Dispatch independent ready tickets up to available capacity. Each implementer uses an isolated worktree and branch based on the current integration revision. Send context pointers, acceptance criteria, owned scope, and expected validation. Use shared research notes when exploration genuinely repeats across tickets.

Integrate completed work serially. Review the diff and evidence, merge or reconcile it, then run the checks needed to establish the changed contract on the integration branch. Only then unlock dependents. Failed integration returns the ticket to active work; a worker's completion report alone is insufficient.

When all tickets integrate, verify the whole spec, including interactions omitted by individual ticket tests. Run the available code-review workflow, assess findings for validity and scope, fix actionable defects, and recheck affected behavior. Mark the PR ready only when required checks pass or any remaining limitation is explicitly disclosed.

Retire worker checkouts only after their work is accounted for and no agent or process needs them. Use the host's managed lifecycle tools when available. Report the integrated result, validation, and remaining risks without equating ticket count with completion.
