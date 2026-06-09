
export const meta = {
  name: 'blog-design-research',
  description: 'Research best personal blog designs across interaction patterns, visual styles, and tech implementation',
  phases: [
    { title: 'Interaction Patterns' },
    { title: 'Visual Styles' },
    { title: 'Tech Implementation' },
    { title: 'Synthesize' }
  ]
}

const INTERACTION_QUERIES = [
  "best personal blog website design 2025 2026 non-scrolling layout card grid magazine horizontal scroll pagination",
  "creative blog navigation patterns pagination flip book carousel 3D navigation interactive storytelling",
  "unique personal website portfolio blog layout alternatives to infinite scroll filter tag-driven dynamic grid",
  "award-winning personal blog design webby awwwards innovative layout site:awwwards.com OR site:siteinspire.com",
  "brutalist blog academic blog print-inspired web design typography-heavy personal site",
  "dark mode personal blog academic blog glassmorphism neumorphism modern blog design trends 2025 2026"
]

const VISUAL_QUERIES = [
  "best personal blog visual design inspiration 2025 minimal brutalist dark academic typography driven",
  " 독립 个人博客 设计 排版 交互 site:zhihu.com OR site:jianshu.com",
  "independent personal blog design inspiration japanese chinese typography grid layout unique aesthetic",
  "minimal brutalist glassmorphism personal website blog color palette design system 2025"
]

const TECH_QUERIES = [
  "best static site generator personal blog 2025 2026 Next.js Astro Gatsby Hugo comparison",
  "creative CSS layout blog page grid masonry scroll-driven animations view transitions API GSAP Framer Motion examples",
  "personal blog react next.js template github creative design animated cursor 3D background webgl",
  "modern css only blog layout no javascript creative scroll-snap css-grid interactive blog design 2025",
  "next.js personal blog tutorial MDX contentlayer content collections creative design 2025"
]

phase('Interaction Patterns')
const interactionResults = await parallel(
  INTERACTION_QUERIES.map(q => () => agent(`Search the web for: "${q}". Find specific blog URLs, design patterns, and interaction modes. Return a structured list of findings with URLs, pattern names, and brief descriptions.`, {label: `search:${q.slice(0,50)}`}))
)

phase('Visual Styles')
const visualResults = await parallel(
  VISUAL_QUERIES.map(q => () => agent(`Search the web for: "${q}". Find visual design styles, color palettes, typography choices used in personal blogs. Return structured findings with specific examples and URLs.`, {label: `search:${q.slice(0,50)}`}))
)

phase('Tech Implementation')
const techResults = await parallel(
  TECH_QUERIES.map(q => () => agent(`Search the web for: "${q}". Find specific technical implementations, libraries, templates, and code patterns for personal blogs. Return structured findings with links and version info.`, {label: `search:${q.slice(0,50)}`}))
)

// Deduplicate and organize all findings
const allInteractions = interactionResults.filter(Boolean).flatMap(r => {
  try { return typeof r === 'string' ? [] : (r.findings || []) } catch { return [] }
})
const allVisuals = visualResults.filter(Boolean).flatMap(r => {
  try { return typeof r === 'string' ? [] : (r.findings || []) } catch { return [] }
})
const allTech = techResults.filter(Boolean).flatMap(r => {
  try { return typeof r === 'string' ? [] : (r.findings || []) } catch { return [] }
})

phase('Synthesize')
const report = await agent(`
You are synthesizing a comprehensive research report on personal blog design for a Chinese student developer.

Based on these search findings, produce a structured report:

## Raw Findings

### Interaction Patterns:
${JSON.stringify(interactionResults.map(r => typeof r === 'string' ? r : JSON.stringify(r)))}

### Visual Styles:
${JSON.stringify(visualResults.map(r => typeof r === 'string' ? r : JSON.stringify(r)))}

### Tech Implementation:
${JSON.stringify(techResults.map(r => typeof r === 'string' ? r : JSON.stringify(r)))}

## Required Output Structure

1. **Top 15 Reference Sites** — table with URL, interaction mode, visual style, tech stack, and one standout feature for each

2. **Interaction Mode Taxonomy** — categorize all discovered patterns into 5-7 families (e.g., Card Grid, Magazine/Editorial, Horizontal Journey, Page Flip, Spatial/3D, Filter-Driven, Scroll-Snap Narrative). For each: describe the pattern, when to use it, and 2-3 real examples

3. **Visual Style Map** — map 5-8 distinct visual styles (Minimal Typography, Brutalist, Dark Academic, Glassmorphism, Neo-Print, etc.) with color palettes, font pairings, and example sites

4. **Tech Stack Recommendation** — for our use case (student, React/Next.js familiarity, wants creative non-scrolling layout):
   - Framework recommendation with pros/cons
   - Animation library recommendation
   - CSS approach
   - Content management approach
   - Deployment recommendation

5. **Top 5 Design Directions** — concrete blog concepts combining interaction mode + visual style + tech. Each with a 2-sentence description, target vibe, and why it works for a student portfolio/blog

Output in Chinese but keep technical terms, URLs, and code references in English.
`, {label: 'synthesize-report', phase: 'Synthesize'})

return { report, stats: { interactionCount: allInteractions.length, visualCount: allVisuals.length, techCount: allTech.length } }
