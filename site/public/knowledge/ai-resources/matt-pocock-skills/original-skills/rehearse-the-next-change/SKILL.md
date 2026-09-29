---
name: rehearse-the-next-change
description: Compare software designs by rehearsing concrete likely changes and caller examples before implementing. Use when architectural alternatives look plausible but their practical costs are unclear.
---

# Rehearse the Next Change

Evaluate a proposed structure by the changes it makes easier or harder.

1. Read the selected design decision, actual callers, and relevant roadmap or defect history.
2. Choose a small set of discriminating scenarios: one likely change, one plausible adverse change, and a representative caller. Label speculative scenarios and give them less weight.
3. For each candidate, sketch the edits each scenario requires: changed contracts, touched responsibilities, duplicated knowledge, migration, and verification. Use enough concrete code or types to expose obligations; do not build full alternatives.
4. Compare where knowledge must move. Fewer edited files is not automatically better; distinguish concentrated responsibility from a monolith and broad mechanical edits from scattered policy.
5. Recommend a design with the strongest fit to the grounded scenarios. State what future fact would reverse the recommendation.
6. Stop with the decision and a short rationale. Do not implement unless asked.

If all scenarios favor the same design trivially, seek a more discriminating real scenario or acknowledge that the comparison adds little. Do not manufacture improbable futures to justify flexibility.
