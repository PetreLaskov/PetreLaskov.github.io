# Handoff: carry the live work across a boundary

**Source:** [source/skills/productivity/handoff/SKILL.md](../source/skills/productivity/handoff/SKILL.md) at [Matt Pocock commit c55ee46073ed](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/handoff/SKILL.md). Human commentary: [source/docs/productivity/handoff.md](../source/docs/productivity/handoff.md). These are the pinned study materials, not claims about the latest upstream release.

**Collaboration bet: ADOPT.** Adopt targeted portable handoffs with explicit state and resolvable references; retain the temporary-file default without pretending it is durable.


## Understand the skill

Handoff writes a document so a fresh agent can continue the current work. It saves that document in the operating system's temporary directory, not the workspace; includes suggested skills; references existing artifacts instead of duplicating them; redacts secrets and personal information; and tailors the content to any stated next-session focus (source SKILL.md:8–16). Its explicit-only policy is in agents/openai.yaml.

The human documentation sharpens the purpose: **portability**, not better compression. A file is useful when work must travel to another harness, directory, colleague, or side task. If the current environment can continue or fork with context, a handoff may add unnecessary summarization loss. These application commands are contextual source guidance, not universal promises about every harness.

A handoff is a secondary account of a primary conversation. It can preserve the live task remarkably well, but it inevitably selects and compresses. The agent receiving it should not assume the prose has the same evidential status as the underlying code, tool result, or explicit user instruction.

## Worked example: a prototype detour

A design conversation reaches uncertainty about partial cancellation. You want a separate agent to build a throwaway state model while the main discussion continues. The handoff can state the precise question, current agreed meanings, the prototype's intended output, and links to the existing glossary and design issue. It should carry why the question matters without copying the whole repository's documentation.

The receiver needs to know that the product code has not been changed, that two cancellation behaviors remain alternatives, and that choosing between them belongs to the user. A misleading summary saying “Implement partial cancellation” would convert investigation into execution. “The current hypothesis is line-level cancellation; build a demo to examine these cases” preserves the task.

When the prototype returns, the main agent can consume the answer and a link to the runnable artifact. This is a round trip rather than a session ending. The original remains live. Handoff supports branching as well as resumption, a use the source human docs explicitly emphasize.

## What belongs in the document

The live task is more useful than a chronology. A receiver needs the goal, current state, constraints that affect the next action, decisions and their status, unresolved questions, artifacts to read, and the next useful move. If tests were run, say what they showed. If an agent merely believed a file was absent, do not promote that belief into a verified fact.

Existing specs, issues, commits, and diffs should remain authoritative. Copying them into a handoff creates two versions that can diverge. But a pointer only works if the destination can resolve it. An absolute path on one machine may be meaningless elsewhere, and a temporary file can disappear. “See the file above” is not portable at all.

The source requires a suggested-skills section. A useful version names the skill and why it serves the next task, while recognizing that the receiver may lack that package or a literal Skill tool. Suggested capabilities do not substitute for the task brief.

## Strengths and when to use it

The source's refusal to duplicate settled artifacts is excellent. It makes the document smaller and reduces stale summaries. Tailoring to the next session is equally valuable: a prototype worker needs a different compression than a reviewer or implementer.

The temporary-directory default has a coherent purpose. A transit document should not become permanent project lore by accident. It is also easy to produce without deciding where another durable project artifact belongs. The source is explicit that this is not the current workspace.

Use it when crossing a boundary loses access to live context. Do not invoke it merely because a phase ended if the environment can continue effectively. Do not make every handoff a universal repository onboarding guide; the next task determines what deserves space.

## Criticism and strongest case for the original

Temporary storage and portability pull in different directions. A temporary file may vanish before the receiver arrives, and pointers to temporary artifacts may also break. The source human docs acknowledge this. The source instruction nevertheless mandates temp, so a faithful refactor should preserve that default while reporting its actual path and availability, not silently relocate every handoff into the repository.

The source also does not specify how to preserve uncertainty, verification state, or the distinction between planned and completed work. A confident summary can become a false premise for the next agent. A handoff that says “tests pass” without saying what was run can hide an untested path. These are material omissions in a continuation artifact.

Redaction needs care too. Removing all contextual personal information can make some legitimate tasks impossible to resume; retaining everything can leak more than needed. The refactor follows the source's redaction intent and preserves only task-essential nonsecret context. It should not copy credentials simply because the next agent might need access.

The strongest case for retaining the original is its compact contract. A good assistant can infer a useful structure without a fixed report template. The refactor should add state distinctions and reference checks, not dozens of mandatory headings.

## Portability and collaboration bet

The destination is the central dependency. A path useful on the current machine may not travel to a remote worker. The skill should state the canonical workspace and artifact locations when relevant, identify unavailable references, and use repository-relative paths plus a root for same-repo transfers. It should discover the OS temp directory rather than assuming /tmp.

