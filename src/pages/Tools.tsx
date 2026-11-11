import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, LayoutGrid, List, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { tools, type Pricing } from '../data/tools';
import { categories, categoryBySlug } from '../data/categories';
import { ToolCard } from '../components/ToolCard';
import { PageHero, EmptyState } from '../components/Section';
import { cx } from '../lib/ui';

const pricings: Pricing[] = ['Free', 'Freemium', 'Paid'];
const sorts = { trending: 'Trending', rating: 'Top rated', new: 'Newest', saves: 'Most saved' } as const;
const allModels = Array.from(new Set(tools.flatMap((t) => t.models))).sort();

export default function Tools() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const category = params.get('category') ?? 'all';
  const sort = (params.get('sort') as keyof typeof sorts) ?? 'trending';
  const [pricing, setPricing] = useState<Pricing[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [mobileFilters, setMobileFilters] = useState(false);

  const set = (k: string, v: string) => {
    const next = new URLSearchParams(params);
    if (!v || v === 'all') next.delete(k); else next.set(k, v);
    setParams(next, { replace: true });
  };

  const toggle = <T,>(arr: T[], v: T, fn: (x: T[]) => void) => fn(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const list = useMemo(() => {
    const s = q.toLowerCase();
    const r = tools.filter(
      (t) =>
        (!s || [t.name, t.tagline, t.category, ...t.tags].some((x) => x.toLowerCase().includes(s))) &&
        (category === 'all' || t.category === category) &&
        (!pricing.length || pricing.includes(t.pricing)) &&
        (!models.length || t.models.some((m) => models.includes(m))),
    );
    return r.sort((a, b) =>
      sort === 'rating' ? b.rating - a.rating
        : sort === 'saves' ? b.saves - a.saves
          : sort === 'new' ? Number(!!b.isNew) - Number(!!a.isNew)
            : Number(!!b.trending) - Number(!!a.trending) || b.saves - a.saves,
    );
  }, [q, category, pricing, models, sort]);

  const activeCount = pricing.length + models.length + (category !== 'all' ? 1 : 0);
  const cat = categoryBySlug(category);

  const filters = (
    <div className="space-y-8">
      <FilterGroup title="Category">
        <FilterRow active={category === 'all'} onClick={() => set('category', 'all')} label="All categories" count={tools.length} />
        {categories.map((c) => (
          <FilterRow
            key={c.slug}
            active={category === c.slug}
            onClick={() => set('category', c.slug)}
            label={c.name}
            icon={<c.icon className={cx('h-4 w-4', c.tint)} />}
            count={tools.filter((t) => t.category === c.slug).length}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Pricing">
        <div className="flex flex-wrap gap-2">
          {pricings.map((p) => (
            <button key={p} onClick={() => toggle(pricing, p, setPricing)} className={cx('chip', pricing.includes(p) && 'chip-active')}>{p}</button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Works with">
        <div className="flex flex-wrap gap-2">
          {allModels.map((m) => (
            <button key={m} onClick={() => toggle(models, m, setModels)} className={cx('chip', models.includes(m) && 'chip-active')}>{m}</button>
          ))}
        </div>
      </FilterGroup>
      {activeCount > 0 && (
        <button
          onClick={() => { setPricing([]); setModels([]); set('category', 'all'); }}
          className="text-xs text-ink-400 underline-offset-4 hover:text-white hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <>
      <PageHero
        eyebrow="AI Tools Marketplace"
        title={cat ? <>{cat.name} <span className="text-ink-500">AI tools</span></> : <>Every AI tool, <span className="text-ink-500">reviewed.</span></>}
        subtitle={cat ? cat.blurb + ' — hand-picked and rated by the community.' : 'Search 2,400+ hand-reviewed tools by what you want to get done, not by buzzwords.'}
      >
        <div className="mt-8 flex max-w-2xl items-center gap-3 rounded-2xl border border-ink-600 bg-ink-900/90 p-1.5 pl-4 focus-within:border-zap/50">
          <Search className="h-5 w-5 shrink-0 text-ink-400" />
          <input
            value={q}
            onChange={(e) => set('q', e.target.value)}
            placeholder="What do you want to do with AI?"
            className="h-11 min-w-0 flex-1 bg-transparent text-[15px] placeholder:text-ink-400 focus:outline-none"
          />
          {q && <button onClick={() => set('q', '')} className="btn-ghost h-8 w-8 p-0" aria-label="Clear"><X className="h-4 w-4" /></button>}
        </div>
      </PageHero>

      <div className="container-z mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">{filters}</div>
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <p className="text-sm text-ink-400"><span className="font-medium text-white">{list.length}</span> tools</p>
            <button onClick={() => setMobileFilters(true)} className="chip py-1.5 lg:hidden">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Filters {activeCount > 0 && <span className="rounded-full bg-zap px-1.5 text-[10px] text-ink-950">{activeCount}</span>}
            </button>
            <div className="ml-auto flex items-center gap-2">
              <label className="relative">
                <span className="sr-only">Sort</span>
                <select
                  value={sort}
                  onChange={(e) => set('sort', e.target.value)}
                  className="appearance-none rounded-full border border-ink-700 bg-ink-900 py-1.5 pl-3 pr-8 text-xs text-ink-200 focus:border-zap/50 focus:outline-none"
                >
                  {Object.entries(sorts).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400" />
              </label>
              <div className="flex rounded-full border border-ink-700 bg-ink-900 p-0.5">
                {(['grid', 'list'] as const).map((l) => (
                  <button key={l} onClick={() => setLayout(l)} className={cx('grid h-7 w-7 place-items-center rounded-full', layout === l ? 'bg-white/10 text-white' : 'text-ink-400')} aria-label={`${l} view`}>
                    {l === 'grid' ? <LayoutGrid className="h-3.5 w-3.5" /> : <List className="h-3.5 w-3.5" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {list.length === 0 ? (
            <EmptyState title="No tools match… yet" body="Try a broader search or clear a filter. Know a tool we’re missing? Submit it." />
          ) : layout === 'grid' ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((t) => <ToolCard key={t.slug} tool={t} />)}
            </div>
          ) : (
            <div className="grid gap-3">
              {list.map((t) => <ToolCard key={t.slug} tool={t} layout="list" />)}
            </div>
          )}
        </div>
      </div>

      {mobileFilters && (
        <div className="fixed inset-0 z-50 bg-ink-950/70 backdrop-blur-sm lg:hidden" onClick={() => setMobileFilters(false)}>
          <div className="absolute inset-y-0 right-0 w-[86%] max-w-sm overflow-y-auto border-l border-ink-700 bg-ink-900 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <p className="font-display text-xl font-semibold">Filters</p>
              <button onClick={() => setMobileFilters(false)} className="btn-ghost h-9 w-9 p-0" aria-label="Close"><X className="h-5 w-5" /></button>
            </div>
            {filters}
            <button onClick={() => setMobileFilters(false)} className="btn-zap mt-8 w-full">Show {list.length} tools</button>
          </div>
        </div>
      )}
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-3">{title}</p>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function FilterRow({ active, onClick, label, icon, count }: { active: boolean; onClick: () => void; label: string; icon?: React.ReactNode; count: number }) {
  return (
    <button
      onClick={onClick}
      className={cx('flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-sm transition', active ? 'bg-white/[.06] text-white' : 'text-ink-300 hover:bg-white/[.03] hover:text-white')}
    >
      {icon}
      <span className="flex-1">{label}</span>
      <span className="font-mono text-[11px] text-ink-500">{count}</span>
    </button>
  );
}
