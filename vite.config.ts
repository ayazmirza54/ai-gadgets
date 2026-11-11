import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Adds search-console verification tags and Microsoft Clarity to every page,
 * but only when their IDs are set (e.g. in Vercel → Settings → Environment Variables).
 */
function siteIntegrations(env: Record<string, string>): Plugin {
  const safe = (v: string | undefined) => (v && /^[\w-]+$/.test(v.trim()) ? v.trim() : '');
  const google = safe(env.VITE_GOOGLE_SITE_VERIFICATION);
  const bing = safe(env.VITE_BING_SITE_VERIFICATION);
  const clarity = safe(env.VITE_CLARITY_PROJECT_ID);
  return {
    name: 'site-integrations',
    transformIndexHtml() {
      const tags: { tag: string; attrs?: Record<string, string>; children?: string; injectTo: 'head' }[] = [];
      if (google) tags.push({ tag: 'meta', attrs: { name: 'google-site-verification', content: google }, injectTo: 'head' });
      if (bing) tags.push({ tag: 'meta', attrs: { name: 'msvalidate.01', content: bing }, injectTo: 'head' });
      if (clarity)
        tags.push({
          tag: 'script',
          children: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarity}");`,
          injectTo: 'head',
        });
      return tags;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), siteIntegrations(loadEnv(mode, process.cwd(), 'VITE_'))],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
}));
