import Link from "next/link";
import type { CSSProperties } from "react";

import { ArrowUpRightIcon, ChevronRightIcon } from "@/components/ui/icons";
import { ProjectArtwork } from "@/features/marketing/components/project-artwork";
import { workToneColors } from "@/features/marketing/work-tones";
import type { CaseStudy } from "@/types/content";

/**
 * The case study's opening: breadcrumb, client name, the claim, the live link,
 * and the project's artwork at full width.
 *
 * The field behind it is tinted with the project's own tone rather than the
 * site's standard aurora, so each case study announces its own identity in the
 * first screen while keeping the same geometry as every other inner page.
 */
export function CaseStudyHero({ study }: { study: CaseStudy }) {
  const colors = workToneColors[study.tone];

  return (
    <section
      style={
        {
          "--tone-wash": colors.wash,
          "--tone-ink": colors.ink,
        } as CSSProperties
      }
      className="case-field relative isolate overflow-hidden rounded-b-[2rem] md:rounded-b-[2.75rem]"
    >
      <div
        aria-hidden="true"
        className="canvas-grid pointer-events-none absolute inset-0"
      />

      <div className="relative mx-auto max-w-7xl px-5 pt-32 pb-16 sm:pt-40 sm:pb-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-[13px] font-medium text-ink/55">
            <li>
              <Link href="/work" className="transition-colors hover:text-ink">
                Work
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRightIcon className="h-3 w-3" />
            </li>
            <li className="text-ink/80" aria-current="page">
              {study.name}
            </li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-14">
          <div>
            <p className="font-display text-lg text-[var(--tone-ink)] italic">
              {study.category}
            </p>

            <h1 className="mt-3 text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-extrabold tracking-[-0.035em] text-ink text-balance">
              {study.name}
            </h1>

            <p className="mt-6 max-w-xl text-[clamp(1.125rem,1.6vw,1.375rem)] leading-snug text-ink/75 text-pretty">
              {study.headline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={study.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full bg-ink-strong px-5 py-3 text-[15px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_10px_24px_-12px_rgba(13,13,17,0.75)] transition-[translate,background] duration-300 ease-out-soft hover:bg-ink active:translate-y-px"
              >
                Visit {study.displayUrl}
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>

              <ul className="flex flex-wrap gap-2">
                {study.disciplines.map((discipline) => (
                  <li
                    key={discipline}
                    className="rounded-full bg-white/80 px-3.5 py-2 text-[13px] font-medium text-ink/75 ring-1 ring-hairline"
                  >
                    {discipline}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ProjectArtwork
            tone={study.tone}
            wordmark={study.wordmark}
            slug={study.slug}
            url={study.url}
            displayUrl={study.displayUrl}
            embeddable={study.embeddable}
            size="lg"
            className="aspect-[16/11] rounded-[1.75rem] shadow-float ring-1 ring-black/5"
          />
        </div>
      </div>
    </section>
  );
}
