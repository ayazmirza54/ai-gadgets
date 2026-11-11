import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const empty = new URLSearchParams();

/**
 * Like useSearchParams, but returns empty params on the first render.
 * Prerendered pages are built without a query string, so reading it during
 * hydration would make the first client render differ from the HTML.
 */
export function useHydratedSearchParams() {
  const [params, setParams] = useSearchParams();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);
  return [hydrated ? params : empty, setParams] as const;
}
