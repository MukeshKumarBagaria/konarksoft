import type { Route } from "next";

/** One card in the hero deck. */
export type HeroCard = {
  /** Displayed as-is, e.g. "01". */
  index: string;
  /** Emoji used as the card's illustration. Swap for artwork when it exists. */
  icon: string;
  title: string;
  /** Small serif line under the title, rendered uppercase. */
  kicker: string;
};

export type HeroContent = {
  badge: string;
  headline: string;
  /** Second headline line, set in the display serif. */
  accent: { lead: string; highlight: string };
  subheadline: string;
  cta: { label: string; href: Route };
  cards: readonly HeroCard[];
};

/** Palette a work card is painted in. Resolved to colours by the component. */
export type WorkTone = "lime" | "violet" | "amber" | "sky";

export type WorkItem = {
  title: string;
  /** Disciplines, shown as pills under the title. */
  tags: readonly string[];
  tone: WorkTone;
};

export type RecentWorkContent = {
  heading: { lead: string; accent: string };
  items: readonly WorkItem[];
};

/** The wide light call-to-action banner. Each accent sets in the display serif. */
export type CtaBannerContent = {
  heading: {
    first: { lead: string; accent: string };
    second: { accent: string; trail: string };
  };
  description: string;
  cta: { label: string; href: Route };
};

/** Which of the two paint jobs a plan card wears. */
export type PricingTone = "ember" | "frost";

/** A button under a plan. The first in a plan's list renders as the primary. */
export type PricingAction = { label: string; href: Route };

export type PricingPlan = {
  /** Who the plan is for, e.g. "For Team or Start-up". Names the card. */
  audience: string;
  /** Pill in the header's top corner. Omit when the plan carries no flag. */
  flag?: string;
  price: string;
  /** Billing basis shown beside the price, set in the display serif. */
  period: string;
  /** Serif lead-in above the feature list. */
  includes: string;
  features: readonly string[];
  actions: readonly PricingAction[];
  tone: PricingTone;
};

/** The pricing block: heading, the plan cards, then the closing booking strip. */
export type PricingPlansContent = {
  /** `trail` and `accent` share the second line; `accent` takes the gradient. */
  heading: { lead: string; trail: string; accent: string };
  plans: readonly PricingPlan[];
  strip: {
    heading: { lead: string; trail: string; accent: string };
    /** Reassurances listed under the strip's heading. */
    points: readonly string[];
    cta: PricingAction;
  };
};

/** The booking block that closes every marketing page, above the footer. */
export type CtaContent = {
  /** Three stacked lines; `accent` is the one set in the display serif. */
  heading: { lead: string; accent: string; trail: string };
  card: {
    title: { lead: string; accent: string };
    description: string;
    cta: { label: string; href: Route };
  };
};

/** Everything a simple content page renders, including its SEO fields. */
export type PageContent = {
  meta: { title: string; description: string };
  canonical: Route;
  header: {
    eyebrow: string;
    title: string;
    description: string;
  };
};
