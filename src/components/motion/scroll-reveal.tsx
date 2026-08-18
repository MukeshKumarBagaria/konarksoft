"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Fades its `[data-reveal]` descendants up as they enter the viewport.
 *
 * `[data-reveal]` starts at `opacity: 0` in CSS so there is no hydration flash;
 * reduced-motion users and anyone without JS get the `globals.css` fallback,
 * which renders everything visible.
 *
 * The wrapper is `display: contents`, so it adds a query scope without adding a
 * box — sections inside keep whatever layout they had.
 */
export function ScrollReveal({ children }: { children: ReactNode }) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]", scope);
      if (!targets.length) return;

      // Anything already above the viewport — a restored scroll position, a
      // deep link — is past its trigger point and would never get an onEnter,
      // so it is shown outright rather than animated in from nowhere.
      const pending = targets.filter((el) => {
        if (el.getBoundingClientRect().bottom >= 0) return true;
        gsap.set(el, { opacity: 1 });
        return false;
      });
      if (!pending.length) return;

      ScrollTrigger.batch(pending, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 26 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.08,
              overwrite: true,
            },
          ),
      });
    });

    return () => media.revert();
  }, []);

  return (
    <div ref={scopeRef} className="contents">
      {children}
    </div>
  );
}
