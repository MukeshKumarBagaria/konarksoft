import type { Route } from "next";

export type NavLink = {
  label: string;
  href: Route;
  /** Short supporting copy, shown in the "All Pages" dropdown. */
  description?: string;
};

/**
 * A top-level navigation entry is either a direct link or a disclosure menu.
 * The discriminated union keeps rendering exhaustive and type-safe.
 */
export type NavItem =
  | ({ kind: "link" } & NavLink)
  | { kind: "menu"; label: string; items: readonly NavLink[] };
