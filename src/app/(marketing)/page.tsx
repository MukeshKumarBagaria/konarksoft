import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { ctaBannerContent } from "@/content/cta";
import { heroContent, homeMeta, nextStepsContent } from "@/content/home";
import { recentWorkContent } from "@/content/work";
import { CtaBanner } from "@/features/marketing/components/cta-banner";
import { Hero } from "@/features/marketing/components/hero";
import { NextSteps } from "@/features/marketing/components/next-steps";
import { RecentWork } from "@/features/marketing/components/recent-work";

/**
 * `openGraph` is restated in full rather than adding just `title`/`description`
 * on top of the root layout's: Next overwrites a nested object like `openGraph`
 * wholesale with whichever segment defines it last, it does not merge field by
 * field. Leaving out `type`/`siteName`/`locale` here would silently drop them
 * from the homepage's tags. `images` needs no entry — `opengraph-image.tsx` and
 * `twitter-image.tsx` in this folder inject those automatically, scoped to
 * this route alone.
 */
export const metadata: Metadata = {
  title: homeMeta.title,
  description: homeMeta.description,
  keywords: [...homeMeta.keywords],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: homeMeta.title,
    description: homeMeta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: homeMeta.title,
    description: homeMeta.description,
  },
};

/**
 * Organization + WebSite structured data. Homepage-only, per the current SEO
 * pass — every fact here has to be one already published elsewhere on the
 * site, so nothing here is a claim search engines could catch out.
 *
 * Deliberately omits `sameAs`: the social links in `siteConfig.social` are
 * flagged there as placeholder handles, not the studio's verified profiles.
 * `sameAs` is an entity-identity claim — pointing it at the wrong account is
 * worse than leaving it out — so add it only once those are real.
 *
 * `<script>` rather than `next/script`: this is inert structured data, not
 * behaviour to schedule, and the JSON is escaped per the Next.js docs so a
 * value containing `<` cannot break out of the tag.
 */
function organizationJsonLd() {
  const telephone = siteConfig.contactPhone.replace(/\s+/g, "");

  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/icon.svg`,
        description: siteConfig.description,
        email: siteConfig.contactEmail,
        telephone,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone,
            email: siteConfig.contactEmail,
            contactType: "sales",
            areaServed: "IN",
            availableLanguage: ["English", "Hindi"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };

  return JSON.stringify(json).replace(/</g, "\\u003c");
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: organizationJsonLd() }}
      />
      <Hero content={heroContent} />
      <CtaBanner content={ctaBannerContent} />
      <RecentWork content={recentWorkContent} />
      <NextSteps content={nextStepsContent} />
    </>
  );
}
