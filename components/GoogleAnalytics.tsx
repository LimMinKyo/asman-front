'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';
import * as gtag from 'utils/gtag';

export default function GoogleAnalytics() {
  const pathname = usePathname();

  /**
   * GA 페이지 조회 수 측정
   */
  useEffect(() => {
    if (!window.gtag || !pathname) {
      return;
    }

    gtag.pageview(pathname);
  }, [pathname]);

  return gtag.GA_TRACKING_ID ? (
    <>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gtag.GA_TRACKING_ID}', {
          page_path: window.location.pathname,
        });
      `}</Script>
      {/* <!-- End Google tag (gtag.js) --> */}
    </>
  ) : null;
}
