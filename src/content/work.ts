import { siteConfig } from "@/config/site";
import type { PageContent, RecentWorkContent } from "@/types/content";

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

/** Placeholder projects — swap in real client names and disciplines. */
export const recentWorkContent: RecentWorkContent = {
  heading: { lead: "Our Recent", accent: "Work" },
  items: [
    { title: "Ignite Flow", tags: ["Branding", "UI/UX Design"], tone: "lime" },
    {
      title: "Spark Layer",
      tags: ["Web App", "Development"],
      tone: "violet",
    },
    {
      title: "Northbeam",
      tags: ["Mobile App", "UI/UX Design"],
      tone: "amber",
    },
    { title: "Meridian", tags: ["Meta Ads", "Google Ads"], tone: "sky" },
  ],
};
