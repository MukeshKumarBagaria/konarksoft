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

export const mainNav: readonly NavItem[] = [
  { kind: "menu", label: "All Pages", items: sitePages },
  { kind: "link", label: "About", href: "/about" },
  { kind: "link", label: "Services", href: "/services" },
  { kind: "link", label: "Work", href: "/work" },
  { kind: "link", label: "Contact", href: "/contact" },
];

export const primaryCta: NavLink = { label: "Book a Call", href: "/contact" };
