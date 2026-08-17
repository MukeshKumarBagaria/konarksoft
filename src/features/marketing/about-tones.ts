import type { AboutTone } from "@/types/content";

/**
 * The two stops each tinted surface on the About page is painted between —
 * media frames, principle tiles, team portraits. One entry per accent in the
 * site palette, so a page-long grid of placeholders still reads as one family.
 *
 * Consumed as `--tone-from` / `--tone-to` by `.about-tile` in `globals.css`.
 */
export const aboutToneColors: Record<AboutTone, { from: string; to: string }> = {
  brand: { from: "#ffb08a", to: "#e8501f" },
  iris: { from: "#bbaaf8", to: "#5b46c9" },
  rose: { from: "#f7a8c8", to: "#d5347d" },
  sky: { from: "#a6d8f5", to: "#3d8fd1" },
};
