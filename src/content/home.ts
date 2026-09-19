import type { HeroContent, NextStepsContent } from "@/types/content";

/**
 * The homepage's own `<head>` fields — kept here rather than folded into
 * `PageContent` because `keywords` is a homepage-only addition; every other
 * page already gets `title`/`description` from `createPageMetadata`, and
 * giving the shared type a field only one page uses would be the wrong
 * direction to generalise in.
 */
export const homeMeta = {
  title: "Digital Design & Development Agency",
  description:
    "Konark Soft is a digital agency for websites, mobile apps, and Meta & Google Ads. Fixed-scope pricing, a senior team, and campaigns built to convert — get a free quote today.",
  keywords: [
    "website development company",
    "mobile app development agency",
    "Meta ads agency",
    "Google ads management",
    "digital marketing agency",
    "AI content creation service",
  ],
} as const;

export const heroContent: HeroContent = {
  /**
   * Three reasons to keep reading, cycling in the pill above the headline.
   * Each answers a different hesitation a cold visitor arrives with — is anyone
   * home, have they done this before, what is this going to cost me — rather
   * than repeating one claim three ways.
   *
   * Every line is a promise the studio has to keep on the first call, and two
   * of them repeat figures published on the About and landing pages: `120+`
   * and the 2018 start date. Change them here and change them there too.
   */
  badges: [
    "Now booking · free quote in 1 hour",
    "120+ projects delivered since 2018",
    "Fixed price, agreed before we start",
  ],
  headline: "Digital Design &",
  accent: { lead: "Development", highlight: "Agency" },
  subheadline:
    "We design and build digital products, brands and websites for companies ready to move beyond the ordinary.",
  cta: { label: "Get Pricing Quote", href: "/contact" },
  cards: [
    {
      index: "01",
      icon: {
        src: "/images/hero-section-icon/web-development.webp",
        width: 1536,
        height: 1024,
      },
      title: "Websites",
      kicker: "Development",
    },
    {
      index: "02",
      icon: {
        src: "/images/hero-section-icon/mobile-app.webp",
        width: 1302,
        height: 1208,
      },
      title: "Mobile Apps",
      kicker: "Development",
    },
    {
      index: "03",
      icon: {
        src: "/images/hero-section-icon/design.webp",
        width: 1536,
        height: 1024,
      },
      title: "Web & Mobile",
      kicker: "Design",
    },
    {
      index: "04",
      icon: {
        src: "/images/hero-section-icon/social-media-ads.webp",
        width: 1536,
        height: 1024,
      },
      title: "Meta & Google",
      kicker: "Ads",
    },
  ],
};

/**
 * The block the homepage closes on, in place of the plan cards.
 *
 * Someone who has scrolled this far is weighing up whether to start a
 * conversation, and what stops them is not the price — it is not knowing what
 * they are agreeing to by sending the first message. So the three steps are
 * written to shrink that commitment: each one names what the visitor has to do
 * and what it costs them, and the first two cost nothing.
 *
 * The assurances are promises, not decoration. "Reply within 1 hour" is the one
 * that will be tested first and hardest, which is why the note under the
 * buttons pins it to working hours — an hour at 2am is a claim nobody keeps.
 */
export const nextStepsContent: NextStepsContent = {
  eyebrow: "Getting started",
  heading: {
    lead: "Getting started takes",
    trail: "about",
    accent: "ten minutes",
  },
  description:
    "No brief to write, nothing to pay for a quote. Tell us what your business needs and we come back with a fixed price.",
  steps: [
    {
      index: "01",
      title: "Tell us what you need",
      description:
        "A short WhatsApp message or a 15-minute call. Plain language is fine — we ask the questions.",
    },
    {
      index: "02",
      title: "Get a fixed quote in 1 hour",
      description:
        "A written scope and a price that does not move later. Free, and yours to walk away from.",
    },
    {
      index: "03",
      title: "Approve it, then go live",
      description:
        "You sign off the design before anyone starts building, and the balance is due only on launch day.",
    },
  ],
  assurances: [
    "Free quote, no obligation",
    "Reply within 1 hour",
    "Fixed price in writing",
    "You own the code and accounts",
  ],
  cta: { label: "Get my free quote", href: "/contact" },
  chat: {
    label: "Ask on WhatsApp",
    message:
      "Hi Konark Soft, I'd like a free quote. Here is what my business needs:",
  },
  note: "In working hours, every working day. We reply in English, Hindi, Odia and Bengali.",
};
