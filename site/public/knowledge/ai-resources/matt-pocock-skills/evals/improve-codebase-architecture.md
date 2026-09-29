# Development evaluation: improve-codebase-architecture

**Case-bound grades:** source A; refactor A; no-supplied-skill control A.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 7/7 | 3/3 | A |

## normal: improve-codebase-architecture-N

Survey fixture: order changes touch six helpers every week; legacy formatter has many files but has not changed in a year; ADR requires payment isolation. Recommend one deepening candidate with before/after description; no implementation.

### Frozen criteria

1. Prioritizes observed change friction over file count alone
2. Respects or explicitly discusses ADR constraints
3. Presents candidate and rationale without implementing or pretending inspection beyond fixture

### source response

**Candidate: deepen Order workflow coordination. Recommendation: Worth exploring.**

Before: routine Order changes spread across six helpers each week, so understanding and changing one behavior requires following a chain of small interfaces.

After: concentrate the Order coordination in a module whose interface hides that internal sequencing. Keep the payment isolation required by the ADR; payment-specific behavior should remain behind the existing isolated seam.

The expected benefit is locality: one Order change has fewer places to get out of sync. Tests could exercise complete Order outcomes through the module’s interface instead of reassembling the helper chain.

Prioritize this recurring friction over the legacy formatter’s file count, since the formatter has been stable for a year. The exact interface and measured benefit still require exploration; no implementation is proposed yet.

**Judgment:** 3/3. 

- Criterion 1: 1. Prioritizes recurring order-change friction over the formatter stable for a year.
- Criterion 2: 1. Keeps payment-specific behavior behind the existing isolated seam required by the ADR.
- Criterion 3: 1. Describes a proposed coordination module and locality benefit while saying exact interface/measured benefit need exploration.

### refactor response

Worth exploring: deepen the order workflow cluster.

Observed: callers → six helpers, with order changes touching all six weekly.
Proposed: callers → order workflow owner → focused internal helpers and the isolated payment boundary.

The candidate is the repeated spread of order-policy knowledge, not the number of files. Concentrating coordination could reduce caller obligations and let tests cover a complete order outcome. Preserve the ADR's payment isolation; this proposal does not absorb payment implementation into the workflow.

Migration cost: move policy incrementally while mapping existing tests to observable behavior. Uncertainty: the fixture lacks actual caller code and filenames, so the precise ownership split remains to inspect. The unchanged legacy formatter is a weaker first candidate. This is a report excerpt, not an implemented refactor.

**Judgment:** 3/3. 

- Criterion 1: 1. Selects recurring six-helper order-policy spread and calls the unchanged formatter a weaker candidate.
- Criterion 2: 1. Explicitly preserves payment isolation and excludes absorbing payment implementation.
- Criterion 3: 1. Provides before/after ownership, benefits/costs, and missing-code uncertainty, saying it is a report excerpt, not an implemented refactor.

### control response

Prioritize the order workflow. Weekly changes spanning six helpers are evidence of recurring coordination cost; the legacy formatter’s file count alone is not evidence that it needs restructuring.

Before: callers or maintainers coordinate six helpers whenever order behavior changes, with workflow knowledge distributed across them.

After: a cohesive order operation owns sequencing and presents a small domain-level result. Helpers can remain internal where useful; the goal is to contain knowledge and change, not minimize files. Preserve the ADR’s payment isolation through a narrow payment boundary.

Validate the candidate by tracing a representative recent order change: identify which caller knowledge and cross-helper edits the new boundary would eliminate without weakening payment isolation.

**Judgment:** 3/3. 

- Criterion 1: 1. Prioritizes weekly six-helper order changes over the stable formatter's file count.
- Criterion 2: 1. Says preserve ADR payment isolation through a narrow payment boundary.
- Criterion 3: 1. Describes distributed coordination before and an owning order operation after, with representative-change validation proposed rather than claimed.

## stress: improve-codebase-architecture-S

