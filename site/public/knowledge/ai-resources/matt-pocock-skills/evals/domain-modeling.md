# Development evaluation: domain-modeling

**Case-bound grades:** source A; refactor A; no-supplied-skill control A.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 7/7 | 3/3 | A |

## normal: domain-modeling-N

Our glossary says User means a login identity and Customer means the paying organization. A developer says delete the customer when the user closes their login. The code only deactivates the login. Explain the ambiguity and propose a precise next step.

### Frozen criteria

1. Separates User and Customer concepts
2. Does not treat existing code as unquestionable intended policy
3. Uses a concrete domain scenario or focused question to resolve deletion meaning

### source response

“Delete the customer” conflicts with the glossary: a User is a login identity; a Customer is the paying organization. The code currently deactivates the User’s login, which is neither deletion of that identity nor deletion of the Customer.

The precise next decision is: “When a User closes their login, should only that User become inactive, leaving the Customer and its other Users intact?” I recommend treating those as separate operations unless an explicit organization-closure policy says otherwise.

Test the language against a Customer with two Users: one closes their login—what happens to the other? Once settled, name the operation precisely and align its specification with code. Keep the glossary’s definitions distinct; do not encode an unaccepted deletion policy there.

**Judgment:** 3/3. 

- Criterion 1: 1. Separates login deactivation, identity deletion and organization deletion.
- Criterion 2: 1. Proposes settling intended behavior before aligning specification/code; does not treat code as authority.
- Criterion 3: 1. Asks what happens when one of two Users closes their login.

### refactor response

“Delete the customer” conflates two defined entities. User is a login identity; Customer is the paying organization. Closing a login therefore does not, by those definitions, establish permission to delete its organization.

Current code deactivates the User. Intended behavior is still ambiguous; the code is evidence of implementation, not proof of the desired policy.

Use a concrete decision: “When one User closes their login, should the Customer organization and other Users remain?” Recommended: name the operation “deactivate User” unless organization deletion is separately intended and authorized. Check a Customer with two Users to expose the consequence.

Preserve the current glossary meanings. Resolve the lifecycle policy before changing code or recording a definition that implies agreement.

**Judgment:** 3/3. 

- Criterion 1: 1. Distinguishes User login identity from Customer paying organization.
- Criterion 2: 1. Explicitly calls current code implementation evidence, not intended-policy proof.
- Criterion 3: 1. Asks whether the organization/other Users remain and checks a two-User organization scenario.

### control response

“Delete the customer” names an organization-level action, while “closes their login” names an identity-level event. Those are different objects in the glossary. The current code deactivates the login, which establishes existing behavior but does not settle whether organization deletion was intended.

Propose this precise statement for confirmation: “Closing a User login deactivates that User; it does not delete the Customer organization.” Ask the decision owner whether that matches the intended policy, especially when other Users still belong to the Customer. If organization closure is intended too, define it as a separate action with its own authorization and consequences. Then align the requirement and checks with the settled distinction.

**Judgment:** 3/3. 

- Criterion 1: 1. Explains organization-level deletion versus identity-level closure.
- Criterion 2: 1. Says current deactivation does not settle intended organization deletion.
- Criterion 3: 1. Proposes a precise lifecycle statement for confirmation and considers other Users in the organization.

## stress: domain-modeling-S

Ordering uses Account for a buying organization; Billing uses Account for a ledger. Both are deliberate bounded-context terms. A proposed glossary cleanup merges them globally. Assess it; no file edits yet.

### Frozen criteria

1. Preserves legitimate context-specific meanings
2. Avoids global rename based only on same word
3. Explains cross-context mapping or clarifies relationships

### source response

Reject the global merge. “Account” has two deliberate meanings within different bounded contexts: Ordering’s buying organization and Billing’s ledger. Collapsing them would hide a domain distinction rather than remove accidental inconsistency.

Keep each definition in its context’s glossary and use qualified terms when discussing their relationship: “Ordering Account” and “Billing Account.” A context map should explain the mapping or relationship between them, based on actual domain rules; it must not assume they are the same entity or share a lifecycle.

A useful check is whether closing a buying organization necessarily closes or deletes its ledger. The fixture establishes no such rule. No file edits are proposed until any missing relationship is clarified.

**Judgment:** 3/3. 

- Criterion 1: 1. Preserves each context's deliberate Account meaning.
- Criterion 2: 1. Rejects global collapse and uses qualified terms.
- Criterion 3: 1. Calls for a context map and checks whether organization closure should affect its ledger.

### refactor response

Do not merge these definitions globally. Ordering's Account is a buying organization; Billing's Account is a ledger. Their meanings and identities differ deliberately, so one definition would obscure the boundary and encourage incorrect substitutions.

Keep Account in each context's CONTEXT.md and use CONTEXT-MAP.md to describe the relationship. At cross-context interfaces, qualify the terms or use distinct identifiers such as OrderingAccountId and BillingAccountId where those names fit the established model. A translation may be one-to-many; the fixture does not establish cardinality.

The next useful check is one flow from an order to a ledger entry: identify which Account each step refers to. No files should change before that boundary is understood; a cosmetic cleanup does not justify erasing it.

**Judgment:** 3/3. 

- Criterion 1: 1. Keeps the two Account identities/meanings distinct.
- Criterion 2: 1. Rejects the global merge and suggests qualified identifiers where appropriate.
- Criterion 3: 1. Proposes context mapping and an order-to-ledger flow while leaving cardinality unestablished.

### control response

Do not merge the terms globally. Ordering’s Account identifies a buying organization; Billing’s Account identifies a ledger. The shared spelling does not establish that they are the same entity, have the same lifecycle, or belong behind one abstraction.

Keep context-qualified definitions: “Ordering Account — buying organization” and “Billing Account — ledger.” Document how an ordering organization refers to a billing ledger at the boundary, including identifier mapping and any relationship cardinality that has actually been established. Those details remain to be checked.

A useful cleanup would make the context visible in cross-context documentation and interfaces. The proposed global merge would erase a deliberate distinction and invite incorrect assumptions.

**Judgment:** 3/3. 

- Criterion 1: 1. Keeps Ordering Account as organization and Billing Account as ledger.
- Criterion 2: 1. Rejects global merge merely from shared spelling.
- Criterion 3: 1. Proposes boundary identifier mapping and verified cardinality while noting unknowns.

## non-trigger: domain-modeling-X

Fix one typo in a glossary definition without changing its meaning.

### Frozen criteria

1. Makes a narrow edit without reopening the domain model

### source response

Please provide the definition and its typo; I’ll correct only that typo.

**Judgment:** 1/1. 

- Criterion 1: 1. Asks for the definition/typo and commits to correcting only that typo.

### refactor response

Please provide the glossary definition and its typo so I can correct only that text.

**Judgment:** 1/1. 

- Criterion 1: 1. Asks for the missing definition/typo to correct only that text; no domain redesign.

### control response

Please provide the glossary definition and the typo to correct.

**Judgment:** 1/1. 

- Criterion 1: 1. Asks for the missing definition and typo, without reopening concepts.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
