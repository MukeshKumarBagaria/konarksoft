import Link from "next/link";

import { BrandLogo } from "@/components/navigation/brand-logo";
import { sitePages } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-14 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <BrandLogo />
          <p className="mt-4 text-[15px] leading-relaxed text-muted text-pretty">
            {siteConfig.description}
          </p>
        </div>

        <nav aria-label="Footer" className="sm:text-right">
          <h2 className="text-xs font-semibold tracking-[0.14em] text-subtle uppercase">
            Pages
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {sitePages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="text-[15px] font-medium text-ink/70 transition-colors duration-200 hover:text-ink"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-hairline px-5 py-6 text-[13px] text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <a
          href={`mailto:${siteConfig.contactEmail}`}
          className="font-medium text-ink/70 transition-colors duration-200 hover:text-ink"
        >
          {siteConfig.contactEmail}
        </a>
      </div>
    </footer>
  );
}