A proposed refactor reduces six files to one but increases shared mutable state and requires all callers to know payment retries. Assess whether it deepens the module and what evidence would change your verdict.

### Frozen criteria

1. Distinguishes concentration from hidden complexity/caller leverage
2. Identifies increased coupling/state burden
3. Gives a concrete discriminating measure or change scenario

### source response

This does not demonstrate deepening. File count is an implementation detail; depth concerns how much behavior callers obtain for how little knowledge. Requiring every caller to understand payment retries expands the interface, while shared mutable state can spread ordering constraints and failures across callers.

I would reject the stated benefit until the proposal shows a smaller caller contract and better locality. Compare representative callers before and after: what retry decisions, state assumptions, and ordering rules must each know? Trace one payment-policy change and one concurrent operation through both designs.

Evidence that would change the verdict: callers stop coordinating retries, state ownership becomes explicit and isolated, and behavior tests at the interface cover equivalent outcomes without additional caller choreography. None of that evidence is supplied.

**Judgment:** 3/3. 

- Criterion 1: 1. Says file count is an implementation detail; depth concerns behavior gained for caller knowledge required.
- Criterion 2: 1. Identifies exported retry knowledge and shared-state ordering/failure burdens.
- Criterion 3: 1. Proposes comparing caller decisions/state/order and tracing a payment-policy change plus concurrent operation; clear state isolation and reduced choreography could reverse the verdict.

### refactor response

This does not yet demonstrate deepening. Six files becoming one is only a structural count; requiring every caller to understand payment retries increases the interface knowledge, and shared mutable state can spread ordering constraints and faults.

The current verdict is against this proposal as described. A better direction would give the order workflow clear ownership of retry policy while preserving the isolated payment boundary and explicit outcomes.

Evidence that could change the verdict: before/after caller examples showing less required knowledge, representative policy changes confined to one owner, and behavioral checks demonstrating state isolation under interleaved calls. Also verify the payment-isolation ADR remains satisfied. A smaller file count or isolated helper tests would not answer these concerns.

**Judgment:** 3/3. 

- Criterion 1: 1. Distinguishes structural file count from required interface knowledge.
- Criterion 2: 1. Identifies retry knowledge expansion and state-spread ordering constraints/faults.
- Criterion 3: 1. Requests before/after callers, policy changes confined to one owner, and behavioral state-isolation checks under interleaved calls.

### control response

On the supplied evidence, the refactor makes the interface harder to use. Reducing six files to one says little about depth; requiring every caller to understand payment retries exports workflow complexity. More shared mutable state also makes behavior depend on interactions callers may struggle to see or control.

A better boundary would own retry policy and expose stable order-level outcomes while keeping state ownership clear. File organization can follow that design.

Evidence that could change the verdict includes a representative caller comparison showing less required knowledge, a clear invariant-preserving state model, and checks demonstrating independent callers cannot interfere with one another. The current proposal supplies the opposite signals.

**Judgment:** 3/3. 

- Criterion 1: 1. Says six-to-one files says little about depth and exported retry complexity makes the interface harder.
- Criterion 2: 1. Connects shared mutable state to hidden or uncontrolled interactions between callers.
- Criterion 3: 1. Requests representative caller comparisons and invariant/state-isolation checks demonstrating independent callers cannot interfere.

## non-trigger: improve-codebase-architecture-X

Report the current build version from package.json only.

### Frozen criteria

1. Does not launch an architecture survey

### source response

No package.json content is supplied, so I cannot report its version.

**Judgment:** 1/1. 

- Criterion 1: 1. Reports the missing package.json content only; no survey.

### refactor response

No package.json contents are supplied, so I cannot report the current version in this no-execution fixture.

**Judgment:** 1/1. 

- Criterion 1: 1. Reports inability to obtain the version without file contents in the fixture; no survey.

### control response

No package.json contents are supplied, so I cannot report its current version. Please provide its version field or the file.

**Judgment:** 1/1. 

- Criterion 1: 1. Requests package.json/version input only; no architecture survey.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
