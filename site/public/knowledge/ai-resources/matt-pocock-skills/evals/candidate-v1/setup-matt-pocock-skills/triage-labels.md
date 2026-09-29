# Triage role mapping

Map canonical roles to this repository's actual labels. Do not rename existing labels merely to match the defaults.

| Role | Default spelling | Meaning |
| --- | --- | --- |
| bug | bug | Broken promised behavior |
| enhancement | enhancement | New or improved behavior |
| needs-triage | needs-triage | Maintainer evaluation needed |
| needs-info | needs-info | Specific reporter information missing |
| ready-for-agent | ready-for-agent | Specified for agent work; check blockers separately |
| ready-for-human | ready-for-human | Human next action needed |
| wontfix | wontfix | Will not be actioned under the recorded reason |

Record chosen spellings and whether each required remote label was observed to exist. A mapping file does not create labels. Configure roles needed by any selected workflow, including to-tickets, even when triage itself is absent.

Maintain exactly one category and one triage state where triage applies. Blockers and implementation completion are separate facts; document the repository's conventions rather than adding contradictory state labels.
