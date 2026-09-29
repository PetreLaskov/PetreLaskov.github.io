---
name: git-guardrails-claude-code
description: "Configure scoped Claude Code git restrictions with an explicit distinction between enforceable permissions and a limited legacy command-pattern tripwire."
---

# Git Guardrails for Claude Code

Set up the scoped Git restriction the user requested. Establish whether they want enforceable authority limits or a best-effort accidental-command tripwire, and which operations and project/global scope are intended. Reuse clear scope from the request rather than asking again.

Inspect the installed host's current permission and hook interfaces before editing. Prefer a supported permission boundary for an enforcement requirement. Do not claim that a Bash command-text filter covers aliases, wrapper scripts, other tools, or all shell syntax.

The retained [legacy script](scripts/block-dangerous-git.sh) is an inactive reference implementation of substring/regex matching. Read [its audit](references/legacy-hook-audit.md) before considering installation. It is not a security boundary and must not be silently installed to satisfy a stronger restriction request.

For a deliberately chosen tripwire, prepare the exact scoped hook entry and script path using the host's supported schema. Confirm required Bash and jq behavior. Merge settings without replacing unrelated fields or duplicating the hook. Use robust path quoting appropriate to the actual shell. Keep a recoverable copy of the configuration being changed.

Test hook decisions with synthetic payloads that never execute the candidate Git commands: prohibited direct forms, allowed reads, harmless quoted text, global Git options, and malformed input. Record misses and false positives. Then verify actual host invocation in a disposable workspace; direct script execution alone does not establish integration.

Report the precise restriction or tripwire installed, scope, observed tests, and uncovered execution paths. If the host cannot supply the requested enforcement, preserve a concrete proposal and say so instead of claiming success. Do not repeatedly broaden a fragile regex list and represent it as complete shell control.
