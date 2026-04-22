import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// Components shared across all pages.
// Nat.org-inspired: everything stacks in a single centered column.
// - Top: PageTitle (site name) + Search (small, right)
// - Article body
// - afterBody: Backlinks (wiki connectivity)
// - Footer: minimal
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.PageTitle(),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
  ],
  afterBody: [Component.Backlinks()],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/PetreLaskov",
      Source: "https://github.com/PetreLaskov/PetreLaskov.github.io",
    },
  }),
}

// Single-note pages: no sidebars.
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [],
  right: [],
}

// List pages (tag/folder): same single-column.
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [],
  right: [],
}
