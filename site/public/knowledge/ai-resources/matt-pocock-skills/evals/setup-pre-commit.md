# Development evaluation: setup-pre-commit

**Case-bound grades:** source A; refactor A; no-supplied-skill control B.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 6.5/7 | 2/3 | B |

## normal: setup-pre-commit-N

Setup proposal fixture: npm project already has ESLint and a .husky/pre-commit that runs a license check. We want fast staged formatting and existing typecheck before commit. Describe a minimal additive plan.

### Frozen criteria

1. Preserves existing license hook
2. Reuses existing package manager and checks
3. Distinguishes staged formatting from whole-project typechecking

### source response

Keep the existing Husky hook and its license check. Add staged-only formatting through lint-staged, using the project’s existing formatter if configured; if none exists, propose the minimum formatter dependency and configuration separately. Preserve ESLint and any current package scripts.

Append the existing npm typecheck command so commits stop when it fails. Preserve failure propagation for the license check and formatting too; the hook must not succeed merely because its last command succeeded. Do not reinitialize Husky in a way that overwrites the hook.

Verify with a staged formatting fixture and a deliberate type error, then restore them and confirm the clean path. Check that unstaged files and partial staging are preserved. This is an additive plan; no packages or hooks were changed.

**Judgment:** 3/3. The ordinary project typecheck is distinct from lint-staged formatting; no staged filenames are proposed as typecheck inputs.

- Criterion 1: 1. Says keep the existing license check and do not overwrite the hook during Husky initialization.
- Criterion 2: 1. Reuses existing formatter/scripts/ESLint and specifically the existing npm typecheck command.
- Criterion 3: 1. Makes formatting staged-only while appending the existing npm typecheck as a separate hook command.

### refactor response

Preserve the existing .husky/pre-commit license check and ESLint configuration. Inspect package scripts, formatter settings, npm lockfile, and any existing lint-staged rules before making an additive change.

Add staged formatting through the repository's current formatter and lint-staged, then invoke the existing typecheck command. Keep the license check in the hook with failure propagation; do not replace the hook or duplicate prepare behavior. Add dependencies only if missing and using npm's existing lockfile.

The requested workflow omits tests, so do not add an unexamined full-suite cost. Verify in an isolated Git fixture: formatting correction, blocking failure, clean pass, and partial-staging preservation. This is a minimal plan; no installation, hook run, latency measurement, or commit has occurred.

**Judgment:** 3/3. Whole-project typechecking is conveyed by invoking the existing command separately, though the phrase 'whole-project' is not used.

- Criterion 1: 1. Preserves the existing pre-commit license check with failure propagation and forbids replacing the hook.
- Criterion 2: 1. Reuses existing formatter, typecheck, ESLint, and npm lockfile; dependencies only if missing.
- Criterion 3: 1. Separates staged formatting via lint-staged from invocation of the existing typecheck command.

### control response

Preserve the existing license check in .husky/pre-commit. Inspect the project’s current formatting and typecheck commands, then add staged formatting using the existing formatter where available. If no staged-file runner exists, propose only the small addition needed to run formatting on supported staged files. Do not introduce a second lint configuration merely because ESLint is present.

Add the existing typecheck command to the hook as a separate check; run it with its normal project configuration rather than treating individual staged files as a complete TypeScript project. Ensure any failure stops the commit.

Verify that the license check still runs and unstaged work is preserved, including partially staged files. No installation or hook edit has occurred.

**Judgment:** 3/3. npm is not named, but existing commands are reused and no package-manager replacement is proposed.

- Criterion 1: 1. Explicitly preserves and verifies the existing license check.
- Criterion 2: 1. Reuses current formatting/typecheck commands, avoids a second lint configuration, and proposes only missing staged support.
- Criterion 3: 1. Explicitly says run typecheck with normal project configuration rather than treating individual staged files as a complete TypeScript project.

## stress: setup-pre-commit-S

Repository has no tests script. A copied setup adds npm test to pre-commit and rewrites all source formatting on installation. Evaluate and repair the plan.

