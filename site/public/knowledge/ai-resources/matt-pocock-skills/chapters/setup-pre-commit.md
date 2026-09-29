# Setup Pre-Commit: put checks where their feedback is worth the interruption

**Source status: misc, retained upstream but rarely used and not promoted.**

**Port bet: conditional.** Integrate Husky and lint-staged with existing repository checks while preserving scripts, staged work, and usable commit latency.

## Source and reading map

- [SKILL.md:8-35](../source/skills/misc/setup-pre-commit/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/misc/setup-pre-commit/SKILL.md#L8)
- [SKILL.md:37-79](../source/skills/misc/setup-pre-commit/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/misc/setup-pre-commit/SKILL.md#L37)
- [SKILL.md:81-91](../source/skills/misc/setup-pre-commit/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/misc/setup-pre-commit/SKILL.md#L81)
- [agents/openai.yaml:1-3](../source/skills/misc/setup-pre-commit/agents/openai.yaml) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/misc/setup-pre-commit/agents/openai.yaml#L1)

## Understand the source

Setup-pre-commit installs Husky, lint-staged, and Prettier as development dependencies. It detects a package manager from lockfiles, initializes Husky, creates a pre-commit hook, configures lint-staged to run Prettier over staged files, and creates a Prettier configuration only if none exists. The hook runs formatting first, followed by the repository's typecheck and test scripts when present. Finally it stages the changes and commits them, using the commit itself as a smoke test.

The source's default lint-staged pattern is broad: every staged path is passed to Prettier with ignore-unknown and write. This avoids trying to format unsupported file types, while still applying to supported text formats. The Prettier defaults include two-space indentation, eighty-column width, double quotes, semicolons, and es5 trailing commas. These are fallback preferences, not universal formatting requirements. Existing configuration is supposed to remain in place.

The source notes a Husky v9-era hook convention and uses npx husky init. Its example hook includes npx lint-staged followed by npm run typecheck and npm run test, with an instruction to adapt the package manager. The source's package-manager detection includes older lockfile names and defaults to npm when unclear. A modern portable installer must inspect the actual repository rather than assume those heuristics are exhaustive.

## The useful idea behind the setup

A check only helps if it runs at a point where its feedback can still change the work. Pre-commit hooks provide local feedback before a change enters history. Staged-file formatting keeps the fast first step focused on the files being committed. Type checking and tests can catch broader failures that formatting cannot. This is a practical way to turn a convention from a remembered instruction into repeatable feedback.

The source is also trying to make installation concrete. It names dependencies, files, scripts, and verification. That is better than telling the user to “add quality gates.” In a small TypeScript repository with quick tests and no existing hook setup, the defaults may be entirely reasonable. A commit smoke test can reveal shell-path or hook-invocation problems that reading configuration alone misses.

Use this skill when the user wants commit-time checks or a Husky/lint-staged setup. Do not assume every repository needs the same stack. Existing hooks, another formatter, a different language, monorepo task runners, or expensive integration suites can change the design. A pre-commit hook is a developer feedback mechanism, not complete enforcement: users can bypass local hooks, and remote checks still matter for shared policy.

## Worked installation with existing state

Suppose a repository already has a prepare script that generates assets, a partial lint-staged configuration for JavaScript, and a test command that starts a watch process. Running an initializer and replacing these files verbatim would break the project or make every commit hang. A careful installer first reads the current scripts and configuration. It preserves the asset generation behavior, merges formatting coverage rather than creating a competing config, and selects a non-watch test command if one exists.

The staging state matters too. A user may have staged one hunk of a file while leaving another unfinished. Formatting can modify the entire file, and lint-staged has mechanisms to manage staged work that vary with configuration and version. The installer should understand and verify the actual behavior in an isolated fixture before claiming partial-staging preservation. Running a broad formatter directly over the working tree as a “test” can destroy the user's intended split.

A representative verification includes a badly formatted staged file that becomes formatted, a relevant failing check that blocks the hook, and a clean case that passes. These can be tested in a disposable repository without making a commit in the user's project merely for evidence. If a real task commit is already part of the authorized delivery, it can provide additional smoke-test evidence, but it should contain only the setup's own files.

## What it gets right and its failure modes

The source correctly installs development dependencies, preserves an existing Prettier configuration, omits nonexistent check scripts, and explains the chosen check order. Its broad formatter pattern plus ignore-unknown is concise. It also recognizes that a configuration file existing is weaker evidence than an actual hook run.

The main risks are destructive integration with existing setup and poor feedback economics. Husky initialization may change a prepare script; writing a new hook can discard existing commands; a full test suite may be slow, flaky, network-dependent, or interactive. A hook that adds several minutes to every small commit often encourages bypassing it. The source's “stage all changed/created files” wording can also capture unrelated user changes. The default package-manager fallback can create a second lockfile in an ambiguous repository.

The strongest reason to keep the original is that its straightforward default may be exactly right for a simple project. An elaborate optimizer that spends an hour selecting checks could cost more than it saves. The port should therefore inspect just the relevant existing state and choose a pragmatic default, while treating known costly or interactive checks differently. The aim is a dependable setup that people will actually use.

## Refactor, execution boundary, and collaboration bet

The refactor uses package metadata and lockfiles together, preserves existing scripts and hooks, respects the current formatter, and checks command behavior before wiring it. Fast deterministic local checks belong in the hook; slow integration work may remain in CI or another established surface. It verifies formatting and failure propagation in an isolated staging fixture, including partial staging where relevant. It reports exactly which checks run locally and which remain elsewhere.

This study package contains instructions, not an installed hook. No dependencies, prepare scripts, staged files, or live Git configuration were changed during authoring. The source's version-specific examples are retained as historical context in the chapter, while the refactor requires checking the installed tool's supported syntax at execution time. That keeps the package useful without pretending a pinned example proves compatibility with every later version.

My bet is conditional adoption in repositories that want this stack. Success means useful failures appear before commits with tolerable delay and without disrupting staged work. The falsifier is a hook routinely bypassed because of cost, or an installation that overwrites an existing task. Measure typical and worst-case local duration, failure relevance, and staging preservation. The presence of Husky in devDependencies is not an outcome by itself.

## An original proposal: feedback-budget

Feedback-budget designs where checks should run according to the decisions they can improve and the cost of waiting for them. It inventories existing checks, their typical duration, determinism, scope, and defect types. It then places them at appropriate moments: editor, on-demand local command, pre-commit, pre-push, CI, or scheduled verification. The output is a small feedback map and a minimal change that improves time to useful information.

For example, formatting and a quick static check may fit pre-commit; a forty-second typecheck may be tolerable or may run through an incremental task runner; a twenty-minute integration suite belongs elsewhere unless the workflow specifically requires it. A rare but severe migration test may deserve a targeted mandatory run when migration files change. The method does not assume faster is always better. It asks which delay prevents which costly mistake.

Within this collection, the proposal adds explicit scheduling of engineering feedback rather than simply installing one hook stack. Its cost is measuring real command behavior and maintaining a small map as the repository evolves. It fails if the map becomes a spreadsheet nobody uses, if it removes important checks merely to optimize speed, or if guessed timings drive decisions. A successful result shortens the time between introducing a defect and receiving an actionable signal without making routine work unpleasant.

## Study exercises and connections

Inspect a repository's package scripts and classify each as fast deterministic, slow deterministic, interactive, flaky, or externally dependent based on actual behavior where possible. Which are suitable for every commit, and which should run only when relevant files change? State what evidence is missing before deciding.

Then design an isolated partial-staging test: one staged change, one unstaged change, a formatter, and a failing check. What must remain true afterward? Compare [retro](retro.md) for discovering unwired checks, [setup-ts-deep-modules](setup-ts-deep-modules.md) for a specific boundary check, and [git-guardrails-claude-code](git-guardrails-claude-code.md) for the distinction between hook behavior and a stronger enforcement claim.

## Semantic delta: what the refactor changes

1. **Preserve the existing workflow.** Merge hooks, prepare scripts, formatting rules, and workspace conventions instead of initializing over them. **Tradeoff:** Installation needs a small repository inspection.

2. **Use actual package-manager evidence.** Read packageManager metadata and lockfiles, resolving conflicts instead of defaulting blindly to npm. **Tradeoff:** An ambiguous repository may need a targeted clarification.

3. **Budget local feedback.** Choose noninteractive useful checks and account for slow or external suites while preserving required CI coverage. **Tradeoff:** The hook may not run the source entire default suite.

4. **Test staging and failure behavior.** Use isolated fixtures for formatting, blocking failures, clean runs, and partial-staging preservation. **Tradeoff:** Verification is more involved than checking files or running lint-staged once.

5. **Scope the commit.** Use a live commit only when it belongs to the task and stage only owned changes. **Tradeoff:** Removes unconditional committing as an installation proof.

The full executable instructions are in [the refactor](../refactored/setup-pre-commit/SKILL.md). Existing invocation policy is preserved through copied agents/openai.yaml: ordinary discovery. Claude-only frontmatter keys are omitted from the Codex package; that packaging change does not change who may invoke it. The original proposal has ordinary discovery and lives in [feedback-budget](../original-skills/feedback-budget/SKILL.md). These are study packages, not installed skills.

## Evaluation boundary

The authorial recommendation above is a hypothesis, not an evaluation result. [The independent evaluation](../evals/setup-pre-commit.md) contains the recorded trial responses and judgments. That run record takes precedence over predictions in this chapter. Reading the instructions and inspecting their syntax cannot prove improved collaboration; that requires a task with an observable result and an informative failure case. The source, proposed port, and original proposal should be distinguishable in any comparison.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. Husky, lint-staged, staged formatting, relevant type/test checks, and working hook validation remain the useful purpose. The refactor preserves existing scripts, formatters, hooks, lockfile conventions, and partial staging rather than overwriting them with defaults. Noninteractive and latency-aware check selection is a sensible adaptation of the source's full-suite default, with departures explained and CI obligations retained. The required correction, blocking failure, and clean-pass observations substantiate more than file existence. Conditional task commits avoid using the user's index merely as a smoke test. No actionable defect found.

None. Do not turn isolated fixture success into a claim that an untested live host invocation works.

Evidence: [source/skills/misc/setup-pre-commit/SKILL.md:17-91](../source/skills/misc/setup-pre-commit/SKILL.md); [refactored/setup-pre-commit/SKILL.md:8-16](../refactored/setup-pre-commit/SKILL.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **feedback-budget**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It maps existing checks to the decisions they influence and balances detection, delay, reliability, and effort. One measured improvement keeps this from becoming a toolchain redesign exercise. This is specific engineering workflow design, with defect coverage and timing as the mechanism. Workflow-payback concerns whether to automate; this places already valuable signals appropriately.

**Weakness:** Moving an expensive check later may preserve nominal coverage while losing enforcement before an irreversible decision. 'Continued coverage' needs to include when failure can still block the action.

**Suggested improvement:** Track each moved check's latest safe blocking point, not just whether it still runs somewhere. Verify a failure travels to the intended decision owner as well as measuring duration.

A proposed test was: Our commit hook takes twelve minutes and developers bypass it. Reposition existing checks so useful failures arrive promptly without losing required protection before merge. Success would mean: Representative before-and-after runs show feedback timing, intended failures remain visible at actionable points, and mandatory coverage and enforcement are preserved. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
