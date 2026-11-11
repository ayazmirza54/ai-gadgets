import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Zap, Minus } from 'lucide-react';
import { PageHero } from '../components/Section';
import { cx } from '../lib/ui';

const plans = [
  { n: 'Free', m: 0, y: 0, d: 'For exploring and getting started.', cta: 'Get started', f: ['Browse all tools & prompts', 'Copy free prompts', 'Save up to 25 items', 'Weekly newsletter'] },
  { n: 'Pro', m: 299, y: 249, d: 'For people who use AI every day.', cta: 'Go Pro', hot: true, f: ['Everything in Free', 'Unlimited saves & collections', '5 premium prompts / month', 'Playground: 500 runs / month', 'Early access to agents', 'Member-only discounts on tools'] },
  { n: 'Creator', m: 799, y: 649, d: 'For builders selling on Zapp.', cta: 'Start selling', f: ['Everything in Pro', 'Keep 90% of sales (vs 85%)', 'Featured launch slot', 'Advanced analytics', 'Custom creator page', 'Priority review (24h)'] },
];

const compare = [
  ['Browse marketplace', true, true, true],
  ['Prompt variables & copy', true, true, true],
  ['Collections', '1', 'Unlimited', 'Unlimited'],
  ['Premium prompts', false, '5 / mo', '15 / mo'],
  ['Playground runs', false, '500 / mo', '2,000 / mo'],
  ['Sell prompts & agents', '85%', '85%', '90%'],
  ['Analytics', false, false, true],
] as const;

export default function Pricing() {
  const [yearly, setYearly] = useState(true);
  return (
    <>
      <PageHero eyebrow="Pricing" title={<>Simple pricing. <span className="text-ink-400">Serious value.</span></>} subtitle="Start free. Upgrade when Zapp starts saving you hours — which, honestly, is usually week one.">
        <div className="mt-8 inline-flex items-center rounded-full border border-ink-700 bg-ink-900 p-1 text-sm">
          <button onClick={() => setYearly(false)} className={cx('rounded-full px-4 py-1.5', !yearly ? 'bg-white text-ink-950' : 'text-ink-300')}>Monthly</button>
          <button onClick={() => setYearly(true)} className={cx('inline-flex items-center gap-2 rounded-full px-4 py-1.5', yearly ? 'bg-white text-ink-950' : 'text-ink-300')}>
            Yearly <span className="rounded-full bg-zap px-1.5 text-xs font-semibold text-ink-950">-17%</span>
          </button>
        </div>
      </PageHero>

      <div className="container-z mt-12 grid gap-4 lg:grid-cols-3">
        {plans.map((p) => (
          <div key={p.n} className={cx('relative flex flex-col rounded-3xl p-8', p.hot ? 'bg-zap text-ink-950' : 'card')}>
            {p.hot && <span className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-ink-950 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-zap"><Zap className="h-3 w-3 fill-zap" /> Most popular</span>}
            <p className={cx('font-display text-2xl font-semibold')}>{p.n}</p>
            <p className={cx('mt-1 text-sm', p.hot ? 'text-ink-800' : 'text-ink-400')}>{p.d}</p>
            <p className="mt-8 flex items-baseline gap-1">
              <span className="h-display text-6xl">₹{yearly ? p.y : p.m}</span>
              <span className={cx('text-sm', p.hot ? 'text-ink-800' : 'text-ink-400')}>/ month</span>
            </p>
            <p className={cx('mt-1 h-4 text-xs', p.hot ? 'text-ink-800' : 'text-ink-400')}>{p.m > 0 && yearly ? `Billed ₹${p.y * 12} yearly` : ''}</p>
            <Link to="/signin" className={cx('btn btn-lg mt-8', p.hot ? 'bg-ink-950 text-white hover:bg-ink-800' : 'btn-outline')}>{p.cta}</Link>
            <ul className="mt-8 space-y-3 text-sm">
              {p.f.map((f) => (
                <li key={f} className="flex gap-3"><Check className={cx('mt-0.5 h-4 w-4 shrink-0', p.hot ? 'text-ink-950' : 'text-zap')} />{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <section className="container-z mt-24">
        <h2 className="h-display mb-8 text-3xl">Compare plans</h2>
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-ink-700 text-left">
                <th className="p-4 font-normal text-ink-400">Feature</th>
                {plans.map((p) => <th key={p.n} className="p-4 font-display text-base font-semibold">{p.n}</th>)}
              </tr>
            </thead>
            <tbody>
              {compare.map(([f, ...v]) => (
                <tr key={f} className="border-b border-ink-700/60 last:border-0">
                  <td className="p-4 text-ink-300">{f}</td>
                  {v.map((x, i) => (
                    <td key={i} className="p-4">
                      {x === true ? <Check className="h-4 w-4 text-zap" /> : x === false ? <Minus className="h-4 w-4 text-ink-600" /> : <span className="text-ink-100">{x}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="container-z mt-24 max-w-3xl">
        <h2 className="h-display mb-8 text-3xl">Questions</h2>
        <div className="divide-y divide-ink-700 border-y border-ink-700">
          {[
            ['Can I cancel anytime?', 'Yes. Cancel in one click from settings; you keep access until the end of your billing period.'],
            ['How do creator payouts work?', 'Earnings are paid monthly to your bank account via UPI or NEFT once you cross ₹500.'],
            ['Do you list tools for free?', 'Always. Listing on the marketplace is free. Featured placements are optional.'],
            ['Is there a student discount?', 'Yes — 50% off Pro with a valid student email.'],
          ].map(([q, a]) => (
            <details key={q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                {q}
                <span className="grid h-7 w-7 place-items-center rounded-full border border-ink-700 text-ink-300 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-ink-400">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
