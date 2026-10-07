import type { Metadata } from "next";
import { Barlow_Condensed, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fork & Flame | Kitchen & Grill · Addis Ababa",
  description: "Discover flame-grilled burgers, stone-oven pizza, fresh plates, and Ethiopian coffee at Fork & Flame in Addis Ababa.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${barlowCondensed.variable}`}>
      <body>{children}</body>
    </html>
  );
}
