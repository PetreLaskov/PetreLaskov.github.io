# Triage — turn incoming claims into an actionable next state

**Study question:** what must be true before a report is ready for someone to act on?

## Understand the original

Triage is the incoming-work lane. It takes raw reports, feature requests, and optionally external pull requests, then produces an agent brief, a specific information request, a human action, or a recorded rejection. It is not a second planning pass over tickets already produced by to-tickets. Those are supposed to arrive ready for execution. [S1]

The source uses two category roles—bug and enhancement—and five state roles: needs-triage, needs-info, ready-for-agent, ready-for-human, and wontfix. The names are canonical meanings; a repository can map them to different label strings. Every triaged item should have exactly one category and one state. That invariant makes queries understandable and prevents contradictory labels from becoming the apparent truth.

Discovery is deliberately cheap. It lists unlabeled items, items awaiting triage, and information-waiting items with new reporter activity, oldest first. The maintainer selects what to examine. The selected item then gets full reading: body, comments, labels, author, dates, and diff for a PR. Prior notes prevent resolved questions from being asked again. The source also searches for existing implementation by domain concept and checks prior rejected concepts. [S2]

Before writing an agent-ready brief, the claim is verified. A bug should reproduce from the reporter's steps; a PR should be checked against what it claims. The brief then becomes the execution contract, with current behavior, desired behavior, important interfaces, acceptance criteria, and explicit exclusions. For a PR, it describes the remaining work on the existing diff rather than pretending no code exists. [S3]

## A worked example

An external report says, “Export loses the last item.” The body includes a screenshot, but a later comment explains that it happens only when the list is filtered and sorted newest-first. A listing view may show the title and body without that comment. If the agent triages from the listing, it can write a confident but wrong brief about general pagination.

A proper pass reads the full thread, reproduces the filtered export, and identifies whether the missing item is absent from the export or merely displayed elsewhere. It searches for an existing fix by the concept of filtered export, not just the words “last item.” Suppose a previous commit already corrects the problem on the current branch but the reporter is using an older release. The outcome is an explanation pointing to the implemented behavior, not a rejection entry claiming filtered exports are unsupported.

Now imagine an enhancement request for scheduled exports. A prior rejection says the application intentionally does not run background jobs. The new request might be the same concept, or it might propose client-side reminders that do not violate that constraint. Triage should surface the old reason and ask whether it still applies. Concept matching is a lead, not automatic closure.

If a contributor's PR implements most of scheduled exports but omits error reporting, the brief should preserve their working design and specify the missing behavior. “Build scheduled exports” would discard useful context and invite a replacement implementation. This is why “a PR is an issue with attached code” is a good simplifying model.

## What it gets right

The separation between discovery and adjudication is excellent. Cheap summaries help choose what deserves attention; they are not enough to decide what should happen. Reading comments is especially important because an issue's effective state often changes after its original body.

The role mapping is another sound abstraction. It lets a workflow preserve meaning while using a team's actual labels. The skill also distinguishes different reasons for closure. Already implemented, rejected bug, and rejected enhancement are not interchangeable. Only a rejected enhancement belongs in the out-of-scope concept record. Mixing implemented features into that record would poison future matching.

The strongest reason to retain the original is its durable brief format. Behavioral contracts age better than procedural instructions tied to line numbers. A fresh agent can explore the current code while still understanding what outcome is required. The original also marks AI-generated tracker comments explicitly, a source convention that the refactor preserves rather than quietly dropping.

## Criticism and limits

The five states do not fully describe execution. A ticket can be well specified and therefore ready-for-agent while still blocked by another issue. A completed implementation can remain open pending verification. The documentation describes these missing distinctions, but adding many canonical labels would change the source system substantially. The refactor keeps the small triage vocabulary and treats blockers and completion evidence as separate facts that execution queries must inspect. [S5]

Verification can also overgrow its purpose. Triage needs enough evidence to decide the next state, not necessarily a root cause. If a report cannot be reproduced quickly with available information, the honest result may be a specific needs-info request or a handoff to diagnosing-bugs. It should not manufacture a toy repro to call the issue confirmed. Conversely, “could not reproduce” does not mean “not a bug.”

The source's rejection memory automatically deletes or updates a concept file when the maintainer reconsiders. Deleting the only accessible rationale can lose valuable history. A better local practice is to mark the decision superseded and record what changed, while ensuring matching uses active status. Git history can preserve old files, but the active knowledge system should not imply the reason never existed. This is a deliberate change in policy, not a claim about the original.

Authorization needs contextual handling. An explicit instruction to move an issue can settle the state change; it should not trigger another redundant approval exchange. But a general request to inspect a backlog does not automatically authorize posting comments or closing issues. The refactor prepares concrete changes, applies those already authorized, and reports any remaining external action precisely.

