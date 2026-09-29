---
name: setup-pre-commit
description: "Integrate Husky and lint-staged with existing repository checks while preserving scripts, staged work, and usable commit latency."
---

# Setup Pre-Commit

Integrate the requested Husky/lint-staged setup with the repository's existing workflow. Inspect packageManager metadata, lockfiles, workspace root, prepare scripts, hooks, formatter configuration, and available check commands. Resolve conflicting package-manager evidence before installing; do not create a second lockfile by default.

Use compatible installed-tool documentation or local help for initialization and hook syntax. Add development dependencies through the project's package manager. Preserve existing prepare behavior, hooks, and lint-staged rules; merge narrowly rather than overwriting them. Reuse the existing formatter. Add Prettier configuration only when the user chose Prettier and no configuration exists.

Run formatting on staged supported files through lint-staged. Select noninteractive checks whose local cost fits the requested commit workflow. Inspect test scripts for watch mode, network requirements, and full-suite cost. Preserve required CI checks; do not imply local hooks alone enforce shared policy. Explain a meaningful departure from the source default of formatting, typecheck, then tests.

Verify configuration and failure propagation in an isolated Git fixture or another safe target. Observe a formatting correction, a blocking failure, and a clean pass. Test partial-staging preservation when the repository uses it. Do not reformat unrelated working-tree files or make an unnecessary live commit solely to test installation.

If a task commit is part of the requested delivery, stage only setup-owned changes, inspect the staged diff, and commit through the new hook. Otherwise leave the reviewable changes. Report actual commands wired, checks run, local latency if measured, and remaining integration limitations. Never equate file existence with working hook invocation.
