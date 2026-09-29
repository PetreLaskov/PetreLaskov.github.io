---
name: contract-surface-audit
description: "Improve a module public interface by reducing the knowledge and orchestration required of real consumers."
---

# Contract Surface Audit

Use when a module has a public boundary but callers still need too much internal knowledge. Choose one representative consumer task and read its actual call sites alongside the exported API. Do not judge the interface by export count or file size alone.

List the knowledge the caller must supply: sequencing, internal representations, state transitions, error interpretation, lifecycle management, or policy decisions. Distinguish essential domain choices from accidental implementation burden. Identify the smallest repeated burden worth hiding.

Sketch two interfaces for the same task: the current call sequence and a proposed surface. Show concrete code or pseudocode at the call site. Explain what knowledge moves behind the boundary and which choices remain explicit. Check a second caller so the design does not optimize only one anecdote.

Pressure-test the proposal with one error or unusual but legitimate case. Avoid an opaque universal operation that hides necessary control, and avoid exposing internals merely to keep every option configurable. Prefer the smallest change that removes a real consumer obligation.

If implementation is requested, migrate one vertical slice and test behavior through the public surface before expanding. Otherwise deliver the interface proposal and tradeoffs. Report the consumer task that becomes simpler, the responsibility the module now owns, and a case that would show the abstraction is wrong. Do not reorganize folders as a substitute for improving the contract.
