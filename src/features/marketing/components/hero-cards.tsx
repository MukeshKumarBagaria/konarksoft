import type { CSSProperties } from "react";

import type { HeroCard } from "@/types/content";

/** Rotation of the outermost card, in degrees. Inner cards scale down from it. */
const FAN_SPREAD_DEG = 7;
/** How far the outermost cards drop, keeping the top edges on an arc. */
const FAN_LIFT_PX = 22;

/**
 * The deck below the hero copy: a stacked column on phones, a fanned spread on
 * wider screens. Geometry is derived from each card's position so the fan stays
 * symmetric for any number of cards — see `.hero-card` in `globals.css`.
 */
export function HeroCards({ cards }: { cards: readonly HeroCard[] }) {
  return (
    <ul
      aria-label="What we design"
      className="hero-deck flex w-full flex-col md:flex-row md:justify-center [&>li+li]:-mt-2 md:[&>li+li]:-ml-4 md:[&>li+li]:mt-0"
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
                "--fan-lift": `${Math.round(Math.abs(position) * FAN_LIFT_PX)}px`,
              } as CSSProperties
            }
            className="h-56 w-full md:h-[clamp(15rem,19.5vw,17.5rem)] md:w-[clamp(9rem,19vw,17rem)] md:shrink-0"
          >
            <div className="hero-card relative flex h-full w-full flex-col rounded-[1.75rem] bg-white p-6 shadow-card ring-1 ring-hairline md:p-7">
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
                <p className="text-2xl leading-tight font-bold tracking-[-0.02em] text-ink md:text-[1.75rem]">
                  {card.title}
                </p>
                <p className="font-display text-xl leading-tight tracking-[0.02em] text-brand uppercase italic md:text-2xl">
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
