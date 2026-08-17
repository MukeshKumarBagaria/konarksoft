import { ClosingCard } from "@/components/layout/closing-card";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";
import { contactContent } from "@/content/contact";
import { ctaContent } from "@/content/cta";
import { ContactCta } from "@/features/marketing/components/contact-cta";
import { SiteCta } from "@/features/marketing/components/site-cta";

/**
 * Shell for every public marketing page: floating header, main landmark, footer.
 *
 * The card the page closes on is chosen here rather than by the pages, because
 * it has to sit inside the footer — hard against the wordmark reveal, which
 * clips on its bottom edge.
 */
export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-100 focus-visible:not-sr-only focus-visible:rounded-full focus-visible:bg-white focus-visible:px-5 focus-visible:py-2.5 focus-visible:text-sm focus-visible:font-semibold focus-visible:shadow-float"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <SiteFooter
        cta={
          <ClosingCard
            contact={<ContactCta content={contactContent.card} />}
            booking={<SiteCta content={ctaContent} />}
          />
        }
      />
    </>
  );
}
