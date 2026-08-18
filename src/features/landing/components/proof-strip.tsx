import type { LandingContent } from "@/types/content";

/**
 * The band under the hero, answering the question the headline just provoked:
 * who else has trusted this.
 *
 * Numbers only, on plain white between two hairlines. The industries used to be
 * a wall of eight pills, which is eight more outlines competing with the four
 * figures that actually carry the section — as a single quiet line they still
 * let a visitor find their own trade without shouting over the stats.
 */
export function ProofStrip({ content }: { content: LandingContent["proof"] }) {
  return (
    <section aria-label="Track record" className="border-b border-hairline">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-16">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {content.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-[clamp(1.9rem,5.5vw,2.5rem)] leading-none font-bold tracking-[-0.035em] text-ink">
                  {stat.value}
                </span>
                <span className="mt-2.5 block text-[14px] leading-snug text-muted text-balance">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-12 text-center text-[14.5px] leading-relaxed text-subtle text-pretty">
          <span className="font-semibold text-ink/60">
            {content.industriesLabel}
          </span>{" "}
          {content.industries.join(" · ")}
        </p>
      </div>
    </section>
  );
}
