"use client";

import Link from "next/link";

import { BrandLogo } from "@/components/navigation/brand-logo";
import { DesktopNav } from "@/components/navigation/desktop-nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { buttonStyles } from "@/components/ui/button";
import { PhoneIcon } from "@/components/ui/icons";
import { mainNav, primaryCta } from "@/config/navigation";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils/cn";

/**
 * Floating navigation pill.
 *
 * The header is a Client Component because the frost is driven by scroll
 * position; `data-scrolled` is set here and every visual layer (tint, blur,
 * saturation, elevation, offset, scale) reacts to it in CSS — see `.nav-shell`
 * in `globals.css`.
 */
export function SiteHeader() {
  const scrolled = useScrolled(12);

  return (
    <header
      data-scrolled={scrolled}
      className="pointer-events-none fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "mx-auto w-full max-w-[52rem] px-4 sm:px-6",
          "transition-[padding] duration-600 ease-out-expo",
          scrolled ? "pt-2 sm:pt-3" : "pt-4 sm:pt-6",
        )}
      >
        <nav
          aria-label="Main"
          className={cn(
            "nav-shell animate-nav-drop pointer-events-auto relative flex items-center justify-between rounded-full",
            "py-2.5 pr-2.5 pl-4 sm:pl-5",
            "transition-[scale] duration-600 ease-out-expo",
            scrolled ? "scale-[0.985]" : "scale-100",
          )}
        >
          <BrandLogo />

          <DesktopNav items={mainNav} />

          <div className="flex items-center gap-1">
            {/* Wrapper owns the responsive display so it cannot collide with
                the `inline-flex` in the button's own base styles. */}
            <div className="hidden sm:block">
              <Link href={primaryCta.href} className={buttonStyles()}>
                <PhoneIcon className="h-4 w-4" />
                {primaryCta.label}
              </Link>
            </div>

            <MobileNav />
          </div>
        </nav>
      </div>
    </header>
  );
}
