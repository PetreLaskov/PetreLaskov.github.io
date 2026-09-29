# To questionnaire: ask the person who can actually answer

**Source:** [source/skills/productivity/to-questionnaire/SKILL.md](../source/skills/productivity/to-questionnaire/SKILL.md) at [Matt Pocock commit c55ee46073ed](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/to-questionnaire/SKILL.md). Human commentary: [source/docs/productivity/to-questionnaire.md](../source/docs/productivity/to-questionnaire.md). These are the pinned study materials, not claims about the latest upstream release.

**Collaboration bet: ADOPT.** Adopt for a decision blocked on another person's knowledge; preserve one recipient, a flat fillable document, and no automatic sending.


## Understand the skill

To-questionnaire creates a Markdown document for one other person to answer asynchronously or in a meeting. The central instruction is **grill the send, not the subject** (source SKILL.md:7–16). The user lacks the subject knowledge; repeatedly interviewing them about it defeats the purpose.

The source asks two things. First, who receives the document: role, expertise, and relationship. Second, what the user needs back: specific facts or decisions required to move forward. The output targets the gap between what that recipient knows and what the user needs. It saves to to-questionnaire-<slug>.md in the current directory and reports the path.

The document includes purpose, sender and recipient, use of answers, enough context for an outsider, answer instructions, grouped questions with answer stubs, and a final catch-all (SKILL.md:18–54). Questions are most-important-first, each contains one idea, and explanations of why a question matters appear only where useful. Partial answers and “I don't know” are explicitly welcome.

This is not batch grilling. Grilling already asks rounds. The distinction is where the answers live: the present user versus another person. It is also not a branching survey or a multi-recipient routing system. The companion docs make both exclusions explicit.

## Worked example: an integration decision

You need to choose an integration approach, but a partner's technical owner knows the actual volume, retry guarantees, and maintenance windows. The assistant should ask who that owner is and what decisions your team needs to make from the reply. It should not keep asking you to estimate the unknown guarantees.

A good questionnaire might first ask the expected launch volume, then how duplicate deliveries are identified, then what happens during planned maintenance. Each question has room to answer. The purpose states that these answers determine whether the client needs durable retry storage and how much capacity to provision.

A poor questionnaire copies your internal uncertainty: “Should we use architecture A or B?” The recipient may not know your implementation options. A better question elicits the facts they own. Likewise, “Describe your system” is too broad to guarantee usable answers. The skill translates a decision need into recipient-answerable questions.

The final catch-all can reveal something the agent failed to anticipate. “We rotate identifiers during regional failover” may change the design more than any prewritten question. This is why the document should not pretend to exhaust everything the recipient might know.

## Why it earns its place

The source recognizes a common failure in AI-assisted planning: the assistant keeps extracting answers from the only person in the chat even after it becomes clear they do not own them. The questionnaire changes the information source while preserving the current decision context.

One recipient is a strength. Tone, assumed knowledge, and the reason for responding can be specific. A document sent to several roles often includes questions nobody feels responsible for. Flat questions are also a sensible default for a fillable Markdown artifact. A branching form would require predicting answers and maintaining conditional logic.

Most-important-first ordering acknowledges that asynchronous cooperation is scarce. The recipient may answer only part. Putting the decision-blocking questions first increases the chance that a partial response remains useful. Explicitly allowing uncertainty discourages confident guesses that would later look like facts.

## When to use it and when not to

Use it when another person has information or authority you lack: a client, domain expert, operations owner, or colleague. It is especially useful when a live design discussion stalls and you want to continue once answers return.

If the answer is retrievable from code or documentation, investigate first. If nobody knows because a design needs to be experienced, prototype. If the user owns the preference but has not articulated it, grill. The questionnaire should not offload work the assistant can do or ask a recipient to make a decision outside their role.

It creates an artifact, not a communication event. The source human docs explicitly say it does not send email, Slack messages, or tracker updates. Delivery remains a separate user action or separately authorized task. This boundary is worth preserving because drafting and addressing a document do not imply permission to contact someone.

## Criticism and strongest case for the original

The source mandates two exchanges even if the initial request already supplies both recipient and needed answers. Reasking adds friction without information. A portable refactor should use supplied context and ask only for actual gaps while retaining the “send, not subject” distinction.

The template includes a deadline and rough effort, but the input steps do not establish a deadline. An assistant could invent one. The right repair is to use a provided deadline, leave it unspecified honestly, or ask if timing materially affects the request. It should not create a social commitment on the user's behalf.

The document also needs care around answerable questions. A question can be grammatically simple yet require the recipient to speculate. “What peak load will we see next year?” may exceed their knowledge. Asking for estimates with assumptions and confidence can be useful; presenting the answer as a guaranteed fact would not be.

The strongest case for retaining the original is its clean boundary and simple artifact. It resists turning one request into a survey platform. Adding multi-recipient routing, branching logic, and automated delivery would alter the skill rather than merely refactor it. Those capabilities, if wanted, belong elsewhere.

## Portability and collaboration bet

