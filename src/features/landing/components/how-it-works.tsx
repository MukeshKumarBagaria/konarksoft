import { SectionHeading } from "@/features/landing/components/section-heading";
import type { LandingContent } from "@/types/content";

/**
 * Four steps, answering the unspoken objection behind every enquiry that never
 * gets sent: what happens after I press the button, and how much of my time
 * does this cost me. The numbered rail is drawn with a border on the list item
 * rather than a positioned line, so it ends exactly at the last step instead of
 * running off the bottom of the section.
 */
export function HowItWorks({
  content,
}: {
  content: LandingContent["process"];
}) {
  return (
    <section
      aria-labelledby="process-heading"
      className="border-y border-hairline bg-canvas/60 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <SectionHeading
          id="process-heading"
          heading={content.heading}
          description={content.description}
        />

        <ol className="mt-14">
          {content.steps.map((step, index) => {
            const last = index === content.steps.length - 1;

            return (
              <li
                key={step.index}
                className={last ? "relative pl-12" : "relative pb-8 pl-12"}
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 flex h-9 w-9 items-center justify-center rounded-full bg-brand text-[14px] font-bold text-white"
                >
                  {step.index}
                </span>

                {/* The rail is its own element rather than a border on the
                    list item: hung off the item's left edge it would have to
                    sit half outside the container to line up with the discs,
                    which on a phone puts it within a couple of pixels of the
                    screen edge. Drawn here it starts under the disc, centred on
                    it, and stops at the next step. */}
                {last ? null : (
                  <span
                    aria-hidden="true"
                    className="absolute top-10 bottom-1 left-[1.0625rem] border-l-2 border-dashed border-brand/30"
                  />
                )}

                <h3 className="text-[18px] leading-snug font-bold text-ink sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-[16px] leading-relaxed text-muted text-pretty">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
