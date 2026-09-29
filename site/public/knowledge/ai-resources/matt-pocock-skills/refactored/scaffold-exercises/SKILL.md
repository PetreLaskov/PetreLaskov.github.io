---
name: scaffold-exercises
description: "Create or renumber course exercise skeletons that follow the repository conventions and pass its actual structure checks."
---

# Scaffold Exercises

Create the course skeleton requested by the plan. Inspect existing exercises, repository guidance, and the actual lint command before writing. Preserve completed content and do not impose this convention on an unrelated course unless requested.

Use exercises/XX-section-name/XX.YY-exercise-name/ with lower-case dash-case names. Match exercise section prefixes to their parent. Map specified variants to problem/, solution/, and explainer/. Default unspecified stubs to explainer/. Under the source convention, an exercise needs a primary problem or explainer variant; solution alone is insufficient.

Detect duplicate numbers and path/content collisions before creating files. Proceed on unambiguous additions; resolve a material conflict rather than overwriting existing work. Make each variant's readme.md nonempty with an honest title and short description. Readme-only scaffolds need no code file. Code-bearing variants need the repository's actual entry-file convention, commonly main.ts.

Do not add .gitkeep, speaker-notes.md, forbidden run commands, or broken links under the source convention. Treat the installed linter as authoritative if its rules differ from this summary.

For renumbering, use a scoped Git-aware move where appropriate, preserve contents, and update links and navigation that depend on the old path. Run the existing course linter, including pnpm ai-hero-cli internal lint when present. Fix task-caused errors; identify unrelated existing failures separately.

If the requested delivery includes a commit, stage only this task's files and inspect the staged diff before committing. Otherwise leave the reviewable scaffold. Report created/moved paths, actual validation, and what remains unwritten. Structural validity is not educational completeness.
