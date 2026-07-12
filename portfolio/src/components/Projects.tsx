"use client";

import { useState } from "react";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import { Github, CheckCircle2, ArrowUpRight, ExternalLink, LayoutGrid, Presentation } from "lucide-react";

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
  const [viewMode, setViewMode] = useState<"featured" | "grid">("featured");
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const filtered =
    active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  // Safety catch if featuredIndex is out of bounds after category change
  const currentFeatured = filtered[featuredIndex] || filtered[0];

  const handleCategoryChange = (cat: Category) => {
    setActive(cat);
    setFeaturedIndex(0); // Reset featured index when changing categories
  };

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

        {/* ── Controls Row (Categories & View Toggle) ── */}
        <AnimatedSection delay={0.05}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
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

            {/* View Mode Toggle */}
            <div className="flex items-center bg-black/40 border border-border rounded-full p-1 shrink-0">
              <button
                onClick={() => setViewMode("featured")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition-colors ${
                  viewMode === "featured"
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                <Presentation className="w-4 h-4" />
                <span>Featured</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition-colors ${
                  viewMode === "grid"
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Grid View</span>
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* ── Layout Modes ── */}
        {viewMode === "featured" ? (
          <div className="flex flex-col gap-8 animate-in fade-in zoom-in-95 duration-500">
            {/* Massive Hero Card for Featured Project */}
            {currentFeatured && (
              <FeaturedProjectCard project={currentFeatured} />
            )}

            {/* Horizontal Scroller for remaining projects in category */}
            {filtered.length > 1 && (
              <div className="mt-4">
                <h4 className="text-sm font-mono text-text-muted mb-4 uppercase tracking-widest pl-2 border-l-2 border-accent/30">
                  More in {active}
                </h4>
                <div className="flex overflow-x-auto gap-4 pb-6 scrollbar-hide snap-x">
                  {filtered.map((project, idx) => (
                    <button
                      key={project.title}
                      onClick={() => setFeaturedIndex(idx)}
                      className={`relative flex-shrink-0 w-[280px] h-[120px] rounded-xl overflow-hidden group border-2 transition-all snap-start text-left ${
                        idx === featuredIndex
                          ? "border-accent ring-2 ring-accent/20"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors" />
                      <div className="absolute inset-0 p-4 flex flex-col justify-end">
                        <span className="text-xs font-mono text-accent mb-1 drop-shadow-md">
                          {project.category}
                        </span>
                        <h5 className="font-semibold text-sm leading-tight line-clamp-2 drop-shadow-md">
                          {project.title}
                        </h5>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Grid View */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 animate-in fade-in slide-in-from-bottom-8 duration-500">
            {filtered.map((project, i) => (
              <AnimatedSection key={project.title} delay={i * 0.05}>
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Featured Project Hero Card ──────────────────────────────── */
function FeaturedProjectCard({ project }: { project: Project }) {
  const isLive = !!project.live;

  return (
    <div className="flex flex-col lg:flex-row glass-card rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl relative gradient-border">
      {/* Left: Image Showcase */}
      <div className="lg:w-[55%] relative min-h-[300px] lg:min-h-[450px] bg-black/50 group">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/90" />
        
        {/* Category Floating Badge */}
        <div className="absolute top-6 left-6 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-accent/30 text-accent text-xs font-mono tracking-widest shadow-xl">
          {project.category}
        </div>
      </div>

      {/* Right: Content Details */}
      <div className="lg:w-[45%] p-8 lg:p-12 flex flex-col justify-center relative bg-black/80 backdrop-blur-sm z-10">
        <h3 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight leading-tight">
          {project.title}
        </h3>
        <p className="text-text-secondary text-base lg:text-lg mb-8 leading-relaxed">
          {project.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-4 mb-10">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-3 text-sm text-text-primary/90">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span className="leading-snug">{h}</span>
            </li>
          ))}
        </ul>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-10">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-mono text-accent/90 bg-accent/10 rounded-lg border border-accent/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mt-auto">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-accent text-black font-semibold rounded-xl hover:bg-accent/90 transition-all shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5"
            >
              <span>View Live Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-border rounded-xl hover:border-accent hover:text-accent transition-all hover:bg-accent/5"
            >
              <Github className="w-4 h-4" />
              <span>Source Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
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
