import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { buttonStyles } from "@/components/ui/button";
import { PhoneIcon } from "@/components/ui/icons";
import { primaryCta } from "@/config/navigation";
import { pricingContent, pricingPlansContent } from "@/content/pricing";
import { PricingPlans } from "@/features/marketing/components/pricing-plans";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata: Metadata = createPageMetadata(pricingContent);

export default function PricingPage() {
  return (
    <>
      <PageHeader {...pricingContent.header}>
        <Link href={primaryCta.href} className={buttonStyles({ size: "lg" })}>
          <PhoneIcon className="h-4 w-4" />
          {primaryCta.label}
        </Link>
      </PageHeader>

      {/* The same offer the home page carries. A pricing route that shows no
          prices is the one page ad traffic never forgives. */}
      <PricingPlans content={pricingPlansContent} />
    </>
  );
}
