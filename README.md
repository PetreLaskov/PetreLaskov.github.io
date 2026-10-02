# Petre Laskov

Personal website: https://petrelaskov.github.io/

The homepage leads with selected work. Navigation: Writing, Wisdom & practice, The Knowledge Project, Art, and About. Writing opens with “Take the Question for a Walk” and its companion workspace request. The Knowledge Project contains the skills study; Art contains 33 images organised into four collections.

## Current website

- Edit `site/content/site.json`.
- Appearance: `site/public/styles.css`.
- Templates: `site/scripts/build.mjs`.
- Content instructions: `site/CONTENT_GUIDE.md`.

The published pages are static HTML/CSS. The build uses the repository’s existing Markdown libraries for essays. To preview them:

```sh
cd site
npm run dev
```

## Publish

Pushing to `main` runs the GitHub Pages workflow. It builds the existing Quartz pages, builds/checks the new edition, then overlays the new home and section pages. Only the generated `public/` folder is uploaded. Old essay, study, image and feed URLs remain available. The old homepage, About and Art entrances are replaced by the new design; their source and Git history remain preserved.

For a full local build from the repository root:

```sh
npm ci
npx quartz build
node site/scripts/build.mjs --production
node site/scripts/check.mjs
node site/scripts/prepare-pages.mjs
```

The existing `content/`, `raw/` and Quartz source are retained for continuity. Do not bulk-import them into the new sections. Quartz's exclusions and draft filter remain active. Legacy pages use full-page navigation so links can safely enter the new design.

## Rollback

The pre-redesign revision is tagged `pre-redesign-2026-09-28`. Revert the redesign commit to restore the previous workflow and entrance pages without rewriting history.
