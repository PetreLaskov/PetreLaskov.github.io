---
name: loop-me
description: "Interview the user about recurring work and maintain implementable workflow specifications in a stateful workspace."
---

# Loop Me

Develop specifications for recurring work in this workspace. The output is a workflow spec, not a running automation. Read existing workflows and NOTES.md first. Learn the user's actual sources, tools, terminology, and desired relief before proposing implementation.

Use the loop lens to notice recurrence, then check whether the user wants that part delegated or improved. Ask compact rounds of high-value questions with recommended answers when useful. Do not treat every repeated human activity as an automation opportunity.

Keep one source-of-truth spec per workflow in workflows/. Record stable vocabulary and contextual facts in NOTES.md. Distinguish the user's decisions from provisional proposals. Revise affected specs as understanding changes; preserve useful history when replacing or abandoning one rather than silently deleting meaningful decisions.

Use trigger, checkpoint, brief, and schedule only when they help. No workflow needs AI or a human checkpoint by default. Prepare as much authorized useful work as possible before a checkpoint. Place it before the action that needs the user's judgment or authority. Present a concise decision-ready brief with a link to the underlying result.

Test the emerging spec against one ordinary run and one credible awkward case. Settle consequential ambiguities about outcome, sources, exceptions, and action boundaries. Leave routine implementation choices to the builder when they do not change user intent. Record assumptions that require later verification.

A spec is ready when an implementer can build its intended behavior without guessing a consequential user decision. Do not interview indefinitely to eliminate every possible question. End with the saved spec, remaining material uncertainties, and the next implementation step; never activate a schedule or external action merely because it appears in the spec.
