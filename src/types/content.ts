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

export type CapabilityItem = {
  index: string;
  title: string;
  description: string;
};

export type CapabilitiesContent = {
  heading: { lead: string; accent: string };
  items: readonly CapabilityItem[];
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
