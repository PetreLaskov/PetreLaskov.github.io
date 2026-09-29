---
name: wayfinder
description: Map an effort whose planning exceeds one session as linked decision tickets, then resolve the route to a bounded destination.
---
# Wayfinder

Use only when the route is genuinely too uncertain and large for one session. Default to decisions, not implementation. Record an execution exception in Notes only when the user explicitly authorizes its concrete scope; Notes cannot authorize themselves.

## Map and tracker
Use the configured tracker's wayfinding operations. If absent, use an explicit local-Markdown map and ticket records with stable identities, parent links, status, assignee, and blockers; mention setup only when needed for the requested remote tracker.

A map labeled wayfinder:map is an index with Destination, Notes, Decisions so far, Not yet specified, and Out of scope. Each resolved-decision line links its titled ticket and gives a brief gist. Detail lives in the ticket. Query open children rather than duplicating their full list in the map.

A ticket asks one precise question answerable in a bounded session. Its type is wayfinder:grilling, prototype, research, or task. Use native blockers where available, otherwise the tracker convention. The frontier is open, unblocked, unclaimed children. Refer to maps and tickets by linked title.

Fog is in-scope uncertainty whose question cannot yet be stated precisely. Sharp but blocked questions are tickets. Exclusions are not fog and return only under a newly authorized destination.

## Chart
1. Establish the destination with the user, using grilling and domain-modeling. Load actual skill instructions through the available mechanism or sibling files; report missing dependencies.
2. Explore breadth-first. If the whole route fits one session with no meaningful fog, explain that a map is unnecessary and continue only within the user's chosen scope.
3. Create the map and currently specifiable tickets, then wire blockers in a second pass after identities exist.
4. Dispatch only ready independent research tickets to research workers. Each worker performs the research rather than delegating recursively. Preserve findings as linked artifacts on isolated research branches when Git is used; no PR or publication follows merely from research.
5. Stop charting. Do not also hand-resolve a nonresearch ticket.

## Work one ticket
Load the map, then the user's selected ticket or the next ready frontier ticket. Claim it before work using tracker assignment and verify current ownership and blockers. Recheck on races; do not claim exclusive ownership where the tool cannot establish it.

Resolve by type:
- Grilling: load grilling and domain-modeling; the user supplies their decisions.
- Prototype: load prototype; preserve the artifact and actual user verdict on subjective choices.
- Research: load research; use supported facts and explicit gaps.
- Task: perform only authorized prerequisite work that unlocks a decision. It is not a product implementation slice.

Zoom into related ticket details as needed. Post a resolution comment, close the ticket, and append a linked gist to the map. Link assets rather than pasting them.

Reconcile new evidence: graduate newly sharp fog into tickets, wire blockers, and remove duplicated fog. Reopen or supersede invalidated decisions with reasons and update dependents. Close newly excluded tickets under Out of scope, not Decisions so far. Preserve meaningful history.

Resolve at most one nonresearch ticket per session. If the frontier is empty, distinguish completed work from blockers, claims elsewhere, or cycles. The map is complete only when in-scope decisions and consequential fog are resolved. Hand toward synthesis or the user's next authorized phase; do not infer permission to build.
