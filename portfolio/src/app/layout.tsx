import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Taha | Backend & Decision Systems Engineer",
  description:
    "Backend & Decision Systems Engineer specializing in scalable APIs, intelligent decision engines, and production-grade architecture.",
  keywords: [
    "Backend Engineer",
    "Decision Systems Engineer",
    "FastAPI Developer",
    "ML Deployment Engineer",
    "API Architect",
    "Pakistan",
  ],
  authors: [{ name: "Muhammad Taha" }],
  creator: "Muhammad Taha",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Muhammad Taha | Backend & Decision Systems Engineer",
    description:
      "Designing scalable backend systems and intelligent decision engines for production environments.",
    siteName: "Muhammad Taha Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Taha | Backend & Decision Systems Engineer",
    description:
      "Designing scalable backend systems and intelligent decision engines for production environments.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Muhammad Taha",
              jobTitle: "Backend & Decision Systems Engineer",
              url: "https://muhammadtaha.dev",
              sameAs: [
                "https://github.com/muhammadtaha",
                "https://linkedin.com/in/muhammadtaha",
              ],
              knowsAbout: [
                "Backend Engineering",
                "FastAPI",
                "Django",
                "Machine Learning",
                "API Architecture",
                "Decision Systems",
                "Python",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-black text-white`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
