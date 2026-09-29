---
name: code-review
description: Review an explicitly scoped branch, PR, or working change against repository standards and its originating specification, with separate evidence-backed reports.
---

# Code Review

Keep two axes separate: Standards and Spec. This is not an exhaustive bug hunt or permission to edit the change.

## Pin the reviewed object

Resolve the supplied base to a commit. If none was supplied, use an already agreed review base or ask. Pin the target commit and merge-base for branch review; report the actual comparison.

For working changes, include the intended staged, unstaged, and relevant untracked files in a read-only snapshot/patch without making an unsolicited commit. Do not use base...HEAD and claim it includes uncommitted work. Exclude unrelated user edits explicitly. Both reviewers must see identical pinned bytes. Reject a bad ref; report an empty scope before delegation.

## Find the contracts

Use the user's explicitly identified spec first; otherwise follow issue references in commits through configured tracker instructions, then likely local specs. Resolve competing contracts rather than choosing whichever matches the code. Without a spec, report Spec unavailable; do not infer one from the implementation. A local spec does not require tracker setup.

Read documented repository standards. For non-tool-enforced design concerns, use [SMELLS.md](SMELLS.md). Repository rules override these heuristics.

## Review independently

When available, run two leaf reviewers with the same pinned scope and minimum source context:
- Standards: cite each violated documented rule and changed location; label smell judgments and explain actual friction.
- Spec: cite the requirement for missing/partial behavior, wrong implementation, or scope creep.

Tell each: perform this axis directly; do not invoke code-review or spawn further agents. Return concise findings with evidence, consequence, and uncertainty. Do not manufacture findings. If delegation is unavailable, perform separate passes and disclose the fallback.

## Verify and report

Check proposed findings against their source and the actual code. Drop unsupported claims; preserve uncertainty where needed. Verification is not merging or reranking axes.

Report separate Standards and Spec blocks, exact scope, unavailable evidence, counts, and worst issue within each axis. No blended grade. A no-findings report states what was checked, not universal correctness. Stop; only fix findings when the user authorized changes.
