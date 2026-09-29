---
name: reviewer-rehearsal
description: "Test whether a proposed PR explanation gives a fresh reviewer the right mental model and directs attention to the consequential behavior."
---

# Reviewer Rehearsal

Use on a complex PR whose explanation may conceal ambiguity or misdirect review. Give an independent reader the proposed PR body and the relevant diff or artifact. Do not reveal expected answers, suspected defects, or the author's preferred interpretation.

Ask the reader to state the changed behavior, the strongest evidence claim, the first code path they would inspect, and the most consequential merge concern. Require them to distinguish what the body claims from what the diff establishes. This is a comprehension task, not a request to approve the PR.

Compare that reconstruction with the actual requirement and implementation. Look for false models, such as describing ignored responses as canceled requests, or implying data migration rollback is automatic. Find the sentence or omitted fact that caused the mismatch.

Repair the smallest part of the explanation that changes review behavior: a clearer trigger, a labeled illustration, a narrower evidence claim, a pointer to the relevant path, or a concrete rollback limitation. Do not lengthen the body merely to answer every possible question.

If fresh delegation is unavailable, perform the exercise as a self-review and explicitly label it weaker. Do not represent a simulated reader as human feedback. Report the material misunderstanding and correction, or say that no consequential mismatch appeared in this rehearsal. Leave actual code review and merge decisions to their appropriate workflows.
