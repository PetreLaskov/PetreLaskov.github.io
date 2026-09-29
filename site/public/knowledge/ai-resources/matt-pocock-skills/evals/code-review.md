# Development evaluation: code-review

**Case-bound grades:** source A; refactor A; no-supplied-skill control A.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 7/7 | 3/3 | A |

## normal: code-review-N

Review fixture: standard says functions use snake_case. Spec says empty cart checkout is rejected. Diff adds function validate_cart(cart) { return true; }. Report Standards and Spec separately; no executable repo is supplied.

### Frozen criteria

1. Separates standards assessment from missing empty-cart behavior
2. Points to actual fixture evidence
3. Does not invent tests run or unrelated smells

### source response

## Standards
No violation of the supplied naming rule: validate_cart uses snake_case. The fixture supplies no other repository standards or evidence about tooling, so this is limited to that rule and the shown code.

## Spec
One finding: the requirement says “empty cart checkout is rejected,” but validate_cart(cart) returns true for every input, including an empty cart. The validator therefore fails to enforce the specified rejection. Add an empty-cart rejection at the agreed public behavior boundary and verify a nonempty cart still follows the intended path.

Standards: 0 findings against the supplied rule. Spec: 1 finding, unconditional acceptance of an empty cart. This is static review; no executable repository or test result is available.

**Judgment:** 3/3. 

- Criterion 1: 1. Uses distinct Standards and Spec assessments, naming conformance versus missing rejection.
- Criterion 2: 1. Cites validate_cart's snake_case name and return true for every input, including empty carts.
- Criterion 3: 1. Calls the review static with no test result available; findings remain on the supplied contracts.

### refactor response

Scope: the supplied function validate_cart(cart) { return true; } against the two stated contracts. These are separate text-only review passes; no executable repository or test results are available.

Standards: 0 findings. The documented requirement is snake_case, and validate_cart satisfies it. No other naming or design rule was supplied. Worst issue on this axis: none identified.

Spec: 1 finding. The unconditional return true in validate_cart accepts an empty cart, contradicting “empty cart checkout is rejected.” Any checkout path relying on this result will allow that case. Replace the unconditional acceptance with the agreed cart-validity behavior and verify an empty cart is rejected at the relevant checkout boundary. Worst issue: missing required rejection.

**Judgment:** 3/3. 

- Criterion 1: 1. Separates Standards: 0 findings for snake_case from Spec: 1 finding for empty-cart acceptance.
- Criterion 2: 1. Cites validate_cart and its unconditional return true against the stated empty-cart rejection requirement.
- Criterion 3: 1. Identifies text-only review with no executable repo/results and adds no unrelated defect.

### control response

Standards: validate_cart uses snake_case, so the supplied function name conforms to the stated naming standard. No other standards were supplied, and this excerpt is insufficient to assess the wider codebase.

Spec: the function unconditionally returns true, including for an empty cart. If that result permits checkout, this violates the requirement to reject empty carts. Change the validation to distinguish empty from nonempty carts and ensure checkout actually uses the result before proceeding.

Verification needed: an empty-cart checkout must be rejected; a valid nonempty cart must continue through the normal path. These are review findings from the excerpt. No executable repository or test result is available.

**Judgment:** 3/3. 

- Criterion 1: 1. Separates naming conformance from the conditional checkout rejection defect.
- Criterion 2: 1. Cites snake_case validate_cart and unconditional true, while checking how the result permits checkout.
- Criterion 3: 1. Says no executable repo/test result exists and scopes wider assessment to unavailable evidence.

## stress: code-review-S

User asks to review current uncommitted work. HEAD equals main. Working tree changes return true to return cart.items.length > 0; staged changes are empty. An earlier command git diff main...HEAD returned empty. State what to review and the comparison needed.

### Frozen criteria

1. Does not declare no changes based on HEAD-only diff
2. Includes working-tree scope requested by user
3. Pins or describes correct comparison while keeping findings provisional

