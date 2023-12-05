'use client';

import localFont from 'next/font/local';
import GoogleAnalytics from 'components/GoogleAnalytics';
import GoogleTagManager from 'components/GoogleTagManager';
import 'styles/globals.css';
import ReactQueryClientProvider from './ReactQueryClientProvider';
import Script from 'next/script';
import { envKeys, getRuntimeEnv } from 'utils/env';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  style: 'normal',
  weight: '45 920',
  fallback: [
    'Pretendard Variable',
    'Pretendard',
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'sans-serif',
  ],
});

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="ko" className={pretendard.className}>
        <head>
          <script src="/__ENV.js" defer />
          <Script
            src="https://developers.kakao.com/sdk/js/kakao.js"
            onLoad={() => {
              const { Kakao } = window;
              if (!Kakao.isInitialized()) {
                Kakao.init(getRuntimeEnv(envKeys.KAKAO_API_KEY));
              }
            }}
          />
        </head>
        <body className="max-w-xl mx-auto px-5">
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </body>
      </html>
      <GoogleAnalytics />
      <GoogleTagManager />
    </>
  );
}
