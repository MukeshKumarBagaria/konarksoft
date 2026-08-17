import type { NavItem, NavLink } from "@/types/navigation";

/** Every public page, in the order it should appear in the "All Pages" menu and the sitemap. */
export const sitePages: readonly NavLink[] = [
  { label: "Home", href: "/", description: "Design without limits" },
  { label: "About", href: "/about", description: "The studio and how we work" },
  {
    label: "Services",
    href: "/services",
    description: "Brand, product and web design",
  },
  { label: "Work", href: "/work", description: "Selected client projects" },
  {
    label: "Pricing",
    href: "/pricing",
    description: "Simple monthly subscriptions",
  },
  { label: "Contact", href: "/contact", description: "Start a conversation" },
];

/**
 * Ad landing pages. Deliberately absent from `mainNav`, the "All Pages" menu
 * and the footer — they answer to paid traffic and carry no site navigation of
 * their own — but listed here so `sitemap.xml` still finds them.
 */
export const landingPages: readonly NavLink[] = [
  {
    label: "Website Development",
    href: "/website-development",
    description: "Fixed-price websites from ₹4,999",
  },
  {
    label: "Mobile App Development",
    href: "/mobile-app-development",
    description: "Flutter and React Native apps from ₹49,999",
  },
  {
    label: "Meta & Google Ads",
    href: "/meta-google-ads",
    description: "Campaign management from ₹14,999 a month",
  },
  {
    label: "AI Content Creation",
    href: "/ai-content-creation",
    description: "Brand-voice content from ₹9,999 a month",
  },
];

export const mainNav: readonly NavItem[] = [
  { kind: "menu", label: "All Pages", items: sitePages },
  { kind: "link", label: "About", href: "/about" },
  { kind: "link", label: "Services", href: "/services" },
  { kind: "link", label: "Work", href: "/work" },
  { kind: "link", label: "Contact", href: "/contact" },
];

export const primaryCta: NavLink = { label: "Book a Call", href: "/contact" };
