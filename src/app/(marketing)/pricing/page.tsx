import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { buttonStyles } from "@/components/ui/button";
import { PhoneIcon } from "@/components/ui/icons";
import { primaryCta } from "@/config/navigation";
import { pricingContent } from "@/content/pricing";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata: Metadata = createPageMetadata(pricingContent);

export default function PricingPage() {
  return (
    <PageHeader {...pricingContent.header}>
      <Link href={primaryCta.href} className={buttonStyles({ size: "lg" })}>
        <PhoneIcon className="h-4 w-4" />
        {primaryCta.label}
      </Link>
    </PageHeader>
  );
}
