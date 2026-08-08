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
    default: "Bien Casimiro — Funnel Builder & Web Developer (Philippines)",
    template: `%s | Bien Casimiro`,
  },
  description:
    "Bien Casimiro is a funnel builder and web developer based in the Philippines. He builds done-for-you Systeme.io sales funnels, email automations, and custom websites that convert visitors into customers.",
  keywords: [
    "Bien Casimiro",
    "funnel builder Philippines",
    "Systeme.io expert",
    "sales funnel builder",
    "web developer Philippines",
    "freelance funnel builder",
    "email automation",
    "landing page builder",
    "conversion funnel",
    "Next.js developer",
    "React developer",
    "TypeScript",
    "Tailwind CSS",
    "Philippines developer",
    "Filipino developer",
    "portfolio",
    "web developer",
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
    title: "Bien Casimiro — Funnel Builder & Web Developer",
    description:
      "Done-for-you Systeme.io funnels and custom websites that convert visitors into customers. Based in the Philippines.",
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
    title: "Bien Casimiro — Funnel Builder & Web Developer",
    description:
      "Done-for-you Systeme.io funnels and custom websites that convert. Based in the Philippines.",
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
  verification: {
    google: "nBKFp2yJABcbsIEbpNXKJcgQmefosKv4KLBbW6y7CAY",
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
  jobTitle: "Funnel Builder & Web Developer",
  description:
    "Funnel builder and web developer creating done-for-you Systeme.io sales funnels, email automations, and custom websites that convert visitors into customers. Specializes in Systeme.io, Next.js, React, and TypeScript.",
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
    "Funnel Building",
    "Systeme.io",
    "Sales Funnels",
    "Email Automation",
    "Web Development",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Landing Pages",
    "Conversion Optimization",
    "E-commerce",
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
