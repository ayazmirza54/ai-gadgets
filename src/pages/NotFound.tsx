import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePalette } from '../lib/ui';

export default function NotFound() {
  const { open } = usePalette();
  return (
    <div className="container-z grid min-h-[70vh] place-items-center text-center">
      <div>
        <p className="h-display text-[9rem] leading-none text-zap sm:text-[12rem]">404</p>
        <h1 className="h-display mt-4 text-4xl">This page got zapped.</h1>
        <p className="mt-3 text-ink-400">It may have moved, or never existed. Try searching instead.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="btn-outline"><ArrowLeft className="h-4 w-4" /> Home</Link>
          <button onClick={open} className="btn-zap">Search Zapp</button>
        </div>
      </div>
    </div>
  );
}
