import { lazy, type ComponentType } from 'react';

type Module = { default: ComponentType };

/**
 * A code-split page that can be loaded ahead of rendering.
 * Once preload() has resolved, it renders synchronously — so a prerendered page
 * hydrates without suspending, while other pages still load on demand.
 */
export function lazyPage(factory: () => Promise<Module>) {
  let Loaded: ComponentType | null = null;
  const Lazy = lazy(factory);
  function Page() {
    return Loaded ? <Loaded /> : <Lazy />;
  }
  Page.preload = () =>
    factory().then((m) => {
      Loaded = m.default;
    });
  return Page;
}
