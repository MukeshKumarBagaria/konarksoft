import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";
import { CheckIcon, PaperPlaneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/utils/whatsapp";
import type { NextStepsContent } from "@/types/content";

/**
 * Accent word: the same iris → rose → brand sweep the other section headings
 * use, so this block reads as part of the set even though it carries no cards.
 * The trailing padding buys back the room the italic eats from its right edge.
 */
const accentStyles =
  "bg-linear-to-r from-iris via-rose to-brand bg-clip-text pe-[0.12em] font-display font-normal italic text-transparent";

/**
 * The block the homepage closes on: three steps, four assurances, one action.
 *
 * It answers the question that actually stalls an enquiry — *what am I signing
 * up for if I message these people* — rather than describing the work, which
 * the hero and the portfolio above it have already done. Nothing here asks the
 * reader to compare, choose or calculate: by the time they reach the buttons
 * the only decision left is whether to press one.
 *
 * It keeps the `pricing-field` the plan cards used to sit on. That gradient
 * runs pale to deep amber, so the section is laid out to suit it: dark type at
 * the top where the ground is near-white, white cards and pills below, and the
 * buttons at the saturated end, where they carry the most contrast on the page.
 */
export function NextSteps({ content }: { content: NextStepsContent }) {
  return (
    <section
      aria-labelledby="next-steps-heading"
      className="pricing-field relative overflow-hidden py-20 sm:py-24"
    >
      {/* `relative` lifts the column over the field's grid, which is a
          positioned pseudo-element and would otherwise paint on top. */}
      <div className="relative mx-auto max-w-5xl px-5">
        <p className="text-center text-xs font-semibold tracking-[0.16em] text-brand uppercase">
          {content.eyebrow}
        </p>

        <h2
          id="next-steps-heading"
          className="mt-4 text-center text-[clamp(2rem,4.2vw,3.05rem)] leading-[1.14] font-bold tracking-[-0.03em] text-ink text-balance"
        >
          {content.heading.lead}
          <span className="block">
            {content.heading.trail}{" "}
            <span className={accentStyles}>{content.heading.accent}</span>
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-center text-lg text-ink/70 text-pretty">
          {content.description}
        </p>

        {/* An `<ol>`, so the order is in the markup rather than only in the
            numerals — which are decoration here and hidden from assistive
            software for that reason. */}
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {content.steps.map((step) => (
            <li
              key={step.index}
              className="rounded-[1.5rem] bg-white/90 p-7 shadow-pill ring-1 ring-hairline backdrop-blur-sm"
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

        <ul className="mt-9 flex flex-wrap justify-center gap-2.5">
          {content.assurances.map((assurance) => (
            <li
              key={assurance}
              className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-[14px] font-medium text-ink shadow-pill backdrop-blur-sm"
            >
              <CheckIcon className="h-4 w-4 shrink-0 text-brand" />
              {assurance}
            </li>
          ))}
        </ul>

        <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={content.cta.href}
            className={buttonStyles({
              size: "lg",
              className: "w-full sm:w-auto",
            })}
          >
            <PaperPlaneIcon className="h-[18px] w-[18px]" />
            {content.cta.label}
          </Link>

          {/* `target="_blank"` on purpose: on desktop `wa.me` opens WhatsApp
              Web, and doing that in this tab would throw the homepage away for
              anyone not already signed in there. */}
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
        </div>

        <p className="mt-5 text-center text-[14px] text-ink/65">
          {content.note}
        </p>
      </div>
    </section>
  );
}
