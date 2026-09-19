"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, type CSSProperties } from "react";

import { useHorizontalSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import { ArrowUpRightIcon, ChevronRightIcon } from "@/components/ui/icons";
import { ProjectArtwork } from "@/features/marketing/components/project-artwork";
import { workToneColors } from "@/features/marketing/work-tones";
import type { RecentWorkContent, WorkItem } from "@/types/content";

/**
 * Copies of the list the rail holds. Three keeps a whole set of slack on either
 * side of the middle one, which is where the rail is parked — enough that the
 * recentre is only ever needed long after the user has stopped moving.
 */
const COPIES = 3;

/**
 * How far into a card the row starts, as a fraction of one card, so there is
 * always something cut off at the left edge rather than a flush start with dead
 * space beside it.
 *
 * Applied as a transform on the track rather than as a scroll position, because
 * the server-rendered HTML paints long before hydration: anything JS sets would
 * flash the flush start first. The transform is constant, so the pixels before
 * and after hydration are identical.
 */
const REST_OFFSET = 0.45;

/**
 * How fast the rail travels on its own, in pixels per second. Slow enough to
 * read a project name as it passes — a rail that outruns reading is a banner,
 * and people look away from banners.
 */
const DRIFT_SPEED = 50;

/**
 * How long the drift stands down after the visitor moves the rail themselves.
 * Long enough to finish an arrow glide and look at what it landed on, short
 * enough that an abandoned rail starts moving again before the page scrolls on.
 */
const HOLD_MS = 2400;

/**
 * Ceiling on the gap between two frames. A backgrounded tab or a long task can
 * hand the next frame a gap of seconds, and an unclamped delta would teleport
 * the rail half a set on the frame the user comes back to.
 */
const MAX_FRAME_MS = 64;

function RailButton({
  label,
  onClick,
  flip,
}: {
  label: string;
  onClick: () => void;
  flip?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-strong text-white transition-[scale] duration-300 ease-out-soft hover:scale-105"
    >
      <ChevronRightIcon className={flip ? "h-4 w-4 rotate-180" : "h-4 w-4"} />
    </button>
  );
}

/**
 * One project in the rail.
 *
 * `interactive` is false on the duplicated copies: the rail renders the list
 * three times to make the loop seamless, and a link repeated three times would
 * put the same destination into the tab order three times over.
 */
function WorkCard({
  item,
  interactive,
}: {
  item: WorkItem;
  interactive: boolean;
}) {
  const tone = workToneColors[item.tone];

  return (
    <article
      style={
        {
          "--tone-wash": tone.wash,
          "--tone-ink": tone.ink,
        } as CSSProperties
      }
      className="work-card group relative rounded-[1.75rem] p-4 ring-1 ring-hairline transition-[box-shadow,translate] duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-float sm:p-5"
    >
      <div className="flex items-start justify-between gap-4 px-2 pt-2">
        <div className="min-w-0">
          <h3 className="text-2xl leading-tight font-bold tracking-[-0.02em] text-ink sm:text-[1.75rem]">
            {interactive ? (
              <Link
                href={{ pathname: `/work/${item.slug}` }}
                className="after:absolute after:inset-0 after:rounded-[1.75rem] focus-visible:outline-none"
              >
                {item.title}
              </Link>
            ) : (
              item.title
            )}
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

        <span
          aria-hidden="true"
          className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/85 text-ink ring-1 ring-hairline transition-[scale,background] duration-300 ease-out-soft group-hover:scale-105 group-hover:bg-white"
        >
          <ArrowUpRightIcon className="h-4 w-4" />
        </span>
      </div>

      <ProjectArtwork
        tone={item.tone}
        wordmark={item.wordmark}
        slug={item.slug}
        url={item.url}
        displayUrl={item.displayUrl}
        embeddable={item.embeddable}
        className="mt-5 aspect-[16/10] rounded-[1.25rem]"
      />
    </article>
  );
}

/**
 * An endless horizontal rail of recent projects, travelling on its own.
 *
 * The list is rendered `COPIES` times and the rail is kept in the middle copy,
 * so there is no first or last card: scrolling either way always has more rail
 * ahead of it. When the position drifts out of that middle copy it is moved back
 * by exactly one set width — the same pixels are under the viewport before and
 * after, so the jump cannot be seen.
 *
 * The drift is driven frame by frame rather than by a CSS animation, because
 * the rail is a real scroll container: a transform on the track would keep
 * moving underneath a visitor who is dragging it, and the two offsets would
 * fight. Moving the scroll position instead means the drift, the drag, the
 * wheel, the arrows and the keyboard are all the same single value.
 *
 * It stands down whenever the visitor has any claim on the rail — pointer over
 * it, focus inside it, a gesture or an arrow in the last `HOLD_MS`, the tab in
 * the background, the section off screen, or reduced motion asked for — so it
 * never competes with someone who is reading or steering.
 *
 * The rail is still a plain scroll container, so drag, wheel and keyboard work
 * on their own; `useHorizontalSmoothScroll` layers Lenis over it for the arrows.
 */
export function RecentWork({ content }: { content: RecentWorkContent }) {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollBy, jumpTo } = useHorizontalSmoothScroll(railRef);

  /** One card plus one gap, and the width of a single copy of the list. */
  const geometry = useRef({ step: 0, setWidth: 0 });

  /** Everything that can hold the drift, read once per frame. */
  const engaged = useRef(false);
  const onScreen = useRef(true);
  const holdUntil = useRef(0);

  /** Hands the rail to the visitor for a moment. */
  const holdDrift = useCallback(() => {
    holdUntil.current = performance.now() + HOLD_MS;
  }, []);

  const measure = useCallback(() => {
    const cards = railRef.current?.firstElementChild?.children;
    const first = cards?.[0] as HTMLElement | undefined;
    const second = cards?.[1] as HTMLElement | undefined;
    if (!first || !second) return geometry.current;

    // Measured off the rendered cards rather than repeated from the class list,
    // so the step follows the responsive width.
    const step = second.offsetLeft - first.offsetLeft;
    geometry.current = { step, setWidth: step * content.items.length };
    return geometry.current;
  }, [content.items.length]);

  /**
   * Returns the rail to the middle copy, keeping its position within the set so
   * nothing on screen moves — the copies are identical, so landing one set width
   * away puts the same pixels under the viewport. `force` parks it at the start
   * of that copy, which is where the server-rendered HTML already sits.
   */
  const recentre = useCallback(
    (force = false) => {
      const rail = railRef.current;
      const { setWidth } = geometry.current;
      if (!rail || !setWidth) return;

      const withinSet = force
        ? 0
        : ((rail.scrollLeft % setWidth) + setWidth) % setWidth;

      jumpTo(setWidth + withinSet);
    },
    [jumpTo],
  );

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    measure();
    recentre(true);

    // Only pulled back when it nears the edge of the slack, and only once the
    // user has stopped — moving the container mid-gesture would cut momentum
    // short on touch.
    let idle: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(idle);
      idle = setTimeout(() => {
        const { setWidth } = geometry.current;
        if (!setWidth) return;
        const drift = rail.scrollLeft - setWidth;
        if (Math.abs(drift) > setWidth * 0.5) recentre();
      }, 160);
    };

    const onResize = () => {
      measure();
      recentre(true);
    };

    rail.addEventListener("scroll", onScroll, { passive: true });
    const observer = new ResizeObserver(onResize);
    observer.observe(rail);

    return () => {
      clearTimeout(idle);
      rail.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [measure, recentre]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    // Checked here rather than left to the CSS: this motion is scripted, so
    // the global `prefers-reduced-motion` rules never reach it.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // A rail nobody can see still costs a frame's work and a scroll event
    // every 16ms, so it only runs while the section is on screen.
    const watcher = new IntersectionObserver(
      ([entry]) => {
        onScreen.current = entry.isIntersecting;
      },
      { rootMargin: "120px" },
    );
    watcher.observe(rail);

    let frame = 0;
    let previous = performance.now();

    /**
     * The drift's own position, carried at full precision.
     *
     * `scrollLeft` reads back rounded to whole pixels, so advancing it by the
     * fraction of a pixel a frame is worth and reading it again the next frame
     * loses the remainder — the rail then travels at one pixel per frame
     * whatever `DRIFT_SPEED` says, which is both wrong and tied to the display's
     * refresh rate. Accumulating here and writing the total keeps the speed.
     */
    let position = rail.scrollLeft;

    const advance = (now: number) => {
      frame = requestAnimationFrame(advance);

      const elapsed = Math.min(now - previous, MAX_FRAME_MS);
      previous = now;

      if (
        engaged.current ||
        !onScreen.current ||
        now < holdUntil.current ||
        document.visibilityState !== "visible"
      ) {
        return;
      }

      const { setWidth } = geometry.current;
      if (!setWidth) {
        measure();
        return;
      }

      // Recentred before the rail moves, never after: both write the scroll
      // position, and advancing second would start from a value the recentre
      // has already replaced. Skipping this frame's fraction of a pixel costs
      // nothing visible.
      //
      // The test is which copy the rail is in, not how far it has drifted:
      // `recentre` preserves the position within the set, so anywhere inside
      // the middle copy it lands exactly where it started — and a no-op that
      // returns early on every frame would leave the rail standing still.
      if (rail.scrollLeft >= setWidth * 2 || rail.scrollLeft < setWidth) {
        recentre();
        return;
      }

      // Anything else that moved the rail — a drag, an arrow, the recentre —
      // leaves the accumulator stale, and continuing from it would yank the
      // rail back. A pixel of tolerance absorbs the rounding above.
      if (Math.abs(rail.scrollLeft - position) > 1.5)
        position = rail.scrollLeft;

      position += (DRIFT_SPEED * elapsed) / 1000;

      // Through Lenis rather than `scrollLeft`: Lenis rewrites the container
      // from its own value every frame and would undo a direct assignment.
      jumpTo(position);
    };

    frame = requestAnimationFrame(advance);

    return () => {
      cancelAnimationFrame(frame);
      watcher.disconnect();
    };
  }, [jumpTo, measure, recentre]);

  const step = useCallback(
    (direction: 1 | -1) => {
      const { step: cardStep } = measure();
      // Pulled back first, so a glide near the edge of the slack cannot run past
      // the copies while it is still animating.
      const { setWidth } = geometry.current;
      const rail = railRef.current;
      if (
        rail &&
        setWidth &&
        Math.abs(rail.scrollLeft - setWidth) > setWidth * 0.5
      ) {
        recentre();
      }
      // The glide and the drift both write the scroll position; without this
      // the next frame of drift would overwrite the arrow's animation.
      holdDrift();
      scrollBy(cardStep * direction);
    },
    [holdDrift, measure, recentre, scrollBy],
  );

  return (
    <section aria-labelledby="work-heading" className="py-24 sm:py-28">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-8 px-5">
        <h2
          id="work-heading"
          className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-bold tracking-[-0.03em] text-ink text-balance"
        >
          {content.heading.lead}
          <span className="block font-display text-[1.06em] font-normal italic text-brand">
            {content.heading.accent}
          </span>
        </h2>

        <div className="flex shrink-0 items-center gap-3">
          {/* The rail loops, so it has no end to arrive at — this is the only
              way out of it and into the full portfolio. */}
          <Link
            href="/work"
            className="mr-1 hidden items-center gap-1.5 text-[15px] font-semibold text-ink/70 transition-colors hover:text-ink sm:inline-flex"
          >
            View all work
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>

          <RailButton label="Previous projects" onClick={() => step(-1)} flip />
          <RailButton label="Next projects" onClick={() => step(1)} />
        </div>
      </div>

      {/* No gutter: the row bleeds to both edges so a card is always cut off at
          the start, matching how it looks part-way through the loop. */}
      {/* `onFocus`/`onBlur` are React's bubbling focusin/focusout, so tabbing
          to a card's link inside the rail holds it too. */}
      <div
        ref={railRef}
        tabIndex={0}
        aria-label={`${content.heading.lead} ${content.heading.accent}`}
        onMouseEnter={() => {
          engaged.current = true;
        }}
        onMouseLeave={() => {
          engaged.current = false;
        }}
        onFocus={() => {
          engaged.current = true;
        }}
        onBlur={() => {
          engaged.current = false;
        }}
        onPointerDown={holdDrift}
        onWheel={holdDrift}
        onKeyDown={holdDrift}
        className="work-rail mt-12 overflow-x-auto"
      >
        {/* Card width and gap live in one place so the resting offset can be
            derived from them without repeating either number. */}
        <ul
          style={{
            translate: `calc(-${REST_OFFSET} * (var(--work-card) + var(--work-gap))) 0`,
          }}
          className="flex w-max gap-[var(--work-gap)] [--work-card:85vw] [--work-gap:1.25rem] sm:[--work-card:68vw] lg:[--work-card:46rem]"
        >
          {Array.from({ length: COPIES }).flatMap((_, copy) =>
            content.items.map((item) => (
              <li
                key={`${copy}-${item.title}`}
                // Only the first copy is real as far as assistive tech is
                // concerned; the rest exist to make the loop seamless.
                aria-hidden={copy > 0 || undefined}
                className="w-[var(--work-card)] shrink-0"
              >
                <WorkCard item={item} interactive={copy === 0} />
              </li>
            )),
          )}
        </ul>
      </div>

      {/* The header's link is desktop-only — the arrows and the heading already
          fill that row on a phone — so the mobile way out sits under the rail. */}
      <div className="mt-10 px-5 sm:hidden">
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink"
        >
          View all work
          <ArrowUpRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
