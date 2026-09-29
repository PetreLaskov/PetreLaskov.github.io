---
name: codebase-design
description: Use a shared vocabulary to reason about a chosen module's interface, hidden complexity, test seam, and caller leverage. Reference for design tasks, not an autonomous codebase redesign.
---

# Codebase Design

Use this reference inside the user's requested scope. Invoking it alone does not authorize exploration, parallel design, or code changes.

## Vocabulary

- Module: something with an interface and implementation, from function to package or larger slice.
- Interface: everything callers must know: operations, values, invariants, order, errors, configuration, and relevant performance.
- Implementation: the mechanism hidden behind that interface.
- Depth: useful behavior per amount of interface knowledge. Not a ratio of code lines.
- Seam: a place behavior can vary without editing callers at that location.
- Adapter: a concrete implementation filling a role at a seam.
- Leverage: capability callers gain from learning one interface.
- Locality: related change, knowledge, faults, and verification concentrate in one place.

Use these distinctions consistently while retaining precise project and technology terms. Do not rename a real protocol or deployed service just to police vocabulary.

## Design tests

The deletion test: if removing a module eliminates needless indirection, it may be shallow. If its knowledge reappears across callers, it earns its keep.

Judge the total caller obligation, not method count. One method with hidden ordering and many modes may expose a large interface. Hide stable mechanism; leave consequential caller choices explicit.

Prefer behavioral tests through the interface callers use. Internal diagnostic tests can be useful if they protect a stable contract; do not expose internals merely to satisfy tests.

A production and test adapter can justify a seam when they vary meaningfully. A second adapter is evidence, not a quota; explain a single-implementation seam by an actual policy, ownership, or substitution need.

For deepening a selected cluster, read [DEEPENING.md](DEEPENING.md). For an explicit request to compare interfaces, read [DESIGN-IT-TWICE.md](DESIGN-IT-TWICE.md). Stop after the requested explanation or design decision unless implementation was authorized.
