# Tests that can disagree

Good: call calculateInvoice with a worked input totaling 40 and assert 45 because the independent contract adds delivery below 50. Then check the exact 50 threshold against a literal expected 50.

Weak: compute the expected result with the same conditional and summation as production. Both can share the mistake.

Good: create a user and retrieve it through the intended interface. Weak: inspect private fields merely because the current implementation stores them there.

Test the contract. A persistence adapter or migration may legitimately use database state as its public outcome. A receipt-delivery boundary may promise exactly one send; asserting that external interaction protects behavior. Counting internal helper calls merely freezes structure.

Name capabilities and distinguish missing behavior from harness failure. A red test should reject a plausible wrong implementation; a green test is bounded evidence for the scenario it covers, not proof of the whole feature.
