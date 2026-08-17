import type { AboutContent } from "@/types/content";

type Stats = AboutContent["stats"];

/**
 * The numbers band. Cells are separated by the grid's own gap showing the
 * hairline behind them, rather than by borders — one line between neighbours at
 * every breakpoint, and no doubled edge where the grid wraps.
 */
export function AboutStats({ items }: { items: Stats }) {
  return (
    <section aria-label="By the numbers" className="mx-auto max-w-7xl px-5">
      <dl
        data-reveal
        className="grid gap-px overflow-hidden rounded-[2rem] bg-hairline ring-1 ring-hairline sm:grid-cols-2 lg:grid-cols-4"
      >
        {items.map((stat) => (
          <div key={stat.label} className="bg-white px-7 py-9 sm:px-8 sm:py-10">
            <dt className="text-[12px] font-semibold tracking-[0.14em] text-subtle uppercase">
              {stat.label}
            </dt>
            <dd className="mt-3.5 text-[clamp(2rem,3.4vw,2.75rem)] leading-none font-extrabold tracking-[-0.035em] text-ink">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
