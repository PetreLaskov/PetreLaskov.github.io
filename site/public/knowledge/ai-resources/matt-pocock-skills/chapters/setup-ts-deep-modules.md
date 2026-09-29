# Setup TS Deep Modules: enforce entrances, then test that the fence reaches them

**Source status: in-progress / beta, excluded from the promoted plugin.**

**Port bet: conditional.** Add dependency-cruiser rules for flat TypeScript package boundaries and verify allowed and forbidden imports across every importer root.

## Source and reading map

- [SKILL.md:7-35](../source/skills/in-progress/setup-ts-deep-modules/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/setup-ts-deep-modules/SKILL.md#L7)
- [SKILL.md:39-65](../source/skills/in-progress/setup-ts-deep-modules/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/setup-ts-deep-modules/SKILL.md#L39)
- [SKILL.md:67-102](../source/skills/in-progress/setup-ts-deep-modules/SKILL.md) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/setup-ts-deep-modules/SKILL.md#L67)
- [dependency-cruiser.config.cjs:14-74](../source/skills/in-progress/setup-ts-deep-modules/dependency-cruiser.config.cjs) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/setup-ts-deep-modules/dependency-cruiser.config.cjs#L14)
- [dependency-cruiser.config.cjs:88-95](../source/skills/in-progress/setup-ts-deep-modules/dependency-cruiser.config.cjs) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/setup-ts-deep-modules/dependency-cruiser.config.cjs#L88)
- [agents/openai.yaml:1-5](../source/skills/in-progress/setup-ts-deep-modules/agents/openai.yaml) · [pinned upstream](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/setup-ts-deep-modules/agents/openai.yaml#L1)

## Understand the source

This skill installs an architectural convention and a tool that enforces it. Packages live as immediate children of one root, such as src/packages. Every file directly inside a package is a public entrypoint; everything in its subfolders is private implementation. Multiple small entrypoints are encouraged, so a package need not funnel all exports through one giant index barrel. Implementation conventionally lives in lib and tests in tests, but the privacy rule applies to any subfolder.

The source states four conceptual rules: outsiders enter through root files; a package's own implementation can import its internals; tests exercise public entrypoints while using their own fixtures; and dependencies must not form cycles. The bundled configuration actually contains five forbidden rules because it separately enforces test-folder privacy. This is not necessarily a behavior bug, but it is an important discrepancy between the prose count and the actual artifact.

The workflow detects package manager and package root, installs dependency-cruiser, merges or creates its configuration, adds a boundary-check command, scaffolds an example package, demonstrates pass-fail-pass on an illegal test import, and writes a local convention document linked from agent instructions. The source insists that the negative test is the completion criterion. A configuration that never rejects a violation has not demonstrated enforcement.

## Why it is more than folder tidiness

A deep module exposes a relatively small interface while hiding substantial behavior. The folder rule is a proxy for one part of that design: controlling which dependencies can reach implementation details. If app code imports a billing helper from billing/lib, the helper becomes an accidental public API. Later refactoring that helper can break consumers the package owner did not know existed. Enforcing entrypoints makes those dependencies visible and gives internal changes more freedom.

Tests through entrypoints reinforce the same idea. A test that only passes because it can reach private helpers may lock in implementation structure rather than behavior. The source allows tests to share their own fixtures and permits integration tests across package entrypoints. It does not allow tests to import even their own package's internal implementation. That is a strong policy choice, useful for some designs and costly for algorithms whose internal properties need direct examination.

Use the skill when a repository wants this flat-package convention and has actual boundary leakage to prevent. Do not apply it merely because a TypeScript repository exists. Existing package exports, nested workspaces, generated code, framework routes, or colocated tests may require a different model. A tool can enforce entrances without proving that the public API is well designed. Moving every helper to a root file would satisfy the rule while defeating its architectural intention.

## Worked example and configuration audit

Consider src/packages/billing/index.ts delegating to billing/lib/calculate.ts. App code may import billing/index. Billing implementation may import its own lib/calculate. Billing tests may import ../index and their own tests/fixtures. An import from app.ts to billing/lib/calculate should fail, as should a billing test reaching ../lib/calculate, or another package importing billing/tests/fixtures.

The configuration uses captured package names and dependency-cruiser's group matching to allow same-package imports while blocking cross-package internals. It also distinguishes tests from other importers. Those details are why the template should not be flattened into a few broad regular expressions without understanding its semantics. The file is CommonJS so it works in repositories whose package.json declares module type.

A subtle coverage issue appears in the source command: depcruise can be pointed only at the packages root. If app code outside that root is never part of the analyzed graph, the app-to-internals rule may not see its imports. The port therefore identifies all relevant importer roots and includes them in the checked graph. Another adaptation issue is PACKAGES_ROOT being inserted into regexes without escaping; unusual path characters can change matching. The existing template also assumes a root tsconfig and a particular extension set. “Only change PACKAGES_ROOT” is too strong for arbitrary repositories.

## Strengths, criticism, and why one might keep it

The pass-fail-pass requirement is the best part of the source. It turns a decorative configuration into a behavioral claim that can be challenged. The local README plus a short agent pointer is also well judged: detailed conventions live near the packages they govern, while always-loaded instructions remain small. Multiple public entrypoints avoid treating one giant barrel as the only route to encapsulation.

The weakness is the gap between structural privacy and semantic depth. The tool cannot tell whether an entrypoint leaks internal types, requires consumers to orchestrate too many steps, or hides almost nothing. The strict public-only test policy may also be inappropriate for some repositories. Global cycle prohibition can exceed the requested package-boundary scope. A committed example package adds permanent demonstration code even when an existing package or temporary fixture would teach the convention better.

The strongest reason to keep the original is that a clear convention can outperform a flexible system when a team is starting fresh. One root, one depth rule, and one negative example are easy to teach. The refactor preserves that default for compatible repositories, but makes compatibility, scan coverage, and meaningful negative cases explicit rather than assuming the template generalizes unchanged.

## Refactor, testing boundary, and collaboration bet

The port first checks whether the repository's actual shape matches flat packages with root-file entrypoints. It retains the template as an audited starting point and merges existing configuration. It scans all relevant importers, adapts resolution options, and verifies allowed entrypoint imports, forbidden app and cross-package deep imports, test privacy, and cycles where in scope. It uses isolated fixtures or an existing representative package instead of unconditionally committing an example. Only actual observed runs count as enforcement evidence.

The bundled configuration in this study package is retained without claiming that it has been executed against a target repository. Its mechanisms have been inspected; target installation and enforcement tests remain a separate action. This distinction matters because parser resolution and dependency graph coverage are properties of the real environment, not just the text of a rule.

My bet is conditional adoption where the team chooses this architecture. Success means fewer accidental private dependencies and more freedom to refactor internals, with manageable exception cost. The falsifier is that developers constantly move internals into root files to bypass the rule, or the configuration blocks legitimate design more often than it prevents coupling. Passing a negative fixture is necessary evidence of enforcement, not evidence that the architecture is good.

## An original proposal: contract-surface-audit

Contract-surface-audit examines what consumers must know to use a module. It traces a few real callers and asks how much sequencing, representation knowledge, error handling, and internal vocabulary the public surface exposes. The output is a small redesign proposal around one concrete consumer task, with a before/after call-site example. This complements import enforcement by testing the interface itself.

For billing, callers might import only approved root files yet still fetch a customer, normalize a plan, compute discounts, select a tax strategy, and manually assemble an invoice. The public boundary exists, but the consumer owns too much billing knowledge. A proposed operation such as prepareInvoice can hide that orchestration while preserving necessary policy choices. Conversely, collapsing every operation into one opaque function may make debugging and composition worse. The audit should surface that tradeoff through actual callers.

Within this collection, the proposal focuses specifically on consumer knowledge burden at a public contract rather than module size or folder boundaries. Its cost is reading representative call sites and resisting attractive abstractions unsupported by use. It fails if it simply renames functions, introduces a universal service object, or measures quality by the number of exported symbols alone. A successful redesign makes a real task simpler while keeping meaningful choices visible.

## Study exercises and connections

Draw the allowed import matrix for app code, package implementation, package tests, and another package. Then mark which rows a packages-only scan can actually observe. Design one allowed and one forbidden fixture for each important boundary.

Next, inspect a module that obeys the rules and count the concepts a caller must understand to accomplish one task. Does the interface hide useful complexity or merely relocate files? Compare [codebase-design](codebase-design.md) for the architectural vocabulary, [improve-codebase-architecture](improve-codebase-architecture.md) for redesign, and [setup-pre-commit](setup-pre-commit.md) for wiring a check into a feedback surface.

## Semantic delta: what the refactor changes

1. **Check architecture compatibility.** Establish flat packages, entrypoint conventions, tests, and cycle scope before installing a policy. **Tradeoff:** Less automatic than choosing src/packages from directory presence.

2. **Cover all importers.** Scan app and other importer roots so configured boundaries can actually observe violations. **Tradeoff:** The graph may be larger and reveal more preexisting issues.

3. **Treat the template as adaptable code.** Account for five rules, regex root handling, tsconfig, and resolution rather than promising a one-variable edit. **Tradeoff:** Requires environment-specific inspection.

4. **Expand negative verification.** Test distinct app, cross-package, test, fixture, and cycle behaviors instead of one illegal test import. **Tradeoff:** More setup work, justified by materially different rule paths.

5. **Avoid permanent demonstration clutter.** Use isolated fixtures or representative existing packages unless a committed example is useful. **Tradeoff:** The repository may lack the source default copy-me template.

6. **Adapt Codex packaging without changing invocation.** Omit Claude-only disable-model-invocation and argument-hint keys while preserving explicit-only policy in the copied agents/openai.yaml. **Tradeoff:** The study package targets Codex metadata rather than being a byte-identical cross-host manifest.

The full executable instructions are in [the refactor](../refactored/setup-ts-deep-modules/SKILL.md). Existing invocation policy is preserved through copied agents/openai.yaml: explicit invocation only. Claude-only frontmatter keys are omitted from the Codex package; that packaging change does not change who may invoke it. The original proposal has ordinary discovery and lives in [contract-surface-audit](../original-skills/contract-surface-audit/SKILL.md). These are study packages, not installed skills.

## Evaluation boundary

The authorial recommendation above is a hypothesis, not an evaluation result. [The independent evaluation](../evals/setup-ts-deep-modules.md) contains the recorded trial responses and judgments. That run record takes precedence over predictions in this chapter. Reading the instructions and inspecting their syntax cannot prove improved collaboration; that requires a task with an observable result and an informative failure case. The source, proposed port, and original proposal should be distinguishable in any comparison.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. The public-root/private-subfolder convention, same-package implementation access, public-entrypoint tests, fixture privacy, optional cycle policy, wiring, documentation, and observed enforcement remain. The candidate correctly requires all importer roots, preventing a package-only scan from missing app imports. Its fixture matrix covers each substantive rule rather than only one test deep-import example. The unchanged template contains stale comments suggesting only PACKAGES_ROOT needs adaptation, but the entrypoint explicitly overrides that by requiring inspected resolution options and configuration merging. No additional material defect is established statically.

No entrypoint repair needed. Remove stale drop-in comments on the next template edit; runtime fixture results must establish enforcement.

Evidence: [source/skills/in-progress/setup-ts-deep-modules/SKILL.md:24-35](../source/skills/in-progress/setup-ts-deep-modules/SKILL.md), [source/skills/in-progress/setup-ts-deep-modules/SKILL.md:55-95](../source/skills/in-progress/setup-ts-deep-modules/SKILL.md); [refactored/setup-ts-deep-modules/SKILL.md:8-18](../refactored/setup-ts-deep-modules/SKILL.md), [refactored/setup-ts-deep-modules/dependency-cruiser.config.cjs:12-18](../refactored/setup-ts-deep-modules/dependency-cruiser.config.cjs), [refactored/setup-ts-deep-modules/dependency-cruiser.config.cjs:28-94](../refactored/setup-ts-deep-modules/dependency-cruiser.config.cjs). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **contract-surface-audit**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It examines real caller obligations, compares concrete current and proposed use, checks a second caller, and pressures the interface with an unusual legitimate case. Responsibility movement stays explicit. The unit of improvement is consumer knowledge rather than folder layout, export count, or code size. That makes this more focused than generic architecture review.

**Weakness:** A second caller may still share the same hidden assumptions. Hiding repeated orchestration can centralize policy that legitimately belongs to different consumers.

**Suggested improvement:** Keep as a standalone candidate. Choose the second caller for a meaningful policy difference rather than convenience, and state which responsibility moves and why the module is the right owner.

A proposed test was: Review this storage API using two real callers. Propose a smaller public surface that removes accidental sequencing knowledge while preserving caller-owned consistency choices. Success would mean: The proposed call sites eliminate an identified accidental obligation, preserve necessary domain choices, and behave coherently on an error or unusual valid case. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
