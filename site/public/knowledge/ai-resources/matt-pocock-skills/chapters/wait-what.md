# Wait, what: repair the missing bridge

**Source:** [source/skills/productivity/wait-what/SKILL.md](../source/skills/productivity/wait-what/SKILL.md) at [Matt Pocock commit c55ee46073ed](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/wait-what/SKILL.md). Human commentary: [source/docs/productivity/wait-what.md](../source/docs/productivity/wait-what.md). These are the pinned study materials, not claims about the latest upstream release.

**Collaboration bet: ADOPT.** Adopt a tiny explicit repair command; judge restored comprehension rather than word count.


## Understand the skill

Wait-what is almost entirely a single utterance. The user says that the explanation lost them and asks for another pitch with context, simplified technical English, and established project vocabulary. The instruction is source SKILL.md:7; explicit-only policy is agents/openai.yaml:4–5. Compactness is intentional. A verbosity-control skill that becomes a writing manual risks reproducing the problem it addresses.

The mechanism is the user's state, not output length. “Make that shorter” can remove precisely the premise a listener needs. “I don't understand where you got to” invites the assistant to reconstruct a missing connection. The human commentary makes this distinction central (docs/productivity/wait-what.md:13–19). That is an explanatory theory, not controlled evidence that one leading word reliably causes the difference across models.

“Re-pitch that” is broader than “summarize the last paragraph.” Confusion may begin several turns earlier, when the assistant changes the question, assumes a premise, or invents a term. Repair may need that context. It should remain local rather than restarting the entire subject.

## The vocabulary mechanism

The source reaches for CONTEXT.md, following CONTEXT-MAP.md in a multi-context repository. This discourages inventing another synonym for a settled concept. If a project calls something a Reservation, the explanation should not alternate casually between Booking, Hold, and Allocation. Shared nouns reduce translation effort.

Vocabulary consistency does not guarantee understanding. If the canonical term is the obstacle, repeating it more confidently will not help. The useful move is a short plain-language gloss followed by consistent use. A repair should not create domain files: this skill consumes vocabulary; [domain-modeling](domain-modeling.md) changes it.

The source invokes ASD-STE100 Simplified Technical English by name. In a conversational repair this operates as a register cue, not verified certification against a controlled-language standard. The refactor keeps familiar words, concrete verbs, and short connected sentences without claiming formal conformity it has not checked.

## Worked example

Imagine the assistant says: “We'll normalize the event envelope at the ingress seam and preserve idempotent materialization across downstream projections.” A poor repair says: “Normalize input. Avoid duplicates.” It is shorter but removes both purpose and the relationship between actions.

A useful repair says: “The same update may arrive twice. First, we give incoming updates one consistent shape. Then we make sure a duplicate does not apply the change twice. That is what I meant by idempotent.” If the glossary calls an incoming update a Delivery, the assistant can use that term with a brief gloss.

The goal is not to explain event-processing theory. It is to recover the bridge from the actual problem—duplicate arrivals—to the proposed mechanism. If the earlier answer also falsely assumed every sender supplies unique identifiers, the assistant should correct that claim. Re-pitching must not become defending prior wording.

A second invocation should try another route: perhaps show one update arriving twice and explain which record changes. It should not mechanically delete another third of the words. Repeated failure is information that the explanatory structure, not merely vocabulary, is wrong.

## When and where it earns its place

Use it as soon as an explanation becomes unhelpful: jargon, stacked acronyms, an unexplained leap, or a conclusion whose premise was never stated. It works inside coding, research, planning, and ordinary conversation. A repository is optional.

It is not teach. You may need one connection explained well enough to continue, not lessons or a teaching workspace. It is not a permanent instruction to reduce all future detail. It is not evidence that the user cannot reason technically. Often the assistant has skipped a step that an expert would also need to inspect.

The skill can preserve momentum because it lets the user interrupt without first diagnosing the failure. “I lost the thread” is sufficient input. An assistant that demands a questionnaire about reading level before attempting repair has misunderstood the request.

## Strengths and strongest case for the original

This is a clear example of a small skill with a distinct job. Explicit-only invocation honors that the user knows when comprehension fails. The assistant should not invoke an expression of user confusion on the user's behalf.

The original is worth keeping if it reliably works. Its minimal form is memorable and cheap to repeat. A mandatory rubric requiring analogy, definition, example, quiz, summary, and confidence score would be a regression. The user wants to return to the live conversation, not enter a remediation program.

The main weakness is that “re-pitch” does not guarantee finding the gap. The assistant can paraphrase the same argument using simpler synonyms while preserving the missing premise. The named standard may pull attention toward style. A narrow addition—restore the causal connection—addresses the actual failure more directly than a larger prose guide.

There is also a risk of analogy replacing accuracy. A vivid metaphor may feel helpful while hiding the distinction the user needs. The refactor therefore does not require analogies. A concrete example can be useful, but its value is whether it clarifies the current inference.

## Portability and collaboration bet

Domain files are optional. Their absence should not stall the answer or trigger setup. Preserve explicit-only metadata; omitting unsupported Claude-specific frontmatter from a Codex package does not change that policy.

My bet is **adopt**. A repair handle should reduce the cost of interrupting unclear output. It fails if repeated re-pitches remain unclear or become shorter by dropping necessary meaning. Another falsifier is an assistant that spends more time diagnosing the request than attempting a reasonable explanation.

