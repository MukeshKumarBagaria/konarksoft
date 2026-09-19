"use client";

import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";

import { ArrowUpRightIcon } from "@/components/ui/icons";
import { ProjectArtwork } from "@/features/marketing/components/project-artwork";
import { workToneColors } from "@/features/marketing/work-tones";
import type { CaseStudy, CaseStudyDiscipline } from "@/types/content";

const ALL = "All work" as const;
type Filter = typeof ALL | CaseStudyDiscipline;

function ProjectCard({ project }: { project: CaseStudy }) {
  const colors = workToneColors[project.tone];

  return (
    <article
      style={
        {
          "--tone-wash": colors.wash,
          "--tone-ink": colors.ink,
        } as CSSProperties
      }
      className="work-card group relative flex h-full flex-col rounded-[1.75rem] p-4 ring-1 ring-hairline transition-[box-shadow,translate] duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-float sm:p-5"
    >
      <div className="flex items-start justify-between gap-4 px-2 pt-2">
        <div className="min-w-0">
          <h3 className="text-2xl leading-tight font-bold tracking-[-0.02em] text-ink sm:text-[1.75rem]">
            {/* Stretched over the whole card, so the entire tile is the target
                while the accessible name stays just the project. */}
            <Link
              href={{ pathname: `/work/${project.slug}` }}
              className="after:absolute after:inset-0 after:rounded-[1.75rem] focus-visible:outline-none"
            >
              {project.name}
            </Link>
          </h3>
          <p className="mt-1.5 font-display text-[15px] text-[var(--tone-ink)] italic">
            {project.category}
          </p>
        </div>

        <span
          aria-hidden="true"
          className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/85 text-ink ring-1 ring-hairline transition-[scale,background] duration-300 ease-out-soft group-hover:scale-105 group-hover:bg-white"
        >
          <ArrowUpRightIcon className="h-4 w-4" />
        </span>
      </div>

      <p className="mt-4 px-2 text-[15px] leading-relaxed text-ink/70 text-pretty">
        {project.summary}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2 px-2">
        {project.disciplines.map((discipline) => (
          <li
            key={discipline}
            className="rounded-full bg-white/85 px-3.5 py-1.5 text-[13px] font-medium text-ink/75 ring-1 ring-hairline"
          >
            {discipline}
          </li>
        ))}
      </ul>

      {/* `mt-auto` on the wrapper pushes the artwork to the card's foot, so
          every tile in a row ends on its panel however much copy sits above. */}
      <div className="mt-auto pt-5">
        <ProjectArtwork
          tone={project.tone}
          wordmark={project.wordmark}
          slug={project.slug}
          url={project.url}
          displayUrl={project.displayUrl}
          embeddable={project.embeddable}
          className="aspect-[16/10] rounded-[1.25rem]"
        />
      </div>
    </article>
  );
}

/**
 * The project grid, filterable by discipline.
 *
 * Filtering is client state rather than a URL param on purpose: there are seven
 * projects and the whole set is already in the DOM, so a filter is a cosmetic
 * narrowing rather than a new page worth its own history entry.
 */
export function PortfolioGrid({
  projects,
}: {
  projects: readonly CaseStudy[];
}) {
  const [filter, setFilter] = useState<Filter>(ALL);

  // Built from the projects themselves, so a new discipline on a new case study
  // shows up as a filter without being registered in two places.
  const filters = useMemo<readonly Filter[]>(() => {
    const seen = new Set<CaseStudyDiscipline>();
    for (const project of projects) {
      for (const discipline of project.disciplines) seen.add(discipline);
    }
    return [ALL, ...seen];
  }, [projects]);

  const visible = useMemo(
    () =>
      filter === ALL
        ? projects
        : projects.filter((project) => project.disciplines.includes(filter)),
    [filter, projects],
  );

  return (
    <section
      aria-labelledby="portfolio-heading"
      className="mx-auto max-w-7xl px-5 pt-16 pb-24 sm:pt-20 sm:pb-28"
    >
      <h2 id="portfolio-heading" className="sr-only">
        Selected projects
      </h2>

      <div
        role="group"
        aria-label="Filter projects by discipline"
        className="flex flex-wrap gap-2.5"
      >
        {filters.map((option) => {
          const active = option === filter;

          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(option)}
              className={
                active
                  ? "rounded-full bg-ink-strong px-4.5 py-2 text-[14px] font-semibold text-white transition-[background,color] duration-300 ease-out-soft"
                  : "rounded-full bg-white px-4.5 py-2 text-[14px] font-medium text-ink/70 ring-1 ring-hairline transition-[background,color] duration-300 ease-out-soft hover:bg-white hover:text-ink"
              }
            >
              {option}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-5 text-sm text-subtle">
        {visible.length} {visible.length === 1 ? "project" : "projects"}
        {filter === ALL ? "" : ` in ${filter}`}
      </p>

      <ul className="mt-8 grid gap-5 lg:grid-cols-2">
        {visible.map((project) => (
          <li key={project.slug} className="h-full">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
