import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KURO (黒) | Artisanal Omakase & Fire Craft | SoHo, New York",
  description:
    "An exclusive 12-seat Japanese fine dining sanctuary where Kishu Binchotan fire craft meets ultra-pristine ocean harvest. Two Michelin Stars.",
  keywords: [
    "KURO",
    "Omakase NYC",
    "Fine Dining SoHo",
    "Michelin Star Restaurant",
    "Japanese Omakase",
    "Binchotan Charcoal",
    "Chef Kenzo Takahashi",
  ],
  openGraph: {
    title: "KURO (黒) | Artisanal Omakase & Fire Craft",
    description: "An exclusive 12-seat Japanese fine dining sanctuary. Two Michelin Stars.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable} dark`}
    >
      <body className="font-sans antialiased bg-background text-zinc-100 selection:bg-gold-500/30 selection:text-gold-100">
        <SmoothScroll>
          <CustomCursor />
          <NoiseOverlay />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
