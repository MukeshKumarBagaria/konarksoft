import { siteConfig } from "@/config/site";
import type { CtaBannerContent, CtaContent } from "@/types/content";

export const ctaBannerContent: CtaBannerContent = {
  heading: {
    first: { lead: "Designing", accent: "What" },
    second: { accent: "Brands", trail: "Need" },
  },
  description: "Turning what your brand needs into results you can measure.",
  cta: { label: "Book a Call", href: "/contact" },
};

export const ctaContent: CtaContent = {
  heading: { lead: siteConfig.name, accent: "Your Digital", trail: "Partner" },
  card: {
    title: { lead: "Book an Intro", accent: "Call" },
    description:
      "Twenty minutes to get introduced and work out where we can help.",
    cta: { label: "Book a Call", href: "/contact" },
  },
};
