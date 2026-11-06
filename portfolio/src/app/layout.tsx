import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import ConditionalFooter from "@/components/ConditionalFooter";
import CommandMenu from "@/components/CommandMenu";

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
    default: "Muhammad Taha | Applied Data Scientist & Backend Systems Engineer",
    template: "%s | Muhammad Taha",
  },
  description:
    "Muhammad Taha is an Applied Data Scientist and Backend Systems Engineer building ML-powered APIs, data-driven systems, and production-ready applications.",
  keywords: [
    "Muhammad Taha",
    "Software Engineer Pakistan",
    "Applied Data Scientist",
    "Backend Systems Engineer",
    "Backend Engineer",
    "Machine Learning Engineer",
    "Agentic AI",
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
    "System Architecture",
    "Data Privacy",
  ],
  authors: [{ name: "Muhammad Taha", url: BASE_URL }],
  creator: "Muhammad Taha",
  publisher: "Muhammad Taha",
  // NOTE: Do NOT set a global canonical here — each page must declare its own
  // via its own metadata export to avoid Google treating all pages as duplicates.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "Muhammad Taha | Applied Data Scientist & Backend Systems Engineer",
    description:
      "Muhammad Taha is an Applied Data Scientist and Backend Systems Engineer building ML-powered APIs, data-driven systems, and production-ready applications.",
    siteName: "Muhammad Taha Portfolio",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Muhammad Taha | Applied Data Scientist & Backend Systems Engineer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Taha | Applied Data Scientist & Backend Systems Engineer",
    description:
      "Muhammad Taha is an Applied Data Scientist and Backend Systems Engineer building ML-powered APIs, data-driven systems, and production-ready applications.",
    creator: "@M_Taha093589350",
    images: [`${BASE_URL}/og-image.png`],
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
      jobTitle: "Applied Data Scientist & Backend Systems Engineer",
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
      description: "Portfolio of Muhammad Taha - Applied Data Scientist & Backend Systems Engineer building ML-powered APIs and data-driven systems.",
      author: { "@id": `${BASE_URL}/#person` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/projects?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ItemList",
      "@id": `${BASE_URL}/#sitelinks`,
      name: "Main Navigation",
      itemListElement: [
        {
          "@type": "SiteNavigationElement",
          position: 1,
          name: "About Me",
          description: "Learn about Muhammad Taha's engineering journey, philosophy, and expertise.",
          url: `${BASE_URL}/about`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 2,
          name: "Projects & Case Studies",
          description: "Explore ML models, backend APIs, and systems built by Muhammad Taha.",
          url: `${BASE_URL}/projects`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 3,
          name: "Experience",
          description: "Professional journey, roles, and engineering milestones.",
          url: `${BASE_URL}/experience`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 4,
          name: "Certifications",
          description: "Industry certifications in Machine Learning and Data Science.",
          url: `${BASE_URL}/certificates`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 5,
          name: "Contact",
          description: "Get in touch with Muhammad Taha for projects and opportunities.",
          url: `${BASE_URL}/contact`,
        },
      ],
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
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-black text-white flex flex-col min-h-screen`}
      >
        <ConditionalNavbar />
        <CommandMenu />
        <div className="flex-1">
          {children}
        </div>
        <ConditionalFooter />
      </body>
    </html>
  );
}
