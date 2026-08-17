import type { ReactNode } from "react";

import { SiteHeader } from "@/components/navigation/site-header";
import { LandingFooter } from "@/features/landing/components/landing-footer";

/**
 * Shell for the ad landing pages. It wears the site's own floating header, so
 * a visitor arriving from an ad lands somewhere that looks like the company
 * they are about to pay — the header is fixed, which is why the hero opens with
 * enough top padding to clear it.
 *
 * The footer stays minimal: a landing page ends in one action, and a column of
 * sitemap links under it is just an exit.
 */
export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-100 focus-visible:not-sr-only focus-visible:rounded-full focus-visible:bg-white focus-visible:px-5 focus-visible:py-2.5 focus-visible:text-sm focus-visible:font-semibold focus-visible:shadow-float"
      >
        Skip to content
      </a>

      <SiteHeader />

      {/* The offer pill floats over the page, so the page reserves the room it
          occupies rather than letting it sit on top of the footer. */}
      <main
        id="main-content"
        className="flex-1 pb-[calc(6rem+env(safe-area-inset-bottom))]"
      >
        {children}
      </main>

      <LandingFooter />
    </>
  );
}
