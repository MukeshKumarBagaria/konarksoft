"use client";

import gsap from "gsap";
import { useEffect, useRef, type CSSProperties } from "react";

import { PlayIcon } from "@/components/ui/icons";
import { UnderlineStroke } from "@/components/ui/underline-stroke";
import { aboutToneColors } from "@/features/marketing/about-tones";
import type { AboutContent } from "@/types/content";

type HeroContent = AboutContent["hero"];

/**
 * The frame the studio film will play in. Until then it holds a tinted panel,
 * a play affordance and a caption saying so — the placeholder is dressed as a
 * finished component, so dropping a `<video>` into the tile is the only change
 * this section needs later.
 *
 * Both labels ride white pills rather than sitting straight on the wash: the
 * tile runs from pale to saturated, so nothing set directly on it could hold
 * its contrast across the whole frame.
 */
function MediaStage({ stage }: { stage: HeroContent["stage"] }) {
  const tone = aboutToneColors[stage.tone];

  return (
    <div className="about-stage rounded-[2rem] p-3 sm:rounded-[2.25rem] sm:p-4">
      <div
        style={
          { "--tone-from": tone.from, "--tone-to": tone.to } as CSSProperties
        }
        className="about-tile relative flex aspect-[16/11] items-center justify-center overflow-hidden rounded-[1.5rem] sm:aspect-[2/1] sm:rounded-[1.65rem]"
      >
        <p className="absolute top-4 left-4 rounded-full bg-white/85 px-3.5 py-1.5 text-[12px] font-semibold tracking-[0.12em] text-ink uppercase backdrop-blur-sm sm:top-5 sm:left-5">
          {stage.label}
        </p>

        <div className="flex flex-col items-center gap-4">
          <span
            aria-hidden="true"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-float backdrop-blur-sm sm:h-[4.5rem] sm:w-[4.5rem]"
          >
            {/* Nudged right so the triangle's visual centre lands on the disc's. */}
            <PlayIcon className="ms-1 h-6 w-6 text-ink sm:h-7 sm:w-7" />
          </span>

          <p className="rounded-full bg-white/85 px-4 py-1.5 text-[13px] font-medium text-ink backdrop-blur-sm">
            {stage.caption}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Opening block of the About page. Runs the same aurora field, grid and
 * mount-time reveal as the home hero, so the two pages open on one note.
 */
export function AboutHero({ content }: { content: HeroContent }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = rootRef.current;
    if (!scope) return;

    // Reduced-motion users keep the CSS fallback, which renders everything visible.
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        gsap.utils.toArray<HTMLElement>("[data-reveal]", scope),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.09,
          delay: 0.15,
        },
      );
    });

    return () => media.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-labelledby="about-heading"
      className="canvas-aurora relative isolate overflow-hidden rounded-b-[2rem] md:rounded-b-[2.75rem]"
    >
      <div
        aria-hidden="true"
        className="canvas-grid pointer-events-none absolute inset-0"
      />

      <div className="relative mx-auto max-w-4xl px-5 pt-36 text-center sm:pt-44">
        <p
          data-reveal
          className="text-xs font-semibold tracking-[0.16em] text-brand uppercase"
        >
          {content.eyebrow}
        </p>

        <h1
          id="about-heading"
          data-reveal
          className="mt-5 text-[clamp(2.35rem,7.4vw,5.25rem)] leading-[1.0] font-extrabold tracking-[-0.035em] text-ink text-balance"
        >
          {content.headline.lead}
          <span className="mt-1 block font-display text-[1.04em] font-normal italic tracking-[-0.01em]">
            <span className="relative inline-block text-brand">
              {content.headline.accent}
              <UnderlineStroke />
            </span>
          </span>
        </h1>

        <p
          data-reveal
          className="mx-auto mt-7 max-w-2xl text-lg text-muted text-pretty sm:text-xl"
        >
          {content.description}
        </p>
      </div>

      <div
        data-reveal
        className="relative mx-auto mt-14 w-full max-w-6xl px-5 pb-20 sm:mt-16 sm:pb-24"
      >
        <MediaStage stage={content.stage} />
      </div>
    </section>
  );
}
