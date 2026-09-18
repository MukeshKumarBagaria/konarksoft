import { homeSocialImage } from "@/lib/seo/home-social-image";

/** Same card as `opengraph-image.tsx` — X falls back to `og:image` on its own
 * when this is absent, but shipping both means the two conventions agree
 * rather than relying on a platform's fallback behaviour. */
export const alt = "Konark Soft — Digital Design & Development Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return homeSocialImage();
}
