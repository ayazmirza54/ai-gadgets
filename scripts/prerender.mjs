// Renders every route to static HTML after `vite build`, so search engines and
// AI crawlers get full content and per-page meta without running JavaScript.
// Also writes sitemap.xml and a real 404 page.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const { render, allRoutes, pageSourceFor } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html is missing the <!--app-head--> or <!--app-html--> placeholder');
}

// Vite's manifest maps each page's source file to its chunk (and the chunks that one imports).
const manifestPath = path.join(dist, '.vite/manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const chunkFiles = (src, seen = new Set()) => {
  const entry = manifest[src];
  if (!entry || seen.has(src) || entry.isEntry) return [];
  seen.add(src);
  return [entry.file, ...(entry.imports ?? []).flatMap((i) => chunkFiles(i, seen))];
};

// Preload the latin files of the two fonts visible on first paint.
const assets = fs.readdirSync(path.join(dist, 'assets'));
const fontPreloads = [/^bricolage-grotesque-latin-wght-.*\.woff2$/, /^inter-latin-wght-.*\.woff2$/]
  .map((re) => assets.find((f) => re.test(f)))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`);
if (fontPreloads.length !== 2) throw new Error('expected 2 font files to preload, found ' + fontPreloads.length);

const page = async (url) => {
  const { html, head } = await render(url);
  const preloads = [...new Set(chunkFiles(pageSourceFor(url)))].map((f) => `<link rel="modulepreload" href="/${f}" />`);
  return template
    .replace('<!--app-head-->', [...fontPreloads, ...preloads, head].join('\n    '))
    .replace('<!--app-html-->', html);
};

const routes = allRoutes();
for (const url of routes) {
  // With cleanUrls on Vercel, /tools is served from tools.html.
  const file = url === '/' ? 'index.html' : `${url.slice(1)}.html`;
  const out = path.join(dist, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, await page(url));
}
fs.writeFileSync(path.join(dist, '404.html'), await page('/404'));

const SITE = 'https://tryzapp.in';
const today = new Date().toISOString().slice(0, 10);
const noindex = new Set(['/signin']);
const priority = (u) => (u === '/' ? '1.0' : u.split('/').length === 2 ? '0.8' : '0.6');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .filter((u) => !noindex.has(u))
  .map((u) => `  <url><loc>${SITE}${u === '/' ? '/' : u}</loc><lastmod>${today}</lastmod><priority>${priority(u)}</priority></url>`)
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
fs.rmSync(path.join(dist, '.vite'), { recursive: true, force: true });

console.log(`prerendered ${routes.length} routes + 404.html, sitemap.xml with ${routes.length - noindex.size} URLs`);
