---
name: to-tickets
description: Turn an agreed multi-session plan into the fewest useful tracer-bullet tickets with testable outcomes and true blocking edges, then publish the approved breakdown.
---

# To Tickets

Split only when the work benefits from separate sessions or owners. A small coherent change needs no ticket graph.

Read the full supplied spec, issue body/comments, or accepted conversation plan. Use current domain terms and relevant ADRs. Explore enough code to understand existing interfaces and real dependencies.

## Draft useful units

Each ordinary ticket delivers a narrow complete path through the relevant layers and is independently demoable/verifiable. State:
- what behavior it delivers;
- a demo or verification path;
- acceptance criteria and the observation that could disprove each;
- blockers that genuinely prevent starting;
- agreed test seams, scope exclusions, and parent/source reference.

New behavior needs a distinguishing observation; preserved compatibility can legitimately already pass. Do not assign a criterion to a ticket that cannot own making it true.

Use behavioral contracts and stable concepts. Locator hints may be included as non-normative evidence pinned to the inspected state; do not require edits at stale line numbers. Preserve decision-rich prototype snippets when prose would lose the decision.

Prefactor first only when it concretely makes the planned change easier.

## Wide refactors

For a mechanical change that cannot land as green vertical slices, use expand, bounded migration batches, then contract blocked by every batch. If batches require an integration branch, state that explicitly and make a final integrate-and-verify ticket own the green result.

## Review the graph

Check missing edges, cycles, false dependencies, scope overlap, and excessive fragmentation. Parent membership is not blocking. Present numbered titles, delivery/demo, and blockers; resolve granularity and edge decisions before publishing, reusing existing approval.

## Publish and verify

Use configured tracker instructions. Local mode: one file per ticket in .scratch/<feature>/issues/<NN>-<slug>.md, blockers-first. Remote mode: one issue each, preserve parent links separately from native blocker links; use explicit text fallback only where native blocking is unavailable. Apply configured readiness role, but readiness does not override blockers.

Record created IDs, read back bodies and relations, and resume partial publication from known IDs rather than duplicating issues. Do not close or modify the parent issue. Report the frontier and published artifacts; do not dispatch implementation unless separately requested.
