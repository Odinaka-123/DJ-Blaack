import type { Metadata } from "next";
import { Cinzel_Decorative, Raleway, Space_Mono } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel_Decorative({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-display",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-body",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"), // 🔥 IMPORTANT

  title: {
    default: "DJ Blaack | Youngest Male Gospel DJ in Nigeria",
    template: "%s | DJ Blaack",
  },

  description:
    "DJ Blaack is Nigeria's youngest male Gospel DJ based in Lagos. Experience spirit-filled Gospel, Afro-Gospel, and Christian Hip-Hop sets designed to inspire a generation.",

  keywords: [
    "DJ Blaack",
    "Gospel DJ in Nigeria",
    "Lagos DJ",
    "Afro Gospel DJ",
    "Christian Hip Hop DJ",
    "Young Gospel DJ Nigeria",
  ],

  authors: [{ name: "DJ Blaack" }],

  creator: "DJ Blaack",

  openGraph: {
    title: "DJ Blaack | Youngest Male Gospel DJ in Nigeria",
    description:
      "Spirit-filled Gospel DJ from Lagos, Nigeria creating powerful musical experiences.",
    url: "https://yourdomain.com",
    siteName: "DJ Blaack Official",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DJ Blaack Gospel DJ Lagos",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "DJ Blaack | Gospel DJ in Nigeria",
    description:
      "Spirit-filled Gospel DJ from Lagos creating powerful musical experiences.",
    images: ["https://yourdomain.com/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${raleway.variable} ${spaceMono.variable} scroll-smooth`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
