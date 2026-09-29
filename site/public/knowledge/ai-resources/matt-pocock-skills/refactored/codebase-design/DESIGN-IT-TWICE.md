# Design it twice

Use only for a chosen module and a request where competing interfaces can change the decision.

Frame current caller needs, constraints, dependency categories, and domain terms. Keep any illustrative sketch neutral rather than seeding a favorite answer.

Explore contrasting designs: smallest total caller obligation; simplest common caller; flexibility for specified variation; ports/adapters if meaningful. Use available parallel leaf agents when useful, otherwise separate passes. Do not invent future requirements to make designs different.

Each design supplies interface contract (including order/errors), common and awkward caller examples, hidden knowledge, dependency strategy, and migration cost. Keep work within the selected module; no unrequested redesign campaign.

Compare depth, locality, seam placement, and actual caller work. Reject alternatives that violate constraints. Recommend one or a precise hybrid with reasons; end at the design decision.
