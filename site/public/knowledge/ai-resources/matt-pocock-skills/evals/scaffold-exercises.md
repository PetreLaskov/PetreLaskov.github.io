# Development evaluation: scaffold-exercises

**Case-bound grades:** source A; refactor A; no-supplied-skill control B.

These grades cover three text-only fixture responses per condition, produced by one fresh agent per condition with shared context across cases. They do not measure live execution or long-term collaboration. Candidate identities and limitations are in [the protocol](PROTOCOL.md), [control addendum](PROTOCOL-ADDENDUM.md) and [condition manifests](CONDITIONS.json). Three independent graders assessed anonymized response labels against fixed assertions; wording can still reveal conditions.

| Condition | Supported assertion points | Clean cases | Grade |
|---|---:|---:|---|
| source | 7/7 | 3/3 | A |
| refactor | 7/7 | 3/3 | A |
| control | 6.5/7 | 2/3 | B |

## normal: scaffold-exercises-N

Scaffold a small exercise teaching array filtering, using existing folders 01.problem and 01.solution and npm test. Give an exercise/solution/check design; do not install dependencies. The learner should implement filtering, not copy a completed answer.

### Frozen criteria

1. Preserves existing project conventions
2. Keeps learner task and solution distinct
3. Uses an outcome check aligned to filtering skill

### source response

Keep the existing 01.problem and 01.solution folders and use npm test.

Problem README: “Implement selectEven(numbers), returning the even values in their original order without changing the input.” Starter:

```ts
export function selectEven(numbers: number[]): number[] {
  throw new Error("TODO: implement filtering");
}
```

The problem contains no completed filtering algorithm. Put the reference implementation only in 01.solution, using numbers.filter(n => n % 2 === 0), with a short explanation of the predicate.

Checks should assert [1, 2, 3, 4] produces [2, 4], [] produces [], and the original input is unchanged. Run the same behavioral checks against each variant: the starter should fail for the intended missing behavior; the solution should pass.

No dependency installation, files, or test execution occurred here.

**Judgment:** 3/3. 

- Criterion 1: 1. Keeps both named folders and npm test and proposes no installation.
- Criterion 2: 1. Provides an unimplemented throwing starter and confines the completed algorithm to 01.solution.
- Criterion 3: 1. Checks expected filtered values, empty input, and unchanged input, with intended starter failure and solution pass.

### refactor response

Keep the existing 01.problem and 01.solution folders and their actual entry-file convention.

Problem README: “Implement keepEven(numbers). Return the even numbers in their original order without changing the input. Example: [3, 2, 4, 1] becomes [2, 4].”
Starter: export the function signature with a deliberate unimplemented body; do not supply the filtering algorithm.

Solution: implement the same public function using filtering, with a short explanation of the predicate.

Checks through npm test: mixed values, no matches, empty input, duplicates/order, and input preservation. The learner's unfinished implementation should fail behavioral checks for the intended reason; the solution should pass.

Inspect collisions before adding files and preserve existing content. This is the exercise/check design; no files, dependencies, or test runs were created.

**Judgment:** 3/3. 

- Criterion 1: 1. Preserves named folders, actual entry-file conventions, npm test, and existing content.
- Criterion 2: 1. Leaves the starter unimplemented and puts filtering/explanation in the solution.
- Criterion 3: 1. Specifies filtering outcomes including no matches, duplicates/order, and input preservation.

### control response

Exercise: implement keepAtLeast(values, minimum), returning a new array containing values greater than or equal to minimum in their original order.

In 01.problem, provide the function signature, a TODO body, and examples such as keepAtLeast([2, 8, 5], 5) producing [8, 5]. Do not put the filtering algorithm in the starter.

In 01.solution, keep the completed reference implementation separate: return values.filter(value => value >= minimum).

Use the existing npm test setup to check below/equal/above-threshold values, an empty input, original order, and preservation of the input array. Wire tests to the problem implementation for the learner and check the solution separately. No dependencies are needed or installed; files and test execution remain proposed.

**Judgment:** 3/3. 

- Criterion 1: 1. Uses 01.problem, 01.solution, and the existing npm test setup, with no new dependencies.
- Criterion 2: 1. Keeps TODO/signature in the problem and places the completed filter only in the separate solution.
- Criterion 3: 1. Checks threshold inclusion, empty input, order, and input preservation through the learner/solution implementations.

## stress: scaffold-exercises-S

