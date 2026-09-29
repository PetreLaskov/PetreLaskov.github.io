---
name: integration-contracts
description: "Define the smallest concrete interface agreements needed for independently implemented components or agents to integrate correctly."
---

# Integration Contracts

Use before or during parallel work when separate components share an unsettled boundary. Identify the actual producers and consumers. Ignore internal details that only one owner controls.

For each consequential seam, capture the behavior the other side needs: representative input and output, absence and failure states, ownership of transformations, and ordering or retry semantics when relevant. Prefer a few concrete examples or a runnable fixture over a broad abstract schema. State which facts come from the specification and which choices remain provisional.

Find one example that two plausible implementations would handle differently. Resolve that ambiguity before declaring the work independent. For asynchronous boundaries, include at least one stale, duplicate, or out-of-order case when the product can encounter it. Do not introduce such cases into a purely local synchronous interface without reason.

Place the agreement beside the code or spec that governs the seam. Give each side the same pointer and name who may change the contract. If a small compatibility test can run without implementing both sides, create it using the repository's existing test style. Otherwise write an explicit example table and label it non-executable.

During integration, test the agreement against actual behavior. When it is wrong, change the contract and its consumers together; do not preserve a bad early abstraction merely because it was documented. Report the decision that makes parallel implementation possible and the unresolved issue that still requires coordination.

Stop when the shared behavior is unambiguous enough to implement. This is a seam-level agreement, not a complete architecture document or a demand to predesign every function.
