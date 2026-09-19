// Captures a screenshot of every project's live homepage into
// `public/work-previews/`, one WebP per slug, for the preview panel on the work
// cards and case study heroes to rest on.
//
//   npm run previews              # all seven
//   npm run previews -- t7-apparels soulstruck
//
// Two of the clients' servers refuse to be framed, so their panel is the
// screenshot and nothing else; the other five use it as the poster the live
// frame fades in over. Either way the capture is what a visitor sees first, so
// re-run this when a client redesigns — the images are committed, and nothing
// about them updates on its own.

import { chromium } from "playwright";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SOURCE = `${ROOT}src/content/portfolio.ts`;
const OUT_DIR = `${ROOT}public/work-previews`;

/**
 * The viewport each site is loaded at. Matches `FRAME_WIDTH`/`FRAME_HEIGHT` in
 * `project-artwork.tsx`, so the capture and the live frame show a project at
 * the same size and swapping between them does not shift anything.
 */
const VIEWPORT = { width: 1440, height: 900 };

/**
 * Captured at 2x and written out at this width.
 *
 * The panel is around 736px wide at its largest, so 1920 still has room to
 * spare on a retina screen while costing a third of what the raw 2880px frame
 * would. Downscaling from a 2x capture rather than shooting at 1920 directly
 * also resolves the text better than either would on its own.
 */
const OUTPUT_WIDTH = 1920;

/** WebP quality. 0.82 is where these particular frames stop getting smaller. */
const QUALITY = 0.82;

/**
 * How long a site gets to settle before the shutter.
 *
 * `networkidle` is not waited on: several of these run chat widgets and
 * analytics that poll forever and never reach it. The load event plus a beat
 * for hero animations and lazy images is what actually produces a usable frame.
 */
const SETTLE_MS = 4_000;

/**
 * Class and id fragments belonging to the overlays that are worthless in a
 * 700px-wide panel and actively harmful in a portfolio: a cookie banner or a
 * chat bubble frozen open is the first thing a visitor would read about the
 * client's site.
 *
 * Matched on the names these widgets ship with rather than on anything
 * site-specific, so it keeps working as the sites change.
 */
const OVERLAY_NAMES = [
  "cookie",
  "consent",
  "gdpr",
  "whatsapp",
  "chat",
  "tawk",
  "crisp",
  "intercom",
  "newsletter-popup",
  "exit-intent",
];

/**
 * Reads slug and url straight out of the portfolio content, so a project added
 * there is captured here without being registered twice.
 *
 * Read as text rather than imported: the module is TypeScript and resolves
 * `@/` aliases, neither of which plain Node does. Within one entry `slug`
 * always precedes `url`, and no other key in the file ends in a bare `url`, so
 * the pairing is unambiguous.
 */
async function targets() {
  const source = await readFile(SOURCE, "utf8");
  const found = [
    ...source.matchAll(/\n    slug: "([^"]+)",[\s\S]*?\n    url: "([^"]+)",/g),
  ].map(([, slug, url]) => ({ slug, url }));

  if (!found.length) {
    throw new Error(
      `No projects found in ${SOURCE}. If the content file was reformatted, ` +
        `update the pattern in ${import.meta.filename}.`,
    );
  }
  return found;
}

/**
 * Hides the widget overlays, and only those.
 *
 * Deliberately not a stylesheet of `[class*="cookie"]`-style selectors: one of
 * these storefronts ships `<html class="js supports-cookies">`, which such a
 * rule matches, and hiding the root element captures a blank white page.
 *
 * Two things make this safe instead. A name match has to sit on an element
 * that is `fixed` or `sticky` — which is what every one of these widgets is,
 * and what no page wrapper is — or on an iframe, which cannot be the document.
 * And the search starts below `body`, so neither it nor `html` is reachable.
 */
