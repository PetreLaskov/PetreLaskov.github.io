---
name: think-out-loud-trace
description: >-
  This skill applies a lightweight reasoning trace to any response — making the
  derivation visible rather than just presenting conclusions. This skill should
  be invoked when the user says "think out loud", "trace your thinking", "show
  your reasoning", "walk me through it", "show your work", "explain your thought
  process", or "how did you get there". Unlike think-for-real (extended
  intellectual wrestling where reasoning itself is the output), this is a mode
  overlay — transparent thinking applied to whatever task is at hand — code
  reviews, architecture decisions, debugging, recommendations — while staying
  focused on delivering the answer.
---

# Think Out Loud Trace

Make the reasoning path visible. Show derivation, not just destination.

This is a mode overlay, not a mode. The output is still a direct response to the user's request — the trace makes the reasoning behind it transparent: what was considered, what was ruled out, where confidence varies, and what assumptions were made. The task stays primary; the trace serves it.

## Trace vs. Full Reasoning Mode

A trace shows the path while doing the work. Think-for-real *is* the path.

| | Trace (this) | Think-for-real |
|---|---|---|
| Function | Mode overlay on a task | The task itself is reasoning |
| Output | Task answer with visible reasoning | The reasoning journey |
| Length | Proportional to the task | As long as needed |
| Confidence | Mark key decision points | Full epistemic gradient |
| Loose ends | Acknowledged, moved past | Followed, dwelt with |

Apply trace when the user wants to see the derivation behind a recommendation, fix, or approach — the *why*, not just the *what*. Route to think-for-real when the question deserves genuine wrestling and the exploration itself is the point.

## How to Trace

**Show the actual derivation.** Walk from observation to inference to conclusion. Not post-hoc justification — the real path, including dead ends that informed the result.

**Mark key decisions.** When the reasoning branches — approach A over B — name what tilted it. The reader should be able to disagree with a specific judgment call, not just the conclusion.

**Flag confidence variation.** Some steps are solid facts. Some are inference. Some are guesses. Mark them differently. "This follows from X" carries different weight than "my best guess here is Y."

**Follow what doesn't fit.** When something contradicts the emerging picture, that's signal, not noise. Don't smooth over it. The interesting part of a trace is where the reasoning catches on something unexpected.

**Name load-bearing assumptions.** Every derivation rests on assumptions. Surface the ones that would change the conclusion if wrong.

**Stay proportional.** Match trace depth to task complexity. A straightforward question gets a light trace. A complex decision gets detailed reasoning. The trace serves the task — never overwhelm it.

## Anti-patterns

**Post-hoc rationalization.** Arriving at the answer first, then constructing a tidy path backward. A reader should be able to tell the response wasn't written backward from its conclusion. The tell: every step flows smoothly with no branches or friction. Real thinking has friction.

**Performed deliberation.** Manufacturing a trace when the answer is obvious. If it's straightforward, say so — don't fake a journey.

**Uniform hedging.** Adding "perhaps" to every sentence is not a trace — it's style. Real confidence variation means some claims carry full weight and others are flagged as inference or guess.

**Trace bloat.** Making the trace longer than the answer it supports. Proportionality: the trace serves the task, not the other way around.

## What Good Trace Output Looks Like

- The actual answer to the user's question (this is still a task response)
- Reasoning steps visible between the question and the answer
- At least one branching point where an alternative was considered
- Assumptions named where they matter
- Confidence varies visibly across the response
- No coverage mode — follow the thread with actual tension, not a checklist

## What This Is Not

Not deep reasoning mode (think-for-real is for extended intellectual wrestling).
Not philosophical dwelling (think-deeply is for patient inquiry on deep questions).
Not adversarial testing (think-hard-adversarial is for stress-testing and falsifying).
Not collaborative production (collaborative-thinking is for writing-as-thinking with the user).
