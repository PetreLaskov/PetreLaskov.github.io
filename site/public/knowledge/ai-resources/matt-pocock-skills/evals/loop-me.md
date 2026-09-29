# Development evaluation: loop-me

**Case-bound grades:** source A; refactor A; no-supplied-skill control A.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 7/7 | 3/3 | A |

## normal: loop-me-N

Help specify a recurring workflow: when a customer sends a receipt PDF, extract totals into a draft ledger; a human approves ambiguous entries. We have not chosen tools. Give a useful draft and the key unresolved decisions; do not schedule it.

### Frozen criteria

1. Specifies event trigger, output, and ambiguity checkpoint
2. Keeps tool choices unresolved instead of mandatory AI/schedule
3. Does not claim automation was created

### source response

Draft workflow: receipt PDF to draft ledger.

Trigger: a customer sends a receipt PDF. Extract the receipt’s totals and prepare draft ledger entries linked to their source receipt. Where an entry is ambiguous, present a short review brief with the proposed value, the source location, and the reason for uncertainty. The human approves or corrects it before that ambiguity is treated as resolved.

Open decisions:
1. Which channel receives PDFs, and which ledger is the destination? Recommend reusing the current channel and ledger.
2. Which totals and currency fields are required? Recommend defining the minimum required ledger fields.
3. What counts as ambiguity, and who reviews it? Recommend explicit criteria and one responsible reviewer.

Tools, duplicate handling, and failure recovery still need definition. This is an incomplete spec; nothing is scheduled.

**Judgment:** 3/3. 

- Criterion 1: 1. Defines PDF trigger, draft ledger entries, and source/reason review briefs for human approval/correction.
- Criterion 2: 1. Keeps channel, ledger, fields, ambiguity and tools open; mandates neither AI nor scheduling.
- Criterion 3: 1. Says nothing is scheduled.

### refactor response

Draft workflow — Receipt totals to draft ledger

Trigger: a customer sends a receipt PDF through the chosen intake channel.
Input: the PDF plus a stable receipt identifier.
Outcome: extract the total and supporting source location into a draft ledger entry, linked to the receipt.
Checkpoint: ambiguous or conflicting totals go to a human with the candidate values and relevant receipt excerpt. Do not finalize those entries automatically.

Ordinary run: one clear total produces a traceable draft.
Awkward run: multiple totals or an unreadable scan produces a review item, without guessing.

Unresolved: intake and ledger destinations, required fields/currency, duplicate handling, what counts as ambiguous, and review ownership. Tools remain unchosen. This is a specification draft; no schedule or automation has been activated.

**Judgment:** 3/3. 

- Criterion 1: 1. Defines customer-PDF arrival, source-linked draft ledger output, and human review of ambiguous totals.
- Criterion 2: 1. Lists intake, destination and review decisions as unresolved and explicitly leaves tools unchosen.
- Criterion 3: 1. Calls this a specification draft with no schedule or automation activated.

### control response

Draft workflow: when an authorized customer receipt PDF arrives, create a draft entry containing the source reference, supplier/date where available, total, currency, and any detected tax. Preserve the receipt as evidence. Mark uncertain or conflicting fields for human review; ambiguous entries remain unapproved until a person resolves them. Record approval separately from extraction.

Prevent repeat processing from creating duplicate ledger entries, and retain a clear failure state for unreadable PDFs.

Unresolved decisions: receipt intake channel, permitted tools and storage, ledger destination and field schema, duplicate detection, the definition of ambiguity, reviewer ownership, and whether all entries or only flagged entries need approval. Nothing is scheduled or connected by this draft.

**Judgment:** 3/3. 

- Criterion 1: 1. Defines receipt arrival, draft fields/evidence, and separately recorded human resolution of ambiguity.
- Criterion 2: 1. Lists tools/storage/intake/ledger/schema/review as unresolved.
- Criterion 3: 1. Says nothing is scheduled or connected by the draft.

## stress: loop-me-S

This repeated task saves 30 seconds weekly but takes an hour to check when automation fails. The user asks whether it deserves a workflow at all. Evaluate the bet and suggest the simplest viable alternative.

### Frozen criteria

1. Accounts for monitoring/recovery overhead
2. Can recommend retaining manual work
3. Does not infer that every repeated behavior merits automation

### source response

I would not automate this task on the supplied numbers. Thirty seconds saved each week is about 26 minutes a year; one failure that costs an hour to check consumes more than two years of those savings, before build and maintenance time.

The simplest viable alternative is to keep doing the task manually, with a short checklist or reusable template only if it reduces mistakes. A workflow specification should not become an obligation merely because the task repeats.

Reconsider automation only if the frequency or benefit grows, or failure detection and recovery become much cheaper. The failure rate is unknown, so we cannot calculate a precise expected return, but the present case is weak.

**Judgment:** 3/3. 

- Criterion 1: 1. Compares annual savings with failure checking plus build/maintenance and notes unknown failure rate.
- Criterion 2: 1. Directly recommends manual work, with a checklist/template only if useful.
- Criterion 3: 1. Says repetition creates no obligation to specify or automate a workflow.

### refactor response

The automation is a weak bet on these numbers. Thirty seconds weekly saves about 26 minutes a year; one hour-long failure consumes more than two years of those savings before counting setup or maintenance. The failure rate is unknown, so a precise expected return would be invented.

Keep the task manual with a short checklist or reusable template that removes the repetitive thinking. If a tiny deterministic shortcut is available and leaves an immediately visible result, that may be worthwhile, but it should not create a new recovery burden.

Do not build a workflow merely because the task recurs. Reconsider only if frequency, error cost, or recoverability changes enough to alter the tradeoff.

**Judgment:** 3/3. 

- Criterion 1: 1. Compares 26 minutes yearly savings to an hour of failure recovery and includes setup/maintenance.
- Criterion 2: 1. Recommends manual work with a checklist or reusable template.
- Criterion 3: 1. Says recurrence alone is insufficient and conditions reconsideration on a changed tradeoff.

### control response

This is a weak automation bet on the supplied numbers. Saving 30 seconds each week saves about 26 minutes per year. One hour spent checking a failure consumes more than two years of those savings, before counting setup or routine maintenance.

Keep the task manual unless automation supplies another material benefit, such as avoiding a costly error. Use a short checklist or reusable template so the weekly action stays easy and predictable. If repetition still bothers you, consider a small user-triggered shortcut with an immediately visible result and a simple manual fallback.

A recurring workflow becomes worth reconsidering only if frequency, time saved, reliability, or the value of error prevention changes substantially.

**Judgment:** 3/3. 

- Criterion 1: 1. Calculates 26 minutes yearly savings versus over two years lost to one failure, plus setup/maintenance.
- Criterion 2: 1. Recommends keeping the task manual unless another material benefit exists.
- Criterion 3: 1. Makes reconsideration depend on frequency, reliability or error-prevention value.

## non-trigger: loop-me-X

Add 3 and 4 once.

### Frozen criteria

1. Answers 7 without designing a recurring workflow

### source response

7

**Judgment:** 1/1. 

- Criterion 1: 1. Answers 7 only.

### refactor response

7

**Judgment:** 1/1. 

- Criterion 1: 1. Answers 7 only.

### control response

7

**Judgment:** 1/1. 

- Criterion 1: 1. Answers 7 only.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
