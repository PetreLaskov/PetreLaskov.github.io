---
name: claude-handoff
description: "Continue authorized work in a fresh background Claude session using a concise handoff grounded in durable artifacts."
---

# Claude Handoff

Transfer the explicitly requested continuation to a fresh background Claude agent. Use the user's stated next focus; otherwise preserve the current unfinished objective.

Inspect current working directory, branch or revision, uncommitted changes relevant to the task, and any active ownership. Write a concise handoff containing the objective, current state, authoritative artifact pointers, important failed approaches, next useful action, and boundaries of already authorized work. Include suggested available skills. Reference existing artifacts rather than copying them. Exclude secrets and unnecessary personal information.

Verify the installed runtime supports the intended background launch. Use its supported prompt transport with proper shell quoting or argument passing; never interpolate arbitrary summary text into a shell command. Give the job a descriptive name. In another host, use a native equivalent only if it actually supports the same authorized continuation; do not silently create a separate user-owned chat or switch provider.

Tell the successor to verify the current artifacts and working state before editing. Name any files still owned by another worker. Once launch succeeds, stop competing work on the transferred unit.

Inspect the launch result. Report the job identifier or usable link, its directory and focus, and how the user can manage it. Do not claim the successor is running without a successful receipt. If launch is unsupported or fails, save or present the handoff and state that continuation has not started. Do not repeatedly retry an uncertain launch and risk duplicate agents.
