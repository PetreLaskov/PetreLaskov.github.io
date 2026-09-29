# Development evaluation: wayfinder

**Case-bound grades:** source A; refactor A; no-supplied-skill control A.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 7/7 | 3/3 | A |

## normal: wayfinder-N

Chart a plan for moving a community archive online. Destination: decide a viable access and preservation model, not build the site. Rights policy is unresolved; storage cost can be researched; migration details cannot yet be phrased. Give a small map and frontier.

### Frozen criteria

1. Keeps destination as decisions rather than implementation
2. Separates sharp research/decision tickets from unspecifiable fog
3. Uses real dependency relationships and preserves human policy decisions

### source response

Destination: decide a viable access and preservation model for the community archive.

Draft decision map:

- **Rights and access model** — grilling ticket: who may access which material, and on what permission basis? This is a policy decision with the community.
- **Storage cost** — research ticket: what storage and preservation options are financially viable? Gather costs and assumptions without selecting an access policy.

Both are currently on the frontier; no dependency between them has been established. Their findings will inform a later model choice.

Not yet specified: migration questions whose shape depends on the selected model.

Out of scope: building the website and public launch.

Decisions so far: none recorded. This is a local draft of the map; no tracker issues or research launches have occurred.

**Judgment:** 3/3. 

- Criterion 1: 1. Defines the destination as deciding the access/preservation model and explicitly excludes building and launch.
- Criterion 2: 1. Separates rights-policy and storage-cost tickets from migration questions that are 'Not yet specified.'
- Criterion 3: 1. Places rights and storage on the current frontier, later model selection depends on their findings, and rights is a policy decision with the community.

### refactor response

Map: Community archive access and preservation
Destination: decide a viable access and preservation model.
Decisions so far: none established.
Not yet specified: migration questions that depend on the selected model.
Out of scope: building the website or public launch.

Draft children:
- ARCH-01 — Rights model (grilling): who may access which materials under what permissions? Open, unclaimed, no blockers.
- ARCH-02 — Storage cost (research): compare cost assumptions and preservation options for stated volume/growth ranges; record unknown inputs. Open, unclaimed, no blockers.
- ARCH-03 — Select viable model (grilling): combine rights and cost findings. Blocked by ARCH-01 and ARCH-02.

The frontier is ARCH-01 and ARCH-02. Storage research can proceed independently; rights remains a user-owned decision. These are draft map contents, not created tracker records.

**Judgment:** 3/3. 

- Criterion 1: 1. States the decision destination and excludes building or public launch.
- Criterion 2: 1. Creates draft rights/storage tickets and leaves migration in 'Not yet specified.'
- Criterion 3: 1. Model selection is blocked by both rights and cost findings; the frontier is those two tickets, and rights remains user-owned.

### control response

Destination: choose a viable model for access and preservation.

Small map:
- Rights model: decide what may be public, restricted, or withheld, and who can authorize access.
- Storage options: research costs for plausible collection sizes, backup copies, and retrieval needs; record assumptions.
- Model comparison: combine rights constraints and storage evidence to compare feasible options.
- Migration planning: defer until the selected model makes the requirements expressible.

The current frontier contains a rights-policy decision and a storage-cost investigation. They can advance separately, with cost ranges kept conditional on access and preservation choices. Do not create implementation or launch tasks yet; success here is a defensible model decision.

**Judgment:** 3/3. 

- Criterion 1: 1. Destination is choosing a viable model; explicitly says not to create implementation or launch tasks.
- Criterion 2: 1. Names rights decision and storage investigation as frontier work and defers migration until requirements are expressible.
- Criterion 3: 1. Model comparison combines rights constraints and storage evidence; research proceeds conditionally without deciding the rights policy.

## stress: wayfinder-S

Continue map: ticket Rights model is claimed by another active worker; Storage cost is unclaimed and unblocked; Public launch is out of scope. You can inspect but not mutate a tracker in this fixture. What will you do next and what state would you record?

