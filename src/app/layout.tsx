import localFont from 'next/font/local';
import GoogleAnalytics from 'src/components/GoogleAnalytics';
import GoogleTagManager from 'src/components/GoogleTagManager';
import 'src/styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';
import ReactQueryClientProvider from '../components/ReactQueryClientProvider';
import GlobalModal from 'src/components/ui/organisms/modals/GlobalModal';
import { Toaster } from 'react-hot-toast';
import KakaoScript from 'src/components/KakaoScript';
import RecoilRootProvider from 'src/components/RecoilRootProvider';
import { Metadata } from 'next';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
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

export const metadata: Metadata = {
  title: '부자가 되어가는 사람들의 일기, 부자일기',
  description: '부자가 되어가는 사람들의 일기',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="ko" className={pretendard.className}>
        <head>
          {/* <script src="/__ENV.js" defer /> */}
          <KakaoScript />
        </head>
        <body className="max-w-xl mx-auto px-5">
          <ReactQueryClientProvider>
            <RecoilRootProvider>
              {children}
              <GlobalModal />
              <Toaster />
            </RecoilRootProvider>
          </ReactQueryClientProvider>
        </body>
      </html>
      <GoogleAnalytics />
      <GoogleTagManager />
    </>
  );
}
