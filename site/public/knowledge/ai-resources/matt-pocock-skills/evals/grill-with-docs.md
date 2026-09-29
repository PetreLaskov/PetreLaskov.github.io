# Development evaluation: grill-with-docs

**Case-bound grades:** source A; refactor A; no-supplied-skill control A.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 7/7 | 3/3 | A |

## normal: grill-with-docs-N

Grill our cancellation design and record decisions when settled. Existing glossary distinguishes Order from Line item. We have not decided whether single items can be cancelled after shipment. Give first round and what should be saved now.

### Frozen criteria

1. Uses domain terms to ask the unresolved policy decision
2. Does not save an unaccepted policy as settled
3. Combines interview and proportionate durable records

### source response

❓ **Q1 — Line item after shipment:** Can a shipped Line item be cancelled, or does cancellation end when that Line item ships?

➡️ I recommend ending cancellation at shipment and treating any later reversal as a separate return or refund process, if the business needs one. That keeps “cancel” from implying that shipped goods can be stopped.

The glossary already distinguishes an Order from a Line item, so I will use those terms and avoid treating an item cancellation as cancellation of the whole Order.

Nothing new is settled yet. Save no new policy as a decision now. If keeping discussion notes is useful, mark this as an open question; glossary entries should contain resolved definitions, not pending policy or implementation notes.

**Judgment:** 3/3. 

- Criterion 1: 1. Asks whether a shipped Line item can be cancelled and explicitly distinguishes it from an Order.
- Criterion 2: 1. Says nothing new is settled and no new policy should be saved as a decision.
- Criterion 3: 1. Combines the policy question with an optional open-question note and resolved-only glossary guidance.

### refactor response

❓ Q1 — Cancellation boundary: May a shipped Line item be cancelled, or does cancellation end at shipment?
➡️ Recommended: cancellation ends at shipment; later requests use a separately defined return/refund process. That keeps cancellation from implying reversal of a completed shipment.

❓ Q2 — Unit of cancellation: May a customer cancel an individual unshipped Line item while retaining the rest of the Order?
➡️ Recommended: yes, if fulfillment can treat Line items independently. Totals and order status then follow that choice.

Save now: no new glossary definition or ADR. Order and Line item are already distinguished, and these policies are unresolved. Keep the questions in the conversation until answered; do not record recommendations as decisions.

**Judgment:** 3/3. 

- Criterion 1: 1. Uses Line item and Order in questions about shipment boundary and partial cancellation.
- Criterion 2: 1. Says unresolved policies must not be recorded as decisions.
- Criterion 3: 1. Explains that no new glossary entry or ADR is warranted yet and retains questions until answered.

### control response

First, distinguish the action: are we cancelling an entire Order, or selected Line items within it? For this round, take one Line item that has already shipped. Should the system reject cancellation and direct the user to a return process, or is there a defined post-shipment cancellation operation?

My proposed default is cancellation before shipment only, with returns handled separately, because changing a record cannot undo shipment. That is a proposal, not a decision.

Save now only the established glossary distinction and the open question, if a working record is needed. Do not record post-shipment cancellation as supported or prohibited until the decision is settled.

**Judgment:** 3/3. 

- Criterion 1: 1. Uses Order and Line item to ask the unresolved post-shipment cancellation boundary.
- Criterion 2: 1. Calls the proposed default 'a proposal, not a decision' and prohibits recording support/prohibition as settled.
- Criterion 3: 1. Pairs the interview with saving only established terminology and an open question if a working record is needed.

## stress: grill-with-docs-S

The user just decided partial cancellation before shipment only. Another editor changed CONTEXT.md during the conversation. Explain the next safe write and whether every decision deserves an ADR.

### Frozen criteria

1. Re-reads current file and preserves concurrent edits
2. Records agreed language separately from implementation details
3. Creates ADR only for meaningful durable tradeoff rather than every answer

### source response

The settled rule is: a Line item may be cancelled before shipment; partial cancellation of an Order is allowed on that basis. Shipped Line items are excluded.

Before the next write, re-read the current CONTEXT.md and compare it with the version used during our discussion. Preserve the other editor’s changes, then make the smallest compatible update to a resolved term definition if needed. Record the cancellation behavior in the specification or decision notes; CONTEXT.md remains a glossary. If the new text conflicts with the other editor’s change, surface that conflict before overwriting it.

An ADR is warranted only if the choice is hard to reverse, surprising without context, and a real trade-off. This decision does not automatically meet all three tests.

**Judgment:** 3/3. 

- Criterion 1: 1. Requires rereading, comparing, and preserving the current file, surfacing conflicts before overwriting.
- Criterion 2: 1. Separates the resolved cancellation rule in spec/decision notes from glossary definitions and implementation.
- Criterion 3: 1. Requires meaningful reversibility/context/tradeoff reasons and says the answer alone does not justify an ADR.

### refactor response

The settled policy is: individual Line items may be cancelled only before shipment.

Before writing, reread the current CONTEXT.md and compare the relevant section with what we previously saw. Preserve the other editor's changes; update only a newly resolved domain definition if this decision actually changes one. Do not append a session log or implementation plan to the glossary.

If this is simply a policy decision, retain it in the conversation unless a suitable decision/spec artifact has been requested. An ADR is warranted only when the choice is hard to reverse, surprising without context, and involves a real tradeoff. This rule does not automatically meet all three tests. No write has occurred.

**Judgment:** 3/3. Full credit for separating agreed language from implementation; the response conditionally retains the policy in conversation rather than assuming a specific artifact was requested.

- Criterion 1: 1. Requires rereading current CONTEXT.md and preserving the other editor's changes in a focused update.
- Criterion 2: 1. States the agreed Line item policy and separates domain definitions from implementation plans/session logs.
- Criterion 3: 1. Limits ADRs to hard-to-reverse choices that need context and involve a real tradeoff.

### control response

Reread the current CONTEXT.md before making any change and compare the relevant passage with the version previously seen. Add a focused decision entry: “Users may cancel selected Line items before shipment only.” Preserve the other editor’s changes, and surface any direct conflict instead of overwriting it. If both editors touched the same policy passage, reconcile the intended text before writing. Review the resulting diff for unrelated changes.

Not every decision needs an ADR. Record this in the normal product context unless it is a consequential architectural choice with alternatives and lasting tradeoffs worth preserving. The decision belongs in the record; its document format depends on its significance.

**Judgment:** 3/3. 

- Criterion 1: 1. Requires rereading current CONTEXT.md, preserving concurrent changes, reconciling conflicts, and reviewing the diff.
- Criterion 2: 1. Proposes the precise policy sentence about selected Line items before shipment, without implementation details.
- Criterion 3: 1. Says normal product context suffices unless alternatives and lasting architectural tradeoffs justify an ADR.

## non-trigger: grill-with-docs-X

Give a one-line definition of cancellation; no project design session.

### Frozen criteria

1. Gives the definition without interview or documentation workflow

### source response

Cancellation is ending an arrangement, request, or planned action before it is completed.

**Judgment:** 1/1. 

- Criterion 1: 1. Defines cancellation in one line with no design session.

### refactor response

Cancellation is ending an arrangement, request, or planned action before it is completed.

**Judgment:** 1/1. 

- Criterion 1: 1. Provides a one-line definition without questions or documentation work.

### control response

Cancellation is the act of stopping or withdrawing something that was planned, arranged, or ordered.

**Judgment:** 1/1. 

- Criterion 1: 1. Provides only the requested definition, without workflow or interview.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
