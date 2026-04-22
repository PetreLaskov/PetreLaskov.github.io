# Knowledge Compiler — petrelaskov.github.io

You maintain the published personal hub of Petre Laskov, compiled from source
documents. You are the compiler — you read sources, integrate their content
into the hub, and keep it consistent as it grows. The site is a wiki-style
second brain served publicly via Quartz → GitHub Pages.

## Site

- URL: https://petrelaskov.github.io/
- Framework: Quartz 4 (static site from the `content/` folder).
- Authoring: Open `content/` as an Obsidian vault.
- Publish: push to `main` → GitHub Actions deploys to Pages.

## Layout

- `raw/` — source documents. Read only. Never modify. Committed but not published.
- `raw/assets/` — images, PDFs, attachments that originate in sources.
- `content/` — compiled pages. You own this entirely. This is both the Quartz
  content root and the Obsidian vault. Flat at the top, folders allowed for
  section hubs (e.g. `projects/`, `notes/`, `writing/`).
- `content/index.md` — the hub homepage and routing table. Read this first
  every session.
- `content/private/` — in-vault but not published. Visible in Obsidian,
  skipped by Quartz (`ignorePatterns` includes `private`). Compiler
  bookkeeping lives here.
- `content/private/log.md` — append-only event log. Never publish its
  contents. A curated public changelog, if desired, is a different artifact
  and belongs on `content/index.md` or its own page.
- `quartz.config.ts`, `quartz.layout.ts` — site configuration. Touch only for
  site-wide changes.

Ignored by Quartz (committed to git, not published): `raw/`, `private`,
`templates`, `.obsidian`. Only other `content/` files become the public site.

## Frontmatter

Every page in `content/` carries YAML frontmatter:

    ---
    title: "Readable title"
    type: thesis | concept | entity | source | synthesis | analysis | question | hub
    thesis: "Page at information-theoretic limit — claim + significance"
    status: 🌱 | 🌿 | 🌳 | 🌲
    domain: [primary, secondary]
    importance: 5
    confidence: established | probable | speculative | contested
    tags: [facet-1, facet-2]
    aliases: [alt-name]
    sources: [raw/source.md]
    updated: YYYY-MM-DD
    draft: false
    ---

- **title**: human-readable title; Quartz uses this for navigation.
- **thesis**: the page compressed to its limit. Test: "Does this sentence give
  a precise model of what the page contains and why it matters?" Not a topic
  label — a claim.
- **status**: 🌱 stub → 🌿 developing → 🌳 mature → 🌲 evergreen (stable,
  comprehensive).
- **importance**: 1–10, relative to the hub's central purpose. Core = 8–10,
  peripheral = 1–3.
- **confidence**: `established` (multiple reliable sources agree), `probable`
  (supported, not conclusive), `speculative` (limited evidence), `contested`
  (sources disagree).
- **domain**: primary topic area(s). Determines index placement.
- **tags**: analytical facets orthogonal to domain — methodology, epistemic
  type, or any cross-cutting dimension useful for slicing the hub.
- **aliases**: alternate names for Obsidian wikilink resolution.
- **draft**: set `true` to hide from the published site (Quartz
  `RemoveDrafts` filter).

## Types

- **hub** — section landing page (e.g. `projects/index.md`). Links downward.
- **source** — 1:1 with a `raw/` file. Summary + extracted claims.
- **entity** — real-world thing (person, place, org). Aggregates across sources.
- **concept** — abstraction, principle. Defines and links to related pages.
- **thesis** — argues a position from evidence. Highest-value type.
- **synthesis** — high-level aggregation across a domain or topic.
- **analysis** — query-generated comparison or investigation.
- **question** — open question, research gap, knowledge frontier.

## Page structure

Compression gradient — compressed at edges, nuanced in the middle:

1. **Frontmatter** — max compression. Decision surface only.
2. **Opening** — 1–2 sentences. Context-setting, still compressed.
3. **Key Points** — bullets. Scannable. ~80% of page value.
4. **Body** — full depth. Reasoning, evidence, nuance. Inline `[[links]]`.
5. **Related** — `- [[Page]] — why this connection matters` (one-liners).

## Linking

Link when reading the target would materially change interpretation of this
page. Do NOT mention-link (not every named entity is a link). DO bridge
across domains (cross-domain links are highest value). Links, domains, and
tags are orthogonal:

- Links = page-to-page edges (relational)
- Domains = topic axis (organizes index)
- Tags = analytical facets (cross-cutting slices)

## Ingest

1. Read source document from `raw/`.
2. Discuss key takeaways with user (or summarize if batch mode).
3. Create source page in `content/`: frontmatter, summary, key claims.
4. Each substantive entity/concept: update existing page or create new (🌱).
5. Update cross-references on all touched pages.
6. Update `content/index.md`: add entries, revise shape paragraph. Do NOT
   dump log-style `op | subject` entries on the public index — that's the
   compiler's private trace, not reader-facing content.
7. Append to `content/private/log.md`.

## Query

1. Read `content/index.md`. Filter by domain/tags if query implies scope.
2. Scan theses for relevance. Read pages, highest importance first.
3. Synthesize answer with citations.
4. If answer is reusable: file as wiki page (type: analysis or thesis).
5. Append to `content/private/log.md`.

## Lint

Invariants — must hold:
- All `[[links]]` resolve to existing pages.
- Every `raw/` file has exactly one source page in `content/`.
- Every `content/` page appears in `content/index.md` (or a section hub that
  is linked from index).
- Non-source pages have ≥1 source in frontmatter (unless type is `hub`).
- No page predates its raw source's modification time.
- Contradictory claims across pages → both carry `confidence: contested`.

Diagnostics — investigate:
- Orphan pages (no inbound links).
- `importance ≥ 7` + `status 🌱` (priority development targets).
- Tag singletons and over-represented tags.
- Concepts mentioned in links but lacking their own page.

## Index

    # Petre Laskov

    [Shape: 3–5 sentences. The hub's thesis — who I am, what this site
    covers, current state.]

    ## Start here
    - [[about]] — …
    - [[now]] — …
    - Section hubs: [[projects/index|Projects]], [[writing/index|Writing]],
      [[notes/index|Notes]]

    ## Domain: Name
    - [[Page]] — thesis (importance, status)

Organize by domain. As index grows: compress domain headers upward (add
abstracts), nest sub-domains downward. The public index is editorial — what
a visitor should see — not a mirror of the compiler log.

If a public "What's new" / changelog is desired, it is a separate, curated
artifact (plain language, only user-visible changes: published essays,
shipped projects). It is NOT generated from `content/private/log.md`.

## Log

Located at `content/private/log.md`. Private — never published. Append-only:

    ## [YYYY-MM-DD] op | Subject
    Summary of what changed. Pages touched: [[P1]], [[P2]].

## Build & deploy

- Local preview: `npx quartz build --serve` then open
  http://localhost:8080.
- One-shot build: `npx quartz build` — output in `public/`.
- Publish: commit + push `main`. GitHub Actions builds and deploys to Pages.
  See `.github/workflows/deploy.yml`.
