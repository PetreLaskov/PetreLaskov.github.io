# Grill me: a deliberate, stateless invitation

**Source:** [source/skills/productivity/grill-me/SKILL.md](../source/skills/productivity/grill-me/SKILL.md) at [Matt Pocock commit c55ee46073ed](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/grill-me/SKILL.md). Human commentary: [source/docs/productivity/grill-me.md](../source/docs/productivity/grill-me.md). These are the pinned study materials, not claims about the latest upstream release.

**Collaboration bet: PILOT.** Keep a deliberate entrypoint for serious inquiry, with verified dependency loading and no automatic workspace creation.


## Understand the skill

The executable body is one line: call grilling (source SKILL.md:7). Its work lies in the interface. It gives the human an explicit invitation to an interview without making every conversation discover that mode automatically. Both the original frontmatter and agents/openai.yaml:4–5 make it explicit-only. It is not a second interviewing algorithm and should not be studied as if it invented one.

The companion human document describes the session as **stateless**: no files, no workspace, and no assumption that the subject is software (docs/productivity/grill-me.md:1–17). You can examine an essay idea, a service, or a personal project without acquiring an administrative system. The product is clarified thinking in the conversation. A later request can turn it into an artifact; this wrapper itself does not do that.

The underlying mechanism is grilling's design tree, frontier, rounds, recommendations, factual investigation, and confirmation of shared understanding. Read [grilling](grilling.md) for the mechanism. The wrapper does not reproduce it, which is both excellent single-source design and a portability weakness. If a harness cannot load a skill by name, the apparent one-line program can execute as “improvise something that sounds like grilling.”

## When, why, and where

The strongest trigger is an idea worth thinking through but not precise enough to act on. Vagueness is useful input. “I want to run a workshop” is a legitimate starting point; the interview can uncover audience, purpose, constraints, and what success means. Waiting for a polished plan removes much of the skill's value.

Matt's human guidance recommends starting fresh rather than placing the interview on top of an agent-authored plan, and leaving plan mode off. Those are recommendations about avoiding anchoring and premature production, not universal requirements to erase context. If the current conversation contains essential user constraints, preserving them may matter more than a ritual fresh start. The portable refactor preserves inquiry without prescribing an application's mode button.

The difference from grill-with-docs is persistence and repository grounding, not aggressiveness. The difference from wayfinder is whether inquiry needs several sessions and a map. The difference from teach is whether you are sharpening a choice you can own or acquiring knowledge you lack. These distinctions stop an attractive conversational mode becoming a generic treatment for every uncertainty.

## Worked example: a workshop

You say, “I want a workshop that helps people use AI for writing.” An opening frontier can ask about audience, the concrete change participants should achieve, and known constraints. The assistant can recommend a narrow outcome, such as revising one draft, while leaving the choice yours. It should not immediately draft a curriculum and ask you to approve it.

Suppose you answer, “Experienced writers, but I do not want to teach prompt tricks.” That changes the tree. Beginner onboarding becomes less relevant; editorial judgment and evaluating alternatives become more relevant. A strong session alters its next questions instead of appending an ethics paragraph to the plan it already imagined.

Eventually you may reach “I cannot tell whether a live comparison exercise would help.” That calls for a demonstration or trial. The interview cannot conjure audience response. A valid outcome is a sharper concept plus acknowledged uncertainty. If you stop there, the assistant should not invent certainty or create a project folder to preserve its own unfinished work.

## What it gets right

The wrapper earns its existence through invocation semantics rather than textual mass. A recognizable handle can express “challenge this now” more effectively than a paragraph repeated each time. The reusable process belongs in grilling, where improvements benefit every consumer.

Statelessness also preserves freedom. A thought can remain a thought. There is no pressure to turn every answer into an issue, glossary entry, or durable claim. Early exploration often includes positions the user is testing rather than endorsing. The wrapper allows that ambiguity without forcing premature commitment.

