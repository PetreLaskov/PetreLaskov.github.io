# Issue tracker: GitHub

Record owner/repo and the supported connector or gh CLI. Read an exact issue/PR with full body, comments, labels, author, and current state; listing summaries are for selection only.

GitHub issues and PRs share a number space. Resolve the surface explicitly. Use structured body arguments or body files for multiline creation/comments. Verify current commands and supported JSON fields through the available tool before recording examples.

PRs as a request surface: no. If enabled, document how to identify external authors using a supported API field; do not assume gh pr list exposes authorAssociation. Explicitly named PRs remain resolvable regardless of discovery filters.

Publishing a spec creates an issue. Publishing tickets creates one issue each. Preserve parent-child links separately from native blocking dependencies; where blocking is unavailable, use explicit Blocked by references and disclose the fallback. A ticket is actionable only when blockers are complete and it is unclaimed.

Wayfinding: a map issue owns decision-ticket children. Record map/type labels, claim via assignment, resolution via an answer followed by closure, and a decision pointer back to the map. Check label existence before use. Read back mutations to verify identifiers and relations.
