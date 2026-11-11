import { BadgeCheck, Flame, Sparkles, Star } from 'lucide-react';
import { cx } from '../lib/ui';

export function Rating({ value, reviews, className }: { value: number; reviews?: number; className?: string }) {
  return (
    <span className={cx('inline-flex items-center gap-1 text-xs text-ink-300', className)}>
      <Star className="h-3.5 w-3.5 fill-zap text-zap" />
      <span className="font-medium text-ink-100">{value.toFixed(1)}</span>
      {reviews !== undefined && <span className="text-ink-400">({reviews.toLocaleString('en-IN')})</span>}
    </span>
  );
}

export function Verified() {
  return <BadgeCheck className="h-4 w-4 shrink-0 fill-volt/20 text-volt" aria-label="Verified" />;
}

export function NewBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-aqua/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-aqua">
      <Sparkles className="h-3 w-3" /> New
    </span>
  );
}

export function HotBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-ember/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-ember">
      <Flame className="h-3 w-3" /> Hot
    </span>
  );
}

export function PriceTag({ pricing }: { pricing: 'Free' | 'Freemium' | 'Paid' }) {
  const style = {
    Free: 'text-zap bg-zap/10',
    Freemium: 'text-aqua bg-aqua/10',
    Paid: 'text-ink-200 bg-white/5',
  }[pricing];
  return <span className={cx('rounded-full px-2 py-0.5 text-xs font-medium', style)}>{pricing}</span>;
}

export function Avatar({ name, hue, size = 'h-6 w-6 text-xs' }: { name: string; hue: string; size?: string }) {
  const initials = name.replace('Dr. ', '').split(' ').map((s) => s[0]).slice(0, 2).join('');
  return <span className={cx('grid shrink-0 place-items-center rounded-full font-semibold text-ink-950', hue, size)}>{initials}</span>;
}
