# Issue tracker: Local Markdown

One feature/effort per .scratch/<slug>/ directory. The spec is spec.md. Tickets are separate files in issues/<NN>-<slug>.md, numbered blockers-first. Never combine all tickets in one shared file.

Resolve IDs within an explicit feature/effort; a bare 03 is ambiguous across directories. Each ticket records title, category where relevant, Status, Blocked by stable ticket IDs/paths, behavior/decision, and acceptance criteria. Append discussion under Comments.

Implementation work uses readiness plus completion evidence: a ready-for-agent ticket may still have blockers; a completed ticket records the verified result. Document the exact terminal status used here so frontier queries agree with implement.

Wayfinding work uses map.md and decision-ticket files. Type identifies research/prototype/grilling/task. Claim records owner and claimed status before work. Resolve appends Answer, marks resolved, and adds a gist and link to Decisions-so-far in the map.

Frontier: open, unclaimed tickets whose actual blockers are complete under their workflow's terminal status. Parent membership alone is not blocking. Preserve one authoritative acceptance list rather than duplicating it inside comments.
