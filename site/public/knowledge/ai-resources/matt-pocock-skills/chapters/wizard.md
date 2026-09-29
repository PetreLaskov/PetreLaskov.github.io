# Wizard — turn a human-only procedure into a usable instrument

**Study question:** when are instructions better delivered as an interactive tool?

## Understand the original

Wizard generates a Bash script for procedures that require a human: visiting a dashboard, obtaining a credential, setting a service option, or performing a carefully sequenced cutover. The agent writes the tool; the human runs it. The goal is to stop scattering a long sequence of clicks, copied values, and configuration edits through chat. A stage presents one focused task, opens the relevant page, captures the result, and writes it to the intended destination. [S1]

The source ships an actual library in template.sh. It handles progress display, browser opening across common systems including WSL, visible and hidden input, existing-value defaults, dotenv upserts, GitHub secrets and variables, confirmation prompts, and a closing summary. The skill tells authors not to modify the library above the STAGES marker. They should scope the procedure and write stage calls using the provided helpers.

Scoping comes first. The agent inspects the repository's configuration needs and CI references, then identifies every manual action and value. For each value it must know where the human obtains it, where it is stored, and whether it is secret. Exact dashboard instructions should come from current evidence, not invented memory. The ordered stages are shown before the wizard is authored.

The artifact is ephemeral by default. A one-off procedure need not become permanent repository infrastructure. A repeatable onboarding path can be committed and linked from the README when requested. The agent checks syntax and traces value routing but does not run the live wizard end to end, because doing so would open browsers and wait for the human.

## A worked example

A small application needs a public service URL, a local development API key, and a CI deployment token. The repository reveals that local development reads SERVICE_URL and DEV_API_KEY, while a workflow reads DEPLOY_TOKEN. A useful wizard has separate stages for the local service and deployment credentials rather than asking the user to paste all values into chat.

The local stage opens the correct dashboard, gives the precise navigation path, uses visible input for the public URL and hidden input for the key, then writes only the appropriate values locally. The deployment stage sends the user to the token page and stores the token only in the configured CI destination if local use is unnecessary. Hidden input prevents ordinary terminal echo, while the closing summary names keys rather than printing their values.

Now suppose the token is a multiline private key. The source helper writes raw KEY=VALUE lines; it does not encode general dotenv syntax. Passing the key through that helper would be wrong even if Bash quoting is correct. The wizard should choose a supported secret-store or file path and validate that design, or stop with a precise unsupported format. The library's convenience is valuable only inside its actual contract.

For a migration, restarting is another trap. Enter can reuse values already saved in .env, but it does not prove that a destructive stage is safe to repeat. The stage must inspect current state or explicitly distinguish completed and pending actions. “Re-runnable input prompts” and “idempotent migration” are different claims.

## What it gets right

The source recognizes that the human can be a participant in an executable workflow rather than a person expected to reconstruct instructions from chat. Progress, one-screen stages, browser opening, and hidden input all reduce friction. The agent can continue to handle automated steps while isolating the part only the human can do.

The fixed library is also a sound authoring boundary. Rewriting secret input and configuration manipulation from scratch for every task would create unnecessary variation. A reusable, reviewed helper makes stage authors focus on the specific journey and destinations. The source's instruction to avoid inventing dashboard steps is particularly important because those interfaces change.

The strongest reason to keep the original is the artifact's immediacy. A short generated wizard can be easier to use than a general onboarding platform. Replacing it with a complex orchestration engine would undermine the “one focused task at a time” experience. Porting should preserve the small tool, the human-controlled run, and the distinction between ephemeral and repeatable use.

## Criticism and actual helper limits

The phrase “idempotent .env upserts” is true only in a limited sense: repeated writes replace lines matching the key. It does not mean arbitrary values round-trip through every dotenv parser. The helper uses raw text, regex matching for keys, and a simple last-line lookup. Names should therefore be fixed valid identifiers, and values should be restricted to a clearly supported single-line bare form unless another tested serializer is used. [S2]

Input handling also deserves attention. The template accepts EOF with “or true,” which can leave an empty value that later stages persist. A generated stage should reject empty required values and stop if no interactive terminal is available. Existing quoted dotenv values may be returned with their quotes intact. The initial candidate tried to address this through author-stage constraints alone. Independent review showed that saved-value fallback made those constraints insufficient. The final port repairs required input handling in the shared helper, while retaining stage validation for supported values and terminal availability.

The GitHub helpers infer destination from the current environment and downgrade failures to skipped items. A user can therefore reach a completion banner while required CI setup remains pending. The source does list skipped operations, which is useful, but the generated procedure should pin the intended repository/environment and distinguish complete from partially configured. The helper does not track successful public variables in the same summary array as secrets, another reason to trace every required output. [S3]

