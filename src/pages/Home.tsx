import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Search, Sparkles, TrendingUp, Clock, Star, MessageSquareText, Bot, BookOpen, Store,
  FlaskConical, IndianRupee, Wallet, ShieldCheck, Zap, ArrowUpRight, Mail,
} from 'lucide-react';
import { tools } from '../data/tools';
import { prompts } from '../data/prompts';
import { categories } from '../data/categories';
import { articles, newsTicker } from '../data/content';
import { ToolCard } from '../components/ToolCard';
import { PromptCard, PromptBody } from '../components/PromptCard';
import { ToolIcon } from '../components/ToolIcon';
import { Rating, Avatar } from '../components/Badges';
import { SectionHeader } from '../components/Section';
import { usePalette, cx } from '../lib/ui';

const trendingSearches = ['image generator', 'SQL', 'cold email', 'meeting notes', 'agents', 'voice clone'];

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Pillars />
      <TrendingTools />
      <Categories />
      <PromptShowcase />
      <CreatorCTA />
      <LearnStrip />
      <Newsletter />
    </>
  );
}

function Hero() {
  const { open } = usePalette();
  const [tab, setTab] = useState<'Tools' | 'Prompts' | 'Agents'>('Tools');
  const featured = tools.filter((t) => t.featured).slice(0, 3);

  return (
    <section className="noise relative overflow-hidden">
      <div className="bg-grid mask-fade-b absolute inset-0" aria-hidden />
      <div aria-hidden className="absolute left-1/2 top-[-18rem] h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-zap/[.10] blur-[120px]" />
      <div aria-hidden className="absolute right-[-10rem] top-40 h-[24rem] w-[24rem] rounded-full bg-volt/[.12] blur-[100px]" />

      <div className="container-z relative pb-20 pt-14 sm:pt-20 lg:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <Link
            to="/prompts"
            className="animate-fade-up group mx-auto inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-900/80 py-1 pl-1 pr-3 text-xs text-ink-300 backdrop-blur transition hover:border-ink-500"
          >
            <span className="rounded-full bg-zap px-2 py-0.5 font-semibold text-ink-950">New</span>
            Prompt Hub is live — buy, sell & remix prompts
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </Link>

          <h1 className="h-display mt-8 text-balance text-[3.4rem] sm:text-7xl lg:text-[6.5rem]">
            Everything AI.
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-zap via-[#14EF9A] to-aqua bg-clip-text text-transparent">One zap</span>
              <svg className="absolute -bottom-2 left-0 z-0 w-full text-aqua/40" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden>
                <path d="M2 9 C 60 2, 120 2, 160 6 S 260 11, 298 4" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>{' '}
            away.
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-balance text-lg text-ink-300 sm:text-xl">
            Discover 2,400+ AI tools, copy battle-tested prompts, deploy ready-made agents and stay ahead of what’s next — all in one marketplace.
          </p>

          {/* Search */}
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="mb-3 flex justify-center gap-1">
              {(['Tools', 'Prompts', 'Agents'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cx('rounded-full px-3.5 py-1 text-xs font-medium transition', tab === t ? 'bg-white text-ink-950' : 'text-ink-400 hover:text-white')}
                >
                  {t}
                </button>
              ))}
            </div>
            <button
              onClick={open}
              className="group flex w-full items-center gap-3 rounded-2xl border border-ink-600 bg-ink-900/90 p-2 pl-5 text-left shadow-[0_20px_80px_-20px_rgba(34,240,106,.22)] backdrop-blur transition hover:border-zap/50"
            >
              <Search className="h-5 w-5 text-ink-400" />
              <span className="flex-1 truncate text-[15px] text-ink-400">
                {tab === 'Tools' && 'Try “an AI that turns podcasts into shorts”'}
                {tab === 'Prompts' && 'Try “cold email for SaaS founders”'}
                {tab === 'Agents' && 'Try “an agent that triages my inbox”'}
              </span>
              <kbd className="hidden rounded-md border border-ink-600 px-1.5 py-0.5 font-mono text-xs text-ink-400 sm:block">⌘K</kbd>
              <span className="btn-zap rounded-xl px-5 py-2.5">Search</span>
            </button>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 text-ink-400"><TrendingUp className="h-3.5 w-3.5" /> Trending:</span>
              {trendingSearches.map((s) => (
                <Link key={s} to={`/tools?q=${encodeURIComponent(s)}`} className="chip hover:border-ink-500 hover:text-white">{s}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* Floating preview */}
        <div className="animate-fade-up relative mx-auto mt-20 max-w-5xl" style={{ animationDelay: '260ms' }}>
          <div className="absolute -inset-px rounded-[28px] bg-gradient-to-b from-ink-500/60 via-ink-700/30 to-transparent" aria-hidden />
          <div className="relative grid gap-4 rounded-[28px] bg-ink-900/90 p-4 backdrop-blur md:grid-cols-[1.25fr_1fr] md:p-5">
            <div className="card min-w-0 bg-ink-950/60 p-5">
              <div className="flex items-center justify-between">
                <p className="eyebrow"><Sparkles className="h-3 w-3 text-zap" /> Featured this week</p>
                <Link to="/tools" className="text-xs text-ink-400 hover:text-zap">Marketplace →</Link>
              </div>
              <ul className="mt-4 divide-y divide-ink-700/70">
                {featured.map((t, i) => (
                  <li key={t.slug}>
                    <Link to={`/tools/${t.slug}`} className="group flex items-center gap-4 py-3.5">
                      <span className="w-5 font-mono text-xs text-ink-400">0{i + 1}</span>
                      <ToolIcon tool={t} size="sm" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium text-ink-100 group-hover:text-white">{t.name}</span>
                        <span className="block truncate text-xs text-ink-400">{t.tagline}</span>
                      </span>
                      <Rating value={t.rating} className="hidden sm:inline-flex" />
                      <span className="hidden rounded-full border border-ink-700 px-2.5 py-1 text-xs text-ink-300 transition group-hover:border-zap/50 group-hover:text-zap sm:inline">Open</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card relative min-w-0 overflow-hidden bg-ink-950/60 p-5">
              <div className="flex items-center justify-between">
                <p className="eyebrow"><MessageSquareText className="h-3 w-3 text-zap" /> Prompt of the day</p>
                <span className="rounded-md border border-ink-700 px-1.5 py-0.5 font-mono text-xs text-ink-400">{prompts[0].model}</span>
              </div>
              <p className="mt-4 font-display text-lg font-semibold leading-snug">{prompts[0].title}</p>
              <div className="mt-3 h-32 overflow-hidden rounded-xl border border-ink-700 bg-ink-900 p-3 font-mono text-xs leading-relaxed text-ink-300">
                <PromptBody text={prompts[0].body} className="whitespace-pre-line" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-ink-300">
                  <Avatar name={prompts[0].author.name} hue={prompts[0].author.hue} /> @{prompts[0].author.handle}
                </span>
                <Link to={`/prompts/${prompts[0].id}`} className="btn-zap px-3 py-1.5 text-xs">Use prompt</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <dl className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-y-8 sm:grid-cols-4">
          {[
            ['2,400+', 'AI tools listed'],
            ['10k+', 'community prompts'],
            ['180k', 'monthly makers'],
            ['4.8★', 'average rating'],
          ].map(([v, l]) => (
            <div key={l} className="text-center">
              <dt className="h-display text-4xl text-white">{v}</dt>
              <dd className="mt-2 text-xs uppercase tracking-[.14em] text-ink-400">{l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Ticker() {
  const items = [...newsTicker, ...newsTicker];
  return (
    <div className="border-y border-ink-700/70 bg-ink-900/50 py-3">
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
          {items.map((n, i) => (
            <span key={i} className="inline-flex items-center gap-3 whitespace-nowrap text-sm text-ink-300">
              <Zap className="h-3.5 w-3.5 fill-zap text-zap" /> {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Pillars() {
  return (
    <section className="container-z mt-28">
      <SectionHeader
        eyebrow="One platform"
        title={<>Not just a directory. <span className="text-ink-400">Your whole AI stack.</span></>}
        subtitle="Zapp brings together everything you need to find, use and build with AI — so you stop juggling 30 tabs."
      />
      <div className="grid gap-4 md:grid-cols-6 md:grid-rows-[auto_auto]">
        <Link to="/tools" className="card card-hover group relative overflow-hidden p-7 md:col-span-4 md:row-span-1">
          <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-zap/10 blur-3xl transition group-hover:bg-zap/20" />
          <Store className="h-7 w-7 text-zap" />
          <h3 className="h-display mt-6 text-3xl">AI Tools Marketplace</h3>
          <p className="mt-2 max-w-md text-ink-400">Hand-reviewed tools across 12 categories with honest ratings, real pricing and side-by-side comparisons.</p>
          <div className="mt-8 flex -space-x-2">
            {tools.slice(0, 8).map((t) => (
              <span key={t.slug} className="rounded-xl ring-4 ring-ink-900 transition group-hover:translate-y-[-2px]"><ToolIcon tool={t} size="sm" /></span>
            ))}
            <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-ink-800 text-xs font-semibold text-ink-300 ring-4 ring-ink-900">+2k</span>
          </div>
        </Link>
        <Link to="/prompts" className="card card-hover group relative overflow-hidden p-7 md:col-span-2">
          <MessageSquareText className="h-7 w-7 text-volt" />
          <h3 className="h-display mt-6 text-3xl">Prompt Hub</h3>
          <p className="mt-2 text-ink-400">Copy, remix or sell prompts for every model.</p>
          <div className="mt-6 rounded-xl border border-ink-700 bg-ink-950 p-3 font-mono text-xs text-ink-300">
            Write a cold email to <span className="rounded bg-zap/10 px-1 text-zap">prospect</span> at <span className="rounded bg-zap/10 px-1 text-zap">company</span>…
          </div>
        </Link>
        <Link to="/agents" className="card card-hover group p-7 md:col-span-2">
          <Bot className="h-7 w-7 text-aqua" />
          <h3 className="h-display mt-6 text-2xl">Agents</h3>
          <p className="mt-2 text-sm text-ink-400">Deploy ready-made AI agents that do the work, not just the chat.</p>
        </Link>
        <Link to="/learn" className="card card-hover group p-7 md:col-span-2">
          <BookOpen className="h-7 w-7 text-volt" />
          <h3 className="h-display mt-6 text-2xl">Learn</h3>
          <p className="mt-2 text-sm text-ink-400">Guides, build logs and the AI news that actually matters.</p>
        </Link>
        <div className="card relative overflow-hidden p-7 md:col-span-2">
          <span className="absolute right-5 top-5 rounded-full border border-ink-600 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-ink-300">Soon</span>
          <FlaskConical className="h-7 w-7 text-zap" />
          <h3 className="h-display mt-6 text-2xl">Playground</h3>
          <p className="mt-2 text-sm text-ink-400">Run any prompt across models side by side. One key, every model.</p>
        </div>
      </div>
    </section>
  );
}

function TrendingTools() {
  const tabs = [
    { key: 'trending', label: 'Trending', icon: TrendingUp },
    { key: 'new', label: 'Just launched', icon: Clock },
    { key: 'top', label: 'Top rated', icon: Star },
  ] as const;
  const [tab, setTab] = useState<(typeof tabs)[number]['key']>('trending');
  const list =
    tab === 'trending'
      ? [...tools].sort((a, b) => Number(!!b.trending) - Number(!!a.trending) || b.saves - a.saves)
      : tab === 'new'
        ? [...tools].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew))
        : [...tools].sort((a, b) => b.rating - a.rating);

  return (
    <section className="container-z mt-32">
      <SectionHeader eyebrow="Marketplace" title="Tools everyone’s zapping" href="/tools" cta="Browse all tools" />
      <div className="scrollbar-none -mx-4 mb-6 flex gap-2 overflow-x-auto px-4">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={cx('chip px-4 py-2 text-sm', tab === t.key && 'chip-active')}>
            <t.icon className="h-4 w-4" /> {t.label}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.slice(0, 8).map((t) => <ToolCard key={t.slug} tool={t} />)}
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="container-z mt-32">
      <SectionHeader eyebrow="Browse" title="Find AI for every job" href="/tools" cta="All categories" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((c) => (
          <Link key={c.slug} to={`/tools?category=${c.slug}`} className="card card-hover group p-5">
            <c.icon className={cx('h-6 w-6 transition group-hover:scale-110', c.tint)} />
            <p className="mt-5 font-display text-lg font-semibold">{c.name}</p>
            <p className="mt-0.5 text-xs text-ink-400">{c.count} tools</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function PromptShowcase() {
  return (
    <section className="relative mt-32 overflow-hidden border-y border-ink-700/70 bg-ink-900/40 py-24">
      <div aria-hidden className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-volt/10 blur-[120px]" />
      <div className="container-z relative grid gap-12 lg:grid-cols-[0.9fr_2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-3"><span className="h-1.5 w-1.5 rounded-full bg-volt" />Prompt Hub</p>
          <h2 className="h-display text-5xl">Stop writing prompts from scratch.</h2>
          <p className="mt-5 text-ink-300">
            10,000+ prompts written by people who use AI for a living. Fill in the blanks, hit copy, get results — or open it straight in your favourite model.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-ink-200">
            {['Variables you can fill in, not walls of text', 'Tested on GPT, Claude, Gemini, Midjourney & more', 'Remix any prompt and publish your version'].map((t) => (
              <li key={t} className="flex gap-3"><Zap className="mt-0.5 h-4 w-4 shrink-0 fill-zap text-zap" />{t}</li>
            ))}
          </ul>
          <Link to="/prompts" className="btn-zap btn-lg mt-10">Explore Prompt Hub <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {prompts.slice(0, 4).map((p) => <PromptCard key={p.id} prompt={p} />)}
        </div>
      </div>
    </section>
  );
}

function CreatorCTA() {
  return (
    <section className="container-z mt-32">
      <div className="relative overflow-hidden rounded-[32px] bg-zap p-8 text-ink-950 sm:p-12 lg:p-16">
        <div aria-hidden className="absolute inset-0 opacity-[.15] [background-image:radial-gradient(#08080A_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[.18em]">For creators & builders</p>
            <h2 className="h-display mt-4 text-5xl sm:text-6xl">Built an AI thing? Get paid for it.</h2>
            <p className="mt-5 max-w-md text-lg text-ink-800">
              List your tool, sell your prompts, or publish agents. Reach 180k makers a month and keep 85% of every sale.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/submit" className="btn btn-lg bg-ink-950 text-white hover:bg-ink-800">Start selling <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/pricing" className="btn btn-lg border border-ink-950/20 hover:bg-ink-950/5">How payouts work</Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: IndianRupee, v: '₹18.4L', l: 'paid to creators in Oct' },
              { icon: Wallet, v: '85%', l: 'revenue share, always' },
              { icon: ShieldCheck, v: '48h', l: 'average review time' },
              { icon: TrendingUp, v: '3.2×', l: 'more reach vs. going solo' },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-ink-950 p-6 text-white">
                <s.icon className="h-5 w-5 text-zap" />
                <p className="h-display mt-6 text-4xl">{s.v}</p>
                <p className="mt-1 text-sm text-ink-400">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LearnStrip() {
  const [lead, ...rest] = articles;
  return (
    <section className="container-z mt-32">
      <SectionHeader eyebrow="Learn" title="Get smarter about AI, weekly" href="/learn" cta="All articles" />
      <div className="grid gap-4 lg:grid-cols-2">
        <a href={lead.url} target="_blank" rel="noreferrer" className="card card-hover group overflow-hidden">
          <div className="aspect-[16/9] overflow-hidden bg-ink-800">
            <img src={lead.image} alt="" loading="lazy" className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100" />
          </div>
          <div className="p-6">
            <p className="eyebrow">{lead.tag} · {lead.readTime}</p>
            <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight">{lead.title}</h3>
            <p className="mt-2 text-sm text-ink-400">{lead.excerpt}</p>
          </div>
        </a>
        <div className="grid gap-4">
          {rest.slice(0, 3).map((a) => (
            <a key={a.id} href={a.url} target="_blank" rel="noreferrer" className="card card-hover group flex gap-5 p-4">
              <div className="h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-ink-800 sm:w-40">
                <img src={a.image} alt="" loading="lazy" className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100" />
              </div>
              <div className="min-w-0 py-1">
                <p className="eyebrow">{a.tag} · {a.readTime}</p>
                <h3 className="mt-2 line-clamp-2 font-display text-lg font-semibold leading-snug tracking-tight">{a.title}</h3>
                <p className="mt-1 text-xs text-ink-400">{a.date}</p>
              </div>
              <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-ink-400 transition group-hover:text-zap" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <section className="container-z mt-32">
      <div className="card relative overflow-hidden px-6 py-14 text-center sm:px-12">
        <div className="bg-grid mask-fade-b absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-xl">
          <Mail className="mx-auto h-8 w-8 text-zap" />
          <h2 className="h-display mt-5 text-4xl sm:text-5xl">The Zapp Weekly</h2>
          <p className="mt-3 text-ink-300">5 new tools, 3 killer prompts, 1 deep dive. Every Friday. Read by 42,000 builders.</p>
          {done ? (
            <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-zap/10 px-4 py-2 text-sm text-zap"><Zap className="h-4 w-4 fill-zap" /> You’re in. See you Friday.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row">
              <input required type="email" placeholder="you@company.com" className="input rounded-full px-5" />
              <button className="btn-zap px-6">Subscribe</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
