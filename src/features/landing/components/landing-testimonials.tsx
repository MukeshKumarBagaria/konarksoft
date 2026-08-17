import { StarIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/features/landing/components/section-heading";
import type { LandingContent } from "@/types/content";

/**
 * Three quotes, each carrying a number or a specific outcome rather than an
 * adjective — "four or five enquiries a week" is evidence, "great work, highly
 * recommended" is decoration. Named and placed, because an unattributed quote
 * proves nothing.
 */
export function LandingTestimonials({
  content,
}: {
  content: LandingContent["testimonials"];
}) {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28"
    >
      <SectionHeading id="testimonials-heading" heading={content.heading} />

      <ul className="mt-14 grid gap-5 lg:grid-cols-3">
        {content.items.map((item) => (
          <li key={item.name}>
            <figure className="flex h-full flex-col rounded-3xl bg-canvas/70 p-7 sm:p-8">
              <div className="flex gap-0.5 text-brand" aria-hidden="true">
                {Array.from({ length: 5 }, (_, star) => (
                  <StarIcon key={star} className="h-[18px] w-[18px]" />
                ))}
              </div>

              <blockquote className="mt-4 flex-1 text-[16.5px] leading-relaxed text-ink/85 text-pretty">
                {item.quote}
              </blockquote>

              <figcaption className="mt-5 border-t border-hairline pt-4">
                <span className="block text-[15px] font-bold text-ink">
                  {item.name}
                </span>
                <span className="mt-0.5 block text-[14px] text-muted">
                  {item.role}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
