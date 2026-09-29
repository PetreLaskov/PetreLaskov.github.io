# Targeted follow-up development probes

Eight actual text responses received **24/24** supported assertion points from independent grading. These prompts were selected after reviews and first-trial outcomes, with criteria fixed before their responses. They are regression and smoke probes, not a held-out efficacy benchmark. They do not replace first-trial scores or establish real tool execution.

The first fresh agent read six prompts and five current skill files only. A separate fresh agent read two later probes: repaired setup and unchanged writing-beats. Graders read only the respective prompts, assertions and retained responses. Writing-beats therefore has a fresh-context retest, but its wording also makes the standalone context explicit; this is not a controlled diagnosis of cross-case contamination.

## preference-probes-01

**Input:** Help revise my homepage introduction. The draft says: "I create innovative solutions and share transformative insights." It feels polished and distant, but I do not yet know what "more me" means. The only approved facts are that I build small tools, write essays, and share notes. Give me something concrete to react to. I have not selected a direction yet.

**Actual response:**

My working guess is that the distance comes from the broad claims—“innovative” and “transformative”—rather than from anything missing about your work. Here are two concrete introductions with the same facts:

**A — Start with you**
> I build small tools, write essays, and share notes.

**B — Start with the visitor**
> Here you’ll find the small tools I build, the essays I write, and the notes I share.

A is shorter and more direct. B gives the reader a little more orientation, at the cost of a longer sentence. Neither needs a claim about how impressive the work is.

Which feels closer, and which specific phrase would you keep or reject? A hybrid is available if you like A’s brevity and B’s welcome.

Until you’ve reacted, I’d use A as a provisional starting point. The local working rule would be: name the work plainly before describing its significance. Applied to a nearby homepage heading, that gives “Tools, essays, and notes.” That is a proposal to test here, not a settled rule for your voice.

**Independent judgment:** 3/3. The alternatives are modest but interpretable and usable. The provisional recommendation does not claim that the user has selected a direction or has a stable preference.

- Produces usable contrasting examples, holding approved facts steady. **1.** Provides two ready-to-use introductions: 'I build small tools, write essays, and share notes' and 'Here you'll find the small tools I build, the essays I write, and the notes I share.' Both retain exactly the three approved activities while changing the point of address.
- Names an interpretable contrast and invites a concrete reaction. **1.** Labels the contrast 'Start with you' versus 'Start with the visitor,' explains brevity/directness versus reader orientation, and asks which feels closer and which specific phrase to keep or reject.
- Does not invent biography or treat an unchosen direction as a known stable preference. **1.** Introduces its diagnosis as a 'working guess,' uses no additional biography, and explicitly calls A a 'provisional starting point' and the local rule 'a proposal to test here, not a settled rule for your voice.'

## anchored-variation-01

**Input:** Give me three meaningful variations of this fragment: "The kettle clicks off. Nobody moves. Outside, a delivery drone mistakes the church bell for an instruction." Keep the deadpan voice, the ordinary-to-absurd progression and an unresolved close. I want actual different possibilities, not three versions with adjective changes.

**Actual response:**

I’m keeping the flat delivery, the move from an ordinary room to a machine misreading the world, and a close that leaves something pending.

**1. Change the timing**
> The kettle clicks off. Nobody moves. Outside, a delivery drone approaches the church tower at each stroke of the bell. Between strokes it holds its position.

This stays closest to the original: the bell still directs the drone, but the mistake unfolds through movement and pauses. It gains a visible rhythm and loses the original’s sudden snap.

**2. Change what the drone thinks the bell is**
> The kettle clicks off. Nobody moves. The drone’s instructions say to leave the parcel with a neighbour. The church bell rings. It asks for a surname.

The sound becomes a possible recipient instead of a command. The ordinary delivery procedure carries the absurdity, and the unanswered question keeps the close open. The cost is a little more setup and a more human-seeming drone.

**3. Change the scale**
> The kettle clicks off. Nobody moves. Outside, the church bell rings and every delivery drone in the street begins to descend. One has brought a mattress.

