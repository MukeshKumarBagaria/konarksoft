import Link from "next/link";

import { BrandMark } from "@/components/navigation/brand-logo";
import { buttonStyles } from "@/components/ui/button";
import { PaperPlaneIcon, PhoneIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import type { CtaContent } from "@/types/content";

/** `tel:` wants the digits, not the spacing a human needs to read the number. */
function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/**
 * The booking block that closes every marketing page. Its bottom edge is the
 * clip line for the footer wordmark rising behind it, so nothing may sit
 * between this card and `SiteFooter`'s reveal window.
 */
export function SiteCta({ content }: { content: CtaContent }) {
  return (
    <section aria-labelledby="cta-heading" className="relative z-10">
      <div className="canvas-ember relative overflow-hidden rounded-[2rem] px-7 py-11 sm:px-10 sm:py-14 lg:flex lg:items-stretch lg:justify-between lg:gap-14 lg:px-14">
        <div className="relative lg:flex lg:flex-col lg:justify-center lg:py-2">
          <h2
            id="cta-heading"
            className="text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.06] font-bold tracking-[-0.03em] text-white text-balance"
          >
            {content.heading.lead}
            <span className="block font-display text-[1.04em] font-normal italic">
              {content.heading.accent}
            </span>
            <span className="block">{content.heading.trail}</span>
          </h2>

          <div className="mt-9 flex flex-col gap-4 font-display text-lg text-white/85 sm:flex-row sm:items-center sm:gap-9 sm:text-xl">
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-flex items-center gap-3 transition-colors duration-300 hover:text-white"
            >
              <PaperPlaneIcon className="h-[18px] w-[18px] shrink-0" />
              {siteConfig.contactEmail}
            </a>

            <a
              href={telHref(siteConfig.contactPhone)}
              className="inline-flex items-center gap-3 transition-colors duration-300 hover:text-white"
            >
              <PhoneIcon className="h-[18px] w-[18px] shrink-0" />
              {siteConfig.contactPhone}
            </a>
          </div>
        </div>

        <div className="relative mt-10 w-full rounded-[1.5rem] bg-white p-7 shadow-float lg:mt-0 lg:w-[21rem] lg:shrink-0">
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
      </div>
    </section>
  );
}
