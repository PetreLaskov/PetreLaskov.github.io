# Development evaluation: tdd

**Case-bound grades:** source A; refactor A; no-supplied-skill control A.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 7/7 | 3/3 | A |

## normal: tdd-N

Build a test-first change to discount(total): orders of 100 or more get 10 percent off, smaller totals unchanged. Public discount function is the agreed seam. Give the first red-green slice using independent expected values; no execution is available.

### Frozen criteria

1. Uses a concrete expected value such as 100 -> 90
2. Starts with one behavior/test then minimal implementation
3. Does not claim the test actually ran

### source response

Use the agreed public discount function. First slice:

```js
it("discounts an order at the threshold", () => {
  expect(discount(100)).toBe(90);
});
```

The literal 90 comes from the requirement’s worked boundary example, not from copying the implementation’s rate expression. Run it against the current function and observe the reason it fails before implementing the slice.

Candidate green implementation:

```js
function discount(total) {
  return total >= 100 ? total * 0.9 : total;
}
```

Rerun that test; next, add the smaller-total case discount(99) === 99 as its own red–green cycle, then an above-threshold example. No execution is available, so these are proposed test and code excerpts; neither red nor green has been observed.

**Judgment:** 3/3. 

- Criterion 1: 1. Uses the independent literal assertion discount(100) equals 90.
- Criterion 2: 1. Starts with one threshold test, requests observed failure, then proposes the minimal threshold implementation.
- Criterion 3: 1. Explicitly says neither red nor green has been observed and no execution is available.

### refactor response

First slice: an order exactly at the threshold receives the discount through the agreed public function.

Proposed test:
assert.equal(discount(100), 90);

The expected 90 comes from the requirement, independently of the implementation. Run this test against the current function and confirm it fails because the returned amount is wrong; a missing import or broken harness is not the intended red. If it already passes, inspect whether the behavior exists before changing anything.

Then make the smallest implementation change needed for this slice and rerun. Next add discount(99) === 99, then a larger qualifying total such as discount(150) === 135. No red or green result has been observed in this no-execution fixture.

**Judgment:** 3/3. 

- Criterion 1: 1. Uses assert.equal(discount(100), 90) as a requirement-derived expected value.
- Criterion 2: 1. Starts with the single threshold case, then instructs the smallest change before subsequent cases.
- Criterion 3: 1. Explicitly says no red or green result was observed in the no-execution fixture.

### control response

First red slice at the agreed public seam:

assert.equal(discount(100), 90);

The expected value comes directly from the requirement: the threshold is inclusive, and 10 percent off 100 leaves 90. Run this against the current behavior and require an observed failure before calling the step red; no execution is available here.

Proposed minimal green implementation:

function discount(total) {
  return total >= 100 ? total * 0.9 : total;
}

Run the same test, then add discriminating examples such as discount(99) === 99 and discount(200) === 180. A passing prediction is not a passing run; all results remain unverified until executed.

**Judgment:** 3/3. 

- Criterion 1: 1. Uses discount(100) === 90 and explains the inclusive threshold independently.
- Criterion 2: 1. Presents one red assertion before the minimal threshold/rate implementation.
- Criterion 3: 1. States execution is unavailable and all passing/failing results remain unverified.

## stress: tdd-S

A developer tests discount(x) by asserting it equals x minus x times the same rate expression copied from implementation. The test passes. Explain why this may miss a wrong threshold and replace it with a discriminating example.

### Frozen criteria

1. Identifies shared logic as an oracle problem
2. Uses boundary examples from requirements
3. Preserves public behavior testing without demanding internal mocks

### source response

The expected value repeats the implementation’s decision rule, so the test can share its mistake. If both use the wrong threshold, a passing result merely shows they agree.

Replace that expectation with a requirement-derived boundary example through the public function:

```js
it("applies the discount at 100", () => {
  expect(discount(100)).toBe(90);
});
```

This discriminates against a threshold of “greater than 100.” Add the complementary example discount(99) === 99 in the next cycle to catch a threshold that starts too low. Keep expected values literal and independently worked out. A deliberate change from >= to > should make the boundary test fail when run; no such verification has happened here.

**Judgment:** 3/3. 

- Criterion 1: 1. Explains that copied decision logic shares the implementation's mistake and proves only agreement.
- Criterion 2: 1. Uses fixed 100 -> 90 and 99 -> 99 boundary examples.
- Criterion 3: 1. Exercises the public discount function directly and requests no internal mocks.

### refactor response

The test can repeat the implementation's mistake. If both expressions use “greater than 100” instead of “100 or more,” they agree while violating the requirement. A passing result then shows consistency between copies, not correct behavior.

Replace the copied expression with literal contract examples through discount:
assert.equal(discount(100), 90);
assert.equal(discount(99), 99);

The first rejects an exclusive threshold; the second rejects discounting below it. Add discount(150) === 135 as the next slice to distinguish a general percentage from a hard-coded boundary result.

Run the 100 case first against the suspect implementation and observe the intended failure before repairing it. These replacement assertions are proposed; no new test has run.

**Judgment:** 3/3. 

- Criterion 1: 1. Says consistency between copied expressions does not establish requirement correctness.
- Criterion 2: 1. Uses 100 -> 90 and 99 -> 99, then a larger-total example.
- Criterion 3: 1. Uses direct public discount assertions without internal mocking requirements.

### control response

The test repeats the implementation’s decision rule, so both can share the same mistake. If both use “greater than 100” where the requirement says “100 or more,” the test may pass while the boundary behavior is wrong.

Replace the copied formula with fixed expected examples derived from the requirement:

assert.equal(discount(99), 99);
assert.equal(discount(100), 90);
assert.equal(discount(101), 90.9);

Use an appropriate decimal or tolerance assertion for the last value if the implementation uses floating-point arithmetic. The 100 case directly distinguishes the inclusive threshold from the wrong exclusive threshold. These assertions are proposed replacements, not newly executed evidence.

**Judgment:** 3/3. 

- Criterion 1: 1. Explains how implementation and expected expression can share the wrong threshold.
- Criterion 2: 1. Uses 99 -> 99, 100 -> 90, and 101 -> 90.9 boundary expectations.
- Criterion 3: 1. Uses public discount calls and only an appropriate numeric assertion, with no mocks.

## non-trigger: tdd-X

Make a punctuation-only edit to the README; no code behavior changes.

### Frozen criteria

1. Does not require a TDD loop for punctuation

### source response

Please provide the README text and punctuation change to make.

**Judgment:** 1/1. 

- Criterion 1: 1. Requests the text and edit without requiring a TDD loop.

### refactor response

Please provide the README sentence and intended punctuation change; no behavior tests are needed for that edit.

**Judgment:** 1/1. 

- Criterion 1: 1. Explicitly says no behavior tests are needed for the punctuation edit.

### control response

Please provide the README sentence and the punctuation change you want.

**Judgment:** 1/1. 

- Criterion 1: 1. Asks for the sentence and punctuation change without imposing tests.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
