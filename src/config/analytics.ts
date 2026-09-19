/**
 * Measurement IDs for the tags that count leads, read from the environment so
 * the same build can run against a test property.
 *
 * Every one is optional and every one is checked before its tag is written:
 * with none of them set the site ships no third-party script at all, which is
 * the state a fresh clone and a preview deploy should stay in. `NEXT_PUBLIC_`
 * is required — these are read in the browser — and each has to be spelled out
 * in full below, because Next inlines the literal `process.env.NEXT_PUBLIC_X`
 * at build time rather than reading the object at runtime.
 */
export const analyticsConfig = {
  /** GA4, e.g. `G-XXXXXXXXXX`. Reports the lead as `generate_lead`. */
  ga4: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
  /** Google Ads, e.g. `AW-123456789`. */
  googleAds: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "",
  /**
   * The conversion label from the Google Ads action, e.g. `AbC-D_efGh12`. Ads
   * needs the pair — the account id alone records nothing — so the conversion
   * only fires when both are present.
   */
  googleAdsLeadLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL ?? "",
  /** Meta pixel, the numeric id from Events Manager. */
  metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
} as const;

/** GA4 and Ads share one gtag.js load; either id alone is enough to want it. */
export const googleTagId = analyticsConfig.ga4 || analyticsConfig.googleAds;
