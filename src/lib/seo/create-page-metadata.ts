import type { Metadata } from "next";

import type { PageContent } from "@/types/content";

/**
 * Builds a page's metadata from its content file, so title and description
 * are written once and never drift between the page and its `<head>`.
 */
export function createPageMetadata({
  meta,
  canonical,
}: PageContent): Metadata {
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
    },
  };
}
