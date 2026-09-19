import type { PageContent, PricingPlansContent } from "@/types/content";

export const pricingContent: PageContent = {
  meta: {
    title: "Pricing",
    description:
      "Fixed one-time website projects, or a monthly plan covering design, development and ad management. Every quote is written to your scope before work starts.",
  },
  canonical: "/pricing",
  header: {
    eyebrow: "Pricing",
    title: "Priced to the scope, not the hour",
    description:
      "A fixed rupee quote for a defined project, or a monthly plan when the website, the campaigns and the creatives need to keep moving together. Every number is agreed before work starts.",
  },
};

/**
 * The offer the ad traffic lands on. Two shapes of the same business: pay once
 * for a site, or run ads monthly and get the site built into the retainer.
 *
 * Written for cold Indian ad traffic, where the objections arrive in a fixed
 * order — what does it cost, what is the catch, what happens if you disappear —
 * so the card answers them in that order: price and GST first, the bonus stack
 * second, the guarantee last, immediately above the button.
 *
 * Everything here is a commitment the studio has to honour. No figures are
 * published — the cards describe the scope and every one ends at the same
 * quote button — but the bonuses and the guarantee lines are still promises.
 * A claim you walk back on a sales call costs more than the click did.
 */
export const pricingPlansContent: PricingPlansContent = {
  heading: {
    lead: "A Website That Pays for Itself,",
    trail: "Quoted to",
    accent: "your scope",
  },
  plans: [
    {
      audience: "For Shops, Clinics & Local Business",
      flag: "Most popular",
      priceNote:
        "One-time project · GST extra · 50% to start, 50% on the day you go live",
      includes: "Everything you need to be found and called",
      features: [
        "5-page website, designed around your business",
        "Admin panel — change prices, photos and text yourself",
        "WhatsApp button and enquiry form on every page",
        "Leads reach your phone the second they come in",
        "Google Maps, Analytics and Search Console set up",
        "Loads in under 3 seconds on mobile data",
        "Domain, hosting and code stay in your name",
      ],
      bonuses: {
        title: "Free with this plan",
        items: [
          "First year of domain and hosting",
          "Google Business Profile created and verified",
          "5 launch-day social media creatives",
          "3 months of unlimited small changes",
        ],
      },
      guarantee: "Live on the date we promise, or the build is free.",
      actions: [{ label: "Get Pricing Quote", href: "/contact" }],
      tone: "ember",
    },
    {
      audience: "For Businesses Ready to Scale",
      flag: "Website included",
      priceNote:
        "Monthly retainer · GST extra · Ad spend paid by you, directly to Google and Meta · cancel any time after month one",
      includes: "We build it, then we bring you the customers",
      features: [
        "Meta and Google Ads built, launched and managed for you",
        "Landing pages written to convert, not just to look good",
        "Every call, form and WhatsApp lead tracked to the rupee",
        "Fresh creatives and ad copy every single month",
        "A weekly WhatsApp report in plain language",
        "Ad accounts, pixels and data stay in your name",
      ],
      bonuses: {
        title: "Free with this plan",
        items: [
          "Your full business website, built free",
          "Call tracking and WhatsApp lead alerts",
          "A teardown of your competitors' ads before we spend a rupee",
        ],
      },
      guarantee:
        "No lock-in. Stop after month one and keep everything we built.",
      actions: [
        { label: "Get Pricing Quote", href: "/contact" },
        { label: "See how we run ads", href: "/meta-google-ads" },
      ],
      tone: "frost",
    },
  ],
  strip: {
    heading: {
      lead: "Not sure which one fits?",
      trail: "Get a free",
      accent: "15-minute review",
    },
    points: [
      "No cost, no commitment",
      "A fixed written quote within 1 hour",
      "We speak English and Hindi",
    ],
    cta: { label: "Book a Call", href: "/contact" },
  },
};
