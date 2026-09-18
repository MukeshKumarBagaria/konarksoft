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
  contactEmail: "info@konarksoft.com",
  /**
   * The studio line, shown wherever a number appears and dialled by every
   * `tel:` link. Written the way a person reads it — `telLink` strips the
   * spacing before it reaches the dialler.
   */
  contactPhone: "+91 88242 97530",
  /**
   * The line every WhatsApp call-to-action opens — the same number as
   * `contactPhone`, in the digits-only form `wa.me` expects: country code
   * first, no `+`, spaces or dashes. Still overridable from the environment so
   * a campaign can be pointed at a different line without a deploy; a wrong
   * number here costs money per click on the ad landing pages.
   */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918824297530",
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
