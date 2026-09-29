# Setup Matt Pocock Skills — put repository variation at one seam

**Study question:** how can the same workflow serve different projects without turning every skill into a configuration language?

## Understand the original

Setup configures three repository-specific facts: where work items live, what triage labels mean, and where domain documents belong. It writes those answers under docs/agents and points to them from the repository's instruction file. The skills remain the same across repositories; the configuration supplies the variable part. This is a practical use of indirection. Instead of editing every skill to use a different tracker, one local document describes the workflow. [S1]

The process is conversational rather than a deterministic installer. It inspects remotes, existing instruction files, prior configuration, scratch directories, domain documentation, and monorepo signals. It recommends a tracker based on the repository, asks about label vocabulary if triage is present, and defaults to a single domain context unless a genuine multi-package structure warrants more. It presents concrete draft documents before writing them. [S2]

GitHub, GitLab, and local Markdown have seed templates. Other trackers are supported through a prose description of the actual workflow. This is a deliberate distinction between first-class maintained integrations and a custom escape hatch. The out-of-scope record rejects adding a dedicated backend for every new tool because command shapes and parsing are long-term maintenance obligations. It does not prohibit users from describing a custom tracker. [S7]

The domain document template is particularly sensible. Consumers read CONTEXT.md or the context map and relevant ADRs if they exist, but proceed silently if they do not. Domain-modeling creates documents when real terms and decisions arise. Setup configures where future knowledge belongs; it does not populate an empty architectural filing cabinet.

## A worked example

Suppose a repository uses GitLab for issues, has an existing AGENTS.md, and contains one application with no meaningful context split. Setup reads the remote and existing conventions, recommends GitLab, preserves the current label names if they already serve the canonical roles, and writes a single-context domain configuration.

The resulting issue-tracker document explains that GitLab comments are notes, that issues and merge requests use different number spaces, and that closing an issue with an explanation is a note followed by closure. It records whether native blocking links are available in that installation and what text fallback means if they are not. A separate label table maps “awaiting-details” to the canonical needs-info role if that is the repository's existing vocabulary.

Now make the repository local-only. The same downstream ticket skill should write one file per ticket under a feature directory, with stable IDs and blocker references. There is no need to simulate a remote issue API or install a tracker. The important invariant is that a fresh implementer can resolve an exact ticket and determine which blockers are complete. [S4]

Finally, suppose both CLAUDE.md and AGENTS.md exist, and Codex is the active host. The original chooses CLAUDE.md first. That may leave the new pointers in a file Codex does not consume automatically. A correct port checks the active harness and preserves the repository's existing canonical instruction relationship rather than selecting by filename existence alone.

## What it gets right

The strongest architectural idea is separating a workflow from its local transport. A tracker is where plans are stored and related, not the essence of planning. The prose configuration is inspectable and editable. It avoids modifying installed skills, which could be overwritten by updates, and lets repository collaborators share the same routing decisions.

The source also avoids overbuilding. It does not invent a formal configuration language for a handful of facts. The custom-tracker path asks for a short description rather than requiring a new plugin implementation. The single-context default prevents a small project from acquiring monorepo-style documentation simply because such a pattern exists.

The strongest reason to keep the original is its narrow scope. Requests to configure tone, interview cadence, and every skill behavior are explicitly outside its job. That refusal keeps setup comprehensible. User preferences belong in the ordinary instruction layer rather than a new configuration subsystem that every skill must interpret.

## Criticism and limits

The source promises configuration but does not ensure operational readiness. A label mapping can say ready-for-agent while that remote label does not exist. Later issue creation then fails. This is not solved by adding more prose claiming setup is complete. The tool should distinguish files written, capability checked, and external objects provisioned. If the user authorized local configuration only, missing remote labels remain an explicit pending action. [S5]

Label creation is not the only gap. Setup skips label configuration when triage is not installed, but to-tickets also applies ready-for-agent. Discovery of one skill is therefore an imperfect test of downstream needs. The correct question is which configured workflows consume the roles.

The GitHub seed includes an external-PR listing command with an authorAssociation JSON field that the accompanying docs identify as unsupported by that CLI path. More broadly, parent-child relationships and blocking dependencies are different. A child issue belongs to a parent; it is not necessarily blocked by that parent or by its siblings. Templates should preserve this distinction and verify the available interface instead of carrying brittle command folklore. [S3]

The domain topology inference also needs restraint. A workspaces field does not prove that the project contains multiple domain contexts. A monorepo may share one vocabulary, and a single repository may contain several. The source uses monorepo signals to decide whether to offer the choice; the refactor keeps them as signals rather than turning package count into domain truth.

## Porting bet and dependency cost

**Bet: conditional.** Adopt this when we adopt several tracker-dependent skills in a real repository. For standalone explanation, writing, or occasional coding, the setup overhead is unnecessary. Its falsifier is whether downstream skills can resolve and create work items without guessing the tracker, labels, or document location. A setup that produces files but does not reduce those errors is not earning its place.