### source response

Review the uncommitted working-tree change from return true to return cart.items.length > 0. The empty git diff main...HEAD output is expected because HEAD equals main; that command compares committed history and omits this change.

Use git diff HEAD -- to compare the tracked working tree against HEAD, which covers the requested uncommitted work. git diff -- isolates unstaged changes; git diff --cached checks staged changes, stated here to be empty. Also inspect status for any relevant untracked files before defining coverage.

Then assess the actual diff against the specification and documented standards separately. The new condition appears to reject an empty items array, but its full contract and tests are not supplied. No review commands have run here.

**Judgment:** 3/3. 

- Criterion 1: 1. Explains main...HEAD is empty because HEAD equals main but omits uncommitted work.
- Criterion 2: 1. Specifies the uncommitted return-condition change as the review target.
- Criterion 3: 1. Gives git diff HEAD -- and distinctions for unstaged/staged/untracked coverage; says the condition appears to reject empties but full contract/tests are absent.

### refactor response

Review the current working-tree change, not main...HEAD. HEAD equals main, so that committed-history comparison is correctly empty and says nothing about the uncommitted fix.

Capture the unstaged diff against the index with git diff and confirm the empty staged diff with git diff --cached. With no staged changes, git diff HEAD also represents this tracked working change. Check relevant untracked files separately, and pin the exact patch bytes so both review axes see the same target.

The review scope includes return true becoming return cart.items.length > 0. Assess naming/standards separately from the empty-cart requirement; inspect the documented cart shape before claiming all inputs are handled. No comparison or review command has actually run here.

**Judgment:** 3/3. 

- Criterion 1: 1. Says the empty committed-history comparison says nothing about the uncommitted fix.
- Criterion 2: 1. Specifies the current working-tree return-condition change and relevant untracked scope.
- Criterion 3: 1. Describes git diff against index, cached confirmation, and git diff HEAD equivalence here; says inspect cart shape before wider claims and no command ran.

### control response

Review the current unstaged working-tree diff. HEAD equals main and the staged area is empty, so git diff main...HEAD compares identical committed history and cannot reveal the requested changes. The relevant comparison is git diff, or git diff HEAD for all tracked uncommitted changes; also inspect status to identify untracked files if they are in scope.

The supplied change replaces unconditional acceptance with cart.items.length > 0. Review whether the cart contract guarantees items exists and is an array, and whether checkout uses the result correctly. Verify empty and nonempty cases through the agreed behavior. No review or test execution can be inferred from the earlier empty branch diff.

**Judgment:** 3/3. 

- Criterion 1: 1. Explains the empty committed-history diff cannot reveal the requested unstaged change.
- Criterion 2: 1. Names the current unstaged working-tree diff and the supplied true-to-length condition.
- Criterion 3: 1. Gives git diff or git diff HEAD and identifies contract/checkout questions as needing review rather than verified results.

## non-trigger: code-review-X

Explain the difference between a branch and a tag, without reviewing this project.

### Frozen criteria

1. Answers concept question without spawning a review

### source response

A branch is a movable reference that advances as new commits are added. A tag is a named reference normally kept fixed to mark a particular commit, such as a release.

**Judgment:** 1/1. 

- Criterion 1: 1. Explains movable branches and normally fixed named tags; no review initiated.

### refactor response

A branch is a movable reference that advances as new commits are added. A tag usually names a fixed commit, often to mark a release.

**Judgment:** 1/1. 

- Criterion 1: 1. Explains branch movement and normally fixed release tags, without reviewing the project.

### control response

A branch is a movable reference that advances as you add commits. A tag normally marks a particular commit, often a release, and stays at that point unless someone deliberately moves it.

**Judgment:** 1/1. 

- Criterion 1: 1. Explains advancing branches versus tags kept at a point unless deliberately moved; no review initiated.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