The package is explicit-only and requires only writing one Markdown file. It does not depend on a tracker or communication connector. The refactor preserves this simplicity and uses the authorized task workspace rather than confusing the skill's installation directory with the current output directory.

My bet is **adopt**. I expect less wasted interviewing and more usable external answers. The falsifier is questionnaires that recipients cannot answer, omit the facts the user actually needed, or require another round solely because questions were vague or compound. Response length is not the metric: a short precise reply can be enough.

A useful outcome also includes a clear “I don't know; ask this other owner.” That is progress because it locates the knowledge boundary. The assistant should not score uncertainty as a failed response.

## Refactor and numbered delta

1. **Use already supplied send information.** Ask about recipient or needed outcomes only when missing. The source's two conceptual stages remain without ritual exchanges.
2. **Keep one recipient and flat questions.** Do not expand scope into a routing or survey system.
3. **Prevent invented commitments.** Use a supplied deadline; otherwise mark timing as unspecified. Estimate effort modestly from the actual document.
4. **Map each needed outcome to a question.** This retains the original completion criterion and makes it inspectable.
5. **Make questions answerable from the recipient's position.** Ask for observed facts, owned decisions, or labeled estimates rather than demanding speculation.
6. **Preserve draft-only delivery.** Save the artifact and report its path; sending requires separate authorization.

A meaningful trial supplies all recipient context up front and leaves only one subject fact unknown. The assistant should draft rather than re-interview, cover the gap, and avoid inventing a deadline or sending the file.

## Original proposal: answer-reconciliation

The new skill handles the return journey. When responses arrive, it compares them with the original decision needs, distinguishes facts from estimates and preferences, identifies conflict, and proposes the next smallest clarification.

Suppose one partner says duplicates never occur while another provides a retry policy that permits them. The assistant should not average the answers or choose the more confident voice. It identifies the conflicting claim, each speaker's scope, and the source or owner that can resolve it. The question may turn out to concern different environments.

Within this collection, questionnaires gather external knowledge and research gathers sources, but no standalone skill explicitly reconciles returned answers before they become design premises. That is the limited novelty. Its cost is another reading pass. Its falsifier is overcomplicating compatible answers, or declaring contradictions without checking scope and dates.

The strongest output is a concise decision-ready synthesis: what is now established, what remains uncertain, and which exact follow-up could resolve the consequential gap. It does not send that follow-up automatically.

## Study exercises and connections

Take a blocked decision and identify who owns each missing fact. Choose one recipient. Write three questions they can answer without understanding your whole project. Remove compound questions and speculative deadlines.

Then invent two partly conflicting responses and reconcile their scope before choosing a follow-up. Compare [grilling](grilling.md), [research](research.md), and [prototype](prototype.md). The practical lesson is to locate the right source of knowledge rather than asking the nearest available person more forcefully.

## Package and evaluation record

Read the [complete refactored skill](../refactored/to-questionnaire/SKILL.md), the [original proposal](../original-skills/answer-reconciliation/SKILL.md), and the [author metadata](../reviews/author-to-questionnaire.json). The metadata accounts for every source support file. The refactor retains Matt's MIT notice and existing invocation policy; the original proposal uses ordinary discovery. Neither package is installed by this chapter.

[Independent behavioral evaluation](../evals/to-questionnaire.md) now records the trial responses and case-bound grades. The bet above remains a design hypothesis, not a demonstrated collaboration gain. Judge the recorded trial on the behavior it actually tested; tidy formatting alone cannot establish improvement.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. The defining asymmetry is preserved: interview the user about the recipient and needed return, then ask the knowledgeable recipient the subject questions. One recipient, a flat Markdown artifact, priority order, one idea per question, answer stubs, orientation, and coverage of needed outcomes all remain. The refactor avoids re-asking supplied information and inventing deadlines. It also distinguishes creating the document from sending it, which does not reduce the source's deliverable. No overbroad trigger or material semantic defect was identified.

None. Judge the produced questionnaire by whether answers actually unlock the named decision.

Evidence: [source/skills/productivity/to-questionnaire/SKILL.md:7-52](../source/skills/productivity/to-questionnaire/SKILL.md); [refactored/to-questionnaire/SKILL.md:7-21](../refactored/to-questionnaire/SKILL.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **answer-reconciliation**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It tracks source, scope, time, authority, and claim type before resolving apparent disagreement. Checking version and definition differences is a practical antidote to averaging incompatible answers. The input is specifically returned answers against an existing decision need. That provenance-aware reconciliation is narrower and more useful than a general meeting summary.

**Weakness:** The deliverable says 'established' without explicitly limiting that status to what the supplied sources establish. Agreement among respondents may still be shared error or unsupported reporting.

**Suggested improvement:** Keep the procedure. Distinguish corroborated facts from consistently reported claims, and identify the authoritative verification source where respondent agreement alone cannot establish the operational fact.

A proposed test was: Reconcile these product, operations, and engineering answers about export retention, identifying what the specification can use and which apparent conflicts need one follow-up. Success would mean: Each consequential finding is traceable to an appropriately scoped source, genuine disagreements remain visible, and the follow-up resolves a decision-relevant uncertainty. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
