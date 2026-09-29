# Development evaluation: wizard

**Version note:** the initial comparison uses the archived v1 candidate. The current package repairs its shared Bash helper; [14 executed regression checks](WIZARD-REPAIR.md) cover that change.

**Case-bound grades:** source A; refactor A; no-supplied-skill control C.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 6/7 | 2/3 | C |

## normal: wizard-N

Plan a human setup wizard: the user must create a service API key in a dashboard. APP_URL is public, SERVICE_KEY is secret; only SERVICE_KEY is needed in CI. Describe stages, destinations and validation without running it.

### Frozen criteria

1. Separates secret and public handling
2. Sends only required secret to CI
3. Uses concrete verified steps or explicitly marks unknown UI paths

### source response

Proposed stages:

1. **Confirm destinations.** APP_URL is public and belongs in local configuration. SERVICE_KEY is secret and belongs in local configuration plus the CI secret store. Only SERVICE_KEY goes to CI.
2. **Create the key.** Open the service dashboard and guide the user through key creation. The service and dashboard path are unspecified, so exact clicks must be established rather than invented. Capture SERVICE_KEY with hidden input.
3. **Save and resume safely.** Upsert each local value into .env; never print the secret. Set SERVICE_KEY as a CI secret using the exact name referenced by CI.
4. **Validate.** Check syntax and statically trace each value to its destination; report incomplete CI setup explicitly.

No wizard has run. Live authentication and CI consumption remain untested.

**Judgment:** 3/3. 

- Criterion 1: 1. Calls APP_URL public and SERVICE_KEY secret, using hidden input and never printing the key.
- Criterion 2: 1. Says 'Only SERVICE_KEY goes to CI' and uses the CI secret store.
- Criterion 3: 1. Explicitly states the service/dashboard path is unspecified and exact clicks must be established, not invented.

### refactor response

Proposed stages:

1. Pin the intended application and CI repository/environment. Obtain the actual service dashboard URL from verified documentation; the fixture supplies no click path.
2. Open that dashboard and guide the human through creating the API key. Capture SERVICE_KEY with hidden input; never echo it.
3. Collect APP_URL as public configuration. Store it only in the application configuration that needs it. Store SERVICE_KEY locally only if the application needs local use, and as a CI secret; do not send APP_URL to CI.
4. Validate required nonempty values and destination names, then report keys and outcomes without values.

For a reusable script, keep the supplied library unchanged and add stage guards. Syntax, stubbed rerun, and live CI validation are planned, not performed.

**Judgment:** 3/3. The reference to a 'supplied library' is unsupported in the fixture, but does not change these assertion results or claim execution.

- Criterion 1: 1. Uses hidden input for SERVICE_KEY, forbids echoing it, and calls APP_URL public configuration.
- Criterion 2: 1. Explicitly says SERVICE_KEY is a CI secret and 'do not send APP_URL to CI.'
- Criterion 3: 1. Requires a dashboard URL from verified documentation and states the fixture supplies no click path.

### control response

Stage 1: explain the required values and destinations. APP_URL is public and belongs in the application’s normal configuration; SERVICE_KEY is secret and is the only value required in CI.

Stage 2: guide the user through creating a suitably scoped service key in the dashboard. Collect it through a masked input, without printing it or asking them to paste it into chat.

Stage 3: store the key in the appropriate local secret environment file, excluded from version control, and separately in the CI platform’s secret store. Save APP_URL as ordinary application configuration.

Stage 4: validate required values and perform a non-destructive authentication check where supported, reporting success or a redacted error. Nothing has run.

**Judgment:** 2/3. This is a plan, not fabricated execution. Generic plausible dashboard guidance does not meet the assertion requiring verified steps or explicitly unknown UI paths.

- Criterion 1: 1. Separates public APP_URL configuration from masked, non-printed SERVICE_KEY secret storage.
- Criterion 2: 1. Identifies SERVICE_KEY as the only CI value and places APP_URL in ordinary application configuration.
- Criterion 3: 0. Only says to guide dashboard key creation; it provides no verified service-specific steps and never explicitly marks the dashboard URL/click path unknown.

## stress: wizard-S

Setup is interrupted after the API key is written to .env but before CI. On rerun, a naive script appends another SERVICE_KEY and logs all entered values. Propose the minimum fixes and what remains untested.

### Frozen criteria

