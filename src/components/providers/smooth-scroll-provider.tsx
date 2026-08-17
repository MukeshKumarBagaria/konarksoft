"use client";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";

type SmoothScrollApi = {
  /** Freezes scrolling (used as the scroll lock behind the mobile menu). */
  pause: () => void;
  resume: () => void;
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
