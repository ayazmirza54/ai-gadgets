import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, Menu, X, Plus } from 'lucide-react';
import { Logo } from './Logo';
import { usePalette, cx } from '../lib/ui';

const links = [
  { to: '/tools', label: 'Marketplace' },
  { to: '/prompts', label: 'Prompt Hub' },
  { to: '/agents', label: 'Agents' },
  { to: '/learn', label: 'Learn' },
  { to: '/pricing', label: 'Pricing' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { open: openPalette } = usePalette();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={cx(
        'sticky top-0 z-40 transition-all duration-300',
        scrolled ? 'border-b border-ink-700/70 bg-ink-950/75 backdrop-blur-xl' : 'border-b border-transparent',
      )}
    >
      <div className="container-z flex h-16 items-center gap-6">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cx(
                  'rounded-full px-3.5 py-1.5 text-sm transition-colors',
                  isActive ? 'bg-white/[.06] text-white' : 'text-ink-300 hover:text-white',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={openPalette}
            className="hidden items-center gap-2 rounded-full border border-ink-700 bg-ink-900/80 py-1.5 pl-3 pr-1.5 text-sm text-ink-400 transition-colors hover:border-ink-500 hover:text-ink-200 md:flex"
          >
            <Search className="h-4 w-4" />
            <span className="pr-6">Search tools, prompts…</span>
            <kbd className="rounded-md border border-ink-600 bg-ink-800 px-1.5 py-0.5 font-mono text-[10px] text-ink-300">⌘K</kbd>
          </button>
          <button onClick={openPalette} className="btn-ghost h-9 w-9 p-0 md:hidden" aria-label="Search">
            <Search className="h-[18px] w-[18px]" />
          </button>
          <Link to="/signin" className="btn-ghost hidden sm:inline-flex">
            Sign in
          </Link>
          <Link to="/submit" className="btn-zap hidden sm:inline-flex">
            <Plus className="h-4 w-4" strokeWidth={2.5} /> Submit
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="btn-ghost h-9 w-9 p-0 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-ink-700 bg-ink-950/95 backdrop-blur-xl lg:hidden">
          <nav className="container-z flex flex-col gap-1 py-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cx('rounded-xl px-3 py-3 font-display text-lg', isActive ? 'bg-white/5 text-white' : 'text-ink-200')
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link to="/signin" className="btn-outline">Sign in</Link>
              <Link to="/submit" className="btn-zap">Submit</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