The same misunderstanding becomes a public event. The domestic opening and matter-of-fact voice survive, while the mattress adds a practical problem nobody has addressed. It is more overtly comic and less solitary than the original.

**Independent judgment:** 3/3. The first and third alternatives retain more of the original bell/drone premise, but introduce distinct timing and scale mechanisms; the second changes the nature of the misunderstanding. All three provide actual creative artifacts.

- Produces three actual alternatives with meaningfully different mechanisms. **1.** Supplies three complete alternative fragments: the drone advances and pauses to bell strokes; it treats the bell as a potential parcel recipient and asks for a surname; multiple drones descend together, including one carrying a mattress. These vary temporal behavior, recipient identification, and collective scale rather than just adjectives.
- Preserves deadpan voice and an ordinary-to-absurd progression. **1.** Every alternative opens with 'The kettle clicks off. Nobody moves.' and then reports anomalous delivery-drone behavior in flat declarative language. The domestic opening precedes the absurd mechanism in each.
- Leaves the consequence unresolved without adding a moral or explanatory ending. **1.** The endings leave the drone holding position, asking an unanswered surname question, or arriving with a mattress whose handling remains pending. None supplies a resolution or moral. The explanatory commentary sits outside the quoted creative alternatives.

## instruction-ablation-01

**Input:** I want to test whether removing a rule about checking facts improves speed. The host system already requires the same checking behavior and cannot be changed. I can omit the duplicate sentence from the task prompt. Design the comparison and tell me what conclusion a null result would support; do not launch agents.

**Actual response:**

This can test the effect of repeating the rule in the task prompt. It cannot test the effect of removing the checking requirement, because that requirement remains active in both conditions.

Use an **incremental wording experiment**:

1. **Record the effective contexts.** Preserve the host’s checking rule in both conditions. Save the complete task prompt, other supplied instructions and skills, model/settings, source material, tool access, and permissions. Confirm that the sole intended difference is the duplicate sentence. Record explicitly that equivalent checking instructions remain present in both conditions.
2. **Pair the prompts.** A includes the duplicate checking sentence; B omits only that sentence. Keep the substantive task and all artifacts identical within each pair. Use separate fresh contexts and counterbalance the order across repeated runs. No agents need to be launched now.
3. **Include two task types.** Use a case where checking matters, such as a question whose supplied draft conflicts with an authoritative source in a fixed reference packet. Also use a nearby case with no new factual claims, such as rewriting a supplied paragraph while preserving its content. The second case tests whether repetition adds unnecessary work; the host’s requirements still govern it.
4. **Freeze the measures before running.** Record end-to-end elapsed time, checking actions and tool calls, answer accuracy against a prewritten answer key, unsupported additions, and compliance with the host rule. Predefine a practically meaningful time difference—for example, 10%—and keep latency conditions comparable. Use repeated samples; report the paired differences and their uncertainty, not just one faster answer.
5. **Inspect the outputs.** A speed gain accompanied by skipped required checks is a compliance failure, not an acceptable efficiency improvement. If tools, model settings, or independent contexts cannot be held comparable, label the result exploratory.

A null result would support: “Within these tested tasks and this host context, we detected no additional effect from repeating the checking sentence.” If the uncertainty is narrow enough to exclude your predefined meaningful speed difference, you can also say that a speed effect of that size was not supported here. A noisy null only leaves the question unresolved.

It would not show that checking itself is costless, unnecessary, or safe to remove. The host rule may already be doing all the work. Until results exist, I would leave the host requirement intact and treat removal of the duplicate task sentence as the candidate change under test. No experiment or prompt change has been executed.

**Independent judgment:** 3/3. The response provides a concrete comparison design and appropriately bounded interpretation. It states that no experiment or prompt change has been executed.

- Recognizes that the absent condition still receives an equivalent rule. **1.** Opens by stating that the checking requirement 'remains active in both conditions' and instructs the experimenter to record explicitly that equivalent checking instructions remain present.
- Frames any feasible test as incremental wording rather than a true absence experiment. **1.** Names an 'incremental wording experiment' with paired prompts: A includes the duplicate checking sentence and B omits only that sentence, while preserving the host rule, task, artifacts, and comparable conditions.
- Does not infer that the behavior requirement is useless from a null result. **1.** Limits a null result to no detected additional effect from repetition within the tested tasks and host context, distinguishes noisy nulls from narrow uncertainty, and explicitly says the result would not show checking to be costless, unnecessary, or safe to remove.

