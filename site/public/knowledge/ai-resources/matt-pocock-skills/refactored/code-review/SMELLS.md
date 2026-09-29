# Design heuristics for Standards review

These are leads, never hard violations. Skip tooling-enforced matters. A documented repo convention wins. Report only a changed location with concrete friction and a proportionate remedy.

- Mysterious Name: meaning is obscured; improve the name or clarify the concept.
- Duplicated Code: one policy has multiple implementations; consider one shared owner without coupling distinct policies.
- Feature Envy: logic repeatedly reaches into another module's knowledge; consider moving responsibility.
- Data Clumps: values travel together because they form one concept; consider a type.
- Primitive Obsession: a primitive allows mistakes a domain type could prevent.
- Repeated Switches: the same variation is handled repeatedly; consider one mapping or polymorphism when it simplifies actual callers.
- Shotgun Surgery: one reason for change causes scattered edits; improve locality.
- Divergent Change: unrelated reasons repeatedly change one module; consider separating responsibility.
- Speculative Generality: hooks or abstraction serve no current requirement; remove them.
- Message Chains: callers know navigation they should not need; hide the relevant knowledge.
- Middle Man: indirection adds no useful policy, constraint, or stable interface; consider removing it.
- Refused Bequest: inheritance promises a contract most implementations reject; consider composition.

A smell name alone is not a finding. Deleting a wrapper can remove a useful boundary; extracting repetition can bind independent behavior. Explain why the suggested move helps this change.
