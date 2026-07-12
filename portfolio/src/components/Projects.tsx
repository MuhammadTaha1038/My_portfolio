"use client";

import { useState } from "react";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import { Github, CheckCircle2, ArrowUpRight, ExternalLink } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────── */
type Category = "All" | "Machine Learning" | "Data Analysis" | "Backend Development" | "Full Stack";

interface Project {
  title: string;
  description: string;
  highlights: string[];
  tags: string[];
  image: string;
  category: Exclude<Category, "All">;
  github?: string;
  live?: string;
}

/* ─── Project Data ───────────────────────────────────────────── */
const PROJECTS: Project[] = [
  /* ── Recent Projects ── */
  {
    title: "Employee Survey Invitation System",
    description:
      "An end-to-end token-driven, privacy-preserving workflow system that controls the entire employee survey lifecycle from invite generation to response mapping, instead of just sending emails.",
    highlights: [
      "Excel upload pipeline to normalize inconsistent employee data into structured records",
      "Token generation system (32-byte + hashed storage) for secure, controlled access",
      "Prefill mechanism injecting employee metadata directly into the survey flow",
      "Controlled email workflows (SendGrid + fallback) with state tracking (sent/pending/completed)",
    ],
    tags: ["Full Stack", "Workflow Automation", "SendGrid", "Data Privacy", "Token Validation"],
    image: "/projects/automated-email-sending-system.png",
    category: "Full Stack",
    github: "https://github.com/MuhammadTaha1038/Employee-Survey-Invitation-System-Case-Study.git",
  },
  {
    title: "Real-World Batch API Automation",
    description:
      "A stateful, cost-aware data ingestion system built on top of the BatchData API using Google Apps Script — engineered to solve the operational problems behind real-world data pipelines, not just fetch data.",
    highlights: [
      "Filters sheet UI layer mapping inputs to structured API payloads",
      "Multi-key deduplication (Property ID + APN + address hashing)",
      "Persistent skip-offset pagination via PropertiesService",
      "Mock Mode for credit-safe testing & custom menu for non-technical users",
    ],
    tags: ["Google Apps Script", "BatchData API", "Google Sheets", "Data Pipeline", "Automation"],
    image: "/projects/batch-data-project.png",
    category: "Data Analysis",
    github: "https://github.com/MuhammadTaha1038/Real-World-Batch-api-Automation.git",
  },

  /* ── Machine Learning ── */
  {
    title: "Credit Card Fraud Detection",
    description:
      "A complete fraud detection case study focusing on business interpretability, cost-sensitive threshold tuning, and real-world deployment considerations — not just raw accuracy metrics.",
    highlights: [
      "Business-interpretable model design",
      "Cost-sensitive threshold tuning",
      "Real-world deployment considerations",
      "End-to-end case study pipeline",
    ],
    tags: ["Python", "Scikit-learn", "Machine Learning", "Data Science"],
    image: "/projects/credit-card-fraud.png",
    category: "Machine Learning",
    github: "https://github.com/MuhammadTaha1038/Credit-Card-Fraud-Detection",
  },
  {
    title: "Customer Segmentation App",
    description:
      "End-to-end ML project performing customer segmentation using KMeans clustering, with an interactive Streamlit dashboard for real-time segment analysis and business insight extraction.",
    highlights: [
      "KMeans clustering algorithm",
      "Interactive Streamlit dashboard",
      "Real-time segment analysis",
      "Full ML-to-dashboard pipeline",
    ],
    tags: ["Python", "Scikit-learn", "Streamlit", "Unsupervised ML"],
    image: "/projects/customer-segmentation.jpg",
    category: "Machine Learning",
    github: "https://github.com/MuhammadTaha1038/Customer-Segmentation-App",
  },
  {
    title: "Survival Prediction App",
    description:
      "ML-powered web app built with Streamlit to predict survival likelihood based on age, gender, and socio-economic status — demonstrating end-to-end ML model integration into a web interface.",
    highlights: [
      "Classification model with interpretable output",
      "Streamlit web interface integration",
      "Socio-economic feature engineering",
      "Deployed ML inference pipeline",
    ],
    tags: ["Python", "Scikit-learn", "Streamlit", "ML Deployment"],
    image: "/projects/survival-prediction.png",
    category: "Machine Learning",
    github: "https://github.com/MuhammadTaha1038/CodeAlpha_Survival-Prediction-App",
  },

  /* ── Data Analysis ── */
  {
    title: "Silver Price Forecasting 2026",
    description:
      "Comprehensive analysis and forecasting project for silver prices using Yahoo Finance API historical data. Includes EDA, visualization, and a 3-month forward price prediction model.",
    highlights: [
      "Yahoo Finance API data pipeline",
      "Exploratory data analysis & visualization",
      "ML-based time-series forecasting",
      "3-month prediction horizon",
    ],
    tags: ["Python", "Time Series", "ML Forecasting", "Data Analysis"],
    image: "/projects/silver-forecasting.png",
    category: "Data Analysis",
    github: "https://github.com/MuhammadTaha1038/Silver-Price-Forecasting-2026",
  },
  {
    title: "Analysis of Crimes in Los Angeles",
    description:
      "Exploratory data analysis on a real Los Angeles crime dataset. Covers data cleaning, statistical visualization, and extraction of actionable insights into crime trends and patterns.",
    highlights: [
      "Real-world crime dataset EDA",
      "Statistical visualization & trend analysis",
      "Data cleaning and preprocessing",
      "Insight extraction from public records",
    ],
    tags: ["Python", "Pandas", "Matplotlib", "EDA"],
    image: "/projects/crimes-la.png",
    category: "Data Analysis",
    github: "https://github.com/MuhammadTaha1038/Analysis-of-Crimes-in-Los-Angeles",
  },
  {
    title: "Categorical Data Analysis",
    description:
      "Exploration of categorical data handling in Python — covering One-Hot, Label, and Ordinal encoding techniques, missing value strategies, memory optimization, and visualization best practices.",
    highlights: [
      "One-Hot, Label & Ordinal encoding",
      "Missing value handling strategies",
      "Memory optimization techniques",
      "Visualization of categorical distributions",
    ],
    tags: ["Python", "Pandas", "Scikit-learn", "Data Wrangling"],
    image: "/projects/categorical-data.png",
    category: "Data Analysis",
    github: "https://github.com/MuhammadTaha1038/Categorical-Data-Analysis",
  },
  {
    title: "Importing Data in Python",
    description:
      "Beginner-friendly Jupyter Notebook demonstrating practical data import techniques in Python — reading flat files, CSV, and structured formats using built-in methods and pandas.",
    highlights: [
      "Flat file and CSV ingestion",
      "Pandas-based data loading patterns",
      "Format-specific parsing techniques",
      "Hands-on beginner tutorial structure",
    ],
    tags: ["Python", "Pandas", "Jupyter", "Data Ingestion"],
    image: "/projects/import-python.png",
    category: "Data Analysis",
    github: "https://github.com/MuhammadTaha1038/Importing-Data-in-Python",
  },

  /* ── Backend Development ── */
  {
    title: "Market Pulse",
    description:
      "Production-grade CLO (Collateralized Loan Obligation) color data processing system for traders and analysts. Features automated scheduling, rules engine, Oracle/S3 integration, and an Angular dashboard — built as a client service project.",
    highlights: [
      "FastAPI backend with pluggable Oracle/Excel data sources",
      "AWS S3 output destination abstraction",
      "Rules engine, presets & cron job scheduling",
      "Angular 20 frontend with CLO-based column visibility",
    ],
    tags: ["Python", "FastAPI", "Angular", "Oracle DB", "AWS S3"],
    image: "/projects/market-pulse.png",
    category: "Backend Development",
    github: "https://github.com/MuhammadTaha1038/Market-Pulse",
  },

  {
    title: "Tatoo Inbox",
    description:
      "Backend system for a tattoo studio booking and inbox management platform. Handles appointment scheduling, client communication, and studio workflow management through a RESTful API architecture.",
    highlights: [
      "RESTful API for booking & appointment management",
      "Client inbox and communication system",
      "Studio workflow and scheduling logic",
      "Secure backend with authentication",
    ],
    tags: ["Node.js", "Express", "MongoDB", "REST API"],
    image: "/projects/tatoo-inbox.png",
    category: "Backend Development",
  },
  {
    title: "Make.com E-Commerce Email Pipeline",
    description:
      "Event-driven email automation system for an eCommerce business, solving the critical challenge of inbox deliverability — ensuring transactional and marketing emails bypass spam filters and reach customers reliably.",
    highlights: [
      "Webhook-driven event architecture for order & checkout triggers",
      "Klaviyo integration for structured marketing event signals",
      "Data normalization with iterators & text aggregators",
      "Fault-tolerant delivery with error handling & retry mechanisms",
    ],
    tags: ["Make.com", "Klaviyo", "Webhooks", "Automation", "Email Deliverability"],
    image: "/projects/makecom-flows.png",
    category: "Backend Development",
  },

  /* ── Full Stack ── */
  {
    title: "International Tijarat",
    description:
      "Full-stack multi-vendor e-commerce platform with admin panel, vendor dashboard, order management, and commission tracking. Production-hardened with Redis caching (85%+ hit ratio), JWT auth, and load tested at 450+ RPS sustained throughput.",
    highlights: [
      "Multi-vendor system with admin & vendor dashboards",
      "Redis caching — 85%+ hit ratio, 7.6ms avg response",
      "Load tested at 450+ RPS sustained",
      "JWT auth, rate limiting, Helmet security headers",
    ],
    tags: ["Node.js", "Express", "MongoDB", "React", "Vite", "Redis", "TailwindCSS"],
    image: "/projects/international-tijarat.png",
    category: "Full Stack",
    live: "https://internationaltijarat.com/",
    github: "https://github.com/MuhammadTaha1038/International-Tijarat",
  },
];

