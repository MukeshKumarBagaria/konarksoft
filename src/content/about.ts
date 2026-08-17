import { siteConfig } from "@/config/site";
import type { AboutContent } from "@/types/content";

export const aboutContent: AboutContent = {
  meta: {
    title: "About",
    description: `${siteConfig.name} is a small senior team that designs, builds and grows websites, mobile apps and paid campaigns for ambitious brands.`,
  },
  canonical: "/about",

  hero: {
    eyebrow: "About",
    headline: { lead: "Imagination just got", accent: "a team" },
    description: `${siteConfig.name} collapses the distance between idea and finished work. Your judgement drives every call.`,
    stage: {
      label: "Studio film",
      caption: "Showreel coming soon",
      tone: "iris",
    },
  },

  mission: {
    eyebrow: "Our Mission",
    statement: {
      lead: "Our mission is to build a",
      accent: "unified digital practice",
      trail:
        "that can design, build, and grow everything your brand puts into the world.",
    },
    description:
      "One team holding the whole arc — the idea, the interface, the code and the campaign — so momentum never leaks out at a handover.",
    pillars: [
      {
        title: "Design",
        description:
          "Brand, product and interface work that gives the idea a shape people recognise on sight.",
      },
      {
        title: "Build",
        description:
          "Websites and mobile apps engineered in-house, shipped fast and maintained by the people who wrote them.",
      },
      {
        title: "Grow",
        description:
          "Meta and Google campaigns pointed at the same work, so the audience arrives at something ready for them.",
      },
    ],
  },

  principles: {
    heading: { lead: "How the", accent: "work happens" },
    description:
      "Four commitments we make on every engagement, and the reason clients stay past the first project.",
    items: [
      {
        index: "01",
        title: "One team, end to end",
        description:
          "Strategy, design, development and media sit in one room. Nothing is handed across an agency boundary and hoped for.",
        tone: "brand",
      },
      {
        index: "02",
        title: "Senior hands only",
        description:
          "The people you meet on the intro call are the people doing the work. Nobody learns the craft on your budget.",
        tone: "iris",
      },
      {
        index: "03",
        title: "Shipped beats perfect",
        description:
          "Working software reaches real users early, then gets sharpened by what they actually do with it.",
        tone: "rose",
      },
      {
        index: "04",
        title: "Numbers, not vibes",
        description:
          "Every engagement carries a metric it answers to. If the line is flat, we change the work — not the slide.",
        tone: "sky",
      },
    ],
  },

  /** Placeholders — swap in the studio's real figures before launch. */
  stats: [
    { value: "9 yrs", label: "Average lead experience" },
    { value: "120+", label: "Projects shipped" },
    { value: "4", label: "Disciplines in-house" },
    { value: "20 min", label: "From first call to a plan" },
  ],

  team: {
    heading: { lead: "The people", accent: "behind it" },
    description:
      "A deliberately small bench. Every seat is a discipline, and every discipline is senior.",
    members: [
      {
        role: "Engineering",
        focus: "Web & Mobile",
        caption: "Portrait coming soon",
        tone: "iris",
      },
      {
        role: "Design",
        focus: "Brand & Product",
        caption: "Portrait coming soon",
        tone: "brand",
      },
      {
        role: "Growth",
        focus: "Meta & Google",
        caption: "Portrait coming soon",
        tone: "rose",
      },
      {
        role: "Delivery",
        focus: "Strategy & Ops",
        caption: "Portrait coming soon",
        tone: "sky",
      },
    ],
  },
};
