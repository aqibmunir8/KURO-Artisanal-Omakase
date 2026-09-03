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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
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