The dependency cost is maintained local configuration and, for remote trackers, an available authenticated connector or CLI. Authentication is not assumed merely because a remote URL exists. The refactor can check read-only capability and prepare concrete configuration without performing an external write. It retains the source's prompt-driven character.

The source rejects a separate verify/check mode because a natural-language request can already scope setup to verification. The refactor respects that decision: “check current setup without rewriting” is handled inside the same entrypoint, with no new flag or sibling validator. This is an example of improving clarity while honoring an explicit rejected feature. [S6]

## Refactor: configuration that tells the truth

The proposed version records a repository identity, tracker surface, operations, relationship semantics, label mapping, and domain layout. It writes pointers into the instruction file actually read by the active host, preserving unrelated content and avoiding duplicate blocks. Existing customizations are reconciled rather than reset to the current seeds.

The remote templates become concise operational contracts. They still describe reading full bodies and comments, creating work items, posting comments, changing labels, closing, and managing wayfinding maps. However, exact flags and fields are checked against the available tool when setting up a repository. A copied command is a starting point, not evidence that the installed version supports it.

The local template distinguishes wayfinding tickets resolved by decisions from implementation tickets completed by verification. Both use one file per ticket, but “resolved” must not accidentally mean the same thing in every workflow. The label table includes the category roles that triage expects and a place to record actual remote existence.

## Original proposal: Make a Working Example

The inspired proposal takes a different route to shared understanding: make one small, real example that uses the system correctly. Instead of writing more general instructions, select a representative path and construct the smallest artifact a future collaborator can run, inspect, or copy. The example should contain a meaningful input, expected output, and explanation of the decisions it demonstrates.

For local issue tracking, that might be one sample feature with a spec and two genuinely dependent tickets, explicitly marked as an example rather than active work. For a data pipeline, it might be a tiny fixture and a command that produces a known output. For a writing style, it could be a worked before/after passage with annotations. The example makes an abstract convention concrete without turning it into an exhaustive manual.

The novelty claim is limited: worked examples and executable documentation are established teaching methods. The proposal focuses on choosing the example that carries the most decision-relevant information. Its cost is maintaining the example as the system changes. Its falsifier is whether a fresh collaborator can perform an analogous task from it without copying irrelevant incidental choices. An example that only runs on the author's hidden environment fails.

## Study and transfer

1. Separate a tracker role from its label spelling and from the existence of that label.
2. Explain the difference between a parent link and a blocking edge.
3. Identify which setup facts should be shared in a repository and which belong in personal instructions.
4. Design one small example that teaches a convention better than another page of prose.

Read [to-tickets](to-tickets.md) and [triage](triage.md) to see which contracts setup must support. A good setup skill reduces variation at the right seam; it should not become the place where every preference in the collaboration is configured.

## Numbered semantic delta

1. **D1: Write pointers into the instruction file the active harness actually consumes.** Preferring CLAUDE.md merely because it exists can hide configuration from Codex. Tradeoff: Mixed-harness repos need one deliberate canonical pointer decision.

2. **D2: Treat label mapping and existing remote labels as different facts.** Writing a vocabulary table does not provision the tracker. Tradeoff: Setup can end with a precise pending external step.

3. **D3: Cover all known downstream label consumers, not triage discovery alone.** to-tickets applies ready-for-agent even if triage is not installed. Tradeoff: Slightly broader dependency inspection.

4. **D4: Verify command capability read-only and distinguish parent links from blocking links.** Source templates contain a documented unsupported JSON field and relationship ambiguity. Tradeoff: Templates are capability instructions rather than timeless command recipes.

5. **D5: Honor natural-language verify-only requests within the same skill.** The project's explicit out-of-scope rationale rejects a duplicate verification mode. Tradeoff: No separate command surface or rigid schema checker is introduced.

6. **P1: Omit Claude-only disable-model-invocation frontmatter while copying agents/openai.yaml explicit-only policy.** The target is Codex packaging; its metadata preserves invocation intent and the bundled validator accepts the supported frontmatter. Tradeoff: This package is not a byte-identical Claude entrypoint.

## Artifacts and evaluation

[Refactored skill](../refactored/setup-matt-pocock-skills/SKILL.md) · [Original proposal: make-a-working-example](../original-skills/make-a-working-example/SKILL.md) · [Exact source diff](../diffs/setup-matt-pocock-skills.diff) · [Independent evaluation](../evals/setup-matt-pocock-skills.md)

These are authored candidates, not installed skills. The linked independent evaluation records the actual text responses, case-bound grades and limitations. The design bet in this chapter is distinct from those observations. Source documentation issue reports are historical claims in the pinned bundle, not independently reproduced measurements.

## Source locators

