import type { WorkTone } from "@/types/content";

/**
 * The colours every work surface is painted from — the home rail's cards, the
 * portfolio index, and each case study's hero.
 *
 * `wash` tints the card behind the copy; `from` / `to` are the two stops of the
 * artwork panel, lit from the top-left like every other tinted tile on the
 * site. `ink` is the one text colour that holds its own on that panel: it is
 * the tone taken dark enough to clear 4.5:1 on the wash, so a label can sit on
 * a card without falling back to grey.
 *
 * Consumed as `--tone-wash` / `--tone-from` / `--tone-to` by `.work-card` and
 * `.work-media` in `globals.css`.
 */
export const workToneColors: Record<
  WorkTone,
  { wash: string; from: string; to: string; ink: string }
> = {
  lime: { wash: "#e9f8cb", from: "#d3f294", to: "#7ec53c", ink: "#3f6416" },
  violet: { wash: "#eae6fd", from: "#b9a8f7", to: "#5b46c9", ink: "#4b35b5" },
  amber: { wash: "#fdeedd", from: "#fbc98a", to: "#e8762a", ink: "#9a4a0d" },
  sky: { wash: "#e2f1fb", from: "#a6d8f5", to: "#3d8fd1", ink: "#1f5e93" },
  rose: { wash: "#fde9f1", from: "#f7a8c8", to: "#d5347d", ink: "#a51f5d" },
  teal: { wash: "#dcf4ef", from: "#8fdfcd", to: "#199e82", ink: "#11685a" },
  indigo: { wash: "#e5e9fb", from: "#a7b6f5", to: "#3f4fc4", ink: "#333f9e" },
};
