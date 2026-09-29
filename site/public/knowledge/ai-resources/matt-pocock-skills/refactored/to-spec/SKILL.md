---
name: to-spec
description: Synthesize settled conversation and repository decisions into a specification and publish it to the configured issue tracker.
---
# To spec

Synthesize; do not start a new requirements interview. Read relevant repository state, domain vocabulary, ADRs, supplied decision artifacts, and narrowly related tracker work. Preserve exact agreed values, exclusions, ordering, and status. Mark gaps instead of deciding them to fill a template.

Sketch testing seams before finalizing. Reuse agreed seams; check genuinely new ones with the user. Prefer existing high-level interfaces that reliably expose required behavior. Justify additional seams when one boundary cannot cover it well.

Write:
- Problem and solution from the affected user's perspective.
- Distinct required behaviors: user stories for user-facing work, invariants and contracts for internal changes.
- Agreed implementation decisions and applicable ADR links.
- Testing decisions: observable behavior, seams, modules, and relevant prior art.
- Out of scope, unresolved points, and material further notes.

Avoid brittle file inventories and incidental snippets. A small prototype-derived reducer, state machine, schema, or type shape may be included when it expresses the decision more precisely; identify its origin.

Check that every consequential agreed requirement survived and no proposal became an agreement. Keep reviewable content bounded by the actual scope.

Use configured tracker and labels. Invocation requests publication unless the user asked for a draft or another destination. Reuse or update related work when appropriate. Apply ready-for-agent only when the spec is actually ready and the configured label does not dispatch work outside the user's authorized scope; otherwise preserve the spec without that dispatching label and explain.

If publication configuration or a required decision is missing, save a concrete local draft in the project's normal location and report the exact prerequisite. Do not call an unpublished draft published or an unresolved spec ready. Return the artifact link and material open points.
