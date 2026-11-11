import { Link } from 'react-router-dom';
import { Copy, Check, Heart, Play } from 'lucide-react';
import { useState } from 'react';
import type { Prompt } from '../data/prompts';
import { Avatar } from './Badges';
import { compact, cx } from '../lib/ui';

export function PromptBody({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\{\{[^}]+\}\})/g);
  return (
    <span className={className}>
      {parts.map((p, i) =>
        p.startsWith('{{') ? (
          <span key={i} className="rounded bg-zap/10 px-1 text-zap">{p.slice(2, -2)}</span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </span>
  );
}

export function CopyButton({ text, className, label = true }: { text: string; className?: string; label?: boolean }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        navigator.clipboard?.writeText(text).catch(() => {});
        setDone(true);
        setTimeout(() => setDone(false), 1600);
      }}
      className={cx('btn relative z-10 border border-ink-700 bg-ink-850 px-3 py-1.5 text-xs text-ink-200 hover:border-ink-500 hover:text-white', className)}
    >
      {done ? <Check className="h-3.5 w-3.5 text-zap" /> : <Copy className="h-3.5 w-3.5" />}
      {label && (done ? 'Copied' : 'Copy')}
    </button>
  );
}

export function PromptCard({ prompt }: { prompt: Prompt }) {
  const [liked, setLiked] = useState(false);
  return (
    <Link to={`/prompts/${prompt.id}`} className="card card-hover group flex flex-col overflow-hidden">
      <div className="relative h-40 overflow-hidden border-b border-ink-700/70 bg-ink-950 p-4 font-mono text-[11.5px] leading-relaxed text-ink-300">
        <div className="mb-2 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-ink-600" />
          <span className="h-2 w-2 rounded-full bg-ink-600" />
          <span className="h-2 w-2 rounded-full bg-ink-600" />
          <span className="ml-auto rounded-md border border-ink-700 px-1.5 py-0.5 text-[10px] text-ink-400">{prompt.model}</span>
        </div>
        <PromptBody text={prompt.body} className="whitespace-pre-line" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          {prompt.staffPick && <span className="text-[10px] font-semibold uppercase tracking-wider text-zap">Staff pick</span>}
          {prompt.isNew && <span className="text-[10px] font-semibold uppercase tracking-wider text-aqua">New</span>}
        </div>
        <h3 className="mt-1 font-display text-[17px] font-semibold leading-snug tracking-tight">{prompt.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-ink-400">{prompt.description}</p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <div className="flex items-center gap-2">
            <Avatar name={prompt.author.name} hue={prompt.author.hue} />
            <span className="text-xs text-ink-300">@{prompt.author.handle}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-ink-400">
            <button
              onClick={(e) => { e.preventDefault(); setLiked((l) => !l); }}
              className={cx('relative z-10 inline-flex items-center gap-1 transition-colors hover:text-ember', liked && 'text-ember')}
            >
              <Heart className={cx('h-3.5 w-3.5', liked && 'fill-ember')} /> {compact(prompt.likes + (liked ? 1 : 0))}
            </button>
            <span className="inline-flex items-center gap-1"><Play className="h-3 w-3" /> {compact(prompt.uses)}</span>
            <span className={cx('rounded-full px-2 py-0.5 font-medium', prompt.price ? 'bg-white/5 text-ink-100' : 'bg-zap/10 text-zap')}>
              {prompt.price ? `₹${prompt.price}` : 'Free'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
