# Adding your work

Everything begins in `content/site.json`. Keep valid JSON: double quotes, no trailing commas. You can also ask Codex to add or edit content here.

## Home and About

- `home.title` and `home.intro`: the two homepage lines.
- `about.paragraphs`: introduction paragraphs, one string per paragraph.
- `about.professional`: selected professional-background paragraphs.
- `about.links`: objects with `label` and an HTTPS `url`.
- `about.email`: your chosen public email. Leave blank to omit it.

No contact details are inferred.

## A link to a Substack essay or GitHub project

Add an item to the relevant area's `items` list. This example is illustrative and is not included in the site:

```json
{
  "slug": "your-essay",
  "title": "Your essay title",
  "summary": "What a reader will find here.",
  "kind": "Essay",
  "date": "2026-09-24",
  "url": "https://example.com/your-essay"
}
```

Use the actual maintained edition's address. External entries link directly there; the site does not make another copy.

## A page hosted here

Omit `url`. Add `paragraphs`, and optionally `sections`:

```json
{
  "slug": "your-study",
  "title": "Your study title",
  "summary": "A brief description.",
  "kind": "Study",
  "date": "2026-09-24",
  "author": "Petre Laskov",
  "role": "Your contribution, in plain language.",
  "assistance": "Relevant editorial or AI assistance, if applicable.",
  "paragraphs": ["Opening paragraph.", "Another paragraph."],
  "sections": [
    {"heading": "A section heading", "paragraphs": ["Section text."]}
  ],
  "sources": [
    {"label": "Source title", "url": "https://example.com/source", "note": "Chapter or passage, if relevant."}
  ]
}
```

A study in Wisdom gets a stable URL at `/wisdom/your-study/`. Preserve its slug when revising it. Text is escaped as plain text; raw HTML and Markdown are not rendered. A full rich-text editor is not included.

## Artwork and collections

Copy deliberately selected images into `public/assets/`. Do not place private source material there: the entire public folder ships.

Add `image`, `alt`, and `credit` to an Art item. The image must use a local path, for example `/assets/your-image.webp`. Original aspect ratio is preserved; clicking opens the full image.

For a collection add an `images` list. Each image has its own `image`, `alt`, and exact `credit`. The optional top-level `image` is the collection cover and also appears first on the collection page; do not repeat it in the images list. Add commentary through `paragraphs`.

Keep the order of `items` and `images` intentional; it is the displayed order. Dates and attribution are never generated for artwork.

## Drafts and revision

Add `"draft": true` to an item to omit its entry and page from the build. Draft image files should remain outside `public/` until selected; omitting an item does not make files in the public assets directory private.

Rebuild after changing content. Removing an item and rebuilding removes its generated page, too. Correct the maintained source edition and site summary together when a substantive claim changes.

## Resource collections and complete study editions

Local pages can include `linksTitle` and a `links` list. Each entry has `label`, `url` (HTTPS or a site-root path), and optional `summary`. AI Resources at `/knowledge/ai-resources/` uses this to link full editions.

The Matt Pocock study edition is preserved under `public/knowledge/ai-resources/matt-pocock-skills/`. Its `index.html` adds publication navigation and attribution around the unchanged reader. Keep its source, candidate packages, exact diffs, evaluations, and license files together. `PUBLICATION.md` and `publication-export.json` document the public copy. Do not replace this full edition with a summary page or strip its evaluation limitations.

`build-study-pages.mjs` derives 38 complete HTML chapters, a chapter index, and a method/results page from the preserved reader data before the main build. It supplies `content/additional-routes.json` for the sitemap. Keep commentary, source attribution and evidence limits visible; do not add hidden ranking claims, synthetic ratings or keyword variants.


## Writing and the minimal homepage (2 October 2026)

Writing has its own area and stable article URLs. Selected Markdown essays live in content/writing/; set an item's markdown path, title, subtitle, description, date, and author in site.json. The first title and italic subtitle must match the manuscript. The build renders the body with the repository's existing Markdown dependencies. Put a deliberately approved companion file in public/writing/<slug>/ so the manuscript's relative end link resolves. Never copy private sources or working records into either public source location.

home.title is a modest section heading. home.featured selects actual items using area and slug. No biography or slogan is needed on the homepage. About shows only supplied content; empty professional/contact sections are omitted. Existing art collections and corrected captions remain authoritative.
