const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const PROJECTS = [
  {
    title: "International Tijarat",
    description: "Full-stack multi-vendor e-commerce platform with admin panel, vendor dashboard, order management, and commission tracking. Production-hardened with Redis caching (85%+ hit ratio), JWT auth, and load tested at 450+ RPS sustained throughput.",
    highlights: ["Multi-vendor system with admin & vendor dashboards", "Redis caching — 85%+ hit ratio, 7.6ms avg response", "Load tested at 450+ RPS sustained", "JWT auth, rate limiting, Helmet security headers"],
    tags: ["Node.js", "Express", "MongoDB", "React", "Vite", "Redis", "TailwindCSS"],
    image: "/projects/international-tijarat.png",
    category: "Full Stack",
    live: "https://internationaltijarat.com/",
    github: "https://github.com/MuhammadTaha1038/International-Tijarat",
  },
  {
    title: "Market Pulse",
    description: "Production-grade CLO (Collateralized Loan Obligation) color data processing system for traders and analysts. Features automated scheduling, rules engine, Oracle/S3 integration, and an Angular dashboard — built as a client service project.",
    highlights: ["FastAPI backend with pluggable Oracle/Excel data sources", "AWS S3 output destination abstraction", "Rules engine, presets & cron job scheduling", "Angular 20 frontend with CLO-based column visibility"],
    tags: ["Python", "FastAPI", "Angular", "Oracle DB", "AWS S3"],
    image: "/projects/market-pulse.png",
    category: "Backend Development",
    github: "https://github.com/MuhammadTaha1038/Market-Pulse",
  },
  {
    title: "Employee Survey Invitation System",
    description: "An end-to-end token-driven, privacy-preserving workflow system that controls the entire employee survey lifecycle from invite generation to response mapping, instead of just sending emails.",
    highlights: ["Excel upload pipeline to normalize inconsistent employee data into structured records", "Token generation system (32-byte + hashed storage) for secure, controlled access", "Prefill mechanism injecting employee metadata directly into the survey flow", "Controlled email workflows (SendGrid + fallback) with state tracking (sent/pending/completed)"],
    tags: ["Full Stack", "Workflow Automation", "SendGrid", "Data Privacy", "Token Validation"],
    image: "/projects/automated-email-sending-system.png",
    category: "Full Stack",
    github: "https://github.com/MuhammadTaha1038/Employee-Survey-Invitation-System-Case-Study.git",
  },
  {
    title: "Real-World Batch API Automation",
    description: "A stateful, cost-aware data ingestion system built on top of the BatchData API using Google Apps Script — engineered to solve the operational problems behind real-world data pipelines, not just fetch data.",
    highlights: ["Filters sheet UI layer mapping inputs to structured API payloads", "Multi-key deduplication (Property ID + APN + address hashing)", "Persistent skip-offset pagination via PropertiesService", "Mock Mode for credit-safe testing & custom menu for non-technical users"],
    tags: ["Google Apps Script", "BatchData API", "Google Sheets", "Data Pipeline", "Automation"],
    image: "/projects/batch-data-project.png",
    category: "Data Analysis",
    github: "https://github.com/MuhammadTaha1038/Real-World-Batch-api-Automation.git",
  },
  {
    title: "Tasty Bytes: Recipe Site Traffic Prediction",
    description: "A precision-first machine learning project that predicts whether a recipe is likely to generate high traffic. Combines data quality work, exploratory analysis, model comparison, and business-driven threshold optimization to achieve over 95% precision for homepage recipe selection.",
    highlights: ["Binary classification for high-traffic prediction", "Logistic Regression threshold optimized to 0.66", "Precision prioritized over accuracy (95.92% precision achieved)", "End-to-end exploratory analysis and model comparison"],
    tags: ["Machine Learning", "Python", "Data Analysis", "Predictive Modeling"],
    image: "/projects/tasty_bytes.png",
    category: "Machine Learning",
    github: "https://github.com/MuhammadTaha1038/Predicting-Recipe-Site-Traffic",
  },
  {
    title: "Customer Segmentation App",
    description: "End-to-end ML project performing customer segmentation using KMeans clustering, with an interactive Streamlit dashboard for real-time segment analysis and business insight extraction.",
    highlights: ["KMeans clustering algorithm", "Interactive Streamlit dashboard", "Real-time segment analysis", "Full ML-to-dashboard pipeline"],
    tags: ["Python", "Scikit-learn", "Streamlit", "Unsupervised ML"],
    image: "/projects/customer-segmentation.jpg",
    category: "Machine Learning",
    github: "https://github.com/MuhammadTaha1038/Customer-Segmentation-App",
  },
  {
    title: "Categorical Data Analysis",
    description: "Exploration of categorical data handling in Python — covering One-Hot, Label, and Ordinal encoding techniques, missing value strategies, memory optimization, and visualization best practices.",
    highlights: ["One-Hot, Label & Ordinal encoding", "Missing value handling strategies", "Memory optimization techniques", "Visualization of categorical distributions"],
    tags: ["Python", "Pandas", "Scikit-learn", "Data Wrangling"],
    image: "/projects/categorical-data.png",
    category: "Data Analysis",
    github: "https://github.com/MuhammadTaha1038/Categorical-Data-Analysis",
  },
  {
    title: "Make.com E-Commerce Email Pipeline",
    description: "Event-driven email automation system for an eCommerce business, solving the critical challenge of inbox deliverability — ensuring transactional and marketing emails bypass spam filters and reach customers reliably.",
    highlights: ["Webhook-driven event architecture for order & checkout triggers", "Klaviyo integration for structured marketing event signals", "Data normalization with iterators & text aggregators", "Fault-tolerant delivery with error handling & retry mechanisms"],
    tags: ["Make.com", "Klaviyo", "Webhooks", "Automation", "Email Deliverability"],
    image: "/projects/makecom-flows.png",
    category: "Backend Development",
  },
  {
    title: "Credit Card Fraud Detection",
    description: "A complete fraud detection case study focusing on business interpretability, cost-sensitive threshold tuning, and real-world deployment considerations — not just raw accuracy metrics.",
    highlights: ["Business-interpretable model design", "Cost-sensitive threshold tuning", "Real-world deployment considerations", "End-to-end case study pipeline"],
    tags: ["Python", "Scikit-learn", "Machine Learning", "Data Science"],
    image: "/projects/credit-card-fraud.png",
    category: "Machine Learning",
    github: "https://github.com/MuhammadTaha1038/Credit-Card-Fraud-Detection",
  },
  {
    title: "Survival Prediction App",
    description: "ML-powered web app built with Streamlit to predict survival likelihood based on age, gender, and socio-economic status — demonstrating end-to-end ML model integration into a web interface.",
    highlights: ["Classification model with interpretable output", "Streamlit web interface integration", "Socio-economic feature engineering", "Deployed ML inference pipeline"],
    tags: ["Python", "Scikit-learn", "Streamlit", "ML Deployment"],
    image: "/projects/survival-prediction.png",
    category: "Machine Learning",
    github: "https://github.com/MuhammadTaha1038/CodeAlpha_Survival-Prediction-App",
  },
  {
    title: "Silver Price Forecasting 2026",
    description: "Comprehensive analysis and forecasting project for silver prices using Yahoo Finance API historical data. Includes EDA, visualization, and a 3-month forward price prediction model.",
    highlights: ["Yahoo Finance API data pipeline", "Exploratory data analysis & visualization", "ML-based time-series forecasting", "3-month prediction horizon"],
    tags: ["Python", "Time Series", "ML Forecasting", "Data Analysis"],
    image: "/projects/silver-forecasting.png",
    category: "Data Analysis",
    github: "https://github.com/MuhammadTaha1038/Silver-Price-Forecasting-2026",
  },
  {
    title: "Analysis of Crimes in Los Angeles",
    description: "Exploratory data analysis on a real Los Angeles crime dataset. Covers data cleaning, statistical visualization, and extraction of actionable insights into crime trends and patterns.",
    highlights: ["Real-world crime dataset EDA", "Statistical visualization & trend analysis", "Data cleaning and preprocessing", "Insight extraction from public records"],
    tags: ["Python", "Pandas", "Matplotlib", "EDA"],
    image: "/projects/crimes-la.png",
    category: "Data Analysis",
    github: "https://github.com/MuhammadTaha1038/Analysis-of-Crimes-in-Los-Angeles",
  },
  {
    title: "Importing Data in Python",
    description: "Beginner-friendly Jupyter Notebook demonstrating practical data import techniques in Python — reading flat files, CSV, and structured formats using built-in methods and pandas.",
    highlights: ["Flat file and CSV ingestion", "Pandas-based data loading patterns", "Format-specific parsing techniques", "Hands-on beginner tutorial structure"],
    tags: ["Python", "Pandas", "Jupyter", "Data Ingestion"],
    image: "/projects/import-python.png",
    category: "Data Analysis",
    github: "https://github.com/MuhammadTaha1038/Importing-Data-in-Python",
  },
  {
    title: "Tatoo Inbox",
    description: "Backend system for a tattoo studio booking and inbox management platform. Handles appointment scheduling, client communication, and studio workflow management through a RESTful API architecture.",
    highlights: ["RESTful API for booking & appointment management", "Client inbox and communication system", "Studio workflow and scheduling logic", "Secure backend with authentication"],
    tags: ["Node.js", "Express", "MongoDB", "REST API"],
    image: "/projects/tatoo-inbox.png",
    category: "Backend Development",
  }
];

async function main() {
  console.log("Seeding existing projects into Neon PostgreSQL...");
  for (const project of PROJECTS) {
    await prisma.project.create({
      data: {
        title: project.title,
        description: project.description,
        category: project.category,
        image: project.image,
        highlights: project.highlights || [],
        tags: project.tags || [],
        github: project.github || null,
        live: project.live || null
      }
    });
  }
  console.log(`Successfully inserted ${PROJECTS.length} projects!`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
