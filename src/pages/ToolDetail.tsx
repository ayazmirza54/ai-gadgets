import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, Bookmark, Share2, Check, ChevronRight, ThumbsUp, Flag, Zap } from 'lucide-react';
import { toolBySlug, tools } from '../data/tools';
import { categoryBySlug } from '../data/categories';
import { prompts } from '../data/prompts';
import { ToolIcon } from '../components/ToolIcon';
import { ToolCard } from '../components/ToolCard';
import { PromptCard } from '../components/PromptCard';
import { Avatar, PriceTag, Rating, Verified } from '../components/Badges';
import NotFound from './NotFound';
import { compact, cx } from '../lib/ui';

const reviews = [
  { name: 'Aarav Shah', hue: 'bg-zap', rating: 5, when: '2 days ago', text: 'Replaced two other subscriptions for me. The output quality is consistently better and it’s fast.' },
  { name: 'Neha Gupta', hue: 'bg-aqua', rating: 4, when: '1 week ago', text: 'Great for day-to-day work. Wish the export options were a little richer, but the core is excellent.' },
  { name: 'Rohan Das', hue: 'bg-volt', rating: 5, when: '3 weeks ago', text: 'Onboarded my whole team in an afternoon. The templates are genuinely useful, not filler.' },
];

export default function ToolDetail() {
  const { slug = '' } = useParams();
  const tool = toolBySlug(slug);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<'overview' | 'reviews' | 'pricing'>('overview');
  if (!tool) return <NotFound />;

  const cat = categoryBySlug(tool.category);
  const similar = tools.filter((t) => t.category === tool.category && t.slug !== tool.slug).concat(tools.filter((t) => t.category !== tool.category)).slice(0, 3);
  const related = prompts.filter((p) => p.category === tool.category).slice(0, 2);
  const external = tool.url !== '#';

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-700/60">
        <div aria-hidden className={cx('absolute -top-48 left-0 h-96 w-[40rem] rounded-full bg-gradient-to-r opacity-20 blur-[120px]', tool.gradient)} />
        <div className="container-z relative pb-10 pt-8">
          <nav className="flex items-center gap-1.5 text-xs text-ink-400">
            <Link to="/tools" className="hover:text-white">Marketplace</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to={`/tools?category=${tool.category}`} className="hover:text-white">{cat?.name}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-ink-200">{tool.name}</span>
          </nav>

          <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-start gap-5">
              <ToolIcon tool={tool} size="xl" />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="h-display text-4xl sm:text-5xl">{tool.name}</h1>
                  {tool.verified && <Verified />}
                </div>
                <p className="mt-2 max-w-xl text-lg text-ink-300">{tool.tagline}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                  <Rating value={tool.rating} reviews={tool.reviews} />
                  <span className="text-ink-400">{compact(tool.saves)} saves</span>
                  <PriceTag pricing={tool.pricing} />
                  <span className="text-ink-400">by <span className="text-ink-200">{tool.maker}</span></span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setSaved((s) => !s)} className={cx('btn-outline', saved && 'border-zap/50 text-zap')}>
                <Bookmark className={cx('h-4 w-4', saved && 'fill-zap')} /> {saved ? 'Saved' : 'Save'}
              </button>
              <button className="btn-outline h-10 w-10 p-0" aria-label="Share"><Share2 className="h-4 w-4" /></button>
              <a href={external ? tool.url : undefined} target="_blank" rel="noreferrer" className="btn-zap btn-lg">
                Try {tool.name.split(' ')[0]} <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-10 flex gap-6 border-b border-ink-700/0">
            {(['overview', 'reviews', 'pricing'] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={cx('relative pb-3 text-sm capitalize transition', tab === t ? 'text-white' : 'text-ink-400 hover:text-ink-200')}>
                {t}{t === 'reviews' && <span className="ml-1.5 text-ink-500">{compact(tool.reviews)}</span>}
                {tab === t && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-zap" />}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container-z mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          {tab === 'overview' && (
            <>
              <div className="card overflow-hidden">
                <div className={cx('relative aspect-[16/9] bg-gradient-to-br', tool.gradient)}>
                  {tool.thumbnail ? (
                    <img src={tool.thumbnail} alt={`${tool.name} preview`} className="h-full w-full object-cover object-top" onError={(e) => (e.currentTarget.style.display = 'none')} />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center">
                      <tool.icon className="h-24 w-24 text-ink-950/70" strokeWidth={1.5} />
                    </div>
                  )}
                </div>
              </div>
              <h2 className="h-display mt-12 text-3xl">About {tool.name}</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-300">{tool.description}</p>
              <h3 className="mt-10 font-display text-xl font-semibold">Key features</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {tool.features.map((f) => (
                  <li key={f} className="card flex items-center gap-3 p-4 text-sm">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-zap/10"><Check className="h-4 w-4 text-zap" /></span>{f}
                  </li>
                ))}
              </ul>
              {related.length > 0 && (
                <>
                  <h3 className="mt-14 font-display text-xl font-semibold">Prompts that pair well</h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">{related.map((p) => <PromptCard key={p.id} prompt={p} />)}</div>
                </>
              )}
            </>
          )}

          {tab === 'reviews' && (
            <div>
              <div className="card flex flex-col gap-8 p-6 sm:flex-row sm:items-center">
                <div className="text-center sm:w-40">
                  <p className="h-display text-6xl">{tool.rating.toFixed(1)}</p>
                  <Rating value={tool.rating} className="mt-2 justify-center" />
                  <p className="mt-1 text-xs text-ink-400">{tool.reviews.toLocaleString('en-IN')} reviews</p>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((s, i) => {
                    const pct = [72, 19, 6, 2, 1][i];
                    return (
                      <div key={s} className="flex items-center gap-3 text-xs text-ink-400">
                        <span className="w-3">{s}</span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-800"><div className="h-full rounded-full bg-zap" style={{ width: `${pct}%` }} /></div>
                        <span className="w-8 text-right">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {reviews.map((r) => (
                  <div key={r.name} className="card p-6">
                    <div className="flex items-center gap-3">
                      <Avatar name={r.name} hue={r.hue} size="h-9 w-9 text-xs" />
                      <div>
                        <p className="text-sm font-medium">{r.name}</p>
                        <p className="text-xs text-ink-400">{r.when}</p>
                      </div>
                      <Rating value={r.rating} className="ml-auto" />
                    </div>
                    <p className="mt-4 text-ink-300">{r.text}</p>
                    <div className="mt-4 flex gap-4 text-xs text-ink-400">
                      <button className="inline-flex items-center gap-1 hover:text-white"><ThumbsUp className="h-3.5 w-3.5" /> Helpful</button>
                      <button className="inline-flex items-center gap-1 hover:text-white"><Flag className="h-3.5 w-3.5" /> Report</button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-outline mt-6 w-full">Write a review</button>
            </div>
          )}

          {tab === 'pricing' && (
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { n: 'Starter', p: tool.pricing === 'Paid' ? tool.priceLabel : 'Free', f: ['Core features', 'Community support', 'Limited credits'] },
                { n: 'Pro', p: tool.pricing === 'Free' ? 'Free' : tool.priceLabel.replace('From ', ''), f: ['Everything in Starter', 'Unlimited usage', 'Priority models'], hot: true },
                { n: 'Team', p: 'Contact', f: ['Shared workspaces', 'SSO & admin', 'Dedicated support'] },
              ].map((t) => (
                <div key={t.n} className={cx('card p-6', t.hot && 'border-zap/40')}>
                  <p className="text-sm text-ink-300">{t.n}</p>
                  <p className="h-display mt-3 text-3xl">{t.p}</p>
                  <ul className="mt-6 space-y-2 text-sm text-ink-300">
                    {t.f.map((x) => <li key={x} className="flex gap-2"><Check className="h-4 w-4 text-zap" />{x}</li>)}
                  </ul>
                </div>
              ))}
              <p className="text-xs text-ink-500 md:col-span-3">Pricing is provided by the maker and may change. Last verified this month.</p>
            </div>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-5">
            <p className="eyebrow mb-4">At a glance</p>
            <dl className="space-y-3 text-sm">
              {[
                ['Category', cat?.name],
                ['Pricing', tool.priceLabel],
                ['Models', tool.models.join(', ')],
                ['Maker', tool.maker],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4"><dt className="text-ink-400">{k}</dt><dd className="text-right text-ink-100">{v}</dd></div>
              ))}
            </dl>
            <div className="mt-5 flex flex-wrap gap-1.5">{tool.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
          </div>
          <div className="card relative overflow-hidden p-5">
            <div aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-zap/15 blur-2xl" />
            <Zap className="h-5 w-5 fill-zap text-zap" />
            <p className="mt-3 font-display text-lg font-semibold">Is this your tool?</p>
            <p className="mt-1 text-sm text-ink-400">Claim the listing to update details, reply to reviews and see analytics.</p>
            <Link to="/submit" className="btn-outline mt-4 w-full">Claim listing</Link>
          </div>
        </aside>
      </div>

      <section className="container-z mt-24">
        <h2 className="h-display mb-8 text-3xl">Similar tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{similar.map((t) => <ToolCard key={t.slug} tool={t} />)}</div>
      </section>
    </>
  );
}
