import { tools, toolBySlug } from '../data/tools';
import { prompts, promptById } from '../data/prompts';
import { categoryBySlug } from '../data/categories';

export const SITE = {
  name: 'Zapp',
  url: 'https://tryzapp.in',
  ogImage: 'https://tryzapp.in/og-image.jpg',
  ogImageAlt: 'Zapp — Everything AI. One zap away. AI tools, Prompt Hub, agents and learning at tryzapp.in',
  defaultTitle: 'Zapp — The marketplace for everything AI',
  defaultDescription:
    'Discover 2,400+ reviewed AI tools, copy battle-tested prompts, deploy ready-made agents and learn what’s new in AI — all in one marketplace.',
};

export type PageMeta = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>[];
};

const t = (s: string) => `${s} | Zapp`;

const breadcrumb = (items: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: SITE.url + path,
  })),
});

const homeLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/android-chrome-512x512.png`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/tools?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  },
];

const staticPages: Record<string, Omit<PageMeta, 'path'>> = {
  '/': { title: SITE.defaultTitle, description: SITE.defaultDescription, jsonLd: homeLd },
  '/tools': {
    title: t('AI Tools Marketplace — 2,400+ reviewed AI tools'),
    description:
      'Browse hand-reviewed AI tools for writing, coding, images, video, audio, marketing, research and agents. Compare pricing, models and ratings.',
  },
  '/prompts': {
    title: t('Prompt Hub — copy, remix & sell AI prompts'),
    description:
      'Thousands of fill-in-the-blank prompts for ChatGPT, Claude, Gemini, Midjourney and Flux. Copy for free, remix, or sell your own.',
  },
  '/agents': {
    title: t('AI Agents — ready-made agents that do the work'),
    description:
      'Deploy ready-made AI agents for email, research, support, content and recruiting. Connect your apps and let them run.',
  },
  '/learn': {
    title: t('Learn AI — guides, build logs & deep dives'),
    description: 'Hands-on AI guides, build logs and deep dives from people shipping AI products every day.',
  },
  '/pricing': {
    title: t('Pricing — Free, Pro & Creator plans'),
    description: 'Start free. Upgrade to Pro for premium prompts and the playground, or Creator to sell tools, prompts and agents and keep 90%.',
  },
  '/submit': {
    title: t('Submit an AI tool, prompt or agent'),
    description: 'List your AI tool, prompt or agent on Zapp for free and reach 180k makers a month. Keep 85% of paid sales.',
  },
  '/signin': { title: t('Sign in'), description: 'Sign in or create your Zapp account.', noindex: true },
};

export function metaFor(pathname: string): PageMeta {
  const path = pathname.replace(/\/+$/, '') || '/';
  const fixed = staticPages[path];
  if (fixed) {
    const crumbs = path === '/' ? [] : [breadcrumb([['Home', '/'], [fixed.title.replace(' | Zapp', '').split(' — ')[0], path]])];
    return { ...fixed, path, jsonLd: [...(fixed.jsonLd ?? []), ...crumbs] };
  }

  const toolMatch = path.match(/^\/tools\/([^/]+)$/);
  if (toolMatch) {
    const tool = toolBySlug(toolMatch[1]);
    if (tool) {
      const cat = categoryBySlug(tool.category);
      return {
        path,
        title: t(`${tool.name} — ${tool.tagline}`),
        description: `${tool.description} Pricing: ${tool.priceLabel}. Works with ${tool.models.join(', ')}.`.slice(0, 300),
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: tool.name,
            description: tool.description,
            applicationCategory: `${cat?.name ?? 'AI'} application`,
            operatingSystem: 'Web',
            url: SITE.url + path,
          },
          breadcrumb([['Home', '/'], ['AI Tools', '/tools'], [tool.name, path]]),
        ],
      };
    }
  }

  const promptMatch = path.match(/^\/prompts\/([^/]+)$/);
  if (promptMatch) {
    const p = promptById(promptMatch[1]);
    if (p) {
      return {
        path,
        title: t(`${p.title} — ${p.model} prompt`),
        description: `${p.description} A ${p.price ? 'premium' : 'free'} ${p.model} prompt by @${p.author.handle} on Zapp Prompt Hub.`,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: p.title,
            description: p.description,
            author: { '@type': 'Person', name: p.author.name },
            keywords: p.tags.join(', '),
            url: SITE.url + path,
          },
          breadcrumb([['Home', '/'], ['Prompt Hub', '/prompts'], [p.title, path]]),
        ],
      };
    }
  }

  return { path, title: t('Page not found'), description: SITE.defaultDescription, noindex: true };
}

/** Every indexable URL, used for prerendering and sitemap.xml. */
export function allRoutes(): string[] {
  return [
    ...Object.keys(staticPages),
    ...tools.map((x) => `/tools/${x.slug}`),
    ...prompts.map((x) => `/prompts/${x.id}`),
  ];
}
