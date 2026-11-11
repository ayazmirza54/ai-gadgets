import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Youtube, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';

const cols = [
  { title: 'Discover', links: [['Marketplace', '/tools'], ['Prompt Hub', '/prompts'], ['Agents', '/agents'], ['Collections', '/tools?sort=trending']] },
  { title: 'Create', links: [['Submit a tool', '/submit'], ['Sell prompts', '/submit?type=prompt'], ['Creator program', '/pricing'], ['API (soon)', '/pricing']] },
  { title: 'Learn', links: [['Articles', '/learn'], ['Prompt guides', '/learn'], ['AI news', '/learn'], ['Glossary', '/learn']] },
  { title: 'Company', links: [['About', '/'], ['Pricing', '/pricing'], ['Contact', '/'], ['Privacy', '/']] },
];

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-ink-700/70">
      <div className="container-z grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-ink-400">
            The marketplace for everything AI. Find the right tool, copy the perfect prompt, and ship faster.
          </p>
          <div className="mt-6 flex gap-2">
            {[Twitter, Github, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full border border-ink-700 text-ink-300 transition hover:border-zap/50 hover:text-zap" aria-label="Social link">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h2 className="eyebrow mb-4">{c.title}</h2>
            <ul className="space-y-2.5">
              {c.links.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-ink-300 transition-colors hover:text-white">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-z flex flex-col items-start justify-between gap-3 border-t border-ink-700/70 py-6 text-xs text-ink-400 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Zapp. Made with ⚡ in India.</p>
        <a href="https://tryzapp.in" className="inline-flex items-center gap-1 font-mono hover:text-zap">
          tryzapp.in <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>

      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        {/* Decorative wordmark drawn with CSS content so it isn't read as low-contrast text. */}
        <div className="h-display -mb-[0.18em] text-center text-[26vw] leading-none text-white/[.025] before:content-['zapp']" />
      </div>
    </footer>
  );
}
