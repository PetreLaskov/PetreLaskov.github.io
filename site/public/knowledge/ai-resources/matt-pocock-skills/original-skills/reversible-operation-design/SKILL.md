---
name: reversible-operation-design
description: "Design a consequential bulk change or cleanup so its exact effects can be previewed and its relevant state recovered."
---

# Reversible Operation Design

Use when the user requests a bulk edit, migration, cleanup, or configuration change whose recovery is not obvious. Start with the intended outcome and the actual resources affected. Do not add ceremony to trivial reversible edits.

Identify what a reversal would have to restore: bytes, paths, identifiers, relationships, external state, or compatibility with existing consumers. Distinguish reverting code from undoing effects. Name anything that cannot be recovered from available information.

Choose the smallest design that makes the operation inspectable and recoverable. Possibilities include an exact change manifest, a scoped patch, quarantine rather than deletion, a reversible transformation, a compatibility period, or a checkpointed batch. Select based on the operation; do not require every mechanism.

Produce a concrete preview tied to current state. For computed file targets, verify resolved paths remain in the intended workspace. Keep the preview and apply step consistent so intervening changes cannot silently widen the operation. Preserve only the recovery state actually needed and avoid copying unrelated sensitive material.

When authorized to implement, test the transformation and reversal on a representative isolated sample when that materially reduces uncertainty. Execute in bounded units where partial failure is possible, and record which units completed. Stop on unexpected scope or state drift rather than improvising a broader destructive action.

Report actual changes, recovery location or procedure, and any remaining irreversible effect. Do not claim rollback works without a supported reason or test. Retire recovery material only when the user or established lifecycle permits it.
