import type { CSSProperties } from "react";

import { aboutToneColors } from "@/features/marketing/about-tones";
import type { AboutContent } from "@/types/content";

type PrinciplesContent = AboutContent["principles"];

/**
 * The four commitments, as cards. Each opens with a tinted tile carrying its
 * number — a slot sized for the illustration that will replace it, so the row's
 * rhythm is already the rhythm it will have with artwork in place.
 */
export function AboutPrinciples({ content }: { content: PrinciplesContent }) {
  return (
    <section
      aria-labelledby="principles-heading"
      className="mx-auto max-w-7xl px-5 py-24 sm:py-28"
    >
      <div className="max-w-2xl">
        <h2
          id="principles-heading"
          data-reveal
          className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-bold tracking-[-0.03em] text-ink text-balance"
        >
          {content.heading.lead}
          <span className="block font-display text-[1.06em] font-normal italic text-brand">
            {content.heading.accent}
          </span>
        </h2>

        <p data-reveal className="mt-6 max-w-xl text-lg text-muted text-pretty">
          {content.description}
        </p>
      </div>

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {content.items.map((item) => {
          const tone = aboutToneColors[item.tone];

          return (
            <li key={item.index} data-reveal className="h-full">
              <article className="flex h-full flex-col rounded-[1.75rem] bg-white p-4 ring-1 ring-hairline shadow-[0_18px_40px_-32px_rgba(18,18,32,0.55)] sm:p-5">
                <div
                  style={
                    {
                      "--tone-from": tone.from,
                      "--tone-to": tone.to,
                    } as CSSProperties
                  }
                  // Wide on a phone, where the card runs full-bleed and a 5:4
                  // tile would push the copy below the fold on its own.
                  className="about-tile relative aspect-[16/9] rounded-[1.25rem] sm:aspect-[5/4]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-4 right-5 font-display text-2xl italic text-white/75"
                  >
                    {item.index}
                  </span>
                </div>

                <div className="px-1.5 pt-6 pb-2">
                  <h3 className="text-xl leading-tight font-bold tracking-[-0.02em] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted text-pretty">
                    {item.description}
                  </p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
