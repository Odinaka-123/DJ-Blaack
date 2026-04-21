import type { Metadata } from "next";
import { Cinzel_Decorative, Raleway, Space_Mono } from "next/font/google";
import "./globals.css";

// 1. Setup optimized Google Fonts
const cinzel = Cinzel_Decorative({ 
  weight: ["400", "700", "900"], 
  subsets: ["latin"],
  variable: "--font-display" 
});

const raleway = Raleway({ 
  subsets: ["latin"],
  variable: "--font-body"
});

const spaceMono = Space_Mono({ 
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "DJ Blaack | Gospel Disc Jockey",
  description:
    "DJ Blaack — Nigeria's youngest male Gospel DJ. Spirit-filled sets, Afro-Gospel, and Christian Hip-Hop based in Lagos.",
  keywords: ["DJ Blaack", "Gospel DJ", "Lagos", "Nigeria", "Afro-Gospel", "Christian Hip-Hop"],
  openGraph: {
    title: "DJ Blaack | Gospel Disc Jockey",
    description: "Spirit-filled sounds from Lagos, Nigeria's youngest male gospel DJ.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 2. Add the font variables to the html class
    <html 
      lang="en" 
      className={`${cinzel.variable} ${raleway.variable} ${spaceMono.variable} scroll-smooth`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
