---
name: research
description: Investigate a bounded question against primary sources and save a cited Markdown answer for a decision or later session.
---
# Research

Establish the question, relevant version or date, material subquestions, and output location from the request and repository conventions. Ask only for missing scope that materially changes the work.

## Coordinator
When background delegation is available and useful, dispatch one researcher with the answer contract and file path. Tell it explicitly that it is the worker and must perform this research itself. Keep working on independent tasks. If already acting as the delegated researcher, skip delegation. If delegation is unavailable, do the work directly and say so.

## Researcher
Follow claims to the primary sources that own them: official docs, specifications, source, or first-party APIs. Distinguish documented guarantees, implementation behavior, observed results, and inference. A first-party source is not automatically evidence for every claim it makes.

Investigate material contradictions rather than smoothing them away. Keep version and date scope visible where they affect the answer. Use secondary material only as a lead to primary evidence, not as a substitute for the required support.

Stop when each material subquestion is supported or explicitly unresolved. Continue searching only where another source could change a material conclusion.

Write one Markdown file in the established notes location, or a sensible task-local location if none exists. Include the question, usable findings with source links or exact code locators, consequential caveats, and unresolved points. Cite the claim at the scope the source actually supports.

Return the file path and a concise answer to the coordinating task. Do not create PRs, publish, or clean up unrelated artifacts merely to deliver research.
