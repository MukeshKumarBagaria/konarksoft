import { caseStudies } from "@/content/portfolio";
import type { RecentWorkContent } from "@/types/content";

/**
 * The home page rail, derived from the published case studies rather than
 * written out again — so a project added to the portfolio appears on the home
 * page with its real name, tone and disciplines, and can never fall out of step
 * with the case study it links to.
 *
 * Trimmed to the first four: the rail loops, and a longer set only lengthens
 * the scroll before a repeat without adding anything the `/work` index does not
 * already do better.
 */
export const recentWorkContent: RecentWorkContent = {
  heading: { lead: "Our Recent", accent: "Work" },
  items: caseStudies.slice(0, 4).map((study) => ({
    title: study.name,
    tags: study.disciplines,
    tone: study.tone,
    slug: study.slug,
    wordmark: study.wordmark,
    displayUrl: study.displayUrl,
  })),
};
