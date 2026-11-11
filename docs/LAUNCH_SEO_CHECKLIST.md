# Post-launch SEO checklist

The 10 checks every new site should do in its first two weeks, and what's already handled in code.

**Status key:** ✅ done in code · 🔑 needs you to log in to a dashboard (one-time setup) · 🔁 recurring check

---

## One-time setup (≈30 minutes)

Do these first; most of the checks below depend on them.

1. **Google Search Console** — <https://search.google.com/search-console>
   - Add property → **URL prefix** → `https://tryzapp.in`
   - Choose **HTML tag**, copy only the `content` value, set it as `VITE_GOOGLE_SITE_VERIFICATION` in Vercel, redeploy, then click **Verify**.
   - (Or use the **Domain** property with a DNS TXT record — covers `www` and all subdomains.)
   - Sitemaps → submit `https://tryzapp.in/sitemap.xml`.
2. **Bing Webmaster Tools** — <https://www.bing.com/webmasters>
   - Fastest: **Import from Google Search Console** (no tag needed).
   - Or: HTML Meta Tag → set `VITE_BING_SITE_VERIFICATION` → redeploy → Verify.
   - Sitemaps → submit `https://tryzapp.in/sitemap.xml`.
3. **Microsoft Clarity** — <https://clarity.microsoft.com> (free)
   - New project → copy the Project ID → set `VITE_CLARITY_PROJECT_ID` → redeploy.
4. **Vercel Speed Insights** — Vercel dashboard → this project → **Speed Insights** → Enable.
   (The code is already installed; it just needs switching on.)

After changing any `VITE_*` variable, trigger a redeploy — they're baked in at build time.

---

## The 10 checks

### 1. Indexing report 🔑🔁
Search Console → **Indexing → Pages**. Expect ~39 indexed URLs (matches `sitemap.xml`).
- "Discovered – currently not indexed" on important pages → open the page in **URL Inspection** → **Request indexing**.
- "Excluded by noindex" should only list `/signin` and 404s — that's intentional.

✅ In code: every route is prerendered to real HTML with its own title, description and canonical URL, so Google doesn't need to run JavaScript to see content. `sitemap.xml` is regenerated on every build.

### 2. Striking distance keywords 🔑🔁
Search Console → **Performance → Search results** → enable **Average position** → filter **Position > 10** (and < 21).
These are queries where you're on page 2. Improve the matching page: put the query in the title/H1/description, add a paragraph answering it, and link to it from the home page.

✅ In code: per-page titles/descriptions live in `src/seo/meta.ts` — edit them there.

### 3. Clarity recordings 🔑🔁
Clarity → **Recordings** and **Heatmaps**. Watch 10 sessions a week: look for rage clicks, dead clicks, and where people stop scrolling.

✅ In code: Clarity loads automatically once `VITE_CLARITY_PROJECT_ID` is set.

### 4. Bing sitemap 🔑
Submit `https://tryzapp.in/sitemap.xml` in Bing Webmaster Tools (see setup). Bing also powers ChatGPT search and DuckDuckGo, so this matters more than it looks.

✅ In code: `robots.txt` advertises the sitemap; a `<link rel="sitemap">` is in every page.

### 5. Core Web Vitals 🔑🔁
- Field data: Search Console → **Experience → Core Web Vitals** (needs some traffic first), and Vercel → **Speed Insights**.
- Lab check any time: <https://pagespeed.web.dev/?url=https://tryzapp.in>
- Targets: LCP < 2.5 s, INP < 200 ms, CLS < 0.1.

✅ In code: prerendered HTML, non-blocking web fonts, right-sized logo, zero layout shift. Lighthouse (mobile, at launch): Home 90 · Marketplace 98 · Prompt Hub 99 · Prompt page 100 · Pricing 99 for performance; 100 for accessibility and SEO on all of them.

### 6. Competitor keywords 🔁
Pick 3 competitors (other AI tool directories / prompt marketplaces). Free options:
- **Ahrefs Webmaster Tools / free Keyword Generator**, **Ubersuggest** (3 free lookups/day), or **Semrush** free tier.
- Google the competitor's brand + "alternative"; note the pages that rank.
Look for keywords they rank for that you have a page for (or should). Add those terms to the matching page's title/description in `src/seo/meta.ts`.

### 7. Free site audit 🔁
- **Bing Webmaster Tools → Site Scan** (free, crawls the whole site).
- **Ahrefs Webmaster Tools → Site Audit** (free once the site is verified).
- **PageSpeed Insights / Lighthouse** for single pages.

✅ Done at launch: Lighthouse found and we fixed low-contrast text, a skipped heading level, small tap targets, unlabeled controls, sub-12px text and render-blocking fonts.

### 8. Crawl stats 🔑🔁
Search Console → **Settings → Crawl stats**. Check monthly:
- Response codes should be mostly **200**. A spike in 404s means broken links; 5xx means hosting trouble.
- Average response time should stay low (Vercel static pages are usually < 100 ms).

✅ In code: unknown URLs return a real **404** status (not a soft 404), and every page is a static file.

### 9. AI citations 🔁
Check monthly whether AI assistants mention Zapp:
- Ask ChatGPT (search on), Perplexity, Gemini and Claude: "best AI tools directory", "where to find prompts for X", "Zapp tryzapp.in".
- Note which pages they cite and which competitors appear instead.

✅ In code:
- `robots.txt` explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended and Applebot-Extended.
- `llms.txt` gives AI crawlers a plain-English summary of the site and its key pages.
- Prerendered HTML matters most here: most AI crawlers don't run JavaScript.
- Structured data (JSON-LD): Organization, WebSite with site search, SoftwareApplication for tools, CreativeWork for prompts, and breadcrumbs.

### 10. Google Alerts 🔑
<https://www.google.com/alerts> — create alerts for:
- `"tryzapp"` and `"tryzapp.in"`
- `"Zapp" AI tools` (and your name, if you're the public face)
- each competitor's brand name

Set **How often: once a week**, **Sources: automatic**. Use mentions to ask for links back.

---

## Notes

- Ratings, review counts and usage numbers on the site are placeholders. They are deliberately **not** included in structured data — Google treats fake review markup as spam. Add `aggregateRating` only once ratings are real.
- When you add tools or prompts to `src/data/`, they're automatically prerendered and added to the sitemap on the next deploy.