The docs overstate a few properties. They mention progress with time remaining, while the template displays stage count. They also describe portability unconditionally, but running requires Bash and relevant commands; Windows PowerShell alone is not Bash. Claims that the model is never connected to the terminal depend on the actual execution setup. Human-run hidden entry is a good boundary, but it is not a universal guarantee about every host.

## Porting bet and dependency cost

**Bet: pilot on a modest repeatable setup.** This could improve collaboration when several human-only steps otherwise require repeated explanation. For one short dashboard action, a clear instruction is probably cheaper. Its falsifier is whether the wizard reduces mistakes and backtracking without creating configuration corruption or ambiguous completion. Observe one real run and its result before treating the template as proven for that environment.

Dependencies include Bash, a usable terminal, a browser-opening mechanism or manual URL fallback, and gh for GitHub operations. Those are requirements of the artifact, not of merely writing it. A native PowerShell environment may need an existing Bash installation or a separately designed native workflow; the skill should not install a shell merely because the template assumes one.

The initial helper is preserved under evals/candidate-v1/wizard. The final candidate repairs EOF, empty required input, failed remote-write status, and the completion headline. Isolated Bash fixtures exercised source, initial candidate and repair: the source and initial candidate met 4 of 14 selected checks; the repair met all 14. These are targeted regression checks after a known defect, not independent benchmark evidence. Live dashboards, real credential storage, and CI integration were not exercised. [Read the executed checks](../evals/WIZARD-REPAIR.md).

## Refactor: a precise contract around a useful library

The new entrypoint inventories required variable names and destinations without dumping existing secret values. It identifies which steps genuinely need a human and lets the agent perform ordinary authorized automation itself. The stage plan includes required outputs, validation, and irreversible actions.

When the supplied repaired template fits, stage code validates fixed key names, required nonempty input, and supported bare single-line values before calling write_env. Values containing whitespace, comments, expansion-sensitive characters, or multiline content require a different tested storage path. This is a concrete limitation, not a generic warning about secrets.

Generated scripts receive syntax checks and, where the complexity warrants it, isolated tests with stubbed browser and remote commands. The author still does not run the real procedure. The final handoff tells the user where to run it, what destination it will affect, and what remains unverified. A rerun must check action state rather than relying only on saved values.

## Original proposal: Make the Tradeoff Tangible

The inspired proposal creates a small manipulable model when a decision depends on quantities, timing, or competing preferences that are hard to grasp in prose. It could be a local interactive page, a spreadsheet, or a simple control panel. The user changes a few meaningful inputs and sees consequences immediately.

For planning a study week, controls might vary session length and number of topics, showing time for practice versus reading. For a system design, controls might vary batch size and latency assumptions, showing a transparent estimated tradeoff. The artifact should expose its assumptions and distinguish measured inputs from illustrative ones. It is a thinking instrument, not a prediction machine.

The novelty claim is limited: interactive models and what-if analysis are established. The proposal focuses on the collaboration benefit of letting the user explore rather than repeatedly asking the assistant to recalculate. Its cost is building and validating the model. Its falsifier is whether changing inputs teaches a real dependency or changes a decision. An attractive interface with arbitrary assumptions can be worse than a clear paragraph.

## Study and transfer

1. Trace each captured value from source to destination and identify which are genuinely secret.
2. Explain why hidden input does not make raw dotenv serialization correct.
3. Distinguish a safe rerun of value capture from a safe rerun of a cutover.
4. Choose a decision where an interactive model would teach more than another explanation.

Read [setup-matt-pocock-skills](setup-matt-pocock-skills.md) for repository configuration and [implement](implement.md) for the point at which a human-only step may block delivery. Wizard's value is turning a procedure into an instrument the user can actually operate.

## Numbered semantic delta

1. **D1: Read variable names and configuration needs without exposing existing secret values.** Scoping can inspect required keys without importing credentials into model context. Tradeoff: Some state must be checked through presence/metadata rather than raw file output.

2. **D2: Declare remaining helper limitations and validate supported values in generated stages.** write_env emits raw KEY=VALUE and is not a general dotenv serializer. Tradeoff: Multiline or quoted-sensitive values require a different tested path.

3. **D3: Pin repository/environment destinations and verify runtime prerequisites before remote writes.** gh infers context; the source could display completion after skipped operations. The final helper returns failure and displays incomplete when required operations fail. Tradeoff: A generated wizard needs a short preflight and accurate final status.

4. **D4: Distinguish resumable value entry from safe rerun of irreversible actions.** Saved defaults do not make a migration or account action idempotent. Tradeoff: Action stages need their own observed-state check.

