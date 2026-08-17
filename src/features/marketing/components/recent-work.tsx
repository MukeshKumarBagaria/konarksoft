"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { useHorizontalSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import { ChevronRightIcon } from "@/components/ui/icons";
import type { RecentWorkContent, WorkTone } from "@/types/content";

/** Wash behind the card, then the two stops of its media panel. */
const toneColors: Record<WorkTone, { wash: string; from: string; to: string }> =
  {
    lime: { wash: "#e9f8cb", from: "#d3f294", to: "#7ec53c" },
    violet: { wash: "#eae6fd", from: "#b9a8f7", to: "#5b46c9" },
    amber: { wash: "#fdeedd", from: "#fbc98a", to: "#e8762a" },
    sky: { wash: "#e2f1fb", from: "#a6d8f5", to: "#3d8fd1" },
  };

function RailButton({
  label,
  onClick,
  disabled,
  flip,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  flip?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-strong text-white transition-[opacity,scale] duration-300 ease-out-soft hover:scale-105 disabled:pointer-events-none disabled:opacity-30"
    >
      <ChevronRightIcon className={flip ? "h-4 w-4 rotate-180" : "h-4 w-4"} />
    </button>
  );
}

/**
 * A horizontal rail of recent projects. The rail is a plain scroll container —
 * drag, wheel and keyboard all work on their own — and `useHorizontalSmoothScroll`
 * layers Lenis over it so the arrows glide instead of jumping.
 */
export function RecentWork({ content }: { content: RecentWorkContent }) {
  const railRef = useRef<HTMLDivElement>(null);
  const scrollRail = useHorizontalSmoothScroll(railRef);

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Arrows dim at the ends. Driven by the rail's own scroll event, so it stays
  // correct however the rail was moved — arrows, wheel, drag or keyboard.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const sync = () => {
      const remaining = rail.scrollWidth - rail.clientWidth - rail.scrollLeft;
      setAtStart(rail.scrollLeft <= 1);
      setAtEnd(remaining <= 1);
    };

    sync();
    rail.addEventListener("scroll", sync, { passive: true });

    const observer = new ResizeObserver(sync);
    observer.observe(rail);

    return () => {
      rail.removeEventListener("scroll", sync);
      observer.disconnect();
    };
  }, []);

  // One card plus one gap, measured off the rendered cards rather than repeated
  // from the class list, so the step follows the responsive width.
  const step = useCallback(() => {
    const cards = railRef.current?.firstElementChild?.children;
    const [first, second] = [cards?.[0], cards?.[1]] as (HTMLElement | undefined)[];
    if (!first) return 0;
    return second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
  }, []);

  return (
    <section aria-labelledby="work-heading" className="py-24 sm:py-28">
      <div className="mx-auto flex max-w-6xl items-end justify-between gap-8 px-5">
        <h2
          id="work-heading"
          className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-bold tracking-[-0.03em] text-ink text-balance"
        >
          {content.heading.lead}
          <span className="block font-display text-[1.06em] font-normal italic text-brand">
            {content.heading.accent}
          </span>
        </h2>

        <div className="flex shrink-0 gap-3">
          <RailButton
            label="Previous projects"
            onClick={() => scrollRail(-step())}
            disabled={atStart}
            flip
          />
          <RailButton
            label="Next projects"
            onClick={() => scrollRail(step())}
            disabled={atEnd}
          />
        </div>
      </div>

      {/* The gutter matches the heading's container, so the first card lines up
          with it while the rail itself still bleeds to both edges. */}
      <div
        ref={railRef}
        tabIndex={0}
        aria-label={`${content.heading.lead} ${content.heading.accent}`}
        className="work-rail mt-12 overflow-x-auto pe-5 ps-[max(1.25rem,calc((100%-72rem)/2+1.25rem))]"
      >
        <ul className="flex w-max gap-5">
          {content.items.map((item) => {
            const tone = toneColors[item.tone];

            return (
              <li
                key={item.title}
                style={
                  {
                    "--tone-wash": tone.wash,
                    "--tone-from": tone.from,
                    "--tone-to": tone.to,
                  } as CSSProperties
                }
                className="w-[85vw] shrink-0 sm:w-[68vw] lg:w-[46rem]"
              >
                <article className="work-card rounded-[1.75rem] p-4 ring-1 ring-hairline sm:p-5">
                  <div className="px-2 pt-2">
                    <h3 className="text-2xl leading-tight font-bold tracking-[-0.02em] text-ink sm:text-[1.75rem]">
                      {item.title}
                    </h3>

                    <ul className="mt-3.5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full bg-white/85 px-3.5 py-1.5 text-[13px] font-medium text-ink/75 ring-1 ring-hairline"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    aria-hidden="true"
                    className="work-media mt-5 aspect-[16/10] rounded-[1.25rem]"
                  />
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
