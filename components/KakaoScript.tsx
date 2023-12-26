'use client';

import Script from 'next/script';

export default function KakaoScript() {
  return (
    <Script
      src="https://developers.kakao.com/sdk/js/kakao.js"
      onLoad={() => {
        const { Kakao } = window;
        if (!Kakao.isInitialized()) {
          Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
        }
      }}
    />
  );
}