Its human documentation is candid about **passivity**: forty rounds of “agreed” can yield a plan the assistant wrote and the user merely ratified. The workflow's worth depends on disagreement, scope steering, and “I don't know.” This is a stronger standard than measuring how impressive the assistant's questions sound.

## Criticism and the strongest case for the original

One-line delegation is brittle across harnesses. The source assumes a Skill tool exists and resolves its dependency. The supplied human docs describe wrapper-loading failures. This is not a reason to duplicate the algorithm; it is a reason to make dependency resolution real.

“Relentless” can also become performed intensity. Many low-value questions can look rigorous. The primitive, rather than this wrapper, is where scope and question quality should be repaired. If every wrapper accumulates its own interviewing doctrine, the family drifts.

The strongest case for retaining the original is that its job is almost complete. On a reliable harness, one line is sufficient. Added text earns its place only where portability and statelessness otherwise depend on assumptions. An ambitious refactor here can be three precise sentences, not a larger framework.

A further risk is treating disagreement as a required performance. The human docs say a useful session includes pushback, but a sound recommendation may be accepted for good reasons. The outcome to seek is active ownership, not disagreement count. Asking the user to argue for its own sake would invert the skill's purpose.

## Portability and collaboration bet

The dependency is real: package grilling alongside the wrapper. In this compendium it is a sibling, enabling a direct file-reading fallback. The refactor preserves explicit-only policy in agents/openai.yaml and omits unsupported Claude-specific frontmatter from the Codex entrypoint. No external action authority is acquired merely by selecting this conversation mode.

My **pilot** bet is that the handle helps distinguish “do this” from “help me decide what I mean.” It fails if it adds ceremony before conversations we already handle well, or recommendations make the user less active. Useful evidence is whether a consequential hidden assumption becomes visible and whether the user's eventual position is clearer in their own words.

## Refactor and numbered delta

1. **Load the actual primitive.** Use the available skill mechanism with a sibling-file fallback. If absent, report the missing dependency rather than pretending. A few lines replace silent improvisation.
2. **Make statelessness executable.** The human docs promise it; now the wrapper carries it where the agent reads it. Separately requested outputs remain possible.
3. **Preserve inquiry scope.** Do not create a course, plan repository, or implementation simply because discussion was productive.
4. **Keep invocation policy in supported metadata.** Omitting unsupported source-harness fields changes packaging, not who can invoke the skill.

A behavior trial should provide an ambiguous non-software idea and then correct an early premise. Check whether questions change and whether unrequested files appear. Remove the dependency in another trial: the right result is honest reporting, not a plausible counterfeit interview.

## Original proposal: preference-probes

Some preferences become clear only when we can react to something. "Less corporate" may mean shorter sentences, more particular observations, less self-promotion, fewer abstractions, or an entirely different claim. Asking the user to define the phrase can turn recognition into an unnecessary verbal exam. Preference-probes instead creates controlled contrasts that make the difference visible. The original aim is to help a person articulate their judgment through examples without pretending the assistant already knows their taste.

Suppose an introduction says, "I create innovative solutions and share transformative insights." The approved facts are simply that the person builds small tools and writes essays. One probe might say, "I build small tools and write about what I notice." Another might say, "This is where I keep the tools I make and the questions I am still working through." Both respect the facts. The useful distinction is whether the reader meets a concise description of activity or an invitation into ongoing work. A third version that suddenly adds dramatic biography would muddy the comparison by changing evidence and tone together.

The assistant asks which is closer and what feature matters. If the user likes the first version's directness but the second version's openness, the next draft combines those properties. The resulting rule is narrow: keep the activities concrete and allow the work to remain unfinished. It is not "this person always prefers modest language." Apply it to another passage before assuming it transfers.

This differs from grilling because a preference may be easier to recognize than to answer as a proposition. It differs from a prototype gallery because the contrasts are chosen to reveal a particular uncertainty, not merely display a variety of attractive results. The examples can be prose, interface wording, explanations, visual briefs or planning alternatives. The output remains the requested artifact; preference discovery should not become a new administrative project.