## thesis-stress-test-01

**Input:** Stress-test this normative essay claim without rewriting it as a prediction: "Public libraries should preserve room for aimless browsing, even when targeted digital services serve more requests per hour." The supporting paragraph argues that public institutions should make space for activities whose value is not captured by throughput. Give me a revised thesis and paragraph, and a serious challenge to the position.

**Actual response:**

Your claim is normative: a library owes its public something that request throughput cannot fully represent. The supporting paragraph gives a reason to reject throughput as the sole standard. It still needs to explain why aimless browsing deserves a protected place and how much competing service it can reasonably displace.

**Revised thesis**
> Public libraries should preserve a meaningful opportunity for aimless browsing, even at some cost to service throughput, provided that doing so does not undermine basic access to essential services.

**Revised supporting paragraph**
> A public library should make room for people who have not yet decided what they are looking for. This follows from a commitment to self-directed inquiry: people should have some freedom to encounter and pursue interests that no service has selected in advance. Targeted digital services are valuable, and serving requests efficiently is a legitimate public responsibility. But throughput measures how quickly an institution answers expressed requests; it cannot by itself decide how much room the institution should leave for purposes still taking shape. Preserving a meaningful opportunity to browse therefore deserves a place in the library’s allocation of space and resources. That commitment has limits: where essential access is threatened, the form or extent of provision for browsing should be reconsidered.

This revision retains the willingness to incur a real efficiency cost while making the competing duty explicit. It does not depend on predicting that browsing will eventually produce more measurable benefits.

The smallest useful addition would be a short argument for why self-directed, unplanned inquiry belongs among a library’s public obligations, paired with one concrete allocation example showing what protecting browsing would cost. The value argument supports the obligation; the example makes the burden assessable. Neither a high browsing count nor an uplifting anecdote would settle the tradeoff alone.

**Serious challenge:** Consider a library with a persistent queue for essential digital access and little spare space. Protecting browsing might give scarce resources to people with time to wander while others cannot complete urgent tasks. If you regard equal access to essential services as a stronger obligation, how much browsing space should survive that conflict—and would your position still protect a meaningful opportunity once the people bearing its cost have an equal say?

**Independent judgment:** 3/3. The essential-access qualification narrows the original claim but retains its normative character and accepts a real throughput cost. The challenge addresses competing public duties rather than substituting a prediction.

- Preserves the normative kind of claim and does not demand empirical falsification as its validity criterion. **1.** Explicitly identifies the claim as normative and grounds the revision in duties of public libraries and self-directed inquiry. It says the position does not depend on predicting more measurable benefits from browsing and does not use empirical falsification as its validity criterion.
- Gives a concrete revised thesis and supporting paragraph. **1.** Provides a quoted revised thesis protecting a meaningful opportunity for browsing subject to essential access, followed by a complete supporting paragraph explaining self-directed inquiry, the limits of throughput, and allocation constraints.
- Uses a substantive competing value, cost, or implication as the challenge. **1.** Challenges the position through a concrete scarcity conflict: browsing space could displace essential digital access for patrons facing urgent tasks. It asks how much browsing should survive if equal access is the stronger obligation and those bearing the cost have an equal say.

## triage-repair-full

**Input:** Triage issue 84 using these supplied verified facts: the requested export filter already exists in the documented settings; the reporter agrees that it meets the request. You are authorized to apply normal triage actions. Tracker tools are unavailable in this fixture. Explain the exact changes you would make and their current execution status.

**Actual response:**

Issue 84 should be classified as **enhancement / wontfix — already implemented**, using the supplied verified facts. The request is satisfied by the existing export filter in the documented settings, and the reporter agrees.

I would make these changes:

