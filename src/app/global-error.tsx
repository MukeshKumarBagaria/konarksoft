"use client";

import { useEffect } from "react";

/**
 * Replaces the root layout when it is the layout itself that failed, so this
 * file must render its own <html> and <body> and cannot rely on global CSS.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled application error", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100svh",
          margin: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.25rem",
          padding: "1.5rem",
          textAlign: "center",
          background: "#f4f3f8",
          color: "#16161c",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", margin: 0, letterSpacing: "-0.02em" }}>
          Something went wrong
        </h1>
        <p style={{ margin: 0, color: "#6a6a78", maxWidth: "28rem" }}>
          The application could not be rendered. The error has been logged.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            border: 0,
            borderRadius: "999px",
            padding: "0.85rem 1.75rem",
            background: "#0d0d11",
            color: "#fff",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
