# Development evaluation: prototype

**Case-bound grades:** source A; refactor A; no-supplied-skill control A.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 7/7 | 3/3 | A |

## normal: prototype-N

We need to decide what happens when two readers edit a note offline and reconnect. Produce a compact prototype design with actions, visible state and two guided scenarios. No production implementation yet.

### Frozen criteria

1. Chooses logic/state exploration rather than visual styling variants
2. Includes observable conflict/reconnection state and guided scenarios
3. States the decision to learn and keeps artifact scope temporary

### source response

Prototype question: can two offline edits reconnect without silently losing either reader’s work?

Use one throwaway HTML demo with an in-memory reducer. Show the shared note, each reader’s local text and base revision, connection status, pending edits, and any conflict. Actions: disconnect reader, edit locally, reconnect, choose a version, combine versions, and reset. Render the relevant state after every action.

Scenario 1: both disconnect; only A edits; A reconnects, then B. Watch the shared revision update and B receive it.

Scenario 2: both edit the same starting note differently; reconnect A, then B. Proposed behavior: preserve both versions and display a conflict for explicit resolution. Reverse the reconnection order too.

These are proposed transitions for discussion; no production merge policy is established yet.

**Judgment:** 3/3. 

- Criterion 1: 1. Uses an in-memory reducer with edit/disconnect/reconnect/resolve/reset actions.
- Criterion 2: 1. Shows revisions, connection, pending edits and conflicts; gives clean-sync and concurrent-edit scenarios.
- Criterion 3: 1. States the no-silent-loss question, calls the demo throwaway, and leaves production policy unsettled.

### refactor response

Prototype question: can readers resolve concurrent offline edits without silently losing either version?

Use one self-contained experimental page with a pure state model. Show server text/revision, each reader's base revision and local text, connection status, pending edits, and conflict state after every action.

Actions: edit as A/B, disconnect/reconnect, sync, choose A, choose B, combine, and reset. Reject resolution when no conflict exists, with a visible explanation.

Scenario 1: A edits offline while B stays unchanged; reconnect A and observe one clean update.
Scenario 2: both edit the same base; reconnect in either order, preserve both versions, and require an explicit resolution.

These scenarios test the proposed conflict policy and usability. They do not establish production synchronization correctness or scale; the user's policy verdict remains pending.

**Judgment:** 3/3. 

- Criterion 1: 1. Uses a pure state model and action-driven experimental page.
- Criterion 2: 1. Shows server/local state and conflicts and gives one-writer and concurrent-writer scenarios.
- Criterion 3: 1. Names the conflict-policy/usability question and limits the experimental page's production claims.

### control response

Prototype two reader panels editing the same note. Each panel has Edit, Go offline, Save locally, and Reconnect actions. Show connection state, the shared base version, local text, sync status, and any unresolved conflict.

Scenario 1: Reader A goes offline and edits; B leaves the note unchanged. Reconnect A and show the saved text becoming shared, with both panels converging.

Scenario 2: both readers edit the same sentence offline. Reconnect in either order. Preserve both versions and show a comparison with “Keep A,” “Keep B,” and “Combine” actions. Mark the note unresolved until a choice is saved.

This tests whether readers understand and can resolve conflicts; it does not establish production synchronization correctness.

**Judgment:** 3/3. Temporary scope is conveyed by the prototype framing and production limit rather than an explicit disposal instruction.

- Criterion 1: 1. Proposes editor panels and synchronization/resolution actions rather than styling variants.
- Criterion 2: 1. Shows connection/base/local/sync/conflict state and gives clean and conflicting reconnection scenarios.
- Criterion 3: 1. Frames the artifact as a prototype to test understanding/resolution and disclaims production correctness.

## stress: prototype-S

A beautiful UI prototype uses in-memory sample data. A stakeholder says it proves the design will handle 100000 real users. Write the verdict and the next smallest discriminating experiment.

### Frozen criteria

1. Separates UI evidence from scale claims
2. Proposes a relevant load/capacity experiment
3. Preserves what the prototype did establish without claiming production readiness

### source response

The prototype demonstrates its visible interaction with sample data. It does not establish that the system can serve 100,000 real users: in-memory data bypasses the storage, network, contention, and operational limits that would decide that claim.

The smallest useful next experiment is a thin representative path through the proposed backend and storage, using realistic data size and a specified workload. First define what “100,000 users” means: registered accounts, simultaneous users, or a request rate. Set acceptable latency and failure limits, then gradually load that path in an isolated environment and record the limiting resource.

A successful result would support that measured path and workload only. No scale test has been performed in this fixture.

**Judgment:** 3/3. 

- Criterion 1: 1. Explains that in-memory UI bypasses storage, network and contention limits.
- Criterion 2: 1. Defines the user-count workload then incrementally loads representative backend/storage against limits.
- Criterion 3: 1. Credits visible interaction and restricts conclusions to measured path/workload; no readiness claim.

### refactor response

The prototype demonstrates an interaction using sample data. It supplies no evidence that the system can serve 100000 real users: there is no real storage, network, authentication, workload, or measured concurrency behind that claim.

First translate “100000 users” into the expected active concurrency and operation mix. Then build the smallest representative read/write path against the intended storage and run a bounded load experiment in an isolated environment. Measure latency, throughput, failures, and resource saturation against agreed targets.

A single critical path is enough to expose an early bottleneck before building the whole product. Passing it supports only that tested path and workload; the UI prototype remains useful for design review.

**Judgment:** 3/3. 

- Criterion 1: 1. Credits sample-data interaction while rejecting the real-user scale inference.
- Criterion 2: 1. Defines concurrency/operation mix and proposes bounded realistic storage read/write load measurements.
- Criterion 3: 1. Keeps design-review value and confines successful test evidence to the tested path/workload.

### control response

The prototype demonstrates interaction and visual behavior with sample data. It does not establish capacity for 100,000 users: no real persistence, concurrency, network behavior, or production workload has been exercised.

The smallest useful next experiment is a thin real version of the highest-risk interaction against the intended backend. Define what “100,000 users” means in active concurrency and request rate, then run a bounded synthetic load with realistic data size. Measure latency, failures, and resource use against agreed thresholds while increasing concurrency.

Keep the conclusion narrow: this would test one critical path under a stated workload, not certify the whole design. The current prototype remains useful for usability feedback.

**Judgment:** 3/3. 

- Criterion 1: 1. Separates demonstrated sample-data interaction from untested 100,000-user capacity.
- Criterion 2: 1. Proposes a thin real backend path with defined concurrency, realistic data, latency/failure/resource measurements.
- Criterion 3: 1. Retains usability value and limits any load-test conclusion to one stated path/workload.

## non-trigger: prototype-X

Fix the confirmed spelling error in an existing button from Svae to Save.

### Frozen criteria

1. Handles direct edit without proposing multiple prototype variants

### source response

Change `Svae` to `Save`.

**Judgment:** 1/1. 

- Criterion 1: 1. Directly says to change Svae to Save.

### refactor response

Change “Svae” to “Save”. No file edit was executed in this fixture.

**Judgment:** 1/1. 

- Criterion 1: 1. Directly proposes changing Svae to Save; offers no variants.

### control response

Replace the button label “Svae” with “Save.” No file was changed in this text-only fixture.

**Judgment:** 1/1. The period inside the closing quote could be typography or part of the proposed label; it does not affect the listed no-variants assertion.

- Criterion 1: 1. Directly proposes replacing Svae with Save; no variants or prototype workflow.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
