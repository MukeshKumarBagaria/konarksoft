import Link from "next/link";
import type { ComponentType } from "react";

import { buttonStyles, type ButtonVariant } from "@/components/ui/button";
import {
  CheckCircleIcon,
  CheckCircleOutlineIcon,
  CheckIcon,
  PhoneIcon,
  UsersIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";
import type {
  PricingPlan,
  PricingPlansContent,
  PricingTone,
} from "@/types/content";

/**
 * Everything that separates the two cards, keyed by tone. Kept as one table
 * rather than ternaries at each use so a third plan is a new row here and no
 * edits in the markup.
 */
const toneStyles: Record<
  PricingTone,
  {
    shell: string;
    head: string;
    audience: string;
    flag: string;
    price: string;
    period: string;
    rule: string;
    body: string;
    includes: string;
    feature: string;
    bullet: ComponentType<{ className?: string }>;
    bulletColor: string;
    /** Applied to every action after the first. */
    trailingAction: ButtonVariant;
  }
> = {
  ember: {
    shell: "plan-ember",
    head: "plan-ember-head ring-1 ring-inset ring-white/25",
    audience: "text-white/90",
    flag: "bg-white/20 text-white ring-1 ring-inset ring-white/30",
    price: "text-white",
    period: "text-white/80",
    rule: "border-white/25",
    body: "plan-ember-body ring-1 ring-inset ring-white/10",
    includes: "text-white",
    feature: "text-white/90",
    bullet: CheckCircleIcon,
    bulletColor: "text-white",
    trailingAction: "secondary",
  },
  frost: {
    shell: "plan-frost ring-1 ring-hairline",
    head: "plan-frost-head ring-1 ring-inset ring-hairline",
    audience: "text-muted",
    flag: "bg-rose/10 text-rose ring-1 ring-inset ring-rose/20",
    price: "text-iris-strong",
    period: "text-muted",
    rule: "border-rose/30",
    body: "plan-frost-body ring-1 ring-inset ring-hairline",
    includes: "text-ink/70",
    feature: "text-ink/85",
    bullet: CheckCircleOutlineIcon,
    bulletColor: "text-rose",
    trailingAction: "secondary",
  },
};

/**
 * Accent words: display serif swept iris → rose → brand, so the second heading
 * line crosses the same cool-to-warm range the two cards below it split between
 * them. The trailing padding buys back the room the italic eats from its right
 * edge.
 */
const accentStyles =
  "bg-linear-to-r from-iris via-rose to-brand bg-clip-text pe-[0.12em] font-display font-normal italic text-transparent";

function PlanCard({ plan }: { plan: PricingPlan }) {
  const tone = toneStyles[plan.tone];
  const Bullet = tone.bullet;
  const slug = plan.audience.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <article
      className={cn("flex flex-col rounded-[1.75rem] p-3.5 sm:p-4", tone.shell)}
    >
      <header className={cn("rounded-[1.4rem] px-5 py-6 sm:px-7", tone.head)}>
        <div className="flex items-start justify-between gap-4">
          <h3
            className={cn(
              "inline-flex items-center gap-2 text-[15px] font-medium",
              tone.audience,
            )}
          >
            <UsersIcon className="h-[18px] w-[18px] shrink-0" />
            {plan.audience}
          </h3>

          {plan.flag ? (
            <span
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-[13px] font-medium",
                tone.flag,
              )}
            >
              {plan.flag}
            </span>
          ) : null}
        </div>

        <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
          <span
            className={cn(
              "text-[clamp(2.1rem,4vw,2.85rem)] leading-none font-bold tracking-[-0.03em]",
              tone.price,
            )}
          >
            {plan.price}
          </span>
          <span className={cn("font-display text-[15px] italic", tone.period)}>
            /{plan.period}
          </span>
        </p>
      </header>

      <div className={cn("mx-2 my-3.5 border-t border-dashed", tone.rule)} />

      <div
        className={cn(
          "flex flex-1 flex-col rounded-[1.4rem] px-5 py-7 sm:px-7",
          tone.body,
        )}
      >
        <p
          id={`${slug}-includes`}
          className={cn(
            "font-display text-xl italic sm:text-[1.375rem]",
            tone.includes,
          )}
        >
          {plan.includes}
        </p>

        <ul
          aria-labelledby={`${slug}-includes`}
          className="mt-5 flex flex-col gap-3.5"
        >
          {plan.features.map((feature) => (
            <li
              key={feature}
              className={cn(
                "flex items-start gap-2.5 text-[15px] leading-snug",
                tone.feature,
              )}
            >
              <Bullet
                className={cn(
                  "mt-px h-[18px] w-[18px] shrink-0",
                  tone.bulletColor,
                )}
              />
              {feature}
            </li>
          ))}
        </ul>

        {/* `mt-auto` against the flex column above pins the actions to the
            card's floor, so the two cards' buttons align even when their
            feature lists differ in length. */}
        <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
          {plan.actions.map((action, index) => (
            <Link
              key={action.label}
              href={action.href}
              className={buttonStyles({
                variant: index === 0 ? "primary" : tone.trailingAction,
                size: "lg",
                className: "flex-1",
              })}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}

export function PricingPlans({ content }: { content: PricingPlansContent }) {
  const { strip } = content;

  return (
    <section
      aria-labelledby="pricing-heading"
      className="pricing-field relative overflow-hidden py-20 sm:py-24"
    >
      {/* `relative` lifts the column over the field's grid, which is a
          positioned pseudo-element and would otherwise paint on top. */}
      <div className="relative mx-auto max-w-6xl px-5">
        <h2
          id="pricing-heading"
          className="text-center text-[clamp(2rem,4.2vw,3.05rem)] leading-[1.14] font-bold tracking-[-0.03em] text-ink text-balance"
        >
          {content.heading.lead}
          <span className="block">
            {content.heading.trail}{" "}
            <span className={accentStyles}>{content.heading.accent}</span>
          </span>
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {content.plans.map((plan) => (
            <PlanCard key={plan.audience} plan={plan} />
          ))}
        </div>

        <div className="plan-strip mt-6 overflow-hidden rounded-[1.75rem] px-7 py-9 sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div>
            <h3 className="text-[clamp(1.35rem,2.6vw,1.8rem)] leading-[1.22] font-bold tracking-[-0.02em] text-white text-balance">
              {strip.heading.lead}
              <span className="block">
                {strip.heading.trail}{" "}
                <span className="font-display text-[1.06em] font-normal italic">
                  {strip.heading.accent}
                </span>
              </span>
            </h3>

            <ul className="mt-5 flex flex-wrap gap-x-7 gap-y-2.5 text-[15px] text-white/80">
              {strip.points.map((point) => (
                <li key={point} className="inline-flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={strip.cta.href}
            className={buttonStyles({
              className: "mt-8 shrink-0 lg:mt-0",
            })}
          >
            <PhoneIcon className="h-4 w-4" />
            {strip.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
