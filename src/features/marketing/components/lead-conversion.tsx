"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { trackLead } from "@/lib/analytics/track-lead";

/**
 * Reports the lead to the measurement tags, once.
 *
 * Renders nothing — it is the tracking half of the thank-you page, kept apart
 * from the copy so the page itself stays a server component and the whole
 * visible shell still prerenders. It reads `useSearchParams`, so the page
 * wraps it in `<Suspense>`; without that boundary a static page that calls the
 * hook fails the production build.
 *
 * The `lead` parameter is minted by whichever form sent the visitor here. It is
 * both the platforms' deduplication key and the guard below: a refresh, a
 * back-and-forward, or a bookmarked thank-you page would otherwise each report
 * a fresh conversion and quietly inflate what the ads look like they are doing.
 */
export function LeadConversion() {
  const params = useSearchParams();

  useEffect(() => {
    const id = params.get("lead");
    if (!id) return;

    const key = `lead-reported:${id}`;

    try {
      if (window.sessionStorage.getItem(key)) return;
      window.sessionStorage.setItem(key, "1");
    } catch {
      // Private mode, or storage blocked. Reporting a possible duplicate beats
      // dropping a real lead, so this falls through rather than returning.
    }

    trackLead({
      id,
      source: params.get("src") ?? "unknown",
      kind: params.get("form") ?? "enquiry",
    });
  }, [params]);

  return null;
}
