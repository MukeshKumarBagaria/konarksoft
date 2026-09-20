import type { ReactNode } from "react";

import { PaperPlaneIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { WhatsAppLink } from "@/features/leads/whatsapp-cta";
import { telLink } from "@/lib/utils/whatsapp";

/**
 * What the WhatsApp thread opens with. Generic on purpose: unlike the landing
 * pages, this card closes every route, so it cannot name the plan or service
 * the visitor came from.
 */
const CHAT_OPENER = `Hi ${siteConfig.name} — I'd like to talk about a project.`;

/**
 * The dark card every marketing page closes on: studio wordmark and contact
 * lines down the left, a white panel on the right. What goes in that panel is
 * the caller's — the booking card on most routes, the enquiry form on
 * `/contact` — so the two share one surface rather than two that drift apart.
 *
 * Its bottom edge is the clip line for the footer wordmark rising behind it, so
 * nothing may sit between this card and `SiteFooter`'s reveal window.
 *
 * The panel owns its own width: the booking card is a sidebar, the form is half
 * the card, and the shell should not have an opinion about which.
 */
export function CtaShell({
  headingId,
  heading,
  children,
}: {
  headingId: string;
  /** Three stacked lines; `accent` is the one set in the display serif. */
  heading: { lead: string; accent: string; trail: string };
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={headingId} className="relative z-10">
      <div className="canvas-ember relative overflow-hidden rounded-[2rem] px-7 py-11 sm:px-10 sm:py-14 lg:flex lg:items-stretch lg:justify-between lg:gap-14 lg:px-14">
        {/* Between the chevron arms and the copy — see `.canvas-ember-scrim`. */}
        <div
          aria-hidden="true"
          className="canvas-ember-scrim pointer-events-none absolute inset-0 z-1"
        />

        <div className="relative z-10 lg:flex lg:flex-col lg:justify-center lg:py-2">
          <h2
            id={headingId}
            className="text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.06] font-bold tracking-[-0.03em] text-white text-balance"
          >
            {heading.lead}
            <span className="block font-display text-[1.04em] font-normal italic">
              {heading.accent}
            </span>
            <span className="block">{heading.trail}</span>
          </h2>

          <div className="mt-9 flex flex-col gap-4 font-display text-lg text-white/85 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-9 sm:gap-y-3 sm:text-xl lg:flex-col lg:items-start lg:gap-4">
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-flex items-center gap-3 transition-colors duration-300 hover:text-white"
            >
              <PaperPlaneIcon className="h-[18px] w-[18px] shrink-0" />
              {siteConfig.contactEmail}
            </a>

            <a
              href={telLink(siteConfig.contactPhone)}
              className="inline-flex items-center gap-3 transition-colors duration-300 hover:text-white"
            >
              <PhoneIcon className="h-[18px] w-[18px] shrink-0" />
              {siteConfig.contactPhone}
            </a>

            {/* Same line as the one above it, so the number is not printed
                twice in one row — this entry is here for the channel, not the
                digits. */}
            <WhatsAppLink
              message={CHAT_OPENER}
              className="inline-flex items-center gap-3 transition-colors duration-300 hover:text-white"
            >
              <WhatsAppIcon className="h-[18px] w-[18px] shrink-0" />
              WhatsApp
            </WhatsAppLink>
          </div>
        </div>

        {children}
      </div>
    </section>
  );
}
