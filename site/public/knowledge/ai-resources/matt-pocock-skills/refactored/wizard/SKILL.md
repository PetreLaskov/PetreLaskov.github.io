---
name: wizard
description: Generate a staged interactive Bash procedure for several genuinely human-only setup or transition steps. Use when a reusable local instrument is clearer than repeated dashboard instructions.
---

# Wizard

The agent authors; the human runs the live procedure in a terminal they control. Do ordinary authorized automated steps directly instead of assigning them to the human.

## Scope

Read required variable names, examples, workflow references, and current/target state without printing existing secrets into context. Identify each manual stage, where values come from, exact destinations, sensitivity, and validation. Use current documentation or observed UI for dashboard steps; label unknowns rather than invent clicks.

Show the concrete stages and destinations. Reuse prior authorization; resolve only consequential missing choices. A single simple step may need no script.

## Author with the supplied template

Read and copy [template.sh](template.sh). This port repairs input and completion handling in the upstream helper. Its ask helpers require nonempty values; an explicit Enter can reuse a saved value, but EOF fails. Required remote writes return failure and recorded skips make finish report incomplete. Keep this supplied library above STAGES unchanged; author focused stages below it and set TOTAL_STAGES. Open each URL before requesting its value. Use ask_secret for secrets and persist only values actually needed locally/CI.

The helper is not a universal dotenv serializer. Use fixed valid environment identifiers and validate required nonempty input in each generated stage. write_env supports only deliberately constrained bare single-line values; reject whitespace, newlines, comment/expansion-sensitive syntax, and quoted existing values unless a separate tested storage path handles them. Never source an existing .env to parse it. For multiline/private-key material, use an appropriate validated file/secret-store path rather than raw write_env.

Require an interactive terminal and stop on missing required input instead of persisting EOF as empty. Pin the intended repository/environment before gh writes. Treat skipped required operations as incomplete, not overall success.

For irreversible stages, show the actual action and confirmation. Saved values make entry resumable; they do not make the action idempotent. Check current state before rerunning migrations/cutovers.

## Validate and deliver

Run bash -n and shellcheck if available. Trace every value to the planned destination and every CI name to its actual use. For nontrivial stage logic, test isolated fixtures with stubbed browser/remote commands; do not execute the live interactive procedure as author.

State Bash/tool prerequisites, exact run directory and command, intended destinations, checks performed, and live steps not tested. One-off scripts remain scratch artifacts; retain/commit a repeatable setup path only when requested. Summaries name keys and outcomes, never secret values.
