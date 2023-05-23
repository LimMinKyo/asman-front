import Script from 'next/script';
import getRuntimeEnv from 'utils/env';

const GTM_ID = getRuntimeEnv('NEXT_PUBLIC_GTM_ID');

export default function GoogleTagManager() {
  return GTM_ID ? (
    <>
      {/* <!-- Google Tag Manager --> */}
      <Script id="gtm-init" strategy="afterInteractive">{`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
      `}</Script>
      {/* <!-- End Google Tag Manager --> */}

      {/* <!-- Google Tag Manager (noscript) --> */}
      <noscript>
        <iframe
          title="gtm-noscript"
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      {/* <!-- End Google Tag Manager (noscript) --> */}
    </>
  ) : null;
}
