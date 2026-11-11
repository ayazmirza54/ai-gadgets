import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { preloadRoute, pageSourceFor } from './routes';
import { metaFor, allRoutes } from './seo/meta';
import { headTags } from './seo/head';

export async function render(url: string) {
  await preloadRoute(url);
  const html = renderToString(
    <StaticRouter location={url} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </StaticRouter>,
  );
  return { html, head: headTags(metaFor(url)) };
}

export { allRoutes, pageSourceFor };
