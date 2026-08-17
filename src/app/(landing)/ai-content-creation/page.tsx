import type { Metadata } from "next";

import { aiContentCreationContent } from "@/content/ai-content-creation";
import { LandingPage } from "@/features/landing/components/landing-page";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata: Metadata = createPageMetadata(aiContentCreationContent);

/** Ad destination for the AI content-creation campaigns. */
export default function AiContentCreationPage() {
  return <LandingPage content={aiContentCreationContent} />;
}
