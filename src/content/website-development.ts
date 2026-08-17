import type { LandingContent } from "@/types/content";

/**
 * Destination for the website-development ad campaigns.
 *
 * Ordered the way a cold visitor decides: what this is → who says so → why
 * they came → what it costs → what they get → how it runs → who else did it →
 * what they are still worried about → how to start. Pricing sits high on
 * purpose; price is the first objection in this market, and burying it below
 * four scrolls of story is what makes ad traffic bounce.
 *
 * Figures marked below are placeholders — swap in the studio's real numbers,
 * client names and rates before spending a rupee sending traffic here.
 */
export const websiteDevelopmentContent: LandingContent = {
  meta: {
    title: "Website Development from ₹4,999",
    description:
      "Get a fast, mobile-ready website for your business in as little as 7 days. Fixed one-time pricing from ₹4,999 — static, dynamic and e-commerce plans. Free quote on WhatsApp.",
  },
  canonical: "/website-development",

  hero: {
    badge: "Now booking · free quote in 24 hours",
    headline: {
      lead: "A website that brings you",
      accent: "real enquiries",
    },
    subheadline:
      "Designed, built and launched in as little as 7 days. Fixed one-time price from ₹4,999 — no monthly fees, no lock-in, and the domain, hosting and code stay in your name.",
    primaryCta: {
      label: "Get my free quote",
      message:
        "Hi Konark Soft, I saw your website development page and I want a free quote for my business.",
    },
    secondaryCta: { label: "See plans & pricing", href: "#pricing" },
    assurances: [
      "Delivery from 7 days",
      "One-time payment",
      "Free support after launch",
      "100% ownership",
    ],
    // Placeholder — replace with the studio's verified rating and review count.
    rating: { score: "4.9/5", label: "from 120+ businesses" },
  },

  proof: {
    // Placeholder figures.
    stats: [
      { value: "120+", label: "Websites delivered" },
      { value: "8 yrs", label: "Building for Indian businesses" },
      { value: "< 24 hrs", label: "Average reply time" },
      { value: "97%", label: "Delivered on or before date" },
    ],
    industriesLabel: "Trusted by businesses in",
    industries: [
      "Clinics & Hospitals",
      "Restaurants & Cafés",
      "Real Estate",
      "Salons & Spas",
      "Coaching & Ed-tech",
      "Manufacturing",
      "Retail & D2C",
      "Logistics",
    ],
  },

  problem: {
    heading: { lead: "Losing customers to a", accent: "competitor's website?" },
    description:
      "Nine out of ten buyers check you online before they call. Here is what usually goes wrong.",
    items: [
      {
        title: "You have no website at all",
        description:
          "Someone searches for your service, finds the business down the road instead, and calls them. You never hear that the enquiry existed.",
      },
      {
        title: "It is unusable on a phone",
        description:
          "Most of your visitors arrive on mobile. If they have to pinch, zoom and hunt for your number, they leave in under ten seconds.",
      },
      {
        title: "It looks fine but gets zero leads",
        description:
          "No clear call to action, no WhatsApp button, no enquiry form. A brochure nobody asked for, sitting quietly at your domain.",
      },
      {
        title: "Your last developer vanished",
        description:
          "Half-finished pages, an expired domain, and nobody who has the passwords. Now every small change is a hostage negotiation.",
      },
    ],
    resolution:
      "We fix all four for a price agreed before a single line of code is written.",
  },

  pricing: {
    eyebrow: "Pricing",
    heading: { lead: "Fixed prices,", accent: "no surprises" },
    description:
      "Pick the plan that matches your business. Every price below is one-time — quoted up front and honoured at launch.",
    plans: [
      {
        id: "starter",
        name: "Starter Website",
        shortName: "Static",
        audience: "New businesses, freelancers and local shops",
        price: "₹4,999",
        priceNote: "One-time · GST extra",
        scope: "Up to 5 pages",
        delivery: "Live in 7 days",
        features: [
          "5-page static website, designed for your business",
          "Mobile-first — tested on real phones",
          "WhatsApp chat button on every page",
          "Enquiry form that mails you each lead",
          "Google Maps and click-to-call",
          "Basic on-page SEO and Google indexing",
          "Free SSL certificate (the padlock)",
          "1 month of free changes after launch",
        ],
        cta: {
          label: "Start with Starter",
          message:
            "Hi Konark Soft, I am interested in the Starter Website plan (₹4,999). Please share the details.",
        },
        tone: "plain",
      },
      {
        id: "business",
        name: "Business Website",
        shortName: "Dynamic",
        audience: "Growing businesses that update their own content",
        price: "₹7,999",
        compareAt: "₹12,999",
        priceNote: "One-time · GST extra",
        scope: "Up to 10 pages",
        delivery: "Live in 10–12 days",
        flag: "Most popular",
        features: [
          "Everything in Starter, plus:",
          "10-page dynamic website with an admin panel",
          "Edit text, images and prices yourself — no developer needed",
          "Blog or news section, ready for SEO",
          "Photo and video gallery",
          "Lead alerts on WhatsApp and email, instantly",
          "Google Analytics and Search Console set up",
          "Speed-tuned for Google's Core Web Vitals",
          "3 months of free support after launch",
        ],
        cta: {
          label: "Start with Business",
          message:
            "Hi Konark Soft, I am interested in the Business Website plan (₹7,999). Please share the details.",
        },
        tone: "featured",
      },
      {
        id: "ecommerce",
        name: "E-commerce Store",
        shortName: "E-commerce",
        audience: "Brands ready to sell online and ship nationwide",
        price: "₹19,999",
        priceNote: "One-time · GST extra",
        scope: "Unlimited products",
        delivery: "Live in 20–25 days",
        features: [
          "Everything in Business, plus:",
          "Full online store with cart and checkout",
          "UPI, cards and net-banking via Razorpay",
          "Order, stock and customer dashboard",
          "Customer accounts, wishlists and order tracking",
          "Coupons, offers and discount codes",
          "Shipping and courier integration",
          "GST invoices generated automatically",
          "6 months of free support after launch",
        ],
        cta: {
          label: "Start selling online",
          message:
            "Hi Konark Soft, I am interested in the E-commerce Store plan (₹19,999). Please share the details.",
        },
        tone: "plain",
      },
    ],
    custom: {
      eyebrow: "Option 4",
      title: { lead: "Something bigger?", accent: "Tell us what you need" },
      description:
        "Mobile apps, booking systems, dashboards, CRM and payment integrations, or a website far past ten pages. We scope it with you, quote a fixed price, and you decide with the number in front of you.",
      capabilities: [
        "Android & iOS apps",
        "Custom web apps",
        "Booking & CRM systems",
        "Admin dashboards",
        "API integrations",
        "Redesign of an existing site",
      ],
      priceNote: "Quoted in 24 hours · no obligation",
      cta: {
        label: "Get a custom quote",
        message:
          "Hi Konark Soft, I need a custom plan. Here is what my project involves:",
      },
    },
    footnote:
      "All prices are one-time and exclude GST. Domain and hosting renew yearly (roughly ₹1,500–₹3,000), paid directly to the provider in your own name. Anything outside the agreed scope is quoted before we start it — never billed after.",
  },

  included: {
    heading: { lead: "Every plan includes", accent: "the things that matter" },
    description:
      "Not add-ons. Not upsells at handover. These ship with the cheapest plan we sell.",
    items: [
      {
        title: "Mobile-first build",
        description:
          "Designed for the phone first, then widened for desktop — because that is the order your customers arrive in.",
      },
      {
        title: "WhatsApp enquiry button",
        description:
          "One tap from any page to a chat with you, with the page they were reading already in the message.",
      },
      {
        title: "Found on Google",
        description:
          "Titles, descriptions, sitemap and Search Console configured, plus your Google Business profile linked up.",
      },
      {
        title: "Loads in under 3 seconds",
        description:
          "Compressed images and lean code. Slow sites lose half their visitors before the first screen paints.",
      },
      {
        title: "Secure by default",
        description:
          "Free SSL, so browsers show the padlock instead of warning your customers away.",
      },
      {
        title: "You own everything",
        description:
          "Domain, hosting and source code in your name and your account. Leave whenever you like — we hand over every password.",
      },
    ],
  },

  process: {
    heading: { lead: "From first message to", accent: "live in four steps" },
    description: "You approve each step before we move to the next one.",
    steps: [
      {
        index: "01",
        title: "Free consultation",
        description:
          "A 15-minute call or WhatsApp chat. We ask about your business, your customers and what the site has to achieve — then quote a fixed price.",
      },
      {
        index: "02",
        title: "Design you sign off",
        description:
          "You see the full design before development begins. We revise the layout until you are happy with it, then lock it.",
      },
      {
        index: "03",
        title: "Build & content",
        description:
          "We develop the approved design, load your content, and test on real phones, tablets and browsers. You review a private preview link.",
      },
      {
        index: "04",
        title: "Launch & handover",
        description:
          "Live on your domain, submitted to Google, with a walkthrough of the admin panel and every login handed to you in writing.",
      },
    ],
  },

  testimonials: {
    heading: { lead: "What clients say", accent: "after launch" },
    // Placeholder quotes — replace with real, attributable client feedback.
    items: [
      {
        quote:
          "We had nothing online for six years. Two weeks after the site went live we were getting four or five enquiries a week from Google, and they already knew our prices before calling.",
        name: "Rajesh Mehta",
        role: "Mehta Interiors, Pune",
      },
      {
        quote:
          "The admin panel was the deciding factor. I update my menu and prices myself on a Sunday night instead of waiting three days for someone to reply.",
        name: "Priya Nair",
        role: "The Copper Spoon, Kochi",
      },
      {
        quote:
          "Quoted ₹19,999, delivered for ₹19,999, on the day they said. After two developers who ghosted us, that alone was worth it. First online order came in on day three.",
        name: "Arjun Sharma",
        role: "Vasant Handlooms, Jaipur",
      },
    ],
  },

  faq: {
    heading: { lead: "Questions", accent: "before you commit" },
    description: "If yours is not here, ask it on WhatsApp — we reply the same day.",
    items: [
      {
        question: "Is ₹4,999 really the final price?",
        answer:
          "Yes, for everything listed in the Starter plan. It is one-time and GST is extra. If you later want something outside that scope, we quote it and you approve it before we build it. Nothing is ever added to a bill after the fact.",
      },
      {
        question: "Do I have to pay you every month?",
        answer:
          "No. There is no subscription and no lock-in. The only recurring cost is your domain and hosting renewal — roughly ₹1,500 to ₹3,000 a year, paid directly to the provider, in an account that belongs to you.",
      },
      {
        question: "How long does it actually take?",
        answer:
          "7 days for Starter, 10–12 days for Business, 20–25 days for E-commerce. The clock starts the day we have your content — logo, photos and text. If you do not have those ready, we will help you put them together.",
      },
      {
        question: "Who owns the website when it is done?",
        answer:
          "You do, completely. The domain is registered in your name, hosting is in your account, and the source code is yours. At handover you get every username and password in writing.",
      },
      {
        question: "Will my site show up on Google?",
        answer:
          "We do the on-page groundwork with every plan: page titles, descriptions, a sitemap, Search Console, and your Google Business profile. Where you rank after that depends on your competition — ongoing SEO and Google Ads are separate services we can quote if you want them.",
      },
      {
        question: "I already have a website. Can you fix it?",
        answer:
          "Usually, yes. Send the link on WhatsApp and we will review it free and tell you honestly whether it is worth repairing or rebuilding — including when the honest answer is that it is fine as it is.",
      },
      {
        question: "Do you build mobile apps too?",
        answer:
          "Yes — Android and iOS, along with custom web apps, booking systems and dashboards. Those are quoted individually. Message us with what you have in mind and you will have a figure within 24 hours.",
      },
      {
        question: "How does payment work?",
        answer:
          "50% to begin and 50% at launch, by UPI, bank transfer or card. You see the finished site on a preview link before the second payment is due.",
      },
    ],
  },

  form: {
    eyebrow: "Free quote",
    heading: { lead: "Tell us what you need,", accent: "get a price today" },
    description:
      "Fill this in and it opens WhatsApp with your details ready to send — no waiting on a form that disappears into an inbox.",
    needs: [
      "Starter Website — ₹4,999",
      "Business Website — ₹7,999",
      "E-commerce Store — ₹19,999",
      "Mobile app (Android / iOS)",
      "Redesign of my existing website",
      "Not sure yet — please advise",
    ],
    submitLabel: "Send on WhatsApp",
    disclaimer:
      "No spam calls, no selling your number. We reply with a price and a timeline, usually within a few hours.",
    aside: {
      title: "Would rather just talk?",
      points: [
        "Reply within 24 hours, every working day",
        "Free consultation — no obligation to book",
        "A fixed written quote before any payment",
        "English, Hindi, Odia and Bengali",
      ],
      callLabel: "Call us instead",
    },
  },

  sticky: {
    headline: "Website from ₹4,999",
    support: "Free quote in 24 hrs",
    cta: {
      label: "WhatsApp",
      message:
        "Hi Konark Soft, I want a free quote for a website for my business.",
    },
  },
};
