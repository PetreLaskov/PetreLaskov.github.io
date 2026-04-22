import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Personal hub for Petre Laskov.
 * Aesthetic: nat.org-inspired — centered narrow column of serif prose,
 * minimal chrome, default-looking blue links.
 * Docs: https://quartz.jzhao.xyz/configuration
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Petre Laskov",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "petrelaskov.github.io",
    ignorePatterns: ["private", "templates", ".obsidian", "raw"],
    defaultDateType: "modified",
    generateSocialImages: false,
    theme: {
      fontOrigin: "local",
      cdnCaching: true,
      typography: {
        header: "Georgia",
        body: "Georgia",
        code: "Menlo",
      },
      colors: {
        lightMode: {
          light: "#ffffff",
          lightgray: "#e5e5e5",
          gray: "#999999",
          darkgray: "#111111",
          dark: "#000000",
          secondary: "#0000ee",
          tertiary: "#551a8b",
          highlight: "rgba(0, 0, 0, 0)",
          textHighlight: "#fff236aa",
        },
        darkMode: {
          light: "#111111",
          lightgray: "#222222",
          gray: "#707070",
          darkgray: "#e8e8e8",
          dark: "#ffffff",
          secondary: "#82b1ff",
          tertiary: "#bb86fc",
          highlight: "rgba(0, 0, 0, 0)",
          textHighlight: "#33331f88",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
