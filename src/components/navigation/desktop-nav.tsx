"use client";

import { NavLink } from "@/components/navigation/nav-link";
import { NavMenu } from "@/components/navigation/nav-menu";
import type { NavItem } from "@/types/navigation";

/**
 * Primary links for viewports wide enough to show them.
 * The interpuncts between items are decorative, so they are drawn with a
 * pseudo-element rather than added to the DOM.
 */
export function DesktopNav({ items }: { items: readonly NavItem[] }) {
  return (
    <ul className="hidden items-center lg:flex">
      {items.map((item) => (
        <li
          key={item.kind === "menu" ? item.label : item.href}
          className="flex items-center before:mx-3 before:text-[13px] before:text-ink/25 before:content-['•'] first:before:hidden"
        >
          {item.kind === "menu" ? (
            <NavMenu label={item.label} items={item.items} />
          ) : (
            <NavLink label={item.label} href={item.href} />
          )}
        </li>
      ))}
    </ul>
  );
}
