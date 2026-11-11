import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';

export function ZapMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <img
      src={logo}
      alt=""
      aria-hidden
      draggable={false}
      className={`inline-block shrink-0 select-none rounded-[22%] object-cover ring-1 ring-white/10 ${className}`}
    />
  );
}

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="Zapp home">
      <ZapMark className="h-8 w-8 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105" />
      <span className="font-display text-[22px] font-bold tracking-[-0.04em] text-white">
        zapp<span className="text-zap">.</span>
      </span>
    </Link>
  );
}
