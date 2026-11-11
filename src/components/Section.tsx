import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

export function SectionHeader({
  eyebrow, title, subtitle, href, cta = 'View all',
}: { eyebrow?: string; title: ReactNode; subtitle?: string; href?: string; cta?: string }) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-3"><span className="h-1.5 w-1.5 rounded-full bg-zap" />{eyebrow}</p>}
        <h2 className="h-display text-balance text-4xl sm:text-5xl">{title}</h2>
        {subtitle && <p className="mt-3 text-ink-400">{subtitle}</p>}
      </div>
      {href && (
        <Link to={href} className="group inline-flex shrink-0 items-center gap-1.5 text-sm text-ink-200 hover:text-zap">
          {cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

export function PageHero({ eyebrow, title, subtitle, children }: { eyebrow: string; title: ReactNode; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-ink-700/60">
      <div className="bg-grid mask-fade-b absolute inset-0" aria-hidden />
      <div className="absolute -top-40 left-1/2 h-80 w-[70rem] -translate-x-1/2 rounded-full bg-zap/[.07] blur-3xl" aria-hidden />
      <div className="container-z relative pb-12 pt-16 sm:pt-20">
        <p className="eyebrow mb-4"><span className="h-1.5 w-1.5 rounded-full bg-zap" />{eyebrow}</p>
        <h1 className="h-display text-balance text-5xl sm:text-6xl lg:text-7xl">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-lg text-ink-300">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <div className="card grid place-items-center border-dashed px-6 py-20 text-center">
      <p className="font-display text-2xl font-semibold">{title}</p>
      <p className="mt-2 max-w-sm text-sm text-ink-400">{body}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
