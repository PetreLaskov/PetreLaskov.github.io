---
name: independent-reader
description: Read writing through a fresh, context-isolated subagent to report conveyed claims, implications, tone, audience readings, or inferred revision goals before comparison with author intent. Use for independent or blind reader reviews and major writing passes that call for them; skip routine copyediting and early exploratory conversation.
---

# Independent Reader

Find out what the text communicates before explaining what it is meant to communicate. Use one skill with four selectable modes: implications, reader perspective, emotional tone, and revision inference. Combine compatible modes in one reader; add separate readers only for materially different perspectives or a warranted fresh check.

## Prepare privately as the coordinating editor

Select the actual current passage or draft. Keep any known author intention, desired tone, suspected implication, and revision rationale on the coordinator's side. Distinguish explicit intent from your interpretation; an unsettled intention need not become a finished brief.

Preserve the exact prose, sequence, and meaningful surrounding context. A title or subtitle that readers will encounter belongs in the packet. Strip attribution, identifying filenames, author bios, comments, and editorial notes unless they are materially part of the requested reading. Do not silently rewrite the passage to anonymize it. Disclose consequential redactions to the user; if an identity is integral to the text, retain it and qualify the blinding.

For paragraph scrutiny, retain paragraph numbers and distinguish a reading in context from a deliberately isolated paragraph. If the whole text will not fit, select a bounded excerpt and report the coverage limit; do not substitute your summary for the writing.

## Delegate with a clean context

Use `collaboration.spawn_agent` with `fork_turns="none"`. Do not send the conversation, this coordinator-facing skill, the author's intentions, your analysis, earlier reader reports, or an explanation that this is the user's writing. Never claim a third party wrote it; simply call it "the passage" or "the text."

Read [references/reader-prompt.md](references/reader-prompt.md) yourself and paste that neutral prompt plus the packet into the subagent message. Do not send the subagent to a project path to retrieve them. Use the inherited model unless a different model is requested or otherwise required.

The reader must not access persistent memory, memory summaries, prior chats, project guidance, personal profiles, files, web sources, or tools. It must not spawn other agents. Supply everything it needs inline. These are workflow restrictions, not an OS security sandbox: shared files or automatically injected context may remain technically available. If any memory summary, personal profile, or author-related project context is already visible to the reader, it must report contamination and stop before evaluating the text; do not describe that result as blind. A fresh agent without conversation history does not guarantee absence of injected memory. Never claim memory isolation unless it is actually supported. If the environment cannot provide a clean reader, disclose that limitation and provide a neutral packet for a clean session; do not silently replace it with the coordinator's own supposedly independent reading.

### When isolation is unavailable

If an attempt shows injected author/profile context, preserve the neutral packet and report that independent reception remains untested. Continue authorized source-fidelity and ordinary editorial work under those accurate labels. An explicit user requirement for independent review remains an unmet condition. Retain the dated failure and do not repeat the same failed attempt in an unchanged environment merely as a ritual; recheck when the environment changes or independent review is explicitly requested. A new conversation alone does not establish clean context.

### Choose the question without seeding its answer

- **Implications:** Ask what is asserted, suggested, presupposed, and left open. The coordinator, not the blind reader, identifies which implications are unintended.
- **Reader perspective:** Describe relevant knowledge, professional habits, and reading circumstances, e.g. a sophisticated general-interest journalist evaluating claims and possible story angles. Do not invent a real person's beliefs or treat a job title as a personality. A simulated reader is a hypothesis about reception, not audience research.
- **Emotional tone:** Ask what attitude the prose conveys toward each relevant subject, including shifts and mixed attitudes. Distinguish conveyed stance from the author's actual feelings.
- **Revision inference:** Provide both complete versions or matched passages as "earlier" and "later," without change explanations. Ask what changed, what goals those changes suggest, and what each version actually communicates. Apparent goals and achieved effects may differ. For an independent test of the later version's reception, use a separate fresh reader given only that version.

Start with open inference. If an explicit claim must then be tested, retain the first report and ask a balanced follow-up: evidence for, evidence against, and remaining ambiguity. Label it a prompted probe, not spontaneous perception. Do not lead with "Does this sound contemptuous?" or the feared claim.

## Reconcile after the report

Keep the reader's first response available without editing it toward the desired answer. Compare its observations with the author's stated intention and your source-based interpretation, identifying each separately. Check quotations against the supplied text. Give the few consequential matches, mismatches, or uncertainties with the exact wording that produced them.

A model inference does not establish the author's motives, the truth of a claim, or what actual readers will think. Do not manufacture problems, equate harshness with failure, or flatten humor, strangeness, productive ambiguity, conviction, or discomfort. A mismatch may justify a revision, accepting the effect, or reconsidering the intention. Propose or make edits only within the live editing request; reading alone does not authorize rewriting.

For an authorized revision, preserve meaning and valuable effects while addressing the specific mismatch. Use a new unprimed reader when rechecking a consequential change; one initial pass and one targeted recheck normally suffice. Do not iterate until the model agrees. Report persisting disagreement and let the author judge.

In a major writing pass, perform this after drafting and the source-fidelity check, before returning the work and material editorial choices. It complements that check: source fidelity asks whether the draft preserves intended meaning; this asks what a reader can recover from the prose. Scale to the task and keep exploratory conversation free to develop.
