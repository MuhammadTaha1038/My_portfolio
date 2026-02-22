"use client";

import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import { Github, CheckCircle2, ArrowUpRight, ExternalLink, Layers } from "lucide-react";

const PROJECTS = [
  {
    number: "01",
    title: "Economic Decision Intelligence Engine",
    description:
      "Backend-driven system implementing economic modeling logic for scenario-based outcome generation. Handles complex decision trees and produces structured outputs.",
    highlights: [
      "Modular decision logic system",
      "Backend evaluation pipelines",
      "Structured result orchestration",
      "Scalable architecture design",
    ],
    tags: ["Python", "FastAPI", "Decision Systems", "Backend"],
    github: "#",
    featured: true,
  },
  {
    number: "02",
    title: "Reward Vault & Payout Backend",
    description:
      "Secure payout validation system with balance verification and transaction signing logic.",
    highlights: [
      "FastAPI-based architecture",
      "Payout validation limits",
      "Vault balance integrity checks",
      "Transaction signing mechanism",
    ],
    tags: ["FastAPI", "PostgreSQL", "Security", "Authentication"],
    github: "#",
    featured: true,
  },
  {
    number: "03",
    title: "ML-Based Business Prediction System",
    description:
      "End-to-end ML pipeline wrapped inside API for real-time inference and business predictions.",
    highlights: [
      "Data preprocessing pipeline",
      "Feature engineering",
      "Model evaluation pipeline",
      "FastAPI inference endpoint",
    ],
    tags: ["Scikit-learn", "FastAPI", "Pandas", "ML Deployment"],
    github: "#",
    featured: false,
  },
  {
    number: "04",
    title: "Location-Based Property Search System",
    description:
      "Geolocation-aware property filtering system integrated into Laravel backend.",
    highlights: [
      "Location-based query optimization",
      "Distance filtering logic",
      "Backend query efficiency improvements",
    ],
    tags: ["Laravel", "PostgreSQL", "Geolocation", "API"],
    github: "#",
    featured: false,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32 section-elevated overflow-hidden">
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
            title="Selected Engineering Projects"
            description="Systems built with production-first thinking and real-world constraints."
          />
        </AnimatedSection>

        {/* Featured Projects (Larger) */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {PROJECTS.filter((p) => p.featured).map((project, i) => (
            <AnimatedSection key={project.title} delay={i * 0.12}>
              <div className="group h-full flex flex-col glass-card rounded-2xl relative overflow-hidden gradient-border">
                {/* Project Image Placeholder / Header Banner */}
                <div className="relative h-48 md:h-56 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent overflow-hidden">
                  <div className="absolute inset-0 grid-bg opacity-70" />
                  {/* Large floating number */}
                  <span className="absolute right-6 top-4 text-[100px] font-bold text-accent/[0.06] leading-none font-mono select-none">
                    {project.number}
                  </span>
                  {/* Icon */}
                  <div className="absolute bottom-6 left-6">
                    <div className="p-3 rounded-xl bg-black/40 backdrop-blur-sm border border-accent/20 text-accent">
                      <Layers className="w-6 h-6" />
                    </div>
                  </div>
                  {/* Project number tag */}
                  <div className="absolute top-6 left-6 px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full border border-accent/20 text-accent text-xs font-mono">
                    Project {project.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-6 md:p-8">
                  {/* Title + links */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h3 className="text-xl md:text-2xl font-semibold group-hover:text-accent transition-colors leading-tight">
                      {project.title}
                    </h3>
                    <div className="flex gap-2 shrink-0">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-border hover:border-accent/30 hover:text-accent hover:bg-accent/5 transition-all text-text-muted"
                        aria-label="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href="#"
                        className="p-2 rounded-lg border border-border hover:border-accent/30 hover:text-accent hover:bg-accent/5 transition-all text-text-muted"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2.5 mb-6 flex-grow">
                    {project.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2.5 text-sm text-text-muted"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-5 border-t border-white/[0.06]">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-mono text-accent/80 bg-accent/5 rounded-full border border-accent/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Non-featured Projects (Smaller) */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {PROJECTS.filter((p) => !p.featured).map((project, i) => (
            <AnimatedSection key={project.title} delay={i * 0.1 + 0.2}>
              <div className="group h-full flex flex-col glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
                {/* Background number */}
                <span className="absolute -right-2 -top-4 text-[100px] font-bold text-white/[0.02] select-none pointer-events-none leading-none font-mono">
                  {project.number}
                </span>

                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <span className="text-accent font-mono text-sm font-bold mt-1">
                      {project.number}
                    </span>
                    <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-border hover:border-accent/30 hover:text-accent hover:bg-accent/5 transition-all text-text-muted shrink-0"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-text-secondary text-sm mb-5 leading-relaxed">
                  {project.description}
                </p>

                <ul className="space-y-2 mb-5 flex-grow">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm text-text-muted"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-mono text-accent/80 bg-accent/5 rounded-full border border-accent/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
