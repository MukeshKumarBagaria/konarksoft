import type { Metadata } from "next";

import { mobileAppDevelopmentContent } from "@/content/mobile-app-development";
import { LandingPage } from "@/features/landing/components/landing-page";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata: Metadata = createPageMetadata(
  mobileAppDevelopmentContent,
);

/** Ad destination for the Flutter / React Native app campaigns. */
export default function MobileAppDevelopmentPage() {
  return <LandingPage content={mobileAppDevelopmentContent} />;
}
