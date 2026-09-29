# Development evaluation: ask-matt

**Case-bound grades:** source A; refactor A; no-supplied-skill control A.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 7/7 | 3/3 | A |

## normal: ask-matt-N

Choose the next skill: we have a vague idea too large for one session and unresolved policy decisions. We are not ready to build. Give one recommendation and why, not a tour of the entire toolkit.

### Frozen criteria

1. Routes toward multi-session decision planning
2. Does not prematurely implement or generate executable tickets
3. Gives a concise reason tied to the actual bottleneck

### source response

Use **/wayfinder**. The idea is too large for one session and unresolved policy decisions still determine the route, so the useful next artifact is a map of decisions rather than implementation tickets.

Start by fixing the destination—what must be decided before building is justified. Put questions that can already be stated precisely into decision tickets, show genuine blocking relationships, and leave less-defined areas as “not yet specified.” Policy choices belong to live discussion; factual unknowns can become research work.

The immediate purpose is to make the route clear enough to specify. This recommendation does not authorize a build or imply that all decisions are ready to answer today.

**Judgment:** 3/3. 

- Criterion 1: 1. Recommends /wayfinder for multi-session scale, decision tickets, real blockers, and unspecified areas.
- Criterion 2: 1. Targets a decision map rather than implementation tickets and explicitly withholds build authorization.
- Criterion 3: 1. Explains that policy choices determine the route before specification/building is justified.

### refactor response

Use wayfinder next. The obstacle is an effort too uncertain and large for one session, with policy decisions still shaping the route. Wayfinder maps a bounded destination, separates precise decision tickets from questions that cannot yet be phrased, and identifies the ready frontier without starting implementation.

Its first useful output should be a small decision map, not a build backlog. Unresolved policy choices can then be handled as individual decision tickets. Use the configured tracker if one exists; otherwise make the local Markdown mode explicit. Once the consequential decisions are settled, to-spec can synthesize them into a buildable contract. This is a routing recommendation only; no skill workflow has been started.

**Judgment:** 3/3. 

- Criterion 1: 1. Recommends wayfinder for an effort too large for one session, mapping decisions and an actionable frontier.
- Criterion 2: 1. Keeps the output a decision map rather than a build backlog and says no workflow started.
- Criterion 3: 1. Ties the recommendation to uncertain scale and unresolved policy choices.

### control response

Use wayfinder for the next step: map the large idea into a small set of decisions and investigations, then identify the nearest useful frontier. The immediate need is to make the work navigable while policy choices are unresolved.

The first output should name the destination, distinguish policy decisions from researchable questions, and mark work that depends on those decisions. Select one unblocked question or investigation that can fit the next session. Leave implementation detail deferred where the policy makes it premature.

This recommendation is about the kind of work needed now; I have not loaded or run a skill package in this fixture.

**Judgment:** 3/3. 

- Criterion 1: 1. Recommends wayfinder to map decisions and investigations and select an unblocked next-session question.
- Criterion 2: 1. Defers implementation detail while policy remains unresolved and starts no build/ticket execution.
- Criterion 3: 1. Explains that navigability under unresolved policy is the immediate bottleneck.

## stress: ask-matt-S

We are in a repository, but the user asks a quick stateless critique of a paragraph and explicitly wants no files. Should repository presence force grill-with-docs? Give the minimum useful route.

### Frozen criteria

1. Honors stateless user scope
2. Does not force documentation merely due to directory presence
3. Avoids unnecessary multi-skill ceremony

### source response

Repository presence should not force grill-with-docs. Your explicit request is a quick, stateless critique with no files, so the minimum route is to critique the paragraph directly.

If one ambiguity prevents a useful critique, ask one focused question in the conversation. There is no need to create CONTEXT.md, an ADR, or a durable interview record. If you explicitly want a fuller stress-test later, grill-me can provide a stateless exchange, but that is more than this request currently needs.

The paragraph itself is not included in this fixture, so I cannot supply its critique yet. Paste it and I can focus on its claim, support, and clarity.

**Judgment:** 3/3. 

- Criterion 1: 1. Recommends a quick direct critique with no files.
- Criterion 2: 1. Says repository presence must not force grill-with-docs or CONTEXT.md/ADR records.
- Criterion 3: 1. Allows only a focused ambiguity question and treats fuller grill-me as beyond this request.

### refactor response

No. Repository presence does not establish a desire for durable project documents, and the explicit request for no files rules that out here.

The minimum route is a direct paragraph critique focused on what the user asked: identify the main claim, any unsupported inference, and the smallest useful revision. No interview or configuration step is needed just to provide that critique.

If the user later wants a back-and-forth interrogation of their idea, grill-me supports a stateless interview. Do not invoke grill-with-docs merely because a repository is available. For the current request, no additional skill adds enough value to justify a route change.

**Judgment:** 3/3. 

- Criterion 1: 1. Honors the explicit stateless no-file scope and recommends direct paragraph critique.
- Criterion 2: 1. Says repository presence does not imply durable project documents.
- Criterion 3: 1. Chooses direct critique without interview/configuration; optional later grill-me is not invoked.

### control response

No. Repository presence does not override an explicit request for a stateless critique with no files. Read the supplied paragraph and respond directly with the main weakness and a concise suggested revision; no documentation workflow is needed. The paragraph itself is not included here, so I would need its text to give that critique.

**Judgment:** 3/3. 

- Criterion 1: 1. Explicitly honors stateless critique and no files.
- Criterion 2: 1. Says repository presence does not override the user's scope.
- Criterion 3: 1. Routes directly to the main weakness and concise revision, with no extra skill workflow.

## non-trigger: ask-matt-X

What does HTTP stand for? Just expand the abbreviation.

### Frozen criteria

1. Answers without toolkit routing

### source response

Hypertext Transfer Protocol

**Judgment:** 1/1. 

- Criterion 1: 1. Answers only 'Hypertext Transfer Protocol'.

### refactor response

Hypertext Transfer Protocol

**Judgment:** 1/1. 

- Criterion 1: 1. Answers only 'Hypertext Transfer Protocol'.

### control response

Hypertext Transfer Protocol

**Judgment:** 1/1. 

- Criterion 1: 1. Answers only 'Hypertext Transfer Protocol'.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
