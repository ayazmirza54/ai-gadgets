import { matchRoutes } from 'react-router-dom';
import { lazyPage } from './lib/lazyPage';

// Each page is its own chunk. `src` must match the file path so the prerender
// step can add <link rel="modulepreload"> for the right chunk.
export const pages = {
  home: { src: 'src/pages/Home.tsx', C: lazyPage(() => import('./pages/Home')) },
  tools: { src: 'src/pages/Tools.tsx', C: lazyPage(() => import('./pages/Tools')) },
  tool: { src: 'src/pages/ToolDetail.tsx', C: lazyPage(() => import('./pages/ToolDetail')) },
  prompts: { src: 'src/pages/Prompts.tsx', C: lazyPage(() => import('./pages/Prompts')) },
  prompt: { src: 'src/pages/PromptDetail.tsx', C: lazyPage(() => import('./pages/PromptDetail')) },
  agents: { src: 'src/pages/Agents.tsx', C: lazyPage(() => import('./pages/Agents')) },
  learn: { src: 'src/pages/Learn.tsx', C: lazyPage(() => import('./pages/Learn')) },
  submit: { src: 'src/pages/Submit.tsx', C: lazyPage(() => import('./pages/Submit')) },
  pricing: { src: 'src/pages/Pricing.tsx', C: lazyPage(() => import('./pages/Pricing')) },
  signin: { src: 'src/pages/SignIn.tsx', C: lazyPage(() => import('./pages/SignIn')) },
  notFound: { src: 'src/pages/NotFound.tsx', C: lazyPage(() => import('./pages/NotFound')) },
};
export type PageKey = keyof typeof pages;

export const routeTable: { path: string; page: PageKey }[] = [
  { path: '/', page: 'home' },
  { path: '/tools', page: 'tools' },
  { path: '/tools/:slug', page: 'tool' },
  { path: '/prompts', page: 'prompts' },
  { path: '/prompts/:id', page: 'prompt' },
  { path: '/agents', page: 'agents' },
  { path: '/learn', page: 'learn' },
  { path: '/submit', page: 'submit' },
  { path: '/pricing', page: 'pricing' },
  { path: '/signin', page: 'signin' },
  { path: '*', page: 'notFound' },
];

function pageFor(pathname: string) {
  const match = matchRoutes(routeTable, pathname)?.[0];
  return pages[(match?.route as (typeof routeTable)[number] | undefined)?.page ?? 'notFound'];
}

/** Loads the chunk for a URL so it can be rendered or hydrated without suspending. */
export const preloadRoute = (pathname: string) => pageFor(pathname).C.preload();

/** Source file of the page for a URL (used by the prerender step). */
export const pageSourceFor = (pathname: string) => pageFor(pathname).src;

