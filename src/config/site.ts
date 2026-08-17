/**
 * Single source of truth for site-wide identity and metadata.
 * Anything that appears in more than one place (title, description, URL) lives here.
 */
export const siteConfig = {
  name: "Konark Soft",
  tagline: "Websites, apps and ads that perform",
  description:
    "Konark Soft designs and builds websites and mobile apps, and runs Meta and Google Ads campaigns for growing businesses.",
  // Absolute URL is required for canonical links, sitemaps and Open Graph images.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",
  contactEmail: "hello@konarksoft.com",
  /** Placeholder — swap in the studio's real line before launch. */
  contactPhone: "+91 00000 00000",
  /**
   * The line every WhatsApp call-to-action opens. Country code first, digits
   * only — the format `wa.me` expects. Kept in the environment because the ad
   * landing pages are useless pointed at the placeholder, and a wrong number
   * there costs money per click.
   */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919000000000",
  /**
   * Shown in the footer bar. Placeholder handles: point each one at the real
   * profile before launch, or drop the entry to hide the link.
   */
  social: [
    { label: "Facebook", href: "https://www.facebook.com/konarksoft" },
    { label: "Twitter", href: "https://x.com/konarksoft" },
    { label: "Github", href: "https://github.com/konarksoft" },
    { label: "Linkedin", href: "https://www.linkedin.com/company/konarksoft" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
