import { CheckIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/features/landing/components/section-heading";
import type { LandingContent } from "@/types/content";

/**
 * The things a cheaper quote elsewhere usually leaves out, listed as standard.
 * It sits immediately after pricing on purpose: the visitor has just compared
 * three numbers and is about to compare ours with someone else's, and this is
 * the section that decides which of the two they think is the honest one.
 */
export function WhatsIncluded({
  content,
}: {
  content: LandingContent["included"];
}) {
  return (
    <section
      aria-labelledby="included-heading"
      className="mx-auto max-w-5xl px-5 py-20 sm:px-6 sm:py-28"
    >
      <SectionHeading
        id="included-heading"
        heading={content.heading}
        description={content.description}
      />

      <ul className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
        {content.items.map((item) => (
          <li key={item.title}>
            <h3 className="flex items-start gap-3 text-[17px] leading-snug font-bold text-ink">
              <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand" />
              {item.title}
            </h3>
            <p className="mt-2.5 pl-7 text-[16px] leading-relaxed text-muted text-pretty">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