## Porting bet and dependency cost

**Bet: conditional on real inbound work.** This is valuable for a public repository or a team receiving outside reports. If our tracker mostly contains our own plans, it adds little. Its falsifier is the quality of downstream execution: fewer repeated questions, fewer briefs based on stale comments, and fewer “ready” items that cannot actually start. Raw numbers of labels applied are not a useful outcome.

Dependencies include tracker configuration, label mapping, access to full item history, and enough repository context to verify claims. Optional external PR discovery requires a supported author filter, but an explicitly named PR should not be excluded just because its author is internal. Checking out a contributor's branch must preserve local work; a separate review checkout may be appropriate.

The agent-brief and out-of-scope references remain distinct because they solve different problems. One contracts future work; the other remembers why certain work was rejected. The refactor does not add a hard interview-question limit. The repository's out-of-scope rationale correctly distinguishes useful depth from repetitive low-value questioning. Scope and progress are better controls than a universal number. [S6]

## Refactor: readiness backed by evidence

The revised entrypoint clearly handles three requests: discover attention, triage a selected item, or apply an explicit state override. Selected items always receive full-context reading. Verification has a bounded purpose, and its result is recorded as confirmed, not reproduced under stated conditions, or insufficient information.

A ready brief includes its source, current evidence, desired outcome, acceptance, exclusions, and blockers. It may include stable non-normative locator hints while avoiding brittle edit instructions. Readiness does not mean unblocked, and a source comment that says “already fixed” must be reconciled before new work is assigned.

Applying outcomes uses the existing authorization and writes the source's AI attribution. State changes remove conflicting state labels, and a readback checks the resulting item. Partial failure is reported as partial; posting a brief successfully does not prove the label or closure also succeeded.

## Original proposal: Find the Unasked Question

The inspired proposal looks for a consequential question nobody has asked because everyone is working inside the same framing. This differs from ordinary clarification: it is not a request for more details about the proposed solution. It asks what omitted question could change whether the work should be done, what success means, or which constraint matters.

For the export report, the unasked question might be whether the exported file must represent the current filtered view or the whole dataset. For a proposed study system, it might be what the learner needs to do with the knowledge after reading. For a workflow automation, it might be whether the rare manual judgment is actually the valuable part.

The skill should offer a small number of high-impact questions with reasons and a recommendation, not a sprawling interrogation. It can answer factual questions itself from available evidence and reserve value choices for the user. The novelty claim is limited: reframing and assumption discovery are established practices. The proposal packages a disciplined omission search as a collaboration move.

Its cost is interruption. Its falsifier is whether answering the question changes a real decision or reveals a material risk. If the question merely sounds profound while leaving the task unchanged, it should be dropped. The skill must also accept that the user may intentionally choose the original framing.

## Study and transfer

1. Take an issue with later comments and compare the body-only recommendation to the full-thread recommendation.
2. Explain why already implemented must not enter rejection memory.
3. Write a PR brief that specifies only remaining work.
4. Name one unasked question that could change a decision, and one that would only delay it.

Read [diagnosing-bugs](diagnosing-bugs.md) for deeper causal work and [to-tickets](to-tickets.md) for planned work that should bypass triage. Triage earns its place by making the next action trustworthy, not by processing every item through the most elaborate conversation.

## Numbered semantic delta

1. **D1: Make inbound-work boundary and full per-item reading explicit.** Listing summaries are not enough to triage a selected item; generated tickets need no redundant pass. Tradeoff: Bulk triage requires real reading per item.

2. **D2: Distinguish specified readiness from blocked/actionable state without inventing a sixth canonical role.** A fully specified ticket can still depend on unfinished work. Tradeoff: Frontier consumers must inspect blocker facts.

3. **D3: Bound verification and reuse a reproduction handoff for deeper diagnosis.** Triage should not silently become a full bug investigation. Tradeoff: Some issues end in needs-info with explicit uncertainty.

4. **D4: Prepare and apply concrete changes under existing authorization, with readback.** Avoid both premature external writes and redundant permission loops. Tradeoff: The brief can remain prepared if posting is not authorized.

5. **D5: Preserve superseded rejection rationale with status/reconsideration instead of automatic deletion.** Changing a decision should not erase why it used to make sense. Tradeoff: The knowledge base needs an active/superseded distinction.

6. **P1: Omit Claude-only disable-model-invocation frontmatter while copying agents/openai.yaml explicit-only policy.** The target is Codex packaging; its metadata preserves invocation intent and the bundled validator accepts the supported frontmatter. Tradeoff: This package is not a byte-identical Claude entrypoint.

## Artifacts and evaluation

