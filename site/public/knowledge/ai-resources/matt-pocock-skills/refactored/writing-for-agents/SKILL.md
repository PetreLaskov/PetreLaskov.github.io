---
name: writing-for-agents
description: Write and review documents that control agent behavior, especially skills and repository instructions; improve routing, completion criteria, and brevity without dropping obligations.
---
# Writing for agents

Optimize for a capable agent taking the right actions, not for sounding comprehensive.

Identify the task class, important decisions, outputs, and non-obvious constraints. Preserve user choices and real failure-preventing exceptions. Separate ordered actions from reference.

## Place information
- A context pointer names a reference and the concrete condition for reading it. Use one trigger per distinct branch.
- Keep common obligations in the entrypoint. Disclose substantial branch-specific material behind clear pointers.
- Co-locate a concept's definition, rules, and exceptions.
- Keep each meaning authoritative in one place. A cheap environment lookup usually beats a cached command or configuration value.
- Split a sequence only when the boundary solves an actual attention or ownership problem. A second file loaded in the same context does not hide later steps.

Account for both costs: always-visible instructions consume context; instructions humans must remember consume human attention. For skills, read [SKILL-MECHANICS.md](SKILL-MECHANICS.md).

## Make done observable
State what must be true at completion, including coverage where completeness matters. Sharpen an ambiguous criterion before adding steps. Distinguish completed work, unresolved decisions, and external prerequisites.

## Prune behaviorally
Ask what action changes without each sentence. Delete true no-ops and stale material; preserve rare-case rules that protect real invariants. Prefer precise words over repeated exposition, but retain conditions a slogan would blur. Positive instructions often clarify the target; clear prohibitions remain appropriate for real boundaries.

For a substantial rewrite, compare representative requests, a known failure case, and a nearby request that should not trigger the skill. Inspect behavior and artifacts, not matching headings. Use independent trials when stakes and resources justify them. One successful run cannot prove a line redundant.

Deliver the document and material semantic changes. Report trials actually run; label untested improvements as hypotheses.
