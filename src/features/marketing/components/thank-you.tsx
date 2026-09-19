import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { buttonStyles } from "@/components/ui/button";
import {
  ArrowUpRightIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { telLink, whatsappLink } from "@/lib/utils/whatsapp";
import type { ThankYouContent } from "@/types/content";

/**
 * What a visitor sees once a form has gone through. The measurement half sits
 * in `LeadConversion`, which the route renders beside this.
 *
 * Deliberately not a dead end: someone who has just enquired is the warmest
 * traffic the site ever has, so the page hands them a way to add to what they
 * sent, a way to call, and somewhere to keep reading.
 */
export function ThankYou({ content }: { content: ThankYouContent }) {
  return (
    <>
      <PageHeader
        eyebrow={content.eyebrow}
        title={content.heading.lead}
        accent={content.heading.accent}
        description={content.description}
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          {/* `target="_blank"`: on desktop `wa.me` opens WhatsApp Web, and
              doing that in this tab would throw the page away for anyone not
              already signed in there. */}
          <a
            href={whatsappLink(siteConfig.whatsappNumber, content.chat.message)}
            target="_blank"
            rel="noreferrer"
            className={buttonStyles({
              variant: "whatsapp",
              size: "lg",
              className: "w-full sm:w-auto",
            })}
          >
            <WhatsAppIcon className="h-[18px] w-[18px] shrink-0" />
            {content.chat.label}
          </a>

          <Link
            href={content.browse.href}
            className={buttonStyles({
              variant: "secondary",
              size: "lg",
              className: "w-full sm:w-auto",
            })}
          >
            {content.browse.label}
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </PageHeader>

      <section
        aria-labelledby="thank-you-next"
        className="mx-auto max-w-5xl px-5 py-20 sm:py-24"
      >
        <h2 id="thank-you-next" className="sr-only">
          What happens next
        </h2>

        <ol className="grid gap-5 md:grid-cols-3">
          {content.steps.map((step) => (
            <li
              key={step.index}
              className="rounded-[1.5rem] bg-white p-7 shadow-pill ring-1 ring-hairline"
            >
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-soft text-[15px] font-bold text-brand ring-1 ring-inset ring-brand/15"
              >
                {step.index}
              </span>

              <h3 className="mt-5 text-xl leading-snug font-bold tracking-[-0.02em] text-ink">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted text-pretty">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-10 flex flex-col items-center justify-center gap-x-3 gap-y-2 text-center text-[15px] text-muted sm:flex-row">
          {content.fallback.lead}
          <a
            href={telLink(siteConfig.contactPhone)}
            className="inline-flex items-center gap-2 font-semibold text-ink underline decoration-brand/40 underline-offset-4 transition-colors hover:text-brand"
          >
            <PhoneIcon className="h-4 w-4" />
            {content.fallback.callLabel} — {siteConfig.contactPhone}
          </a>
        </p>
      </section>
    </>
  );
}
