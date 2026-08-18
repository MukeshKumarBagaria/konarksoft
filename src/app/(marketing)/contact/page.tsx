import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { contactContent } from "@/content/contact";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata: Metadata = createPageMetadata(contactContent);

/**
 * The form itself closes the page from the layout's `closing` slot — see
 * `@closing/contact/page.tsx` — so it sits against the footer wordmark reveal.
 */
export default function ContactPage() {
  return <PageHeader {...contactContent.header} />;
}
