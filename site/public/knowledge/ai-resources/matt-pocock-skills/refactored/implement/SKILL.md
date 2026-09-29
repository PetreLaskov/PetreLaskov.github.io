---
name: implement
description: Build already-agreed work from a specific ticket, spec, or conversation plan, verify it, review the actual change, and finish the agreed local delivery.
---

# Implement

Execute the settled contract; do not reopen design choices on preference.

Resolve the exact ticket/spec or accepted conversation plan. State its identity and intended result. Read relevant repo instructions, agreed test seams, and blockers. Check current branch/worktree and unrelated changes. Do not guess what a bare number refers to.

If the contract conflicts with observed code or an unfinished dependency, surface the concrete conflict and resolve only the necessary decision. Otherwise proceed.

Build one bounded piece of work using TDD where it protects meaningful behavior, at already-agreed seams. Reuse prior agreement rather than asking again. When a seam is genuinely undecided, recommend it with what it catches and misses before testing there.

Run focused tests and typechecks as useful during implementation, then the required broader checks once at the end. Do not invent low-value tests for mechanical changes merely to perform a ritual.

Review the actual task-owned patch, including uncommitted changes, against its spec and repository standards. Use code-review when available; ensure its pinned scope includes the new work. Resolve supported material findings within scope and rerun affected checks. Do not chase cosmetic suggestions indefinitely.

Commit task-owned changes to the intended current branch unless the user chose another delivery mode. Inspect staged content; preserve unrelated user work. Do not amend another task's commit or operate competing writers through one shared index.

Reconcile acceptance criteria with evidence. Update the work item when its completion is part of the authorized workflow; otherwise report the precise pending update. Finish with the result, checks, commit if made, and any unmet criterion or required human step. Do not imply deployment or external publication occurred.
