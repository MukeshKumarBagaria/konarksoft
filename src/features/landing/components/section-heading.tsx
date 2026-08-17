import { cn } from "@/lib/utils/cn";

/**
 * The heading every landing section opens with. The accent half sets in the
 * display serif and takes brand orange flat rather than the gradient the
 * marketing site uses — at heading sizes it clears contrast comfortably, and a
 * solid colour survives being read at arm's length on a phone in daylight.
 */
export function SectionHeading({
  id,
  eyebrow,
  heading,
  description,
  className,
}: {
  /** Ties the heading to its section's `aria-labelledby`. */
  id: string;
  eyebrow?: string;
  heading: { lead: string; accent: string };
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      {eyebrow ? (
        <p className="text-[13px] font-bold tracking-[0.14em] text-brand-strong uppercase">
          {eyebrow}
        </p>
      ) : null}

      <h2
        id={id}
        className={cn(
          "text-[clamp(1.8rem,5.6vw,2.75rem)] leading-[1.14] font-bold tracking-[-0.03em] text-ink text-balance",
          eyebrow && "mt-4",
        )}
      >
        {heading.lead}{" "}
        <span className="font-display text-[1.06em] font-normal text-brand italic">
          {heading.accent}
        </span>
      </h2>

      {description ? (
        <p className="mt-5 text-[17px] leading-relaxed text-muted text-pretty sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
