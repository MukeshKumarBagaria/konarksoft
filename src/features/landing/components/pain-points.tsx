import { CrossCircleIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/features/landing/components/section-heading";
import type { LandingContent } from "@/types/content";

/**
 * Names the visitor's own situation back to them before offering anything.
 * Each item is a symptom they can recognise in one line, and the section closes
 * on the turn — one sentence saying all four are what the price below buys.
 *
 * Set as a plain list rather than four bordered cards. The words are doing the
 * work here; boxing each one added four outlines and four shadows to a section
 * that is meant to read quickly.
 */
export function PainPoints({
  content,
}: {
  content: LandingContent["problem"];
}) {
  return (
    <section
      aria-labelledby="problem-heading"
      className="mx-auto max-w-5xl px-5 py-20 sm:px-6 sm:py-28"
    >
      <SectionHeading
        id="problem-heading"
        heading={content.heading}
        description={content.description}
      />

      <ul className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
        {content.items.map((item) => (
          <li key={item.title}>
            <h3 className="flex items-start gap-3 text-[17px] leading-snug font-bold text-ink sm:text-lg">
              <CrossCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              {item.title}
            </h3>
            <p className="mt-3 pl-8 text-[16px] leading-relaxed text-muted text-pretty">
              {item.description}
            </p>
          </li>
        ))}
      </ul>

      <p className="mx-auto mt-14 max-w-2xl border-t border-hairline pt-10 text-center text-[18px] leading-relaxed font-semibold text-ink text-balance sm:text-xl">
        {content.resolution}
      </p>
    </section>
  );
}
