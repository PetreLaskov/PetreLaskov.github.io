# Scaffold Exercises: encode the course shape without pretending the course is written

**Source status: misc, retained upstream but rarely used and not promoted.**

**Port bet: conditional.** Create or renumber course exercise skeletons that follow the repository conventions and pass its actual structure checks.

## Source and reading map

- [SKILL.md:6-42](../source/skills/misc/scaffold-exercises/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/misc/scaffold-exercises/SKILL.md#L6)
- [SKILL.md:44-77](../source/skills/misc/scaffold-exercises/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/misc/scaffold-exercises/SKILL.md#L44)
- [SKILL.md:79-106](../source/skills/misc/scaffold-exercises/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/misc/scaffold-exercises/SKILL.md#L79)
- [agents/openai.yaml:1-3](../source/skills/misc/scaffold-exercises/agents/openai.yaml) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/misc/scaffold-exercises/agents/openai.yaml#L1)

## Understand the source

Scaffold-exercises creates the directory structure for a course. Sections live under exercises with a two-digit prefix, such as 05-memory-skill-building. Exercises live inside a section with a matching section number and their own position, such as 05.02-short-term-memory. Names are lower-case dash-case. Each exercise has one or more variant folders: problem for student work, solution for a reference implementation, or explainer for conceptual material.

The source defaults an unspecified stub to explainer. Each variant needs a nonempty readme.md with real content, even if that is only a title. If the variant contains code, it also needs a main.ts with more than one line; a readme-only stub is allowed. The workflow extracts names and variants from a supplied plan, creates directories and readmes, runs pnpm ai-hero-cli internal lint, and fixes structural errors. The opening instruction also asks for a Git commit.

The listed linter rules are more specific than the earlier “at least one variant” wording. They require at least one problem, explainer, or explainer.1 primary folder, so a solution-only exercise is not sufficient under the described checks. They forbid .gitkeep, speaker-notes.md, broken readme links, and pnpm run exercise commands in readmes. Those are repository conventions, not universal principles of educational design.

## What makes this a useful skill

This is a good example of a narrow skill carrying non-obvious local knowledge. A general coding assistant can make directories easily; it does not automatically know the required numeric relation, allowed variant names, linter command, or readme-only exception. Encoding those details saves repeated correction and lets the assistant turn a course plan into a valid skeleton quickly.

The separation between problem, solution, and explainer is also a useful authoring model. A problem is an activity the student performs; a solution demonstrates one completed approach; an explainer conveys material without pretending to be an exercise. Defaulting a stub to explainer avoids fabricating unfinished code merely to fill a folder. A scaffold should establish places where teaching material will go, not falsely signal that the material is complete.

Use the skill inside a course repository that follows this convention, or when the user explicitly chooses it for a new course. Do not apply the ai-hero structure to an unrelated training project merely because it has exercises. The exact linter must exist in the target environment. If it is absent, the assistant can create the requested skeleton and report which checks remain unavailable, but cannot honestly claim compatibility with an unrun command.

## Worked example and collision handling

A plan says: Section 05, Memory Skill Building; 05.01 Introduction to Memory; 05.02 Short-term Memory with explainer, problem, and solution; 05.03 Long-term Memory. The source creates three exercise directories. The first and third receive explainer/readme.md, while the middle receives all three variants. Each readme has the relevant title and a short description. No main.ts is necessary because these are readme-only stubs.

Now suppose 05.02 already exists with substantial student code. A robust scaffolder reads that state and creates only missing requested parts. It must not replace the exercise because the plan looks cleaner than the current directory. If the plan gives two exercises the same number or a name resolves to an existing path with different content, that is a real ambiguity to surface. A collision-free plan can proceed without a confirmation ceremony; a conflicting identifier cannot be resolved by silently overwriting work.

Renumbering introduces another dependency. Moving 05.03 to 05.04 may break links from section readmes or navigation files. The source calls for git mv and a linter rerun. Git mv is useful for staging a rename, but Git's historical rename detection is based on content similarity rather than a magical preserved-history marker. The port keeps Git-aware moves where appropriate while focusing on what matters: content survives, references update, and the course order remains consistent.

## Strengths and criticism

The source is concrete enough to execute: paths, variant names, required files, a validation command, and an example are all present. It also distinguishes readme-only stubs from code-bearing variants, which prevents unnecessary fake source files. Its prohibition on empty placeholders can help keep a course repository navigable even while content is incomplete.

The main weakness is conflating structural validity with educational readiness. A one-line title can satisfy the stated nonempty rule while offering no usable learning activity. That is acceptable for a scaffold if honestly labeled, but not for a finished exercise. The unconditional commit instruction also risks bundling unrelated working-tree changes if implemented casually. The source does not explicitly say to stage only files created or moved for this task.

The strongest reason to keep the original is precisely its local specificity. Generalizing it into a universal curriculum skill would dilute the information that makes it useful. The port should not replace its directory contract with a vague educational design framework. It should keep the convention, detect actual repository support, preserve existing content, and clarify what “lint-ready scaffold” does and does not mean.

## Refactor and collaboration bet

The proposed version reads the existing exercise tree and current linter configuration before mapping the plan. It checks number/name collisions, distinguishes solution-only folders from valid primary variants, preserves existing content, and updates links during moves. It creates concise honest descriptions instead of generic filler, runs the available structural check, and reports remaining content work. Commit behavior follows the requested delivery scope, with only task-owned files staged.

My bet is conditional adoption for repositories using this course convention. It should reduce naming corrections and prevent accidental overwrites while preserving the source's speed. The falsifier is that adapting the skill takes longer than creating the scaffold manually, or that it claims completion after lint passes while the user expected real exercises. Another failure is treating the source linter summary as authoritative when the actual installed linter has evolved.

Portability is therefore medium rather than universal. The Markdown and directory conventions transfer easily, but pnpm ai-hero-cli internal lint is a specific tool dependency. The package contains no bundled scaffold script to audit, and none has been executed against a real course during this authoring task. The proposed behavior relies on reading the target environment and reporting actual validation, not assuming a copied command exists.

## An original proposal: misconception-lab

Misconception-lab designs a learning exercise around a specific plausible wrong model. Start with what the learner should be able to do and a mistake that reveals why their current model is insufficient. Build the smallest task whose result distinguishes that mistake from genuine understanding. The output includes the learner prompt, a minimal setup, a worked solution, a diagnostic rubric, and one transfer variant. It can then be placed into a scaffold produced by Matt's skill.

For a memory-systems lesson, learners might assume that adding every retrieved note to context always improves an answer. An exercise can provide a relevant note, an outdated contradictory note, and an irrelevant but vivid note. The task asks learners to decide what to include and explain the selection. The failure mode is not merely “wrong answer”; it reveals an indiscriminate accumulation model. A transfer variant changes the subject while preserving the decision structure, testing whether the learner understood the principle rather than memorized the example.

The proposal's novelty within this collection is the diagnostic design of exercises, rather than their folder structure or generic teaching conversation. Its cost is selecting an authentic misconception and designing discriminating evidence. It fails if the wrong model is a straw man, if the correct answer is telegraphed by wording, or if success depends on hidden trivia. A strong exercise gives the learner enough information to reason and gives the teacher enough evidence to interpret the result.

## Study exercises and connections

Take a short course plan and map it into directories without writing educational content. Mark which files are scaffolds and which are complete artifacts. Introduce a duplicate exercise number and a preexisting solution, then decide how a safe rerun should behave. Check whether every requested variant has a meaningful place.

Next, turn one explainer into a real problem by naming the capability it should test and a plausible wrong answer. What additional material makes the student's response diagnostic? Compare [teach](teach.md) for interactive learning, [writing-shape](writing-shape.md) for presenting explanations, and [to-tickets](to-tickets.md) for the related act of turning a plan into concrete units without pretending those units are already completed.

## Semantic delta: what the refactor changes

1. **Inspect actual course conventions.** Read existing structure and installed checks before applying the source naming and file rules. **Tradeoff:** Less portable as a blind scaffold generator, more reliable in a real repository.

2. **Make reruns preserve work.** Detect collisions, create missing content, and update references during renumbering. **Tradeoff:** Conflicting plans may need a concrete user decision.

3. **Clarify primary variants.** Resolve the source prose/linter mismatch by requiring a valid primary problem or explainer under this convention. **Tradeoff:** Solution-only plans need an accompanying primary variant.

4. **Separate scaffolding from teaching completeness.** Report a lint-ready skeleton honestly and leave educational content work visible. **Tradeoff:** The result may look less finished than a passing linter suggests.

5. **Scope commit behavior.** Commit when included in requested delivery and stage only task-owned changes. **Tradeoff:** Removes the source unconditional commit as a universal default.

The full executable instructions are in [the refactor](../refactored/scaffold-exercises/SKILL.md). Existing invocation policy is preserved through copied agents/openai.yaml: ordinary discovery. Claude-only frontmatter keys are omitted from the Codex package; that packaging change does not change who may invoke it. The original proposal has ordinary discovery and lives in [misconception-lab](../original-skills/misconception-lab/SKILL.md). These are study packages, not installed skills.

## Evaluation boundary

The authorial recommendation above is a hypothesis, not an evaluation result. [The independent evaluation](../evals/scaffold-exercises.md) contains the recorded trial responses and judgments. That run record takes precedence over predictions in this chapter. Reading the instructions and inspecting their syntax cannot prove improved collaboration; that requires a task with an observable result and an informative failure case. The source, proposed port, and original proposal should be distinguishable in any comparison.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **tradeoff**. Section and exercise numbering, supported variants, nonempty readmes, the primary problem/explainer requirement, readme-only stubs, linting, and link-aware moves remain. The candidate correctly treats the installed linter and repository conventions as the operational source of truth rather than universalizing this author's course layout. It also avoids overwriting existing work. Committing is now conditional on requested delivery, whereas the source always commits. That is a visible delivery-policy tradeoff, not a loss of scaffolding behavior. Structural validity is correctly separated from educational completeness.

Accept conditional commit delivery if intended for this host. No scaffold-semantic repair is indicated.

Evidence: [source/skills/misc/scaffold-exercises/SKILL.md:8-71](../source/skills/misc/scaffold-exercises/SKILL.md); [refactored/scaffold-exercises/SKILL.md:8-18](../refactored/scaffold-exercises/SKILL.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **misconception-lab**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It constructs a task where a plausible wrong model predicts a different response, separates answer material, and trials for shortcuts. The diagnostic criterion is stronger than exercise completion. This is the exercise-authoring component of the learning family, whereas transfer-test assesses an existing learner and design-the-learning-sequence orchestrates multiple attempts.

**Weakness:** A single wrong answer may have several causes, so the proposed diagnostic rubric can overidentify the named misconception unless the response reveals the reasoning that produced it.

**Suggested improvement:** Require a minimal reasoning trace or follow-up where identical outputs fit several explanations. Retain independent-solver trials, while reporting what the exercise can distinguish rather than claiming a psychological diagnosis.

A proposed test was: Design a short exercise that distinguishes believing asynchronous operations always finish in call order from understanding completion order, without using trick wording. Success would mean: The task discriminates the two specified models, requires relevant reasoning, avoids an obvious answer cue, and includes a transfer variant and separate worked solution. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
