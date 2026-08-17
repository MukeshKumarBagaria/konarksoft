"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { useIsActive } from "@/components/navigation/nav-link";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import { buttonStyles } from "@/components/ui/button";
import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/ui/icons";
import { primaryCta, sitePages } from "@/config/navigation";
import { useDismiss } from "@/hooks/use-dismiss";
import { cn } from "@/lib/utils/cn";
import type { NavLink } from "@/types/navigation";

function MobileNavItem({ label, href, description }: NavLink) {
  const isActive = useIsActive(href);

  return (
    <li>
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex items-baseline justify-between gap-4 rounded-2xl px-4 py-3 transition-colors duration-200",
          isActive ? "bg-black/[0.045]" : "hover:bg-black/[0.03]",
        )}
      >
        <span className="text-lg font-semibold tracking-[-0.01em] text-ink">
          {label}
        </span>
        {description ? (
          <span className="truncate text-[13px] text-muted">{description}</span>
        ) : null}
      </Link>
    </li>
  );
}

/**
 * Compact navigation for narrow viewports: a disclosure button plus a frosted
 * panel that drops out of the header pill.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const smoothScroll = useSmoothScroll();

  useDismiss({
    open,
    onDismiss: () => setOpen(false),
    refs: [triggerRef, panelRef],
  });

  // Lock the page behind the panel. The attribute covers native scrolling,
  // `pause()` covers the smooth-scroll layer when it is running.
  useEffect(() => {
    if (!open) return;

    document.documentElement.setAttribute("data-scroll-locked", "");
    smoothScroll?.pause();

    return () => {
      document.documentElement.removeAttribute("data-scroll-locked");
      smoothScroll?.resume();
    };
  }, [open, smoothScroll]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="-mr-1 grid h-11 w-11 place-items-center rounded-full text-ink transition-colors duration-200 hover:bg-black/5"
      >
        <span className="relative block h-6 w-6">
          <MenuIcon
            className={cn(
              "absolute inset-0 h-6 w-6 transition-[opacity,rotate] duration-300 ease-out-expo",
              open ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
            )}
          />
          <CloseIcon
            className={cn(
              "absolute inset-0 h-6 w-6 transition-[opacity,rotate] duration-300 ease-out-expo",
              open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
            )}
          />
        </span>
      </button>

      <div
        ref={panelRef}
        id={panelId}
        inert={!open}
        // Navigating from inside the panel should also dismiss it.
        onClick={(event) => {
          if (event.target instanceof Element && event.target.closest("a")) {
            setOpen(false);
          }
        }}
        className={cn(
          "absolute inset-x-0 top-[calc(100%+0.75rem)] origin-top",
          // Opaque by design: the frosted pill is a backdrop root, so a
          // `backdrop-filter` on anything nested inside it would be inert.
          "rounded-[2rem] bg-white p-3 ring-1 shadow-float ring-hairline",
          "transition-[opacity,translate,scale] duration-400 ease-out-expo",
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-3 scale-[0.98] opacity-0",
        )}
      >
        {/* No nested <nav>: this list already lives inside the main navigation. */}
        <ul className="flex flex-col">
          {sitePages.map((page) => (
            <MobileNavItem key={page.href} {...page} />
          ))}
        </ul>

        <Link
          href={primaryCta.href}
          className={buttonStyles({ size: "lg", className: "mt-3 w-full" })}
        >
          <PhoneIcon className="h-4 w-4" />
          {primaryCta.label}
        </Link>
      </div>
    </div>
  );
}
