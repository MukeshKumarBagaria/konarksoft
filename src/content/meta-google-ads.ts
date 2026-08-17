import type { LandingContent } from "@/types/content";

/**
 * Destination for the paid-media ad campaigns — an ads agency advertising on
 * the platforms it sells. That is the whole credibility problem of this page,
 * so it leans harder on mechanics than on promises: what gets tracked, who owns
 * the account, what happens in week one, and how to leave.
 *
 * Unlike the build pages, these plans are monthly. Nothing here promises a
 * return figure — claiming a guaranteed ROAS is both a lie and a fast route to
 * a disabled ad account.
 *
 * Figures marked below are placeholders — swap in the studio's real numbers,
 * client names and rates before spending money sending traffic here.
 */
export const metaGoogleAdsContent: LandingContent = {
  meta: {
    title: "Meta & Google Ads Management from ₹14,999/month",
    description:
      "Meta and Google campaigns built, run and reported by a team that optimises for enquiries and sales, not impressions. From ₹14,999 a month, no lock-in, you own the ad accounts.",
  },
  canonical: "/meta-google-ads",

  hero: {
    badge: "Taking 4 new accounts this month",
    headline: {
      lead: "Ads that bring you buyers,",
      accent: "not just clicks",
    },
    subheadline:
      "Meta and Google campaigns built, run and reported by people who are measured on enquiries and sales. From ₹14,999 a month, no lock-in, and the ad accounts stay in your name.",
    primaryCta: {
      label: "Get a free account audit",
      message:
        "Hi Konark Soft, I saw your ads management page and I would like a free audit of my ad account.",
    },
    secondaryCta: { label: "See plans & pricing", href: "#pricing" },
    assurances: [
      "No lock-in contract",
      "You own the ad accounts",
      "Live in 5 working days",
      "Weekly reporting",
    ],
    // Placeholder — replace with the studio's verified rating and review count.
    rating: { score: "4.8/5", label: "from 60+ advertisers" },
  },

  proof: {
    // Placeholder figures. Never publish a performance number you cannot
    // evidence from an ad account on request.
    stats: [
      { value: "₹8 Cr+", label: "Ad spend managed" },
      { value: "60+", label: "Accounts run" },
      { value: "5 days", label: "From kickoff to live" },
      { value: "0", label: "Lock-in months" },
    ],
    industriesLabel: "Running ads for",
    industries: [
      "D2C & e-commerce",
      "Real estate",
      "Clinics & aesthetics",
      "Coaching & ed-tech",
      "Home services",
      "Automotive",
      "B2B & SaaS",
      "Travel",
    ],
  },

  problem: {
    heading: { lead: "Why your ad budget", accent: "disappears quietly" },
    description:
      "Almost never because the platform is broken. Usually because of one of these four.",
    items: [
      {
        title: "Boosting posts and calling it advertising",
        description:
          "The boost button optimises for engagement, because engagement is what it was built to sell. Likes from people who will never buy are still likes, and you paid for every one.",
      },
      {
        title: "Nothing is tracked properly",
        description:
          "No Pixel, no Conversions API, no offline import. The platform is optimising towards a signal that does not exist, so it spends your money on whoever is cheapest to reach.",
      },
      {
        title: "Leads that never answer",
        description:
          "A form nobody validates fills with wrong numbers and idle curiosity. Volume looks healthy on the dashboard and your sales team stops picking up the file.",
      },
      {
        title: "An agency that sends a dashboard, not a plan",
        description:
          "Twenty screenshots, no decision. You still cannot say what a customer costs, which campaign to cut, or what changes next week and why.",
      },
    ],
    resolution:
      "We fix the tracking first, then the targeting, then the creative — in that order, because that is the order the money leaks in.",
  },

  pricing: {
    eyebrow: "Pricing",
    heading: { lead: "Monthly management,", accent: "cancel any time" },
    description:
      "Management fee only. Your ad spend goes directly to Meta and Google from your own account — we never take a cut of it or hold it.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        shortName: "Starter",
        audience: "One platform, one clear offer, getting off the ground",
        price: "₹14,999",
        priceNote: "Per month · ad spend extra · GST extra",
        scope: "Meta or Google",
        delivery: "Live in 5 days",
        features: [
          "One platform — Meta or Google, your choice",
          "Ad spend up to ₹1,00,000 a month",
          "Conversion tracking set up properly: Pixel, CAPI, GA4",
          "Up to 3 campaigns with structured testing",
          "6 ad creatives a month, written and designed",
          "Leads delivered to WhatsApp or email instantly",
          "Fortnightly optimisation and a monthly report",
          "No lock-in — 30 days' notice, any time",
        ],
        cta: {
          label: "Start with Starter",
          message:
            "Hi Konark Soft, I am interested in the Starter ads plan (₹14,999/month). Please share the details.",
        },
        tone: "plain",
      },
      {
        id: "growth",
        name: "Growth",
        shortName: "Growth",
        audience: "Businesses that need both platforms pulling together",
        price: "₹24,999",
        compareAt: "₹34,999",
        priceNote: "Per month · ad spend extra · GST extra",
        scope: "Meta + Google",
        delivery: "Live in 5 days",
        flag: "Most popular",
        features: [
          "Everything in Starter, plus:",
          "Both platforms, run as one funnel",
          "Ad spend up to ₹5,00,000 a month",
          "Search, Performance Max, Meta prospecting and retargeting",
          "A conversion-built landing page, included",
          "15 creatives a month, including 4 short-form videos",
          "Retargeting and lookalike audiences",
          "Weekly optimisation and a weekly call",
          "Leads pushed straight into your CRM",
        ],
        cta: {
          label: "Start with Growth",
          message:
            "Hi Konark Soft, I am interested in the Growth ads plan (₹24,999/month). Please share the details.",
        },
        tone: "featured",
      },
      {
        id: "scale",
        name: "Scale",
        shortName: "Scale",
        audience: "Spending seriously and answering to a board or a P&L",
        price: "₹49,999",
        priceNote: "Per month · ad spend extra · GST extra",
        scope: "Full funnel",
        delivery: "Live in 5 days",
        features: [
          "Everything in Growth, plus:",
          "Unlimited campaigns and ad spend",
          "A dedicated account manager on WhatsApp",
          "30 creatives a month with a monthly shoot day",
          "Landing page testing, not just ad testing",
          "Server-side tracking and offline conversion import",
          "Feed and catalogue management for e-commerce",
          "Cohort and lifetime-value reporting, not just ROAS",
          "Quarterly strategy session with your team",
        ],
        cta: {
          label: "Start with Scale",
          message:
            "Hi Konark Soft, I am interested in the Scale ads plan (₹49,999/month). Please share the details.",
        },
        tone: "plain",
      },
    ],
    custom: {
      eyebrow: "Option 4",
      title: { lead: "Bigger or stranger?", accent: "Tell us the situation" },
      description:
        "Multi-location or franchise rollouts, marketplace and app-install campaigns, LinkedIn and YouTube alongside the core two, or a disabled account that needs recovering before anything else can happen. We audit it first and quote against what we actually find.",
      capabilities: [
        "Multi-location & franchise",
        "App install campaigns",
        "LinkedIn & YouTube",
        "Marketplace ads",
        "Account recovery",
        "In-house team training",
      ],
      priceNote: "Free audit first · no obligation",
      cta: {
        label: "Get a custom quote",
        message:
          "Hi Konark Soft, I need a custom ads plan. Here is my situation:",
      },
    },
    footnote:
      "Management fee only — your ad spend is paid by you, directly to Meta and Google, from accounts registered to your business. We take no percentage of spend and never hold your budget. No lock-in: 30 days' notice ends it, and the accounts, campaigns and data stay yours.",
  },

  included: {
    heading: { lead: "Every account gets", accent: "the same groundwork" },
    description:
      "Week one is never spent launching. It is spent making sure what launches can be measured.",
    items: [
      {
        title: "Tracking rebuilt from scratch",
        description:
          "Pixel, Conversions API, GA4 and server-side events, verified against real submissions — so the platform optimises towards buyers instead of guessing.",
      },
      {
        title: "Creative that is actually made",
        description:
          "Static, carousel and short-form video written and produced by us. Creative is the biggest lever left on both platforms, and stock images are not creative.",
      },
      {
        title: "Leads delivered instantly",
        description:
          "Straight to WhatsApp, email or your CRM the moment they submit. Speed of first reply moves close rates more than almost anything we can do in the ad account.",
      },
      {
        title: "Reporting a human wrote",
        description:
          "What we changed, what it did, what happens next — in a page you can read. The raw dashboards stay open to you at all times.",
      },
      {
        title: "You own everything",
        description:
          "Ad accounts, Business Manager, pixels, audiences and creative files, all in your name. We work inside your assets as a partner, never in ours.",
      },
      {
        title: "No lock-in, ever",
        description:
          "Thirty days' notice and we hand everything over cleanly. Agencies that need contracts to keep clients are telling you something.",
      },
    ],
  },

  process: {
    heading: { lead: "From audit to", accent: "live in five days" },
    description: "You see exactly what is being spent, and on what, from day one.",
    steps: [
      {
        index: "01",
        title: "Free audit",
        description:
          "We look inside your existing accounts — or your market, if you have none — and tell you honestly what is wrong and what it is worth fixing. No obligation, and you keep the audit either way.",
      },
      {
        index: "02",
        title: "Tracking and creative",
        description:
          "Days one to three: conversion tracking rebuilt and verified, audiences created, first creative batch written and designed, landing page prepared where the plan includes one.",
      },
      {
        index: "03",
        title: "Launch and learn",
        description:
          "Days four and five: campaigns go live with a structured test plan. The first two weeks buy information as well as customers, and we tell you which is which.",
      },
      {
        index: "04",
        title: "Optimise and scale",
        description:
          "Weekly: cut what is losing, feed what is working, refresh creative before fatigue sets in. You get a written note every week saying what changed and why.",
      },
    ],
  },

  testimonials: {
    heading: { lead: "What clients say", accent: "after the first quarter" },
    // Placeholder quotes — replace with real, attributable client feedback.
    items: [
      {
        quote:
          "The audit alone was worth it. They found our Pixel had been firing on page load, not on form submit, for fourteen months. Every rupee before that had been optimised towards nothing.",
        name: "Vikram Desai",
        role: "Director, Urbanest Interiors",
      },
      {
        quote:
          "Our last agency sent a twelve-tab dashboard every Monday. These two send one page that says what they changed and what they are doing next. I actually read it.",
        name: "Meera Krishnan",
        role: "Marketing Head, Lumea Skin Clinics",
      },
      {
        quote:
          "No contract was the reason we tried them and the reason we stayed. Eleven months in, still on thirty days' notice.",
        name: "Harpreet Singh",
        role: "Founder, TrailKit Outdoors",
      },
    ],
  },

  faq: {
    heading: { lead: "Questions", accent: "before you commit" },
    description:
      "If yours is not here, ask it on WhatsApp — we reply the same day.",
    items: [
      {
        question: "Is my ad spend included in the fee?",
        answer:
          "No. The plan price is our management fee. Your ad spend is paid by you, directly to Meta and Google, from a card or account registered to your business. We never hold your budget and never take a percentage of it — so we have no incentive to talk you into spending more.",
      },
      {
        question: "What is the minimum ad spend I need?",
        answer:
          "We would not start below about ₹30,000 a month. Under that, there is not enough data for the platforms to optimise, and you would be paying a management fee to watch a campaign guess. If that is out of reach right now, we will say so rather than take the retainer.",
      },
      {
        question: "Who owns the ad accounts?",
        answer:
          "You do. Everything is built inside your Business Manager and Google Ads account, registered to your business, with us added as a partner. If you leave, we are removed and the accounts, campaigns, pixels, audiences and creative files stay exactly where they are.",
      },
      {
        question: "How long is the contract?",
        answer:
          "There is not one. It is month to month with 30 days' notice, from the first month. We ask for a fair run — usually three months — because the first is largely spent buying data, but nothing obliges you to stay.",
      },
      {
        question: "When will I see results?",
        answer:
          "Traffic in days, meaningful patterns in two to three weeks, a stable cost per lead usually by week six. Anyone promising a specific return in a specific week is guessing, and we would rather lose the enquiry than start with a number we cannot stand behind.",
      },
      {
        question: "Do you make the creatives, or do I?",
        answer:
          "We do — copy, statics, carousels and short-form video, in the volumes listed on each plan. If you have a brand team or existing assets we will work with them. What we will not do is run your account on stock photos.",
      },
      {
        question: "What if I do not have a landing page?",
        answer:
          "Growth and Scale include one, built for the campaign rather than adapted from your homepage. On Starter we can add one, or point the ads at what you already have if it converts well enough — the audit will tell us which.",
      },
      {
        question: "Can you fix a disabled or restricted account?",
        answer:
          "Often, yes. Disabled Business Managers, rejected ads and policy strikes are usually recoverable once the underlying cause is found. That is a scoped piece of work rather than part of a monthly plan — send us the account and we will tell you what is involved.",
      },
    ],
  },

  form: {
    eyebrow: "Free audit",
    heading: { lead: "Tell us where you are,", accent: "get an honest read" },
    description:
      "Fill this in and it opens WhatsApp with your details ready to send — no waiting on a form that disappears into an inbox.",
    needs: [
      "Starter — ₹14,999/month",
      "Growth — ₹24,999/month",
      "Scale — ₹49,999/month",
      "Audit my existing ad account",
      "Recover a disabled account",
      "Not sure yet — please advise",
    ],
    submitLabel: "Send on WhatsApp",
    disclaimer:
      "No spam calls, no selling your number. We reply with an audit and a plan — usually within a few hours.",
    aside: {
      title: "Would rather just talk?",
      points: [
        "Reply within 24 hours, every working day",
        "Free account audit — yours to keep either way",
        "No lock-in, ever — 30 days' notice",
        "English, Hindi, Odia and Bengali",
      ],
      callLabel: "Call us instead",
    },
  },

  sticky: {
    headline: "Ads from ₹14,999/mo",
    support: "Free account audit",
    cta: {
      label: "WhatsApp",
      message:
        "Hi Konark Soft, I want a free audit of my ad account and a quote for managing my campaigns.",
    },
  },
};
