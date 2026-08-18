import type { Metadata } from "next";

import { websiteDevelopmentContent } from "@/content/website-development";
import { LandingPage } from "@/features/landing/components/landing-page";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata: Metadata = createPageMetadata(websiteDevelopmentContent);

/** Ad destination for the website-development campaigns. */
export default function WebsiteDevelopmentPage() {
  return <LandingPage content={websiteDevelopmentContent} />;
}
