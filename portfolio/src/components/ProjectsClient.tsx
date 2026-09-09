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
      className="relative pt-12 pb-16 md:pt-16 md:pb-24 section-elevated overflow-hidden"
    >
      <div className="absolute inset-0 dot-bg pointer-events-none opacity-50" />
      <div className="noise-overlay" />
      <div className="absolute top-40 -left-40 w-[350px] h-[350px] bg-accent/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-divider" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-8">
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
              <div className="flex items-center gap-2 mb-6 text-accent">
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
                        className={`relative flex-shrink-0 w-[220px] h-[124px] rounded-xl overflow-hidden group border-2 transition-all snap-start text-left ${
                          idx === featuredIndex
                            ? "border-accent ring-2 ring-accent/20"
                            : "border-transparent opacity-50 hover:opacity-100"
                        }`}
                      >
                        <Image src={project.image} alt={project.title} fill className="object-cover object-top" />
                        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors" />
                        <div className="absolute inset-0 p-4 flex flex-col justify-end">
                          <span className="text-xs font-mono text-accent mb-1 drop-shadow-md">{project.category}</span>
                          <h5 className="font-semibold text-sm leading-tight line-clamp-2 drop-shadow-md">{project.title}</h5>
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
              <div className="flex items-center gap-2 mb-6 text-white/90 border-b border-white/5 pb-4">
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
              <div className="flex items-center gap-2 mb-6 text-white/70 border-b border-white/5 pb-4">
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
            <div className="text-center py-20 text-text-muted">
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
    <div className="flex flex-col glass-card rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl relative gradient-border transition-all duration-500">
      <div className="relative w-full aspect-video lg:aspect-[21/8] bg-[#050505] group flex items-center justify-center p-3 lg:p-6">
        <Link href={linkHref} className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/5 cursor-pointer block">
          <Image src={project.image} alt={project.title} fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" priority quality={85} />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-5 left-5 lg:bottom-6 lg:left-6 right-8 flex flex-col items-start gap-3 z-20">
          {!showDetails && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 pointer-events-none">
              <h3 className="text-xl lg:text-3xl font-bold tracking-tight leading-tight text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                {project.title}
              </h3>
            </div>
          )}
          <button onClick={() => setShowDetails(!showDetails)} className="flex items-center gap-2 px-5 py-2 glass-panel rounded-full text-sm font-medium hover:text-accent interactive-element shadow-lg">
            {showDetails ? (
              <><span className="hidden sm:inline">Hide Details</span><ChevronUp className="w-4 h-4 text-accent" /></>
            ) : (
              <><span className="hidden sm:inline">View Details</span><ChevronDown className="w-4 h-4 text-accent" /></>
            )}
          </button>
        </div>
      </div>
      {showDetails && (
        <div className="w-full p-6 lg:p-12 bg-black/95 backdrop-blur-xl border-t border-white/10 animate-in slide-in-from-top-4 fade-in duration-300">
          <h3 className="text-2xl lg:text-4xl font-bold mb-4 tracking-tight leading-tight text-white">{project.title}</h3>
          <p className="text-text-secondary text-sm lg:text-lg mb-8 leading-relaxed max-w-4xl">{project.description}</p>
          <ul className="space-y-4 mb-10 max-w-4xl">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm text-text-primary/90">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="leading-snug">{h}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-mono text-accent/90 bg-accent/10 rounded-lg border border-accent/20">{tag}</span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {project.slug && (
              <Link href={`/projects/${project.slug}`} className="flex items-center gap-2 px-5 py-2.5 bg-accent text-black font-semibold rounded-xl hover:bg-accent/90 transition-all shadow-lg text-sm">
                <BookOpen className="w-4 h-4" /><span>Read Case Study</span>
              </Link>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-xl hover:border-accent hover:text-accent transition-all hover:bg-accent/5 text-sm">
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
    <div className="group h-full flex flex-col glass-card rounded-2xl relative overflow-hidden gradient-border">
      <div className="relative h-48 overflow-hidden bg-black/40">
        <Image src={project.image} alt={imageAltText} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full border border-accent/20 text-accent text-[10px] font-mono tracking-wide">{project.category}</div>
        {project.slug && (
          <Link href={linkHref} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-accent text-black font-semibold text-sm rounded-full shadow-lg hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4" /><span>Case Study</span>
            </div>
          </Link>
        )}
      </div>
      <div className="flex flex-col flex-grow p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base md:text-lg font-semibold group-hover:text-accent transition-colors leading-snug">
            <Link href={linkHref} className="hover:text-accent transition-colors">{project.title}</Link>
          </h3>
          <div className="flex gap-1.5 shrink-0 mt-0.5">
            {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg border border-border hover:border-accent/40 hover:text-accent hover:bg-accent/5 transition-all text-text-muted"><Github className="w-3.5 h-3.5" /></a>}
            {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg border border-accent/30 text-accent hover:bg-accent/10 transition-all"><ExternalLink className="w-3.5 h-3.5" /></a>}
          </div>
        </div>
        <p className="text-text-secondary text-sm mb-4 leading-relaxed line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06] mt-auto">
          {project.tags.slice(0,4).map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-[10px] font-mono text-accent/80 bg-accent/5 rounded-full border border-accent/10">{tag}</span>
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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl glass-panel group">
      <div>
        <h4 className="font-semibold text-white group-hover:text-accent transition-colors">
          <Link href={linkHref}>{project.title}</Link>
        </h4>
        <p className="text-xs text-text-muted mt-1">{project.description}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {project.tags.slice(0,2).map(tag => (
           <span key={tag} className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-text-muted bg-black/40 rounded border border-white/5">{tag}</span>
        ))}
        {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:text-accent transition-colors text-text-muted"><Github className="w-4 h-4" /></a>}
        {project.slug && <Link href={linkHref} className="p-1.5 rounded-lg hover:text-accent transition-colors text-text-muted"><ArrowUpRight className="w-4 h-4" /></Link>}
      </div>
    </div>
  );
}
