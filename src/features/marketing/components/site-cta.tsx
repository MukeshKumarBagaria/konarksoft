import Link from "next/link";

import { BrandMark } from "@/components/navigation/brand-logo";
import { buttonStyles } from "@/components/ui/button";
import { PhoneIcon } from "@/components/ui/icons";
import { CtaShell } from "@/features/marketing/components/cta-shell";
import type { CtaContent } from "@/types/content";

/**
 * The booking block that closes every marketing page except `/contact`, where
 * the enquiry form takes the panel instead. The card around it is `CtaShell`.
 */
export function SiteCta({ content }: { content: CtaContent }) {
  return (
    <CtaShell headingId="cta-heading" heading={content.heading}>
      <div className="relative z-10 mt-10 w-full rounded-[1.5rem] bg-white p-7 shadow-float lg:mt-0 lg:w-[21rem] lg:shrink-0">
        <span
          aria-hidden="true"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft ring-1 ring-hairline"
        >
          <BrandMark className="h-8 w-8 text-brand" />
        </span>

        <h3 className="mt-6 text-2xl leading-tight font-bold tracking-[-0.02em] text-ink">
          {content.card.title.lead}{" "}
          <span className="font-display font-normal italic text-brand">
            {content.card.title.accent}
          </span>
        </h3>

        <p className="mt-3 text-[15px] leading-relaxed text-muted text-pretty">
          {content.card.description}
        </p>

        <Link
          href={content.card.cta.href}
          className={buttonStyles({ className: "mt-6" })}
        >
          <PhoneIcon className="h-4 w-4" />
          {content.card.cta.label}
        </Link>
      </div>
    </CtaShell>
  );
}
