# Development evaluation: to-questionnaire

**Case-bound grades:** source A; refactor A; no-supplied-skill control A.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 7/7 | 3/3 | A |

## normal: to-questionnaire-N

Draft a questionnaire to our volunteer treasurer. I need to decide whether we can rent a room next month; only she knows unrestricted funds and recurring commitments. We already know recipient and purpose. Keep it easy to answer and do not send it.

### Frozen criteria

1. Targets the treasurer knowledge gap and decision
2. Avoids re-interviewing user about known recipient/purpose
3. Includes answer space and permits uncertainty without sending

### source response

# Can we afford a room next month?

**Purpose:** Decide whether room rental fits our available funds.
**From:** The organizer. **To:** The volunteer treasurer.
**Use:** Inform the rental decision; this does not authorize spending.

**Context:** We are considering a room next month and need to distinguish spendable funds from money already committed.

**How to answer:** Estimates and partial answers are useful; mark uncertainty. Deadline and completion time have not been agreed.

1. What unrestricted funds are available for next month?
   > Amount/currency:
2. What recurring commitments must those funds cover?
   > Amounts and due dates:
3. Are any other unavoidable costs due next month?
   > Costs:
4. What amount, if any, could safely go toward a room?
   > Amount and assumptions:
5. Anything else we should know?
   >

Draft only; not sent.

**Judgment:** 3/3. 

- Criterion 1: 1. Questions cover unrestricted funds, recurring commitments, other unavoidable costs, and feasible room spending next month.
- Criterion 2: 1. Directly addresses the known volunteer treasurer and room-rental decision instead of re-interviewing the user.
- Criterion 3: 1. Provides amount/answer spaces, welcomes estimates/partial answers and uncertainty, and says draft only, not sent.

### refactor response

Draft questionnaire — Room rental next month

From: the organizer
To: volunteer treasurer
Purpose: decide whether we can afford a room next month. Your answers will inform the rental decision.

Please use current figures where available; label estimates. Brief answers, partial answers, and “I don't know” are welcome. Estimated effort: a few minutes if figures are at hand; no deadline is specified.

1. How much unrestricted money is available now?
Answer:

2. What recurring commitments must those funds cover through next month?
Answer:

3. Are there known one-off payments or other limits on spending next month?
Answer:

4. What amount, if any, could safely be allocated to room rental?
Answer:

5. What else should we know?
Answer:

Draft only; not sent.

**Judgment:** 3/3. 

- Criterion 1: 1. Asks unrestricted money, commitments through next month, one-off limits, and safe room allocation.
- Criterion 2: 1. Uses the known treasurer recipient and rental purpose directly.
- Criterion 3: 1. Provides Answer fields, permits estimates/partial answers/'I don't know', and says not sent.

### control response

Draft for the volunteer treasurer:

We’re deciding whether we can afford to rent a room next month. Could you fill in the figures below? Estimates are fine if marked as estimates.

- Unrestricted funds currently available: ___
- Confirmed unrestricted income expected before rent is due: ___
- Recurring commitments due next month, with amounts: ___
- Other committed payments or a reserve we need to retain: ___
- Based on those figures, the maximum room cost you think we could safely commit to: ___
- Any uncertainty that could change that amount: ___

Please exclude restricted funds from the available total. If a figure is unknown, “unknown” is useful. This is a draft and has not been sent.

**Judgment:** 3/3. 

- Criterion 1: 1. Targets unrestricted funds/income, commitments/reserve, and safe maximum room cost.
- Criterion 2: 1. Directly drafts for the volunteer treasurer with the established room-rental purpose.
- Criterion 3: 1. Uses blank answer spaces, accepts estimates and unknowns, and explicitly says draft not sent.

## stress: to-questionnaire-S

We need a questionnaire but deadline and available completion time have not been agreed. Draft around confirmed purpose and avoid making promises on my behalf.

### Frozen criteria

1. Does not invent a deadline or promised effort
2. Marks missing logistics or omits them transparently
3. Still produces useful focused questions