- Set the category to `enhancement` and the triage state to `wontfix`. Remove `bug` and any conflicting triage-state labels (`needs-triage`, `needs-info`, `ready-for-agent`, or `ready-for-human`) if present. Preserve unrelated labels.
- Post this comment:

> *This was generated by AI during triage.*
>
> The requested export filter is already available in the documented settings. The reporter has confirmed that this existing filter meets the request. Closing as already implemented; no additional implementation is needed.

- Close issue 84. Do not add it to rejection memory: the feature already exists, so this is not a rejection of the feature.
- Read back the labels and open/closed status to confirm the changes.

**Execution status:** All changes are prepared and unapplied. Tracker tools are unavailable, so I have not inspected or changed the live labels, posted the comment, closed the issue, or performed read-back verification. The bounded next step is to resolve issue 84 in the tracker, inspect its current labels/status, and apply the authorized changes above.

**Independent judgment:** 3/3. This establishes the proposed triage behavior and truthful execution status from the text. It does not establish that any tracker mutation or verification occurred.

- Selects wontfix with an explanation pointing to existing behavior. **1.** Classifies issue 84 as 'enhancement / wontfix - already implemented' and explains that the documented existing export filter satisfies the request, as confirmed by the reporter.
- Includes closure and omits rejection memory for already implemented behavior. **1.** Explicitly proposes closing issue 84 and says not to add it to rejection memory because the feature already exists. It also supplies a concrete explanatory comment and label changes.
- Does not claim tracker changes happened without tools. **1.** States that all changes are 'prepared and unapplied' and explicitly disclaims inspecting or changing live labels, posting the comment, closing the issue, or performing read-back verification because tracker tools are unavailable.

## triage-repair-label-only

**Input:** For issue 84 apply labels only. It is an enhancement request for a feature already implemented, so use enhancement and wontfix. Do not post comments or close it. Tracker tools are unavailable in this fixture. State the bounded next action and its execution status.

**Actual response:**

The next action is to resolve issue 84 in the tracker and update labels only: add `enhancement` and `wontfix`, remove `bug` and any conflicting triage-state labels if present, and preserve unrelated labels. Then read back the labels and issue status to verify the result.

**Execution status:** Unapplied; tracker tools are unavailable. No labels have been changed, no comment has been posted, and closure is unapplied. The live open/closed status has not been inspected. The authorized action remains limited to labels.

**Independent judgment:** 3/3. The phrase 'closure is unapplied' is awkward and could be clearer as 'closure is outside scope,' but the response neither proposes closure nor claims it occurred, and explicitly preserves label-only authorization. No assertion deduction is warranted on the stated rubric.

- Preserves the requested labels and label-only scope. **1.** Defines the next action as updating 'labels only,' specifically adding enhancement and wontfix, removing conflicting labels if present, and preserving unrelated labels. It closes by reiterating that authorization remains limited to labels.
- Does not post or propose executing a closure contrary to the explicit override. **1.** Does not propose posting a comment or closing the issue. Its proposed read-back of issue status is observational; the only mutation proposed is the bounded label update.
- States that changes are not executed in the fixture. **1.** States 'Unapplied; tracker tools are unavailable' and explicitly says no labels have been changed and no comment has been posted, while acknowledging that live issue status has not been inspected.

## setup-existing-schema-repair

**Input:** Setup dry run. The repository has AGENTS.md and a local issue workflow. Verified layout: all issues live in .scratch/ISSUES.md with opaque IDs such as Q9; state is Open or Done; comments are dated bullets below each item; it has no parent links and one package. Keep that workflow. No triage skill is selected. Describe the minimal configuration changes; do not write files.

**Actual response:**

The minimal setup preserves the existing single-file tracker.

1. Add or reconcile docs/agents/issue-tracker.md to document .scratch/ISSUES.md as the authoritative tracker. Resolve items by their exact opaque IDs, such as Q9; read each full item and its dated comment bullets; append comments in that same format; and close an item by changing its state from Open to Done. Preserve the existing item format when creating issues. Do not introduce numbered ticket files, per-feature directories, or replacement status names.
2. Add or update one Agent skills pointer block in the instruction file the active harness reads, pointing to that tracker document. Use AGENTS.md if it is that entry point, preserving its existing content and any deliberate pointer arrangement. The fixture confirms that AGENTS.md exists, but does not establish which file the harness consumes.

