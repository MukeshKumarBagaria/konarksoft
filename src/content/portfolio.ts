import { siteConfig } from "@/config/site";
import type { CaseStudy, PortfolioContent } from "@/types/content";

/**
 * Every project the studio publishes, in the order they appear on `/work`.
 *
 * Each record is the single source for its card, its case study page and its
 * entry in the home rail — so a name, tone or figure is written once here and
 * cannot drift between the three places it renders.
 *
 * Every figure in `outcome.metrics` is either a number the client publishes on
 * their own site or a count of what was actually shipped. Nothing here is
 * modelled, projected or rounded up: a case study is a sales document, and one
 * invented number in it discredits the other six.
 */
export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "soulstruck",
    name: "SoulStruck",
    category: "Press-on nail brand",
    url: "https://soulstruck.in/",
    displayUrl: "soulstruck.in",
    embeddable: false,
    tone: "rose",
    wordmark: "Press & Pose",
    disciplines: ["E-commerce", "Website Development", "Meta & Google Ads"],
    summary:
      "A Shopify storefront for India's press-on nail brand, merchandised so a shopper can shop by length, colour, texture or occasion and check out in under a minute.",
    year: "2025",

    headline:
      "A beauty catalogue with 40+ ways in, and a checkout that survives all of them.",
    facts: [
      { label: "Client", value: "SoulStruck" },
      { label: "Sector", value: "Beauty & personal care" },
      { label: "Engagement", value: "Store build, merchandising, paid social" },
      { label: "Live at", value: "soulstruck.in" },
    ],
    challenge: {
      heading: "Selling a product nobody shops by name",
      body: [
        "Press-on nails are bought on impulse and on looks. Nobody arrives searching for a SKU — they arrive knowing they want something short and chrome for a wedding next Friday, and they leave the moment a store makes them scroll a flat grid to find it.",
        "The catalogue had to be navigable four different ways at once — by style, by length, by occasion and by colour — without splintering into four separate stores. And it had to answer the objection that kills the category on the first visit: that this is a salon job needing a UV lamp and an afternoon.",
      ],
    },
    approach: {
      heading: "What we built",
      body: "The store is organised around how the product is actually chosen, not how it is warehoused. Every design carries the metadata for all four axes, so one product feeds every route a shopper might take to it.",
      steps: [
        {
          index: "01",
          title: "Four-axis merchandising",
          description:
            "Style, length, occasion, colour and texture each became a browsable collection — 3D, French, chrome, glitter, bridal, work — all resolving to the same product records rather than duplicated listings.",
        },
        {
          index: "02",
          title: "The objection, answered above the fold",
          description:
            "'Apply in under 10 minutes' and 'Zero UV needed' lead the page, with the prep-press-pose sequence and the how-to-remove guide built into the product template rather than buried in a help centre.",
        },
        {
          index: "03",
          title: "Two editions per design",
          description:
            "Every design ships as a Signature Edit and a Pocket Edit, letting one creative asset cover two price points and giving the bundle ladder something to climb.",
        },
        {
          index: "04",
          title: "A bundle ladder at the cart",
          description:
            "Buy 2 for 10% off, 3 for 15%, 4 for 20% — surfaced on the product page, not just at checkout, so basket-building starts before the cart does.",
        },
      ],
    },
    delivered: {
      heading: "Shipped",
      items: [
        "Shopify storefront, custom theme",
        "Collection architecture across style, length, colour, texture and occasion",
        "Curated edits — Bride Vibe Only, Luxe AF, Soft Girl Chic, Trendy & Artistic",
        "Product template with application and removal guides",
        "Tiered bundle discounting",
        "Verified-buyer review surfacing and influencer wall",
        "Instagram feed integration",
        "Free-shipping threshold and 48-hour dispatch messaging",
        "Blog for organic search",
        "Meta and Google campaigns against the seasonal sale",
      ],
    },
    outcome: {
      heading: "Where it landed",
      body: "The store now carries a festive sale across the full catalogue and fronts a customer base it can quote in its own marketing — the social proof is on the page because there is enough of it to publish.",
      metrics: [
        { value: "20,000+", label: "Customers served" },
        { value: "48 hrs", label: "Dispatch window" },
        { value: "₹349+", label: "Entry price point" },
        { value: "5", label: "Ways to browse the catalogue" },
      ],
    },
    stack: [
      "Shopify",
      "Custom Liquid theme",
      "Meta Ads",
      "Google Ads",
      "Instagram Shopping",
    ],
  },

  {
    slug: "prayag-tourist-guide",
    name: "Prayag Tourist Guide",
    category: "Spiritual tourism operator",
    url: "https://prayagtouristguide.com/",
    displayUrl: "prayagtouristguide.com",
    embeddable: true,
    tone: "amber",
    wordmark: "Every Step",
    disciplines: ["Website Development", "SEO", "Meta & Google Ads"],
    summary:
      "A booking-led site for a Prayagraj tour operator, built to catch Kumbh and Magh Mela search traffic and turn it into packaged, priced itineraries.",
    year: "2025",

    headline:
      "A pilgrimage operator that stopped quoting by phone and started publishing prices.",
    facts: [
      { label: "Client", value: "Prayag Tourist Guide" },
      { label: "Sector", value: "Travel & pilgrimage" },
      { label: "Engagement", value: "Website, content, search & paid" },
      { label: "Live at", value: "prayagtouristguide.com" },
    ],
    challenge: {
      heading: "Seasonal demand, no shelf to sell from",
      body: [
        "Pilgrimage traffic to Prayagraj is enormous and violently seasonal — Magh Mela every year, Mahakumbh on its own cycle. Demand arrives as a search, weeks ahead, from someone planning a trip they have never made before.",
        "The operator's knowledge of Prayagraj, Ayodhya, Varanasi, Mathura and Vrindavan was real, but it lived entirely in phone calls. Every enquiry started from zero: what is included, how long does it take, what does it cost. Without that on a page, the search traffic had nothing to convert against.",
      ],
    },
    approach: {
      heading: "What we built",
      body: "We turned a guiding service into a product catalogue — fixed itineraries, fixed durations, fixed prices — and wrapped it in the destination content the searches are actually looking for.",
      steps: [
        {
          index: "01",
          title: "Packages, priced and dated",
          description:
            "Six itineraries published with duration and price on the card — from a ₹2,500 single-day Triveni tour to the ₹15,000 three-day Spiritual Triangle across Prayagraj, Kashi and Ayodhya.",
        },
        {
          index: "02",
          title: "Destination pages as the front door",
          description:
            "Nine attraction guides — Prayagraj, Ayodhya, Varanasi, Vrindavan, Mathura, Sarnath, Agra, Lucknow and adventure activities — each one a landing page for the searches that precede a booking.",
        },
        {
          index: "03",
          title: "Mela content, published early",
          description:
            "Articles on Magh Mela and Mahakumbh 2025 shipped ahead of the season, so the site was already indexed when the search volume arrived rather than chasing it.",
        },
        {
          index: "04",
          title: "One tap to the guide",
          description:
            "Every package and every page ends in a call or a WhatsApp message to a real number, because this booking is made by conversation and a form would only add a step.",
        },
      ],
    },
    delivered: {
      heading: "Shipped",
      items: [
        "Multi-page website with package catalogue",
        "Six priced itineraries, one to three days",
        "Nine destination and attraction guides",
        "Blog with Mela and festival coverage",
        "Photo gallery",
        "Click-to-call and WhatsApp enquiry on every page",
        "On-page SEO for pilgrimage and Kumbh search terms",
        "Meta and Google campaigns timed to the Mela calendar",
      ],
    },
    outcome: {
      heading: "Where it landed",
      body: "The operator now sells from a published shelf instead of a phone call. A visitor can see the itinerary, the duration and the price before they make contact — so the conversations that do start begin at the booking, not at the beginning.",
      metrics: [
        { value: "6", label: "Packages published" },
        { value: "9", label: "Destination guides" },
        { value: "5", label: "Pilgrimage cities covered" },
        { value: "₹2,500", label: "Entry itinerary" },
      ],
    },
    stack: ["Next.js", "Responsive CMS", "WhatsApp Business", "Google Ads"],
  },

  {
    slug: "avatrois",
    name: "Avatrois",
    category: "Activewear label",
    url: "https://avatrois.com/",
    displayUrl: "avatrois.com",
    embeddable: true,
    tone: "lime",
    wordmark: "Train. Sweat.",
    disciplines: ["E-commerce", "Website Development", "Branding"],
    summary:
      "A performance activewear store for men and women, built with the full retail apparatus — wishlist, compare, accounts, order tracking and returns.",
    year: "2025",

    headline: "Gym wear sold like gym wear: on fit, on feel, on the discount.",
    facts: [
      { label: "Client", value: "Avatrois" },
      { label: "Sector", value: "Activewear & fitness apparel" },
      { label: "Engagement", value: "Store build, brand system, merchandising" },
      { label: "Live at", value: "avatrois.com" },
    ],
    challenge: {
      heading: "A crowded category with no shortcut",
      body: [
        "Activewear is one of the most contested categories in Indian e-commerce, and it is fought on two fronts at once: the product has to read as premium enough to justify the price, and the store has to behave like the marketplaces the shopper just came from.",
        "A shopper comparing a ₹1,899 performance tee against four other tabs expects a wishlist, a compare view, a saved cart and a way to check where their order is. Without those, the price looks the same but the store feels smaller — and the sale goes to whoever built the boring parts.",
      ],
    },
    approach: {
      heading: "What we built",
      body: "We built the unglamorous retail infrastructure first, then put a brand on top of it that could carry the price.",
      steps: [
        {
          index: "01",
          title: "The full retail toolkit",
          description:
            "Wishlist, product comparison, persistent cart, customer accounts, order tracking and returns management — the features a shopper does not notice until they are missing.",
        },
        {
          index: "02",
          title: "Split catalogue, one system",
          description:
            "Men's and women's ranges — performance tees, sleeveless, track pants — merchandised separately but running on a shared product model so a colourway is entered once.",
        },
        {
          index: "03",
          title: "A hero that shows the product moving",
          description:
            "Slider-led homepage built around motion and fit photography, framed by 'Comfort Meets Performance' and 'Train, Sweat, Conquer' rather than a specification list.",
        },
        {
          index: "04",
          title: "Discounting that tiers by basket",
          description:
            "Store-wide markdowns up to 40%, with incentives that scale on cart value — so the promotion lifts the average order rather than just the conversion rate.",
        },
      ],
    },
    delivered: {
      heading: "Shipped",
      items: [
        "Full e-commerce storefront, men's and women's",
        "Wishlist and side-by-side product comparison",
        "Customer accounts with saved carts",
        "Order tracking and returns flow",
        "Hero slider and lookbook photography frames",
        "Tiered basket-value discounting",
        "Blog and content section",
        "Mobile-first product and checkout pages",
      ],
    },
    outcome: {
      heading: "Where it landed",
      body: "Avatrois now runs as a full retail operation rather than a catalogue — the shopper can save, compare, buy, track and return without ever leaving the brand.",
      metrics: [
        { value: "40%", label: "Peak store-wide discount" },
        { value: "2", label: "Gendered ranges, one catalogue" },
        { value: "6", label: "Retail features beyond checkout" },
        { value: "₹1,199", label: "Promotional entry price" },
      ],
    },
    stack: ["E-commerce platform", "Custom theme", "Payment gateway", "Analytics"],
  },

  {
    slug: "t7-apparels",
    name: "T7 Apparels",
    category: "Women's knitwear brand",
    url: "https://t7apparels.com/",
    displayUrl: "t7apparels.com",
    embeddable: false,
    tone: "violet",
    wordmark: "Made For Memories",
    disciplines: ["E-commerce", "Website Development", "Branding"],
    summary:
      "A Shopify store for a women's knitwear label, merchandised around coordinated sets and an occasion — honeymoon and winter travel — rather than a product grid.",
    year: "2025",

    headline: "Knitwear sold by the occasion it was packed for.",
    facts: [
      { label: "Client", value: "T7 Apparels" },
      { label: "Sector", value: "Women's fashion" },
      { label: "Engagement", value: "Shopify build, merchandising, creator programme" },
      { label: "Live at", value: "t7apparels.com" },
    ],
    challenge: {
      heading: "Knitwear is a season, not a category",
      body: [
        "Knits sell in a narrow window and compete against every fast-fashion listing in the country on price alone. A cable-knit sweater at ₹1,200 next to an identical-looking one at ₹600 loses, unless the store gives the shopper a different reason to be there.",
        "The range's real strength was the coordinated set — a cord set that solves a whole outfit — and a customer base buying for a specific trip. Neither fact survives a plain product grid sorted by price.",
      ],
    },
    approach: {
      heading: "What we built",
      body: "We merchandised the store around the moment the clothes are bought for, and let the set — not the single piece — lead every collection.",
      steps: [
        {
          index: "01",
          title: "An occasion, stated outright",
          description:
            "'Made For Honeymoon Memories' leads the store, framing the range as winter-travel wear rather than as generic knitwear and lifting it out of a price comparison.",
        },
        {
          index: "02",
          title: "Sets before separates",
          description:
            "Cord sets merchandised as the hero category, with tops, dresses, shrugs and sleeveless supporting — so the default basket is an outfit, not an item.",
        },
        {
          index: "03",
          title: "Colourways doing the photography's work",
          description:
            "Emerald, mulberry, scarlet, brick and cream shot on texture, with every colourway on one product page so the knit detail carries the premium.",
        },
        {
          index: "04",
          title: "Creator codes, tracked",
          description:
            "Influencer partnerships issued as named 15% discount codes, so each collaboration reports its own revenue instead of disappearing into a traffic spike.",
        },
      ],
    },
    delivered: {
      heading: "Shipped",
      items: [
        "Shopify storefront with custom theme",
        "Category architecture — cord sets, tops, dresses, shrugs, sleeveless",
        "Multi-colourway product pages with texture-led photography",
        "Creator discount-code programme",
        "Free shipping above ₹2,499 and COD across India",
        "7-day exchange flow",
        "Seasonal markdown engine",
        "Social proof and trust messaging in the header",
      ],
    },
    outcome: {
      heading: "Where it landed",
      body: "The store now leads with an occasion and closes with a set — and carries a customer count it can put in its own header.",
      metrics: [
        { value: "10,000+", label: "Customers, per the brand" },
        { value: "5", label: "Product categories" },
        { value: "7 days", label: "Exchange window" },
        { value: "₹2,499", label: "Free-shipping threshold" },
      ],
    },
    stack: ["Shopify", "Custom Liquid theme", "COD & payment gateway", "Creator tracking"],
  },

  {
    slug: "technovita-solution",
    name: "Technovita Solution",
    category: "E-commerce growth agency",
    url: "https://www.technovitasolution.com/",
    displayUrl: "technovitasolution.com",
    embeddable: true,
    tone: "sky",
    wordmark: "Growth Experts",
    disciplines: ["Website Development", "SEO", "Branding"],
    summary:
      "A lead-generation site for a marketplace onboarding agency, built to qualify sellers across nine platforms and route them into a consultation.",
    year: "2025",

    headline: "Nine marketplaces, one consultation form, and proof between them.",
    facts: [
      { label: "Client", value: "Technovita Solution" },
      { label: "Sector", value: "E-commerce services" },
      { label: "Engagement", value: "Website, positioning, lead capture" },
      { label: "Live at", value: "technovitasolution.com" },
    ],
    challenge: {
      heading: "A service nobody can picture",
      body: [
        "Marketplace onboarding is an invisible service. A seller knows they want to be on Myntra or Nykaa; they do not know that account setup, catalogue mapping, listing optimisation and PPC are separate disciplines, or why an agency should do them.",
        "The site had to make a nine-platform service legible in one scroll, establish that the agency had done it before, and get a qualified enquiry — all against a visitor who arrived sceptical because the category is full of people making the same claims.",
      ],
    },
    approach: {
      heading: "What we built",
      body: "We led with the platforms, because that is what the visitor is searching for, then put the track record directly under each claim.",
      steps: [
        {
          index: "01",
          title: "Platform-first navigation",
          description:
            "Amazon, Flipkart, Myntra, Ajio, Nykaa, Meesho, Walmart, Shopee and eBay each given their own route in, so a seller searching for one platform lands on a page about that platform.",
        },
        {
          index: "02",
          title: "The service, unbundled",
          description:
            "Account setup, catalogue and inventory management, listing optimisation, PPC, product photography and 24/7 monitoring listed as distinct deliverables instead of one vague retainer.",
        },
        {
          index: "03",
          title: "Numbers as the trust layer",
          description:
            "200+ brands launched, 300% average sales lift, 98% client satisfaction and five years in market published on the page — with verified seller success stories underneath.",
        },
        {
          index: "04",
          title: "One conversion, everywhere",
          description:
            "A consultation enquiry form as the single call to action, repeated down the page so the decision to enquire can be made at any point in the scroll.",
        },
      ],
    },
    delivered: {
      heading: "Shipped",
      items: [
        "Corporate website with platform-level pages",
        "Nine marketplace service routes",
        "Unbundled service descriptions",
        "Verified seller success stories",
        "'Why Technovita' credibility section",
        "Consultation enquiry form with qualification fields",
        "Responsive, accessibility-checked layout",
        "On-page SEO for marketplace seller search terms",
      ],
    },
    outcome: {
      heading: "Where it landed",
      body: "The agency's claims and its evidence now sit on the same screen. A seller can find their platform, see the specific work, read a result from someone who sells what they sell, and book — without a call to find out what the service is.",
      metrics: [
        { value: "9+", label: "Marketplaces covered" },
        { value: "200+", label: "Brands launched, per the client" },
        { value: "300%", label: "Average sales increase claimed" },
        { value: "98%", label: "Client satisfaction reported" },
      ],
    },
    stack: ["Next.js", "Responsive CMS", "Form automation", "Technical SEO"],
  },

  {
    slug: "insightogram",
    name: "Insightogram",
    category: "IT consulting firm",
    url: "https://insightogram.com/",
    displayUrl: "insightogram.com",
    embeddable: true,
    tone: "indigo",
    wordmark: "Technology Into Growth",
    disciplines: ["Website Development", "Branding", "SEO"],
    summary:
      "A B2B site for an IT consultancy spanning data, apps, cloud and performance marketing — structured so six services read as one offer.",
    year: "2025",

    headline: "Six services, one argument: technology only counts when it moves revenue.",
    facts: [
      { label: "Client", value: "Insightogram" },
      { label: "Sector", value: "IT services & consulting" },
      { label: "Engagement", value: "Website, positioning, case study system" },
      { label: "Live at", value: "insightogram.com" },
    ],
    challenge: {
      heading: "Six services that looked like six companies",
      body: [
        "Data engineering, web development, mobile apps, performance marketing, automation consulting and staff augmentation are six genuinely different practices. Listed flat, they read as a firm that does everything and therefore specialises in nothing.",
        "The buyer is a CTO or a founder with a budget, and they are allergic to exactly that. The site had to hold all six without diluting any of them, and prove the range with work rather than assert it with adjectives.",
      ],
    },
    approach: {
      heading: "What we built",
      body: "We put a single business argument above the service list — technology, converted into growth — and made every service a proof of that one claim.",
      steps: [
        {
          index: "01",
          title: "One line above the six",
          description:
            "'Transforming Technology Into Business Growth' set as the organising claim, with operational efficiency, scalable growth and measurable revenue outcomes as the promise underneath it.",
        },
        {
          index: "02",
          title: "Services framed by outcome",
          description:
            "Each practice written as the result it produces — pipelines and dashboards that yield decisions, campaigns that yield pipeline — rather than as a technology list.",
        },
        {
          index: "03",
          title: "A case study system, not a portfolio page",
          description:
            "Six real engagements across wellness, agriculture, manufacturing and market research, structured so a new one can be added without redesigning the section.",
        },
        {
          index: "04",
          title: "Two doors to the same conversation",
          description:
            "'Book a Meeting' for the buyer who is ready and 'Schedule Free Consultation' for the one who is still scoping — the same calendar, two different levels of commitment.",
        },
      ],
    },
    delivered: {
      heading: "Shipped",
      items: [
        "Corporate website with six service practices",
        "Case study framework with six published engagements",
        "Client logo carousel",
        "Outcome-led service copy",
        "Dual booking paths — meeting and consultation",
        "On-demand talent and staff augmentation section",
        "Responsive layout across all breakpoints",
        "Structured data and technical SEO",
      ],
    },
    outcome: {
      heading: "Where it landed",
      body: "The firm now reads as one consultancy with six capabilities rather than six loosely joined service lines — and the case studies carry sectors far enough apart to make the range credible.",
      metrics: [
        { value: "6", label: "Service practices" },
        { value: "6", label: "Case studies published" },
        { value: "4+", label: "Sectors represented" },
        { value: "2", label: "Booking paths" },
      ],
    },
    stack: ["Next.js", "Headless CMS", "Analytics", "Technical SEO"],
  },

  {
    slug: "drishti-nasha-mukti",
    name: "Drishti Nasha Mukti Kendra",
    category: "De-addiction & rehabilitation centre",
    url: "https://www.drishtinashamukti.com/",
    displayUrl: "drishtinashamukti.com",
    embeddable: true,
    tone: "teal",
    wordmark: "Break Free",
    disciplines: ["Website Development", "SEO", "Meta & Google Ads"],
    summary:
      "A Bhopal rehabilitation centre's website, built for a family searching in crisis at three in the morning — credentials up front, one number, always reachable.",
    year: "2025",

    headline: "Built for the worst night of a family's life.",
    facts: [
      { label: "Client", value: "Drishti Nasha Mukti Kendra" },
      { label: "Sector", value: "Healthcare & rehabilitation" },
      { label: "Location", value: "Chuna Bhatti, Bhopal" },
      { label: "Live at", value: "drishtinashamukti.com" },
    ],
    challenge: {
      heading: "A search made in crisis",
      body: [
        "Nobody browses for a de-addiction centre. The search is made by a parent, a spouse or a sibling, usually at night, usually after something has gone badly wrong, and usually from a phone. They have minutes of patience and an enormous amount of fear.",
        "The category is also thick with unregistered facilities, which means the visitor is frightened and suspicious at the same time. Every question they have — is this real, is it safe, who runs it, what does it look like inside, can I speak to somebody now — had to be answerable without a scroll, and with dignity.",
      ],
    },
    approach: {
      heading: "What we built",
      body: "We designed against the state the visitor is actually in: fast to the phone, credentials before claims, and photography that shows the real place rather than a stock ward.",
      steps: [
        {
          index: "01",
          title: "Credentials before copy",
          description:
            "Government registration, ISO certification, seven years of operation and 100+ families served placed at the top — because in this category trust is the entire conversion and it cannot wait until the About page.",
        },
        {
          index: "02",
          title: "The programme range, in plain words",
          description:
            "Twenty programmes — medical detox, dual diagnosis, psychotherapy, family counselling, yoga and meditation, 12-step, youth de-addiction, relapse prevention — written so a family can recognise their own situation in the list.",
        },
        {
          index: "03",
          title: "The building, actually shown",
          description:
            "Real photography of therapy rooms, dormitories and dining areas, with the founders named on the page. A family deciding where to send someone needs to see the room they will sleep in.",
        },
        {
          index: "04",
          title: "24/7, meant literally",
          description:
            "A phone number fixed within reach on every screen and every page, because the visit that converts is the one that becomes a call within ninety seconds.",
        },
      ],
    },
    delivered: {
      heading: "Shipped",
      items: [
        "Website with twenty programme pages",
        "Credentials and certification band above the fold",
        "Facility photography — therapy, residential and dining spaces",
        "Named founder and clinical team profiles",
        "Success stories section",
        "Persistent 24/7 click-to-call",
        "Local SEO for Bhopal and Madhya Pradesh search terms",
        "Discreet, mobile-first layout throughout",
      ],
    },
    outcome: {
      heading: "Where it landed",
      body: "The centre's registration, its team, its programmes and its phone number are now reachable in one screen on a phone — which is the whole job, for a visitor who will not give the site a second chance.",
      metrics: [
        { value: "20", label: "Programmes published" },
        { value: "100+", label: "Families served, per the centre" },
        { value: "7+", label: "Years in operation" },
        { value: "24/7", label: "Contact availability" },
      ],
    },
    stack: ["Next.js", "Responsive CMS", "Local SEO", "Click-to-call"],
  },
];

/** Index lookup for the case study routes. */
export const caseStudiesBySlug = new Map(
  caseStudies.map((study) => [study.slug, study]),
);

export const portfolioContent: PortfolioContent = {
  meta: {
    title: "Work",
    description: `Case studies from ${siteConfig.name} — e-commerce storefronts, service websites and campaigns built for brands across beauty, fashion, travel, healthcare and technology.`,
  },
  canonical: "/work",
  header: {
    eyebrow: "Work",
    title: "Built, shipped and",
    accent: "live",
    description:
      "Seven engagements, every one of them online right now. Open any case study to see the problem it started from, what we built, and where it landed.",
  },
  stats: [
    { value: "7", label: "Projects live" },
    { value: "5", label: "Sectors served" },
    { value: "4", label: "E-commerce builds" },
    { value: "100%", label: "Shipped to production" },
  ],
  projects: caseStudies,
};
