'use client';

import Link from 'next/link';
import { Button } from 'react-daisyui';

export default function Home() {
  return (
    <div className="flex flex-col justify-center gap-8 mt-4">
      <Link href="/dividends">
        <Button className="w-full">배당일지</Button>
      </Link>
    </div>
  );
}
