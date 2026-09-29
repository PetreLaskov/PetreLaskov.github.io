# Durable agent brief

A brief is the agreed execution contract; retain source links and distinguish confirmed evidence from requested behavior. For a PR, describe remaining work on the existing diff.

Include:
- category and concise result;
- current behavior and verification status/conditions;
- desired behavior, including consequential error cases;
- relevant interface contracts and stable domain names;
- independently verifiable acceptance criteria;
- blockers and scope exclusions;
- source references needed by a fresh implementer.

Avoid procedural line-number instructions. A pinned locator hint can aid discovery but is not a requirement to preserve today's file structure. Keep one authoritative acceptance list.

Example: "With --json, error output is a JSON object on stdout and existing exit codes are preserved. Reuse the PR's serializer. Verify one success and one error case. Default human output is unchanged. Other commands are out of scope."

Do not make the brief authoritative by assertion alone if the maintainer has not accepted its new decisions. Record unresolved choices before labeling work actionable.
