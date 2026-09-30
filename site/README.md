# Current personal website

Edit `content/site.json`; see CONTENT_GUIDE.md for entries, artwork, attribution and drafts.

```sh
npm run dev
npm run build
npm run check
```

Preview builds include noindex. The deployment uses `node scripts/build.mjs --production` with the confirmed GitHub Pages URL and generates a sitemap.

GitHub Pages deployment is configured in the parent repository's workflow. It preserves existing published Quartz routes, then overlays this new edition. Only generated pages/assets are hosted; these source files are not served.

The Art gallery contains 21 newly added images and 8 earlier works. Edit each artwork description in content/site.json (description); keep the GitHub gallery in ../content/art/index.md in sync. The first artwork in each collection uses displayTitle and artId; subsequent works are in images. Original creation credits are preserved.
