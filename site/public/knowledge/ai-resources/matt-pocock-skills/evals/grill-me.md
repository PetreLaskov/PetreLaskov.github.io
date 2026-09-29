# Development evaluation: grill-me

**Case-bound grades:** source A; refactor A; no-supplied-skill control B.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 6.5/7 | 2/3 | B |

## normal: grill-me-N

Grill me on whether to run a six-week reading group. The decision is whether I will commit to hosting; budget and attendance are still unknown. No files are needed. Give the opening exchange.

### Frozen criteria

1. Uses a dependency-aware interview
2. Makes recommendations without deciding for the user
3. Does not create documents or assume a software project

### source response

❓ **Q1 — What would make hosting worthwhile?** At the end of six weeks, what would need to have happened for you to feel that hosting was worth the effort?

➡️ I recommend naming one concrete benefit—such as completing a reading practice with a small, returning group—before deciding how large or elaborate to make it.

---

❓ **Q2 — What can you reliably commit?** What weekly preparation and hosting time, and what personal spending limit, could you sustain for all six weeks?

➡️ I recommend setting those limits before inviting people. Attendance and a workable budget can then be tested against them, rather than turning unknown demand into an open-ended commitment.

**Judgment:** 3/3. 

- Criterion 1: 1. Asks the desired benefit before sustainable time/spending limits, then tests unknown demand against those limits.
- Criterion 2: 1. Says 'I recommend' naming a benefit and limits; the hosting decision remains with the user.
- Criterion 3: 1. Provides only a conversational opening and makes no document or software-project proposal.

### refactor response

Let's test the decision to host, rather than design the entire group.

❓ Q1 — Personal commitment: What weekly time ceiling would let you complete all six weeks even if enthusiasm dips?
➡️ Recommended: set a firm preparation-plus-hosting limit before committing. If the group cannot fit it, simplify the format.

❓ Q2 — Minimum viable group: Would you still want to host if only two people attended?
➡️ Recommended: choose your minimum worthwhile attendance, then seek expressions of interest before an unconditional commitment.

❓ Q3 — Financial exposure: Are you willing to host only if costs stay within an explicit cap?
➡️ Recommended: yes; use a free format as the initial option.

“I don't know” is useful here: it identifies the small inquiry needed before deciding.

**Judgment:** 3/3. 

- Criterion 1: 1. Begins with a sustainable weekly ceiling, then tests minimum attendance and financial exposure before commitment.
- Criterion 2: 1. Recommends a firm time limit, attendance threshold, and cost cap while asking the user to choose.
- Criterion 3: 1. Stays with the hosting decision; no documents, repository work, or software assumptions appear.

### control response

Before committing to six weeks, what would make hosting worth the effort for you: sustained reading, conversation, meeting people, or something else? Pick the main outcome.

Then set a boundary: how much preparation and hosting time can you reliably give each week, including a week when attendance is disappointing? Budget and attendance are unknown, so neither should quietly become an unlimited commitment.

For a concrete test, imagine only three people attend the first two sessions and you spend two hours preparing each one. Would you still want to finish all six weeks? Your answer will help establish the minimum conditions for saying yes.

**Judgment:** 3/3. 

- Criterion 1: 1. Asks the main outcome, then available time, then tests a low-attendance scenario against those conditions.
- Criterion 2: 1. Proposes boundaries and a concrete commitment test without answering whether the user should host.
- Criterion 3: 1. Contains only questions and decision framing, with no files or software work.

## stress: grill-me-S

I am in a repository but want a private, stateless conversation about a reading group. Grill me for the next decision only; save nothing. I already chose six weeks.

### Frozen criteria

1. Honors stateless scope despite repository presence
2. Does not re-ask duration
3. Asks a consequential next decision with a recommendation

### source response

❓ **Q1 — What is your hosting limit?** With six weeks already chosen, how much time per week can you reliably commit to preparation and hosting?

➡️ I recommend a firm weekly ceiling that leaves room for a difficult week. The next choice should fit that ceiling; we need not choose readings, group size, or meeting format yet.

This stays a private conversation with no saved notes or repository changes. Being in a repository does not change your request. I will wait for this answer before moving to decisions that depend on it; the six-week duration is already settled.

**Judgment:** 3/3. 

- Criterion 1: 1. Explicitly says 'no saved notes or repository changes' and confines the exchange to conversation.
- Criterion 2: 1. 'With six weeks already chosen' treats duration as settled.
- Criterion 3: 1. Asks the sustainable weekly hosting limit and recommends a firm ceiling before dependent decisions.

### refactor response

Six weeks is settled. This stays in conversation; nothing will be saved.

