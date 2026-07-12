import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // mono only used for code snippets — defer
});

const BASE_URL = "https://www.muhammadtahatech.me";

export const viewport: Viewport = {
  themeColor: "#F5C518",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Muhammad Taha | Software Engineer & Applied Data Scientist",
    template: "%s | Muhammad Taha",
  },
  description:
    "Software Engineer at UmmahTech Innovations. Applied Data Scientist & Backend Systems Engineer specializing in ML pipelines, scalable APIs, FastAPI, Node.js, and production-grade architectures.",
  keywords: [
    "Muhammad Taha",
    "Software Engineer Pakistan",
    "Applied Data Scientist",
    "Backend Engineer",
    "Machine Learning Engineer",
    "FastAPI Developer",
    "Node.js Engineer",
    "ML Deployment",
    "Data Science Pakistan",
    "Python Engineer",
    "UET Taxila",
    "UmmahTech Innovations",
    "Portfolio",
    "Full Stack Developer",
    "Express.js",
    "MongoDB",
    "React Developer",
    "Google Apps Script Automation",
    "System Architecture",
    "Data Privacy",
    "SendGrid",
    "Redis Caching",
  ],
  authors: [{ name: "Muhammad Taha", url: BASE_URL }],
  creator: "Muhammad Taha",
  publisher: "Muhammad Taha",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "Muhammad Taha | Software Engineer & Applied Data Scientist",
    description:
      "Software Engineer at UmmahTech Innovations. Building ML-powered backend systems that move from data to deployment — trained, integrated, secured, and shipped.",
    siteName: "Muhammad Taha Portfolio",
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Muhammad Taha - Applied Data Scientist & Backend Systems Engineer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Taha | Software Engineer & Applied Data Scientist",
    description:
      "Software Engineer at UmmahTech Innovations. Building ML-powered backend systems that move from data to deployment.",
    creator: "@M_Taha093589350",
    images: [`${BASE_URL}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Muhammad Taha",
      jobTitle: "Software Engineer & Applied Data Scientist",
      url: BASE_URL,
      email: "contact.taha2005@gmail.com",
      image: `${BASE_URL}/hero.png`,
      sameAs: [
        "https://github.com/MuhammadTaha1038",
        "https://www.linkedin.com/in/muhammad-taha-b88807248",
        "https://www.kaggle.com/muhammadtaha1038",
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University of Engineering and Technology, Taxila",
        url: "https://www.uettaxila.edu.pk/",
      },
      worksFor: {
        "@type": "Organization",
        name: "UmmahTech Innovations",
        url: "https://ummahtechinnovations.com/",
      },
      knowsAbout: [
        "Applied Data Science",
        "Machine Learning",
        "Backend Engineering",
        "FastAPI",
        "Node.js",
        "Express.js",
        "MongoDB",
        "React",
        "ML Deployment",
        "Python",
        "Redis",
        "REST APIs",
        "JWT Authentication",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Muhammad Taha Portfolio",
      author: { "@id": `${BASE_URL}/#person` },
    },
  ],
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
            __html: JSON.stringify(jsonLd),
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
