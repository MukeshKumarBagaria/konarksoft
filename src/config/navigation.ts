import type { NavItem, NavLink } from "@/types/navigation";

/**
 * Every public page. No longer a menu — the header carries four entries now —
 * but still the list `sitemap.xml` is built from, so pages that are reachable
 * without being advertised (Work, Pricing, the Services overview) belong here.
 */
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
 * The four services, each pointing at its own landing page rather than at a
 * section of a shared overview. These double as the ad destinations, so a
 * visitor who arrives from the menu and one who arrives from a paid click land
 * on the same page and get the same offer.
 *
 * Descriptions lead with price because that is what the menu is being opened
 * to find out.
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
    description: "Android & iOS apps from ₹49,999",
  },
  {
    label: "Meta & Google Ads",
    href: "/meta-google-ads",
    description: "Meta & Google from ₹14,999/month",
  },
  {
    label: "AI Content Creation",
    href: "/ai-content-creation",
    description: "Brand-voice content from ₹9,999/month",
  },
];

/**
 * The header, desktop and mobile alike. Four entries: three destinations and
 * one menu. Everything else the site publishes is still reachable — from the
 * footer, from in-page links and from search — it just no longer competes for
 * attention with the services someone is here to buy.
 */
export const mainNav: readonly NavItem[] = [
  { kind: "link", label: "Home", href: "/" },
  { kind: "link", label: "About Us", href: "/about" },
  { kind: "menu", label: "Services", items: landingPages },
  { kind: "link", label: "Contact Us", href: "/contact" },
];

export const primaryCta: NavLink = { label: "Book a Call", href: "/contact" };