❓ Q1 — Hosting commitment: What condition must be met before you say yes to hosting those six weeks?

➡️ Recommended: commit only if you can name a sustainable weekly time limit and the group can fit within it. A recurring event can look small while preparation and coordination consume the spare time around it.

Start with the constraint you would actually defend on a difficult week: what is the maximum total time you will give it? We can test the format against that answer next. Repository contents are irrelevant to this private decision.

**Judgment:** 3/3. 

- Criterion 1: 1. Says 'nothing will be saved' and makes repository contents irrelevant to the private decision.
- Criterion 2: 1. 'Six weeks is settled' does not reopen duration.
- Criterion 3: 1. Asks the condition for hosting and recommends a sustainable weekly time limit.

### control response

With six weeks settled, the next decision is the weekly commitment you are willing to make. What is your maximum total time for preparation, invitations, hosting, and follow-up each week?

Test it against a difficult week: you have little energy, one person cancels, and nobody else has prepared. Would you shorten the session, reduce preparation, ask someone to co-host, or cancel that meeting? Choose the fallback you could actually use without feeling you have broken your commitment.

We can keep this discussion in chat without creating project files. Repository presence does not change the decision or require documentation.

**Judgment:** 2.5/3. The next decision is useful, but the required recommendation is only implicit in focusing on a time limit.

- Criterion 1: 1. Says to keep discussion in chat without project files; repository presence does not require documentation.
- Criterion 2: 1. 'With six weeks settled' accepts the chosen duration.
- Criterion 3: 0.5. Asks a consequential weekly limit and fallback, but offers no clear recommendation among the fallback choices.

## non-trigger: grill-me-X

Summarize this complete plan in one sentence: six people will read one essay each Thursday for six weeks.

### Frozen criteria

1. Summarizes rather than interviewing

### source response

Six people will meet each Thursday for six weeks to read one essay.

**Judgment:** 1/1. 

- Criterion 1: 1. Gives a one-sentence summary and no interview.

### refactor response

Six people will meet each Thursday for six weeks to read one essay.

**Judgment:** 1/1. 

- Criterion 1: 1. Summarizes the plan in one sentence without starting an interview.

### control response

Six people will meet each Thursday for six weeks to read one essay.

**Judgment:** 1/1. 

- Criterion 1: 1. Summarizes the six-person, Thursday, six-week essay plan in one sentence; asks no questions.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.

<!-- POST-TRIAL -->
# Later targeted evidence

These post-review text probes are distinct from the first comparison above. They test the stated local behavior and do not establish a collaboration gain or live execution.

## preference-probes-01

**Input:** Help revise my homepage introduction. The draft says: "I create innovative solutions and share transformative insights." It feels polished and distant, but I do not yet know what "more me" means. The only approved facts are that I build small tools, write essays, and share notes. Give me something concrete to react to. I have not selected a direction yet.

**Actual response:**

My working guess is that the distance comes from the broad claims—“innovative” and “transformative”—rather than from anything missing about your work. Here are two concrete introductions with the same facts:

**A — Start with you**
> I build small tools, write essays, and share notes.

**B — Start with the visitor**
> Here you’ll find the small tools I build, the essays I write, and the notes I share.

A is shorter and more direct. B gives the reader a little more orientation, at the cost of a longer sentence. Neither needs a claim about how impressive the work is.

Which feels closer, and which specific phrase would you keep or reject? A hybrid is available if you like A’s brevity and B’s welcome.

Until you’ve reacted, I’d use A as a provisional starting point. The local working rule would be: name the work plainly before describing its significance. Applied to a nearby homepage heading, that gives “Tools, essays, and notes.” That is a proposal to test here, not a settled rule for your voice.

**Independent judgment:** 3/3. The alternatives are modest but interpretable and usable. The provisional recommendation does not claim that the user has selected a direction or has a stable preference.

- Produces usable contrasting examples, holding approved facts steady. **1.** Provides two ready-to-use introductions: 'I build small tools, write essays, and share notes' and 'Here you'll find the small tools I build, the essays I write, and the notes I share.' Both retain exactly the three approved activities while changing the point of address.
- Names an interpretable contrast and invites a concrete reaction. **1.** Labels the contrast 'Start with you' versus 'Start with the visitor,' explains brevity/directness versus reader orientation, and asks which feels closer and which specific phrase to keep or reject.
- Does not invent biography or treat an unchosen direction as a known stable preference. **1.** Introduces its diagnosis as a 'working guess,' uses no additional biography, and explicitly calls A a 'provisional starting point' and the local rule 'a proposal to test here, not a settled rule for your voice.'
