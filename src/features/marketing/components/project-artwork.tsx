import type { CSSProperties } from "react";

import { workToneColors } from "@/features/marketing/work-tones";
import type { WorkTone } from "@/types/content";

/**
 * The tinted panel that stands in for a project's screenshot.
 *
 * Client screenshots age badly — a storefront reskins for a sale and the case
 * study is instantly out of date — so each project is represented by its own
 * wordmark set on its own tone instead. The result stays accurate for the life
 * of the page and keeps the grid reading as one system rather than as seven
 * different brands' art direction fighting each other.
 *
 * The browser chrome is drawn rather than illustrated: three dots and an
 * address bar carrying the real domain, which is the one detail that makes the
 * panel read as a website rather than as a colour swatch.
 */
export function ProjectArtwork({
  tone,
  wordmark,
  displayUrl,
  className,
  size = "md",
}: {
  tone: WorkTone;
  wordmark: string;
  displayUrl: string;
  className?: string;
  /** `lg` is for the case study hero, where the panel carries the page. */
  size?: "md" | "lg";
}) {
  const colors = workToneColors[tone];

  return (
    <div
      aria-hidden="true"
      style={
        {
          "--tone-from": colors.from,
          "--tone-to": colors.to,
        } as CSSProperties
      }
      className={`work-media relative isolate overflow-hidden ${className ?? ""}`}
    >
      {/* Browser chrome. Sits on the panel's own glass rather than on white, so
          it reads as part of the artwork instead of a pasted-on frame.

          The address pill is a dark wash rather than the white one the rest of
          the chrome uses: the tones run from a pale lime to a deep indigo, and
          white-on-white measured 1.2:1 at the light end. Tinting the pill
          instead of the text keeps one treatment across all seven tones, and
          puts the worst case — the URL on the palest tone — at 5.6:1. */}
      <div className="absolute inset-x-0 top-0 flex items-center gap-2 border-b border-white/25 bg-white/15 px-4 py-3 backdrop-blur-sm sm:px-5">
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="h-2 w-2 rounded-full bg-white/45" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
        </span>
        <span className="ml-1 truncate rounded-full bg-black/55 px-3 py-1 text-[11px] font-medium text-white">
          {displayUrl}
        </span>
      </div>

      {/* Shade deepening down the panel, under the wordmark.

          The palette runs light — white on the lime tone measured 1.5:1, and no
          tone cleared 2.7:1 — but darkening the tones themselves would cost the
          artwork the brightness that makes the grid read. This gradient keeps
          the lit top edge where the chrome sits and carries the weight to the
          foot, so it reads as the panel's own lighting rather than as a scrim
          laid over it. Measured per tone, the worst case clears the 3:1 floor
          this display type answers to. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(12,8,20,0) 0%, rgba(12,8,20,0.14) 20%, rgba(12,8,20,0.5) 56%, rgba(12,8,20,0.58) 100%)",
        }}
      />

      <div className="relative flex h-full items-center justify-center px-6 pt-10 sm:px-10">
        <p
          className={`text-center font-display leading-[1.1] font-normal text-white italic drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)] text-balance ${
            size === "lg"
              ? "text-[clamp(1.75rem,4.4vw,3.5rem)]"
              : "text-[clamp(1.5rem,3.2vw,2.5rem)]"
          }`}
        >
          {wordmark}
        </p>
      </div>
    </div>
  );
}
