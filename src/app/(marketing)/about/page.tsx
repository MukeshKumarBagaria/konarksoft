import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { aboutContent } from "@/content/about";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata: Metadata = createPageMetadata(aboutContent);

export default function AboutPage() {
  return <PageHeader {...aboutContent.header} />;
}
