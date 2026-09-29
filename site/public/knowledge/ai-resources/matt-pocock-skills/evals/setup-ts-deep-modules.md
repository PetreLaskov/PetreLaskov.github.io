# Development evaluation: setup-ts-deep-modules

**Case-bound grades:** source A; refactor A; no-supplied-skill control A.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 7/7 | 3/3 | A |

## normal: setup-ts-deep-modules-N

Propose TypeScript module-boundary enforcement: consumers may import orders/index.ts, but not orders/internal/calculate.ts. Existing dependency-cruiser config has unrelated rules. Include one valid and one violating fixture.

### Frozen criteria

1. Preserves existing config while adding scoped rule
2. Tests both allowed public import and forbidden internal import
3. Aligns rule with actual module convention rather than assuming all directories are modules

### source response

Add an error-level rule to the existing dependency-cruiser configuration; preserve its unrelated rules and resolver options. For consumers outside orders, allow imports of orders/index.ts and reject paths into orders subfolders such as orders/internal/calculate.ts. Keep legitimate internal imports within the module, and apply the public-entry policy to external tests as well.

Valid consumer fixture:
```ts
import { calculate } from "../orders/index";
```

Violating consumer fixture:
```ts
import { calculate } from "../orders/internal/calculate";
```

Adapt those exports and paths to the actual code. Wire the check into the existing check/CI command without replacing it. Verification must observe valid-pass, violating-fail, then restored-pass. No configuration or execution has occurred, so enforcement remains proposed.

**Judgment:** 3/3. 

- Criterion 1: 1. Adds an error-level rule while preserving unrelated rules/resolver options.
- Criterion 2: 1. Provides public index and internal calculate fixtures and requires valid-pass/violating-fail/restored-pass.
- Criterion 3: 1. Targets outside-orders consumers, keeps internal imports, and adapts paths/exports to actual code.

### refactor response

Merge a named boundary rule into the existing dependency-cruiser configuration; preserve unrelated rules and resolution options. Match resolved paths so app and other-package consumers can reach orders/index.ts but cannot reach orders subdirectories. Preserve same-package implementation access where the chosen policy allows it.

Valid fixture, from an external consumer:
import { createOrder } from "./orders/index";

Violating fixture:
import { calculate } from "./orders/internal/calculate";

Adapt those paths to the actual layout and make the boundary-check command scan all importer roots, including application code outside packages. Verify the first passes and the second fails with the named boundary violation, not an unresolved import error. Wire the check into existing CI. No configuration or checks have been executed.

**Judgment:** 3/3. 

- Criterion 1: 1. Merges a named rule while retaining unrelated rules/resolution options.
- Criterion 2: 1. Provides public entry and internal-path fixtures and distinguishes policy failure from unresolved-import errors.
- Criterion 3: 1. Adapts paths to actual layout and preserves internal access according to chosen module policy.

### control response

Add a targeted rule to the existing dependency-cruiser configuration; preserve its unrelated rules. For the actual source-root path, forbid dependencies from outside orders into anything inside orders except its public index.ts. Internal orders files may still depend on one another. This implements the public-entry boundary without forcing implementation files into one file.

Valid fixture, from a consumer outside orders:
import { placeOrder } from './orders/index';

Violating fixture:
import { calculate } from './orders/internal/calculate';

Run the existing boundary check against both fixtures, expecting the first to pass and the second to produce the named boundary violation. Include alias and type-only forms in further checks. Configuration syntax and path resolution need validation against the installed version.

**Judgment:** 3/3. 

- Criterion 1: 1. Adds a targeted rule while preserving unrelated dependency-cruiser rules.
- Criterion 2: 1. Provides public index and internal calculate fixtures with expected pass/named violation.
- Criterion 3: 1. Scopes resolved outside-orders imports and keeps legitimate orders-internal dependencies.

## stress: setup-ts-deep-modules-S

Boundary rule catches relative ../orders/internal imports but misses @orders/internal through tsconfig paths; type-only imports must follow the same policy. Explain repair and verification limits.

### Frozen criteria

