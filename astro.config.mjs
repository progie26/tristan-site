import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

export default defineConfig({
  site: "https://progie26.github.io",
  base: "/tristan-site/",

  integrations: [
    mdx(),
    react(),
    sitemap({ filter: (page) => !page.includes("/draft/") }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        { theme: "catppuccin-mocha", keepBackground: true },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: { className: "anchor-link", ariaHidden: true },
        },
      ],
    ],
  },

  output: "static",
});
