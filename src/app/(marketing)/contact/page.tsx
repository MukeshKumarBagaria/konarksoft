import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { siteConfig } from "@/config/site";
import { contactContent } from "@/content/contact";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata: Metadata = createPageMetadata(contactContent);

export default function ContactPage() {
  return (
    <PageHeader {...contactContent.header}>
      <a
        href={`mailto:${siteConfig.contactEmail}`}
        className="text-lg font-semibold text-ink underline decoration-brand decoration-2 underline-offset-8 transition-colors duration-200 hover:text-brand"
      >
        {siteConfig.contactEmail}
      </a>
    </PageHeader>
  );
}