### source response

# Discovery questionnaire — draft

**Purpose:** [Insert the confirmed decision this questionnaire must inform.]
**From:** [User]. **To:** [Confirmed recipient].
**Use:** Inform the stated decision; no further commitment is implied.

**Context:** [Briefly state the confirmed situation and the information gap.]

**How to answer:** Partial answers and “I don’t know” are useful. Flag estimates and uncertainty. Deadline and expected completion time are not yet agreed.

1. What information do you have that bears directly on this decision?
   > Answer:
2. Which constraints must the decision respect?
   > Answer:
3. Which uncertainties would materially change the answer?
   > Answer:
4. Anything else we should know?
   > Answer:

The fixture does not supply the actual purpose or recipient, so those remain placeholders. No response deadline or time promise has been made on your behalf.

**Judgment:** 3/3. Specific tailoring cannot be evidenced because the packet omits the purpose; the response transparently supplies a focused template.

- Criterion 1: 1. Says deadline and expected completion time are not agreed; makes no time promise.
- Criterion 2: 1. Clearly labels purpose, recipient, and context as placeholders and discloses absent logistics.
- Criterion 3: 1. Questions target decision-relevant information, constraints, and uncertainties.

### refactor response

Draft questionnaire

From: [sender]
To: [recipient]
Purpose: [insert the confirmed decision and how these answers will inform it].

Please answer briefly in the spaces below. Estimates, partial answers, and “I don't know” are welcome. No deadline or agreed completion-time budget has been set.

1. What information do you hold that directly determines this decision?
Answer:

2. What commitments or constraints could change the answer?
Answer:

3. Which figures or statements are estimates, and what remains uncertain?
Answer:

4. What else should we know?
Answer:

The fixture does not include the actual confirmed purpose or recipient, so those remain explicit placeholders rather than invented facts. Before sending, tailor the questions to that purpose and agree any deadline or time commitment. Nothing has been sent.

**Judgment:** 3/3. The packet provides no actual purpose; generic decision-focused questions and explicit placeholders satisfy the assertion without invented context.

- Criterion 1: 1. Explicitly states no deadline or agreed completion-time budget is set.
- Criterion 2: 1. Marks purpose/recipient placeholders and missing logistics instead of inventing them.
- Criterion 3: 1. Asks for decision-determining information, constraints, uncertainty, and other relevant facts.

### control response

Draft template:

“We’re gathering information to support [confirmed decision or purpose]. Please answer the questions you can and mark anything unknown or uncertain.

1. What facts or figures do you hold that are directly relevant to this decision?
2. Which existing commitments or constraints should we account for?
3. Which estimates or unknowns could materially change the answer?
4. Is there an existing record we should consult rather than asking you to recreate it?”

The actual purpose is not stated in this fixture, so it remains a placeholder rather than an invented commitment. Deadline and expected completion time are not agreed; omit promises about both from the draft and settle them before sending. Nothing has been sent.

**Judgment:** 3/3. The questions are necessarily generic because the prompt supplies no concrete purpose, and the response discloses that limitation.

- Criterion 1: 1. Explicitly omits deadline and effort promises.
- Criterion 2: 1. Explains that actual purpose is unstated and logistics must be agreed before sending.
- Criterion 3: 1. Asks facts/figures, commitments, impactful unknowns, and existing records relevant to the decision.

## non-trigger: to-questionnaire-X

Answer this factual question from the supplied table yourself; no other person is needed.

### Frozen criteria

1. Does not turn available evidence into an external questionnaire

### source response

Please provide the table and the factual question.

**Judgment:** 1/1. 

- Criterion 1: 1. Requests the missing table and question, with no external questionnaire.

### refactor response

Please provide the table and factual question; neither is included here.

**Judgment:** 1/1. 

- Criterion 1: 1. Requests the table and factual question because neither is included, without involving another person.

### control response

Please provide the table and the factual question to answer.

**Judgment:** 1/1. 

- Criterion 1: 1. Requests the missing table and factual question, without an external questionnaire.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
