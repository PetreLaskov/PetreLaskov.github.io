# Reproducing this edition

The offline HTML reader needs no server, installed skill or network request. Markdown, source snapshots and diffs are also directly readable.

## Source and candidate identity

`source-manifest.json` records every source file hash and the pinned Git commit. `publication-manifest.json` records chapter word counts and final skill entrypoint hashes. Evaluation run manifests record the exact packages supplied to the evaluators. A skill edited after a trial does not inherit that trial as evidence for its new content.

## Structural checks and exact diffs

`tools/validate-compendium.py` calls the installed skill-creator validator, verifies hashes and invocation policies, checks local links, and generates unified diffs for all source/candidate package files. Text diffs normalize line endings; source byte hashes preserve exact source identity. Diffs use this study edition's directory layout and should be inspected before any attempt to apply changes elsewhere.

This run uses bundled Python 3.12 and PyYAML 6.0.3 in an OS temporary folder. The script records local paths for this machine. On a different host, adjust ROOT and the validator/dependency paths rather than changing global Python state. The original validator is at /path/to/user-home/.codex/skills/.system/skill-creator/scripts/quick_validate.py.

## Rebuild reading artifacts

`tools/assemble-compendium.mjs <absolute-compendium-directory>` rebuilds the index, overview, porting table, combined Markdown and self-contained HTML from chapters, packages and recorded evaluations. It uses the bundled `marked` Markdown renderer. Its moduleRoot constant points to this host's runtime; adjust it if rebuilding elsewhere. Rebuilding changes presentation, not source packages.

`tools/build-lab.mjs` is the initial construction script for the manifest and frozen cases. Do not rerun it casually after recording trial results: preserve the original timestamps and hashes. To create a new suite version, copy it to a new edition and record a new lock.

## Behavioral trials

Read evals/PROTOCOL.md and evals/PROTOCOL-ADDENDUM.md. The prompts, rubrics, manifests and responses are retained as data. Re-run each condition in a fresh agent with only its permitted inputs. Do not show rubrics or competing outputs to response-producing agents. Keep candidate package hashes, actual responses and scoring evidence. For a stronger next evaluation, run unseen real tasks, rotate models and judges, repeat runs and measure user attention as well as output quality.

Exact reproduction of model responses is not promised: this host did not expose fixed sampling seeds, temperature or an exact serving model revision. The records support inspection and repeated experiments, not deterministic regeneration of prose.

## Adoption

No package was globally installed during preparation. To try one, explicitly choose its folder and a suitable task. Preserve the refactor's agents/openai.yaml so a source skill that required human invocation does not silently become automatic. Retain LICENSE when copying Matt-derived packages. Keep originals and refactors separate until experience justifies consolidation.

## Completed evaluation artifacts

The original comparison has 342 responses and three grader files. `compile-evaluation.mjs` regenerates baseline scores and per-skill reports. Then `compile-followups.py` appends the eight later probes, writes execution notes, and verifies archived v1 hashes. Do not run the follow-up compiler repeatedly without regenerating the baseline reports first. `integrate-audits.py` integrates preserved review records into chapters. Run structural validation to refresh exact diffs, then assemble the reader.

`repair-audits.py`, `refine-originals.py`, and `repair-setup-seed.py` document one-time versioned changes and intentionally refuse to overwrite their archives. The frozen prompt preparation and condition scripts are construction history, not ordinary rebuild steps. Keep them as evidence; do not rerun them against this completed edition.

`test-wizard-repair.mjs` runs the extracted shared library only, with synthetic input and stubbed GitHub operations. It checks source, archived v1 and repaired versions against the same 14 post-audit invariants. `test-source-helper.mjs` executes the source guard only as a classifier of inert command strings; no classified Git command runs. Their limits are recorded in the generated reports.

`check-reader.mjs` uses installed Chrome through bundled Playwright. It checks 228 panel switches, three internal routes, search behavior, JavaScript errors and narrow-screen overflow. Screenshots from the final run are in reviews/reader-screenshots. The reader itself works offline without those tools.

Final candidate hashes are in publication-manifest.json and evals/published-candidate-identity.json. Structural validation, behavioral responses, independent design review, executable helper tests and browser checks support different claims. Keep them separate when adapting or citing this edition.

## Public-copy paths

Host-specific paths in the public copy are placeholders. The full reader works without rebuilding. To reuse the construction scripts, set the edition root and runtime/tool paths for your machine; they are retained as the original experiment record, not an installer. See PUBLICATION.md for publication transformations.