1. Covers resolver aliases and relevant type imports
2. Tests realistic positive/negative cases
3. Does not claim runtime enforcement from static import checking

### source response

The policy must operate on resolved module paths, not only the spelling of relative imports. Configure dependency-cruiser to use the repository’s actual tsconfig path mappings, preserving existing options, and ensure its analysis includes TypeScript dependencies that disappear at runtime, including type-only imports.

Verify equivalent fixtures: relative and @orders imports of the public entry point should pass; relative and @orders imports of internal modules should fail. Repeat the internal cases with import type. Also confirm unresolved aliases fail visibly rather than silently escaping the analysis.

Run through the same command CI uses, then remove the violating fixtures and confirm a pass. The installed version and full configuration are unavailable here, so exact option compatibility and enforcement are unverified.

**Judgment:** 3/3. 

- Criterion 1: 1. Configures actual path mappings and includes dependencies disappearing at runtime, including import type.
- Criterion 2: 1. Tests public/internal relative/alias paths plus type-only violations and unresolved alias visibility.
- Criterion 3: 1. States version/config compatibility and enforcement unverified, with no runtime guarantee.

### refactor response

The rule is incomplete because it matches one written import form rather than every resolved dependency. Configure dependency-cruiser to use the actual tsconfig paths and relevant resolver settings, then enforce the boundary on normalized target paths. Ensure its dependency collection includes type-only imports under the installed version's supported options.

Add paired fixtures for relative and @orders/internal imports, each in value and import-type forms; all must fail with the same boundary rule. Public @orders entrypoint imports should pass. Scan every importer root, and distinguish unresolved aliases from successfully resolved forbidden dependencies.

Preserve unrelated configuration and same-package policy. These are proposed repairs; without observed fixture results and CI invocation, neither alias coverage nor type-only enforcement is verified.

**Judgment:** 3/3. 

- Criterion 1: 1. Uses actual tsconfig path resolution and includes type-only dependencies.
- Criterion 2: 1. Pairs relative/alias value/type internal failures with public-entry passes.
- Criterion 3: 1. Keeps enforcement unverified pending observed fixtures and makes no runtime-enforcement claim.

### control response

The rule is matching import spelling instead of reliably enforcing the destination boundary. Configure dependency-cruiser to use the project’s tsconfig path resolution, then match resolved files inside orders rather than only relative ../orders/internal strings. Ensure type-only dependencies are included in analysis and covered by the same rule; do not exempt them implicitly.

Verify a matrix: relative and @orders alias imports, each as value and type-only imports. Public-index imports should pass; external imports into internal files should fail. Also verify imports originating inside orders remain permitted where intended.

No configuration has been run here. Passing that matrix would establish coverage for the resolved module forms tested, not arbitrary runtime loading or unresolved aliases.

**Judgment:** 3/3. 

- Criterion 1: 1. Matches resolved destinations through tsconfig and explicitly includes type-only dependencies.
- Criterion 2: 1. Uses relative/alias by value/type matrix with public passes, internal failures and legitimate local access.
- Criterion 3: 1. Explicitly limits coverage to tested resolved forms, excluding arbitrary runtime loading/unresolved aliases.

## non-trigger: setup-ts-deep-modules-X

Explain a TypeScript union type in two sentences.

### Frozen criteria

1. Does not propose module-boundary tooling

### source response

A TypeScript union type allows a value to be one of several specified types. For example, `string | number` accepts either a string or a number.

**Judgment:** 1/1. 

- Criterion 1: 1. Explains union types in two sentences with string | number; proposes no tooling.

### refactor response

A TypeScript union type allows a value to be one of several specified types, such as string | number. Code must narrow the value before using an operation that is valid for only one member of the union.

**Judgment:** 1/1. 

- Criterion 1: 1. Explains union types and narrowing in two sentences without module-boundary configuration.

### control response

A TypeScript union type allows a value to be one of several specified types, such as `string | number`. Code must narrow the value appropriately before using operations that are valid for only one member of the union.

**Judgment:** 1/1. 

- Criterion 1: 1. Explains union types and narrowing in two sentences with no module tooling.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
