import type { HeroContent } from "@/types/content";

/**
 * The homepage's own `<head>` fields — kept here rather than folded into
 * `PageContent` because `keywords` is a homepage-only addition; every other
 * page already gets `title`/`description` from `createPageMetadata`, and
 * giving the shared type a field only one page uses would be the wrong
 * direction to generalise in.
 */
export const homeMeta = {
  title: "Digital Design & Development Agency",
  description:
    "Konark Soft is a digital agency for websites, mobile apps, and Meta & Google Ads. Fixed-scope pricing, a senior team, and campaigns built to convert — get a free quote today.",
  keywords: [
    "website development company",
    "mobile app development agency",
    "Meta ads agency",
    "Google ads management",
    "digital marketing agency",
    "AI content creation service",
  ],
} as const;

export const heroContent: HeroContent = {
  badge: "Now Booking",
  headline: "Digital Design &",
  accent: { lead: "Development", highlight: "Agency" },
  subheadline:
    "We design and build digital products, brands and websites for companies ready to move beyond the ordinary.",
  cta: { label: "Get Pricing Quote", href: "/contact" },
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
