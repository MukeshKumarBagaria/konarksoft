"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useRef, useState } from "react";

import { matchesPath, useIsActive } from "@/components/navigation/nav-link";
import { ChevronDownIcon } from "@/components/ui/icons";
import { useDismiss } from "@/hooks/use-dismiss";
import { cn } from "@/lib/utils/cn";
import type { NavLink } from "@/types/navigation";

function MenuItem({ label, href, description }: NavLink) {
  const isActive = useIsActive(href);

  return (
    <li>
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors duration-200",
          isActive ? "bg-black/[0.045]" : "hover:bg-black/[0.035]",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-200",
            isActive ? "bg-brand" : "bg-ink/15",
          )}
        />
        <span className="min-w-0">
          <span className="block text-[15px] leading-tight font-semibold text-ink">
            {label}
          </span>
          {/* Wraps rather than truncates: the description ends in a price,
              which is the whole reason the menu was opened, and an ellipsis
              lands squarely on it. */}
          {description ? (
            <span className="mt-0.5 block text-[13px] leading-snug text-muted">
              {description}
            </span>
          ) : null}
        </span>
      </Link>
    </li>
  );
}

/**
 * Disclosure navigation menu (WAI-ARIA pattern): a button toggling a plain list
 * of links. Closed content stays mounted but `inert`, so it animates both ways
 * while staying out of the focus order and the accessibility tree.
 */
export function NavMenu({
  label,
  items,
}: {
  label: string;
  items: readonly NavLink[];
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // One `usePathname()` for the whole menu: the trigger has to read as active
  // while you are on any page inside it, or the header goes blank on the very
  // pages the menu exists to reach.
  const pathname = usePathname();
  const hasActiveItem = items.some((item) => matchesPath(pathname, item.href));

  useDismiss({
    open,
    onDismiss: () => setOpen(false),
    refs: [triggerRef, panelRef],
  });

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key !== "ArrowDown") return;
          event.preventDefault();
          setOpen(true);
          // Wait for the panel to become focusable before moving into it.
          requestAnimationFrame(() =>
            panelRef.current?.querySelector("a")?.focus(),
          );
        }}
        className={cn(
          "flex items-center gap-1 rounded-full py-1 text-[15px] font-medium transition-colors duration-200",
          open || hasActiveItem ? "text-ink" : "text-ink/70 hover:text-ink",
        )}
      >
        {label}
        <ChevronDownIcon
          className={cn(
            "h-4 w-4 transition-transform duration-300 ease-out-expo",
            open && "rotate-180",
          )}
        />
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
          "absolute top-[calc(100%+1.15rem)] left-1/2 w-80 -translate-x-1/2 origin-top",
          // Opaque by design: the frosted pill is a backdrop root, so a
          // `backdrop-filter` on anything nested inside it would be inert.
          "rounded-3xl bg-white p-2 ring-1 shadow-float ring-hairline",
          "transition-[opacity,translate,scale] duration-350 ease-out-expo",
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-[0.97] opacity-0",
        )}
      >
        <ul className="flex flex-col">
          {items.map((item) => (
            <MenuItem key={item.href} {...item} />
          ))}
        </ul>
      </div>
    </div>
  );
}
