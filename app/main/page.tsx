'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from 'react-daisyui';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('access-token');
    if (!accessToken) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex flex-col justify-center gap-8 mt-4">
      <Link href="/dividends">
        <Button className="w-full">배당일지</Button>
      </Link>
    </div>
  );
}
