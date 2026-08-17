"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";

type SmoothScrollApi = {
  /** Freezes scrolling (used as the scroll lock behind the mobile menu). */
  pause: () => void;
  resume: () => void;
};

type HorizontalScrollApi = {
  /** Glides the container by `delta` px. Repeated calls queue up. */
  scrollBy: (delta: number) => void;
  /** Moves the container with no animation — for repositioning, not travel. */
  jumpTo: (position: number) => void;
};

const SmoothScrollContext = createContext<SmoothScrollApi | null>(null);

/**
 * Isolates Lenis behind a small API so the rest of the app never imports the
 * vendor directly. When the user prefers reduced motion, Lenis is never
 * created and the browser's native scrolling is left untouched.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      // Touch devices already have excellent native inertia.
      syncTouch: false,
    });
    lenisRef.current = lenis;

    let frame = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const api = useMemo<SmoothScrollApi>(
    () => ({
      pause: () => lenisRef.current?.stop(),
      resume: () => lenisRef.current?.start(),
    }),
    [],
  );

  return (
    <SmoothScrollContext.Provider value={api}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

/** Returns `null` when smooth scrolling is disabled (reduced motion, no provider). */
export function useSmoothScroll(): SmoothScrollApi | null {
  return useContext(SmoothScrollContext);
}

/**
 * Gives a horizontal scroll container its own Lenis, and returns a smooth
 * relative scroll for driving it from controls. Lives here so Lenis stays
 * imported in exactly one module.
 *
 * The container must be scrollable on its own (`overflow-x`) and hold a single
 * child, so the rail keeps working as a plain scroller before this mounts and
 * wherever JS never runs.
 *
 * Only horizontal intent is captured, so a vertical wheel over the rail still
 * scrolls the page. Reduced motion needs no branch here: Lenis honours the
 * preference itself by tracking the input 1:1 and jumping programmatic scrolls
 * straight to their target.
 */
export function useHorizontalSmoothScroll(
  ref: RefObject<HTMLElement | null>,
): HorizontalScrollApi {
  const lenisRef = useRef<Lenis | null>(null);
  /** Where the in-flight scroll is headed, so clicks can queue against it. */
  const pendingRef = useRef<number | null>(null);

  useEffect(() => {
    const wrapper = ref.current;
    const content = wrapper?.firstElementChild;
    if (!wrapper || !content) return;

    const lenis = new Lenis({
      wrapper,
      // Only watched for resizes — an element wrapper measures its own scroll
      // extent — so this is the track, which is what changes when cards do.
      content,
      orientation: "horizontal",
      gestureOrientation: "horizontal",
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      // Touch devices already have excellent native inertia.
      syncTouch: false,
      // Nested instance, so it drives its own frame loop rather than borrowing
      // the page-level one above.
      autoRaf: true,
    });
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [ref]);

  const scrollBy = useCallback(
    (delta: number) => {
      const wrapper = ref.current;
      if (!wrapper) return;

      const lenis = lenisRef.current;
      if (!lenis) {
        wrapper.scrollBy({ left: delta, behavior: "smooth" });
        return;
      }

      // During a programmatic scroll Lenis reports the live position, not the
      // destination — `targetScroll` is rewritten every frame — so a second
      // click would measure a moving value and lose a step. Chain against the
      // pending destination while one is in flight, and fall back to the real
      // position once it lands or the user takes over with a gesture.
      const inFlight = lenis.isScrolling === "smooth" && pendingRef.current !== null;
      const base = inFlight ? (pendingRef.current as number) : wrapper.scrollLeft;
      const limit = wrapper.scrollWidth - wrapper.clientWidth;

      // Clamped here as well as by Lenis, so overshooting the end cannot bank
      // up a phantom target that later takes extra clicks to unwind.
      const target = Math.min(Math.max(base + delta, 0), limit);

      pendingRef.current = target;
      lenis.scrollTo(target);
    },
    [ref],
  );

  const jumpTo = useCallback(
    (position: number) => {
      const wrapper = ref.current;
      if (!wrapper) return;

      // Any queued destination refers to the position we are leaving.
      pendingRef.current = null;

      const lenis = lenisRef.current;
      // Must go through Lenis rather than assigning `scrollLeft`: Lenis rewrites
      // the container from its own value every frame and would undo it.
      if (lenis) lenis.scrollTo(position, { immediate: true, force: true });
      else wrapper.scrollLeft = position;
    },
    [ref],
  );

  return useMemo(() => ({ scrollBy, jumpTo }), [scrollBy, jumpTo]);
}
