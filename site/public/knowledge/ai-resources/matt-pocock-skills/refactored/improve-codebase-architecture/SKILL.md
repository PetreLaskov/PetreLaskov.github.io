---
name: improve-codebase-architecture
description: Survey a chosen codebase area for worthwhile deepening opportunities, produce a visual report, and explore only a candidate the user selects.
---

# Improve Codebase Architecture

Find refactors that reduce caller knowledge and concentrate meaningful behavior. This is a survey and design discussion, not automatic implementation.

Use codebase-design vocabulary when available: module, interface, depth, seam, adapter, leverage, locality. Read relevant project vocabulary and ADRs without creating missing files merely to start.

## Scope and inspect

Follow the user's area or next planned change. Otherwise inspect a useful span of history for active areas; distinguish repeated policy changes from generated or mechanical churn.

Explore directly or through a bounded subagent. For each possible candidate identify actual caller obligations, scattered policy, missed test interactions, or concrete change friction. Apply the deletion test: would removing a module eliminate needless indirection or redistribute valuable knowledge?

Do not manufacture candidates. A justified no-change result is valid.

## Report first

Use [HTML-REPORT.md](HTML-REPORT.md) to create a readable offline HTML report in the OS temporary directory, then open it through the host's available file viewer and provide its absolute path.

Each candidate includes:
- source files and evidence;
- present friction and proposed ownership change;
- before/after diagram;
- gains in caller leverage, locality, or behavioral testing;
- migration cost and uncertainty;
- Strong, Worth exploring, or Speculative recommendation.

Respect existing ADRs. Reopen one only with concrete contradictory pressure, clearly labeled. Recommend a first candidate or recommend none. Do not propose detailed interfaces yet.

Stop for selection. A report-only request ends here.

## Explore the selected candidate

Discuss constraints, dependency strategy, interface obligations, migration, and test preservation. Use available grilling/domain-modeling references if useful, not as mandatory tool names. Explore alternative interfaces only when requested or part of the selected design task.

Update domain documentation as agreed decisions crystallize. Offer an ADR for a durable rejection reason; temporary deferral is not a permanent prohibition. End with a decision and next artifact, without changing implementation unless separately authorized.
