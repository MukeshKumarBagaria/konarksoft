import { ContactForm } from "@/features/marketing/components/contact-form";
import { CtaShell } from "@/features/marketing/components/cta-shell";
import type { ContactContent } from "@/types/content";

/**
 * The closing card on `/contact`: the same shell every other page ends on, with
 * the enquiry form in the panel where the booking card normally sits. Rendered
 * through the layout's `closing` slot, so it lands directly above the footer
 * wordmark and the reveal clips against its bottom edge.
 */
export function ContactCta({
  content,
}: {
  content: ContactContent["card"];
}) {
  return (
    <CtaShell headingId="contact-cta-heading" heading={content.heading}>
      {/* Wider than the booking card it replaces — the form is two columns from
          `sm` up, and squeezing it into a sidebar would stack every field. */}
      <div className="relative z-10 mt-10 w-full rounded-[1.5rem] bg-white p-6 shadow-float sm:p-8 lg:mt-0 lg:w-[clamp(28rem,44vw,34rem)] lg:shrink-0">
        <h3 className="text-2xl leading-tight font-bold tracking-[-0.02em] text-ink">
          {content.form.title.lead}{" "}
          <span className="font-display font-normal italic text-brand">
            {content.form.title.accent}
          </span>
        </h3>

        <div aria-hidden="true" className="mt-5 h-px bg-hairline" />

        <ContactForm content={content.form} />
      </div>
    </CtaShell>
  );
}