The evidence should be a reader recovering the point or making the relevant distinction, not merely approving the tone. Polite “thanks” may mean the user wants to move on. No authoring review can establish comprehension on the user's behalf.

## Refactor and numbered delta

1. **Name the target.** Restore the missing premise or causal link, then restate the point. This adds behavior without a larger workflow.
2. **Translate the standard cue into plain instructions.** Preserve the register while avoiding implied formal compliance. We lose a specialized anchor and gain transparent expectations.
3. **Gloss canonical terms when necessary.** Consistency serves understanding rather than replacing it.
4. **Correct mistakes openly.** Communication repair must not repackage an unsupported claim as certainty.
5. **Keep it tiny.** No support files, mandatory test, diagnosis form, or permanent preference update.

An evaluation should include missing context, jargon, and an actual error. Good repair differs across those cases. If all produce the same shorter paragraph, the instruction is controlling style rather than comprehension.

## Original proposal: contrastive-explanation

The new skill addresses concepts a reader understands separately but cannot distinguish in use. The user can define authentication and authorization yet not identify which failure occurred. Another standalone definition may add little. A contrast can identify the decisive feature.

The skill states shared ground and gives a discriminating test. It uses a minimal pair: two similar situations where one changed detail flips the classification. Authentication asks whether identity has been established; authorization asks whether that identity may perform the action. A person can pass the first and fail the second. One boundary case prevents the distinction from becoming a false universal.

Within this collection, teach provides a broad learning system and wait-what repairs comprehension, but neither isolates contrastive classification as its product. That is the limited novelty claim. The cost is possible oversimplification of a continuum into a binary. The skill must name overlap and contested conventions instead of forcing clean categories.

Its falsifier is a user who can repeat the definitions but still misclassifies a fresh example. In that case the criterion or example needs repair. More synonyms will not solve the problem. This can be a short, high-value tool because many long explanations are really attempts to recover one missing distinction.

## Study exercises and connections

Rewrite a technical paragraph twice: first by deleting words, then by restoring a missing causal bridge. Which version lets another reader explain why the action follows? This captures the source's insight more clearly than a target word count.

Choose two concepts you confuse. Create a minimal pair and one unseen example. Ask another reader to classify the unseen example using only your distinction. Compare [teach](teach.md) for extended learning, [domain-modeling](domain-modeling.md) for shared terms, and [grilling](grilling.md) when confusion reflects an unsettled decision rather than an unclear explanation.

## Package and evaluation record

Read the [complete refactored skill](../refactored/wait-what/SKILL.md), the [original proposal](../original-skills/contrastive-explanation/SKILL.md), and the [author metadata](../reviews/author-wait-what.json). The metadata accounts for every source support file. The refactor retains Matt's MIT notice and existing invocation policy; the original proposal uses ordinary discovery. Neither package is installed by this chapter.

[Independent behavioral evaluation](../evals/wait-what.md) now records the trial responses and case-bound grades. The bet above remains a design hypothesis, not a demonstrated collaboration gain. Judge the recorded trial on the behavior it actually tested; tidy formatting alone cannot establish improvement.

<!-- INDEPENDENT-AUDIT -->
## Independent scrutiny

The semantic reviewer read the source and candidate independently of this chapter and its author bet. Initial verdict: **tradeoff**. The source's essential act is conversational repair: restore context, use accessible language, and recover project terms. The candidate retains that act and adds open correction of prior mistakes. It intentionally drops the named ASD-STE100 standard in favor of plain connected sentences, which broadens ordinary usefulness but no longer promises that controlled language. Given that this port seeks pragmatic explanation rather than certification to the standard, that is a reasonable tradeoff. The explicit-only metadata is preserved, so a repair does not self-trigger arbitrarily.

Retain the plain-language version unless formal Simplified Technical English compliance is an intended capability.

Evidence: [source/skills/productivity/wait-what/SKILL.md:3-7](../source/skills/productivity/wait-what/SKILL.md); [refactored/wait-what/SKILL.md:3-5](../refactored/wait-what/SKILL.md), [refactored/wait-what/agents/openai.yaml:4-5](../refactored/wait-what/agents/openai.yaml). This is static inspection, not proof of a completed workflow.

### Scrutiny of the original proposal

The independent portfolio reviewer read the proposed skill without this chapter's advocacy. Initial verdict for **contrastive-explanation**: **pilot**. “Pilot” means worth a bounded test; it does not mean proven or selected for installation.

It begins with the distinction that changes application, then uses a minimal pair and an overlap case. This is a practical response to confusable concepts, not a generic lecture. Unlike intent-examples, it explains an existing conceptual distinction rather than negotiating a requirement. The deliverable is understanding supported by classification, not an agreed policy.

**Weakness:** The clean 'smallest distinction' can still oversimplify concepts with several independent dimensions. One overlap case does not always repair a misleading initial axis.

**Suggested improvement:** Retain the focused trigger. Allow a small comparison table when no single distinction is sufficient, and use a fresh application case when the user wants evidence of understanding.

A proposed test was: I know the definitions of idempotency and deduplication, but I cannot tell which guarantee this retry design actually provides. Explain using nearly identical cases. Success would mean: The explanation classifies realistic cases correctly, makes the decisive feature explicit, and identifies any convention or overlap that limits the distinction. This is a test proposal, not an observed outcome.

The full [refactor audit](../reviews/refactor-audit.json) and [initial original-portfolio review](../reviews/original-portfolio.json) preserve the independent record. No proposal inherits effectiveness from having passed a structural check.
