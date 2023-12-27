import { useCallback, useEffect, useRef } from 'react';
import { InfiniteQueryObserverResult } from '@tanstack/react-query';

interface Props {
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
  hasNextPage?: boolean;
}

export const useInfiniteScroll = (
  { hasNextPage, fetchNextPage }: Props,
  options: IntersectionObserverInit,
) => {
  const ref = useRef<HTMLDivElement>(null);

  const observerCallback: IntersectionObserverCallback = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
    },
    [fetchNextPage, hasNextPage],
  );

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(observerCallback, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [observerCallback, ref, options]);

  return ref;
};
