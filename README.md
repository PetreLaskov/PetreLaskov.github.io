# petrelaskov.github.io

Personal hub for Petre Laskov — a wiki-style second brain published with
[Quartz 4](https://quartz.jzhao.xyz/) from an Obsidian vault, deployed to
GitHub Pages on every push to `main`.

Live site: <https://petrelaskov.github.io/>

## Layout

- `content/` — the published site. **This folder is the Obsidian vault.**
- `raw/` — private source documents. Ignored by Quartz, committed to git.
- `quartz.config.ts`, `quartz.layout.ts` — site configuration and layout.
- `.github/workflows/deploy.yml` — builds and deploys on push to `main`.
- `CLAUDE.md` — Knowledge Compiler conventions (frontmatter schema, page
  types, ingest/query/lint workflow). Read this first when editing.

## Editing in Obsidian

1. Open Obsidian.
2. **Open folder as vault** → select `content/`.
3. Turn on the Obsidian options that make sense for Quartz:
   - Settings → Files & Links → **New link format**: `Shortest path when possible`.
   - Settings → Files & Links → **Use [[Wikilinks]]**: on.
   - Settings → Editor → **Strict line breaks**: off (default).
4. Write notes as normal. Every page needs YAML frontmatter — see
   `CLAUDE.md` for the schema.

## Local preview

```bash
npm install
npx quartz build --serve
```

Then open <http://localhost:8080>. The site rebuilds on save.

## Publishing

```bash
git add -A
git commit -m "update hub"
git push
```

GitHub Actions builds the site and deploys to Pages. Check progress at
<https://github.com/PetreLaskov/PetreLaskov.github.io/actions>.

## One-shot build

```bash
npx quartz build
```

Output lands in `public/` (gitignored).

## Attribution

Built on [Quartz](https://github.com/jackyzha0/quartz) by Jacky Zhao. See
`LICENSE.txt` for Quartz's MIT license. Content copyright Petre Laskov
unless otherwise noted.
