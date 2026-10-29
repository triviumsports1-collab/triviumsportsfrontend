/**
 * Google Analytics 4 — Next.js App Router integration.
 *
 * Uses `next/script` with strategy="afterInteractive" so the gtag library
 * loads after the page becomes interactive and never blocks rendering or
 * hydration.  This matches Google's recommended snippet exactly.
 *
 * Mount this component exactly once — inside <body> in app/layout.tsx.
 * It is a Server Component and renders nothing when the measurement ID is
 * not configured (e.g. local dev without NEXT_PUBLIC_GA_MEASUREMENT_ID set).
 */
import Script from "next/script";
import { GA_MEASUREMENT_ID, isAnalyticsEnabled } from "@/lib/analytics/gtag";

export default function Analytics() {
  if (!isAnalyticsEnabled()) {
    return null;
  }

  return (
    <>
      {/* Load the GA4 gtag.js library */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />

      {/* Initialise the data layer and send the initial page-view */}
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
