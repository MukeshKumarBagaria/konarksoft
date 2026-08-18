import { HowItWorks } from "@/features/landing/components/how-it-works";
import { LandingFaq } from "@/features/landing/components/landing-faq";
import { LandingHero } from "@/features/landing/components/landing-hero";
import { LandingPricing } from "@/features/landing/components/landing-pricing";
import { LandingTestimonials } from "@/features/landing/components/landing-testimonials";
import { LeadForm } from "@/features/landing/components/lead-form";
import { PainPoints } from "@/features/landing/components/pain-points";
import { ProofStrip } from "@/features/landing/components/proof-strip";
import { StickyOfferBar } from "@/features/landing/components/sticky-offer-bar";
import { WhatsIncluded } from "@/features/landing/components/whats-included";
import type { LandingContent } from "@/types/content";

/**
 * Every ad landing page, assembled. The section order is the argument, and it
 * is deliberately the same on all of them, because it is the order a cold
 * visitor makes the decision in: what this is → who says so → why they came →
 * what it costs → what they get → how it runs → who else did it → what they are
 * still worried about → how to start.
 *
 * Pricing sits fourth rather than last on purpose. Price is the first objection
 * in this market, and burying it four scrolls down is what makes paid traffic
 * leave. What changes between pages is the copy, which lives entirely in
 * `content/<page>.ts`.
 *
 * Nothing here reveals on scroll. The marketing pages animate sections in with
 * GSAP, which is right for a portfolio and wrong for a page reached from an ad
 * on a slow connection — content that starts invisible is content that can fail
 * to arrive.
 */
export function LandingPage({ content }: { content: LandingContent }) {
  return (
    <>
      <LandingHero content={content.hero} plans={content.pricing.plans} />
      <ProofStrip content={content.proof} />
      <PainPoints content={content.problem} />
      <LandingPricing content={content.pricing} />
      <WhatsIncluded content={content.included} />
      <HowItWorks content={content.process} />
      <LandingTestimonials content={content.testimonials} />
      <LandingFaq content={content.faq} />
      <LeadForm content={content.form} />
      <StickyOfferBar content={content.sticky} />
    </>
  );
}
