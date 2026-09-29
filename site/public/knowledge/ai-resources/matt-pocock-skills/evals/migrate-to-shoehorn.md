# Development evaluation: migrate-to-shoehorn

**Case-bound grades:** source A; refactor A; no-supplied-skill control A.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 7/7 | 3/3 | A |

## normal: migrate-to-shoehorn-N

Migration fixture: tests build a large User object by casting {id:"u1"} as User; production code has a separate as User cast. Plan a test-fixture-only migration and checks, without installing a package.

### Frozen criteria

1. Limits migration to test fixture intent
2. Preserves explicit test values and behavior
3. Leaves production cast outside scope or flags separately

### source response

Limit the migration to test fixtures that currently cast partial objects such as {id: "u1"} as User. At a call expecting User, the proposed replacement is:

```ts
import { fromPartial } from "@total-typescript/shoehorn";

consumeUser(fromPartial({ id: "u1" }));
```

Use the test’s actual consumer; the example name is illustrative. Inspect each cast before replacing it, since intentionally invalid fixtures need their invalid runtime shape preserved.

Leave the separate production as User cast unchanged: this tool is for test data, not production validation. Check the migration diff for production imports, run typechecking, and run the affected tests when the dependency is available. No package is installed or checks run in this fixture; dependency availability remains a prerequisite.

**Judgment:** 3/3. 

- Criterion 1: 1. Limits migration to partial test fixtures, with no package installation and dependency availability a prerequisite.
- Criterion 2: 1. The replacement retains id: 'u1'; it also requires preserving intentionally invalid runtime shapes and running affected tests.
- Criterion 3: 1. Explicitly leaves production cast unchanged and checks for accidental production imports.

### refactor response

Limit the migration to test fixtures. Classify each assertion by purpose before replacement; the production as User cast remains outside scope.

For tests intentionally supplying only a valid id, use Shoehorn's fromPartial<User> pattern after checking the installed or intended API. The helper does not fill missing runtime properties: read the tested path to ensure those omissions are deliberate and do not change the behavior under test.

Migrate one representative test first, then run that test and type checking. Confirm it still exercises the same outcome and that all Shoehorn imports are test-only before expanding. Keep complete or deliberately invalid fixtures classified separately. This is a plan; no package was installed and no test or source file changed.

**Judgment:** 3/3. The exact literal u1 is not repeated, but the proposal preserves the supplied fixture's purpose and tested outcome without proposing value changes.

- Criterion 1: 1. Restricts changes/imports to test fixtures and classifies fixture purpose first.
- Criterion 2: 1. Preserves deliberate omissions/runtime behavior and the same outcome, verifying a representative test before expansion.
- Criterion 3: 1. Explicitly keeps the production as User cast outside scope.

### control response

Limit the migration to test fixtures that use partial User objects, such as {id: "u1"} as User. Inventory those uses and identify which properties each test actually exercises. Replace appropriate test casts with the agreed fixture helper, using the installed helper’s real API once verified; do not invent a package API or install anything in this proposal.

Keep the production as User cast unchanged and track any concern about it separately. Review fixtures used to test invalid or missing data before converting them, because filling defaults could change their meaning.

Verify the resulting diff is confined to test fixtures, typecheck the tests, and rerun affected behavioral cases. No migration or checks have executed.

**Judgment:** 3/3. 

- Criterion 1: 1. Limits inventory/replacement to partial User test fixtures and forbids installation.
- Criterion 2: 1. Uses the exact id example, inspects exercised properties and invalid/missing-data intent, and proposes rerunning affected behavioral cases.
- Criterion 3: 1. Explicitly leaves the production as User cast unchanged and flags any concern separately.

## stress: migrate-to-shoehorn-S

A test specifically asserts that a missing property causes validation failure. Replacing its fixture with a helper that fills defaults would make invalid data valid. How should this case be handled?

### Frozen criteria

1. Preserves deliberately invalid/missing data
2. Does not mechanically convert every cast
3. Uses targeted behavioral verification rather than typecheck alone

### source response

Preserve the missing property. This fixture is intentionally invalid, and adding defaults would remove the condition the test is meant to reject.

Keep the explicit incomplete runtime object and document that omission as part of the test setup. If a type helper is used, choose one that leaves the runtime shape unchanged—such as an appropriate partial or intentionally invalid-data helper—and verify that behavior for the installed library. Otherwise retain the narrow test-only assertion rather than changing the test’s meaning to satisfy a mechanical migration.

The check should still assert the required-property validation failure and, where useful, explicitly confirm the property is absent. A separate valid fixture can test success. No helper behavior or test result has been executed here.

**Judgment:** 3/3. Verification is described as required behavior, not claimed executed; explicit test-run wording is unnecessary for this proposal assertion.

- Criterion 1: 1. Keeps the incomplete runtime object and demands any helper leave its shape unchanged.
- Criterion 2: 1. Allows retaining the narrow test-only assertion rather than changing meaning for a mechanical migration.
- Criterion 3: 1. Requires the check to assert required-property failure and optionally property absence, with helper behavior verification.

### refactor response

Preserve the missing property and the validation failure. A helper that supplies defaults would turn the fixture into valid input and erase what the test proves.

Keep an explicit invalid object, or use fromAny only if the verified Shoehorn API and repository conventions make the intentional invalidity clearer. Do not use defaults or characterize it as a conforming partial fixture merely to remove a cast. Shoehorn's helpers themselves do not manufacture missing runtime properties; inspect any wrapper that might.

Retain an assertion through the real validator that identifies the missing-property failure, then run the focused test and type check. Mark this case as deliberately different from ordinary partial mocks. No migration or execution is claimed here.

**Judgment:** 3/3. 

- Criterion 1: 1. Preserves missing-property input and validation failure, rejecting default-filling.
- Criterion 2: 1. Treats deliberately invalid fixtures separately and permits helpers only after API/convention verification.
- Criterion 3: 1. Requires an assertion through the real validator and explicitly running the focused test plus typecheck.

### control response

Preserve the intentionally missing property. This fixture is invalid on purpose: its job is to show that validation rejects incomplete input. A helper that fills the property changes the test’s premise and can silently remove coverage.

Keep an explicit invalid fixture at the validation boundary, typed as unknown or the validator’s raw input type where that contract supports it. If an exceptional cast is necessary to reach the boundary, keep it narrow and explain that it models malformed external input. Do not cast the object into a valid domain model merely for convenience.

Retain the assertion for the specific missing-property failure, and review the fixture after any helper migration to confirm the property remains absent.

**Judgment:** 3/3. This receives credit for a targeted behavioral assertion in a proposed approach; it does not explicitly say to run that test, and no execution is inferred.

- Criterion 1: 1. Explicitly preserves the missing property and rejects defaults that erase invalid-input coverage.
- Criterion 2: 1. Keeps a deliberate invalid object and allows a narrow exceptional cast instead of universal conversion.
- Criterion 3: 1. Retains the assertion for the specific missing-property validation failure and requires checking that the omission survives migration.

## non-trigger: migrate-to-shoehorn-X

Rename a test description only; no fixture changes.

### Frozen criteria

1. Does not initiate package migration

### source response

Please provide the current test description and its replacement.

**Judgment:** 1/1. 

- Criterion 1: 1. Asks only for current test description and replacement.

### refactor response

Please provide the current test description and desired name; no fixture changes are needed.

**Judgment:** 1/1. 

- Criterion 1: 1. Asks for description/name and explicitly says no fixture changes are needed.

### control response

Please provide the current test description and the replacement wording.

**Judgment:** 1/1. 

- Criterion 1: 1. Asks only for current and replacement test description.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
