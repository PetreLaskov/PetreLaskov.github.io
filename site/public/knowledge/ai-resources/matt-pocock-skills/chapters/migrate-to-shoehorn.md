# Migrate to Shoehorn: make the test escape hatch say what it means

**Source status: misc, retained upstream but rarely used and not promoted.**

**Port bet: conditional.** Replace suitable TypeScript test assertions with intention-specific Shoehorn helpers while preserving fixture semantics and test coverage.

## Source and reading map

- [SKILL.md:8-24](../source/skills/misc/migrate-to-shoehorn/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/misc/migrate-to-shoehorn/SKILL.md#L8)
- [SKILL.md:26-103](../source/skills/misc/migrate-to-shoehorn/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/misc/migrate-to-shoehorn/SKILL.md#L26)
- [SKILL.md:105-118](../source/skills/misc/migrate-to-shoehorn/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/misc/migrate-to-shoehorn/SKILL.md#L105)
- [agents/openai.yaml:1-3](../source/skills/misc/migrate-to-shoehorn/agents/openai.yaml) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/misc/migrate-to-shoehorn/agents/openai.yaml#L1)

## Understand the source

This skill migrates TypeScript test data away from explicit type assertions toward @total-typescript/shoehorn helpers. The source distinguishes three uses: fromPartial supplies a partial object whose provided data should fit the target type, fromAny supplies deliberately invalid data for negative tests, and fromExact requests a complete object. The examples replace an object asserted as Request with fromPartial and a double assertion through unknown with fromAny. The package is explicitly for test code, not production code.

The motivation is practical. A test may exercise only request.body.id while the full request type contains headers, cookies, and many unrelated fields. Filling every field creates noise; asserting the object as the entire type hides intent. A named helper can communicate that the test deliberately supplies a partial fixture. Similarly, a negative test may need a numeric identifier where the API expects a string. A dedicated escape hatch can make that intentional invalidity clearer than a double cast.

The source asks what test files need migration, installs the package, searches for assertions, replaces the patterns, adds imports, and runs type checking. Its sample install command uses npm without a dev-dependency flag, and its grep pattern focuses on capitalized type names in .test.ts and .spec.ts files. Those are examples of a narrow workflow rather than a reliable complete classifier of TypeScript assertions.

## Why explicit intent matters

An assertion tells the compiler to accept a type relationship; it does not manufacture runtime properties. A partial fixture likewise does not become a complete object at runtime merely because a helper gives it a convenient type. If production code starts reading a field the fixture omits, the test may fail, which can be useful, or it may continue passing because that path is not exercised. The helper's value is in expressing controlled incompleteness, not guaranteeing realistic data.

Use the migration when the codebase already wants Shoehorn or when noisy test casts obscure the intended setup. It can make tests easier to read and reduce hand-written irrelevant fields. It is especially useful at boundaries whose production types are broad while each behavior under test needs only a small slice. The source's test-only restriction helps keep these escape hatches out of normal application code.

Do not replace every `as` token mechanically. Const assertions, legitimate narrowing, DOM setup, module mocking, generic inference, and intentionally exact fixtures have different purposes. A double cast may indicate an invalid-input test, but it may also hide a poorly modeled mock that should be repaired. The migration is semantic classification followed by a small transformation, not a global search-and-replace.

## Worked example: partial and invalid are different promises

Suppose getUser accepts a Request and reads body.id. A test passes an object containing only body with a valid string identifier. Using fromPartial expresses that omitted request fields are irrelevant to this behavior while the supplied identifier should be well typed. A separate test passes a numeric identifier to verify rejection. Using fromAny makes the type violation intentional, but the assertion in that test must actually check rejection or the relevant error behavior.

Now suppose a helper returns a fully specified request fixture used by twenty tests. Replacing it with fromPartial may weaken useful completeness checking and allow future required fields to be omitted silently. A complete fixture or fromExact may be better. Conversely, a test that only needs one field should not automatically inherit a giant default factory whose hidden values affect the result.

A careful migration reads the called code and the test's assertion, not just the cast expression. After changing one representative file, it runs both type checking and the relevant tests. Type checking can show that provided values fit the expected API; runtime tests show that the fixture still exercises the intended path. Neither result alone establishes that the fixture is a faithful model of production data.

## Strengths and criticism

The source offers a useful vocabulary for two different kinds of test escape hatch: incomplete but otherwise valid, and intentionally invalid. Its examples are concrete and its prohibition on production use is clear. The skill is also appropriately narrow; it does not try to redesign an entire testing strategy under the banner of a migration.

The strongest criticism is the phrase “type-safe alternatives.” It can imply more than the helpers provide, especially for fromAny and omitted runtime properties. The source workflow also directs blanket replacements based on syntax and validates only with type checking. That risks making a test compile while changing what it proves. Installing a test-only helper as an ordinary dependency is another avoidable mismatch with the stated scope, though repository conventions can determine the actual package placement.

The strongest reason to keep the original is that a small, known migration within Matt's own TypeScript teaching ecosystem may need little additional explanation. An experienced maintainer who already understands the helpers can apply the examples correctly. A portable version needs the classification step because the same syntax occurs in many test idioms. It should not exaggerate the library's guarantees or turn a simple migration into an unrelated architecture audit.

## Refactor, dependencies, and collaboration bet

The proposed version inspects repository package-manager and test conventions, confirms the installed or intended Shoehorn API, classifies each candidate, and changes only fixtures whose intent matches a helper. It prefers test/development dependency placement where the repository supports it. It preserves complete fixtures and legitimate assertions when migration would weaken their purpose. It runs the target tests as well as type checking and checks that imports remain outside production code.

My bet is conditional adoption for codebases already using this library or clearly benefiting from named fixture escape hatches. The improvement should be clearer tests with less irrelevant setup and no loss of defect detection. A falsifier is that tests become shorter but stop catching missing required fields, or that fromAny spreads because it is the easiest way to silence the compiler. Another is that the dependency and unfamiliar vocabulary cost more than a small existing fixture helper would.

Portability is limited to TypeScript projects and depends on the exact installed package behavior. This chapter explains the pinned source's intended APIs rather than claiming verification of an uninstalled future version. The refactor requires reading local types or official package documentation at migration time. No library was installed and no user tests were changed while authoring this study package.

## An original proposal: fixture-truth

Fixture-truth audits what a test setup makes true at runtime and what the assertion actually proves. It begins with one important test, traces the fields or conditions the code under test uses, and identifies defaults, omissions, mocks, or casts that can make the test pass for the wrong reason. The output is a smaller or more faithful fixture and, where necessary, a stronger assertion. It does not assume that realistic-looking data is always better.

For the request example, the test might omit authorization headers while mocking the authorization layer to always succeed. That is acceptable for a focused identifier-extraction test if the boundary is explicit. It is misleading for a test titled “rejects unauthorized requests.” Another fixture may give every user the same administrator role, making a permissions bug invisible. The skill looks for the causal relation between setup and claim.

Its novelty within this collection is that it treats fixture design as part of the test's argument rather than a convenience layer. The cost is reading the exercised path and possibly writing a small counterexample. It fails if it expands every unit test into a production simulation or demands irrelevant fields for realism. A successful audit makes it easier to say exactly what the test would fail on and what remains outside its scope.

## Study exercises and connections

Find five assertions in tests and classify them before proposing changes. Which represents a partial valid object, deliberate invalid input, a complete fixture, a const assertion, or an unrelated typing issue? Explain one case where fromPartial would make the test worse.

Then alter an omitted field or default in a fixture and predict whether the test should fail. Check whether the assertion actually observes that effect. Compare [tdd](tdd.md) for test-driven behavior, [diagnosing-bugs](diagnosing-bugs.md) for reproduction, and [setup-pre-commit](setup-pre-commit.md) for where checks run after such a migration.

## Semantic delta: what the refactor changes

1. **Classify before transforming.** Choose helpers by fixture intent rather than assertion syntax alone. **Tradeoff:** Migration is slower than blanket replacement.

2. **Correct the safety claim.** Explain that helpers neither populate omitted properties nor make deliberate invalid data safe. **Tradeoff:** The library benefit is narrower and more precise than a type-safe slogan.

3. **Preserve exactness where useful.** Keep complete fixtures and legitimate assertions when partial conversion weakens their purpose. **Tradeoff:** Some as expressions deliberately remain.

4. **Validate behavior as well as types.** Run relevant tests, inspect assertions, and check production-import boundaries. **Tradeoff:** Requires more than the source final typecheck.

5. **Respect repository dependency conventions.** Use the actual package manager and test/development placement appropriate to the project. **Tradeoff:** The install command varies instead of always using npm i.

The full executable instructions are in [the refactor](../refactored/migrate-to-shoehorn/SKILL.md). Existing invocation policy is preserved through copied agents/openai.yaml: ordinary discovery. Claude-only frontmatter keys are omitted from the Codex package; that packaging change does not change who may invoke it. The original proposal has ordinary discovery and lives in [fixture-truth](../original-skills/fixture-truth/SKILL.md). These are study packages, not installed skills.

## Evaluation boundary

The authorial recommendation above is a hypothesis, not an evaluation result. [The independent evaluation](../evals/migrate-to-shoehorn.md) contains the recorded trial responses and judgments. That run record takes precedence over predictions in this chapter. Reading the instructions and inspecting their syntax cannot prove improved collaboration; that requires a task with an observable result and an informative failure case. The source, proposed port, and original proposal should be distinguishable in any comparison.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. Test-only fixture migration, partial versus deliberately invalid data, installation, imports, and type verification remain. The candidate improves the source's blanket replacement guidance by classifying assertions and preserving const/narrowing or complete-fixture intent. It explicitly says helpers do not fill missing runtime properties and requires relevant tests as well as type checking. A representative migration precedes expansion, with local API verification rather than assumed helper availability. This protects what each test proves while retaining the requested migration. No actionable semantic defect found.

None. Verify the actual installed helper types and preserved runtime fixture behavior during migration.

Evidence: [source/skills/misc/migrate-to-shoehorn/SKILL.md:10-18](../source/skills/misc/migrate-to-shoehorn/SKILL.md), [source/skills/misc/migrate-to-shoehorn/SKILL.md:65-118](../source/skills/misc/migrate-to-shoehorn/SKILL.md); [refactored/migrate-to-shoehorn/SKILL.md:8-20](../refactored/migrate-to-shoehorn/SKILL.md). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **fixture-truth**: **merge**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It reads fixture, mocks, assertion, and exercised path together, separating essential setup from noise. It correctly permits incomplete fixtures and narrowing an overstated test claim. Its diagnostic focus on hidden defaults and replaced behavior is useful, but the validating mechanism is the same isolated defect challenge used by test-the-oracle.

**Weakness:** Installed separately, both skills trigger on important green tests that may pass for the wrong reason and produce closely related mutations, assertion repairs, and execution reports.

**Suggested improvement:** Merge into test-the-oracle as its fixture-and-mock diagnostic mode. Preserve the rule that fixture completeness is not truth and retain exact execution status when a counterexample cannot be run.

A proposed test was: Audit this mocked cancellation test. Determine whether the fixture bypasses real cancellation behavior and construct one counterexample the test should reject. Success would mean: The analysis shows which setup actually causes the pass, repairs or narrows the claimed behavior, and records whether the intended defect is detected after repair. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
