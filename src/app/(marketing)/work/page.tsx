import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { siteConfig } from "@/config/site";
import { portfolioContent } from "@/content/portfolio";
import { AboutStats } from "@/features/marketing/components/about-stats";
import { PortfolioGrid } from "@/features/marketing/components/portfolio-grid";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata: Metadata = createPageMetadata(portfolioContent);

/**
 * `ItemList` of the published case studies, so the portfolio can surface as a
 * list in search rather than as seven unrelated URLs. Only facts already on the
 * page are included — name, description and the URL each entry links to.
 */
function portfolioJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.name} — selected work`,
    itemListElement: portfolioContent.projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.name,
      description: project.summary,
      url: `${siteConfig.url}/work/${project.slug}`,
    })),
  };

  return JSON.stringify(json).replace(/</g, "\\u003c");
}

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: portfolioJsonLd() }}
      />

      <PageHeader {...portfolioContent.header} />

      <ScrollReveal>
        {/* Lifted into the header's lower edge, the same seat the case study
            facts band takes under its own hero. */}
        <div className="relative -mt-12 sm:-mt-16">
          <AboutStats items={portfolioContent.stats} />
        </div>

        <PortfolioGrid projects={portfolioContent.projects} />
      </ScrollReveal>
    </>
  );
}
