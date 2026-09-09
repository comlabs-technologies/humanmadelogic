'use client';

import { useEffect, useState } from 'react';

/** SSR-safe media query hook. Returns `false` before hydration. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    const apply = () => setMatches(list.matches);
    apply();
    list.addEventListener('change', apply);
    return () => list.removeEventListener('change', apply);
  }, [query]);

  return matches;
}

/** True when the device has a precise pointer — i.e. hover effects make sense. */
export function useFinePointer(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}
