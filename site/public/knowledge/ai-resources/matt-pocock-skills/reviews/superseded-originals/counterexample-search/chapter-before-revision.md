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

## Original proposal: counterexample-search

The new skill attacks one load-bearing claim rather than interviewing a whole plan. Given “Our onboarding is simple because it has three screens,” it seeks the strongest realistic case that makes the claim false: a user without a required document, a returning user with ambiguous state, or a flow crossing devices. It aims for a decisive counterexample rather than a balanced list of generic risks.

Within this collection, the distinct stopping condition is a claim revised, a counterexample found, or a bounded search that found none. It applies to explanations, designs, policies, and assumptions without requiring an adversarial persona or long exchange. It states the conditions that make a case relevant so that an exotic exception cannot masquerade as a refutation.

Its cost is focused challenge. Applied to every sentence it would exhaust attention; applied to the central premise it can be efficient. Its falsifier is repeatedly generating cases the claim already excludes or objections that change no decision. The output should make the claim more exact even when it survives.

## Study exercises and connections

Take an idea you care about. Separate what you know from what you want help deciding. Disagree with one recommendation for a concrete reason and explain how the next frontier changes. Then summarize the resulting position without borrowing the assistant's rhetorical confidence.

Select one claim from the plan and propose the cheapest realistic observation that could overturn it. Compare [grilling](grilling.md), [prototype](prototype.md), and [wait-what](wait-what.md): interrogation, observation, and comprehension repair are different moves. Choosing among them is much of the collaboration skill.

## Package and evaluation record

Read the [complete refactored skill](../refactored/grill-me/SKILL.md), the [original proposal](../original-skills/counterexample-search/SKILL.md), and the [author metadata](../reviews/author-grill-me.json). The metadata accounts for every source support file. The refactor retains Matt's MIT notice and existing invocation policy; the original proposal uses ordinary discovery. Neither package is installed by this chapter.

[Independent behavioral evaluation](../evals/grill-me.md) was **pending at authoring**. The bet above is a hypothesis, not an observed score. Judge the eventual trial on decisions, outputs, and failure recovery; tidy formatting alone cannot establish improvement.
