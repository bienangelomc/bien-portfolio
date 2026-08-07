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
  metadataBase: new URL("https://bienmc-portfolio-kappa.vercel.app"),
  title: {
    default: "Bien Casimiro — Web & Mobile App Developer (Philippines)",
    template: `%s | Bien Casimiro`,
  },
  description:
    "Bien Casimiro is a web and mobile app developer based in the Philippines. He builds websites, web applications, and mobile apps for businesses — from local service companies to SaaS products. Specializing in Next.js, React, TypeScript, and Cloudflare.",
  keywords: [
    "Bien Casimiro",
    "web developer Philippines",
    "mobile app developer",
    "Next.js developer",
    "React developer",
    "freelance web developer",
    "business websites",
    "web app development",
    "TypeScript",
    "Tailwind CSS",
    "Cloudflare Workers",
    "Philippines developer",
    "Filipino developer",
    "portfolio",
    "full stack developer",
    "UI designer",
  ],
  authors: [{ name: "Bien Casimiro", url: "https://bienmc-portfolio-kappa.vercel.app" }],
  creator: "Bien Casimiro",
  publisher: "Bien Casimiro",
  alternates: {
    canonical: "https://bienmc-portfolio-kappa.vercel.app",
  },
  openGraph: {
    type: "profile",
    firstName: "Bien",
    lastName: "Casimiro",
    username: "bienangelomc",
    gender: "male",
    locale: "en_US",
    url: "https://bienmc-portfolio-kappa.vercel.app",
    siteName: "Bien Casimiro Portfolio",
    title: "Bien Casimiro — Web & Mobile App Developer",
    description:
      "Bien Casimiro builds websites and mobile apps for real businesses. Full stack developer from the Philippines specializing in Next.js, React, and TypeScript.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Bien Casimiro — Web & Mobile App Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bien Casimiro — Web & Mobile App Developer",
    description:
      "Full stack developer building websites and mobile apps for businesses. Based in the Philippines.",
    images: ["/og.png"],
    creator: "@bienangelomc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bien Casimiro",
  givenName: "Bien",
  familyName: "Casimiro",
  alternateName: "Bien Angelo Casimiro",
  url: "https://bienmc-portfolio-kappa.vercel.app",
  image: "https://bienmc-portfolio-kappa.vercel.app/bien-portrait.png",
  jobTitle: "Web & Mobile App Developer",
  description:
    "Full stack web and mobile app developer building websites, web applications, and mobile apps for businesses. Specializes in Next.js, React, TypeScript, and Cloudflare.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "PH",
    addressRegion: "Philippines",
  },
  email: "mailto:bienangelomc@gmail.com",
  sameAs: [
    "https://github.com/bienangelomc",
  ],
  knowsAbout: [
    "Web Development",
    "Mobile App Development",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Cloudflare Workers",
    "UI Design",
    "Full Stack Development",
    "Business Websites",
    "SaaS Products",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Web Developer",
    occupationLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "PH",
      },
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${display.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
