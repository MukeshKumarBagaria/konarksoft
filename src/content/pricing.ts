import type { PageContent, PricingPlansContent } from "@/types/content";

export const pricingContent: PageContent = {
  meta: {
    title: "Pricing",
    description:
      "Fixed-scope projects or a monthly retainer covering design, development and ad management.",
  },
  canonical: "/pricing",
  header: {
    eyebrow: "Pricing",
    title: "Priced to the scope, not the hour",
    description:
      "Fixed quotes for defined projects, or a monthly retainer when design, development and campaigns need to keep moving together.",
  },
};

/** Placeholder figures — swap in the real rates before this goes live. */
export const pricingPlansContent: PricingPlansContent = {
  heading: { lead: "Endless Design,", trail: "One", accent: "Simple Plan" },
  plans: [
    {
      audience: "For Team or Start-up",
      flag: "Most Popular",
      price: "$5,997",
      period: "Monthly",
      includes: "Includes Everything in Startup",
      features: [
        "40 hours of dedicated design support",
        "2X Senior designer",
        "Bi-weekly progress meetings",
        "Unlimited design requests",
        "Up to 100 hours of design work each month",
        "Communication through Slack, & Meetings",
      ],
      actions: [{ label: "Get Started", href: "/contact" }],
      tone: "ember",
    },
    {
      audience: "For Enterprise",
      flag: "25% Off",
      price: "$9,997",
      period: "One Time Payment",
      includes: "Includes Everything in Enterprise",
      features: [
        "2 Business Days Turnaround",
        "Web & Mobile Design",
        "Print Design",
        "Social Media Design",
        "Brand Style Guide",
        "Priority Support",
      ],
      actions: [
        { label: "Book a Call", href: "/contact" },
        { label: "Contact Us", href: "/contact" },
      ],
      tone: "frost",
    },
  ],
  strip: {
    heading: {
      lead: "Book a Free 15 - Minute",
      trail: "Intro Call for",
      accent: "Your Project",
    },
    points: [
      "No cost, no commitment",
      "Understand our process",
      "Get answers to your questions",
    ],
    cta: { label: "Book a Call", href: "/contact" },
  },
};
