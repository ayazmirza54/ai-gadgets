import { createContext, useContext } from 'react';

export const PaletteContext = createContext<{ open: () => void }>({ open: () => {} });
export const usePalette = () => useContext(PaletteContext);

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');

export const compact = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '')}k` : `${n}`;
