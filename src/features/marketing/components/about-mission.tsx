import type { CSSProperties } from "react";

import type { AboutContent } from "@/types/content";

type MissionContent = AboutContent["mission"];

/**
 * Accent words: display serif, swept iris → rose, matching the CTA banner so
 * the two accent treatments on the site stay one idea. The trailing padding
 * buys back the room the italic eats from whatever word follows it.
 */
const accentStyles =
  "bg-linear-to-r from-iris to-rose bg-clip-text pe-[0.12em] font-display font-normal italic text-transparent";

/**
 * Three rings around a single point — the mission drawn rather than stated.
 * Each is tilted differently so they read as separate paths sharing one centre
 * instead of a target, and each carries a travelling dash (see `.filament`) at
 * its own tempo, so the system never resolves into a repeating pattern.
 */
const orbits = [
  {
    id: "warm",
    rx: 430,
    ry: 152,
    rotate: -24,
    className: "text-brand",
    style: { "--filament-duration": "14s" },
  },
  {
    id: "cool",
    rx: 466,
    ry: 196,
    rotate: 14,
    className: "text-iris",
    style: { "--filament-duration": "18s", "--filament-delay": "-6s" },
  },
  {
    id: "rose",
    rx: 352,
    ry: 214,
    rotate: 64,
    className: "text-rose",
    style: { "--filament-duration": "11s", "--filament-delay": "-3s" },
  },
] as const;

function MissionOrbits() {
  return (
    // Held to a box the whole system fits inside (`meet`, capped width) rather
    // than stretched across the section: three complete rings read as one
    // system, where three arcs cropped by the viewport read as stripes. What
    // they circle is the statement itself, so there is no mark at the centre.
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
    >
      <svg
        focusable="false"
        viewBox="0 0 1000 620"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        className="about-orbits h-full w-full max-w-[78rem]"
      >
        <g transform="translate(500 310)">
          {orbits.map((orbit) => (
            <g key={orbit.id} className={orbit.className}>
              {/* Drawn twice: once faint for the full ring so the path always
                  reads, once as the travelling segment on top. */}
              <ellipse
                rx={orbit.rx}
                ry={orbit.ry}
                transform={`rotate(${orbit.rotate})`}
                stroke="currentColor"
                strokeWidth="1"
                strokeOpacity="0.26"
              />
              <ellipse
                rx={orbit.rx}
                ry={orbit.ry}
                transform={`rotate(${orbit.rotate})`}
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                className="filament"
                style={orbit.style as CSSProperties}
              />
            </g>
          ))}
        </g>
      </svg>

      {/* Painted after the rings, so it covers them — see `.about-orbit-scrim`. */}
      <div className="about-orbit-scrim absolute inset-0" />
    </div>
  );
}

export function AboutMission({ content }: { content: MissionContent }) {
  return (
    <section
      aria-labelledby="mission-heading"
      className="about-field relative isolate overflow-hidden py-24 sm:py-32"
    >
      <MissionOrbits />

      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <p
          data-reveal
          className="text-xs font-semibold tracking-[0.16em] text-brand uppercase"
        >
          {content.eyebrow}
        </p>

        <h2
          id="mission-heading"
          data-reveal
          className="mt-5 text-[clamp(1.75rem,4vw,3.1rem)] leading-[1.16] font-bold tracking-[-0.028em] text-ink text-balance"
        >
          {content.statement.lead}{" "}
          <span className={accentStyles}>{content.statement.accent}</span>{" "}
          {content.statement.trail}
        </h2>

        <p
          data-reveal
          className="mx-auto mt-7 max-w-xl text-lg text-muted text-pretty"
        >
          {content.description}
        </p>
      </div>

      <ul className="relative mx-auto mt-14 grid max-w-5xl gap-4 px-5 sm:mt-16 sm:grid-cols-3">
        {content.pillars.map((pillar) => (
          <li
            key={pillar.title}
            data-reveal
            className="rounded-[1.5rem] bg-white/85 p-6 shadow-[0_18px_40px_-32px_rgba(18,18,32,0.5)] ring-1 ring-hairline backdrop-blur-sm sm:p-7"
          >
            <h3 className="font-display text-2xl leading-none italic text-brand">
              {pillar.title}
            </h3>
            <p className="mt-3.5 text-[15px] leading-relaxed text-muted text-pretty">
              {pillar.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
