import { useEffect, useState } from "react";

import { cn } from "@/lib/utils/cn";

/**
 * How long each line holds before the next one fades in. Long enough to read a
 * seven-word claim twice over — a badge that flips faster than that reads as a
 * ticker and gets ignored the way banner ads do.
 */
const HOLD_MS = 3800;

/**
 * The pill above the hero headline, cycling through the studio's proof lines.
 *
 * No `"use client"` here: the file is only ever imported by `hero.tsx`, which
 * already opens the client boundary, so this rides in on that entry point.
 *
 * Every line is rendered into the same grid cell, so the pill is as wide as the
 * longest one and holds that width for the whole cycle. Animating a pill that
 * resizes under a centred headline drags the `<h1>` sideways every few seconds,
 * which is both a layout-shift penalty and the fastest way to make a trust
 * signal look like an ad.
 */
export function HeroBadge({ items }: { items: readonly string[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    // A single line is a static badge; nothing to schedule.
    if (items.length < 2) return;

    const id = window.setInterval(
      () => setActive((current) => (current + 1) % items.length),
      HOLD_MS,
    );

    return () => window.clearInterval(id);
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <p
      data-reveal
      className="inline-flex items-center gap-2.5 rounded-full bg-white/85 px-4 py-2 text-sm font-medium text-ink shadow-pill backdrop-blur-sm"
    >
      <span aria-hidden="true" className="relative flex h-1.5 w-1.5 shrink-0">
        {/* The halo sits behind the dot and only animates for users who have
            not asked for less motion. */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-70 motion-safe:animate-ping" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
      </span>

      <span className="grid justify-items-center">
        {items.map((item, index) => {
          const isActive = index === active;

          return (
            <span
              key={item}
              // Only the visible line is exposed; without this a screen reader
              // would read all three run together as one sentence.
              aria-hidden={!isActive}
              className={cn(
                "col-start-1 row-start-1 whitespace-nowrap",
                "motion-safe:transition-[opacity,translate] motion-safe:duration-500 motion-safe:ease-out-soft",
                isActive
                  ? "opacity-100 motion-safe:translate-y-0"
                  : "opacity-0 motion-safe:-translate-y-1",
              )}
            >
              {item}
            </span>
          );
        })}
      </span>
    </p>
  );
}
