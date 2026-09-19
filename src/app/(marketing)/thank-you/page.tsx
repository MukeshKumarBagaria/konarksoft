import type { Metadata } from "next";
import { Suspense } from "react";

import { thankYouContent } from "@/content/thank-you";
import { LeadConversion } from "@/features/marketing/components/lead-conversion";
import { ThankYou } from "@/features/marketing/components/thank-you";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

/**
 * Kept out of search: the page is worthless to someone who has not just filled
 * in a form, and indexed it would both compete with the pages that sell and
 * let a stray visit count itself as a conversion.
 *
 * `robots.txt` deliberately does not disallow it — a crawler has to fetch the
 * page to see this.
 */
export const metadata: Metadata = {
  ...createPageMetadata(thankYouContent),
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      {/* `useSearchParams` inside, so the boundary is required for the rest of
          the page to prerender. It renders nothing, hence no fallback. */}
      <Suspense fallback={null}>
        <LeadConversion />
      </Suspense>

      <ThankYou content={thankYouContent} />
    </>
  );
}
