"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

/**
 * Route-level boundary for unexpected errors. The message is intentionally
 * generic — details stay in the logs, never in the UI.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: forward to the error monitoring provider once one is configured.
    console.error("Unhandled route error", error);
  }, [error]);

  return (
    <div className="canvas-aurora flex min-h-svh flex-col items-center justify-center px-5 text-center">
      <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">
        Something broke
      </p>
      <h1 className="mt-5 text-[clamp(2rem,4.5vw,3.5rem)] leading-tight font-extrabold tracking-[-0.03em] text-ink text-balance">
        This page failed to load
      </h1>
      <p className="mt-5 max-w-md text-lg text-muted text-pretty">
        The issue has been logged. Try again — if it keeps happening, let us
        know.
      </p>
      {error.digest ? (
        <p className="mt-3 font-mono text-xs text-subtle">
          Reference: {error.digest}
        </p>
      ) : null}
      <Button size="lg" className="mt-9" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