[Refactored skill](../refactored/triage/SKILL.md) · [Original proposal: find-the-unasked-question](../original-skills/find-the-unasked-question/SKILL.md) · [Exact source diff](../diffs/triage.diff) · [Independent evaluation](../evals/triage.md)

These are authored candidates, not installed skills. The linked independent evaluation records the actual text responses, case-bound grades and limitations. The design bet in this chapter is distinct from those observations. Source documentation issue reports are historical claims in the pinned bundle, not independently reproduced measurements.

## Source locators

- **S1:** [skills/engineering/triage/SKILL.md, lines 9-45](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/triage/SKILL.md#L9-L45) ([local snapshot](../source/skills/engineering/triage/SKILL.md)).
- **S2:** [skills/engineering/triage/SKILL.md, lines 56-112](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/triage/SKILL.md#L56-L112) ([local snapshot](../source/skills/engineering/triage/SKILL.md)).
- **S3:** [skills/engineering/triage/AGENT-BRIEF.md, lines 3-68](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/triage/AGENT-BRIEF.md#L3-L68) ([local snapshot](../source/skills/engineering/triage/AGENT-BRIEF.md)).
- **S4:** [skills/engineering/triage/OUT-OF-SCOPE.md, lines 60-105](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/triage/OUT-OF-SCOPE.md#L60-L105) ([local snapshot](../source/skills/engineering/triage/OUT-OF-SCOPE.md)).
- **S5:** [docs/engineering/triage.md, lines 65-86](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/docs/engineering/triage.md#L65-L86) ([local snapshot](../source/docs/engineering/triage.md)).
- **S6:** [out-of-scope/question-limits.md, lines 3-14](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/out-of-scope/question-limits.md#L3-L14) ([local snapshot](../source/out-of-scope/question-limits.md)).

## Supporting-resource disposition

- AGENT-BRIEF.md: **rewrite** — Preserve current/desired behavior, interfaces, acceptance, and exclusions; add evidence status, stable source pointers, and PR remaining-work treatment.
- OUT-OF-SCOPE.md: **rewrite** — Preserve one file per rejected concept and distinction from already implemented; retain superseded reasoning rather than automatically deleting history.
- agents/openai.yaml: **copy** — Preserve source UI metadata and invocation policy exactly.
- source/LICENSE: **copy** — Retain Matt Pocock MIT attribution in every refactored package.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **repair**. The refactor preserves evidence gathering, category/state separation, verification, durable briefs, and rejected-concept memory, but loses an explicit terminal action. The source closes every wontfix outcome after its reason-specific explanation. Candidate branches for already-implemented and rejected-bug items only direct explanation or pointers; the final apply paragraph does not restore closure. A run can therefore label and comment a rejected issue while leaving it open, contrary to the source's completed disposition. This is a concrete workflow omission, not a request for extra approval.

Explicitly close the selected issue/PR for an authorized terminal wontfix outcome after the explanation and required memory update; preserve a user's explicit label-only override.

Evidence: [source/skills/engineering/triage/SKILL.md:78-86](../source/skills/engineering/triage/SKILL.md), [source/skills/engineering/triage/OUT-OF-SCOPE.md:90-97](../source/skills/engineering/triage/OUT-OF-SCOPE.md); [evals/candidate-v1/triage/SKILL.md:29-37](../evals/candidate-v1/triage/SKILL.md), [evals/candidate-v1/triage/OUT-OF-SCOPE.md:9-9](../evals/candidate-v1/triage/OUT-OF-SCOPE.md). This is static inspection, not proof of a completed workflow.

**Repair:** the candidate now explicitly closes all authorized wontfix dispositions, while an explicit label-only request remains label-only. The initial text-trial grade applies to the archived candidate. [Targeted follow-up probes](../evals/FOLLOWUP-RESULTS.md) cover both scopes; they are response evidence, not executed tracker changes.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **find-the-unasked-question**: **merge**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It limits omissions to questions that control a decision, answers factual questions itself, and respects deliberate user scope. This helps avoid indiscriminate questioning disguised as insight. Its useful role is an initial framing check. The resulting work usually becomes assumption-budget, evidence-fork, or an explicit preference decision rather than a separate mechanism.

**Weakness:** The trigger 'may be solving the wrong problem' is broad enough to invite routine reframing of well-posed tasks. The listed inspection categories can still generate generic consulting questions.

**Suggested improvement:** Merge into the uncertainty or framing entry point. Require a concrete discrepancy in the current plan before invoking it, and allow 'no consequential omission found' without producing a mandatory question.

A proposed test was: Before we optimize this onboarding form, identify whether one omitted question could change the plan, using the user drop-off evidence already available. Success would mean: Every surfaced question maps to a different feasible next action, and the assistant either resolves it from evidence or presents a genuine decision for the authorized owner. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
