import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CornerDownLeft, Wrench, MessageSquareText, LayoutGrid, ArrowRight } from 'lucide-react';
import { tools } from '../data/tools';
import { prompts } from '../data/prompts';
import { categories } from '../data/categories';
import { ToolIcon } from './ToolIcon';
import { cx } from '../lib/ui';

type Item = { id: string; label: string; hint: string; to: string; group: string; render: () => JSX.Element };

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const items = useMemo<Item[]>(() => {
    const s = q.trim().toLowerCase();
    const match = (...f: string[]) => !s || f.some((x) => x.toLowerCase().includes(s));
    const t = tools.filter((x) => match(x.name, x.tagline, x.category)).slice(0, s ? 6 : 4).map((x) => ({
      id: 't' + x.slug, label: x.name, hint: x.tagline, to: `/tools/${x.slug}`, group: 'Tools',
      render: () => <ToolIcon tool={x} size="sm" />,
    }));
    const p = prompts.filter((x) => match(x.title, x.description, x.category, x.model)).slice(0, s ? 5 : 3).map((x) => ({
      id: 'p' + x.id, label: x.title, hint: `${x.model} · @${x.author.handle}`, to: `/prompts/${x.id}`, group: 'Prompts',
      render: () => <span className="grid h-9 w-9 place-items-center rounded-[10px] border border-ink-700 bg-ink-850"><MessageSquareText className="h-4 w-4 text-zap" /></span>,
    }));
    const c = categories.filter((x) => match(x.name, x.blurb)).slice(0, s ? 4 : 0).map((x) => ({
      id: 'c' + x.slug, label: x.name, hint: x.blurb, to: `/tools?category=${x.slug}`, group: 'Categories',
      render: () => <span className="grid h-9 w-9 place-items-center rounded-[10px] border border-ink-700 bg-ink-850"><x.icon className={cx('h-4 w-4', x.tint)} /></span>,
    }));
    return [...t, ...p, ...c];
  }, [q]);

  useEffect(() => {
    if (open) {
      setQ('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 10);
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => { setActive(0); }, [q]);

  if (!open) return null;

  const go = (to: string) => { onClose(); navigate(to); };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, items.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    if (e.key === 'Enter') {
      if (items[active]) go(items[active].to);
      else if (q) go(`/tools?q=${encodeURIComponent(q)}`);
    }
    if (e.key === 'Escape') onClose();
  };

  let lastGroup = '';

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-ink-950/70 p-4 pt-[12vh] backdrop-blur-sm" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-label="Search"
        className="w-full max-w-xl animate-fade-up overflow-hidden rounded-2xl border border-ink-600 bg-ink-900 shadow-2xl shadow-black/60"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-ink-700 px-4">
          <Search className="h-5 w-5 text-ink-400" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="Search tools, prompts, categories…"
            className="h-14 flex-1 bg-transparent text-[15px] text-white placeholder:text-ink-400 focus:outline-none"
          />
          <kbd className="rounded-md border border-ink-600 px-1.5 py-0.5 font-mono text-[10px] text-ink-400">ESC</kbd>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-2">
          {items.length === 0 && (
            <button onClick={() => go(`/tools?q=${encodeURIComponent(q)}`)} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-ink-300 hover:bg-white/5">
              <Search className="h-4 w-4" /> Search marketplace for “{q}” <ArrowRight className="ml-auto h-4 w-4" />
            </button>
          )}
          {items.map((it, i) => {
            const header = it.group !== lastGroup ? it.group : null;
            lastGroup = it.group;
            return (
              <div key={it.id}>
                {header && <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[.16em] text-ink-500">{header}</p>}
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(it.to)}
                  className={cx('flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left', active === i && 'bg-white/[.06]')}
                >
                  {it.render()}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-ink-100">{it.label}</span>
                    <span className="block truncate text-xs text-ink-400">{it.hint}</span>
                  </span>
                  {active === i && <CornerDownLeft className="h-4 w-4 text-ink-400" />}
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-4 border-t border-ink-700 px-4 py-2.5 text-[11px] text-ink-400">
          <span className="inline-flex items-center gap-1"><Wrench className="h-3 w-3" /> {tools.length} tools</span>
          <span className="inline-flex items-center gap-1"><MessageSquareText className="h-3 w-3" /> {prompts.length} prompts</span>
          <span className="inline-flex items-center gap-1"><LayoutGrid className="h-3 w-3" /> {categories.length} categories</span>
          <span className="ml-auto hidden sm:inline">↑↓ to navigate · ↵ to open</span>
        </div>
      </div>
    </div>
  );
}
