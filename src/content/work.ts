import { siteConfig } from "@/config/site";
import type { PageContent } from "@/types/content";

export const workContent: PageContent = {
  meta: {
    title: "Work",
    description: `Selected websites, mobile apps and ad campaigns delivered by ${siteConfig.name}.`,
  },
  canonical: "/work",
  header: {
    eyebrow: "Work",
    title: "Selected projects",
    description:
      "A short list of recent engagements. Case studies are published as each client goes live.",
  },
};
