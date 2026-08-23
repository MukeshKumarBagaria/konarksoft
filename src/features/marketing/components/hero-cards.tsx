import Image from "next/image";
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
              {/* Decorative: the title and kicker below already name the
                  service, so the illustration adds nothing for a screen reader.
                  Fixed height with `w-auto` and `object-contain` because the
                  four sources are not one aspect ratio — sizing by width would
                  leave them visibly unequal on the row. Not `priority`: the
                  deck sits below the fold on every viewport that matters, and
                  four eager images there would cost the hero's LCP.

                  The height steps *down* at `md` because the card is at its
                  narrowest there: the fan holds four cards at 10.5rem, so once
                  padding is taken off there are about 128px of usable width,
                  and three of the four sources are 3:2 — at any more than `h-20`
                  they would run past the card edge long before they ran out of
                  vertical room. `max-w-full` is the backstop for the widths in
                  between. */}
              <Image
                src={card.icon.src}
                alt=""
                width={card.icon.width}
                height={card.icon.height}
                sizes="(min-width: 96rem) 170px, 150px"
                className="mt-1 h-24 w-auto max-w-full object-contain object-left md:mt-4 md:h-20 xl:h-24 2xl:h-28"
              />

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