const CATEGORIES: Category[] = [
  "All",
  "Machine Learning",
  "Data Analysis",
  "Backend Development",
  "Full Stack",
];

/* ─── Component ─────────────────────────────────────────────── */
export default function Projects() {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 section-elevated overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 dot-bg pointer-events-none opacity-50" />
      <div className="noise-overlay" />
      <div className="absolute top-40 -left-40 w-[350px] h-[350px] bg-accent/3 rounded-full blur-[100px] pointer-events-none" />

      {/* Top divider */}
      <div className="section-divider" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-8">
        <AnimatedSection>
          <SectionHeading
            label="Projects"
            title="Engineering Projects"
            description="Production-first thinking across ML systems, data analysis, backend APIs, and full-stack platforms."
          />
        </AnimatedSection>

        {/* ── Category Tabs ── */}
        <AnimatedSection delay={0.05}>
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  active === cat
                    ? "bg-accent text-black border-accent"
                    : "bg-black/30 text-text-muted border-border hover:border-accent/40 hover:text-text-primary"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span
                    className={`ml-1.5 text-xs ${
                      active === cat ? "text-black/60" : "text-text-muted"
                    }`}
                  >
                    ({PROJECTS.filter((p) => p.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* ── Project Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {filtered.map((project, i) => (
            <AnimatedSection key={project.title} delay={i * 0.07}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Project Card ───────────────────────────────────────────── */
function ProjectCard({ project }: { project: Project }) {
  const isLive = !!project.live;
  
  // SEO-optimized alt text
  const imageAltText = `${project.title} - ${project.category} Project built with ${project.tags.slice(0, 3).join(', ')}`;

  return (
    <div className="group h-full flex flex-col glass-card rounded-2xl relative overflow-hidden gradient-border">
      {/* ── Banner Image ── */}
      <div className="relative h-48 overflow-hidden bg-black/40">
        <Image
          src={project.image}
          alt={imageAltText}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Category badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full border border-accent/20 text-accent text-[10px] font-mono tracking-wide">
          {project.category}
        </div>

        {/* Live site hover overlay (Full Stack) */}
        {isLive && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Visit live site"
          >
            <div className="flex items-center gap-2 px-4 py-2.5 bg-accent text-black font-semibold text-sm rounded-full shadow-lg">
              <span>Visit Site</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </a>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-grow p-5 md:p-6">
        {/* Title + action icons */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base md:text-lg font-semibold group-hover:text-accent transition-colors leading-snug">
            {isLive ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h3>

          <div className="flex gap-1.5 shrink-0 mt-0.5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg border border-border hover:border-accent/40 hover:text-accent hover:bg-accent/5 transition-all text-text-muted"
                aria-label="GitHub repository"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg border border-accent/30 text-accent hover:bg-accent/10 transition-all"
                aria-label="Live site"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        <p className="text-text-secondary text-sm mb-4 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-2 mb-5 flex-grow">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-xs text-text-muted">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-[10px] font-mono text-accent/80 bg-accent/5 rounded-full border border-accent/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
