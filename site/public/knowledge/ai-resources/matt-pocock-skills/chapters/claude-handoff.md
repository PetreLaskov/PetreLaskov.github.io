# Claude Handoff: transfer a live objective, not a transcript

**Source status: in-progress / beta, excluded from the promoted plugin.**

**Port bet: conditional.** Continue authorized work in a fresh background Claude session using a concise handoff grounded in durable artifacts.

## Source and reading map

- [SKILL.md:1-18](../source/skills/in-progress/claude-handoff/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/claude-handoff/SKILL.md#L1)
- [agents/openai.yaml:1-5](../source/skills/in-progress/claude-handoff/agents/openai.yaml) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/claude-handoff/agents/openai.yaml#L1)

## Understand the source

This very short skill combines two actions that are often confused: preparing a handoff and actually starting a successor. Matt asks the current assistant to summarize the conversation, then launch a background Claude agent seeded with that summary through `claude --bg --name`. The next agent starts in the current working directory and is intended to continue immediately. The user manages it through the Claude agent interface. This is therefore an execution workflow, not merely a writing template.

The summary should point to existing specs, plans, decisions, issues, commits, and diffs instead of duplicating them. It should include a suggested-skills section so the next agent can load useful procedures. Sensitive information is redacted because the summary becomes a prompt. A user-supplied argument changes the successor's focus. The descriptive name is mandatory because it identifies the job in lists, pickers, and terminal UI.

The whole source fits into a few instructions. That compactness reveals its intended environment: a user already working in Claude Code, familiar with background agents, who explicitly requests the transfer. It assumes that the current conversation has enough context to determine what should continue. Its existing explicit-only policy matters because automatically spawning a successor merely because a conversation is long would change both the user's workflow and resource use.

## When and why it is useful

A handoff is valuable when the current context is overloaded, a task must continue in a fresh session, or the next phase needs a different focus. The core problem is that an agent's operational understanding lives partly in transient conversation: what was attempted, why one promising path failed, which file is current, and what the user has actually authorized. Durable artifacts hold the work; the handoff reconnects those artifacts to the active objective.

The pointer-first design is worth preserving. Copying an entire spec into a summary creates a second version immediately. A successor that sees both may not know which one governs. A path and a brief explanation of why the artifact matters can be more useful than pages of paraphrase. This also makes the handoff cheaper and easier to update when the task evolves.

Do not use this skill to spawn speculative new projects, multiply agents unnecessarily, or transfer work to a different provider without the user's intent. It is not a generic substitute for saving files. If no fresh agent is needed, a normal status note may be sufficient. If the current work is complete, a handoff should not invent a continuation just to make use of a background process.

## Worked example: a partially diagnosed bug

Consider a checkout bug whose root cause is not yet fixed. The current agent has a failing test, a trace, and a partially edited file. A weak handoff says “We are fixing checkout; look at the code and continue.” A bloated handoff repeats the conversation, including abandoned guesses. A useful one says that the active objective is to preserve the selected shipping method after address validation, points to the reproducing test and trace, identifies the current branch and uncommitted edit, states that the tax-service hypothesis was ruled out by a specific observation, and names the next unresolved question.

The successor's first useful action is to verify the working tree and run the targeted reproduction. That catches a subtle danger: the summary may describe a file before the user changed it. A commit reference establishes a base, while an explicit note about dirty changes prevents the successor from treating all modifications as its own. The next agent should understand what it may edit and whether another agent still owns any file.

The source launches in the current directory. If that directory is a repository containing live work by another process, immediate continuation may produce collisions. The port therefore records the actual directory, current state, and ownership constraints before launch. This is not a call for a lengthy transfer form. It is a compact answer to three operational questions: what continues, where is its current state, and what must the successor verify before writing?

## What it gets right, criticism, and portability

The skill gets the action boundary right by being explicitly invoked, and its insistence on a descriptive name is practical. Its instruction to reference artifacts is stronger than a generic “summarize thoroughly” prompt. Redaction is also important because command arguments, job records, or logs may expose the handoff beyond the visible chat.

The main weakness is that the command example interpolates a potentially large summary into shell syntax without discussing safe transport. Quotes, newlines, dollar substitutions, and platform behavior can turn a prompt into accidental shell code if composed carelessly. Another weakness is the absence of a launch receipt: a command returning is not proof that a successor is running with the intended prompt. The source also does not state whether the old agent stops writing, so two agents may both believe they own the task.

The strongest reason to retain the original is its excellent ratio of useful behavior to instruction length in a known Claude environment. A team with established process-launch helpers may already solve quoting and ownership elsewhere. The refactor should not replace that simplicity with a universal orchestration framework. Portability, however, is conditional: Claude CLI options and background-job capabilities belong to a specific runtime. A Codex package must discover whether that runtime exists and use a supported native handoff surface only when it actually provides the requested behavior. Creating a new user-owned chat is not an interchangeable implementation detail.

## Refactor and collaboration bet

The refactor preserves the target of an immediately useful successor, names the task, and keeps pointers central. It adds a compact continuation contract: objective, current state, artifact pointers, failed approaches worth remembering, next action, and authorization limits. It requires the agent to inspect the actual CLI or native tool capability, use safe prompt transport supported by that capability, and report the returned job identifier. If launch fails, it preserves the handoff and reports that failure instead of claiming a transfer.

My recommendation is conditional. Adopt the transfer format broadly, but activate automatic continuation only in a runtime with verified support and clear ownership. The bet is that the next agent can take a correct first action with less rediscovery. A falsifier is a successor that still reopens resolved questions, edits the wrong checkout, or interprets proposed work as authorized work. Measure the first concrete action and time to recover the relevant state, not the summary's elegance.

The port should also avoid promising perfect redaction. Paths, issue descriptions, and error excerpts can contain private information without looking like credentials. The useful rule is to include the minimum material necessary to continue, refer to protected artifacts where appropriate, and never copy secrets into a process argument. This is a specific consequence of the source's launch design, not an invitation to turn every handoff into a compliance review.

## An original proposal: resume-probe

Resume-probe tests a handoff before a successor makes consequential edits. A fresh reader receives the handoff and permitted artifacts, then states the current objective, authoritative artifact, next action, and one uncertainty. It must locate the evidence for those answers rather than merely repeat the summary. The author compares the probe with the intended continuation and repairs only the missing or misleading part.

In the checkout example, a probe may reveal that the failing test path points to a file renamed after the summary was written. More subtly, the successor may infer that the partial fix should be preserved even though it was only an experiment. A one-sentence correction can prevent an hour of work on the wrong premise. The skill makes resumability an observable property rather than a writing style.

Its novelty within this collection is the use of a receiving-side reconstruction task as the test. The existing handoff skills focus on producing the transfer; this proposal checks what another agent can recover from it. Its cost is a small fresh-context read, so it is inappropriate for trivial transitions. It fails if it becomes a ritual paraphrase, if the evaluator is shown the desired answers, or if it demands access to unrelated history. A successful probe demonstrates enough independent reconstruction to justify continuation.

## Study exercises and connections

Write a handoff for a real unfinished task in fewer than two hundred words, using paths for details. Remove every sentence that merely repeats an artifact. Give the note and artifacts to a fresh reader and ask what they would do first. Compare that action with the one you intended.

Then introduce one controlled mismatch, such as an outdated branch name or a proposed change described as complete. Which part of the handoff would reveal the problem? Study [handoff](handoff.md) for the neighboring artifact-oriented workflow and [implement-spec](implement-spec.md) for a setting where many agent transfers occur during one task. The important distinction is continuity of an existing objective versus creation of additional work.

## Semantic delta: what the refactor changes

1. **Add a continuation contract.** Make current state, ownership, and next action explicit while keeping durable details behind pointers. **Tradeoff:** A slightly longer handoff replaces some of the original minimalism.

2. **Separate launch attempt from successful transfer.** Require a supported runtime, safe prompt transport, and a launch receipt. **Tradeoff:** Unsupported environments receive a usable handoff without automatic continuation.

3. **Avoid competing writers.** Name remaining ownership and stop work on the transferred unit after successful launch. **Tradeoff:** Concurrency is reduced at the transfer boundary to protect continuity.

4. **Keep host semantics visible.** Do not silently map Claude background jobs to a different provider or user-owned chat. **Tradeoff:** A universal-looking command becomes an explicitly conditional capability.

5. **Adapt Codex packaging without changing invocation.** Omit Claude-only disable-model-invocation and argument-hint keys while preserving explicit-only policy in the copied agents/openai.yaml. **Tradeoff:** The study package targets Codex metadata rather than being a byte-identical cross-host manifest.

The full executable instructions are in [the refactor](../refactored/claude-handoff/SKILL.md). Existing invocation policy is preserved through copied agents/openai.yaml: explicit invocation only. Claude-only frontmatter keys are omitted from the Codex package; that packaging change does not change who may invoke it. The original proposal has ordinary discovery and lives in [resume-probe](../original-skills/resume-probe/SKILL.md). These are study packages, not installed skills.

## Evaluation boundary

The authorial recommendation above is a hypothesis, not an evaluation result. [The independent evaluation](../evals/claude-handoff.md) contains the recorded trial responses and judgments. That run record takes precedence over predictions in this chapter. Reading the instructions and inspecting their syntax cannot prove improved collaboration; that requires a task with an observable result and an informative failure case. The source, proposed port, and original proposal should be distinguishable in any comparison.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. The intended product remains immediate continuation in a named background agent, not just a summary file. Runtime verification and safe prompt transport replace an assumed CLI command, while the summary retains task focus, artifacts, suggested skills, and redaction. Active ownership is captured and the sender stops competing after successful transfer. The candidate refuses to silently create a different user-owned chat or switch provider when the requested capability is absent. Launch receipt is distinguished from completion of successor work. No actionable semantic defect found.

None. Verify background-launch support in the actual installed runtime during execution.

Evidence: [source/skills/in-progress/claude-handoff/SKILL.md:8-18](../source/skills/in-progress/claude-handoff/SKILL.md); [refactored/claude-handoff/SKILL.md:8-16](../refactored/claude-handoff/SKILL.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **resume-probe**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It asks a fresh receiver for the actual objective, authoritative state, constraints, uncertainty, and first action with artifact references. Read-only probing prevents the test from becoming uncontrolled continuation. This operational comprehension test is stronger than simply polishing a handoff. Resume-check verifies live claims; this checks whether another context can find and use them.

**Weakness:** The sender can compare against its own mistaken understanding, and a plausible first action remains only a proposal unless performed. The skill mostly acknowledges, but cannot eliminate, those limits.

**Suggested improvement:** Pilot early. Keep an independent current-state reference for judging mismatches, and report reconstructed, proposed, and executed behavior separately so fluent planning is not counted as successful continuation.

A proposed test was: Test whether this handoff lets a fresh agent safely continue the migration. Give it only successor-visible artifacts and inspect its proposed first action. Success would mean: A fresh context cites authoritative artifacts, reconstructs the authorized objective accurately, and proposes or performs an appropriate bounded first step without hidden context. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
