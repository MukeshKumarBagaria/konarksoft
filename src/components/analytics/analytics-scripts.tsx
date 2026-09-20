import Script from "next/script";

import { analyticsConfig, googleTagId } from "@/config/analytics";

/**
 * The measurement tags, written into every page.
 *
 * Nothing is emitted for an id that is not configured, so a clone with an
 * empty `.env.local` loads no third-party script and the lead events in
 * `track-lead.ts` quietly no-op.
 *
 * `afterInteractive` rather than `beforeInteractive`: these count conversions,
 * they do not render anything, and a visitor on a phone on mobile data should
 * get the page first. The ids are interpolated through `JSON.stringify` so a
 * stray quote in an environment variable cannot break out of the string it
 * sits in.
 */

export function AnalyticsScripts() {
  const { metaPixel } = analyticsConfig;

  if (!googleTagId && !metaPixel) return null;

  return (
    <>
      {googleTagId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
            strategy="afterInteractive"
          />
          <Script id="google-tag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${analyticsConfig.ga4 ? `gtag('config', ${JSON.stringify(analyticsConfig.ga4)});` : ""}
${analyticsConfig.googleAds ? `gtag('config', ${JSON.stringify(analyticsConfig.googleAds)});` : ""}`}
          </Script>
        </>
      ) : null}

      {metaPixel ? (
        <>
          <Script id="meta-pixel-init" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', ${JSON.stringify(metaPixel)});
fbq('track', 'PageView');`}
          </Script>

          {/* Counts the page view for the minority with JavaScript off. The
              lead events cannot be covered this way — they need a script — but
              the traffic numbers stay honest. */}
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${encodeURIComponent(metaPixel)}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      ) : null}
    </>
  );
}
