import type { Route } from "next";

/** One card in the hero deck. */
export type HeroCard = {
  /** Displayed as-is, e.g. "01". */
  index: string;
  /**
   * The card's illustration, served by URL from `public/`. `width` and `height`
   * are the source file's true dimensions — `next/image` needs them to reserve
   * the right space before the file loads, and they differ per icon, so they
   * cannot be a constant in the component.
   */
  icon: { src: string; width: number; height: number };
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

/**
 * Palette a work card is painted in. Resolved to colours by the component.
 * One tone per project in the portfolio, so no two cards in a row share a wash.
 */
export type WorkTone =
  | "lime"
  | "violet"
  | "amber"
  | "sky"
  | "rose"
  | "teal"
  | "indigo";

export type WorkItem = {
  title: string;
  /** Disciplines, shown as pills under the title. */
  tags: readonly string[];
  tone: WorkTone;
  /** The case study this card opens, as a segment under `/work`. */
  slug: string;
  /** Set over the card's artwork panel, in place of a screenshot. */
  wordmark: string;
  /** The client's live domain, shown in the panel's address bar. */
  displayUrl: string;
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

/**
 * A plan card. It carries no figures: the site quotes to the scope rather than
 * publishing a rate, so every card ends at the same "Get Pricing Quote" button
 * and the number is agreed on the call.
 */
export type PricingPlan = {
  /** Who the plan is for, e.g. "For Team or Start-up". Names the card. */
  audience: string;
  /** Pill in the header's top corner. Omit when the plan carries no flag. */
  flag?: string;
  /** One line on how the work is scoped and billed. No amounts. */
  priceNote?: string;
  /**
   * The bonus stack — what tips a visitor who likes the scope. Listed
   * separately from `features` because these are framed as things thrown in,
   * and the card paints them that way.
   */
  bonuses?: { title: string; items: readonly string[] };
  /** One-line risk reversal, pinned just above the actions. */
  guarantee?: string;
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

/** Label and placeholder for one control in the contact form. */
export type ContactFieldCopy = { label: string; placeholder: string };

/** Everything the contact page renders, including its form's copy. */
export type ContactContent = {
  meta: { title: string; description: string };
  canonical: Route;
  header: {
    eyebrow: string;
    title: string;
    /** Second half of the `<h1>`, set in the display serif and underlined. */
    accent: string;
    description: string;
  };
  /** The dark card above the footer — the same shell every page closes on. */
  card: {
    /** Three stacked lines; `accent` is the one set in the display serif. */
    heading: { lead: string; accent: string; trail: string };
    form: {
      title: { lead: string; accent: string };
      fields: Record<
        "name" | "email" | "phone" | "service" | "message",
        ContactFieldCopy
      >;
      /** Options in the service picker. */
      services: readonly string[];
      submit: string;
      /** Button label while the request is in flight. */
      pending: string;
      success: { title: string; description: string; again: string };
      /** Shown when the request fails outright, rather than per field. */
      error: string;
    };
  };
};

/** Palette an About surface is painted in. Resolved to colours by the component. */
export type AboutTone = "brand" | "iris" | "rose" | "sky";

/**
 * A frame holding artwork that has not been produced yet. `label` names the
 * slot in its corner, `caption` says what will eventually play or sit there —
 * so the placeholder reads as a decision rather than as missing content.
 */
export type MediaSlot = {
  label: string;
  caption: string;
  tone: AboutTone;
};

/** One card in the "how we work" grid. */
export type AboutPrinciple = {
  /** Displayed as-is over the tile, e.g. "01". */
  index: string;
  title: string;
  description: string;
  tone: AboutTone;
};

/** One seat on the team. Named by discipline until the portraits are shot. */
export type AboutMember = {
  role: string;
  /** Small serif line under the role. */
  focus: string;
  /** Caption on the portrait placeholder. */
  caption: string;
  tone: AboutTone;
};

/** The About page, end to end. */
export type AboutContent = {
  meta: { title: string; description: string };
  canonical: Route;
  hero: {
    eyebrow: string;
    /** `accent` is the half set in the display serif and underlined. */
    headline: { lead: string; accent: string };
    description: string;
    stage: MediaSlot;
  };
  mission: {
    eyebrow: string;
    /** One sentence across three runs; `accent` takes the serif gradient. */
    statement: { lead: string; accent: string; trail: string };
    description: string;
    /** The three verbs in the statement, expanded. */
    pillars: readonly { title: string; description: string }[];
  };
  principles: {
    heading: { lead: string; accent: string };
    description: string;
    items: readonly AboutPrinciple[];
  };
  stats: readonly { value: string; label: string }[];
  team: {
    heading: { lead: string; accent: string };
    description: string;
    members: readonly AboutMember[];
  };
};

/* ---------------------------------------------------------------------------
   Ad landing pages
   These sit outside the marketing shell and answer to paid traffic, so they
   carry their own content shape: every section is an offer, an objection or a
   proof, and every action ends in a conversation rather than another page.
--------------------------------------------------------------------------- */

/**
 * A call to action that opens WhatsApp with `message` already typed. The copy
 * lives here rather than in the component so each button can name the plan it
 * came from — that first line is how an enquiry gets qualified before anyone
 * replies to it.
 */
export type WhatsAppAction = { label: string; message: string };

/** In-page jump. Not a `Route`: the target is an anchor, not a document. */
export type AnchorAction = { label: string; href: string };

/** Which of the two paint jobs a plan card wears. */
export type LandingPlanTone = "plain" | "featured";

export type LandingPlan = {
  /** Slugs the card's heading so its feature list can be labelled by it. */
  id: string;
  name: string;
  /** One word for the tier chips, where the full name will not fit. */
  shortName: string;
  /** One line naming who the tier is for. */
  audience: string;
  /** Small print under the tier name — billing basis, taxes. No amounts. */
  priceNote: string;
  /**
   * Scope and turnaround, shown as two chips above the feature list. Keep both
   * short — around 18 characters each. The pair sits on one row, and a card
   * whose chips wrap to two rows pushes its own button out of line with the
   * other plans in the grid.
   */
  scope: string;
  delivery: string;
  features: readonly string[];
  /** Pill in the card's top corner. Only the recommended plan carries one. */
  flag?: string;
  tone: LandingPlanTone;
};

/** The fourth option: anything outside the tiers, scoped from a conversation. */
export type LandingCustomPlan = {
  eyebrow: string;
  title: { lead: string; accent: string };
  description: string;
  /** The kinds of work this route covers, listed as pills. */
  capabilities: readonly string[];
  priceNote: string;
};

/** A two-run heading; `accent` is the half set in the display serif. */
type SplitHeading = { lead: string; accent: string };

/** An ad landing page, end to end. */
export type LandingContent = {
  meta: { title: string; description: string };
  canonical: Route;
  hero: {
    badge: string;
    headline: SplitHeading;
    subheadline: string;
    primaryCta: WhatsAppAction;
    secondaryCta: AnchorAction;
    /** Short risk-reversal chips under the buttons. */
    assurances: readonly string[];
    rating: { score: string; label: string };
  };
  proof: {
    stats: readonly { value: string; label: string }[];
    industriesLabel: string;
    industries: readonly string[];
  };
  problem: {
    heading: SplitHeading;
    description: string;
    items: readonly { title: string; description: string }[];
    /** The turn from problem to offer, closing the section. */
    resolution: string;
  };
  pricing: {
    eyebrow: string;
    heading: SplitHeading;
    description: string;
    plans: readonly LandingPlan[];
    custom: LandingCustomPlan;
    footnote: string;
  };
  included: {
    heading: SplitHeading;
    description: string;
    items: readonly { title: string; description: string }[];
  };
  process: {
    heading: SplitHeading;
    description: string;
    steps: readonly { index: string; title: string; description: string }[];
  };
  testimonials: {
    heading: SplitHeading;
    items: readonly { quote: string; name: string; role: string }[];
  };
  faq: {
    heading: SplitHeading;
    description: string;
    items: readonly { question: string; answer: string }[];
  };
  form: {
    eyebrow: string;
    heading: SplitHeading;
    description: string;
    /** Options for the "what do you need" field, in order. */
    needs: readonly string[];
    submitLabel: string;
    /** Reassurance under the button — what happens after they press it. */
    disclaimer: string;
    aside: {
      title: string;
      points: readonly string[];
      callLabel: string;
    };
  };
  /** The bar pinned to the bottom of the viewport once the hero is passed. */
  sticky: {
    headline: string;
    support: string;
    cta: WhatsAppAction;
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

/* ---------------------------------------------------------------------------
   Portfolio
   The index at `/work` and one case study page per project. Both read from the
   same records in `content/portfolio.ts`, so a project's name, tone and summary
   are written once and cannot drift between the card and the page it opens.
--------------------------------------------------------------------------- */

/** The discipline filters on the index, and the label each project is tagged by. */
export type CaseStudyDiscipline =
  | "Website Development"
  | "E-commerce"
  | "Mobile App"
  | "Meta & Google Ads"
  | "SEO"
  | "Branding";

/**
 * A case study, end to end. Every field is rendered on the project's own page;
 * the index card uses only the summary block at the top.
 */
export type CaseStudy = {
  /** URL segment under `/work`. Must be unique — it keys the static routes. */
  slug: string;
  /** Client name as it is written on their own site. */
  name: string;
  /** One line under the name on the card. What the business actually is. */
  category: string;
  /** The live site, linked from the card and the case study header. */
  url: string;
  /** `url` without protocol or trailing slash — what the link shows. */
  displayUrl: string;
  /** Painted from the shared work palette. Cards and hero share the tone. */
  tone: WorkTone;
  /**
   * Two or three words set over the project's artwork, in place of a
   * screenshot. Drawn from the client's own positioning wherever they publish
   * one, so the tile reads as their brand rather than as our caption.
   */
  wordmark: string;
  /** Disciplines, shown as pills on the card and used by the index filter. */
  disciplines: readonly CaseStudyDiscipline[];
  /** The card's one-sentence pitch. */
  summary: string;
  /** Year the engagement shipped, shown on the card's meta row. */
  year: string;

  /* ---- The case study page itself ---- */

  /** Opening statement on the case study, set large under the client name. */
  headline: string;
  /** The facts band under the hero: what it was, who it was for, what we did. */
  facts: readonly { label: string; value: string }[];
  /** Where the client stood before the engagement. */
  challenge: { heading: string; body: readonly string[] };
  /** What we built, as numbered moves. */
  approach: {
    heading: string;
    body: string;
    steps: readonly { index: string; title: string; description: string }[];
  };
  /** The shipped feature set, listed plainly. */
  delivered: { heading: string; items: readonly string[] };
  /**
   * The measurable end of it. Figures are the client's own or drawn from what
   * the live site publishes — nothing here is modelled or projected.
   */
  outcome: {
    heading: string;
    body: string;
    metrics: readonly { value: string; label: string }[];
  };
  /** The stack the project runs on, as pills. */
  stack: readonly string[];
  /** Optional client quote. Omitted where there is nothing on record. */
  testimonial?: { quote: string; name: string; role: string };
};

/** The `/work` index: its heading, its filters and the projects it lists. */
export type PortfolioContent = {
  meta: { title: string; description: string };
  canonical: Route;
  header: {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
  };
  /** Headline figures across the whole portfolio, shown under the header. */
  stats: readonly { value: string; label: string }[];
  projects: readonly CaseStudy[];
};
