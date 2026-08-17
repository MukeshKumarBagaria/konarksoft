import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";

/**
 * Fonts are declared once and exposed as CSS variables so every component
 * reads them through design tokens (`font-sans` / `font-display`) instead of
 * importing font families ad hoc.
 */
export const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans-family",
  display: "swap",
});

/** Editorial italic used for the accent half of display headings. */
export const fontDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display-family",
  style: ["italic"],
  weight: ["400", "500"],
  display: "swap",
});

export const fontVariables = `${fontSans.variable} ${fontDisplay.variable}`;
