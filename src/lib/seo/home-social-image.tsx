import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

/**
 * The homepage's Open Graph / Twitter card. Shared by `opengraph-image.tsx`
 * and `twitter-image.tsx` so the two never drift — each file just re-exports
 * this with its own required `export default`, since the special filename
 * convention needs a default export in the file itself.
 *
 * No custom font is loaded: `ImageResponse` only accepts ttf/otf/woff, the
 * site's fonts ship as woff2, and fetching a font file at build time trades a
 * small type-quality gain for a network dependency the production build
 * should not need. Satori's built-in sans is bold and clean at this size.
 *
 * Colours are the exact stops from `.plan-strip` in globals.css — the one
 * dark, high-contrast gradient already proven legible with white text
 * elsewhere on the site, reused here rather than inventing a new one.
 */
export function homeSocialImage() {
  const chips = ["Website Development", "Mobile Apps", "Meta & Google Ads", "AI Content"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          backgroundImage:
            "linear-gradient(120deg, #101235 0%, #22103a 35%, #5d1330 70%, #97131f 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="56" height="56" viewBox="0 0 26 26" fill="none">
            <circle cx="13" cy="13" r="10" stroke="#fff" strokeWidth="2.1" />
            <circle cx="13" cy="13" r="2.4" fill="#fff" />
            <g stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
              <path d="M13 4.8v4M13 17.2v4M4.8 13h4M17.2 13h4" />
              <path d="m7.2 7.2 2.83 2.83M15.97 15.97l2.83 2.83M18.8 7.2l-2.83 2.83M7.2 18.8l2.83-2.83" />
            </g>
          </svg>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 800, color: "#fff" }}>
            Konark<span style={{ fontWeight: 500, color: "rgba(255,255,255,0.65)", marginLeft: 8 }}>Soft</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 980 }}>
          <div style={{ display: "flex", fontSize: 66, fontWeight: 800, lineHeight: 1.12, letterSpacing: -1, color: "#fff" }}>
            Digital Design &amp; Development Agency
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "rgba(255,255,255,0.78)" }}>
            {siteConfig.tagline}
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {chips.map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                fontSize: 21,
                fontWeight: 600,
                color: "#fff",
                padding: "12px 22px",
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.14)",
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
