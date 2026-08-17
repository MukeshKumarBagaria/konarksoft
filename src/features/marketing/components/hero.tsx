"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { buttonStyles } from "@/components/ui/button";
import { CoinIcon } from "@/components/ui/icons";
import { HeroCards } from "@/features/marketing/components/hero-cards";
import type { HeroContent } from "@/types/content";

/** Hand-drawn emphasis stroke under the accent word. */
function UnderlineStroke() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 300 14"
      fill="none"
      preserveAspectRatio="none"
      className="absolute -bottom-[0.12em] left-0 h-[0.16em] w-full text-brand"
    >
      <path
        d="M2 10.5C48 4.8 104 2 150 2c46 0 102 2.8 148 8.5"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Hero({ content }: { content: HeroContent }) {
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
      aria-labelledby="hero-heading"
      className="canvas-aurora relative isolate overflow-hidden rounded-b-[2rem] md:rounded-b-[2.75rem]"
    >
      <div
        aria-hidden="true"
        className="canvas-grid pointer-events-none absolute inset-0"
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 pt-32 text-center sm:pt-40 lg:pt-48">
        <p
          data-reveal
          className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-medium text-ink shadow-pill backdrop-blur-sm"
        >
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-brand"
          />
          {content.badge}
        </p>

        <h1
          id="hero-heading"
          data-reveal
          className="mt-8 text-[clamp(2.15rem,9vw,6.25rem)] leading-[0.98] font-extrabold tracking-[-0.035em] text-ink text-balance"
        >
          {content.headline}
          <span className="mt-1 block font-display text-[1.04em] font-normal italic tracking-[-0.01em]">
            {content.accent.lead}{" "}
            <span className="relative inline-block text-brand">
              {content.accent.highlight}
              <UnderlineStroke />
            </span>
          </span>
        </h1>

        <p
          data-reveal
          className="mt-8 max-w-md text-lg text-muted text-pretty sm:text-xl"
        >
          {content.subheadline}
        </p>

        <div data-reveal className="mt-9">
          <Link href={content.cta.href} className={buttonStyles({ size: "lg" })}>
            <CoinIcon className="h-[18px] w-[18px]" />
            {content.cta.label}
          </Link>
        </div>

      </div>

      {/* Wider than the copy above it, and shorter than the cards it holds:
          the deck overflows this box and the section clips it, so the cards
          bleed into the boundary below. */}
      <div className="relative mx-auto mt-14 w-full max-w-6xl px-5 pb-20 md:mt-16 md:h-[clamp(13rem,17.5vw,16rem)] md:pb-0">
        <HeroCards cards={content.cards} />
      </div>
    </section>
  );
}