async function hideOverlays(page, names) {
  await page.evaluate((fragments) => {
    const hide = (el) => el.style.setProperty("display", "none", "important");
    const named = (el) =>
      fragments.some((fragment) =>
        `${el.className} ${el.id}`.toLowerCase().includes(fragment),
      );

    for (const el of document.querySelectorAll("body *")) {
      const { position } = getComputedStyle(el);
      if ((position === "fixed" || position === "sticky") && named(el)) hide(el);
    }

    for (const frame of document.querySelectorAll("iframe")) {
      const label = `${frame.src} ${frame.title} ${frame.id}`.toLowerCase();
      if (fragments.some((fragment) => label.includes(fragment))) hide(frame);
    }
  }, names);
}

/**
 * Re-encodes the PNG to WebP at `OUTPUT_WIDTH`, and reports how many distinct
 * colours it found on the way.
 *
 * Runs on a blank page of its own rather than on the site that was just
 * captured, so nothing the client's page sets — a content security policy on
 * `data:` images, most of all — can reach into the encode.
 *
 * The colour count is the blank-capture check. A page that failed to paint, or
 * that a hide rule wiped out, encodes to a handful of colours and slips
 * through every other test in this script, because a white JPEG is a perfectly
 * valid JPEG.
 */
async function encode(page, png, width, quality) {
  return page.evaluate(
    ([data, outWidth, q]) =>
      new Promise((resolve, reject) => {
        const image = new Image();
        image.onerror = () => reject(new Error("could not decode the capture"));
        image.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = outWidth;
          canvas.height = Math.round((image.height / image.width) * outWidth);
          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

          // Sampled on a grid rather than per pixel — this only has to tell a
          // painted page from an empty one.
          const colours = new Set();
          for (let y = 0; y < canvas.height; y += 16) {
            for (let x = 0; x < canvas.width; x += 16) {
              const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
              colours.add((r << 16) | (g << 8) | b);
            }
          }

          resolve({
            webp: canvas.toDataURL("image/webp", q).split(",")[1],
            colours: colours.size,
          });
        };
        image.src = `data:image/png;base64,${data}`;
      }),
    [png.toString("base64"), width, quality],
  );
}

const only = new Set(process.argv.slice(2));

const projects = (await targets()).filter(
  ({ slug }) => only.size === 0 || only.has(slug),
);

if (only.size && !projects.length) {
  console.error(`No project matched: ${[...only].join(", ")}`);
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: 2,
  // Some hosts serve a stripped page to an unrecognised agent, which is not the
  // site the client paid for.
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
});

const encoder = await context.newPage();
await encoder.goto("about:blank");

let failed = 0;

for (const { slug, url } of projects) {
  const page = await context.newPage();
  try {
    // Stops at the parsed document rather than the load event: two of these
    // storefronts keep a request open long past the point the page is fully
    // painted, and would otherwise only ever time out. The load event is still
    // waited for, just not depended on.
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
    await page.waitForLoadState("load", { timeout: 20_000 }).catch(() => {});
    await hideOverlays(page, OVERLAY_NAMES);
    await page.waitForTimeout(SETTLE_MS);

    const { webp, colours } = await encode(
      encoder,
      await page.screenshot({ type: "png" }),
      OUTPUT_WIDTH,
      QUALITY,
    );

    const bytes = Buffer.from(webp, "base64");
    await writeFile(`${OUT_DIR}/${slug}.webp`, bytes);

    const kb = `${Math.round(bytes.length / 1024)} KB`.padStart(7);
    if (colours < 24) {
      failed += 1;
      console.error(
        `✗ ${slug.padEnd(24)}${kb}  captured ${colours} colours — the page did ` +
          `not paint, or a rule in OVERLAY_NAMES hid too much of it`,
      );
    } else {
      console.log(`✓ ${slug.padEnd(24)}${kb}  ${url}`);
    }
  } catch (error) {
    failed += 1;
    console.error(`✗ ${slug.padEnd(24)}         ${error.message.split("\n")[0]}`);
  } finally {
    await page.close();
  }
}

await browser.close();

// A project whose capture failed falls back to its tone panel, which is a
// visible regression rather than a broken page — worth a non-zero exit in CI,
// not worth stopping the other six.
process.exit(failed ? 1 : 0);
