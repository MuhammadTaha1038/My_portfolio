"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import { Github, CheckCircle2, ArrowUpRight, ExternalLink, Presentation, ChevronDown, ChevronUp, BookOpen, Layers } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────── */
type Category = "All" | "Machine Learning" | "Data Analysis" | "Backend Development" | "Full Stack";

interface Project {
  title: string;
  description: string;
  highlights: string[];
  tags: string[];
  image: string;
  category: string;
  id?: string;
  slug?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  github?: string | null;
  live?: string | null;
  tier?: number; // 1: Featured, 2: Selected, 3: Experiment
}

const CATEGORIES: Category[] = [
  "All",
  "Machine Learning",
  "Data Analysis",
  "Backend Development",
  "Full Stack",
];

/* ─── Component ─────────────────────────────────────────────── */
export default function ProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  const [active, setActive] = useState<Category>("All");
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const filtered = active === "All" ? initialProjects : initialProjects.filter((p) => p.category === active);

  // Group by Tiers
  const tier1 = filtered.filter(p => p.tier === 1);
  const tier2 = filtered.filter(p => p.tier === 2 || p.tier === undefined);
  const tier3 = filtered.filter(p => p.tier === 3);

  const currentFeatured = tier1[featuredIndex] || tier1[0];

  const handleCategoryChange = (cat: Category) => {
    setActive(cat);
    setFeaturedIndex(0);
  };

  // Auto-play the featured projects
  useEffect(() => {
    if (tier1.length <= 1) return;
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % tier1.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [tier1.length, featuredIndex]);

  return (
    <section
      id="projects"
      className="section-padding"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="container-content">
        <AnimatedSection>
          <SectionHeading
            label="Projects"
            title="Engineering Work"
            description="From ML models to production-ready APIs."
          />
        </AnimatedSection>

        {/* ── Controls Row (Categories) ── */}
        <AnimatedSection delay={0.05}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className="px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium transition-colors border"
                  style={{
                    backgroundColor: active === cat ? "var(--color-surface-2)" : "transparent",
                    color: active === cat ? "var(--color-text)" : "var(--color-text-muted)",
                    borderColor: active === cat ? "var(--color-border-hover)" : "var(--color-border)",
                  }}
                  onMouseEnter={(e) => {
                    if (active !== cat) {
                      e.currentTarget.style.borderColor = "var(--color-border-hover)";
                      e.currentTarget.style.color = "var(--color-text)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (active !== cat) {
                      e.currentTarget.style.borderColor = "var(--color-border)";
                      e.currentTarget.style.color = "var(--color-text-muted)";
                    }
                  }}
                >
                  {cat}
                  {cat !== "All" && (
                    <span
                      className="ml-1.5 text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      ({initialProjects.filter((p) => p.category === cat).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <div className="flex flex-col gap-16">
          {/* ── Tier 1: Featured Projects ── */}
          {tier1.length > 0 && (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              <div className="flex items-center gap-2 mb-6" style={{ color: "var(--color-text)" }}>
                <Presentation className="w-5 h-5" />
                <h3 className="text-xl font-bold tracking-wide">Featured Work</h3>
              </div>
              
              {currentFeatured && <FeaturedProjectCard project={currentFeatured} />}

              {/* Horizontal Scroller for remaining tier 1 projects */}
              {tier1.length > 1 && (
                <div className="mt-4">
                  <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide snap-x">
                    {tier1.map((project, idx) => (
                      <button
                         key={project.title}
                         onClick={() => setFeaturedIndex(idx)}
                         className="relative flex-shrink-0 w-[220px] h-[124px] rounded-[var(--radius-md)] overflow-hidden group border transition-all snap-start text-left"
                         style={{
                           borderColor: idx === featuredIndex ? "var(--color-border-hover)" : "var(--color-border)",
                           opacity: idx === featuredIndex ? 1 : 0.6,
                         }}
                         onMouseEnter={(e) => { if (idx !== featuredIndex) e.currentTarget.style.opacity = "1"; }}
                         onMouseLeave={(e) => { if (idx !== featuredIndex) e.currentTarget.style.opacity = "0.6"; }}
                      >
                        <Image src={project.image} alt={project.title} fill className="object-cover object-top" />
                        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors" />
                        <div className="absolute inset-0 p-4 flex flex-col justify-end">
                          <span className="text-eyebrow mb-1">{project.category}</span>
                          <h5 className="font-semibold text-sm leading-tight line-clamp-2" style={{ color: "var(--color-text)" }}>{project.title}</h5>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Tier 2: Selected Projects ── */}
          {tier2.length > 0 && (
            <AnimatedSection delay={0.1}>
              <div className="flex items-center gap-2 mb-6 pb-4" style={{ color: "var(--color-text)", borderBottom: "1px solid var(--color-border)" }}>
                <Layers className="w-5 h-5" />
                <h3 className="text-xl font-bold tracking-wide">Selected Projects</h3>
              </div>
              
              {/* Mobile: Horizontal Scroll | Desktop: Grid */}
              <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 pb-6 md:pb-0 scrollbar-hide snap-x md:snap-none w-full">
                {tier2.map((project) => (
                  <div key={project.title} className="w-[85vw] md:w-auto shrink-0 snap-center md:snap-align-none h-full">
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* ── Tier 3: Experiments ── */}
          {tier3.length > 0 && (
            <AnimatedSection delay={0.2}>
              <div className="flex items-center gap-2 mb-6 pb-4" style={{ color: "var(--color-text)", borderBottom: "1px solid var(--color-border)" }}>
                <Github className="w-5 h-5" />
                <h3 className="text-lg font-semibold tracking-wide">Experiments & Scripts</h3>
              </div>
              <div className="flex flex-col gap-3">
                {tier3.map((project) => (
                  <MinimalProjectCard key={project.title} project={project} />
                ))}
              </div>
            </AnimatedSection>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20" style={{ color: "var(--color-text-muted)" }}>
              No projects found in this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Featured Project Hero Card (Tier 1) ──────────────────────────────── */
function FeaturedProjectCard({ project }: { project: Project }) {
  const [showDetails, setShowDetails] = useState(false);
  const linkHref = project.slug ? `/projects/${project.slug}` : (project.live || project.github || "#");

  return (
    <div
      className="flex flex-col overflow-hidden transition-all duration-500"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
      }}
    >
      <div className="relative w-full aspect-video lg:aspect-[21/8] bg-black group flex items-center justify-center p-3 lg:p-6">
        <Link
          href={linkHref}
          className="relative w-full h-full overflow-hidden block"
          style={{
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border)",
          }}
        >
          <Image src={project.image} alt={project.title} fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" priority quality={85} />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-5 left-5 lg:bottom-6 lg:left-6 right-8 flex flex-col items-start gap-3 z-20">
          {!showDetails && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 pointer-events-none">
              <h3 className="text-xl lg:text-3xl font-bold tracking-tight leading-tight" style={{ color: "var(--color-text)" }}>
                {project.title}
              </h3>
            </div>
          )}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 btn btn-ghost"
            style={{ height: "36px", fontSize: "13px", background: "var(--color-surface)" }}
          >
            {showDetails ? (
              <><span className="hidden sm:inline">Hide Details</span><ChevronUp className="w-4 h-4" /></>
            ) : (
              <><span className="hidden sm:inline">View Details</span><ChevronDown className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </div>
      {showDetails && (
        <div
          className="w-full p-6 lg:p-12 animate-in slide-in-from-top-4 fade-in duration-300"
          style={{
            background: "var(--color-surface-2)",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <h3 className="text-2xl lg:text-4xl font-bold mb-4 tracking-tight leading-tight" style={{ color: "var(--color-text)" }}>{project.title}</h3>
          <p className="text-sm lg:text-lg mb-8 leading-relaxed max-w-4xl" style={{ color: "var(--color-text-secondary)" }}>{project.description}</p>
          <ul className="space-y-4 mb-10 max-w-4xl">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm" style={{ color: "var(--color-text)" }}>
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--color-text-secondary)" }} />
                <span className="leading-snug">{h}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.map((tag) => (
              <span key={tag} className="chip">{tag}</span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {project.slug && (
              <Link href={`/projects/${project.slug}`} className="btn btn-primary">
                <BookOpen className="w-4 h-4" /><span>Read Case Study</span>
              </Link>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Github className="w-4 h-4" /><span>Code</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Project Card (Tier 2) ───────────────────────────────────────────── */
function ProjectCard({ project }: { project: Project }) {
  const imageAltText = `${project.title} - ${project.category} Project built with ${project.tags.slice(0, 3).join(', ')}`;
  const linkHref = project.slug ? `/projects/${project.slug}` : (project.live || project.github || "#");

  return (
    <div
      className="group h-full flex flex-col relative overflow-hidden transition-all duration-150"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-border-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
    >
      <div className="relative h-48 overflow-hidden bg-black/40">
        <Image src={project.image} alt={imageAltText} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full text-[10px] font-mono tracking-wide" style={{ border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}>{project.category}</div>
        {project.slug && (
          <Link href={linkHref} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="btn btn-primary" style={{ height: "36px", fontSize: "13px" }}>
              <BookOpen className="w-4 h-4" /><span>Case Study</span>
            </div>
          </Link>
        )}
      </div>
      <div className="flex flex-col flex-grow p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base md:text-lg font-semibold transition-colors leading-snug">
            <Link
              href={linkHref}
              style={{ color: "var(--color-text)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text)")}
            >
              {project.title}
            </Link>
          </h3>
          <div className="flex gap-1.5 shrink-0 mt-0.5">
            {project.github && (
              <a
                href={project.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-[var(--radius-sm)] border transition-colors"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-border-hover)"; e.currentTarget.style.color = "var(--color-text)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.color = "var(--color-text-muted)"; }}
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-[var(--radius-sm)] border transition-colors"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-border-hover)"; e.currentTarget.style.color = "var(--color-text)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.color = "var(--color-text-muted)"; }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
        <p className="text-sm mb-4 leading-relaxed line-clamp-3" style={{ color: "var(--color-text-secondary)" }}>{project.description}</p>
        <div className="flex flex-wrap gap-1.5 pt-4 mt-auto" style={{ borderTop: "1px solid var(--color-border)" }}>
          {project.tags.slice(0,4).map((tag) => (
            <span key={tag} className="chip">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Minimal Project Card (Tier 3) ───────────────────────────────────────────── */
function MinimalProjectCard({ project }: { project: Project }) {
  const linkHref = project.slug ? `/projects/${project.slug}` : (project.live || project.github || "#");
  
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 transition-colors"
      style={{
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--color-border)",
        background: "var(--color-surface)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-border-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
    >
      <div>
        <h4 className="font-semibold transition-colors">
          <Link
            href={linkHref}
            style={{ color: "var(--color-text)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text)")}
          >
            {project.title}
          </Link>
        </h4>
        <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>{project.description}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {project.tags.slice(0,2).map(tag => (
           <span key={tag} className="chip hidden sm:inline-flex">{tag}</span>
        ))}
        {project.github && (
          <a
            href={project.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-[var(--radius-sm)] border transition-colors"
            style={{ borderColor: "transparent", color: "var(--color-text-muted)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-border-hover)"; e.currentTarget.style.color = "var(--color-text)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.color = "var(--color-text-muted)"; }}
          >
            <Github className="w-4 h-4" />
          </a>
        )}
        {project.slug && (
          <Link
            href={linkHref}
            className="flex items-center justify-center w-8 h-8 rounded-[var(--radius-sm)] border transition-colors"
            style={{ borderColor: "transparent", color: "var(--color-text-muted)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-border-hover)"; e.currentTarget.style.color = "var(--color-text)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.color = "var(--color-text-muted)"; }}
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
