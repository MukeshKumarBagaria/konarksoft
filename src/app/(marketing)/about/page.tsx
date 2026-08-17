import type { Metadata } from "next";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { aboutContent } from "@/content/about";
import { AboutHero } from "@/features/marketing/components/about-hero";
import { AboutMission } from "@/features/marketing/components/about-mission";
import { AboutPrinciples } from "@/features/marketing/components/about-principles";
import { AboutStats } from "@/features/marketing/components/about-stats";
import { AboutTeam } from "@/features/marketing/components/about-team";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata: Metadata = createPageMetadata(aboutContent);

/**
 * The hero runs its own entrance on mount; everything below it reveals on
 * scroll, so the page is wrapped from the mission down rather than whole.
 * `SiteFooter` closes the page with the booking CTA, as on every route.
 */
export default function AboutPage() {
  return (
    <>
      <AboutHero content={aboutContent.hero} />

      <ScrollReveal>
        <AboutMission content={aboutContent.mission} />
        <AboutPrinciples content={aboutContent.principles} />
        <AboutStats items={aboutContent.stats} />
        <AboutTeam content={aboutContent.team} />
      </ScrollReveal>
    </>
  );
}
