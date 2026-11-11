import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import App from './App';
import { preloadRoute } from './routes';
import './index.css';

const app = (
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  </StrictMode>
);

const root = document.getElementById('root')!;
// Pages are prerendered at build time: load this page's chunk, then hydrate the existing HTML.
if (root.firstElementChild) preloadRoute(window.location.pathname).then(() => hydrateRoot(root, app));
else createRoot(root).render(app);
