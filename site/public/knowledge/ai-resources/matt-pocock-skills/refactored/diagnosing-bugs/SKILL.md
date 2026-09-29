---
name: diagnosing-bugs
description: Diagnose a hard or intermittent defect or measured performance regression using an exact-symptom feedback loop. Use for sustained debugging, not a simple request to explain an error.
---

# Diagnosing Bugs

The product is a causal explanation and fix supported by a loop that catches the user's actual symptom.

Read relevant project vocabulary and decisions. Reuse existing reproduction evidence after checking its environment and symptom. Redact secrets before showing commands/output; keep credentials in environment variables and show only signal-bearing artifact excerpts.

## 1. Build the signal

Find one runnable command that reaches the real bug path and asserts the exact symptom. Try a test, HTTP/CLI request, browser check, captured replay, minimal harness, property loop, bisect, or old/new differential comparison.

Read code and form provisional ideas as needed to construct the loop, but do not present a cause or implement a speculative fix without symptom evidence.

Run the command and record the red result. Tighten speed, specificity, and reproducibility. For flakes, record failures/trials and conditions; stress only when it preserves the relevant failure pattern.

If the signal cannot be obtained, report attempted methods and the minimum missing environment/artifact. Do not replace the system with an invented toy reproduction. For genuinely human-only observations, adapt [scripts/hitl-loop.template.sh](scripts/hitl-loop.template.sh) for a user-controlled terminal; capture no secrets.

## 2. Reproduce and minimize

Confirm the user's failure, then remove inputs/setup one change at a time while rerunning. Keep the smallest useful case; stop reducing when remaining scaffolding is justified or further work adds no diagnostic value. Preserve the original scenario.

## 3. Rank explanations

Before probing, show competing falsifiable hypotheses and their predictions. Usually three to five suffice; do not invent extras when evidence is decisive. Invite correction without blocking authorized investigation.

## 4. Discriminate

Each probe tests a prediction. Change one variable at a time; prefer debugger inspection or targeted uniquely tagged logs. For performance, control baseline conditions and measure/profile; avoid instrumentation that distorts the question.

## 5. Fix and protect

Write a failing regression test before the fix at a seam that includes the actual interaction. Do not substitute a shallow mock test. If no adequate seam exists, state that limitation and identify an architectural follow-up.

Apply the narrow supported fix. Run the regression and the original scenario. For flakes, compare counts under comparable conditions; do not call a small zero-failure sample proof of elimination.

## 6. Finish

Remove tagged probes and account for diagnostic artifacts. Report the supported cause, exact checks/results, residual uncertainty, and any missing regression seam. Include the causal explanation in a commit/PR only when that artifact is part of the authorized task.
