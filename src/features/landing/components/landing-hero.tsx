import { buttonStyles } from "@/components/ui/button";
import { CheckIcon, StarIcon } from "@/components/ui/icons";
import { ChatCta } from "@/features/landing/components/chat-cta";
import type { LandingContent, LandingPlan } from "@/types/content";

/**
 * Above the fold, in the order a cold visitor needs it: what this is, what it
 * costs, and one button.
 *
 * The price rail is the unusual part — most agencies hide the number until a
 * form has been filled in, and hiding it is exactly what makes ad traffic
 * bounce. Naming it here loses the people who were never going to pay it, which
 * is the point. It is set as three figures on a divided rail rather than three
 * boxes: the same information, without three more outlines on the page.
 *
 * The top padding clears the site's fixed header pill.
 */
export function LandingHero({
  content,
  plans,
}: {
  content: LandingContent["hero"];
  plans: readonly LandingPlan[];
}) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="lp-field relative isolate overflow-hidden rounded-b-[2rem] md:rounded-b-[2.75rem]"
    >
      <div
        aria-hidden="true"
        className="canvas-grid pointer-events-none absolute inset-0"
      />

      <div className="relative mx-auto max-w-3xl px-5 pt-28 pb-16 text-center sm:px-6 sm:pt-36 sm:pb-20">
        <p className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-[13px] font-medium text-ink shadow-pill backdrop-blur-sm">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand" />
          {content.badge}
        </p>

        <h1
          id="hero-heading"
          className="mt-7 text-[clamp(2.2rem,7.8vw,3.75rem)] leading-[1.06] font-extrabold tracking-[-0.035em] text-ink text-balance"
        >
          {content.headline.lead}{" "}
          <span className="font-display text-[1.05em] font-normal text-brand italic">
            {content.headline.accent}
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-muted text-pretty sm:text-lg">
          {content.subheadline}
        </p>

        {/* Full-width on a phone so the primary action is a thumb-sized target
            that cannot be missed; the pair sits inline once there is room. */}
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <ChatCta action={content.primaryCta} />

          <a
            href={content.secondaryCta.href}
            className={buttonStyles({ variant: "secondary", size: "xl" })}
          >
            {content.secondaryCta.label}
          </a>
        </div>

        {/* Two tidy columns on a phone, one centred row once there is space.
            Centre-wrapped, the longer assurances broke one to a line and left
            the block looking ragged. */}
        <ul className="mx-auto mt-8 grid max-w-sm grid-cols-2 gap-x-4 gap-y-3 text-left sm:flex sm:max-w-none sm:flex-wrap sm:justify-center sm:gap-x-6">
          {content.assurances.map((assurance) => (
            <li
              key={assurance}
              className="flex items-start gap-1.5 text-[14px] leading-snug font-medium text-ink/70 sm:items-center"
            >
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand sm:mt-0" />
              {assurance}
            </li>
          ))}
        </ul>

        {/* Divided rather than boxed: the figures come from the same plans
            rendered further down, so the two can never disagree. */}
        {/* Opaque rather than tinted-and-blurred: a `backdrop-filter` here has
            nothing to reveal over a near-white field, and stacking one over the
            grid's masked layer is exactly the combination that rasterises badly
            on some mobile GPUs. */}
        <ul className="mx-auto mt-10 flex max-w-lg divide-x divide-hairline rounded-2xl bg-white py-4 shadow-[inset_0_0_0_1px_var(--color-hairline)]">
          {plans.map((plan) => (
            <li key={plan.id} className="flex-1 px-2">
              <span className="block text-[18px] font-bold tracking-[-0.02em] text-ink sm:text-xl">
                {plan.price}
              </span>
              <span className="mt-0.5 block text-[12.5px] leading-snug text-muted sm:text-[13px]">
                {plan.shortName}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-6 inline-flex items-center gap-2 text-[14px] text-muted">
          <span className="flex gap-0.5 text-brand" aria-hidden="true">
            {Array.from({ length: 5 }, (_, star) => (
              <StarIcon key={star} className="h-4 w-4" />
            ))}
          </span>
          <span className="font-semibold text-ink">{content.rating.score}</span>
          {content.rating.label}
        </p>
      </div>
    </section>
  );
}
