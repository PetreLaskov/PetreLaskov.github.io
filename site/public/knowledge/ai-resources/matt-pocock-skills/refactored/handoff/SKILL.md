---
name: handoff
description: Write a targeted portable handoff when current work must continue in another session, environment, directory, or agent.
---
# Handoff

Write for the next task, using the user's stated focus when supplied. Keep the live goal, action-relevant constraints, current state, unresolved decisions, and next useful move.

Distinguish verified outcomes from beliefs, completed work from planned work, and user decisions from proposals where the distinction affects continuation. Preserve the reason behind a non-obvious constraint.

Reference existing specs, plans, ADRs, issues, commits, and diffs instead of copying them. Make paths resolvable from the destination; verify available local references and flag ones the recipient may not access. Include a suggested-skills section with each capability's purpose; do not assume a particular invocation tool.

Redact secrets and unnecessary personal information. Retain only nonsecret context needed for the authorized task.

Save in the actual operating system temporary directory, outside the workspace, unless the user specified another destination. Report the exact path and that temporary storage is not durable. Do not silently move or publish referenced artifacts.

Read the document as a fresh receiver: can it choose the correct first action without mistaking a proposal for authorization or an unverified claim for a result? Deliver the path and any missing prerequisite.
