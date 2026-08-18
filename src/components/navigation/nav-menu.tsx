"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

import { matchesPath, useIsActive } from "@/components/navigation/nav-link";
import { ChevronDownIcon } from "@/components/ui/icons";
import { useDismiss } from "@/hooks/use-dismiss";
import { cn } from "@/lib/utils/cn";
import type { NavLink } from "@/types/navigation";

/** Gap between the header pill and the panel below it. */
const PANEL_OFFSET = 14;

/** Never fires: the value it reports differs between server and client only. */
const noopSubscribe = () => () => {};

function MenuItem({ label, href, description }: NavLink) {
  const isActive = useIsActive(href);

  return (
    <li>
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "block rounded-2xl px-3.5 py-2.5 transition-colors duration-200",
          isActive ? "bg-ink/[0.08]" : "hover:bg-ink/[0.05]",
        )}
      >
        {/* The filled row is the whole active cue, now that the bullet is gone.
            Brand orange on the label was the obvious alternative and measured
            4.46:1 against the glass — under the 4.5 line before any colour has
            even bled through it. */}
        <span className="block text-[15px] leading-tight font-semibold text-ink">
          {label}
        </span>
        {description ? (
          // `ink/70` rather than `muted`: muted is tuned for white and drops
          // under 4.5:1 as soon as a tinted backdrop shows through the glass.
          <span className="mt-0.5 block text-[13px] leading-snug text-ink/70">
            {description}
          </span>
        ) : null}
      </Link>
    </li>
  );
}

/**
 * Disclosure navigation menu (WAI-ARIA pattern): a button toggling a plain list
 * of links. Closed content stays mounted but `inert`, so it animates both ways
 * while staying out of the focus order and the accessibility tree.
 *
 * The panel is rendered into `<body>` rather than beside its trigger, and that
 * is load-bearing rather than tidiness. The header pill sets `backdrop-filter`,
 * which makes it a *backdrop root*: a blur on any descendant samples only what
 * is painted inside the pill, so a nested panel could never frost the page —
 * which is why this used to be opaque. Portalled out, it blurs what it actually
 * overlaps. The cost is positioning by hand, below.
 */
export function NavMenu({
  label,
  items,
}: {
  label: string;
  items: readonly NavLink[];
}) {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<{ left: number; top: number } | null>(
    null,
  );
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

  // `createPortal` needs a document, so the panel joins on the client only.
  // Nothing is lost: the trigger is a button, so the menu could never open
  // without JavaScript anyway. Read through `useSyncExternalStore` rather than
  // an effect that sets state — it gives the same false-then-true without the
  // extra render pass, and without risking a hydration mismatch.
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const place = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    setAnchor({
      left: rect.left + rect.width / 2,
      top: rect.bottom + PANEL_OFFSET,
    });
  }, []);

  // The header pill re-pads and re-scales as the page scrolls, so the trigger
  // moves a few pixels under an open panel; both listeners keep the two joined.
  useEffect(() => {
    if (!open) return;

    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, { passive: true });

    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place);
    };
  }, [open, place]);

  const panel = (
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
      style={anchor ? { left: anchor.left, top: anchor.top } : undefined}
      className={cn(
        "nav-glass fixed z-50 w-80 -translate-x-1/2 origin-top rounded-3xl p-2",
        "transition-[opacity,translate,scale] duration-350 ease-out-expo",
        open
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none -translate-y-2 scale-[0.97] opacity-0",
        // Until it has been measured once it would render over the top-left
        // corner, so it stays out of the way entirely.
        anchor ? null : "hidden",
      )}
    >
      <ul className="flex flex-col">
        {items.map((item) => (
          <MenuItem key={item.href} {...item} />
        ))}
      </ul>
    </div>
  );

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

      {mounted ? createPortal(panel, document.body) : null}
    </div>
  );
}
