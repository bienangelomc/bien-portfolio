import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://biencasimiro.com"),
  title: {
    default: `${siteConfig.name} — Web & Mobile App Developer`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Bien Casimiro builds websites and applications for real businesses and real users — from local service businesses to health and accessibility tools.",
  keywords: [
    "web developer",
    "mobile app developer",
    "freelance developer",
    "Next.js",
    "React",
    "TypeScript",
    "Philippines",
    "business websites",
    "web apps",
    "startup developer",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://biencasimiro.com",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Web & Mobile App Developer`,
    description:
      "Websites and applications for real businesses and real users.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Web & Mobile App Developer`,
    description:
      "Websites and applications for real businesses and real users.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${display.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
