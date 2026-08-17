import type { CapabilitiesContent, PageContent } from "@/types/content";

export const servicesContent: PageContent = {
  meta: {
    title: "Services",
    description:
      "Website development, mobile app development, web and mobile app design, and Meta and Google Ads — from one team.",
  },
  canonical: "/services",
  header: {
    eyebrow: "Services",
    title: "Four services, one team",
    description:
      "Build it, design it, and get people to it. Start with the piece you need now and add the rest as you grow.",
  },
};

/** Shared by the home page and the services page. */
export const capabilitiesContent: CapabilitiesContent = {
  heading: { lead: "Everything you need to launch,", accent: "under one roof" },
  items: [
    {
      index: "01",
      title: "Website development",
      description:
        "Fast, accessible marketing sites and web apps, built on modern frameworks and made to scale.",
    },
    {
      index: "02",
      title: "Mobile app development",
      description:
        "Native-feeling iOS and Android apps, shipped from one codebase and supported after launch.",
    },
    {
      index: "03",
      title: "Web & mobile app design",
      description:
        "Interfaces designed around real user flows, handed over as components your team can extend.",
    },
    {
      index: "04",
      title: "Meta & Google Ads",
      description:
        "Campaigns planned, launched and tuned against the numbers that actually move revenue.",
    },
  ],
};
