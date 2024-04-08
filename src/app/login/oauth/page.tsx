'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { jwtUtils } from 'src/utils/jwt.utils';

export default function LoginKakao() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const accessToken = params.get('access-token');
    if (accessToken) {
      jwtUtils.setAccessToken(accessToken);
      router.push('/main');
    }
  }, [params, router]);

  return (
    <div className="h-screen flex justify-center items-center text-lg font-bold">
      로그인 중...
    </div>
  );
}
