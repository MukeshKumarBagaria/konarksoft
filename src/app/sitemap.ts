import type { MetadataRoute } from "next";

import { sitePages } from "@/config/navigation";
import { siteConfig } from "@/config/site";

/** Derived from the navigation config so a new page can never be forgotten here. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return sitePages.map((page) => ({
    url: new URL(page.href, siteConfig.url).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority: page.href === "/" ? 1 : 0.7,
  }));
}
