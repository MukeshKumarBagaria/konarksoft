import type { CSSProperties } from "react";

import type { HeroCard } from "@/types/content";

/** Rotation of the outermost card, in degrees. Inner cards scale down from it. */
const FAN_SPREAD_DEG = 9.5;

/**
 * The deck below the hero copy: a stacked column on phones, a fanned spread on
 * wider screens. Geometry is derived from each card's position so the fan stays
 * symmetric for any number of cards — see `.hero-card` in `globals.css`.
 *
 * Every card sits on the same baseline; the fan comes from rotation alone, which
 * keeps the titles aligned while the top corners rise across the row.
 */
export function HeroCards({ cards }: { cards: readonly HeroCard[] }) {
  return (
    <ul
      aria-label="What we design"
      className="hero-deck flex w-full flex-col md:flex-row md:justify-center md:gap-[clamp(0.5rem,1.6vw,1.5rem)] [&>li+li]:-mt-2 md:[&>li+li]:mt-0"
    >
      {cards.map((card, index) => {
        // -1 at the left edge of the fan, 0 in the middle, +1 at the right edge.
        const position =
          cards.length > 1 ? (index / (cards.length - 1)) * 2 - 1 : 0;

        return (
          <li
            key={card.index}
            data-reveal
            style={
              {
                "--fan-rotate": `${(position * FAN_SPREAD_DEG).toFixed(2)}deg`,
              } as CSSProperties
            }
            className="h-56 w-full md:h-[clamp(15rem,20vw,18.25rem)] md:w-[clamp(10.5rem,17.2vw,15.75rem)] md:shrink-0"
          >
            {/* Padding tightens between `md` and `xl`, where four cards share
                the row and the longest kicker ("Development") would otherwise
                run past the card edge. */}
            <div className="hero-card relative flex h-full w-full flex-col rounded-[1.75rem] p-6 md:p-5 lg:p-6 xl:p-7">
              <span
                aria-hidden="true"
                className="mt-1 text-[2.25rem] leading-none select-none md:mt-5 md:text-[2.75rem]"
              >
                {card.icon}
              </span>

              <span
                aria-hidden="true"
                className="absolute top-5 right-6 font-display text-xl italic text-ink/25 md:text-2xl"
              >
                {card.index}
              </span>

              <div className="mt-auto">
                <p className="text-2xl leading-tight font-bold tracking-[-0.02em] text-ink md:text-[clamp(1.15rem,1.6vw,1.6rem)]">
                  {card.title}
                </p>
                <p className="font-display text-xl leading-tight tracking-[0.02em] text-brand uppercase italic md:text-[clamp(0.95rem,1.45vw,1.45rem)]">
                  {card.kicker}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
