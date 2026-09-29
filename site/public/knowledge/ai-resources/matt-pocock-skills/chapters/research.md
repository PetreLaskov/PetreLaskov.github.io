# Research: delegated reading with a reusable answer

**Source:** [source/skills/engineering/research/SKILL.md](../source/skills/engineering/research/SKILL.md) at [Matt Pocock commit c55ee46073ed](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/research/SKILL.md). Human commentary: [source/docs/engineering/research.md](../source/docs/engineering/research.md). These are the pinned study materials, not claims about the latest upstream release.

**Collaboration bet: ADOPT.** Adopt bounded primary-source research with one delegation level, explicit unresolved claims, and a useful result file.


## Understand the skill

Research is a compact delegation contract. The caller starts a background agent so the main conversation can continue. The worker investigates using primary sources, writes one Markdown file with citations for each claim, and follows the repository's existing note convention (source SKILL.md:6–12). The artifact, source discipline, and background execution are the important parts; it is not a broad theory of scholarly research.

A primary source here is the source that owns the claim: official documentation for an API contract, source code for implementation behavior, a specification for required behavior, or a first-party endpoint for current service output. A blog describing a library may help locate a question but does not substitute for the library's own material. This prevents a chain of summaries from looking like independent confirmation.

The result is a file rather than just a chat answer. That matters when another agent, later session, or design discussion needs the findings. The source does not prescribe a universal folder because repository conventions differ. It also does not prescribe a research-report template. The worker is trusted to organize the answer usefully.

## Worked example: an API migration

Suppose a decision depends on whether a new API version supports resumable uploads and whether the old client can still authenticate. A weak task is “research the API.” A stronger task names those two decision-blocking questions and the versions involved. The worker checks official versioned documentation and relevant source or tests, then records which claims apply to which version.

Imagine the documentation describes resumable upload while the client implementation only supports a single request. These are not necessarily contradictory: the service supports a feature the selected client does not expose. A useful finding distinguishes service capability, client capability, and a possible direct-call workaround. A vague “supported” answer would be cited but still misleading.

The main agent can keep working on unrelated design choices while this happens. It must not decide the blocked compatibility question as if the research were complete. When the file returns, the decision consumes the findings; the report does not make the product choice itself. This preserves the source's distinction between finding facts and deciding what to do.

## When it earns its place

Use it when source reading is substantial enough to delegate and the result needs reuse: documentation comparisons, version-specific behavior, protocol requirements, or third-party constraints. For one obvious lookup, a direct tool call may be cheaper. For whether an approach works in the local codebase, a prototype or targeted test may produce more useful evidence than more reading.

The skill is particularly useful inside a larger planning flow. Wayfinder can resolve research tickets without forcing the human to watch every document being read. Grilling can ask better questions after factual uncertainty is reduced. To-spec can preserve a settled decision while linking its factual basis.

Research notes have a different shelf life from ADRs. A note may say what a service supports today; an ADR records why the project chose a design under those conditions. Treating the note as timeless project law would be a misuse. The source human docs make this distinction, while the executable skill leaves lifecycle management unspecified.

## What it gets right

The strongest feature is the division of labor. A background worker absorbs reading volume while the main conversation keeps its focus. A cited file creates a concrete object the user can challenge. “I read the docs” is difficult to inspect; a claim with a source is easier.

Its primary-source emphasis also reduces accidental dependency on marketing summaries, stale tutorials, and copied mistakes. The skill's brevity leaves the researcher room to choose appropriate evidence rather than forcing every question through the same academic template.

The strongest case for retaining the original is that many tasks only need this small contract. If a caller already supplies a bounded question, version, destination path, and reliable delegation mechanism, the original may be enough. Adding a long evidence ontology to every API lookup would consume more effort than it saves.

## Criticism grounded in the source

The instruction “spin up a background agent” applies to whoever reads the skill. It does not distinguish coordinator from worker. A worker receiving the same skill can delegate again, leaving overlapping or nested runs. The source human docs report this problem, but the defect is visible in SKILL.md:6 itself: there is no role or stopping boundary. The refactor should fix the recursion structurally in the brief, not merely ask the worker to be economical.

There is also no stopping criterion. “Investigate the question” can mean too little or too much. Broad reading may miss a decisive detail while producing a polished survey. The repair is a small answer contract: name what the decision needs, then stop when those points are supported or explicitly unresolved.

Finally, “primary” and “high-trust” are different properties. Official documentation can lag implementation; first-party marketing can make unsupported comparative claims; a specification describes intended behavior, not necessarily observed behavior. The source constraint remains valuable, but citation alone does not prove a claim. A strong report explains evidence scope and does not force conflicting sources into agreement.

## Portability and collaboration bet

The package depends on delegation and source access, but neither should be simulated if absent. A nondelegating environment can perform the work directly while saying so. A worker should receive the actual question and output location, not just “run research,” because that invites it to repeat the coordinator instruction.

