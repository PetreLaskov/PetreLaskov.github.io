---
name: tdd
description: Build defined behavior through small observed red-green slices at agreed public seams, using independent test expectations. Use for meaningful test-first work, not automatic tests for every edit.
---

# TDD

Before adding a test, identify behavior and an independent oracle. For mechanical wiring, formatting, or type-only changes, use the meaningful type/build/manual check instead of a test that restates the code.

Read existing domain terms and decisions. Reuse seams already agreed in the spec or conversation. For an undecided seam, recommend one and explain what it catches, what it misses, and its feedback cost; confirm consequential choices before writing tests there.

A seam is the interface at which callers observe behavior. Prefer the lowest-cost seam that still includes the interaction being protected. Consult codebase-design when interface shape itself is unresolved; do not launch a redesign merely to write tests.

## One behavioral slice

1. Select one observable capability and expected result from the spec, a worked example, known literal, or independent property.
2. Write the test through the agreed seam. Use [tests.md](tests.md) and, when substituting I/O, [mocking.md](mocking.md).
3. Run it and observe failure for the intended missing/wrong behavior. A broken harness is not the desired red. If already green, investigate existing behavior or an insensitive assertion.
4. Implement only enough to satisfy this slice and run it green.
5. Continue with the next behavior informed by this result. Avoid bulk imagined tests followed by bulk implementation.

Keep broad structural redesign in deliberate review. Small necessary behavior-preserving cleanup under green tests is permitted; do not use it to expand the feature.

Tests should survive internal rewrites. Avoid internal mocks, private-method assertions, and expected values computed by the same logic as the implementation. One logical behavior can require multiple assertions. Record meaningful red/green evidence rather than claiming test-first from file order alone.
