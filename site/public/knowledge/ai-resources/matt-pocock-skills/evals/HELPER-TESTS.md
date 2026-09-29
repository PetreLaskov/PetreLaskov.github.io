# Executed helper checks

The original inspected hook is executed only as a classifier of JSON text. jq is substituted by a fixture-only JSON selector because jq is unavailable. No classified command is executed. Tests characterize the source regex policy, not host enforcement or complete shell parsing.

The expected classifications are stated test expectations: mutation forms should be blocked; a command that only prints words should be allowed. They do not prove a universal shell policy.

| Case | Supplied command text | Expected exit | Observed exit | Expected classification met |
|---|---|---:|---:|---|
| status | `git status` | 0 | 0 | yes |
| push | `git push origin HEAD` | 2 | 2 | yes |
| reset | `git reset --hard HEAD` | 2 | 2 | yes |
| reset-with-directory | `git -C repo reset --hard HEAD` | 2 | 2 | yes |
| clean-source-spelling | `git clean -fd` | 2 | 2 | yes |
| clean-reordered-flags | `git clean -df` | 2 | 0 | no |
| checkout-with-separator | `git checkout -- .` | 2 | 0 | no |
| restore-with-option | `git restore --worktree .` | 2 | 0 | no |
| branch-long-options | `git branch --delete --force old` | 2 | 0 | no |
| quoted-mention | `printf '%s' 'git push'` | 0 | 2 | no |
| composition | `git status && git reset --hard HEAD` | 2 | 2 | yes |

Exit 2 blocks; exit 0 allows. The quoted-mention case exposes a false positive; reordered/expanded spellings expose omissions. These are observations of the pinned source, not measurements of a rewritten host guard. The refactor deliberately retains the old script as an inactive, limited reference and requires target-harness tests before claiming enforcement.

## Syntax only

- hook: exit 0 from bash -n.
- wizard: exit 0 from bash -n.
- debug-loop: exit 0 from bash -n.
- dependency-config: exit 0 from node --check.

Parsing does not establish that a wizard completed, secrets were stored correctly, a debugging loop reproduced a bug, or dependency-cruiser resolved actual imports. Those environment-specific operations were not performed.
