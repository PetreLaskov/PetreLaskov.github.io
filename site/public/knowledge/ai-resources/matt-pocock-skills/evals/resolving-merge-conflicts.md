# Development evaluation: resolving-merge-conflicts

**Case-bound grades:** source A; refactor A; no-supplied-skill control A.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 7/7 | 3/3 | A |

## normal: resolving-merge-conflicts-N

Merge fixture: base allows all users; our branch requires verified email; incoming branch requires active subscription. Product intent says both restrictions apply. Propose resolved condition and checks.

### Frozen criteria

1. Combines both independent restrictions with AND
2. Checks combinations that preserve each intent
3. Does not invent unrelated behavior

### source response

Resolve the condition by preserving both restrictions:

```js
return user.emailVerified && user.hasActiveSubscription;
```

This follows the stated product intent: verification and an active subscription are both required. Preserve the project’s actual field names and existing handling of missing users when applying the resolution; the excerpt is illustrative.

Checks should cover the four combinations: both true permits access; either false or both false denies it. Compare the resolved diff with each branch’s change to ensure neither requirement was dropped, then run the project’s relevant type, test, and formatting checks.

No merge or check has run in this fixture. Completion would require those results and review of the scoped resolved changes before continuing the merge.

**Judgment:** 3/3. 

- Criterion 1: 1. Proposes emailVerified && hasActiveSubscription.
- Criterion 2: 1. Requires both true to allow and any false combination to deny.
- Criterion 3: 1. Preserves actual field names/existing missing-user handling and limits change to the two restrictions.

### refactor response

Resolve the access rule as the conjunction of both restrictions:

return user.emailVerified && user.hasActiveSubscription;

These property names are illustrative; use the actual verified-email and active-subscription predicates in the repository. Product intent explicitly requires both, so choosing either branch wholesale would discard required behavior.

Check the four combinations: verified/active allows access; unverified/active, verified/inactive, and unverified/inactive deny it. Inspect callers and the real access boundary so a truth-table test alone does not miss bypass paths.

For the operation, inspect the base and both sides, stage only resolved operation-owned changes, then run relevant checks before continuing the merge or rebase. This is a proposed resolution; nothing has been executed or completed.

**Judgment:** 3/3. 

- Criterion 1: 1. Proposes emailVerified && hasActiveSubscription.
- Criterion 2: 1. Checks all four combinations and the actual access boundary.
- Criterion 3: 1. Marks field names illustrative and scopes operations to resolved task-owned changes.

### control response

Resolve the condition as the conjunction of both requirements:

const allowed = user.emailVerified && user.subscriptionActive;

Use the project’s actual field names when applying the change. The product intent establishes that both restrictions apply, so keeping either branch’s condition alone would lose a required restriction.

Check all four combinations: verified/active is allowed; verified/inactive, unverified/active, and unverified/inactive are rejected. Also verify that the authorization decision uses the combined condition at the relevant entry point and does not bypass it through another branch. Review the resolved diff for unrelated changes and leftover conflict markers.

This is the proposed resolution and check matrix; no merge or test execution has occurred.

**Judgment:** 3/3. 

- Criterion 1: 1. Proposes emailVerified && subscriptionActive.
- Criterion 2: 1. Checks all four combinations, allowing only verified/active.
- Criterion 3: 1. Uses illustrative field names, preserves both stated intents, and checks unrelated diff changes.

## stress: resolving-merge-conflicts-S

Rebase conflict fixture includes unrelated user changes in notes.txt. The two sides disagree over whether refunds are allowed, and no source establishes precedence. User asks for a resolution recommendation, not a forced decision.

### Frozen criteria

1. Surfaces substantive policy ambiguity instead of blindly choosing a side
2. Keeps unrelated notes out of staged task scope
3. Does not claim rebase completed or treat never-abort as authority to invent behavior

### source response

I recommend leaving the refund policy conflict unresolved until its authority is established. One side permits refunds and the other forbids them; there is no supplied intent that makes either take precedence. Combining the conditions or choosing the newer lines would invent a policy.

Compare each side’s originating issue, commit rationale, and applicable product decision. Present the maintainer with the exact behavioral choice and its consequences, then resolve the hunk to that decision.

Preserve the unrelated modified notes.txt and keep it outside any conflict-resolution staging. Do not stage everything or discard work to simplify the rebase. This is a resolution recommendation only; no edits, abort, continuation, or forced policy choice has occurred.

**Judgment:** 3/3. 

- Criterion 1: 1. Explicitly refuses combining/choosing lines that would invent a refund policy.
- Criterion 2: 1. Keeps notes.txt outside staging and rejects blanket stage/discard.
- Criterion 3: 1. Labels this recommendation only with no edits, abort, continuation or forced choice.

### refactor response

Keep notes.txt untouched and identify which files belong to the in-progress rebase. Read the base and each replayed change by intent; “ours” and “theirs” do not establish product precedence during a rebase.

For refunds, the missing decision is concrete: under the same transaction conditions, should a refund be allowed or rejected? Show the competing behaviors and any available tests or decision references. I recommend leaving that hunk unresolved until the intended policy is established, while resolving independent compatible hunks.

Do not invent a compromise or use a branch side as authority. This request asks for a recommendation, so it does not justify forcing continuation, aborting the operation, or staging the user's notes. No operation state has changed.

**Judgment:** 3/3. 

- Criterion 1: 1. States the concrete allow/reject policy question and requires established intent.
- Criterion 2: 1. Keeps notes.txt untouched and says staging it is unjustified.
- Criterion 3: 1. Rejects invented compromise/forced continuation and says operation state has not changed.

### control response

Do not choose a refund policy from Git side names or assume one branch has precedence. The conflict is a product decision: one version permits refunds and the other forbids them. Inspect the surrounding requirements and change rationale, then ask the policy owner to settle the intended behavior if neither establishes it.

Present the two resulting behaviors and their consequences as the resolution options; keep the conflict unresolved until there is a defensible choice. A recommendation can favor preserving the last established policy, but only if that policy is actually evidenced.

Leave the unrelated notes.txt changes intact and outside any conflict-resolution commit. Do not reset, discard, or overwrite them to make the rebase easier.

**Judgment:** 3/3. 

- Criterion 1: 1. Treats refund permission as an unresolved product decision, not branch precedence.
- Criterion 2: 1. Keeps notes.txt intact and outside conflict-resolution commits.
- Criterion 3: 1. Leaves conflict unresolved until evidenced policy and makes no completion claim.

## non-trigger: resolving-merge-conflicts-X

Explain the word conflict in ordinary language.

### Frozen criteria

1. Answers without Git operations

### source response

A conflict is a disagreement or clash between people, ideas, needs, or actions.

**Judgment:** 1/1. 

- Criterion 1: 1. Defines ordinary disagreement/clash between people/ideas/needs/actions.

### refactor response

A conflict is a disagreement or clash between people, goals, ideas, or requirements that cannot all be satisfied as they stand.

**Judgment:** 1/1. 

- Criterion 1: 1. Defines conflict as an ordinary disagreement/clash, with no Git operation.

### control response

A conflict is a disagreement or clash between people, goals, ideas, or demands that cannot all be satisfied as they stand.

**Judgment:** 1/1. 

- Criterion 1: 1. Defines ordinary disagreement/clash between people/goals/ideas/demands.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
