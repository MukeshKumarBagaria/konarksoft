"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { BrandMark } from "@/components/navigation/brand-logo";
import { siteConfig } from "@/config/site";

/**
 * How far the wordmark starts tucked up behind the CTA card, in px, and so how
 * much scrolling the reveal takes. Comfortably taller than the wordmark at every
 * breakpoint, so it always begins fully covered.
 */
const REVEAL_TRAVEL = 240;

/**
 * The oversized wordmark the CTA card uncovers as the page bottoms out.
 *
 * The wordmark itself never moves on screen: across the last `REVEAL_TRAVEL`
 * pixels of the document its transform cancels the scroll exactly 1:1, so it
 * holds the very spot it will occupy at rest while the card rides up and off
 * it. The card is opaque and painted above, so the card's own bottom edge is
 * what does the masking.
 *
 * When the document scrolls less than `REVEAL_TRAVEL`, the tuck shrinks to
 * match; the cancellation stays 1:1 and the wordmark still ends at rest.
 */
export function BrandReveal() {
  const windowRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clip = windowRef.current;
    const mark = markRef.current;
    if (!clip || !mark) return;

    gsap.registerPlugin(ScrollTrigger);

    // Reduced-motion users get the wordmark at rest, fully visible — which is
    // also what renders without JS, since the resting state is the CSS default.
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        mark,
        {
          // Never tuck further than the page can scroll back. On a viewport tall
          // enough to fit the whole page there is no scroll to spend, so the
          // wordmark starts — and stays — at rest instead of hiding behind the
          // card forever. Re-evaluated on refresh via `invalidateOnRefresh`.
          y: () => -Math.min(REVEAL_TRAVEL, ScrollTrigger.maxScroll(window)),
        },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: clip,
            // Pinned to the document's last stretch rather than to the element's
            // own entrance: the travel and the scroll range are the same number,
            // which is what makes the cancellation exact.
            start: () =>
              Math.max(ScrollTrigger.maxScroll(window) - REVEAL_TRAVEL, 0),
            end: () => ScrollTrigger.maxScroll(window),
            // Exact, never smoothed. Any scrub easing lets the wordmark lag the
            // scroll, and that lag reads as the wordmark drifting on its own.
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    });

    return () => media.revert();
  }, []);

  return (
    // The negative margin lifts the box up behind the card and the padding gives
    // the wordmark that much room to start in, so the two cancel and the resting
    // layout below is untouched.
    <div
      ref={windowRef}
      style={{ marginTop: -REVEAL_TRAVEL, paddingTop: REVEAL_TRAVEL }}
      className="relative z-0 overflow-hidden"
    >
      <div
        ref={markRef}
        aria-hidden="true"
        className="flex items-center justify-center gap-[0.22em] pt-10 pb-12 text-[clamp(2.5rem,7.5vw,6rem)] select-none md:pt-14 md:pb-16"
      >
        {/* Sized in `em` so the mark tracks the wordmark at every breakpoint. */}
        <BrandMark className="h-[1.05em] w-[1.05em] shrink-0 text-brand" />
        <span className="leading-none font-extrabold tracking-[-0.04em] text-ink">
          {siteConfig.name}
        </span>
      </div>
    </div>
  );
}
