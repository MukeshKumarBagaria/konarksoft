import type { LandingContent } from "@/types/content";

/**
 * Destination for the mobile-app-development ad campaigns.
 *
 * The objection here is different from the website page's. Nobody doubts an app
 * can be built; they doubt the quote will hold, that it will reach both stores,
 * and that anyone will still be answering the phone six months later. Every
 * section below is aimed at one of those three.
 *
 * Figures marked below are placeholders — swap in the studio's real numbers,
 * client names and rates before spending money sending traffic here.
 */
export const mobileAppDevelopmentContent: LandingContent = {
  meta: {
    title: "Mobile App Development from ₹49,999",
    description:
      "Flutter and React Native apps for Android and iOS from one codebase. Fixed scope, fixed price from ₹49,999, shipped to both stores with the code and accounts in your name.",
  },
  canonical: "/mobile-app-development",

  hero: {
    badge: "Now booking · free scope call in 24 hours",
    headline: {
      lead: "One app for Android and iOS,",
      accent: "built to be kept",
    },
    subheadline:
      "Flutter and React Native apps designed, built and shipped to both stores from a single codebase. Fixed scope, fixed price from ₹49,999 — and the code, the accounts and the keys end up in your name.",
    primaryCta: {
      label: "Get my free quote",
      message:
        "Hi Konark Soft, I saw your mobile app development page and I want a free quote for my app idea.",
    },
    secondaryCta: { label: "See plans & pricing", href: "#pricing" },
    assurances: [
      "Android + iOS together",
      "Fixed scope, fixed price",
      "Store submission handled",
      "You own the code",
    ],
    // Placeholder — replace with the studio's verified rating and review count.
    rating: { score: "4.9/5", label: "from 40+ app clients" },
  },

  proof: {
    // Placeholder figures.
    stats: [
      { value: "40+", label: "Apps shipped to both stores" },
      { value: "1", label: "Codebase for Android and iOS" },
      { value: "100%", label: "Store review pass rate" },
      { value: "< 24 hrs", label: "Average reply time" },
    ],
    industriesLabel: "Apps built for",
    industries: [
      "On-demand delivery",
      "Clinics & telehealth",
      "Fitness & wellness",
      "Ed-tech & coaching",
      "Field service teams",
      "Retail loyalty",
      "Marketplaces",
      "Logistics tracking",
    ],
  },

  problem: {
    heading: { lead: "Why most app projects", accent: "quietly fall apart" },
    description:
      "It is rarely the code. It is what nobody agreed in writing before the code started.",
    items: [
      {
        title: "The quote doubles halfway through",
        description:
          "An hourly estimate becomes a running meter. Features you assumed were included turn out to be change requests, and stopping costs more than continuing.",
      },
      {
        title: "It only works on the demo phone",
        description:
          "Fine on the developer's device, broken on a three-year-old Android with 4G and a full storage bar — which is what most of your users are actually holding.",
      },
      {
        title: "It never clears store review",
        description:
          "Apple and Google reject on privacy policies, permissions, account deletion and sign-in rules. A team that has not shipped before finds this out at the finish line.",
      },
      {
        title: "Nobody can ship an update",
        description:
          "The developer holds the signing keys and the store accounts. A one-line fix becomes a negotiation, and the app slowly rots on the shelf.",
      },
    ],
    resolution:
      "We agree the scope in writing, ship to both stores, and hand you every key at the end.",
  },

  pricing: {
    eyebrow: "Pricing",
    heading: { lead: "Fixed scope,", accent: "fixed price" },
    description:
      "Each plan is quoted before development starts and honoured at launch. Anything outside it is priced and approved by you first.",
    plans: [
      {
        id: "mvp",
        name: "MVP App",
        shortName: "MVP",
        audience: "Founders validating an idea with real users",
        price: "₹49,999",
        priceNote: "One-time · GST extra",
        scope: "Up to 8 screens",
        delivery: "4–6 weeks",
        features: [
          "Flutter — one codebase, Android and iOS",
          "Up to 8 screens, designed before they are built",
          "Phone or email sign-in",
          "Firebase backend and database",
          "Push notifications",
          "Play Store and App Store submission handled",
          "Analytics and crash reporting",
          "1 month of free fixes after launch",
        ],
        cta: {
          label: "Start with MVP",
          message:
            "Hi Konark Soft, I am interested in the MVP App plan (₹49,999). Please share the details.",
        },
        tone: "plain",
      },
      {
        id: "business",
        name: "Business App",
        shortName: "Business",
        audience: "Running businesses putting a real service in users' hands",
        price: "₹99,999",
        compareAt: "₹1,39,999",
        priceNote: "One-time · GST extra",
        scope: "Up to 20 screens",
        delivery: "8–10 weeks",
        flag: "Most popular",
        features: [
          "Everything in MVP, plus:",
          "Flutter or React Native — whichever suits your team",
          "Up to 20 screens with your own design system",
          "Custom backend and API, not just Firebase",
          "Web admin panel to run the app day to day",
          "Payments — UPI, cards and wallets via Razorpay",
          "In-app chat or support ticketing",
          "Offline handling for weak networks",
          "3 months of free support after launch",
        ],
        cta: {
          label: "Start with Business",
          message:
            "Hi Konark Soft, I am interested in the Business App plan (₹99,999). Please share the details.",
        },
        tone: "featured",
      },
      {
        id: "marketplace",
        name: "Marketplace App",
        shortName: "Marketplace",
        audience: "Two-sided platforms with customers, partners and admins",
        price: "₹1,99,999",
        priceNote: "One-time · GST extra",
        scope: "Multi-role platform",
        delivery: "12–16 weeks",
        features: [
          "Everything in Business, plus:",
          "Separate customer and partner apps",
          "Full operations dashboard for your team",
          "Live order tracking and maps",
          "Commission handling and partner payouts",
          "Ratings, reviews and dispute handling",
          "Scheduled jobs, notifications and escalations",
          "Load-tested before launch",
          "6 months of free support after launch",
        ],
        cta: {
          label: "Start a marketplace",
          message:
            "Hi Konark Soft, I am interested in the Marketplace App plan (₹1,99,999). Please share the details.",
        },
        tone: "plain",
      },
    ],
    custom: {
      eyebrow: "Option 4",
      title: { lead: "Different shape?", accent: "Tell us what you need" },
      description:
        "An app half-built by someone else, a React Native codebase that needs rescuing, an enterprise rollout with SSO and compliance, or a long-term team working alongside yours. We scope it with you and quote a fixed price before you commit to anything.",
      capabilities: [
        "Rescue an unfinished app",
        "React Native migration",
        "Enterprise & SSO",
        "Wearables & IoT",
        "Backend and API only",
        "Ongoing product team",
      ],
      priceNote: "Quoted in 24 hours · no obligation",
      cta: {
        label: "Get a custom quote",
        message:
          "Hi Konark Soft, I need a custom mobile app plan. Here is what my project involves:",
      },
    },
    footnote:
      "All prices are one-time and exclude GST. Store developer accounts cost ₹2,000 a year for Google Play and about ₹8,200 a year for Apple, paid directly and registered to you. Backend hosting is billed by your provider, in your own account.",
  },

  included: {
    heading: { lead: "Every app ships with", accent: "the boring essentials" },
    description:
      "The parts nobody demos and every real app needs. Included from the cheapest plan up.",
    items: [
      {
        title: "One codebase, both stores",
        description:
          "Flutter or React Native, so Android and iOS stay in step instead of drifting into two products with two bills.",
      },
      {
        title: "Store submission handled",
        description:
          "Listings, screenshots, privacy policy, data-safety forms and review responses. We do not hand you a build and wish you luck.",
      },
      {
        title: "Tested on real phones",
        description:
          "Older Androids, small screens and weak networks — not just the newest device on the developer's desk.",
      },
      {
        title: "Analytics and crash reporting",
        description:
          "You can see what users actually do and what broke, from day one, without paying for a separate project later.",
      },
      {
        title: "Push notifications",
        description:
          "Configured on both platforms and ready to use, because an app you cannot bring people back into is a very expensive brochure.",
      },
      {
        title: "Keys and accounts in your name",
        description:
          "Signing keys, store accounts, repository and backend. Anyone can ship your next update — including someone who is not us.",
      },
    ],
  },

  process: {
    heading: { lead: "From idea to", accent: "on both stores" },
    description: "You approve each stage before we start the next one.",
    steps: [
      {
        index: "01",
        title: "Scope call, then a written quote",
        description:
          "A 30-minute call about who uses this and what it has to do. You get a written scope — every screen listed — with one fixed price against it.",
      },
      {
        index: "02",
        title: "Design you sign off",
        description:
          "Clickable designs of every screen before a line of app code exists. Changing a screen here costs a conversation; changing it later costs a sprint.",
      },
      {
        index: "03",
        title: "Built in two-week sprints",
        description:
          "You get a working build on your own phone every fortnight, so progress is something you use rather than something you are told about.",
      },
      {
        index: "04",
        title: "Store launch and handover",
        description:
          "We submit to both stores, handle review, and hand over the signing keys, accounts and code with a walkthrough of how to ship the next update.",
      },
    ],
  },

  testimonials: {
    heading: { lead: "What founders say", accent: "after launch" },
    // Placeholder quotes — replace with real, attributable client feedback.
    items: [
      {
        quote:
          "Two developers had already quoted us hourly and both estimates drifted. Konark gave us a screen-by-screen scope and a single number, and the number at the end was the number at the start.",
        name: "Sneha Kulkarni",
        role: "Founder, RouteBox Logistics",
      },
      {
        quote:
          "Apple rejected our first submission for account deletion. They had it fixed and resubmitted the same week — they clearly knew the rule already, which is more than our last team did.",
        name: "Imran Qureshi",
        role: "Director, FitLoop Studios",
      },
      {
        quote:
          "The fortnightly build on my own phone was the thing. I could feel it getting better instead of reading status updates about it.",
        name: "Ananya Rao",
        role: "Co-founder, Clinicly",
      },
    ],
  },

  faq: {
    heading: { lead: "Questions", accent: "before you commit" },
    description:
      "If yours is not here, ask it on WhatsApp — we reply the same day.",
    items: [
      {
        question: "Flutter or React Native — which will you use?",
        answer:
          "Flutter by default: it renders its own UI, so Android and iOS look identical and older devices behave predictably. We use React Native when you already have a React team who will maintain it, or when you need to share code with an existing web app. We tell you which on the scope call and why.",
      },
      {
        question: "One codebase for both platforms — is that really the same?",
        answer:
          "For the vast majority of apps, yes, and it roughly halves the bill and the maintenance. Where it is not — heavy 3D, deep hardware integration, platform-specific system features — we will say so on the scope call rather than after you have paid.",
      },
      {
        question: "Do you handle Play Store and App Store submission?",
        answer:
          "Yes, both, including the parts that get first-timers rejected: privacy policy, data-safety declarations, permission justifications, account deletion and sign-in requirements. Accounts are registered in your name and we submit from them.",
      },
      {
        question: "Who owns the code, the keys and the store accounts?",
        answer:
          "You do, all three. The repository is yours from the first commit, the signing keys are handed over in writing, and the developer accounts are registered to your business. You can hire anyone to ship the next version.",
      },
      {
        question: "Does the price include a backend?",
        answer:
          "MVP includes a Firebase backend and database. Business and Marketplace include a custom backend and API plus an admin panel. Hosting is billed by your provider, in your account — typically ₹1,500 to ₹6,000 a month at early volumes.",
      },
      {
        question: "How long does it take?",
        answer:
          "4–6 weeks for an MVP, 8–10 for a Business app, 12–16 for a marketplace, from the day the design is signed off. The single biggest cause of delay is waiting on content and decisions from your side, so we agree those dates up front too.",
      },
      {
        question: "What happens after launch?",
        answer:
          "Free fixes for 1, 3 or 6 months depending on the plan. After that, maintenance is a monthly retainer covering OS updates, store policy changes and small improvements — optional, and quoted separately. Nothing auto-renews.",
      },
      {
        question: "How does payment work?",
        answer:
          "Split across milestones rather than a lump sum: on signing, on design approval, on the mid-project build, and on store launch. You are never more than one milestone ahead of what you can see working.",
      },
    ],
  },

  form: {
    eyebrow: "Free quote",
    heading: { lead: "Tell us about your app,", accent: "get a scope and price" },
    description:
      "Fill this in and it opens WhatsApp with your details ready to send — no waiting on a form that disappears into an inbox.",
    needs: [
      "MVP App — ₹49,999",
      "Business App — ₹99,999",
      "Marketplace App — ₹1,99,999",
      "Rescue an app someone else started",
      "Backend or API only",
      "Not sure yet — please advise",
    ],
    submitLabel: "Send on WhatsApp",
    disclaimer:
      "No spam calls, no selling your number. We reply with a scope, a price and a timeline — usually within a few hours.",
    aside: {
      title: "Would rather just talk?",
      points: [
        "Reply within 24 hours, every working day",
        "Free 30-minute scope call — no obligation",
        "A written scope and fixed quote before any payment",
        "English, Hindi, Odia and Bengali",
      ],
      callLabel: "Call us instead",
    },
  },

  sticky: {
    headline: "Apps from ₹49,999",
    support: "Free scope call · 24 hrs",
    cta: {
      label: "WhatsApp",
      message:
        "Hi Konark Soft, I want a free quote for a mobile app for my business.",
    },
  },
};