### Frozen criteria

1. Does not wire nonexistent check
2. Avoids surprise repository-wide formatting during hook setup
3. Checks hook wiring and relevant failure behavior rather than file existence only

### source response

The copied plan introduces a guaranteed failure by calling npm test when no test script exists. Remove that step and report that commit-time tests are not configured; do not add a placeholder test command just to make the hook pass.

Reformatting all source files during installation also exceeds hook setup and creates unrelated changes. Keep installation limited to configuration and dependencies actually needed. Run formatting only on staged supported files when the hook executes, respecting existing formatter settings and ignore rules.

Preserve any current hook checks. Validate the hook’s actual commands and use a small staged fixture to prove formatting and failure propagation. No installation, formatting, or successful hook run is established here.

**Judgment:** 3/3. 

- Criterion 1: 1. Removes nonexistent npm test and rejects a placeholder just to pass.
- Criterion 2: 1. Limits installation to needed config/dependencies and formatting to staged supported files.
- Criterion 3: 1. Calls for validating actual commands with a staged fixture that proves formatting and failure propagation.

### refactor response

The copied plan is invalid for this repository: npm test has no script to invoke, and reformatting all source files on installation creates unrelated churn and may disturb working changes.

Remove the nonexistent test command. Inspect the actual available checks and wire only appropriate noninteractive ones; do not invent a test script merely to satisfy a template. Keep required CI coverage explicit. Use the already chosen formatter on supported staged files through lint-staged, with existing hooks and scripts preserved.

Validate formatting, failure propagation, and partial staging in a disposable fixture, without a live commit or repository-wide format pass. The absence of a tests script is a disclosed limit, not permission to claim tests pass. No setup has run.

**Judgment:** 3/3. 

- Criterion 1: 1. Removes the nonexistent npm test command and refuses invented placeholder test setup.
- Criterion 2: 1. Rejects whole-source installation formatting; limits formatting to supported staged files.
- Criterion 3: 1. Proposes validating formatting, failure propagation, and partial staging in a disposable fixture.

### control response

The copied plan introduces a guaranteed failure: npm test has no corresponding script. It also turns hook setup into a repository-wide formatting change, creating unrelated churn and potentially touching user work.

Remove the nonexistent command. Use only checks already available and agreed for this project; if tests are needed, creating a meaningful test setup is a separate task. Configure formatting to run on supported staged files during commits, using the existing formatter configuration. Installation should add the necessary setup files without reformatting source.

Preserve any existing hook steps and inspect the resulting diff. Verify the hook’s actual commands and behavior in an isolated example before claiming the setup works.

**Judgment:** 2.5/3. Behavioral verification is present, but the failure-behavior part of the assertion is ambiguous rather than clearly met.

- Criterion 1: 1. Removes the absent npm test command; meaningful tests would be a separate task.
- Criterion 2: 1. Says installation should add setup files without reformatting source, with formatting only on staged supported files.
- Criterion 3: 0.5. Calls for verifying actual hook commands and behavior in an isolated example, but does not identify or explicitly exercise blocking/failure propagation.

## non-trigger: setup-pre-commit-X

Fix a single style issue using the formatter already configured; do not change hooks.

### Frozen criteria

1. Does not install a new hook stack

### source response

Please provide the affected file or style issue; the existing formatter can handle the correction without hook changes.

**Judgment:** 1/1. 

- Criterion 1: 1. Asks for the affected file/issue and uses the existing formatter without hook changes.

### refactor response

Use the existing formatter on the affected file only, leaving hooks unchanged. No file or formatter command is supplied, and nothing was executed here.

**Judgment:** 1/1. 

- Criterion 1: 1. Uses the existing formatter only on the affected file and leaves hooks unchanged.

### control response

Provide the file and style issue so the existing formatter can be applied narrowly. No hooks should change, and no formatting command has run in this fixture.

**Judgment:** 1/1. 

- Criterion 1: 1. Asks for the narrow formatting input and says no hooks should change.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
