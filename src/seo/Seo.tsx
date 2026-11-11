import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { metaFor, SITE } from './meta';

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

/** Keeps title, description, canonical, social tags and JSON-LD in sync with the current route. */
export function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const m = metaFor(pathname);
    const url = SITE.url + (m.path === '/' ? '' : m.path);
    document.title = m.title;
    setMeta('name', 'description', m.description);
    setMeta('name', 'robots', m.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:title', m.title);
    setMeta('property', 'og:description', m.description);
    setMeta('name', 'twitter:title', m.title);
    setMeta('name', 'twitter:description', m.description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    document.head.querySelectorAll('script[data-seo]').forEach((s) => s.remove());
    for (const o of m.jsonLd ?? []) {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.dataset.seo = '';
      s.textContent = JSON.stringify(o);
      document.head.appendChild(s);
    }
  }, [pathname]);

  return null;
}
