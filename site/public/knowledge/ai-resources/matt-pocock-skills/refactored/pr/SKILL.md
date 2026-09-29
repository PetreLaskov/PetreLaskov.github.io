---
name: pr
description: "Write concise pull request bodies that explain changed behavior, show appropriate evidence, and identify concrete reversal costs."
metadata:
  credits:
    skill: show-me
    author: Dex Horthy
    organisation: Humanlayer
    url: "https://github.com/humanlayer/skills/blob/main/plugins/show-me/skills/show-me/SKILL.md"
---

# PR

Write a body a new reviewer can use. Read the actual requirement, final diff, repository PR template, and validation results. Use the project's domain language; CONTEXT.md is helpful when present, not a required dependency.

Lead with the concrete problem and resulting behavior. For a meaningful change, include the smallest visual that clarifies its shape: pseudocode for an algorithm, a call tree for control flow, a shallow file tree for ownership, a diff sketch for a structural change, or Mermaid for interaction. Omit the visual when a sentence is clearer. Label sketches as illustrations rather than executable evidence.

Pair before and after evidence when available. Use screenshots for visual claims and execution results for behavioral claims. Name what actually ran and what it established. Never manufacture a failing baseline, passing run, screenshot, or output. If only the changed version was tested, say so. Note important unverified behavior succinctly.

Describe merge consequences concretely: affected users or consumers, persistent changes, and what rollback would require. A one-way/two-way door label can summarize that explanation but cannot replace it. Mention intentionally excluded behavior only when it prevents a likely scope misunderstanding.

Keep detail proportional to the change and fit the repository template. Rewrite the title and body around the final implementation if scope changed. Do not narrate abandoned approaches unless they explain a live tradeoff. Writing the body does not independently authorize publication or merging.

The visual-shaping guidance derives from Dex Horthy's show-me; see [CREDITS.md](CREDITS.md).
