import type { Tool } from '../data/tools';
import { cx } from '../lib/ui';

export function ToolIcon({ tool, size = 'md' }: { tool: Tool; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const Icon = tool.icon;
  const dims = { sm: 'h-9 w-9 rounded-[10px]', md: 'h-12 w-12 rounded-xl', lg: 'h-16 w-16 rounded-2xl', xl: 'h-20 w-20 rounded-[22px]' }[size];
  const icon = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-7 w-7', xl: 'h-9 w-9' }[size];
  return (
    <span className={cx('relative grid shrink-0 place-items-center bg-gradient-to-br shadow-inner', tool.gradient, dims)}>
      <span className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/25" />
      <Icon className={cx('text-ink-950', icon)} strokeWidth={2.2} />
    </span>
  );
}
