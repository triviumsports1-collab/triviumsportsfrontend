/**
 * Google Analytics 4 (GA4) helpers.
 *
 * The measurement ID is read from NEXT_PUBLIC_GA_MEASUREMENT_ID so it is
 * inlined into the client bundle at build time (required for the inline
 * gtag() script).  It must be prefixed NEXT_PUBLIC_ for Next.js to expose
 * it to the browser.
 */

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

/** Returns true when GA should run (ID configured + not in local dev). */
export function isAnalyticsEnabled(): boolean {
  return GA_MEASUREMENT_ID.length > 0;
}