- **S1:** [skills/engineering/setup-matt-pocock-skills/SKILL.md, lines 9-61](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/setup-matt-pocock-skills/SKILL.md#L9-L61) ([local snapshot](../source/skills/engineering/setup-matt-pocock-skills/SKILL.md)).
- **S2:** [skills/engineering/setup-matt-pocock-skills/SKILL.md, lines 63-116](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/setup-matt-pocock-skills/SKILL.md#L63-L116) ([local snapshot](../source/skills/engineering/setup-matt-pocock-skills/SKILL.md)).
- **S3:** [skills/engineering/setup-matt-pocock-skills/issue-tracker-github.md, lines 16-45](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/setup-matt-pocock-skills/issue-tracker-github.md#L16-L45) ([local snapshot](../source/skills/engineering/setup-matt-pocock-skills/issue-tracker-github.md)).
- **S4:** [skills/engineering/setup-matt-pocock-skills/issue-tracker-local.md, lines 5-30](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/setup-matt-pocock-skills/issue-tracker-local.md#L5-L30) ([local snapshot](../source/skills/engineering/setup-matt-pocock-skills/issue-tracker-local.md)).
- **S5:** [docs/engineering/setup-matt-pocock-skills.md, lines 57-82](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/docs/engineering/setup-matt-pocock-skills.md#L57-L82) ([local snapshot](../source/docs/engineering/setup-matt-pocock-skills.md)).
- **S6:** [out-of-scope/setup-skill-verify-mode.md, lines 3-11](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/out-of-scope/setup-skill-verify-mode.md#L3-L11) ([local snapshot](../source/out-of-scope/setup-skill-verify-mode.md)).
- **S7:** [out-of-scope/mainstream-issue-trackers-only.md, lines 3-21](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/out-of-scope/mainstream-issue-trackers-only.md#L3-L21) ([local snapshot](../source/out-of-scope/mainstream-issue-trackers-only.md)).

## Supporting-resource disposition

- issue-tracker-github.md: **rewrite** — Keep GitHub conventions and relationship distinctions; verify available CLI/API capabilities rather than ship known unsupported fields.
- issue-tracker-gitlab.md: **rewrite** — Keep issue/MR distinction, notes-before-close, and capability-dependent blocking.
- issue-tracker-local.md: **rewrite** — Keep one file per ticket and map conventions; disambiguate implementation completion from wayfinding resolution.
- triage-labels.md: **rewrite** — Include category roles as well as state mapping and record whether remote labels actually exist.
- domain.md: **copy** — Preserve lazy creation, multi-context routing, domain vocabulary, and explicit ADR-conflict rules.
- agents/openai.yaml: **copy** — Preserve source UI metadata and invocation policy exactly.
- source/LICENSE: **copy** — Retain Matt Pocock MIT attribution in every refactored package.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. Repository-local tracker operations, role mappings, domain layout, and one discoverable instruction pointer remain the product. The seeds preserve GitHub/GitLab identity differences, full-body reads, publication, parent-versus-blocker distinctions, and wayfinding operations. The candidate deliberately verifies current tool support instead of shipping brittle command examples. It also fixes source assumptions about which instruction file the host reads and whether labels are needed only when triage is installed. Preserving customizations and separating configuration from provisioned remote labels makes completion claims appropriately bounded. No actionable defect found.

None. Ensure a generated local configuration actually names its terminal completion status, as its seed requires.

Evidence: [source/skills/engineering/setup-matt-pocock-skills/SKILL.md:9-116](../source/skills/engineering/setup-matt-pocock-skills/SKILL.md), [source/skills/engineering/setup-matt-pocock-skills/issue-tracker-local.md:21-30](../source/skills/engineering/setup-matt-pocock-skills/issue-tracker-local.md); [refactored/setup-matt-pocock-skills/SKILL.md:8-27](../refactored/setup-matt-pocock-skills/SKILL.md), [refactored/setup-matt-pocock-skills/issue-tracker-local.md:3-11](../refactored/setup-matt-pocock-skills/issue-tracker-local.md), [refactored/setup-matt-pocock-skills/triage-labels.md:5-17](../refactored/setup-matt-pocock-skills/triage-labels.md). This is static inspection, not proof of a completed workflow.

**Additional trial finding and repair:** although static inspection found no material defect, the initial response imposed the example tracker layout on an unspecified existing tracker. The final entrypoint and local seed now explicitly give observed conventions priority, including an existing single-file tracker. The original lower grade remains recorded. [Targeted follow-up evidence](../evals/FOLLOWUP-RESULTS.md) checks a concrete existing schema; no live configuration was written.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **make-a-working-example**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It requires a representative complete path, realistic constraints, explicit essential-versus-incidental details, and execution in the supported environment where possible. Example data is separated from active work. Examples are ordinary assistant behavior, but the runnable reference artifact and transfer check make this more useful than generic illustrative snippets or installation instructions.

**Weakness:** 'Ask whether the example enables an analogous task' may become self-approval rather than evidence. A completed happy path can still omit the decision that causes real user mistakes.

**Suggested improvement:** Choose the representative path from an actual confusion or failure. Where practical, give a fresh solver one small adaptation task; otherwise label transfer as a design intention rather than demonstrated learning.

A proposed test was: Create one runnable example showing how our plugin adds a command, handles invalid input, and returns a result, with only the prerequisites needed to adapt it. Success would mean: The example runs or has explicit unexecuted limits, demonstrates the targeted difficult distinction, and lets a new collaborator identify what to change for an analogous case. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
