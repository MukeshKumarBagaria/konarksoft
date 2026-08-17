import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="canvas-aurora flex min-h-svh flex-col items-center justify-center px-5 text-center">
      <p className="font-display text-[clamp(4rem,12vw,9rem)] leading-none italic text-brand">
        404
      </p>
      <h1 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] leading-tight font-extrabold tracking-[-0.03em] text-ink text-balance">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-5 max-w-md text-lg text-muted text-pretty">
        The link may be outdated, or the page may have moved.
      </p>
      <Link href="/" className={buttonStyles({ size: "lg", className: "mt-9" })}>
        Back to home
      </Link>
    </div>
  );
}
