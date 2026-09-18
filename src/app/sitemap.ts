import type { MetadataRoute } from "next";

import { landingPages, sitePages } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { caseStudies } from "@/content/portfolio";

/**
 * Derived from the navigation config and the portfolio, so neither a new page
 * nor a new case study can be forgotten here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = [...sitePages, ...landingPages].map((page) => ({
    url: new URL(page.href, siteConfig.url).toString(),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: page.href === "/" ? 1 : 0.7,
  }));

  // Ranked just under the pages that sell the services: a case study is what
  // convinces, but it is not what someone searches for first.
  const studies = caseStudies.map((study) => ({
    url: new URL(`/work/${study.slug}`, siteConfig.url).toString(),
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...studies];
}