My **adopt** bet is faster restarts with fewer false premises. The falsifier is a fresh agent repeatedly asking for information present in the source conversation or proceeding incorrectly because the handoff changed the status of a claim. A short handoff that loses one critical exception is worse than a longer accurate one.

## Refactor and numbered delta

1. **Lead with the destination task.** Use the user's stated focus or infer the immediate continuation. This preserves tailoring and reduces history dumping.
2. **Carry state distinctions.** Separate completed, verified, proposed, and blocked work only where those distinctions affect action. This is not a provenance ledger for every sentence.
3. **Keep references usable.** Verify local references and identify destination limitations. Do not copy full artifacts to disguise inaccessible links.
4. **Retain temp and disclose transience.** Report the actual path. If the user requested durable transfer, honor that specific destination rather than enforcing the default.
5. **Keep skills as recommendations.** Name available capabilities and their purpose, without assuming the next harness has the same invocation tool.
6. **Read the result cold.** Check that the receiver can identify the next action and does not receive secrets or invented authorization.

A useful trial gives the receiver only the handoff plus referenced artifacts. Watch its first meaningful action. That is stronger evidence than asking the author whether its summary looks complete.

## Original proposal: resume-check

Resume-check addresses the other side of the boundary. Before continuing from a summary, it verifies the small set of live-state claims that could change the next action. It does not re-audit the entire project.

For example, a handoff says a branch contains a fix and only a test remains. The receiver checks the branch and relevant diff, sees that another process already merged the fix, and changes the next step. Or the handoff names a temporary artifact that is gone; the receiver reports the missing prerequisite rather than hallucinating its contents.

The distinct capability within this collection is **selective revalidation on resumption**. Handoff produces a transfer; resume-check consumes one and reconciles it with current state. Its cost is a few targeted reads. The falsifier is spending longer rechecking stable history than the work itself, or missing the one live claim that actually changed.

## Study exercises and connections

Write a handoff for a task with one completed step, one unverified belief, and one user-owned decision. Have a fresh reader identify each without the original conversation. Then remove one referenced file and inspect whether the handoff still tells the reader what is missing.

Compare [prototype](prototype.md) for the detour artifact, [to-spec](to-spec.md) for durable decision synthesis, and [writing-for-agents](writing-for-agents.md) for behavioral compression. A handoff succeeds when the next actor can continue correctly, not when the previous actor has summarized everything.

## Package and evaluation record

Read the [complete refactored skill](../refactored/handoff/SKILL.md), the [original proposal](../original-skills/resume-check/SKILL.md), and the [author metadata](../reviews/author-handoff.json). The metadata accounts for every source support file. The refactor retains Matt's MIT notice and existing invocation policy; the original proposal uses ordinary discovery. Neither package is installed by this chapter.

[Independent behavioral evaluation](../evals/handoff.md) now records the trial responses and case-bound grades. The bet above remains a design hypothesis, not a demonstrated collaboration gain. Judge the recorded trial on the behavior it actually tested; tidy formatting alone cannot establish improvement.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. The refactor retains the source's portable temporary artifact, task-focused summary, suggested skills, redaction, and pointers rather than duplicated durable content. It usefully adds destination-resolvable paths and an explicit distinction between verified state, proposals, and authorization. The recipient check is tightly related to handoff success: choosing the next action correctly. It neither claims temporary storage is durable nor moves referenced material without instruction. The package remains explicitly invoked through its preserved policy. No actionable semantic defect found.

None from inspection. A later handoff trial should test pointer accessibility from the actual destination.

Evidence: [source/skills/productivity/handoff/SKILL.md:8-16](../source/skills/productivity/handoff/SKILL.md); [refactored/handoff/SKILL.md:7-17](../refactored/handoff/SKILL.md), [refactored/handoff/agents/openai.yaml:4-5](../refactored/handoff/agents/openai.yaml). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **resume-check**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It checks only mutable claims that affect the next action and then resumes work. Treating a handoff as evidence rather than renewed authority is a valuable operational boundary. Unlike resume-probe, this reconciles external state rather than testing a reader's comprehension. The live-state check is concrete enough to justify a compact resume mode.

**Weakness:** Most steps should already be ordinary competent continuation. Its added value depends on targeting genuinely drift-prone claims rather than making every resumed conversation a ceremony.

**Suggested improvement:** Keep the explicit drift trigger and quiet-success behavior. Package beside resume-probe with clear routing: verify changing state first, test successor comprehension only when the handoff itself is suspect.

A proposed test was: Continue this migration from yesterday's handoff. Another developer may have changed the branch and completed part of the work since that note was written. Success would mean: The next action reflects the current checkout, ownership, prerequisites, and available artifacts; any consequential stale claim is corrected without rerunning stable history. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
