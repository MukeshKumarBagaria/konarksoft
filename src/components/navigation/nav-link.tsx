"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils/cn";
import type { NavLink as NavLinkType } from "@/types/navigation";

export function useIsActive(href: string): boolean {
  const pathname = usePathname();
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function NavLink({ label, href }: NavLinkType) {
  const isActive = useIsActive(href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "rounded-full px-1 py-1 text-[15px] font-medium transition-colors duration-200",
        isActive ? "text-ink" : "text-ink/70 hover:text-ink",
      )}
    >
      {label}
    </Link>
  );
}
