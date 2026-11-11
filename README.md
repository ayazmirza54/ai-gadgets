# ⚡ Zapp — the marketplace for everything AI

**[tryzapp.in](https://tryzapp.in)** · AI tools marketplace, Prompt Hub, agents and learning — in one place.

> Status: **UI revamp**. Every screen is built and interactive on the client using mock data. Backend, auth, payments and persistence come next.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Landing: hero search, featured tools, platform bento, trending tools, categories, Prompt Hub showcase, creator CTA, articles, newsletter |
| `/tools` | Marketplace with category, pricing and model filters, sorting, grid/list views (URL-driven `?q=&category=&sort=`) |
| `/tools/:slug` | Tool detail: overview, reviews, pricing tabs, similar tools, paired prompts |
| `/prompts` | Prompt Hub: tabs (trending/new/most used/staff picks), model chips, category and price filters, top creators |
| `/prompts/:id` | Prompt detail: live fill-in-the-blank variables, copy, premium lock, “open in” model, discussion |
| `/agents` | Agents (early access) showcase |
| `/learn` | Articles and guides |
| `/submit` | Submit a tool, prompt or agent (with optional paid listing) |
| `/pricing` | Free / Pro / Creator plans, comparison table, FAQ |
| `/signin` | Auth screen (Google, GitHub, magic link) |

Global **⌘K / Ctrl+K** (or `/`) opens a command palette that searches tools, prompts and categories.

## SEO & analytics

- Every route is **prerendered to static HTML** at build time (`scripts/prerender.mjs`) with its own title, description, canonical URL and JSON-LD, then hydrated in the browser. Unknown URLs get a real 404 page.
- Per-page metadata lives in `src/seo/meta.ts`; `sitemap.xml` is generated from the same route list on every build.
- `public/robots.txt` allows search and AI crawlers; `public/llms.txt` summarises the site for AI assistants.
- Google / Bing verification tags and Microsoft Clarity are switched on by environment variables — see `.env.example`.
- Vercel Analytics and Speed Insights (Core Web Vitals) are installed.
- Post-launch checklist: [`docs/LAUNCH_SEO_CHECKLIST.md`](docs/LAUNCH_SEO_CHECKLIST.md).

## Stack

React 18 + TypeScript · Vite (with build-time prerendering) · Tailwind CSS · React Router · lucide-react · Vercel Analytics & Speed Insights

## Design system

- **Palette:** ink neutrals (`ink-950` → `ink-100`) with an electric `zap` lime accent, plus `volt`, `aqua` and `ember` supporting hues (`tailwind.config.js`)
- **Type:** Bricolage Grotesque (display), Inter (UI), JetBrains Mono (prompts & labels)
- **Primitives:** `.btn-zap`, `.btn-outline`, `.btn-ghost`, `.card`, `.chip`, `.input`, `.eyebrow`, `.h-display` in `src/index.css`

## Structure

```
src/
  components/   Navbar, Footer, CommandPalette, ToolCard, PromptCard, badges, section headers
  pages/        One file per route
  data/         Mock tools, prompts, categories, articles (replace with API later)
  lib/          Shared helpers, palette context, hydration-safe search params
  seo/          Per-page metadata, head tags, <Seo> sync component
  entry-server.tsx   Server render entry used by the prerender step
scripts/prerender.mjs   Writes static HTML for every route + sitemap.xml
```

## Develop

```bash
npm install
npm run dev
npm run build
```

`npm run build` builds the client, builds a server bundle, then prerenders every route into `dist/` (e.g. `dist/tools/querysmith-ai.html`). `vercel.json` turns on clean URLs so `/tools` serves `tools.html`.
