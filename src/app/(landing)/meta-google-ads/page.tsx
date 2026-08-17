import type { Metadata } from "next";

import { metaGoogleAdsContent } from "@/content/meta-google-ads";
import { LandingPage } from "@/features/landing/components/landing-page";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata: Metadata = createPageMetadata(metaGoogleAdsContent);

/** Ad destination for the paid-media management campaigns. */
export default function MetaGoogleAdsPage() {
  return <LandingPage content={metaGoogleAdsContent} />;
}
