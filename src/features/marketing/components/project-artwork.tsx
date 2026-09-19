"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { workToneColors } from "@/features/marketing/work-tones";
import type { WorkTone } from "@/types/content";

/**
 * The viewport the live site is loaded at, in CSS pixels.
 *
 * A card is around 736px wide on a large screen, and a site asked to render at
 * that width answers with its tablet layout — which is not the work being shown
 * off. The frame is given a desktop viewport instead and scaled down to fit, so
 * the panel shows the design the client actually signed off on.
 */
const FRAME_WIDTH = 1440;
const FRAME_HEIGHT = 900;

/** Screenshots live under `public/`, one per project, keyed by slug. */
const shotFor = (slug: string) => `/work-previews/${slug}.webp`;

/**
 * Mounts the live frame only while the panel is near the viewport, and reports
 * the panel's width so the frame can be scaled to it.
 *
 * Both are deliberately tied together in one hook, because both answer the same
 * question — how this panel currently sits on screen — and a panel that is not
 * on screen does not need to be measured either.
 *
 * The frame is unmounted again once the panel is well clear of the viewport.
 * The home rail loops through three copies of the list, so a visitor who keeps
 * scrolling would otherwise accumulate twelve live sites in the page; the
 * screenshot underneath means dropping one costs nothing visible.
 */
function usePanelViewport(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const panel = ref.current;
    if (!panel || !enabled) return;

    const resize = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / FRAME_WIDTH);
    });
    resize.observe(panel);

    // One panel's width of slack either side: enough that the frame has loaded
    // by the time the card is scrolled to, in the rail as well as down the page.
    const intersect = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin: "100%" },
    );
    intersect.observe(panel);

    return () => {
      resize.disconnect();
      intersect.disconnect();
    };
  }, [enabled]);

  return { ref, scale, near };
}

/**
 * A project's panel: the client's live website, inside drawn browser chrome.
 *
 * Three layers fill the frame, each covering the one before it as it becomes
 * available, so the panel is never blank and never shifts:
 *
 *  1. The project's tone and wordmark, painted by CSS and up on first paint.
 *  2. A screenshot of the live homepage, captured by `npm run previews` and
 *     served from `public/`. Static, so it paints almost immediately.
 *  3. The site itself in an iframe, once the panel nears the viewport.
 *
 * Layer 3 is skipped where the client's server refuses to be framed — both
 * Shopify storefronts send `X-Frame-Options: DENY`, which no amount of markup
 * on our side can talk them out of — and those projects rest on layer 2. Layer 1
 * is the backstop for a project whose screenshot has not been captured yet.
 *
 * Only the top of a page is ever shown, because the chrome takes its own strip
 * off the top of the panel and the frame keeps its full height below it. That
 * is what a browser does, and the fold is the part of a homepage worth showing.
 *
 * The whole panel is inert and takes no pointer events. On a card it sits over
 * the link stretched across the tile, so without that the one part a visitor is
 * most likely to click — a live website — would be the one part that does
 * nothing, and tabbing through the page would land inside a stranger's
 * navigation with no visible focus ring.
 */
export function ProjectArtwork({
  tone,
  wordmark,
  slug,
  url,
  displayUrl,
  embeddable,
  className,
  size = "md",
}: {
  tone: WorkTone;
  wordmark: string;
  /** Keys the captured screenshot under `public/work-previews/`. */
  slug: string;
  /** The live site loaded into the frame. */
  url: string;
  displayUrl: string;
  /** Whether the live site permits framing. See `CaseStudy.embeddable`. */
  embeddable: boolean;
  className?: string;
  /** `lg` is for the case study hero, where the panel carries the page. */
  size?: "md" | "lg";
}) {
  const colors = workToneColors[tone];
  const shotRef = useRef<HTMLImageElement>(null);
  const [shotLoaded, setShotLoaded] = useState(false);
  const [frameLoaded, setFrameLoaded] = useState(false);
  const { ref, scale, near } = usePanelViewport(embeddable);

  // The screenshot is in the server-rendered HTML, so the browser can have it
  // decoded before React has attached anything to it — on a warm cache it
  // always does. `onLoad` alone would then never fire and the panel would sit
  // on its tone forever, holding a loaded image at zero opacity.
  useEffect(() => {
    const shot = shotRef.current;
    if (shot?.complete && shot.naturalWidth > 0) setShotLoaded(true);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={
        {
          "--tone-from": colors.from,
          "--tone-to": colors.to,
        } as CSSProperties
      }
      className={`work-media pointer-events-none flex flex-col overflow-hidden ${className ?? ""}`}
    >
      {/* Browser chrome.

          A solid bar above the page rather than the glass one that used to lie
          over the artwork: it now has to sit against whatever the client's
          homepage opens with, and half of them open on white. Laying it over
          the page also buried each site's own announcement bar under a wash of
          its own header — which is the opposite of showing the work. */}
      <div className="flex shrink-0 items-center gap-2 bg-ink-strong px-4 py-3 sm:px-5">
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/45" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </span>
        <span className="ml-1 truncate rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white/85">
          {displayUrl}
        </span>
      </div>

      {/* The page itself. `flex-1` so the chrome takes its strip off the top and
          this keeps the rest, and `isolate` so the layers stack against each
          other rather than against the card. */}
      <div ref={ref} className="relative isolate flex-1 overflow-hidden">
        {/* Layer 1 — the tone panel. What shows before anything has loaded, and
            what a project without a captured screenshot keeps. */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(12,8,20,0) 0%, rgba(12,8,20,0.14) 20%, rgba(12,8,20,0.5) 56%, rgba(12,8,20,0.58) 100%)",
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-10">
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

        {/* Layer 2 — the captured homepage, pinned to its top edge so it lines
            up with the live frame that fades in over it.

            `onError` is left to fail quietly: the tone panel is already
            underneath, so a missing capture degrades rather than breaks. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- a fixed-size
            local asset inside a scaled panel; next/image would add a request to
            the optimiser for a file that is already the size it renders at. */}
        <img
          ref={shotRef}
          src={shotFor(slug)}
          alt=""
          loading="lazy"
          decoding="async"
          onLoad={() => setShotLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ease-out-soft ${
            shotLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Layer 3 — the live site.

            `inert` rather than `tabIndex={-1}`: a negative tabindex on the frame
            itself still leaves everything inside it reachable by keyboard in
            most browsers. `inert` takes the whole subtree out.

            The sandbox grants scripts and the frame's own origin — most of these
            sites will not lay themselves out without both — and withholds
            everything else. `allow-top-navigation` in particular is absent, so a
            site that tries to break out of the frame simply does not. */}
        {embeddable && near && scale > 0 ? (
          <div inert className="absolute inset-0 overflow-hidden">
            <iframe
              src={url}
              title=""
              tabIndex={-1}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => setFrameLoaded(true)}
              style={{
                width: FRAME_WIDTH,
                height: FRAME_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
              className={`border-0 transition-opacity duration-700 ease-out-soft ${
                frameLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
