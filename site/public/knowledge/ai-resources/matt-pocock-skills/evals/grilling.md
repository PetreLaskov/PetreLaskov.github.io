# Development evaluation: grilling

**Case-bound grades:** source A; refactor A; no-supplied-skill control C.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 6/7 | 2/3 | C |

## normal: grilling-N

Grill my plan for a shared equipment booking app. We have not decided whether bookings are requests requiring approval or immediately confirmed. Capacity rules depend on that choice. The repository can reveal the current authentication provider. Give the first useful round.

### Frozen criteria

1. Asks the approval-model decision before dependent capacity questions
2. Does not ask user to identify inspectable authentication facts
3. Offers a reasoned recommendation while leaving the decision to the user

### source response

❓ **Q1 — What does submitting a booking mean?** Does it immediately reserve the equipment, or create a request that an approver can accept or reject?

➡️ I recommend immediate confirmation if there is no separate eligibility or allocation judgment an approver must make. If approval serves a real policy need, choose requests and name that judgment. This choice must come first: capacity accounting and conflicting-request behavior depend on it.

I’ll defer those dependent questions until you choose. The authentication provider is a repository fact, so it belongs in a repository inspection rather than a question to you. In this text-only fixture it remains unverified; I have not inspected the repository.

**Judgment:** 3/3. 

- Criterion 1: 1. Asks what submitting a booking means and defers dependent questions 'until you choose.'
- Criterion 2: 1. Directs authentication to repository inspection and explicitly says it has not inspected the repository.
- Criterion 3: 1. Recommends immediate confirmation absent a separate eligibility or allocation judgment, while leaving a real approval-policy choice to the user.

### refactor response

❓ Q1 — Booking commitment: Does submitting a booking immediately reserve equipment, or create a request an approver can decline?

➡️ Recommended: immediate confirmation, provided eligible users may reserve available equipment without case-by-case approval. That gives users a dependable reservation immediately. Choose approval if suitability or allocation requires human judgment; then a pending request must not look confirmed.

This is the first dependency: capacity and competing-request rules follow from the answer, so I will hold those questions.

The authentication provider is a repository fact to inspect, not a choice for you to guess. No repository inspection is available in this fixture, so it remains unverified and does not block this policy decision.

**Judgment:** 3/3. 

- Criterion 1: 1. Asks booking commitment first and says capacity questions will be held until the answer.
- Criterion 2: 1. Says the authentication provider is a repository fact to inspect, not something for the user to guess.
- Criterion 3: 1. Recommends immediate confirmation for eligible self-service reservations because it gives a dependable reservation; leaves approval available when human judgment is needed.

### control response

First decision: when someone books an available item, are they making a request or receiving a confirmed reservation? What promise should the confirmation screen make?

Test that choice with one scarce item and two overlapping attempts. If bookings require approval, does a pending request reserve capacity, and who decides between competing requests? If bookings are immediate, should the second person be rejected or offered another time? These are different capacity policies, so choose the booking promise before designing the capacity rule.

The authentication provider is a repository fact we can inspect later; it does not need to consume this decision round.

**Judgment:** 2/3. Dependency-order credit follows the assertion's stated order: the decision is asked first, although dependent questions are bundled into the same round.

- Criterion 1: 1. Opens with 'First decision' and asks request versus confirmed reservation before conditional capacity questions; explicitly says choose the booking promise before the capacity rule.
- Criterion 2: 1. Calls authentication 'a repository fact we can inspect later' and does not ask the user to identify it.
- Criterion 3: 0. No booking model is recommended; the response poses alternatives and consequences without choosing a reasoned starting recommendation.

## stress: grilling-S

We already settled immediate booking, single-item capacity, and email login. I have ten minutes and want you to stress-test only cancellation policy. Do not reopen the settled choices. Give the next round.

### Frozen criteria

1. Targets consequential cancellation questions
2. Preserves settled decisions
3. Respects the focused scope without pretending all project decisions are resolved

### source response

❓ **Q1 — Cancellation cutoff:** May the person who booked cancel at any time before the booking begins, or is advance notice required?

➡️ I recommend allowing cancellation until the start; require a notice period only if preparation or staffing makes late cancellation costly.

---

❓ **Q2 — Operator cancellation:** May an equipment manager cancel a confirmed booking when the item becomes unavailable?

➡️ I recommend yes, with a stated reason and a notification to the affected person.

These are the first policy choices for our ten-minute session. Once answered, we can test the resulting rules against a last-minute cancellation and a booking already in progress. Immediate booking, single-item capacity, and email login remain settled.

**Judgment:** 3/3. 

- Criterion 1: 1. Asks the cancellation cutoff and operator cancellation authority, with consequences for staffing and unavailable equipment.
- Criterion 2: 1. Explicitly states immediate booking, single-item capacity, and email login remain settled.
- Criterion 3: 1. Calls these the first policy choices for the ten-minute session and reserves further cancellation stress cases.

### refactor response

Keeping immediate booking, single-item capacity, and email login settled, these cancellation questions are ready:

❓ Q1 — Cutoff: Can a holder cancel until the booking starts, or is earlier notice required?
➡️ Recommended: allow cancellation until start, so unused equipment can return to availability. Choose an earlier cutoff only if preparation creates a real cost.

❓ Q2 — Authority: Who besides the holder may cancel?
➡️ Recommended: a designated administrator, with a recorded reason and notice to the holder, for unavailable or unsafe equipment.

❓ Q3 — Release: When does cancellation free capacity?
➡️ Recommended: when cancellation is confirmed, atomically, so another user can book it immediately.

Late cancellation and no-show treatment depend on Q1; I will leave them for the next round.

**Judgment:** 3/3. 

- Criterion 1: 1. Asks cutoff, authority, and when capacity is released, each with a policy recommendation.
- Criterion 2: 1. Begins by keeping immediate booking, single-item capacity, and email login settled.
- Criterion 3: 1. Limits the round to cancellation and leaves late cancellation/no-show treatment for a later dependent round.

### control response

Focus on the moment cancellation releases the item. If someone cancels ten minutes before a booking starts, may another person book it immediately? What changes once the booking has started or the item has been collected?

My proposed starting policy: the booking owner can cancel before its start, capacity becomes available immediately, and the owner receives confirmation. After the start, use a separate return or administrator action because cancelling a record does not establish that equipment is available.

Stress case: cancellation and a new booking arrive together. The system must avoid both retaining a cancelled reservation and confirming overlapping reservations. Which cutoff or exception would make that proposal unacceptable?

**Judgment:** 3/3. 

- Criterion 1: 1. Asks when cancellation releases capacity, including near-start, already-started, and collected-equipment cases.
- Criterion 2: 1. Assumes immediate rebooking and single-item exclusivity; does not reopen booking model, capacity model, or login.
- Criterion 3: 1. Stays with cancellation timing, availability, and races; its 'proposed starting policy' does not claim all project decisions are settled.

## non-trigger: grilling-X

What is 17 multiplied by 6? Give just the number.

### Frozen criteria

1. Answers 102 without grilling

### source response

102

**Judgment:** 1/1. 

- Criterion 1: 1. Returns exactly '102'.

### refactor response

102

**Judgment:** 1/1. 

- Criterion 1: 1. Returns exactly '102'.

### control response

102

**Judgment:** 1/1. 

- Criterion 1: 1. Returns exactly '102'.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