### Frozen criteria

1. Does not take the actively claimed rights ticket
2. Selects unblocked work without bringing launch into scope
3. Distinguishes proposed claim/resolution from an actual tracker mutation

### source response

The next eligible ticket is **Storage cost**. **Rights model** is owned by an active worker, so I will leave its claim intact. **Public launch** remains outside this map’s destination.

I can inspect the map and Storage cost ticket here, but cannot perform the required tracker claim. Accordingly, I will prepare the investigation scope without claiming ownership or recording a resolution: storage volume assumptions, candidate storage/preservation arrangements, and comparable recurring costs.

Proposed state once tracker writes are available: assign Storage cost to the executing worker before research begins. Only after evidence is gathered should its answer be recorded, the ticket closed, and a named context pointer added to Decisions so far. Current state remains unchanged.

**Judgment:** 3/3. 

- Criterion 1: 1. Leaves Rights model's active claim intact.
- Criterion 2: 1. Selects Storage cost as eligible and Public launch as outside the destination.
- Criterion 3: 1. Limits present work to preparation; future assignment/resolution is conditional on tracker writes and evidence; current state unchanged.

### refactor response

Storage cost is the next eligible ticket. I would inspect its scope, current blockers, and ownership alongside the map, then prepare the bounded research question and available evidence.

This fixture permits no tracker mutation, so I cannot claim the ticket or report exclusive ownership. The proposed state is “Storage cost — open, unclaimed; eligible for research; claim pending write capability.” Before actual resolution work, recheck the frontier and establish the claim, because another worker could take it meanwhile.

Rights model remains with its active owner. Public launch stays out of scope. No ticket would be closed and no decision added to the map until supported findings and the authorized state transition exist.

**Judgment:** 3/3. 

- Criterion 1: 1. States Rights model remains with its active owner.
- Criterion 2: 1. Selects Storage cost and expressly keeps Public launch out of scope.
- Criterion 3: 1. Proposes open/unclaimed with claim pending write capability; says no claim, closure, or decision update has occurred.

### control response

Take up the storage-cost investigation next. It is unclaimed, unblocked, and relevant to selecting an access and preservation model. Inspect its existing scope and assumptions, then gather comparable estimates for storage, redundant copies, and retrieval under explicit volume assumptions. Leave the active rights worker’s ownership intact; note any rights-dependent costs as unresolved assumptions.

Because this fixture allows inspection only, I would not claim or update the ticket. Proposed record: “Storage cost — ready; next worker proposed; investigation not started; tracker unchanged. Rights model — owned by existing active worker. Public launch — outside scope.” Once writing is authorized, ownership should be claimed before shared work begins.

**Judgment:** 3/3. 

- Criterion 1: 1. Says to leave the active rights worker's ownership intact.
- Criterion 2: 1. Selects unclaimed, unblocked Storage cost and keeps Public launch outside scope.
- Criterion 3: 1. Says no claim/update can occur and labels the record proposed, investigation not started, tracker unchanged.

## non-trigger: wayfinder-X

Change the footer year from 2025 to 2026 in a single known file.

### Frozen criteria

1. Does not create a decision map for a clear small edit

### source response

Change `2025` to `2026` in the known footer file. No file path or contents are supplied here, so I cannot show an exact patch.

**Judgment:** 1/1. 

- Criterion 1: 1. Describes replacing 2025 with 2026 and the missing exact patch input; no map.

### refactor response

Proposed one-line change: replace the footer's “2025” with “2026”. No file was edited in this fixture.

**Judgment:** 1/1. 

- Criterion 1: 1. Proposes a one-line year substitution; no decision map.

### control response

Change the footer’s year from 2025 to 2026. No file was edited in this text-only fixture.

**Judgment:** 1/1. 

- Criterion 1: 1. Gives only the year substitution and says no edit occurred; no map.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
