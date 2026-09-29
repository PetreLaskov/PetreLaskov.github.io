---
name: domain-modeling
description: Sharpen project terminology and conceptual boundaries, maintain CONTEXT.md, and record qualifying architecture decisions.
---
# Domain modeling

Use for changing the model, not merely reading existing vocabulary.

Find the relevant CONTEXT.md through CONTEXT-MAP.md when present; otherwise use the root glossary. Read applicable ADRs and established documentation conventions. Follow known relevant decision references when they bear on the topic.

Challenge ambiguity that changes meaning, ownership, identity, or behavior. Propose precise terms and test relationships with concrete scenarios. When code and a user statement disagree, distinguish current behavior from intended behavior and resolve the mismatch with the user; do not assume either is automatically correct.

Capture a resolved term inline using [CONTEXT-FORMAT.md](CONTEXT-FORMAT.md). CONTEXT.md remains a glossary: no implementation plan, general programming dictionary, or running session notes. Create it only when there is a resolved term.

Offer an ADR only when the choice is all three: hard to reverse, surprising without context, and a real tradeoff. Use existing project conventions; otherwise use [ADR-FORMAT.md](ADR-FORMAT.md). Respect already established authorization to record decisions. A session with no qualifying ADR needs none.

Report unresolved conceptual conflicts rather than writing a polished definition that hides them.