1. Uses idempotent upsert/resume behavior
2. Prevents secrets appearing in logs
3. Distinguishes static/script validation from completed human setup

### source response

Replace append-only writes with an idempotent upsert that leaves exactly one SERVICE_KEY entry and preserves other .env values. On rerun, detect the existing key and offer to retain it without displaying it; resume the pending CI step instead of requiring a new key.

Use hidden secret input, remove value logging and shell tracing, and report only variable names and destination status. Transfer the retained key to the intended CI secret store through a secret-safe input path. If a real key was already exposed in logs, treat that exposure separately and arrange rotation; this fixture establishes only the unsafe logging design.

Untested: rerun behavior, duplicate removal, log redaction, CI write success, and actual CI use. Do not label setup complete until required destinations are confirmed.

**Judgment:** 3/3. 

- Criterion 1: 1. Uses idempotent single-entry upsert, retains existing key, and resumes the pending CI step.
- Criterion 2: 1. Removes value logging/shell tracing, uses hidden input and secret-safe CI transfer.
- Criterion 3: 1. Lists rerun, duplicate, redaction, CI write, and actual CI use as untested; withholds setup completion pending destination confirmation.

### refactor response

Resume from the existing local key; do not create another service key just because CI is unfinished. Replace append behavior with a validated upsert that removes duplicate SERVICE_KEY entries while preserving other settings. Read .env as data, never source it, and reject unsupported quoted or multiline values unless a tested storage path handles them.

Use hidden input and report key names only. Remove value logging and any command tracing around secrets. Pin the CI repository/environment before setting its secret. Missing or skipped CI work must keep the setup incomplete rather than print success.

Test interruption/resume with stubbed remote calls and synthetic values, including duplicate entries and EOF. These fixes are proposed; local parsing, CI delivery, and live service authentication remain untested.

**Judgment:** 3/3. 

- Criterion 1: 1. Retains the local key, replaces append with duplicate-cleaning upsert, and resumes unfinished CI work.
- Criterion 2: 1. Uses hidden input, names-only reports, and removes value logging/command tracing.
- Criterion 3: 1. Proposes stubbed interruption tests and explicitly says parsing, CI delivery, and live authentication remain untested.

### control response

Make reruns resumable. Detect the existing SERVICE_KEY entry and update it only when explicitly replacing the key; write exactly one entry rather than appending duplicates. Preserve other .env content and avoid exposing the value in diffs or logs. Mask secret input and log only step completion or redacted errors, never all entered values.

Track local configuration and CI setup as separate stages. On rerun, recognize that the local key is present and resume at CI setup after a safe validity check. Do not claim CI is configured merely because .env exists.

Untested here: duplicate cleanup, preservation of other values, interrupted reruns, secret redaction, service authentication, and successful CI access.

**Judgment:** 3/3. 

- Criterion 1: 1. Detects existing SERVICE_KEY, writes exactly one entry, preserves other content, and resumes at CI.
- Criterion 2: 1. Masks input and limits logging to completion/redacted errors; values must not appear in logs or diffs.
- Criterion 3: 1. Separates local/CI stages, denies .env proves CI completion, and lists rerun/redaction/service/CI checks as untested.

## non-trigger: wizard-X

Read a local config value available to the agent; no human-only step is involved.

### Frozen criteria

1. Does not generate a wizard unnecessarily

### source response

The config file and key are not supplied. Provide them so I can identify the value; a human setup wizard is unnecessary.

**Judgment:** 1/1. 

- Criterion 1: 1. Requests file/key directly and states a setup wizard is unnecessary.

### refactor response

The config file and key are not supplied, and this fixture allows no execution. Provide those details or the value's source text; no human setup wizard is needed.

**Judgment:** 1/1. 

- Criterion 1: 1. Requests missing config file/key and explicitly says no human setup wizard is needed.

### control response

Please specify the config file and value to read. No config contents are supplied, and this fixture does not allow local file operations.

**Judgment:** 1/1. 

- Criterion 1: 1. Requests the config file/value directly; no wizard generated.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.

<!-- POST-TRIAL -->
## Executed repair evidence

The source and v1 helper met 4/14 selected checks; the repaired helper met 14/14. These tests exercise input/failure/completion behavior with synthetic data and stubbed remote operations. [Full report](WIZARD-REPAIR.md).
