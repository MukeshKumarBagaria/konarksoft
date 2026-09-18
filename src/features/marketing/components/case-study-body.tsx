import Link from "next/link";
import type { CSSProperties } from "react";

import { ArrowUpRightIcon, CheckIcon } from "@/components/ui/icons";
import { ProjectArtwork } from "@/features/marketing/components/project-artwork";
import { workToneColors } from "@/features/marketing/work-tones";
import type { CaseStudy } from "@/types/content";

/**
 * Section heading shared by every block on the page: a serif eyebrow over a
 * bold title, so the case study keeps one rhythm from challenge to outcome.
 */
function SectionHeading({
  eyebrow,
  title,
  id,
}: {
  eyebrow: string;
  title: string;
  id: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-4 text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.08] font-bold tracking-[-0.03em] text-ink text-balance"
      >
        {title}
      </h2>
    </div>
  );
}

/** The facts band directly under the hero — client, sector, scope, live URL. */
export function CaseStudyFacts({ study }: { study: CaseStudy }) {
  return (
    <section aria-label="Project details" className="mx-auto max-w-7xl px-5 -mt-8 sm:-mt-10">
      <dl
        data-reveal
        className="grid gap-px overflow-hidden rounded-[2rem] bg-hairline ring-1 ring-hairline shadow-[0_24px_60px_-40px_rgba(18,18,32,0.5)] sm:grid-cols-2 lg:grid-cols-4"
      >
        {study.facts.map((fact) => (
          <div key={fact.label} className="bg-white px-7 py-8 sm:px-8">
            <dt className="text-[12px] font-semibold tracking-[0.14em] text-subtle uppercase">
              {fact.label}
            </dt>
            <dd className="mt-3 text-lg leading-snug font-semibold tracking-[-0.01em] text-ink text-pretty">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** The problem the engagement started from. */
export function CaseStudyChallenge({ study }: { study: CaseStudy }) {
  return (
    <section
      aria-labelledby="challenge-heading"
      className="mx-auto max-w-7xl px-5 py-24 sm:py-28"
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div data-reveal>
          <SectionHeading
            id="challenge-heading"
            eyebrow="The challenge"
            title={study.challenge.heading}
          />
        </div>

        <div data-reveal className="space-y-5">
          {study.challenge.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="text-lg leading-relaxed text-muted text-pretty"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/** The work, as numbered moves on the project's own tone. */
export function CaseStudyApproach({ study }: { study: CaseStudy }) {
  const colors = workToneColors[study.tone];

  return (
    <section
      aria-labelledby="approach-heading"
      style={{ "--tone-wash": colors.wash } as CSSProperties}
      className="case-approach rounded-[2rem] py-24 sm:py-28 md:rounded-[2.75rem]"
    >
      <div className="mx-auto max-w-7xl px-5">
        <div data-reveal>
          <SectionHeading
            id="approach-heading"
            eyebrow="The approach"
            title={study.approach.heading}
          />
          <p className="mt-6 max-w-2xl text-lg text-muted text-pretty">
            {study.approach.body}
          </p>
        </div>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2">
          {study.approach.steps.map((step) => (
            <li key={step.index} data-reveal className="h-full">
              <article className="flex h-full flex-col rounded-[1.75rem] bg-white p-7 ring-1 ring-hairline shadow-[0_18px_40px_-32px_rgba(18,18,32,0.55)] sm:p-8">
                <span
                  aria-hidden="true"
                  style={{ "--tone-to": colors.to } as CSSProperties}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--tone-to)] font-display text-lg text-white italic"
                >
                  {step.index}
                </span>

                <h3 className="mt-6 text-xl leading-tight font-bold tracking-[-0.02em] text-ink text-balance">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted text-pretty">
                  {step.description}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** What shipped, plus the stack it runs on. */
export function CaseStudyDelivered({ study }: { study: CaseStudy }) {
  const colors = workToneColors[study.tone];

  return (
    <section
      aria-labelledby="delivered-heading"
      className="mx-auto max-w-7xl px-5 py-24 sm:py-28"
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div data-reveal>
          <SectionHeading
            id="delivered-heading"
            eyebrow="Deliverables"
            title={study.delivered.heading}
          />

          <p className="mt-8 text-[12px] font-semibold tracking-[0.14em] text-subtle uppercase">
            Built on
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {study.stack.map((item) => (
              <li
                key={item}
                className="rounded-full bg-canvas px-3.5 py-2 text-[13px] font-medium text-ink/75 ring-1 ring-hairline"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <ul data-reveal className="grid gap-px overflow-hidden rounded-[1.75rem] bg-hairline ring-1 ring-hairline sm:grid-cols-2">
          {study.delivered.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 bg-white px-6 py-5"
            >
              <span
                aria-hidden="true"
                style={{ "--tone-to": colors.to } as CSSProperties}
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--tone-to)] text-white"
              >
                <CheckIcon className="h-3 w-3" />
              </span>
              <span className="text-[15px] leading-relaxed text-ink/80 text-pretty">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Where it landed: the narrative, then the figures. */
export function CaseStudyOutcome({ study }: { study: CaseStudy }) {
  return (
    <section
      aria-labelledby="outcome-heading"
      className="canvas-ember relative isolate mx-5 overflow-hidden rounded-[2rem] py-20 sm:py-24 md:rounded-[2.75rem]"
    >
      {/* `z-1` puts the veil above the chevron arms, which paint at `z-0` on
          the surface's own pseudo-elements — without it the arms sit on top of
          the scrim and the copy keeps the bare surface's contrast. */}
      <div
        aria-hidden="true"
        className="canvas-ember-scrim-wide pointer-events-none absolute inset-0 z-1"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-10">
        <div data-reveal className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.16em] text-white/70 uppercase">
            The outcome
          </p>
          <h2
            id="outcome-heading"
            className="mt-4 text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.08] font-bold tracking-[-0.03em] text-white text-balance"
          >
            {study.outcome.heading}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/75 text-pretty">
            {study.outcome.body}
          </p>
        </div>

        <dl
          data-reveal
          className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {study.outcome.metrics.map((metric) => (
            <div
              key={metric.label}
              className="border-t border-white/15 pt-6"
            >
              <dd className="text-[clamp(2rem,3.6vw,2.875rem)] leading-none font-extrabold tracking-[-0.035em] text-white">
                {metric.value}
              </dd>
              {/* `white/70` rather than the `/60` the CTA card uses for small
                  print: over this band's lightest pixel `/60` measures 4.08:1,
                  just under the 4.5:1 floor for text this size. */}
              <dt className="mt-3 text-sm leading-snug text-white/70 text-pretty">
                {metric.label}
              </dt>
            </div>
          ))}
        </dl>

        {study.testimonial ? (
          <figure data-reveal className="mt-16 max-w-3xl border-t border-white/15 pt-10">
            <blockquote className="font-display text-[clamp(1.25rem,2.4vw,1.75rem)] leading-snug text-white/90 italic text-pretty">
              “{study.testimonial.quote}”
            </blockquote>
            <figcaption className="mt-5 text-sm text-white/70">
              <span className="font-semibold text-white/80">
                {study.testimonial.name}
              </span>
              {" — "}
              {study.testimonial.role}
            </figcaption>
          </figure>
        ) : null}
      </div>
    </section>
  );
}

/**
 * The link on to the next project, so the case studies read as a sequence
 * rather than as seven dead ends that each need a trip back to the index.
 */
export function CaseStudyNext({ next }: { next: CaseStudy }) {
  const colors = workToneColors[next.tone];

  return (
    <section
      aria-labelledby="next-heading"
      className="mx-auto max-w-7xl px-5 py-24 sm:py-28"
    >
      <div className="flex items-end justify-between gap-6">
        <h2
          id="next-heading"
          data-reveal
          className="text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-bold tracking-[-0.03em] text-ink"
        >
          Next project
        </h2>

        <Link
          href="/work"
          className="shrink-0 text-[15px] font-semibold text-ink/70 transition-colors hover:text-ink"
        >
          All work
        </Link>
      </div>

      <article
        data-reveal
        style={
          {
            "--tone-wash": colors.wash,
            "--tone-ink": colors.ink,
          } as CSSProperties
        }
        className="work-card group relative mt-8 grid gap-8 rounded-[1.75rem] p-5 ring-1 ring-hairline transition-[box-shadow,translate] duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-float sm:p-6 lg:grid-cols-[1fr_1fr] lg:items-center"
      >
        <div className="px-1 sm:px-2">
          <p className="font-display text-[15px] text-[var(--tone-ink)] italic">
            {next.category}
          </p>

          <h3 className="mt-2 text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-bold tracking-[-0.025em] text-ink">
            <Link
              href={{ pathname: `/work/${next.slug}` }}
              className="after:absolute after:inset-0 after:rounded-[1.75rem] focus-visible:outline-none"
            >
              {next.name}
            </Link>
          </h3>

          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink/70 text-pretty">
            {next.summary}
          </p>

          <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-ink">
            Read the case study
            <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        <ProjectArtwork
          tone={next.tone}
          wordmark={next.wordmark}
          displayUrl={next.displayUrl}
          className="aspect-[16/10] rounded-[1.25rem]"
        />
      </article>
    </section>
  );
}