5. **D5: Validate generated code statically and with isolated stubs where useful; never run the live interactive procedure as author.** Syntax alone cannot prove value routing or EOF behavior. Tradeoff: Fixture validation adds effort for complex wizards, while live execution remains the human's step.

## Artifacts and evaluation

[Refactored skill](../refactored/wizard/SKILL.md) · [Original proposal: make-the-tradeoff-tangible](../original-skills/make-the-tradeoff-tangible/SKILL.md) · [Exact source diff](../diffs/wizard.diff) · [Independent evaluation](../evals/wizard.md)

These are authored candidates, not installed skills. The linked independent evaluation records the actual text responses, case-bound grades and limitations. The design bet in this chapter is distinct from those observations. Source documentation issue reports are historical claims in the pinned bundle, not independently reproduced measurements.

## Source locators

- **S1:** [skills/engineering/wizard/SKILL.md, lines 8-44](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/wizard/SKILL.md#L8-L44) ([local snapshot](../source/skills/engineering/wizard/SKILL.md)).
- **S2:** [skills/engineering/wizard/template.sh, lines 77-139](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/wizard/template.sh#L77-L139) ([local snapshot](../source/skills/engineering/wizard/template.sh)).
- **S3:** [skills/engineering/wizard/template.sh, lines 141-204](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/wizard/template.sh#L141-L204) ([local snapshot](../source/skills/engineering/wizard/template.sh)).
- **S4:** [docs/engineering/wizard.md, lines 42-77](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/docs/engineering/wizard.md#L42-L77) ([local snapshot](../source/docs/engineering/wizard.md)).

## Supporting-resource disposition

- template.sh: **repair** — Preserve the small shared library while making EOF and empty required input fail, returning nonzero for failed remote writes, and reporting incomplete when skips remain. Bare-value serialization and target identity still require explicit stage validation.
- agents/openai.yaml: **copy** — Preserve source UI metadata and invocation policy exactly.
- source/LICENSE: **copy** — Retain Matt Pocock MIT attribution in every refactored package.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **repair**. The entrypoint promises better input and completion handling but freezes helpers that do not implement it. set_secret/set_var convert failed required writes into successful returns with SKIPPED entries, while finish unconditionally prints Setup complete. ask/ask_secret suppress read failure and may substitute a saved value, hiding EOF from later nonempty validation. An author can add stage-level compensation, but the unchanged-library contract leaves every generated wizard to rediscover that obligation. This retained helper behavior is materially at odds with the advertised incomplete-versus-complete boundary.

Repair the shared helpers or provide explicit tested wrappers: propagate input status, distinguish required write failure, and gate successful completion. Preserve library reuse after fixing its contract.

Evidence: [source/skills/engineering/wizard/SKILL.md:10-10](../source/skills/engineering/wizard/SKILL.md), [source/skills/engineering/wizard/SKILL.md:35-43](../source/skills/engineering/wizard/SKILL.md); [evals/candidate-v1/wizard/SKILL.md:18-24](../evals/candidate-v1/wizard/SKILL.md), [evals/candidate-v1/wizard/template.sh:108-125](../evals/candidate-v1/wizard/template.sh), [evals/candidate-v1/wizard/template.sh:143-178](../evals/candidate-v1/wizard/template.sh). This is static inspection, not proof of a completed workflow.

**Repair and retest:** the final shared template now enforces the missing input/failure/completion contract. [Fourteen isolated regression checks](../evals/WIZARD-REPAIR.md) pass on the repair. The initial text-trial grade applies to the archived candidate; the repair has separate evidence. The remaining raw dotenv serializer and inferred GitHub target are still limits requiring stage validation.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **make-the-tradeoff-tangible**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It chooses adjustable variables, separates measured inputs from assumptions, exposes the model, and checks representative and boundary calculations. The artifact is connected to a real decision. Unlike the mostly textual portfolio, this produces an exploratory instrument whose dependency can be manipulated directly. Its value comes from appropriate model choice, not interactivity itself.

**Weakness:** The stated success of 'better understanding' is not directly established by a working interface. A transparent but incomplete model can still anchor the user on the wrong decision variables.

**Suggested improvement:** Identify material factors the model omits and ask for one decision-relevant interpretation if learning is being evaluated. Treat correct calculation and improved user understanding as separate evidence claims.

A proposed test was: Build a small interactive comparison of staffing coverage and response delay using our measured arrival rates, with assumptions visibly editable and an easy reset. Success would mean: Controls change the intended consequences correctly, boundary calculations agree with independent checks, and the artifact exposes which plausible assumptions reverse the decision. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
