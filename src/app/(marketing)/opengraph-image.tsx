import { homeSocialImage } from "@/lib/seo/home-social-image";

/**
 * Scoped to `/` alone: co-located with `(marketing)/page.tsx` rather than the
 * root layout, so it does not cascade to `/about`, `/contact` or any other
 * route in the group — verified by building and checking each page's
 * rendered `<head>` for an `og:image` tag.
 */
export const alt = "Konark Soft — Digital Design & Development Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return homeSocialImage();
}
