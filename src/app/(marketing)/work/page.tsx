import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { workContent } from "@/content/work";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata: Metadata = createPageMetadata(workContent);

export default function WorkPage() {
  return <PageHeader {...workContent.header} />;
}
