import Link from "next/link";

import { BrandMark } from "@/components/navigation/brand-logo";
import { siteConfig } from "@/config/site";

/**
 * The whole footer, deliberately. A landing page ends in one action, and a
 * column of sitemap links under it is just an exit. What survives is the legal
 * line and the two links a visitor might legitimately want before paying
 * someone: who this company is, and how else to reach it.
 */
export function LandingFooter() {
  return (
    <footer className="border-t border-hairline bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-[14px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2">
          <BrandMark className="h-5 w-5 shrink-0 text-brand" />
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </span>
        </p>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link
                href="/about"
                className="transition-colors duration-200 hover:text-ink"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="transition-colors duration-200 hover:text-ink"
              >
                Contact
              </Link>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="transition-colors duration-200 hover:text-ink"
              >
                {siteConfig.contactEmail}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
