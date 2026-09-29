---
name: resume-probe
description: "Test whether a handoff lets a fresh agent reconstruct the current objective and take the right next action before it edits."
---

# Resume Probe

Use for a consequential handoff, long interruption, or suspected stale continuation note. The output is a small test of resumability, not a rewrite of the whole project history.

Give a fresh subagent the handoff and only the artifacts a successor would actually receive. Ask it to locate the current objective, authoritative state, next useful action, active constraints, and one unresolved uncertainty. Require paths or exact artifact references for its conclusions. Keep the probe read-only and do not supply expected answers or suspected defects.

If no fresh context is available, perform the reconstruction explicitly as a weaker self-check and label that limitation. Do not call it independent validation.

Compare the reconstruction with current artifacts and the user's authorized objective. Investigate mismatches: missing state, stale pointers, ambiguous ownership, incomplete authorization, or a receiver's unsupported assumption. Repair the smallest piece of the handoff that would resolve the real mismatch. Do not add unrelated history to prevent every imagined confusion.

Ask the receiver to propose its first concrete action. Verify that the action is both useful and within scope. For fragile work, have it perform only a harmless read or isolated reproduction. A fluent paraphrase of the handoff does not demonstrate operational understanding.

Report what was reconstructed correctly, the material mismatch if any, and the repaired note. Stop after the next action is adequately grounded. Repeat only when a repair changes the continuation materially; do not create an endless handoff review loop.
