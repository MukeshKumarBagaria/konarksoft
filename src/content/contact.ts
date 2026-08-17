import { siteConfig } from "@/config/site";
import type { PageContent } from "@/types/content";

export const contactContent: PageContent = {
  meta: {
    title: "Contact",
    description: `Start a project with ${siteConfig.name} — book a call or send us a note.`,
  },
  canonical: "/contact",
  header: {
    eyebrow: "Contact",
    title: "Let's talk about the work",
    description:
      "Tell us what you are building or what is underperforming. We reply within one business day.",
  },
};
