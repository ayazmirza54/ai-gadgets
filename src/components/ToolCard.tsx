import { Link } from 'react-router-dom';
import { Bookmark, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import type { Tool } from '../data/tools';
import { categoryBySlug } from '../data/categories';
import { ToolIcon } from './ToolIcon';
import { HotBadge, NewBadge, PriceTag, Rating, Verified } from './Badges';
import { compact, cx } from '../lib/ui';

export function ToolCard({ tool, layout = 'grid' }: { tool: Tool; layout?: 'grid' | 'list' }) {
  const [saved, setSaved] = useState(false);
  const cat = categoryBySlug(tool.category);

  const save = (
    <button
      onClick={(e) => { e.preventDefault(); setSaved((s) => !s); }}
      className={cx(
        'relative z-10 grid h-8 w-8 place-items-center rounded-full border transition',
        saved ? 'border-zap/50 bg-zap/10 text-zap' : 'border-ink-700 text-ink-400 hover:border-ink-500 hover:text-white',
      )}
      aria-label={saved ? 'Unsave' : 'Save'}
    >
      <Bookmark className={cx('h-3.5 w-3.5', saved && 'fill-zap')} />
    </button>
  );

  if (layout === 'list') {
    return (
      <Link to={`/tools/${tool.slug}`} className="card card-hover group flex items-center gap-4 p-4">
        <ToolIcon tool={tool} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-display text-[17px] font-semibold tracking-tight">{tool.name}</h3>
            {tool.verified && <Verified />}
            {tool.isNew && <NewBadge />}
          </div>
          <p className="truncate text-sm text-ink-400">{tool.tagline}</p>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <span className="text-xs text-ink-400">{cat?.name}</span>
          <Rating value={tool.rating} />
          <PriceTag pricing={tool.pricing} />
        </div>
        {save}
      </Link>
    );
  }

  return (
    <Link to={`/tools/${tool.slug}`} className="card card-hover group relative flex flex-col p-5">
      <div className="flex items-start justify-between">
        <ToolIcon tool={tool} />
        <div className="flex items-center gap-1.5">
          {tool.trending && <HotBadge />}
          {tool.isNew && !tool.trending && <NewBadge />}
          {save}
        </div>
      </div>
      <div className="mt-5 flex items-center gap-1.5">
        <h3 className="font-display text-lg font-semibold tracking-tight">{tool.name}</h3>
        {tool.verified && <Verified />}
      </div>
      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-400">{tool.tagline}</p>
      <div className="mt-auto pt-5">
      <div className="flex items-center justify-between border-t border-ink-700/70 pt-4">
        <div className="flex items-center gap-3">
          <Rating value={tool.rating} />
          <span className="text-xs text-ink-400">{compact(tool.saves)} saves</span>
        </div>
        <div className="flex items-center gap-2">
          <PriceTag pricing={tool.pricing} />
          <ArrowUpRight className="h-4 w-4 text-ink-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zap" />
        </div>
      </div>
      </div>
    </Link>
  );
}
