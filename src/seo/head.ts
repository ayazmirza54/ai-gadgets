import { SITE, type PageMeta } from './meta';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// JSON-LD sits inside <script>; escape "<" so a value can never close the tag.
const ld = (o: unknown) => JSON.stringify(o).replace(/</g, '\\u003c');

/** Head tags for a page. Prerendering writes these into HTML; <Seo> keeps them in sync on navigation. */
export function headTags(m: PageMeta): string {
  const url = SITE.url + (m.path === '/' ? '' : m.path);
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="${m.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:image" content="${SITE.ogImage}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(SITE.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${SITE.ogImage}" />`,
    `<meta name="twitter:image:alt" content="${esc(SITE.ogImageAlt)}" />`,
    ...(m.jsonLd ?? []).map((o) => `<script type="application/ld+json" data-seo>${ld(o)}</script>`),
  ].join('\n    ');
}
