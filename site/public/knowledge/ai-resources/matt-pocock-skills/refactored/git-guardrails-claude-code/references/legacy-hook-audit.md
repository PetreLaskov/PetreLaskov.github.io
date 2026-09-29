# Legacy hook audit

This is a static inspection of the retained source script, not an execution result. No live hook has been installed by this package's authoring process.

The script reads stdin, uses jq to extract tool_input.command, and grep -qE to match a fixed list. It exits 2 on a match and 0 otherwise. It does not parse a shell or Git argv.

- Direct `git push` matches, but intervening Git global options can avoid that literal substring.
- Harmless commands containing quoted matching text can be blocked.
- Alias, wrapper, script-file, alternative-tool, and environment-mediated execution are outside its claimed parser capability because it has none.
- Invalid JSON or missing jq has no explicit fail-closed branch in the source.
- The Bash matcher in settings covers that named tool surface, not every way to modify a repository.

Before a chosen tripwire is installed, run synthetic decision payloads for prohibited direct forms, allowed status/diff/log reads, global options, quoted text, malformed JSON, and the actual paths used by the host. Do not execute the dangerous Git commands themselves. Record exact outcomes and limitations. Then separately verify hook invocation in a disposable workspace.

A source pattern test is not proof of host integration; host integration is not proof of complete enforcement. Use a supported permission mechanism when the user requires authority restriction.
