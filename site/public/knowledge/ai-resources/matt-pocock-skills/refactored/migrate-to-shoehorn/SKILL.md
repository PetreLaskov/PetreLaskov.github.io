---
name: migrate-to-shoehorn
description: "Replace suitable TypeScript test assertions with intention-specific Shoehorn helpers while preserving fixture semantics and test coverage."
---

# Migrate to Shoehorn

Migrate suitable TypeScript test fixtures to @total-typescript/shoehorn while preserving what each test proves. Keep helpers out of production code. Inspect the repository package manager, test patterns, existing fixture helpers, and installed or intended package API before editing.

Find candidate assertions with a broad search, then classify them by intent. Do not mechanically replace every `as`: const assertions, narrowing, complete fixtures, and unrelated mock typing can need different treatment.

- Use fromPartial for intentionally incomplete fixtures whose supplied values should conform to the target type.
- Use fromAny only for deliberately invalid input that the test actually checks.
- Keep complete fixtures complete; consider fromExact only when its locally verified API serves that intent.

These helpers do not fill missing runtime properties or make invalid data safe. Read enough of the exercised behavior to know which omissions matter. Prefer repairing an accidental malformed mock over disguising it as intentional invalid input.

Add the dependency through the repository's package manager in the test/development scope appropriate to its conventions. Preserve lockfile and workspace patterns. Migrate a representative file first, retaining useful explicit types where inference would obscure the test.

Run the relevant tests and type checking. Verify that the assertion still observes the intended success or failure path and that imports remain test-only. Expand the migration only after the representative case works. Report changed patterns, deliberately retained assertions, and actual validation. Do not claim stronger runtime safety from a shorter type escape hatch.
