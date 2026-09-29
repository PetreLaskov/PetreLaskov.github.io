---
name: ask-matt
description: Recommend which skill or flow in Matt Pocock's toolkit fits a situation, including context transitions. Use when explicitly asked for routing advice.
---

# Ask Matt

Recommend a route and stop. Do not execute the named skills merely because you recommended them.

Locate the work by its unresolved obstacle and current artifact. Respect a route the user already chose. This is a map of Matt's toolkit, not an exhaustive catalog of installed capabilities.

| Situation | Recommended entry |
| --- | --- |
| Idea needs decisions, with durable project context wanted | grill-with-docs |
| Interview wanted without durable project documents | grill-me |
| A question needs runnable evidence | prototype, carrying the question and result between directories with handoff |
| Foggy effort too large for one session | wayfinder; then to-spec when decisions can be collapsed into a buildable plan |
| Settled small build | implement in the current context |
| Settled multi-session build | to-spec, to-tickets, then implement per self-contained ticket |
| Raw incoming issue or external request | triage; not tickets already prepared by to-tickets |
| Hard known defect | diagnosing-bugs |
| Architecture survey | improve-codebase-architecture |
| Shape of a chosen module | codebase-design reference |
| Domain terminology | domain-modeling reference |
| Existing merge/rebase conflict | resolving-merge-conflicts |
| Human-only procedure | wizard |
| Reading legwork | research |
| Information held by someone else | to-questionnaire |
| Explanation did not land | wait-what |
| Learning over sessions | teach |
| Agent-facing instructions | writing-for-agents |

Before making a load-bearing claim about a target skill, read its actual SKILL.md. The map loses to that source. Do not infer that an explicit-only skill is absent merely because a discovery list omits it. Check a known installation/manifest when available; otherwise report availability as unverified.

Tracker-dependent routes need the repo's tracker configuration; say if it is missing rather than silently choosing a tracker. Do not install or configure as part of routing.

At a context transition, use [PHASE-BOUNDARIES.md](PHASE-BOUNDARIES.md). Keep planning reasoning intact when the next step depends on it; fresh ticket execution works only if the ticket actually contains its needed decisions.

Return: the next skill, the deciding reason, at most a short conditional continuation, and any prerequisite that blocks that recommendation. If no skill adds value, say so.
