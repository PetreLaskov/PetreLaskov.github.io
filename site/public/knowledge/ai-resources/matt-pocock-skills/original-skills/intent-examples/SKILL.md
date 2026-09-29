---
name: intent-examples
description: Clarify a requirement by producing small examples and counterexamples that distinguish satisfying the user's intent from plausible but wrong outcomes.
---
# Intent examples

Identify the requirement and intended outcome. Preserve the user's exact constraints before translating them into cases.

Construct a normal example, a boundary example, and a plausible counterexample only where each reveals something different. State input or situation, expected outcome, and the reason tied to the requirement.

Look for reasonable implementations that would pass the prose but disagree on a case. If the case exposes an unsettled decision, name it; do not invent the answer.

Return the smallest useful set of examples and any revised wording the user has authorized. Keep proposal and agreement distinct. Examples may become tests later, but do not require code or a test framework to clarify intent.

Stop when the important ambiguity is resolved. More examples that repeat the same boundary add little.
