# Deepening given dependencies

Classify each consequential dependency:
1. In-process computation/state: exercise the combined behavior directly.
2. Local-substitutable I/O: prefer a real local service or faithful stand-in. Identify semantics the substitute does not cover.
3. Owned remote service: put stable domain behavior in the module; use a port for meaningful transport variation, with production and test adapters.
4. External service: inject the boundary operation and use a controlled adapter; separately verify the external contract when relevant.

Keep internal seams private unless callers need them. Prefer returning explicit outcomes when it simplifies observation; do not pretend commands with real side effects are pure.

Test migration is replacement by behavior, not automatic deletion. Map the old tests' important invariants to new interface checks. Delete duplicated implementation-coupled tests once that protection exists. Keep valuable diagnostic or algorithm tests whose stable contract remains. Demonstrate caller behavior before and after the deepening.
