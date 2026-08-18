import { PlusIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/features/landing/components/section-heading";
import type { LandingContent } from "@/types/content";

/**
 * The last thing between a visitor and a message, so every question here is a
 * real objection rather than a feature restated as a question.
 *
 * Built on native `<details>`: it works before any JavaScript loads — which on
 * a phone over mobile data is the state this section is usually read in — and
 * the browser's find-in-page can open a closed answer on its own.
 */
export function LandingFaq({ content }: { content: LandingContent["faq"] }) {
  return (
    <section
      aria-labelledby="faq-heading"
      className="lp-faq border-t border-hairline py-20 sm:py-28"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <SectionHeading
          id="faq-heading"
          heading={content.heading}
          description={content.description}
        />

        {/* Hairline rules rather than a bordered card: the questions are
            already a list, and wrapping them in an outline as well drew a box
            around a box. */}
        <div className="mt-12">
          {content.items.map((item) => (
            <details key={item.question} className="border-b border-hairline">
              <summary className="flex cursor-pointer items-start justify-between gap-5 py-5 text-[16.5px] leading-snug font-bold text-ink select-none sm:text-[17px]">
                {item.question}
                <PlusIcon className="mt-1 h-4 w-4 shrink-0 text-brand" />
              </summary>

              <p className="pr-9 pb-6 text-[16px] leading-relaxed text-muted text-pretty">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
