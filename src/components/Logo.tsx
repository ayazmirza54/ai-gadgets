import { Link } from 'react-router-dom';

export function ZapMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <span className={`relative inline-grid place-items-center rounded-[10px] bg-zap text-ink-950 ${className}`}>
      <svg viewBox="0 0 24 24" className="h-[62%] w-[62%]" fill="currentColor" aria-hidden>
        <path d="M13.6 2.2 4.8 13.1c-.4.5 0 1.2.6 1.2h5.1l-1.4 7.1c-.1.7.8 1.1 1.2.5l8.8-10.9c.4-.5 0-1.2-.6-1.2h-5.1l1.4-7.1c.1-.7-.8-1.1-1.2-.5Z" />
      </svg>
    </span>
  );
}

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="Zapp home">
      <ZapMark className="h-8 w-8 transition-transform duration-300 group-hover:-rotate-12" />
      <span className="font-display text-[22px] font-bold tracking-[-0.04em] text-white">
        zapp<span className="text-zap">.</span>
      </span>
    </Link>
  );
}
