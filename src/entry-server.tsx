import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { metaFor, allRoutes } from './seo/meta';
import { headTags } from './seo/head';

export function render(url: string) {
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
  return { html, head: headTags(metaFor(url)) };
}

export { allRoutes };
