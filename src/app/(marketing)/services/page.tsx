import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { servicesContent } from "@/content/services";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata: Metadata = createPageMetadata(servicesContent);

export default function ServicesPage() {
  return <PageHeader {...servicesContent.header} />;
}
