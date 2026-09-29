---
name: instruction-ablation
description: "Test whether an agent instruction improves observable behavior enough to retain, narrow, rewrite, or remove it."
---

# Instruction Ablation

Use when a steering rule, skill passage, or recurring instruction may be redundant, overbroad, or ineffective. Select one instruction and state the specific behavior it is intended to change. Do not evaluate an entire prompt bundle at once unless the user explicitly asks for that larger experiment.

Design a small paired comparison: the same realistic task and artifacts with the instruction present and absent. Include a positive case where the rule should matter and a nearby case where it may impose unnecessary work. Freeze observable criteria before reading outcomes. Judge decisions, artifacts, errors, and relevant effort rather than echoed wording.

Before running, inspect and record each effective treatment context. Verify that the chosen instruction and equivalent rules are absent from the absent condition, including inherited instructions, other skills, and the task itself. Do not remove higher-priority requirements. If true absence cannot be achieved or verified, call the comparison an incremental wording experiment and restrict its conclusion accordingly.

Run conditions in separate fresh contexts when available, with equal task information and side-effect permissions. Keep the workspace isolated. If independent contexts or repeated samples are unavailable, label the comparison exploratory and do not claim causal certainty.

Inspect actual outputs. Identify whether the instruction changed the intended behavior, shifted a different behavior, or had no visible effect. Look for costs such as unnecessary questions, scope expansion, or brittle routing. Do not infer universal value or uselessness from one sample.

Recommend retain, narrow, rewrite, or remove, citing the observed contrast and its limitations. Change only the tested instruction when implementation is authorized. Preserve the experiment artifacts so a later task can challenge the conclusion. Stop when the evidence supports a bounded decision; do not accumulate rules to explain away every failure.
