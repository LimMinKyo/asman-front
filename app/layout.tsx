import localFont from 'next/font/local';
import GoogleAnalytics from 'components/GoogleAnalytics';
import GoogleTagManager from 'components/GoogleTagManager';
import 'styles/globals.css';

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
        </head>
        <body>{children}</body>
      </html>
      <GoogleAnalytics />
      <GoogleTagManager />
    </>
  );
}
