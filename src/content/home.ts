import type { HeroContent } from "@/types/content";

export const heroContent: HeroContent = {
  badge: "Now Booking",
  headline: "Design, Build & Grow",
  accent: { lead: "Without Any", highlight: "Limits" },
  subheadline: "Websites, apps and campaigns that move the numbers",
  cta: { label: "View Pricing", href: "/pricing" },
  cards: [
    { index: "01", icon: "🌐", title: "Websites", kicker: "Development" },
    { index: "02", icon: "📱", title: "Mobile Apps", kicker: "Development" },
    { index: "03", icon: "🎨", title: "Web & Mobile", kicker: "Design" },
    { index: "04", icon: "📣", title: "Meta & Google", kicker: "Ads" },
  ],
};
