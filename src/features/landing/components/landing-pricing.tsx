import { CheckIcon } from "@/components/ui/icons";
import { ChatCta } from "@/features/landing/components/chat-cta";
import { SectionHeading } from "@/features/landing/components/section-heading";
import { cn } from "@/lib/utils/cn";
import type { LandingContent, LandingPlan } from "@/types/content";

/**
 * A plan card. One padded surface rather than a coloured header stacked on a
 * white body — the split gave every card two edges, two radii and a seam, and
 * three of those side by side is most of what made this section look busy.
 *
 * The button sits directly under the price rather than at the foot of the
 * feature list: on a phone the list runs most of a screen, and anyone already
 * sold at the number should not have to scroll past eight reasons to find out
 * where to press.
 */
function PlanCard({ plan }: { plan: LandingPlan }) {
  const featured = plan.tone === "featured";

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-3xl p-6 sm:p-7",
        featured
          ? "lp-plan-dark shadow-[0_28px_60px_-34px_rgba(18,18,32,0.75)]"
          : "bg-white shadow-[inset_0_0_0_1px_var(--color-hairline)]",
      )}
    >
      {/* Every card reserves this row whether it carries a flag or not, and the
          flag sits above the name rather than beside it. Inline, the flag
          narrowed one card's text column, wrapped its audience onto a third
          line and pushed that card's price out of line with the other two —
          and a price row that does not align is a pricing table that cannot be
          compared at a glance. Same reason the audience holds two lines' worth
          of room whether or not the copy fills it. */}
      <div className="flex h-6 items-start">
        {plan.flag ? (
          <span className="rounded-full bg-brand px-2.5 py-1 text-[11.5px] leading-none font-bold tracking-[0.06em] text-white uppercase">
            {plan.flag}
          </span>
        ) : null}
      </div>

      <h3
        className={cn(
          "mt-2 text-[19px] font-bold tracking-[-0.02em]",
          featured ? "text-white" : "text-ink",
        )}
      >
        {plan.name}
      </h3>

      <p
        className={cn(
          "mt-1.5 min-h-[2.6em] text-[14px] leading-snug",
          featured ? "text-white/65" : "text-muted",
        )}
      >
        {plan.audience}
      </p>

      <p className="mt-4 flex flex-wrap items-baseline gap-x-2.5">
        <span
          className={cn(
            "text-[2.5rem] leading-none font-bold tracking-[-0.035em]",
            featured ? "text-white" : "text-ink",
          )}
        >
          {plan.price}
        </span>
        {plan.compareAt ? (
          <span
            className={cn(
              "text-lg line-through",
              featured ? "text-white/45" : "text-subtle",
            )}
          >
            {plan.compareAt}
          </span>
        ) : null}
      </p>

      <p
        className={cn(
          "mt-2 text-[13.5px]",
          featured ? "text-white/60" : "text-subtle",
        )}
      >
        {plan.priceNote}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {[plan.scope, plan.delivery].map((chip) => (
          <li
            key={chip}
            className={cn(
              "rounded-full px-3 py-1.5 text-[13px] font-semibold",
              featured
                ? "bg-white/10 text-white/85 ring-1 ring-inset ring-white/15"
                : "bg-canvas text-ink/70",
            )}
          >
            {chip}
          </li>
        ))}
      </ul>

      <ChatCta
        action={plan.cta}
        variant={featured ? "brand" : "primary"}
        size="lg"
        className="mt-5 w-full"
      />

      <div
        className={cn(
          "mt-7 border-t pt-7",
          featured ? "border-white/12" : "border-hairline",
        )}
      >
        <h4 id={`${plan.id}-features`} className="sr-only">
          {plan.name} — what is included
        </h4>
        <ul
          aria-labelledby={`${plan.id}-features`}
          className="flex flex-col gap-3.5"
        >
          {plan.features.map((feature) => (
            <li
              key={feature}
              className={cn(
                "flex items-start gap-3 text-[15.5px] leading-snug",
                featured ? "text-white/80" : "text-ink/75",
              )}
            >
              <CheckIcon className="mt-[3px] h-4 w-4 shrink-0 text-brand" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/** The three fixed plans, the quoted fourth option, and the small print. */
export function LandingPricing({
  content,
}: {
  content: LandingContent["pricing"];
}) {
  const { custom } = content;

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="scroll-mt-24 bg-canvas-warm py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          id="pricing-heading"
          eyebrow={content.eyebrow}
          heading={content.heading}
          description={content.description}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {content.plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* The fourth option. Plain white and wide, so it reads as a different
            kind of answer to the three priced cards rather than a fourth tier
            competing with them. */}
        <div className="mt-5 rounded-3xl bg-white p-7 shadow-[inset_0_0_0_1px_var(--color-hairline)] sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-14">
          <div className="lg:max-w-2xl">
            <p className="text-[13px] font-bold tracking-[0.14em] text-brand-strong uppercase">
              {custom.eyebrow}
            </p>

            <h3 className="mt-3 text-[clamp(1.45rem,4.2vw,2rem)] leading-[1.18] font-bold tracking-[-0.025em] text-ink text-balance">
              {custom.title.lead}{" "}
              <span className="font-display text-[1.06em] font-normal text-brand italic">
                {custom.title.accent}
              </span>
            </h3>

            <p className="mt-4 text-[16.5px] leading-relaxed text-muted text-pretty">
              {custom.description}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {custom.capabilities.map((capability) => (
                <li
                  key={capability}
                  className="rounded-full bg-canvas px-3.5 py-1.5 text-[14px] font-medium text-ink/70"
                >
                  {capability}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 shrink-0 lg:mt-0 lg:text-center">
            <ChatCta action={custom.cta} className="w-full lg:w-auto" />
            <p className="mt-3 text-center text-[13.5px] text-subtle">
              {custom.priceNote}
            </p>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-[14.5px] leading-relaxed text-muted text-pretty">
          {content.footnote}
        </p>
      </div>
    </section>
  );
}
