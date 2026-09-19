import { analyticsConfig } from "@/config/analytics";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export type LeadEvent = {
  /** Where the form was filled — a pathname, e.g. `/website-development`. */
  source: string;
  /** Which form it was, e.g. `contact` or `quote`. */
  kind: string;
  /**
   * A per-submission id, carried from the form to the thank-you page. Passed to
   * both platforms so a refresh, a back-button, or the same lead arriving twice
   * through different tags is counted once rather than three times.
   */
  id: string;
};

/**
 * Reports one lead to whichever tags are configured.
 *
 * Every call is guarded twice — the id has to be set *and* the tag's global has
 * to exist — because a blocker, an ad-blocking DNS, or a missing environment
 * variable all end with the same missing function, and a lead is not worth a
 * thrown error on the page that thanks someone for it.
 */
export function trackLead({ source, kind, id }: LeadEvent) {
  if (typeof window === "undefined") return;

  const { ga4, googleAds, googleAdsLeadLabel, metaPixel } = analyticsConfig;

  if (ga4 && window.gtag) {
    window.gtag("event", "generate_lead", {
      lead_source: source,
      lead_type: kind,
      transaction_id: id,
    });
  }

  // Ads needs both halves of the destination: the account and the conversion
  // action's label. One without the other records nothing at all.
  if (googleAds && googleAdsLeadLabel && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: `${googleAds}/${googleAdsLeadLabel}`,
      transaction_id: id,
    });
  }

  if (metaPixel && window.fbq) {
    window.fbq(
      "track",
      "Lead",
      { content_name: kind, content_category: source },
      // Meta's own deduplication key.
      { eventID: id },
    );
  }
}
