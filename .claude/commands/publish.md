---
description: Build, commit, push, and watch the deploy of the Quartz site
argument-hint: "[optional commit message override]"
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git add:*), Bash(git commit:*), Bash(git push:*), Bash(git log:*), Bash(npx quartz build), Bash(gh run list:*), Bash(gh run watch:*), Bash(gh run view:*), Read
---

Publish content changes to https://petrelaskov.github.io/.

Working dir is the project root (cwd when this command was invoked).

## Steps

1. **Check for changes.** Run `git status --porcelain`. If empty, print "Nothing to publish — working tree clean." and stop.

2. **Validate locally.** Run `npx quartz build` (≈20–30s). If it fails, print the error and stop. Never push a broken build — catching it here is the whole point.

3. **Stage.** `git add content/ raw/ quartz.config.ts quartz.layout.ts .github/ CLAUDE.md README.md` — only paths that affect the published site or its build. Never stage `node_modules/`, `public/`, `.quartz-cache/`, or `.claude/settings.local.json`. If `git status --porcelain` reveals other unexpected files (e.g. new top-level config), ask the user before adding them.

4. **Commit.**
   - If $ARGUMENTS is non-empty, use it verbatim as the message.
   - Otherwise, read `git diff --cached --stat` and `git diff --cached` (truncate if huge) and write a 1-line message that describes the change. Match the style of `git log --oneline -5` — short, imperative, no scope prefix (e.g. "Add Meditation Wiki to projects", "Update index thesis", "Restyle nav").
   - Append the standard `Co-Authored-By: Claude` footer (HEREDOC form).

5. **Push.** `git push`.

6. **Watch the deploy.** Get the workflow run ID for the just-pushed commit:
   ```
   RUN_ID=$(gh run list --branch main --workflow deploy.yml --limit 1 --json databaseId --jq '.[0].databaseId')
   ```
   If `gh run list` returns nothing yet (GitHub takes a moment to register a push), retry the command once after a brief delay. Then `gh run watch $RUN_ID --exit-status` — this blocks until the deploy finishes (~40s for this site).

7. **Report.**
   - On success: print `✅ Live at https://petrelaskov.github.io/` and the run URL.
   - On failure: run `gh run view $RUN_ID --log-failed | tail -80` and report what broke. Do **not** attempt a fix without asking — bad publishes should be a conscious decision to revert vs. patch forward.