A generator would overwrite a learner-edited problem file, and its starter code already implements the target algorithm. Identify the two defects and propose a safe regeneration plan.

### Frozen criteria

1. Preserves learner edits or stages a separate replacement
2. Removes answer leakage while keeping scaffold runnable
3. Verifies meaningful task rather than only folder existence

### source response

There are two defects: regeneration would destroy the learner’s changes, and the starter already performs the skill the learner is meant to practice.

Re-read the existing problem file and preserve it. Generate a proposed replacement separately for comparison, or patch only an agreed untouched region; do not overwrite the learner’s work. Replace the completed target algorithm in the proposed starter with a clear TODO and a callable stub. Keep the completed algorithm in the solution variant.

Then check that the problem and solution expose the same interface and use the same behavior-based checks. The problem should fail because filtering remains to be implemented, not because setup is broken. The solution should pass. This is a regeneration plan; no checks have run.

**Judgment:** 3/3. 

- Criterion 1: 1. Rereads and preserves the existing file and stages comparison or an agreed untouched-region patch.
- Criterion 2: 1. Replaces the leaked algorithm with a callable TODO stub and distinguishes intended behavior failure from broken setup.
- Criterion 3: 1. Requires matching interfaces and behavior checks, with the starter failing meaningfully and solution passing.

### refactor response

There are two defects: regeneration destroys learner-owned work, and the starter already performs the learning objective, so completing the exercise proves little.

First identify the current problem file and preserve its edits. Generate a proposed replacement beside it or as a reviewable patch; do not overwrite it. Separate generator-owned scaffolding from learner-owned code, and refuse collisions unless a targeted replacement is explicitly chosen.

Remove the completed algorithm only from the proposed fresh starter, leaving the public signature and a clear TODO. Keep the worked algorithm in the solution. Check that the starter fails the relevant behavior tests and the solution passes, without installing dependencies or changing the learner's current work. These checks remain proposed, not executed.

**Judgment:** 3/3. 

- Criterion 1: 1. Preserves learner edits, stages a separate proposal, and refuses collisions without a chosen targeted replacement.
- Criterion 2: 1. Keeps the public signature/TODO and requires the starter to fail relevant behavior tests while the solution contains the algorithm.
- Criterion 3: 1. Requires relevant behavior tests for the starter and solution rather than mere structure checks.

### control response

There are two defects. Overwriting the learner-edited problem file destroys their work. Providing the completed algorithm in the starter removes the exercise’s central learning task.

Generate a proposed replacement in a separate location or as a diff, leaving the edited file intact. Build the replacement starter from the function contract, TODOs, and useful input/output examples; put the algorithm only in the separate solution. Preserve compatible learner changes through a reviewed merge rather than replacing the entire file.

Check that the starter still requires filtering work and that the solution satisfies the behavioral tests. Only replace the learner’s file with their agreement or an explicitly authorized merge. No regeneration has occurred here.

**Judgment:** 2.5/3. Partial credit is limited to runnable scaffolding: preserving a contract and TODO does not explicitly establish a runnable starter or a valid harness.

- Criterion 1: 1. Stages a replacement/diff separately, preserves the edited file, and requires a reviewed authorized merge.
- Criterion 2: 0.5. Removes the algorithm into a separate solution and proposes contract/TODO scaffolding, but does not establish that the starter remains callable/runnable.
- Criterion 3: 1. Checks that the starter still requires filtering work and the solution satisfies behavior tests, beyond folder existence.

## non-trigger: scaffold-exercises-X

Explain Array.filter in one sentence; do not create exercise files.

### Frozen criteria

1. Answers directly without scaffolding

### source response

Array.filter creates a new array containing the elements for which a supplied predicate returns true.

**Judgment:** 1/1. 

- Criterion 1: 1. Defines Array.filter without files or an exercise.

### refactor response

Array.filter creates a new array containing the elements for which a supplied predicate returns true.

**Judgment:** 1/1. 

- Criterion 1: 1. Provides only the direct one-sentence filter explanation.

### control response

Array.filter creates a new array containing the elements for which a supplied test function returns true.

**Judgment:** 1/1. 

- Criterion 1: 1. Explains Array.filter directly in one sentence and creates no scaffold.

## What this warrants

A passing response supports the listed local claims only. A tie does not prove the packages are equivalent; a win does not establish a general performance gain. Where the control already succeeds, the trial does not establish a need for an additional skill. Package structure is checked separately. The original proposal is a separately authored candidate, not a behavior-tested winner by inheritance.
