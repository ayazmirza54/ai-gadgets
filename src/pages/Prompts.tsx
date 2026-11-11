import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Flame, Sparkles, Trophy, Award, ArrowRight, PenLine } from 'lucide-react';
import { prompts } from '../data/prompts';
import { categories } from '../data/categories';
import { PromptCard } from '../components/PromptCard';
import { PageHero, EmptyState } from '../components/Section';
import { Avatar } from '../components/Badges';
import { compact, cx } from '../lib/ui';

const tabs = [
  { k: 'trending', l: 'Trending', i: Flame },
  { k: 'new', l: 'New', i: Sparkles },
  { k: 'top', l: 'Most used', i: Trophy },
  { k: 'picks', l: 'Staff picks', i: Award },
] as const;

const modelsList = ['All', ...Array.from(new Set(prompts.map((p) => p.model)))];

export default function Prompts() {
  const [tab, setTab] = useState<(typeof tabs)[number]['k']>('trending');
  const [q, setQ] = useState('');
  const [model, setModel] = useState('All');
  const [cat, setCat] = useState('all');
  const [price, setPrice] = useState<'all' | 'free' | 'paid'>('all');

  const list = useMemo(() => {
    const s = q.toLowerCase();
    let r = prompts.filter(
      (p) =>
        (!s || [p.title, p.description, ...p.tags].some((x) => x.toLowerCase().includes(s))) &&
        (model === 'All' || p.model === model) &&
        (cat === 'all' || p.category === cat) &&
        (price === 'all' || (price === 'free' ? !p.price : p.price > 0)),
    );
    if (tab === 'picks') r = r.filter((p) => p.staffPick);
    return [...r].sort((a, b) =>
      tab === 'new' ? Number(!!b.isNew) - Number(!!a.isNew) : tab === 'top' ? b.uses - a.uses : b.likes - a.likes,
    );
  }, [tab, q, model, cat, price]);

  const creators = Object.values(
    prompts.reduce<Record<string, { name: string; handle: string; hue: string; likes: number; count: number }>>((acc, p) => {
      const c = (acc[p.author.handle] ??= { ...p.author, likes: 0, count: 0 });
      c.likes += p.likes;
      c.count += 1;
      return acc;
    }, {}),
  ).sort((a, b) => b.likes - a.likes).slice(0, 5);

  return (
    <>
      <PageHero
        eyebrow="Prompt Hub"
        title={<>Prompts that <span className="text-zap">just work.</span></>}
        subtitle="Browse, copy and remix 10,000+ prompts for writing, code, images, video and agents. Fill in the blanks and go."
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-ink-600 bg-ink-900/90 p-1.5 pl-4 focus-within:border-zap/50 sm:max-w-xl">
            <Search className="h-5 w-5 shrink-0 text-ink-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search prompts…" className="h-11 min-w-0 flex-1 bg-transparent text-[15px] placeholder:text-ink-400 focus:outline-none" />
          </div>
          <Link to="/submit?type=prompt" className="btn-zap btn-lg"><PenLine className="h-4 w-4" /> Publish a prompt</Link>
        </div>
        <div className="scrollbar-none -mx-4 mt-6 flex gap-2 overflow-x-auto px-4">
          {modelsList.map((m) => (
            <button key={m} onClick={() => setModel(m)} className={cx('chip shrink-0', model === m && 'chip-active')}>{m}</button>
          ))}
        </div>
      </PageHero>

      <div className="container-z mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <div className="flex rounded-full border border-ink-700 bg-ink-900 p-1">
              {tabs.map((t) => (
                <button key={t.k} onClick={() => setTab(t.k)} className={cx('inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition', tab === t.k ? 'bg-white text-ink-950' : 'text-ink-300 hover:text-white')}>
                  <t.i className="h-3.5 w-3.5" /> <span className="hidden sm:inline">{t.l}</span>
                </button>
              ))}
            </div>
            <div className="ml-auto flex gap-2">
              <select value={cat} onChange={(e) => setCat(e.target.value)} className="rounded-full border border-ink-700 bg-ink-900 px-3 py-1.5 text-xs text-ink-200 focus:outline-none">
                <option value="all">All categories</option>
                {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
              <select value={price} onChange={(e) => setPrice(e.target.value as typeof price)} className="rounded-full border border-ink-700 bg-ink-900 px-3 py-1.5 text-xs text-ink-200 focus:outline-none">
                <option value="all">Free & paid</option>
                <option value="free">Free only</option>
                <option value="paid">Premium</option>
              </select>
            </div>
          </div>
          {list.length ? (
            <div className="grid gap-4 sm:grid-cols-2">{list.map((p) => <PromptCard key={p.id} prompt={p} />)}</div>
          ) : (
            <EmptyState title="No prompts found" body="Nobody has written this one yet. Want to be first?" action={<Link to="/submit?type=prompt" className="btn-zap">Publish a prompt</Link>} />
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-5">
            <p className="eyebrow mb-4">Top creators this month</p>
            <ol className="space-y-3">
              {creators.map((c, i) => (
                <li key={c.handle} className="flex items-center gap-3">
                  <span className="w-4 font-mono text-xs text-ink-500">{i + 1}</span>
                  <Avatar name={c.name} hue={c.hue} size="h-8 w-8 text-[11px]" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-ink-400">@{c.handle} · {c.count} prompts</p>
                  </div>
                  <span className="text-xs text-ink-300">{compact(c.likes)}♥</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-zap p-5 text-ink-950">
            <p className="font-display text-xl font-semibold leading-tight">Turn your best prompts into income.</p>
            <p className="mt-2 text-sm text-ink-800">Set a price, we handle payments. Keep 85%.</p>
            <Link to="/submit?type=prompt" className="btn mt-4 bg-ink-950 text-white hover:bg-ink-800">Start selling <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="card p-5">
            <p className="eyebrow mb-3">Popular tags</p>
            <div className="flex flex-wrap gap-1.5">
              {Array.from(new Set(prompts.flatMap((p) => p.tags))).slice(0, 14).map((t) => (
                <button key={t} onClick={() => setQ(t)} className="chip hover:border-ink-500 hover:text-white">#{t.toLowerCase().replace(/\s/g, '')}</button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
