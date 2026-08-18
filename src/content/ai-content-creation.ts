import type { LandingContent } from "@/types/content";

/**
 * Destination for the AI-content ad campaigns.
 *
 * This is the page most likely to be read cynically, because the market has
 * already been flooded with the bad version of this service. So the copy names
 * that directly and sells the opposite: a brand voice built from the client's
 * own material, a human editor on every piece, and honesty about where AI sits
 * in the process. Pretending a human wrote all of it would be both a lie and a
 * worse pitch than the truth.
 *
 * Figures marked below are placeholders — swap in the studio's real numbers,
 * client names and rates before spending money sending traffic here.
 */
export const aiContentCreationContent: LandingContent = {
  meta: {
    title: "AI Content Creation from ₹9,999/month",
    description:
      "AI-assisted, human-edited content for brands that need to publish daily — social posts, reels, blogs and ad creative in your own brand voice. From ₹9,999 a month, no lock-in.",
  },
  canonical: "/ai-content-creation",

  hero: {
    badge: "Taking 6 new brands this month",
    headline: {
      lead: "Content that sounds like you,",
      accent: "at ten times the pace",
    },
    subheadline:
      "Social posts, reels, blogs and ad creative — drafted with AI trained on your own brand voice, then edited by a human before anything reaches you. From ₹9,999 a month, no lock-in.",
    primaryCta: {
      label: "Get free sample content",
      message:
        "Hi Konark Soft, I saw your AI content page and I would like free sample content for my brand.",
    },
    secondaryCta: { label: "See plans & pricing", href: "#pricing" },
    assurances: [
      "Human editor on every piece",
      "Your brand voice, not generic AI",
      "First batch in 7 days",
      "No lock-in",
    ],
    // Placeholder — replace with the studio's verified rating and review count.
    rating: { score: "4.9/5", label: "from 80+ brands" },
  },

  proof: {
    // Placeholder figures.
    stats: [
      { value: "12,000+", label: "Pieces published for clients" },
      { value: "80+", label: "Brand voices built" },
      { value: "7 days", label: "To your first content batch" },
      { value: "100%", label: "Human-edited before delivery" },
    ],
    industriesLabel: "Writing for",
    industries: [
      "D2C brands",
      "Clinics & wellness",
      "Real estate",
      "Coaching & creators",
      "B2B & SaaS",
      "Restaurants & hospitality",
      "Fintech",
      "Personal brands",
    ],
  },

  problem: {
    heading: { lead: "Why most content", accent: "never earns its keep" },
    description:
      "Publishing more is not the fix on its own. These four are what actually stop it working.",
    items: [
      {
        title: "You post twice a month",
        description:
          "Every platform rewards consistency before quality. Two good posts a month lose to twelve ordinary ones, and everyone knows it — the problem was never the strategy, it was the calendar.",
      },
      {
        title: "It reads like everyone else's AI",
        description:
          "Raw model output has a smell: the same three-part sentences, the same words, the same shape. Readers spot it now, and a feed of it makes a brand look smaller, not bigger.",
      },
      {
        title: "A freelancer per format",
        description:
          "One writer for blogs, one editor for reels, one designer for statics, and you in the middle chasing all three. The coordination costs more time than the work.",
      },
      {
        title: "Pretty, and it sells nothing",
        description:
          "Content with no offer, no call to action and no idea which stage of buying it is for. It fills a grid, gets a few likes, and never once asks for the sale.",
      },
    ],
    resolution:
      "We build your voice once, then publish in it every day — and every piece has a job before it is written.",
  },

  pricing: {
    eyebrow: "Pricing",
    heading: { lead: "Monthly content,", accent: "cancel any time" },
    description:
      "Everything is written to your brand voice guide and edited by a human before it reaches you. Unused pieces never expire mid-month.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        shortName: "Starter",
        audience: "Brands that need to show up consistently at last",
        price: "₹9,999",
        priceNote: "Per month · GST extra",
        scope: "16 pieces / month",
        delivery: "Live in 7 days",
        features: [
          "Brand voice guide, built from your existing material",
          "12 social posts with captions and hashtags",
          "4 reel or short-form scripts with hooks",
          "Designed statics, sized per platform",
          "Monthly content calendar, planned in advance",
          "Human editor on every single piece",
          "2 rounds of revisions per batch",
          "No lock-in — 30 days' notice, any time",
        ],
        cta: {
          label: "Start with Starter",
          message:
            "Hi Konark Soft, I am interested in the Starter content plan (₹9,999/month). Please share the details.",
        },
        tone: "plain",
      },
      {
        id: "growth",
        name: "Growth",
        shortName: "Growth",
        audience: "Brands publishing daily and starting to rank",
        price: "₹19,999",
        compareAt: "₹27,999",
        priceNote: "Per month · GST extra",
        scope: "40 pieces / month",
        delivery: "Live in 7 days",
        flag: "Most popular",
        features: [
          "Everything in Starter, plus:",
          "20 social posts across two platforms",
          "8 reels, fully edited with captions and subtitles",
          "4 SEO blog articles, 1,200+ words each",
          "Keyword research and internal linking",
          "Ad creative variants for Meta and Google",
          "Scheduled and posted for you, if you want",
          "Monthly performance review with what to double down on",
          "Unlimited revisions within the month",
        ],
        cta: {
          label: "Start with Growth",
          message:
            "Hi Konark Soft, I am interested in the Growth content plan (₹19,999/month). Please share the details.",
        },
        tone: "featured",
      },
      {
        id: "authority",
        name: "Authority",
        shortName: "Authority",
        audience: "Brands and founders building a category position",
        price: "₹39,999",
        priceNote: "Per month · GST extra",
        scope: "90+ pieces / month",
        delivery: "Live in 7 days",
        features: [
          "Everything in Growth, plus:",
          "Daily posting across four platforms",
          "16 edited reels with hooks tested against each other",
          "8 long-form articles and 2 lead magnets",
          "Founder ghostwriting for LinkedIn or X",
          "Fortnightly email newsletter, written and sent",
          "A custom voice model tuned on your best-performing work",
          "Dedicated content lead on WhatsApp",
          "Quarterly strategy session with your team",
        ],
        cta: {
          label: "Start with Authority",
          message:
            "Hi Konark Soft, I am interested in the Authority content plan (₹39,999/month). Please share the details.",
        },
        tone: "plain",
      },
    ],
    custom: {
      eyebrow: "Option 4",
      title: { lead: "Volume or niche?", accent: "Tell us what you need" },
      description:
        "Thousands of product descriptions, ad creative at test-and-scale volumes, technical writing that needs a subject expert, or content in Hindi, Odia, Bengali and Tamil alongside English. We scope it against your actual catalogue and quote once.",
      capabilities: [
        "Product catalogues at scale",
        "Multilingual content",
        "Technical & medical writing",
        "Ad creative at volume",
        "Video editing only",
        "In-house team training",
      ],
      priceNote: "Free sample first · no obligation",
      cta: {
        label: "Get a custom quote",
        message:
          "Hi Konark Soft, I need a custom content plan. Here is what I am looking for:",
      },
    },
    footnote:
      "All prices are monthly and exclude GST. No lock-in: 30 days' notice ends it and every file, calendar and voice guide is handed over. You own the copyright to everything we produce, from the first piece.",
  },

  included: {
    heading: { lead: "What separates this from", accent: "a prompt and a hope" },
    description:
      "The process is the product. Anyone can generate a caption; the parts below are why yours will not read like one.",
    items: [
      {
        title: "A voice guide built from your words",
        description:
          "We start from what you have already published, plus an hour of you talking. The model writes from that, so the output sounds like your business rather than the internet's average.",
      },
      {
        title: "A human edits everything",
        description:
          "Every piece is read, cut and corrected by an editor before you see it. AI drafts fast and lies confidently; that second step is what the fee is really for.",
      },
      {
        title: "Checked before it ships",
        description:
          "Plagiarism and AI-detection screening, plus a factual pass on anything with a claim, a number or a date in it.",
      },
      {
        title: "Native to each platform",
        description:
          "A reel script, a LinkedIn post and a blog intro are three different crafts. Nothing is one piece of copy pasted into four boxes.",
      },
      {
        title: "Planned, not improvised",
        description:
          "A calendar you approve in advance, with each piece mapped to a stage of buying — so the month has a shape instead of a scramble.",
      },
      {
        title: "You own the copyright",
        description:
          "Every file, caption, script and article is yours outright, handed over in your drive. Nothing is licensed back to you and nothing is reused elsewhere.",
      },
    ],
  },

  process: {
    heading: { lead: "From first call to", accent: "publishing daily" },
    description: "You approve the voice and the calendar before anything is made.",
    steps: [
      {
        index: "01",
        title: "Voice session",
        description:
          "One hour with you, plus everything you have already published. We come back with a brand voice guide — tone, vocabulary, what you never say — for you to correct.",
      },
      {
        index: "02",
        title: "Calendar you approve",
        description:
          "A month of topics mapped to what your customers are actually deciding between, and to the stage of buying each piece is for. You approve it before a word is written.",
      },
      {
        index: "03",
        title: "Draft, edit, deliver",
        description:
          "AI drafts against the voice guide, an editor cuts and corrects, designers lay it out. First batch lands within seven days, in your drive, ready to post.",
      },
      {
        index: "04",
        title: "Publish and learn",
        description:
          "We schedule and post if you want us to, then read the numbers monthly: which hooks held, which formats died, what next month does more and less of.",
      },
    ],
  },

  testimonials: {
    heading: { lead: "What brands say", accent: "after month one" },
    // Placeholder quotes — replace with real, attributable client feedback.
    items: [
      {
        quote:
          "I had already tried an AI tool myself and everything it wrote was unusable. The difference here is the voice guide and the editor — my team genuinely cannot tell which posts I wrote.",
        name: "Kavya Menon",
        role: "Founder, Thistle & Bloom",
      },
      {
        quote:
          "We went from four posts a month to twenty-two, and the blogs started ranking in the eleventh week. The calendar being approved in advance is what made it survivable on our side.",
        name: "Rohit Bansal",
        role: "Marketing Lead, Finlyt",
      },
      {
        quote:
          "The honesty sold me. They told me upfront where AI drafts and where a person rewrites, instead of pretending a copywriter was typing every word for ten thousand rupees.",
        name: "Divya Pillai",
        role: "Founder, The Clay Studio",
      },
    ],
  },

  faq: {
    heading: { lead: "Questions", accent: "before you commit" },
    description:
      "If yours is not here, ask it on WhatsApp — we reply the same day.",
    items: [
      {
        question: "Is this just ChatGPT with an invoice attached?",
        answer:
          "No, and we would rather answer that plainly than dance around it. AI writes the first draft, against a voice guide built from your own material and a brief written by a strategist. A human editor then cuts, corrects and rewrites before you ever see it. You are paying for the guide, the brief and the editor — the drafting is the fastest and least valuable part.",
      },
      {
        question: "Will Google penalise AI-assisted content?",
        answer:
          "Google's stated position is that it rewards helpful content regardless of how it was produced, and penalises unhelpful content produced at scale to manipulate rankings. That is exactly why every piece is edited, fact-checked and written to answer a real question. Unedited bulk output is the thing that gets penalised, and it is not what we sell.",
      },
      {
        question: "How do you make it sound like us and not like AI?",
        answer:
          "The voice guide does most of it: your existing posts, an hour of you talking, and a written record of your vocabulary, sentence rhythm and the things you never say. The editor does the rest. On the Authority plan we tune a model on your best-performing pieces specifically.",
      },
      {
        question: "Who owns the content?",
        answer:
          "You do, completely and from the first piece. Full copyright, delivered in your own drive, never reused for another client. If you leave, you keep the voice guide and the calendar as well.",
      },
      {
        question: "Do you post it, or do I?",
        answer:
          "Either. Growth and Authority include scheduling and posting to your accounts if you want it — we work inside your profiles, added as a collaborator, never by holding your passwords. Plenty of clients prefer to publish themselves, and that costs the same.",
      },
      {
        question: "What if I do not like a piece?",
        answer:
          "Two revision rounds per batch on Starter, unlimited within the month on Growth and Authority. In practice most friction happens in the first three weeks while the voice guide settles, and it drops sharply after that.",
      },
      {
        question: "Which languages do you write in?",
        answer:
          "English by default. Hindi, Odia, Bengali and Tamil are available — these are written and edited by native speakers rather than machine-translated from the English, because translated marketing copy always reads translated.",
      },
      {
        question: "How long is the contract?",
        answer:
          "There is not one. Month to month with 30 days' notice from the first month. We would suggest giving it three months before judging it, because the voice guide gets meaningfully better once we have real performance data — but nothing obliges you to stay.",
      },
    ],
  },

  form: {
    eyebrow: "Free samples",
    heading: { lead: "Tell us about your brand,", accent: "get free samples" },
    description:
      "Fill this in and it opens WhatsApp with your details ready to send — we will write three sample pieces in your voice before you pay anything.",
    needs: [
      "Starter — ₹9,999/month",
      "Growth — ₹19,999/month",
      "Authority — ₹39,999/month",
      "Blog and SEO content only",
      "Reels and video editing only",
      "Not sure yet — please advise",
    ],
    submitLabel: "Send on WhatsApp",
    disclaimer:
      "No spam calls, no selling your number. We reply with sample content and a plan — usually within a few hours.",
    aside: {
      title: "Would rather just talk?",
      points: [
        "Reply within 24 hours, every working day",
        "Three free sample pieces before you pay",
        "No lock-in, ever — 30 days' notice",
        "English, Hindi, Odia, Bengali and Tamil",
      ],
      callLabel: "Call us instead",
    },
  },

  sticky: {
    headline: "Content from ₹9,999/mo",
    support: "Free samples first",
    cta: {
      label: "WhatsApp",
      message:
        "Hi Konark Soft, I want free sample content and a quote for my brand.",
    },
  },
};
