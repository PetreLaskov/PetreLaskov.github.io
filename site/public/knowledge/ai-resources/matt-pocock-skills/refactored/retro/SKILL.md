---
name: retro
description: "Review an actual coding session and recommend targeted improvements to navigation, checks, instructions, and information access."
---

# Retro

Review the specified coding session, or the current one, to recommend improvements to the agent's working environment. Read primary session material and the relevant repository configuration. State meaningful gaps in log coverage. Do not infer stable behavior from an isolated anecdote without qualification.

Look for costly navigation, missed mechanical errors, unclear judgment standards, overloaded instructions, expensive tool patterns, no-op guidance, and unavailable information. Use these as lenses, not mandatory report categories.

For each serious candidate, connect the observed event to a plausible mechanism and the smallest intervention that would change the next occurrence. Inspect existing scripts, checks, and CI before proposing new tooling. An unwired or broken existing check is different from a missing capability.

Prefer deterministic enforcement for stable mechanical patterns when its maintenance cost is justified. Use concise guidance and examples for judgment calls. Put guidance where it is needed, including implementation when avoiding the error requires prior knowledge; do not assume review can repair every bad decision cheaply. Keep always-loaded instructions sparse and use navigation pointers to existing material.

Rank only actionable candidates by consequence and recurrence, including the cost or downside of each. For each, state how a later session would show that the intervention helped. Include removal or narrowing of obsolete guidance when appropriate. It is acceptable to recommend no change.

A request for retrospective analysis does not itself authorize global configuration changes or new external access. Prepare concrete patches where useful and apply only changes authorized by the surrounding task. Distinguish proposed, applied, and behaviorally verified improvements. End with the strongest few interventions rather than a catalog of generic best practices.
