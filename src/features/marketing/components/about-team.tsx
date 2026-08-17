import type { CSSProperties } from "react";

import { aboutToneColors } from "@/features/marketing/about-tones";
import type { AboutContent } from "@/types/content";

type TeamContent = AboutContent["team"];

/**
 * The bench, one portrait per discipline. Each frame is a tinted tile in the
 * portrait ratio the photographs will be cropped to, with the caption on a
 * white pill so it holds its contrast wherever the wash lands behind it.
 */
export function AboutTeam({ content }: { content: TeamContent }) {
  return (
    <section
      aria-labelledby="team-heading"
      className="mx-auto max-w-7xl px-5 py-24 sm:py-28"
    >
      <div className="max-w-2xl">
        <h2
          id="team-heading"
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

      {/* Two up even on the narrowest phone: a portrait crop run full-bleed in
          a single column is taller than the viewport, and four of them turn the
          bench into a scroll of its own. */}
      <ul className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {content.members.map((member) => {
          const tone = aboutToneColors[member.tone];

          return (
            <li key={member.role} data-reveal>
              <figure>
                <div
                  style={
                    {
                      "--tone-from": tone.from,
                      "--tone-to": tone.to,
                    } as CSSProperties
                  }
                  className="about-tile relative aspect-[4/5] overflow-hidden rounded-[1.5rem] ring-1 ring-hairline sm:rounded-[1.75rem]"
                >
                  <p className="absolute inset-x-3 bottom-3 truncate rounded-full bg-white/85 px-3 py-1.5 text-center text-[12px] font-medium text-ink backdrop-blur-sm sm:inset-x-4 sm:bottom-4 sm:px-4 sm:py-2 sm:text-[13px]">
                    {member.caption}
                  </p>
                </div>

                <figcaption className="px-1.5 pt-5">
                  <p className="text-lg leading-tight font-bold tracking-[-0.02em] text-ink">
                    {member.role}
                  </p>
                  <p className="mt-1 font-display text-lg leading-tight italic text-brand">
                    {member.focus}
                  </p>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
