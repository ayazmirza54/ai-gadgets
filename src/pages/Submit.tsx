import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHydratedSearchParams } from '../lib/useHydratedSearchParams';
import { Wrench, MessageSquareText, Bot, Upload, Check, ArrowRight, PartyPopper } from 'lucide-react';
import { categories, models } from '../data/categories';
import { PageHero } from '../components/Section';
import { cx } from '../lib/ui';

const types = [
  { k: 'tool', l: 'AI tool', d: 'A product, app or API', i: Wrench },
  { k: 'prompt', l: 'Prompt', d: 'Free or paid prompt', i: MessageSquareText },
  { k: 'agent', l: 'Agent', d: 'An automated workflow', i: Bot },
] as const;

export default function Submit() {
  const [params] = useHydratedSearchParams();
  const [type, setType] = useState<(typeof types)[number]['k']>('tool');
  const requested = params.get('type');
  useEffect(() => {
    const match = types.find((t) => t.k === requested);
    if (match) setType(match.k);
  }, [requested]);
  const [sent, setSent] = useState(false);
  const [paid, setPaid] = useState(false);

  if (sent) {
    return (
      <div className="container-z grid min-h-[60vh] place-items-center py-20 text-center">
        <div>
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-zap text-ink-950"><PartyPopper className="h-8 w-8" /></span>
          <h1 className="h-display mt-8 text-5xl">Submitted. Nice one.</h1>
          <p className="mx-auto mt-4 max-w-md text-ink-300">Our team reviews every listing by hand. You’ll hear from us within 48 hours.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/" className="btn-outline">Back home</Link>
            <button onClick={() => setSent(false)} className="btn-zap">Submit another</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHero eyebrow="Submit" title={<>Share what you’ve <span className="text-zap">built.</span></>} subtitle="List it on Zapp and put it in front of 180k makers every month. Free to list — keep 85% of paid sales." />
      <div className="container-z mt-12 grid gap-10 lg:grid-cols-[1fr_320px]">
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-10">
          <fieldset>
            <legend className="eyebrow mb-4">What are you submitting?</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {types.map((t) => (
                <button type="button" key={t.k} onClick={() => setType(t.k)} className={cx('card relative p-5 text-left transition', type === t.k ? 'border-zap/60 bg-zap/[.04]' : 'hover:border-ink-500')}>
                  {type === t.k && <span className="absolute right-4 top-4 grid h-5 w-5 place-items-center rounded-full bg-zap"><Check className="h-3 w-3 text-ink-950" strokeWidth={3} /></span>}
                  <t.i className={cx('h-6 w-6', type === t.k ? 'text-zap' : 'text-ink-300')} />
                  <p className="mt-4 font-medium">{t.l}</p>
                  <p className="text-xs text-ink-400">{t.d}</p>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" className="sm:col-span-2"><input required className="input" placeholder={type === 'prompt' ? 'e.g. Cold email that gets replies' : 'e.g. PixelForge'} /></Field>
            <Field label="One-line tagline" className="sm:col-span-2"><input required maxLength={80} className="input" placeholder="What does it do, in under 80 characters?" /></Field>
            {type !== 'prompt' && <Field label="Website / link"><input type="url" className="input" placeholder="https://" /></Field>}
            <Field label="Category">
              <select className="input">{categories.map((c) => <option key={c.slug}>{c.name}</option>)}</select>
            </Field>
            {type === 'prompt' && (
              <Field label="Model">
                <select className="input">{models.map((m) => <option key={m}>{m}</option>)}</select>
              </Field>
            )}
            <Field label={type === 'prompt' ? 'Prompt' : 'Description'} className="sm:col-span-2" hint={type === 'prompt' ? 'Use {{variable_name}} for fill-in-the-blank fields.' : undefined}>
              <textarea rows={type === 'prompt' ? 8 : 5} className={cx('input resize-y', type === 'prompt' && 'font-mono text-[13px]')} placeholder={type === 'prompt' ? 'Write a {{tone}} email to {{name}} about…' : 'Tell people what makes it great.'} />
            </Field>
            <div className="sm:col-span-2">
              <p className="mb-2 text-sm font-medium text-ink-200">{type === 'prompt' ? 'Example outputs' : 'Logo & screenshots'}</p>
              <label className="card flex cursor-pointer flex-col items-center justify-center border-dashed py-10 text-center transition hover:border-zap/50">
                <Upload className="h-6 w-6 text-ink-400" />
                <p className="mt-3 text-sm">Drop files or <span className="text-zap">browse</span></p>
                <p className="mt-1 text-xs text-ink-400">PNG, JPG or GIF · up to 10MB</p>
                <input type="file" multiple className="sr-only" />
              </label>
            </div>
            {type !== 'tool' && (
              <div className="card flex items-center justify-between gap-4 p-5 sm:col-span-2">
                <div>
                  <p className="font-medium">Sell this {type}</p>
                  <p className="text-xs text-ink-400">Set a price in ₹. You keep 85% of every sale.</p>
                </div>
                <div className="flex items-center gap-3">
                  {paid && <input type="number" min={49} defaultValue={149} className="input w-24 py-2" aria-label="Price" />}
                  <button type="button" role="switch" aria-checked={paid} onClick={() => setPaid((p) => !p)} className={cx('relative h-6 w-11 rounded-full transition', paid ? 'bg-zap' : 'bg-ink-700')}>
                    <span className={cx('absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all', paid ? 'left-[22px]' : 'left-0.5')} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 border-t border-ink-700 pt-6">
            <button className="btn-zap btn-lg">Submit for review <ArrowRight className="h-4 w-4" /></button>
            <p className="text-xs text-ink-400">By submitting you agree to the creator terms.</p>
          </div>
        </form>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <p className="eyebrow mb-4">What happens next</p>
            <ol className="space-y-5">
              {['We review it by hand (≈48h)', 'It goes live with a launch badge', 'Featured in the Zapp Weekly if it’s great', 'Track views, saves & sales in your dashboard'].map((s, i) => (
                <li key={s} className="flex gap-3 text-sm">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-ink-600 font-mono text-xs text-ink-300">{i + 1}</span>
                  <span className="text-ink-200">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </>
  );
}

function Field({ label, children, className, hint }: { label: string; children: React.ReactNode; className?: string; hint?: string }) {
  return (
    <label className={cx('block', className)}>
      <span className="mb-2 block text-sm font-medium text-ink-200">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-ink-400">{hint}</span>}
    </label>
  );
}
