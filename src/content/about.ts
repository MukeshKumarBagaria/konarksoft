import { siteConfig } from "@/config/site";
import type { PageContent } from "@/types/content";

export const aboutContent: PageContent = {
  meta: {
    title: "About",
    description: `${siteConfig.name} is a small senior team building websites, mobile apps and paid campaigns for growing businesses.`,
  },
  canonical: "/about",
  header: {
    eyebrow: "About",
    title: "A digital partner, not a vendor",
    description:
      "Design, development and paid media sit in one team, so nobody hands your project across an agency boundary and hopes for the best.",
  },
};
