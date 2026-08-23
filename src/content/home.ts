import type { HeroContent } from "@/types/content";

export const heroContent: HeroContent = {
  badge: "Now Booking",
  headline: "Digital Design &",
  accent: { lead: "Development", highlight: "Agency" },
  subheadline:
    "We design and build digital products, brands and websites for companies ready to move beyond the ordinary.",
  cta: { label: "View Pricing", href: "/pricing" },
  cards: [
    {
      index: "01",
      icon: {
        src: "/images/hero-section-icon/web-development.webp",
        width: 1536,
        height: 1024,
      },
      title: "Websites",
      kicker: "Development",
    },
    {
      index: "02",
      icon: {
        src: "/images/hero-section-icon/mobile-app.webp",
        width: 1302,
        height: 1208,
      },
      title: "Mobile Apps",
      kicker: "Development",
    },
    {
      index: "03",
      icon: {
        src: "/images/hero-section-icon/design.webp",
        width: 1536,
        height: 1024,
      },
      title: "Web & Mobile",
      kicker: "Design",
    },
    {
      index: "04",
      icon: {
        src: "/images/hero-section-icon/social-media-ads.webp",
        width: 1536,
        height: 1024,
      },
      title: "Meta & Google",
      kicker: "Ads",
    },
  ],
};
