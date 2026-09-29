---
name: fixture-truth
description: "Audit a test fixture and assertion together to find defaults, omissions, or mocks that let the test pass for the wrong reason."
---

# Fixture Truth

Use when an important test may be misleading, overmocked, or hard to understand. Choose a concrete test and state the behavior its name and assertion claim to verify. Read the exercised code path and the fixture or mock setup together.

Identify which inputs and conditions actually cause the observed result. Separate essential values from irrelevant noise, hidden defaults, omitted properties, and behavior replaced by mocks. Ask whether a plausible defect could leave the test passing because the fixture bypasses the relevant path.

Construct one focused counterexample or mutation that should make the test fail if its claim is real. Keep it isolated and reversible. Do not broaden a unit test into an entire production simulation merely to make the data look realistic.

Repair the smallest mismatch: expose an important value, remove a misleading default, move the mock boundary, make the assertion observe the real consequence, or narrow the test's stated claim. Preserve useful incompleteness when omitted data is genuinely irrelevant. A complete fixture is not automatically a truthful fixture.

Run the affected test and the counterexample when feasible. Report what the revised test now detects, what it intentionally does not cover, and the actual execution evidence. If execution is unavailable, label the proposed counterexample as unrun. Avoid measuring success by fixture size or the disappearance of type assertions alone.
