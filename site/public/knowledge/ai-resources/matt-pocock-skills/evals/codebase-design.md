# Development evaluation: codebase-design

**Case-bound grades:** source A; refactor A; no-supplied-skill control A.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 7/7 | 3/3 | A |

## normal: codebase-design-N

An order workflow makes every caller know retry timing, payment provider codes, and inventory rollback order. Propose a smaller interface and explain where complexity would go. We have only one payment provider.

### Frozen criteria

1. Hides meaningful caller obligations behind a coherent module
2. Does not equate fewer methods or more lines with depth
3. Avoids speculative adapter machinery based only on hypothetical providers

### source response

Propose an Order module with a small interface such as placeOrder(order, requestId), returning a clear order outcome or domain error. Callers should not choose retry timing, decode provider codes, or orchestrate inventory rollback.

Move those responsibilities into the implementation: one place coordinates the order lifecycle, translates payment outcomes, and performs compensation in the required order. Its interface must still state what repeated requestIds mean and what callers may safely do after an uncertain result.

There is only one payment provider, so a general multi-provider framework is unjustified. A private seam with production and test adapters may still be useful for the external payment dependency. Test observable order outcomes through the Order interface; complexity should become local, not disappear from documentation by assumption.

**Judgment:** 3/3. 

- Criterion 1: 1. Proposes an Order operation owning retry timing, code translation and compensation.
- Criterion 2: 1. Says complexity becomes local and requires clear repeated-request/uncertain-outcome semantics.
- Criterion 3: 1. Rejects generalized multi-provider machinery while allowing production/test seams for actual I/O.

### refactor response

Proposed interface: placeOrder(order, requestId) returns an explicit accepted, declined, unavailable, or retryable-failure outcome.

The workflow module would own retry timing, translation of payment-provider codes, and inventory compensation order. Callers supply the order and stable request identity, then handle a small set of meaningful outcomes. They should not reproduce provider rules or orchestrate rollback.

Keep the external payment operation behind a controlled adapter so tests can exercise retry and compensation behavior without charges; one real provider is enough to justify this I/O boundary. Do not invent a multi-provider framework.

The module earns its place if removing it would scatter this knowledge across callers again. Verify combined workflow outcomes through the new interface, preserving important old invariants.

**Judgment:** 3/3. 

- Criterion 1: 1. Proposes placeOrder(order,requestId) with meaningful outcomes and internal retry/provider/compensation ownership.
- Criterion 2: 1. Evaluates the module by whether removing it would scatter knowledge across callers.
- Criterion 3: 1. Justifies a controlled I/O adapter for the one real provider and forbids speculative multi-provider machinery.

### control response

Give callers one order-level operation, such as placeOrder(request), returning a domain result like confirmed, rejected, or pending with a stable order reference. Callers should not interpret provider codes or orchestrate inventory compensation.

Move retry timing, provider-result translation, idempotency handling, and inventory rollback sequencing into the order workflow and its internal payment boundary. A pending result should represent an unresolved outcome that callers cannot safely treat as a simple failure and retry from scratch.

With one provider, a focused internal adapter is enough; a generic multi-provider framework is not justified. Complexity remains, but it sits with the component that can enforce the workflow consistently. Check failure paths through the public operation.

**Judgment:** 3/3. 

- Criterion 1: 1. Proposes placeOrder with domain results and moves retries, provider translation and rollback into its workflow.
- Criterion 2: 1. Explains which knowledge becomes local while complexity still exists, rather than counting methods/lines.
- Criterion 3: 1. Explicitly rejects a multi-provider framework and limits the adapter to the real internal boundary.

## stress: codebase-design-S

Someone proposes merging authentication and invoice calculation into one deep module because fewer interfaces are always better. Evaluate using change locality and caller knowledge.

### Frozen criteria

1. Rejects merging unrelated responsibilities merely to reduce interface count
2. Explains locality and semantic coherence
3. Identifies a concrete tradeoff rather than treating depth as universal metric

### source response

Fewer interfaces are not automatically better. Authentication and invoice calculation have different reasons to change and demand different caller knowledge. Merging them risks forcing invoice callers to understand authentication state and authentication callers to carry billing rules.

Evaluate depth by leverage and locality: does the combined interface hide knowledge, or merely put unrelated operations behind one name? If a tax-rule change and a login-policy change both disturb the same module, locality has worsened.

Keep separate modules unless actual shared invariants require coordinated behavior. A small orchestration module may compose them for a specific use case while preserving their interfaces. Evidence for merging would need to show inseparable domain behavior and simpler caller obligations, not just a lower interface count.

**Judgment:** 3/3. 

- Criterion 1: 1. States fewer interfaces are not automatically better and rejects unrelated operations behind one name.
- Criterion 2: 1. Evaluates hidden knowledge and locality for tax-rule/login-policy changes.
- Criterion 3: 1. Balances reduced interface count against mixed caller obligations and requires shared-invariant evidence.

### refactor response

Fewer interfaces do not automatically create a deeper module. Authentication and invoice calculation have different reasons to change. Merging them may force billing callers to understand identity configuration and authentication callers to load billing rules, increasing total caller knowledge despite reducing the module count.

Keep their responsibilities separate unless evidence shows a cohesive operation genuinely owns both. A small orchestration function can use authentication's result and invoice calculation's public contract without merging their mechanisms.

Evaluate actual change locality: when tax rules change, how much authentication code and testing moves? When login policy changes, how much invoice behavior must be understood? A beneficial design reduces that coupling and keeps consequential caller choices explicit. File count alone cannot establish the result.

**Judgment:** 3/3. 

- Criterion 1: 1. Rejects merging responsibilities merely to reduce interface count.
- Criterion 2: 1. Uses different change reasons/caller needs and concrete tax versus login-policy locality questions.
- Criterion 3: 1. Explains extra caller knowledge/coupling and offers narrow orchestration as the alternative.

### control response

Fewer interfaces are not automatically better. Authentication and invoice calculation have different responsibilities, change triggers, and callers. Merging them may force invoice callers to understand login concerns and make authentication changes disturb financial logic, reducing change locality.

Assess the proposed boundary by asking what knowledge it hides and which changes remain contained. If callers must supply more unrelated state or understand a larger set of failure modes, the larger module is not usefully deeper.

Keep separate interfaces unless a concrete workflow requires their coordination. That workflow can depend on authentication results and invoice calculation without absorbing both implementations. A merger needs evidence of shared invariants that are difficult to enforce across the current boundary.

**Judgment:** 3/3. 

- Criterion 1: 1. Rejects the fewer-interfaces premise and distinguishes responsibilities/callers.
- Criterion 2: 1. Discusses localized change and the knowledge/failure modes demanded of callers.
- Criterion 3: 1. Names the risk of extra unrelated state/coupling and offers workflow composition rather than merger.

## non-trigger: codebase-design-X

Rename a local variable for clarity without changing interfaces.

### Frozen criteria

1. Does not trigger broad architecture redesign

### source response

Please provide the local variable and its surrounding code so I can suggest a precise rename.

**Judgment:** 1/1. 

- Criterion 1: 1. Asks for local variable/context for a precise rename, with no redesign.

### refactor response

Please provide the variable and surrounding code so I can suggest a clearer name without changing the interface.

**Judgment:** 1/1. 

- Criterion 1: 1. Asks for variable/context to suggest a clearer name without interface changes.

### control response

Please provide the code snippet and the local variable you want renamed.

**Judgment:** 1/1. 

- Criterion 1: 1. Asks for the code snippet and local variable, without architecture work.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
