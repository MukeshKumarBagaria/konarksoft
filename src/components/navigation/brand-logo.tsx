import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

/**
 * The Konark wheel — the chariot wheel of the Konark sun temple, reduced to a
 * rim, hub and eight spokes so it stays legible down to favicon sizes. Exported
 * so the oversized footer wordmark draws the same mark rather than a copy.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 26 26"
      fill="none"
      className={className}
    >
      <circle cx="13" cy="13" r="10" stroke="currentColor" strokeWidth="2.1" />
      <circle cx="13" cy="13" r="2.4" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M13 4.8v4M13 17.2v4M4.8 13h4M17.2 13h4" />
        <path d="m7.2 7.2 2.83 2.83M15.97 15.97l2.83 2.83M18.8 7.2l-2.83 2.83M7.2 18.8l2.83-2.83" />
      </g>
    </svg>
  );
}

export function BrandLogo({ className }: { className?: string }) {
  // Derived from config so the wordmark never drifts from the site name.
  const [primary, ...rest] = siteConfig.name.split(" ");
  const secondary = rest.join(" ");

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        "group flex shrink-0 items-center gap-2 rounded-full",
        className,
      )}
    >
      <BrandMark className="h-6 w-6 text-brand transition-transform duration-700 ease-out-expo group-hover:rotate-90" />
      <span className="text-[19px] leading-none tracking-[-0.02em] text-ink">
        <span className="font-extrabold">{primary}</span>
        {secondary ? (
          <span className="ml-1 font-medium text-ink/65">{secondary}</span>
        ) : null}
      </span>
    </Link>
  );
}
