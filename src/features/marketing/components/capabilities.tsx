import { ArrowUpRightIcon } from "@/components/ui/icons";
import type { CapabilitiesContent } from "@/types/content";

export function Capabilities({ content }: { content: CapabilitiesContent }) {
  return (
    <section
      aria-labelledby="capabilities-heading"
      className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32"
    >
      <h2
        id="capabilities-heading"
        className="max-w-xl text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-bold tracking-[-0.03em] text-ink text-balance"
      >
        {content.heading.lead}
        <span className="font-display text-[1.06em] font-normal italic text-brand">
          {" "}
          {content.heading.accent}
        </span>
      </h2>

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {content.items.map((item) => (
          <li
            key={item.index}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] bg-white p-7 shadow-card ring-1 ring-hairline transition-[translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-float"
          >
            <div className="flex items-start justify-between">
              <span className="font-display text-3xl italic text-ink/25">
                {item.index}
              </span>
              <ArrowUpRightIcon className="h-5 w-5 text-ink/25 transition-colors duration-300 group-hover:text-brand" />
            </div>

            <div className="mt-16">
              <h3 className="text-xl font-bold tracking-[-0.02em] text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted text-pretty">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
