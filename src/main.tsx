import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import App from './App';
import './index.css';

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  </StrictMode>
);

const root = document.getElementById('root')!;
// Pages are prerendered at build time; hydrate them instead of re-rendering from scratch.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
