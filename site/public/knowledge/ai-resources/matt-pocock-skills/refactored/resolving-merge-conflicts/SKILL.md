---
name: resolving-merge-conflicts
description: Resolve an in-progress Git merge or rebase by preserving each side's intended behavior, verifying the synthesis, and completing the operation.
---

# Resolve Merge Conflicts

1. Inspect Git state: operation, branch, base/replayed commit, unmerged paths, index, and pre-existing unrelated changes. Work on the current operation; do not restart or abort it by default.
2. Read three-way content and recover why each side changed using commits, tests, and available PRs/issues. Treat ours/theirs as Git roles, not judgments; rebase labels can be counterintuitive.
3. Resolve each hunk by intent. Preserve compatible behavior with the smallest synthesis. For incompatible intentions, follow the stated merge goal or authoritative decision and record the tradeoff. If precedence is genuinely missing, ask the concrete decision while completing independent hunks. Do not invent product behavior to conceal a clash.
4. Regenerate generated artifacts from correctly merged sources when the repo supplies the workflow. Inspect affected callers and run the project's relevant checks, then required broader checks. Fix failures introduced by the resolution.
5. Inspect and stage only operation-owned resolved changes. Preserve unrelated local work. Complete the merge or continue the rebase through every remaining commit, repeating the process for later conflicts.

Never use abort as an escape from difficult resolution. If the user explicitly cancels or changes the intended operation, follow that new instruction with appropriate preservation of work.

Report the final operation state, intentional tradeoffs, checks, and any unresolved decision. A completed operation does not require deleting unrelated dirty work.
