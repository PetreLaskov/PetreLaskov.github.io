# Current personal website

Edit `content/site.json`; see CONTENT_GUIDE.md for entries, artwork, attribution and drafts.

```sh
npm run dev
npm run build
npm run check
```

Preview builds include noindex. The deployment uses `node scripts/build.mjs --production` with the confirmed GitHub Pages URL and generates a sitemap.

GitHub Pages deployment is configured in the parent repository's workflow. It preserves existing published Quartz routes, then overlays this new edition. Only generated pages/assets are hosted; these source files are not served.

No new essays, artworks, biography, email or social profile links were selected for this edition.
