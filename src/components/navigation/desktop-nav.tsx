"use client";

import { NavLink } from "@/components/navigation/nav-link";
import { NavMenu } from "@/components/navigation/nav-menu";
import type { NavItem } from "@/types/navigation";

/**
 * Primary links for viewports wide enough to show them. Spacing is a plain
 * flex gap: the separators the items used to be strung on were decorative, and
 * with four entries left there is nothing to disambiguate.
 */
export function DesktopNav({ items }: { items: readonly NavItem[] }) {
  return (
    <ul className="hidden items-center gap-7 lg:flex">
      {items.map((item) => (
        <li
          key={item.kind === "menu" ? item.label : item.href}
          className="flex items-center"
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