My bet is **adopt** after these narrow repairs. I expect lower duplicated effort and more decision-ready findings. The falsifier is a report that has plentiful citations yet leaves the specific decision unanswered, attributes broader support than sources provide, or costs more coordination than direct reading. Count resolved questions and usable evidence, not pages or sources.

## Refactor and numbered delta

1. **Separate coordinator and worker roles.** The coordinator delegates once; an already delegated researcher performs the reading itself. This prevents recursive orchestration while retaining background execution.
2. **Define the answer contract.** Capture the question, relevant version or date, material subquestions, and output path. Infer these from context when possible rather than turning research into an interview.
3. **Distinguish source types.** Documentation, implementation, specification, and observed behavior can answer different claims. Cite each at the right scope.
4. **Stop at supported answers or explicit gaps.** Unavailable evidence remains unresolved. More searching is justified only when it could change a material answer.
5. **Return a compact result with the file.** The artifact remains primary, but a path and key conclusion keep the main task from losing the result.
6. **Avoid incidental lifecycle actions.** Reading does not require creating PRs, publishing reports, or deleting research branches. These occur only within the actual task authorization.

A useful trial should include a worker directly invoking the skill, an official-doc/source mismatch, and an inaccessible key source. The expected result is one actual research run and a report that preserves the mismatch or gap.

## Original proposal: evidence-fork

The original proposal asks how to distinguish competing explanations. It begins when two plausible hypotheses fit the same observations. Instead of gathering more material indiscriminately, it looks for the cheapest observation that would make them predict different outcomes.

For example, uploads fail only for large files. One explanation is token expiry during long requests; another is a proxy size limit. Both fit the initial pattern. A useful fork might compare a slow small upload with a fast large one, using an authorized local fixture. If failures track duration, expiry becomes more plausible; if size, the proxy explanation strengthens. The skill designs the discriminating observation before collecting more evidence.

The limited novelty claim is that this collection includes research and debugging but no standalone procedure for selecting evidence by how sharply it separates rival explanations across domains. It can serve scientific reading, operational diagnosis, or product inference. Its cost is specifying predictions clearly. The falsifier is a proposed observation that all hypotheses predict equally well. That is more data, but not a useful fork.

## Study exercises and connections

Turn a broad topic into two answerable questions. For each, identify which source owns the claim and which source could reveal a mismatch. Write a conclusion that remains useful when the crucial answer is unknown.

Then propose two explanations for a real observation and a test on which they disagree. Connect [prototype](prototype.md) for concrete experiments, [grilling](grilling.md) for user-owned decisions, and [wayfinder](wayfinder.md) for coordinating several kinds of uncertainty.

## Package and evaluation record

Read the [complete refactored skill](../refactored/research/SKILL.md), the [original proposal](../original-skills/evidence-fork/SKILL.md), and the [author metadata](../reviews/author-research.json). The metadata accounts for every source support file. The refactor retains Matt's MIT notice and existing invocation policy; the original proposal uses ordinary discovery. Neither package is installed by this chapter.

[Independent behavioral evaluation](../evals/research.md) now records the trial responses and case-bound grades. The bet above remains a design hypothesis, not a demonstrated collaboration gain. Judge the recorded trial on the behavior it actually tested; tidy formatting alone cannot establish improvement.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. Primary-source investigation and a single cited Markdown artifact remain the core deliverable. The coordinator/worker split repairs the source's recursive-delegation ambiguity when another skill has already spawned the researcher. Direct execution when delegation is unavailable preserves the useful capability rather than treating the host as mandatory infrastructure. The stopping rule still covers every material subquestion, with explicit unresolved gaps, and distinguishes documentation, observation, and inference. No unavailable hard dependency or unsupported proof-of-research claim was found.

None. Treat the explicit unresolved state as part of the deliverable, not a reason to fabricate support.

Evidence: [source/skills/engineering/research/SKILL.md:6-12](../source/skills/engineering/research/SKILL.md), [source/skills/engineering/wayfinder/SKILL.md:77-77](../source/skills/engineering/wayfinder/SKILL.md); [refactored/research/SKILL.md:7-21](../refactored/research/SKILL.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **evidence-fork**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

Competing predictions and a predeclared interpretation make research discriminating. The cheapest useful observation is selected by decision impact, access, reliability, and confounding. This is more concrete than 'research thoroughly' or 'consider alternatives.' It chooses an information-producing action; reversible-bets adds a sustained intervention and recovery plan.

**Weakness:** Choosing among named explanations can conceal a missing explanation, and ranking after one observation can imply more precision than overlapping predictions justify.

**Suggested improvement:** Add a result category for 'none of these explanations predicts this well' and revisit the hypothesis set when observed results fit poorly. Avoid adding a mandatory third explanation.

A proposed test was: This page became slower after deployment. Is the cause larger assets, slower server responses, or client rendering? Choose the cheapest measurement that separates them. Success would mean: The proposed measurement yields materially different predictions for plausible explanations, includes an ambiguous-result branch, and changes the next diagnostic action. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