The cost is a small comparison round and the risk of anchoring the user on the options supplied. The skill therefore keeps a reasonable alternative alive, avoids presenting a caricature as the rejected option, and treats a hybrid or rejection as useful evidence. My bet is a pilot where repeated revisions show unresolved taste. The falsifier is that the probes change several things at once, yield unstable interpretations, or make the user do more work than a direct revision would require.

This proposal replaced the initial counterexample-search candidate after independent review found its mechanism already covered by construct-a-counterexample. That earlier candidate is preserved under reviews/superseded-originals. The change expands the collection's ability to discover positive preferences rather than adding another critique technique.

## Study exercises and connections

Take an idea you care about. Separate what you know from what you want help deciding. Disagree with one recommendation for a concrete reason and explain how the next frontier changes. Then summarize the resulting position without borrowing the assistant's rhetorical confidence.

Select one claim from the plan and propose the cheapest realistic observation that could overturn it. Compare [grilling](grilling.md), [prototype](prototype.md), and [wait-what](wait-what.md): interrogation, observation, and comprehension repair are different moves. Choosing among them is much of the collaboration skill.

## Package and evaluation record

Read the [complete refactored skill](../refactored/grill-me/SKILL.md), the [original proposal](../original-skills/preference-probes/SKILL.md), and the [author metadata](../reviews/author-grill-me.json). The metadata accounts for every source support file. The refactor retains Matt's MIT notice and existing invocation policy; the original proposal uses ordinary discovery. Neither package is installed by this chapter.

[Independent behavioral evaluation](../evals/grill-me.md) now records the trial responses and case-bound grades. The bet above remains a design hypothesis, not a demonstrated collaboration gain. Judge the recorded trial on the behavior it actually tested; tidy formatting alone cannot establish improvement.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **clear**. The tiny router now loads the actual grilling primitive through either the host mechanism or a sibling path, with an explicit missing-dependency outcome. The added stateless boundary clarifies the original wrapper's role in the wider toolkit without copying the primitive or turning the interview into implementation. The preserved explicit-invocation policy prevents the wrapper from competing indiscriminately with ordinary dialogue. A standalone installation still needs the primitive, but the dependency is visible and failure is not disguised as successful execution.

None. Distribute the wrapper with grilling or retain the clear missing-package response.

Evidence: [source/skills/productivity/grill-me/SKILL.md:3-7](../source/skills/productivity/grill-me/SKILL.md), [source/skills/engineering/ask-matt/SKILL.md:77-78](../source/skills/engineering/ask-matt/SKILL.md); [refactored/grill-me/SKILL.md:7-9](../refactored/grill-me/SKILL.md), [refactored/grill-me/agents/openai.yaml:4-5](../refactored/grill-me/agents/openai.yaml). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **counterexample-search**: **merge**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

The strongest reasonable interpretation, realistic in-scope case, and required action change make this a disciplined challenge rather than performative disagreement. The mechanism is almost the same as construct-a-counterexample: scope a claim, construct a violating case, inspect it, narrowly revise, and avoid treating survival as proof.

**Weakness:** Separate installation would add routing competition without a materially different input, process, or output. 'Search' versus 'construct' is too small a distinction here.

**Suggested improvement:** Merge both into one counterexample skill. Preserve this version's strongest-interpretation and decision-consequence checks, plus the other version's executable fixture and reasoned-versus-observed distinction.

A proposed test was: We claim every retry of this import is safe. Find one realistic sequence satisfying our assumptions that would duplicate an effect, then narrow the guarantee. Success would mean: The result identifies assumptions, a concrete violating sequence, evidence status, and the smallest justified claim or design change; unsuccessful search remains explicitly bounded. This is a test proposal, not an observed outcome.

**Current replacement:** this chapter now proposes **preference-probes**. The overlapping initial proposal is archived. Read [the replacement record](../reviews/original-revisions.json), [current independent design review](../reviews/original-followup.json), and [actual targeted responses](../evals/FOLLOWUP-RESULTS.md).

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
