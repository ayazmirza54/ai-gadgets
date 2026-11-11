import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, Heart, Play, GitFork, Share2, ArrowUpRight, Lock, MessageCircle, Zap } from 'lucide-react';
import { promptById, prompts } from '../data/prompts';
import { categoryBySlug } from '../data/categories';
import { PromptBody, CopyButton, PromptCard } from '../components/PromptCard';
import { Avatar } from '../components/Badges';
import NotFound from './NotFound';
import { compact, cx } from '../lib/ui';

export default function PromptDetail() {
  const { id = '' } = useParams();
  const prompt = promptById(id);
  const vars = useMemo(() => Array.from(new Set((prompt?.body.match(/\{\{([^}]+)\}\}/g) ?? []).map((v) => v.slice(2, -2)))), [prompt]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [liked, setLiked] = useState(false);
  if (!prompt) return <NotFound />;

  const filled = prompt.body.replace(/\{\{([^}]+)\}\}/g, (m, k) => values[k]?.trim() || m);
  const cat = categoryBySlug(prompt.category);
  const locked = prompt.price > 0;
  const more = prompts.filter((p) => p.id !== prompt.id && (p.category === prompt.category || p.model === prompt.model)).slice(0, 3);

  return (
    <>
      <div className="container-z pt-8">
        <nav className="flex items-center gap-1.5 text-xs text-ink-400">
          <Link to="/prompts" className="hover:text-white">Prompt Hub</Link>
          <ChevronRight className="h-3 w-3" />
          <span>{cat?.name}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="truncate text-ink-200">{prompt.title}</span>
        </nav>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip">{prompt.model}</span>
              <span className="chip">{cat?.name}</span>
              {prompt.staffPick && <span className="chip chip-active">Staff pick</span>}
            </div>
            <h1 className="h-display mt-5 text-balance text-4xl sm:text-5xl">{prompt.title}</h1>
            <p className="mt-4 max-w-2xl text-lg text-ink-300">{prompt.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-ink-400">
              <span className="flex items-center gap-2">
                <Avatar name={prompt.author.name} hue={prompt.author.hue} size="h-8 w-8 text-[11px]" />
                <span><span className="text-ink-100">{prompt.author.name}</span> · @{prompt.author.handle}</span>
              </span>
              <span className="inline-flex items-center gap-1"><Play className="h-3.5 w-3.5" /> {compact(prompt.uses)} uses</span>
              <span className="inline-flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> {compact(prompt.likes)}</span>
            </div>

            {/* Prompt editor */}
            <div className="mt-10 overflow-hidden rounded-2xl border border-ink-600 bg-ink-950">
              <div className="flex items-center gap-2 border-b border-ink-700 bg-ink-900 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-ember/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-zap/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-aqua/70" />
                <span className="ml-3 font-mono text-xs text-ink-400">prompt.txt</span>
                {!locked && <CopyButton text={filled} className="ml-auto" />}
              </div>
              <div className="relative">
                <pre className={cx('whitespace-pre-wrap p-5 font-mono text-[13px] leading-relaxed text-ink-200', locked && 'max-h-48 overflow-hidden')}>
                  <PromptBody text={filled} />
                </pre>
                {locked && (
                  <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-ink-950 via-ink-950/90 to-ink-950/10 pb-6">
                    <div className="text-center">
                      <Lock className="mx-auto h-5 w-5 text-zap" />
                      <p className="mt-2 text-sm text-ink-200">Premium prompt — unlock the full text & variations</p>
                      <button className="btn-zap mt-4">Unlock for ₹{prompt.price}</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {prompt.output && (
              <div className="mt-6">
                <p className="eyebrow mb-3">Example output</p>
                <div className="card whitespace-pre-line p-5 text-sm leading-relaxed text-ink-300">{prompt.output}</div>
              </div>
            )}

            <div className="mt-12">
              <p className="eyebrow mb-4"><MessageCircle className="h-3 w-3" /> Discussion · 24</p>
              <div className="card p-4">
                <textarea rows={3} placeholder="Share a tip, a tweak or your results…" className="w-full resize-none bg-transparent text-sm placeholder:text-ink-400 focus:outline-none" />
                <div className="flex justify-end"><button className="btn-outline px-3 py-1.5 text-xs">Comment</button></div>
              </div>
              <div className="mt-4 space-y-4">
                {[
                  ['Kavya R', 'bg-volt', 'Swapped the CTA rule for “propose a time” and reply rate jumped ~30%. Great base.'],
                  ['Sameer K', 'bg-aqua', 'Works even better if you add one line of the prospect’s recent post as context.'],
                ].map(([n, h, t]) => (
                  <div key={n} className="flex gap-3">
                    <Avatar name={n} hue={h} size="h-8 w-8 text-[11px]" />
                    <div>
                      <p className="text-sm"><span className="font-medium">{n}</span> <span className="text-xs text-ink-500">· 3d</span></p>
                      <p className="mt-1 text-sm text-ink-300">{t}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            {vars.length > 0 && !locked && (
              <div className="card p-5">
                <p className="eyebrow mb-1">Fill in the blanks</p>
                <p className="mb-4 text-xs text-ink-400">Your values are inserted into the prompt live.</p>
                <div className="space-y-3">
                  {vars.map((v) => (
                    <label key={v} className="block">
                      <span className="mb-1 block font-mono text-[11px] text-zap">{v}</span>
                      <input value={values[v] ?? ''} onChange={(e) => setValues((s) => ({ ...s, [v]: e.target.value }))} placeholder={v.replace(/_/g, ' ')} className="input py-2" />
                    </label>
                  ))}
                </div>
                <CopyButton text={filled} className="mt-4 w-full justify-center border-0 bg-zap py-2.5 text-sm font-semibold text-ink-950 hover:bg-zap-400 hover:text-ink-950" />
              </div>
            )}
            <div className="card p-5">
              <p className="eyebrow mb-4">Open in</p>
              <div className="grid grid-cols-2 gap-2">
                {['ChatGPT', 'Claude', 'Gemini', 'Zapp Playground'].map((m) => (
                  <button key={m} className="btn-outline justify-between rounded-xl px-3 text-xs">{m} <ArrowUpRight className="h-3.5 w-3.5" /></button>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-ink-700 pt-4">
                <button onClick={() => setLiked((l) => !l)} className={cx('btn-ghost flex-col gap-1 rounded-xl py-2 text-xs', liked && 'text-ember')}>
                  <Heart className={cx('h-4 w-4', liked && 'fill-ember')} /> Like
                </button>
                <button className="btn-ghost flex-col gap-1 rounded-xl py-2 text-xs"><GitFork className="h-4 w-4" /> Remix</button>
                <button className="btn-ghost flex-col gap-1 rounded-xl py-2 text-xs"><Share2 className="h-4 w-4" /> Share</button>
              </div>
            </div>
            <div className="card flex items-center gap-3 p-5">
              <Avatar name={prompt.author.name} hue={prompt.author.hue} size="h-11 w-11 text-sm" />
              <div className="flex-1">
                <p className="font-medium">{prompt.author.name}</p>
                <p className="text-xs text-ink-400">@{prompt.author.handle} · Top 1% creator</p>
              </div>
              <button className="btn-outline px-3 py-1.5 text-xs"><Zap className="h-3 w-3" /> Follow</button>
            </div>
          </aside>
        </div>
      </div>

      {more.length > 0 && (
        <section className="container-z mt-24">
          <h2 className="h-display mb-8 text-3xl">More like this</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{more.map((p) => <PromptCard key={p.id} prompt={p} />)}</div>
        </section>
      )}
    </>
  );
}
