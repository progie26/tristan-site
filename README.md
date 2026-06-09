# tristan-site

My personal blog & portfolio — a Bento-grid academic panel built with Astro.

**Live:** [progie26.github.io/tristan-site](https://progie26.github.io/tristan-site/)

## Stack

- **Astro 5** — static site generation with React islands
- **Tailwind CSS 4** — CSS-first design tokens
- **React 19 + Motion 12** — interactive components (search, theme toggle, card expand)
- **MDX** — type-safe content via Content Collections

## Local dev

```bash
npm install
npm run dev       # → http://localhost:4321/tristan-site/
npm run build     # → dist/
```

## Content

- Blog posts: `src/content/blog/*.mdx`
- Projects: `src/content/projects/*.mdx`
- Frontmatter schema: `src/content/config.ts`

## Deploy

Push to `main` → GitHub Actions builds & deploys to GitHub Pages.
