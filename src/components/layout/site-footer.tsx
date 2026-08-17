import { BrandReveal } from "@/components/layout/brand-reveal";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { ctaContent } from "@/content/cta";
import { SiteCta } from "@/features/marketing/components/site-cta";

/**
 * Closing block for every marketing page: the booking CTA, the wordmark that
 * rises from behind it, then the legal bar. The CTA and the reveal window sit in
 * one column with nothing between them — that shared edge is what the parallax
 * clips against, so keep them adjacent.
 *
 * `w-full` on the wrapper is load-bearing: this sits directly in the body's
 * column flex, where the auto inline margins stop the item stretching. Without
 * it the block shrinks to its content and never reaches `max-w-*`.
 */
export function SiteFooter() {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 pt-10 sm:pt-16">
      <SiteCta content={ctaContent} />

      <footer>
        <BrandReveal />

        {/* Rides the bottom of the viewport while the wordmark reveals behind
            it. The stick offset matches the wrapper's bottom padding — both are
            zero — so the bar's resting place at full scroll is exactly where it
            was pinned and it settles without a jump. Flush with the viewport
            edge, so only the top corners are rounded. */}
        <div className="sticky bottom-0 z-20 flex flex-col gap-5 rounded-t-[1.5rem] bg-ink-strong px-6 py-5 text-[13px] text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>

          <nav aria-label="Social">
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
              {siteConfig.social.map((profile) => (
                <li key={profile.label}>
                  <a
                    href={profile.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-white/75 transition-colors duration-200 hover:text-white"
                  >
                    {profile.label}
                    <ArrowUpRightIcon className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
