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

## Stack

React 18 + TypeScript · Vite · Tailwind CSS · React Router · lucide-react · Vercel Analytics

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
  lib/ui.ts     Shared helpers + palette context
```

## Develop

```bash
npm install
npm run dev
npm run build
```

`vercel.json` rewrites all routes to `index.html` so client-side routes work on refresh.
