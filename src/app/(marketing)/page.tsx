import { ctaBannerContent } from "@/content/cta";
import { heroContent } from "@/content/home";
import { pricingPlansContent } from "@/content/pricing";
import { recentWorkContent } from "@/content/work";
import { CtaBanner } from "@/features/marketing/components/cta-banner";
import { Hero } from "@/features/marketing/components/hero";
import { PricingPlans } from "@/features/marketing/components/pricing-plans";
import { RecentWork } from "@/features/marketing/components/recent-work";

export default function HomePage() {
  return (
    <>
      <Hero content={heroContent} />
      <RecentWork content={recentWorkContent} />
      <PricingPlans content={pricingPlansContent} />
      <CtaBanner content={ctaBannerContent} />
    </>
  );
}
