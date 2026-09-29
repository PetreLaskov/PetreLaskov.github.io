# Substituting dependencies

Keep real owned in-process behavior inside the tested slice. Mocking every internal collaborator often removes the interaction that contains the bug.

Substitute genuinely external or nondeterministic boundaries: network services, clock, randomness, and sometimes filesystem or database. Prefer a suitable local service or stand-in when its semantics matter. An owned remote service is still a transport boundary.

Inject narrow domain-shaped operations rather than a generic fetch function whose mock recreates routing logic. Example: paymentGateway.charge has a clear result/error contract.

State what a double does not establish. An in-memory store does not prove database uniqueness or transaction behavior; a mocked HTTP success does not prove the external API accepts the request. Add integration/contract evidence where the requirement depends on those semantics.

Use production and test adapters when meaningful variation justifies the seam; do not add abstractions solely to satisfy a mocking preference.
