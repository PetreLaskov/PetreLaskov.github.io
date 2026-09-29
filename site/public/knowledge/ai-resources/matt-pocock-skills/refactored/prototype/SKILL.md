---
name: prototype
description: Build a narrow throwaway prototype to resolve a specific design question about logic, state, or UI.
---
# Prototype

Name the question and what observation would answer it. Keep the prototype small enough to settle that question; state what it cannot establish.

- Logic or state behavior: read [LOGIC.md](LOGIC.md).
- Appearance or interaction structure: read [UI.md](UI.md).

If ambiguous, use context or ask only when the branch materially changes the work. Mark an unattended assumption visibly.

Keep the artifact clearly experimental and easy to run. Use in-memory state; if persistence is the question, use a clearly marked scratch store. Add only error handling and checks needed for a runnable, trustworthy demonstration. Smoke-check the paths that answer the question; production test suites and speculative abstractions are outside prototype scope.

After each action or variant switch, surface the full relevant state so the change is inspectable. Let the user react. Recommend a direction when useful, but user preference and domain acceptance require their actual verdict.

Capture both the answer and runnable evidence. In Git, use an isolated prototype branch and a pointer from the relevant issue or decision artifact; otherwise keep a clearly marked snapshot. Follow repository branch conventions. Do not push, publish, or create a PR merely to preserve a prototype.

Promote a validated decision or pure model only within authorized implementation work, with normal production verification. The experimental shell, switcher, and losing variants stay out of production. Report the artifact, verdict or pending user choice, and consequential limits.

