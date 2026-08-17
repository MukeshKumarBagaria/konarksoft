import type { ReactNode } from "react";

/**
 * Shared heading block for inner pages, so every route opens with the same
 * rhythm and a single `<h1>`.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="canvas-aurora relative isolate overflow-hidden rounded-b-[2rem] md:rounded-b-[2.75rem]">
      <div
        aria-hidden="true"
        className="canvas-grid pointer-events-none absolute inset-0"
      />
      <div className="relative mx-auto max-w-4xl px-5 pt-36 pb-16 text-center sm:pt-44 sm:pb-24">
        <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-5 text-[clamp(2.25rem,5.2vw,4.25rem)] leading-[1.02] font-extrabold tracking-[-0.035em] text-ink text-balance">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted text-pretty">
          {description}
        </p>
        {children ? <div className="mt-9">{children}</div> : null}
      </div>
    </section>
  );
}
