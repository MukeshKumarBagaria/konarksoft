import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { buttonStyles } from "@/components/ui/button";
import { PhoneIcon } from "@/components/ui/icons";
import type { CtaBannerContent } from "@/types/content";

/**
 * The decorative curves. Each is drawn twice: once faint for the full length,
 * once as a travelling dash on top, so the line always reads while a segment
 * keeps filling along it.
 *
 * Geometry lives in the 1200x480 viewBox, stretched rather than cropped (see
 * `preserveAspectRatio` below), so an x here is always the same fraction of the
 * card's width. That is what keeps every curve in the outer thirds and clear of
 * the centred copy at any card size.
 */
const filaments = [
  {
    id: "warm-loop",
    d: "M330 -20C300 90 250 140 230 220C214 286 268 330 318 306C366 283 366 214 312 196C250 176 176 232 170 320C164 410 200 452 250 500",
    className: "text-brand",
    style: { "--filament-duration": "12s" },
  },
  {
    id: "cool-sweep",
    d: "M812 -20C892 116 1006 208 1200 246",
    className: "text-iris",
    style: { "--filament-duration": "15s", "--filament-delay": "-5s" },
  },
  {
    id: "warm-tail",
    d: "M1200 336C1084 352 1004 420 984 500",
    className: "text-brand",
    style: { "--filament-duration": "9s", "--filament-delay": "-3s" },
  },
  {
    id: "cool-ring",
    d: "M1074 300a42 42 0 1 1-0.1 0",
    className: "text-iris",
    style: {
      "--filament-dash": "70px",
      "--filament-gap": "210px",
      "--filament-duration": "7s",
      "--filament-delay": "-2s",
    },
  },
] as const;

/**
 * Accent words: display serif, swept iris → rose to tie the cool half of the
 * card to the warm one. The trailing padding buys back the room the italic eats
 * from whatever word follows it.
 */
const accentStyles =
  "bg-linear-to-r from-iris to-rose bg-clip-text pe-[0.12em] font-display font-normal italic text-transparent";

export function CtaBanner({ content }: { content: CtaBannerContent }) {
  return (
    <section
      aria-labelledby="cta-banner-heading"
      className="mx-auto max-w-7xl px-5 pb-24 sm:pb-28"
    >
      <div className="cta-banner relative isolate overflow-hidden rounded-[2rem] ring-1 ring-hairline">
        {/* Stretched, not cropped: the curves are abstract enough to take the
            distortion, and in exchange every one keeps its share of the card's
            width. Hidden on phones, where the copy fills the card edge to edge
            and there is no outer third to draw in. */}
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 1200 480"
          fill="none"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 -z-10 hidden h-full w-full md:block"
        >
          {filaments.map((filament) => (
            <g key={filament.id} className={filament.className}>
              <path
                d={filament.d}
                stroke="currentColor"
                strokeWidth="1.1"
                strokeOpacity="0.28"
              />
              <path
                d={filament.d}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                className="filament"
                style={filament.style as CSSProperties}
              />
            </g>
          ))}
        </svg>

        {/* Both are anchored past the card's edges so they read as objects
            entering the frame rather than icons parked in the corners; the card
            clips whatever hangs over. Widths are a share of the card, but the
            offsets are re-tuned at `md`: a percentage `bottom` resolves against
            the card's *height*, and on a phone — where the card is nearly square
            — the desktop offset drops the plane clean out of sight. */}
        <Image
          src="/images/decor/star.webp"
          alt=""
          width={512}
          height={512}
          sizes="(min-width: 1280px) 270px, 25vw"
          className="decor-spin pointer-events-none absolute top-[2%] -left-[10%] -z-10 h-auto w-[30%] max-w-[270px] select-none md:-left-[8%] md:w-[23%]"
        />

        <Image
          src="/images/decor/paper-plane.webp"
          alt=""
          width={512}
          height={512}
          sizes="(min-width: 1280px) 390px, 36vw"
          className="decor-drift pointer-events-none absolute -right-[12%] -bottom-[5%] -z-10 h-auto w-[36%] max-w-[390px] select-none md:-right-[8%] md:-bottom-[36%] md:w-[33%]"
        />

        <div className="relative px-6 py-16 text-center sm:px-10 sm:py-20">
          <h2
            id="cta-banner-heading"
            className="text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1.12] font-bold tracking-[-0.03em] text-ink"
          >
            {content.heading.first.lead}{" "}
            <span className={accentStyles}>{content.heading.first.accent}</span>
            <span className="block">
              <span className={accentStyles}>
                {content.heading.second.accent}
              </span>{" "}
              {content.heading.second.trail}
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-sm text-base text-muted text-pretty sm:text-lg">
            {content.description}
          </p>

          <Link
            href={content.cta.href}
            className={buttonStyles({ size: "lg", className: "mt-8" })}
          >
            <PhoneIcon className="h-[18px] w-[18px]" />
            {content.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
