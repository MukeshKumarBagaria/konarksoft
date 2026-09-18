import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { siteConfig } from "@/config/site";
import { caseStudies, caseStudiesBySlug } from "@/content/portfolio";
import {
  CaseStudyApproach,
  CaseStudyChallenge,
  CaseStudyDelivered,
  CaseStudyFacts,
  CaseStudyNext,
  CaseStudyOutcome,
} from "@/features/marketing/components/case-study-body";
import { CaseStudyHero } from "@/features/marketing/components/case-study-hero";

/**
 * The portfolio is a fixed set known at build time, so every case study is
 * prerendered and nothing outside the list is a real page.
 *
 * `dynamicParams = false` is what makes an unknown slug answer with a genuine
 * 404 status. Left at its default (`true`), Next renders such a slug on demand
 * and serves the not-found body with a `200` — which reads to a crawler as a
 * valid page, and would let any mistyped `/work/...` URL into the index.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudiesBySlug.get(slug);

  if (!study) return {};

  const title = `${study.name} — ${study.category}`;
  const canonical = `/work/${study.slug}`;

  return {
    title,
    description: study.summary,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title,
      description: study.summary,
      url: canonical,
    },
  };
}

/**
 * `CreativeWork` describing the engagement. `about` names the client as the
 * organisation the work was made for, and `url` points at their live site —
 * both facts the page already states outright.
 */
function caseStudyJsonLd(slug: string) {
  const study = caseStudiesBySlug.get(slug);
  if (!study) return null;

  const json = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${study.name} — ${study.category}`,
    headline: study.headline,
    description: study.summary,
    url: `${siteConfig.url}/work/${study.slug}`,
    creator: { "@type": "Organization", name: siteConfig.name },
    about: { "@type": "Organization", name: study.name, url: study.url },
    keywords: study.disciplines.join(", "),
  };

  return JSON.stringify(json).replace(/</g, "\\u003c");
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = caseStudiesBySlug.get(slug);

  if (!study) notFound();

  // Wraps around, so the last case study leads back to the first rather than
  // ending the sequence on a dead end.
  const index = caseStudies.findIndex((entry) => entry.slug === slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: caseStudyJsonLd(slug) ?? "" }}
      />

      <CaseStudyHero study={study} />

      <ScrollReveal>
        <CaseStudyFacts study={study} />
        <CaseStudyChallenge study={study} />
        <CaseStudyApproach study={study} />
        <CaseStudyDelivered study={study} />
        <CaseStudyOutcome study={study} />
        {next.slug === study.slug ? null : <CaseStudyNext next={next} />}
      </ScrollReveal>
    </>
  );
}
