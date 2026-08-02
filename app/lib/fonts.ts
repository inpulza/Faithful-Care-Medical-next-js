import { DM_Serif_Display, Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  weight: "variable",
  style: "normal",
  axes: ["opsz"],
  display: "swap",
  variable: "--font-inter-loaded",
});

const interItalic = Inter({
  subsets: ["latin"],
  weight: "variable",
  style: "italic",
  axes: ["opsz"],
  display: "swap",
  preload: false,
  variable: "--font-inter-italic-loaded",
});

export const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-dm-serif-display-loaded",
});

const dmSerifDisplayItalic = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
  preload: false,
  variable: "--font-dm-serif-display-italic-loaded",
});

export const fontVariables = [
  inter.variable,
  interItalic.variable,
  dmSerifDisplay.variable,
  dmSerifDisplayItalic.variable,
].join(" ");
