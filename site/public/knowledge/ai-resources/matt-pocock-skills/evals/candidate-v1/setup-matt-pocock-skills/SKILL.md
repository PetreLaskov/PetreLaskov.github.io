---
name: setup-matt-pocock-skills
description: Configure repository-local tracker operations, triage-role mappings, and domain-document layout for Matt Pocock's engineering workflows; also inspect existing setup when requested.
---

# Setup Matt Pocock Skills

Keep repo variation in docs/agents, not edits to installed skills. Honor a verify-only request without creating a new mode or writing files.

Inspect existing remotes, instruction files, docs/agents, domain docs, scratch conventions, and downstream workflow needs. Check which instruction file the active harness actually reads; do not prefer CLAUDE.md solely because it exists. Preserve a deliberate existing canonical pointer arrangement.

Recommend the existing tracker or one matching the actual remote: GitHub, GitLab, local Markdown, or the user's custom workflow. Existing authorization and explicit choices settle questions; ask only for consequential missing choices. Default to one domain context unless actual domain separation justifies more.

Use the relevant seed:
- [issue-tracker-github.md](issue-tracker-github.md)
- [issue-tracker-gitlab.md](issue-tracker-gitlab.md)
- [issue-tracker-local.md](issue-tracker-local.md)
- [triage-labels.md](triage-labels.md) when any selected workflow consumes these roles
- [domain.md](domain.md) for lazy domain-document creation and reading rules

For remote tools, verify repository identity and supported read operations without mutation. Distinguish label mappings from labels that exist; check needed roles, including bug/enhancement and ready-for-agent consumers outside triage. Create missing external objects only when that action is authorized; otherwise identify the exact pending step.

Record how to read full bodies/comments, create, comment, label, close, and manage parent and blocking relationships. These are different relations. Verify available flags/fields against current tool capabilities; do not copy unsupported command shapes blindly. Keep external PR/MR discovery off unless requested or already configured.

Present concrete document changes when choices remain to be approved. Write/update one Agent skills pointer block in the host-consumed instruction file, preserving surrounding content, and the selected docs/agents files. Reconcile prior customizations; do not reset them to templates.

Verify written paths and pointers. Report files configured, read capabilities checked, and any unresolved external provisioning separately. Missing CONTEXT.md/ADRs are normal; create them only when actual domain knowledge is established.
