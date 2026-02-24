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

const BASE_URL = "https://muhammadtaha.dev";

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
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Taha — Software Engineer & Applied Data Scientist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Taha | Software Engineer & Applied Data Scientist",
    description:
      "Software Engineer at UmmahTech Innovations. Building ML-powered backend systems that move from data to deployment.",
    images: ["/og-image.png"],
    creator: "@M_Taha093589350",
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Muhammad Taha",
              jobTitle: "Applied Data Scientist & Backend Systems Engineer",
              url: "https://muhammadtaha.dev",
              sameAs: [
                "https://github.com/MuhammadTaha1038",
                "https://www.linkedin.com/in/muhammad-taha-b88807248",
                "https://www.kaggle.com/muhammadtaha1038",
              ],
              knowsAbout: [
                "Applied Data Science",
                "Machine Learning",
                "Backend Engineering",
                "FastAPI",
                "Django",
                "ML Deployment",
                "Python",
                "Feature Engineering",
                "Scikit-learn",
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
