---
name: setup-ts-deep-modules
description: "Add dependency-cruiser rules for flat TypeScript package boundaries and verify allowed and forbidden imports across every importer root."
---

# Setup TS Deep Modules

Enforce a chosen flat-package convention: root files are public entrypoints; all package subfolders are private. Preserve multiple small entrypoints rather than a barrel that reexports everything. Tests use public entrypoints and their own fixtures. Same-package implementation may use its internals.

Inspect package manager, actual package layout, existing dependency-cruiser configuration, TypeScript resolution, and all importer roots. Use this convention only when it fits the requested architecture; surface a material mismatch instead of silently reorganizing the repository. Confirm whether cycle prohibition and public-only tests belong in scope.

Use [dependency-cruiser.config.cjs](dependency-cruiser.config.cjs) as an inspected template, not a universally correct drop-in. It contains five forbidden rules implementing the boundary and test-privacy policy. Adapt PACKAGES_ROOT, escape it if needed in regexes, and adapt tsconfig and resolution options. Preserve group matching that allows same-package access. Merge existing settings instead of replacing them.

Install through the repository's package manager and add a boundary-check command covering every relevant importer root, including app code outside packages. Wire it into the existing check/CI path without overwriting scripts or changing aliases unnecessarily.

Verify in isolated fixtures or a suitable representative package: allowed public imports and own implementation imports pass; app and cross-package deep imports fail; tests cannot import implementation or another package's fixtures; own fixtures pass; a cycle fails if cycle checking is in scope. Restore clean state and rerun. Inspect named violations so a resolver error is not mistaken for boundary enforcement.

Do not claim enforcement without these observed results. Document the convention beside its packages and add a short pointer from existing agent guidance. Add a permanent example only when useful and within scope. Report actual coverage, adaptations, unresolved violations, and checks run. Structural enforcement does not itself prove a deep or well-designed API.
