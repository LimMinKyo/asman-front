import { InfiniteQueryObserverResult } from '@tanstack/react-query';
import { useInfiniteScroll } from 'hooks/useInfiniteScroll';

interface Props {
  children: React.ReactNode;
  hasNextPage?: boolean;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

export default function InfiniteScroll({
  children,
  hasNextPage,
  fetchNextPage,
}: Props) {
  const ref = useInfiniteScroll(
    { fetchNextPage, hasNextPage },
    { threshold: 0.1, rootMargin: '100px' },
  );

  return (
    <div>
      {children}
      <div ref={ref} />
    </div>
  );
}
