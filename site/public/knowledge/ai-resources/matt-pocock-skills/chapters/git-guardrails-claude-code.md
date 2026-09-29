# Git Guardrails for Claude Code: a useful tripwire is not a permission boundary

**Source status: misc, retained upstream but rarely used and not promoted.**

**Port bet: defer.** Configure scoped Claude Code git restrictions with an explicit distinction between enforceable permissions and a limited legacy command-pattern tripwire.

## Source and reading map

- [SKILL.md:6-35](../source/skills/misc/git-guardrails-claude-code/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/misc/git-guardrails-claude-code/SKILL.md#L6)
- [SKILL.md:37-95](../source/skills/misc/git-guardrails-claude-code/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/misc/git-guardrails-claude-code/SKILL.md#L37)
- [scripts/block-dangerous-git.sh:1-25](../source/skills/misc/git-guardrails-claude-code/scripts/block-dangerous-git.sh) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/misc/git-guardrails-claude-code/scripts/block-dangerous-git.sh#L1)
- [agents/openai.yaml:1-3](../source/skills/misc/git-guardrails-claude-code/agents/openai.yaml) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/misc/git-guardrails-claude-code/agents/openai.yaml#L1)

## Understand the source

The source installs a Claude Code PreToolUse hook for the Bash tool. The hook reads the tool input JSON, extracts the command through jq, and searches it for a list of regular-expression patterns. A match prints a blocked message to stderr and exits with status 2. The intended blocked operations include all git pushes, hard resets, forced cleans, forced branch deletion, and broad checkout or restore commands. Installation can be project-local or global, and the source explicitly asks which scope the user wants.

The installer copies the script into the selected .claude/hooks directory, makes it executable, and merges a hook entry into settings.json without overwriting unrelated settings. It asks about pattern customization and verifies one payload, git push origin main, expecting a blocked result. The source has ordinary discovery because requests to add git safety hooks should find it; ordinary discovery does not itself authorize a global installation.

The crucial word is “pattern.” This is not an interpreter for shell syntax, Git configuration, aliases, wrappers, scripts, or all ways a process can modify a repository. It is a small text filter attached to one tool name. That can be useful against a familiar accidental command, but the source's language about preventing dangerous operations is stronger than the bundled implementation establishes.

## What the script actually detects

The implementation contains plain substrings such as git push and regular expressions such as git checkout followed by a literal dot. It loops through them with grep -qE. There is no tokenization, command-boundary recognition, normalization of Git global options, or explicit handling of jq failure. A command like git -C some-repo push does not contain the exact substring git push. A harmless echo containing that substring can match. Different argument ordering and alternate ways to discard work can escape the small list.

These observations began with inspection of the complete twenty-five-line script. A separate isolated helper run subsequently exercised eleven inert command-classification payloads without executing any Git operation. Six matched the intended classification. Misses included clean -df, checkout -- ., restore --worktree ., and branch --delete --force; a harmless printf containing quoted git push was blocked. Because jq was unavailable, that run substituted a fixture-only Node JSON-selector function. See the [actual helper evidence](../evals/HELPER-TESTS.md) and [machine-readable record](../evals/helper-tests.json). This supports the matcher findings, not original-runtime equivalence or host integration. The study package retains the helper as an inactive audited baseline; no real project or global hook was installed.

The difference matters practically. If the user wants a reminder before ordinary pushes, a heuristic tripwire may be adequate. If they want an agent to lack authority to mutate a remote or discard local work, the enforcement must be expressed at a supported permission boundary and tested in the actual host. A prompt saying “do not use these commands” and a substring filter are both weaker than a capability restriction.

## Worked example: narrow success and broad overclaim

Suppose a user explicitly requests a project-only warning against accidental pushes. The source installs its hook in that project, preserving another existing hook. A synthetic JSON payload containing git push origin main is piped to the script. Exit 2 demonstrates that this exact input matches the filter and that its output convention works in the test shell. It does not yet demonstrate that Claude invokes the hook, that the settings path is correct, or that alternative tool surfaces are covered.

A meaningful target verification must therefore include a harmless invocation through the actual hooked tool, a permitted read such as git status, and cases that test the limits of the selected policy. Payload tests should never execute the destructive Git operation; they test the hook's decision. A disposable repository can support an integration test without risking real work. A direct-script test and a host-level hook test answer different questions.

Now change the request to “make sure no agent can ever push from this machine.” The source cannot deliver that guarantee. Global installation still only covers the named hook surface and still uses the same text matcher. The right response is to identify the available host permission mechanism, explain coverage, and implement only a claim that can be substantiated. Expanding regexes indefinitely is not equivalent to covering all execution paths.

## What it gets right and what must change

The source gets scope selection and settings merging right. It ships a concrete artifact rather than vague advice, and its one negative payload test is better than merely checking that a hook file exists. It also gives the user a visible block message, which makes an interruption interpretable. These are worth preserving in any stronger implementation.

The major defect is capability overclaim. “Blocks dangerous git commands” sounds like a policy boundary while the implementation is a best-effort command-string heuristic. The blocked list also conflates potentially irreversible local operations with every push, including ordinary authorized collaboration. That may be exactly the user's preference, but it should be a chosen policy rather than an unexamined universal definition of danger. Global scope increases the cost of false positives.

The strongest reason to retain the original is its simplicity in a narrow environment. A personal tripwire against a habitual command does not need to solve adversarial shell analysis. Its maintainability may be more valuable than a large custom parser. The port should preserve that useful modest version while refusing to label it stronger than it is. A user who wants genuine enforcement should be guided toward a supported host control, not sold a more elaborate imitation.

## The proposed port and collaboration bet

The refactor starts by resolving the desired operation policy and scope from the request. It inspects current host capabilities and settings, prefers supported permissions for enforcement, and keeps the legacy matcher available only as a clearly bounded tripwire. It preserves unrelated configuration and avoids duplicate entries. Verification separates payload decisions from actual host invocation, includes allowed reads, and records unhandled surfaces. No tool or shell configuration is installed during this study exercise.

My recommendation is defer for a direct Codex port. The source is tied to Claude Code and Bash, while a Codex environment may have different tool names, permission controls, and command parsing. The useful reusable idea is early interception with a clear message; the implementation should be host-native. The falsifier of a proposed guard is not merely one blocked push but any ordinary route within its claimed coverage that performs the prohibited operation. False positives matter too: a guard that routinely interrupts harmless work may be disabled.

The port's success criterion must state its level: a tested tripwire for specified command forms, or an enforced restriction over stated capabilities. Neither should be inferred from a file copy. This is the main lesson of the chapter: a safety-oriented tool deserves especially precise claims about what was actually tested.

## An original proposal: reversible-operation-design

Reversible-operation-design improves the operation itself before relying on a guard to block mistakes. Given a planned bulk edit, migration, cleanup, or configuration change, it asks how to make the action inspectable, narrowly targeted, resumable, and undoable. It produces a concrete preview and recovery path appropriate to the task. It is not a generic approval checklist; the central design question is what state must be preserved to reverse the specific operation.

For a repository cleanup, that might mean moving candidate files to a dated quarantine within the workspace and recording their original paths, rather than immediately deleting them. For a schema migration, a code revert may be insufficient, so the design must address data transformation and compatibility. For a settings edit, a small patch plus the prior value may be enough. The mechanism changes with the operation.

Within this collection, the proposal shifts from denying risky command strings to engineering a safer action plan. It costs storage, implementation effort, or temporary compatibility machinery. It fails if it creates a theatrical rollback document that cannot restore the relevant state, or if it complicates trivial edits unnecessarily. A useful result lets the user inspect what will change and gives the executor a tested or clearly bounded way back.

## Study exercises and connections

Classify five commands as a direct match, likely miss, or likely false positive under the exact source patterns, then keep that classification separate from actual executed results. Include a harmless command containing quoted Git text and a Git command with global options. Explain what a one-case payload test proves and what it does not.

Next, choose a real operation and define its recovery state. Can a code revert restore data, external messages, or deleted files? Compare [setup-pre-commit](setup-pre-commit.md) for another hook workflow, [resolving-merge-conflicts](resolving-merge-conflicts.md) for preserving intent through Git operations, and [pr](pr.md) for communicating concrete reversal costs.

## Semantic delta: what the refactor changes

1. **Correct the claim boundary.** Distinguish supported permissions from a limited command-pattern tripwire; the retained script is inactive by default. **Tradeoff:** The port may decline to promise enforcement the source title implies.

2. **Preserve scope and configuration.** Reuse explicit project/global scope and merge existing hooks without duplication. **Tradeoff:** Requires inspecting current settings rather than pasting a sample.

3. **Broaden meaningful verification.** Separate synthetic decision tests from actual host invocation and include permitted reads plus known limitations. **Tradeoff:** More verification work than one blocked payload.

4. **Audit rather than disguise the legacy helper.** Retain the exact source helper with a limitation reference and no assertion of current execution. **Tradeoff:** The package is transparent about unresolved enforcement rather than pretending the code was hardened.

The full executable instructions are in [the refactor](../refactored/git-guardrails-claude-code/SKILL.md). Existing invocation policy is preserved through copied agents/openai.yaml: ordinary discovery. Claude-only frontmatter keys are omitted from the Codex package; that packaging change does not change who may invoke it. The original proposal has ordinary discovery and lives in [reversible-operation-design](../original-skills/reversible-operation-design/SKILL.md). These are study packages, not installed skills.

## Evaluation boundary

The authorial recommendation above is a hypothesis, not an evaluation result. [The independent evaluation](../evals/git-guardrails-claude-code.md) contains the recorded trial responses and judgments. That run record takes precedence over predictions in this chapter. Reading the instructions and inspecting their syntax cannot prove improved collaboration; that requires a task with an observable result and an informative failure case. The source, proposed port, and original proposal should be distinguishable in any comparison.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. The source overclaims broad blocking from a regex over Bash command text. The refactor explicitly distinguishes enforceable permissions from an optional accidental-command tripwire and marks the retained script inactive until deliberately selected. Its separate audit correctly exposes literal matching, false positives, alternate execution paths, and malformed-input limitations without pretending static inspection is execution. Synthetic tests and host-invocation verification are distinct. This is a substantial faithful repair of the user's useful restriction intent, rather than preservation of an unsound guarantee. No additional actionable defect found.

None. Treat the installed host's actual permission capabilities as a prerequisite for any enforcement claim.

Evidence: [source/skills/misc/git-guardrails-claude-code/SKILL.md:8-18](../source/skills/misc/git-guardrails-claude-code/SKILL.md), [source/skills/misc/git-guardrails-claude-code/scripts/block-dangerous-git.sh:3-25](../source/skills/misc/git-guardrails-claude-code/scripts/block-dangerous-git.sh); [refactored/git-guardrails-claude-code/SKILL.md:8-18](../refactored/git-guardrails-claude-code/SKILL.md), [refactored/git-guardrails-claude-code/references/legacy-hook-audit.md:3-15](../refactored/git-guardrails-claude-code/references/legacy-hook-audit.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **reversible-operation-design**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It distinguishes code reversal from undoing effects, ties preview to current state, bounds computed paths, and accounts for partial completion. Recovery is treated as an actual supported capability. This is a concrete operational design skill rather than a generic caution checklist. Its state-consistent preview and recovery obligations differ materially from reversible-bets' experimental decision process.

**Weakness:** The needed recovery mechanism can vary greatly across files, identifiers, and external systems. A representative sample may not reveal a failure mode unique to a later batch.

**Suggested improvement:** Retain as a strong pilot. Select the recovery sample by consequential state variation, and explicitly distinguish a tested representative reversal from an untested claim that every completed unit can be restored.

A proposed test was: Plan and execute this authorized bulk rename so targets are previewed from current state, partial completion is recorded, and the original paths can be recovered. Success would mean: Actual affected targets match the scoped preview, state drift cannot silently broaden the operation, and recovery evidence covers the state the operation changes. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