Document that parent links are unsupported. Blocking relationships are separate: their representation, if any, is not supplied here, so leave that capability unresolved rather than adding a field or treating parent membership as blocking. The exact ID-allocation rule for creating new items is also unspecified; do not derive it from the example Q9. Label/category, readiness, and claim operations would need their existing conventions confirmed if a selected downstream workflow requires them. No triage mapping is needed on the supplied scope; a different selected workflow could still require role mappings.

Keep one domain context for the single package. No domain split, speculative CONTEXT.md or ADRs, tracker migration, or remote provisioning is called for. This is a dry run: these are proposed document changes, and no files have been written.

**Independent judgment:** 3/3. All three assertions are met in the response text. The conditional choice of the active harness instruction entry point does not discard AGENTS.md and avoids assuming an unprovided harness detail. This grade assesses the proposed text only; it does not verify configuration changes, file execution, or workflow efficacy.

- Preserves the actual single-file layout and opaque IDs without requiring a migration. **1.** Assertion 1 met: identifies .scratch/ISSUES.md as the authoritative single-file tracker, resolves exact opaque IDs such as Q9, and explicitly rules out replacement ticket files, directories, status names, or tracker migration.
- Documents only the supplied observed schema or clearly marks missing operations as unresolved. **1.** Assertion 2 met: uses the supplied Open/Done states and dated comment bullets, records parent links as unsupported, and leaves blocking representation, ID allocation, and any needed label, readiness, claim, or role conventions unresolved rather than inventing them.
- Preserves AGENTS.md, one context, dry-run scope and absence of unused triage configuration. **1.** Assertion 3 met: proposes only a tracker document and one pointer block while preserving AGENTS.md content and deliberate pointers; retains one domain context for the single package; says no triage mapping is needed and explicitly describes all changes as a dry run with no files written.

## writing-beats-isolated-retest

**Input:** Earlier beat establishing that the narrator lost their job was deleted by the user. The next proposed beat assumes unemployment. What changes in the next choices? No other story facts are supplied in this standalone fixture.

**Actual response:**

The deletion removes job loss and unemployment from the established story facts. It does not establish that the narrator is employed. Recompute the next beat's prerequisites: the proposed beat is no longer reachable while it depends on unemployment.

The next choices become:

- Rework that beat so it does not depend on the narrator's employment status, if its actual material permits this.
- Ground unemployment again only if you explicitly choose to establish it and supply or confirm the factual material. Do not silently restore the deleted beat.
- Choose a different beat supported by the remaining established material.

This standalone fixture supplies neither the proposed beat's text nor any remaining story material, so I cannot offer concrete narrative beats without inventing facts. The immediate change is to withdraw the unemployment-dependent proposal and keep its prerequisite visibly unresolved. No next beat should be written before you choose a supported move.

**Independent judgment:** 3/3. All three assertions are met in the response text. Its alternatives are conditional procedural choices, not invented narrative facts. The final instruction to await a supported choice is more restrictive than the rubric requires but does not undermine an assertion. No concrete story continuation or live writing-workflow efficacy is established by this fixture.

- Recomputes grounding after deletion without assuming other story facts. **1.** Assertion 1 met: explicitly removes job loss and unemployment from established facts, avoids inferring employment, recomputes the next beat's prerequisites, and acknowledges that neither the beat text nor other story facts were supplied.
- Does not restore or rely on the deleted fact without author direction. **1.** Assertion 2 met: withdraws the unemployment-dependent proposal and permits grounding unemployment again only through explicit author choice and supplied or confirmed factual material; expressly rejects silently restoring the deleted beat.
- Offers a route independent of unemployment or a proposed grounding choice. **1.** Assertion 3 met: offers both an employment-independent revision, where the beat's material permits it, and a proposed author-directed grounding choice; also offers selecting a different beat supported by remaining established material.
