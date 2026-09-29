# Loop Me: turn recurring work into an implementable workflow

**Source status: in-progress / beta, excluded from the promoted plugin.**

**Port bet: pilot.** Interview the user about recurring work and maintain implementable workflow specifications in a stateful workspace.

## Source and reading map

- [SKILL.md:7-27](../source/skills/in-progress/loop-me/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/loop-me/SKILL.md#L7)
- [SKILL.md:29-32](../source/skills/in-progress/loop-me/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/loop-me/SKILL.md#L29)
- [agents/openai.yaml:1-5](../source/skills/in-progress/loop-me/agents/openai.yaml) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/loop-me/agents/openai.yaml#L1)

## Understand the source

Loop-me applies a recurring-pattern lens to the user's work and life. A loop might be a morning routine, a weekly administrative task, a repeated interaction with a channel, or part of a career process. A workflow is the specification of such a loop made implementable. The assistant conducts a stateful grilling session, creates and revises workflow specs in `workflows/*.md`, and keeps contextual vocabulary in `NOTES.md`. The desired output is specifications, not running automation.

The method is intentionally not a mandatory template. The source says a workflow needs no AI, checkpoint, or schedule unless the questioning shows one is useful. Its vocabulary is available when relevant: a trigger starts a run; a checkpoint asks a human to verify or decide; a brief presents the decision-ready result; “push right” means doing as much useful preparation as possible before involving the human. Event triggers are described as usually more efficient than schedules, but the fit depends on the work.

The definition of done is strikingly strong: an implementer should be able to build the workflow without asking a single question. The assistant is told to grill until no question remains. This expresses a real frustration with vague automation ideas, but taken literally it is unattainable for nontrivial work. Implementers will still encounter environmental details and ordinary design choices. A better reading is that the spec should settle consequential user decisions and expose its remaining assumptions.

## Why it is useful, and where it belongs

Use this skill before building recurring assistance. “Help me stay on top of supplier invoices” is not yet an implementable workflow. It leaves open what counts as an invoice, which source is authoritative, how duplicates are handled, what the user needs to decide, and what outcome counts as complete. Loop-me makes those implicit elements discussable without forcing the user to start with automation architecture.

The distinction between a loop and a workflow is productive. It encourages observation of repeated behavior before tooling. Perhaps the useful intervention is a better document template, a weekly batch, or a change in who supplies information. The source explicitly permits workflows with no AI. That prevents the assistant from interpreting every recurring inconvenience as a reason to deploy an agent.

Do not use the lens as a theory of the user's whole life. Predictability can make delegation possible, but repetition can also be valuable practice, relationship, or attention. The right question is whether the person wants help with this repeated activity and which part burdens them. The skill should discover a useful workflow, not imply that every recurring human act is waste awaiting automation.

## Worked example: an invoice review loop

Suppose invoices arrive by email and the user manually checks them every Friday. An initial interview might reveal that the real bottleneck is not reading invoices but resolving mismatched purchase-order numbers. The workflow can trigger on arrival, extract the supplier and reference, compare against a local register, and prepare a brief only for exceptions. A scheduled batch may still be appropriate if the user prefers predictable review time. Neither trigger is intrinsically superior.

“Push right” means preparing the exception with the invoice, expected reference, likely mismatch, and available options before asking the user. It does not mean postponing a decision about which account to charge until after a payment is made. The checkpoint belongs before the first action that requires the user's judgment or external authority. All authorized reversible preparation should occur before that point.

The spec might state that duplicates are detected by supplier, invoice number, and amount; ambiguous matches are held for review; missing attachments generate a draft request rather than an automatically sent email; and a run is done when the invoice is matched or a clear exception brief exists. These details arise from the actual loop. They are not a universal checklist to paste into every workflow. A simpler weekly file-renaming task could require far less.

## What Matt gets right, and the strongest criticism

The source's rejection of structural mandates is excellent. It separates useful concepts from required sections. Its brief concept also respects human attention: a person should receive a decision with enough context to act, not a heap of raw outputs. Keeping `NOTES.md` for the user's terminology lets later sessions continue without re-interviewing from scratch, and separate workflow files make the workspace stateful.

The main risks are over-questioning and over-automation. “Nothing is done while a question remains” can trap the process in endless discovery. Some unanswered questions are cheap implementation choices; others are critical policy decisions. The skill needs to distinguish them. “Propose loops the user hasn't noticed” is valuable, but can become intrusive if the assistant continually reframes the person's activities as delegation opportunities.

There is also a file-lifecycle problem. The source authorizes creating, editing, and deleting specs as the grilling resolves things. A discarded workflow may contain useful prior decisions or material the user expects to preserve. A pragmatic port should make replacement and abandonment explicit, preserving history where it matters. The strongest reason to keep the original is its vivid, compact lens: elaborate process rules could smother the exploratory conversation that reveals the best candidate.

## Refactor and collaboration bet

The proposed version keeps the vocabulary, workspace, interview, and decision-ready brief. It replaces absolute question elimination with an implementability test: trigger, intended result, relevant sources, meaningful exceptions, boundaries, and unresolved consequential decisions must be clear when applicable. Ordinary implementation choices can be left to the builder. It asks the assistant to test the spec against one ordinary run and one credible awkward run, which exposes ambiguity more efficiently than another abstract round of questions.

My bet is a pilot for one recurring burden at a time. The method should reduce clarification during implementation and produce workflows the user actually wants to run. Its falsifier is a beautifully specified workflow that costs more attention to supervise than it saves, or a long interview that resolves details nobody needed. The immediate evaluation should measure build-blocking questions; a later real-world evaluation should measure successful runs, exception load, and user effort.

Portability is high for specification work: a writable directory and conversation are enough. The reference to grilling can be embodied locally as concise question rounds with recommended answers. Scheduling, connectors, and external mutations belong to later implementation and require their own capabilities and authorization. Merely saving a workflow spec does not activate it.

## An original proposal: workflow-payback

Workflow-payback tests whether a recurring workflow deserves to be built. It starts with a small account of current work: frequency, active effort, failure cost, variability, and the part the user wants to retain. It then compares a manual improvement, a simple deterministic aid, and a richer automation only when all are plausible. The output is a bounded pilot with a stop condition and a clear measure of net benefit.

For invoice review, a rule that labels likely invoices might deliver most of the benefit without document extraction or agent reasoning. Alternatively, exceptions may be rare but costly enough that a richer matching tool pays for itself. The skill should not manufacture precise financial returns from guessed time estimates. It can use ranges and identify which unknown dominates the decision, then run the smallest observation that resolves it.

Within this collection, the proposal adds explicit economic and attention accounting before workflow implementation. The novelty is not a claim that cost-benefit analysis is new; it is a reusable procedure aimed at avoiding automation that creates more supervisory work. Its cost is a small measurement period. It fails if it becomes a reason never to experiment, treats meaningful human activity as inefficiency, or counts setup time while ignoring benefits such as reliability. A good result may be a deliberate decision not to automate.

## Study exercises and connections

Choose one recurring task and describe an actual recent run before designing the ideal version. Identify the earliest point where a human judgment is indispensable and how much work can safely happen before it. Then write the brief that person would receive. If the brief cannot be made concise, find out whether the underlying decision is still unclear.

Run a tabletop simulation of an ordinary case and a duplicate, missing-input, or ambiguous case relevant to that workflow. Which unanswered questions are user decisions, and which can an implementer reasonably choose? Compare [grilling](grilling.md) for interview discipline, [to-spec](to-spec.md) for technical specification, and [retro](retro.md) for improving a workflow after observing its actual use.

## Semantic delta: what the refactor changes

1. **Replace impossible completeness with decision completeness.** Require consequential decisions to be settled while leaving ordinary implementation choices open. **Tradeoff:** The implementer may still ask a legitimate new question.

2. **Ground the interview in actual runs.** Use ordinary and awkward examples to reveal missing behavior efficiently. **Tradeoff:** Adds a short simulation rather than relying entirely on conversation.

3. **Bound push-right by the decision.** Delay human interruption through authorized preparation, but stop before the action requiring that judgment. **Tradeoff:** Some workflows retain an earlier checkpoint than maximum automation would prefer.

4. **Preserve state distinctions.** Keep proposals, settled decisions, and abandoned workflow history legible. **Tradeoff:** Slightly more file stewardship than unrestricted create-edit-delete.

5. **Adapt Codex packaging without changing invocation.** Omit Claude-only disable-model-invocation and argument-hint keys while preserving explicit-only policy in the copied agents/openai.yaml. **Tradeoff:** The study package targets Codex metadata rather than being a byte-identical cross-host manifest.

The full executable instructions are in [the refactor](../refactored/loop-me/SKILL.md). Existing invocation policy is preserved through copied agents/openai.yaml: explicit invocation only. Claude-only frontmatter keys are omitted from the Codex package; that packaging change does not change who may invoke it. The original proposal has ordinary discovery and lives in [workflow-payback](../original-skills/workflow-payback/SKILL.md). These are study packages, not installed skills.

## Evaluation boundary

The authorial recommendation above is a hypothesis, not an evaluation result. [The independent evaluation](../evals/loop-me.md) contains the recorded trial responses and judgments. That run record takes precedence over predictions in this chapter. Reading the instructions and inspecting their syntax cannot prove improved collaboration; that requires a task with an observable result and an informative failure case. The source, proposed port, and original proposal should be distinguishable in any comparison.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **tradeoff**. The recurring-work lens, stateful workspace, workflow specs, NOTES vocabulary, optional checkpoints, and decision-ready briefs survive. The candidate relaxes the source's impossible no-question-left completion criterion into no consequential user decision left to guess, and rejects automatic automation of every repeated activity. Those are useful adaptations. However, its compact questioning instruction no longer inherits the precise grilling frontier discipline; this is a deliberate looser interview rather than the original strict wrapper. The readiness examples partially compensate, and no concrete consequential omission is identifiable statically.

Accept this tradeoff if a lighter workflow interview is intended; trials should check dependent questions and premature readiness.

Evidence: [source/skills/in-progress/loop-me/SKILL.md:8-32](../source/skills/in-progress/loop-me/SKILL.md); [refactored/loop-me/SKILL.md:8-18](../refactored/loop-me/SKILL.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **workflow-payback**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It starts from an actual run, compares manual improvement with automation, and includes maintenance, exceptions, recovery, and valued human involvement. The after-pilot check counters sunk-cost defense. This is a substantive domain-specific version of reversible-bets: the accounting model and alternatives are tailored to automation decisions and go beyond a generic experiment plan.

**Weakness:** A short pilot can miss infrequent but expensive exceptions. A plausible time-saving estimate may dominate if the evidence record does not clearly distinguish observed and extrapolated costs.

**Suggested improvement:** Keep as a standalone candidate. Include a simple sensitivity check for rare exceptions and explicitly label which payback inputs were measured, estimated, or extrapolated.

A proposed test was: We spend time reconciling a weekly report. Decide whether to automate it, improve the spreadsheet, or keep it manual, using recent real runs. Success would mean: The recommendation includes total ongoing effort and reliability, tests the uncertainty that could reverse it, and can be revised after actual pilot results. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
