// Renders every route to static HTML after `vite build`, so search engines and
// AI crawlers get full content and per-page meta without running JavaScript.
// Also writes sitemap.xml and a real 404 page.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const { render, allRoutes } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html is missing the <!--app-head--> or <!--app-html--> placeholder');
}

const page = (url) => {
  const { html, head } = render(url);
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
};

const routes = allRoutes();
for (const url of routes) {
  // With cleanUrls on Vercel, /tools is served from tools.html.
  const file = url === '/' ? 'index.html' : `${url.slice(1)}.html`;
  const out = path.join(dist, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(url));
}
fs.writeFileSync(path.join(dist, '404.html'), page('/404'));

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

console.log(`prerendered ${routes.length} routes + 404.html, sitemap.xml with ${routes.length - noindex.size} URLs`);
