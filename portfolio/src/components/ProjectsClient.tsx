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

  const filtered = active === "All" ? initialProjects : initialProjects.filter((p) => p.category === active);

  const tier1 = filtered.filter(p => p.tier === 1);
  const tier2 = filtered.filter(p => p.tier === 2 || p.tier === undefined);
  const tier3 = filtered.filter(p => p.tier === 3);

  const handleCategoryChange = (cat: Category) => {
    setActive(cat);
  };

  return (
    <section
      id="projects"
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-40 -left-40 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-40 -right-40 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-4 text-white">
              Selected <span className="text-accent">Works.</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-xl">
              A collection of systems, APIs, and ML models I've architected and deployed to production.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    active === cat
                      ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                      : "bg-black/50 text-text-muted border border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>

        <div className="flex flex-col gap-12">
          
          {/* Bento Grid for Tier 1 and 2 */}
          {(tier1.length > 0 || tier2.length > 0) && (
            <div className="bento-grid">
              
              {/* Render Tier 1 (Large spans) */}
              {tier1.map((project, idx) => (
                <div key={project.title} className={`col-span-12 ${idx % 2 === 0 ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
                  <FeaturedProjectBento project={project} />
                </div>
              ))}

              {/* Render Tier 2 (Smaller spans) */}
              {tier2.map((project) => (
                <div key={project.title} className="col-span-12 md:col-span-6 lg:col-span-4">
                  <ProjectCard project={project} />
                </div>
              ))}

            </div>
          )}

          {/* Tier 3: Experiments (Horizontal Scroll) */}
          {tier3.length > 0 && (
            <AnimatedSection delay={0.2} className="mt-12 pt-12 border-t border-white/5">
              <div className="flex items-center gap-3 mb-8">
                <Github className="w-6 h-6 text-accent" />
                <h3 className="text-2xl font-bold text-white">Experiments & Scripts</h3>
              </div>
              <div className="flex overflow-x-auto gap-4 pb-8 scrollbar-hide snap-x">
                {tier3.map((project) => (
                  <div key={project.title} className="shrink-0 w-[300px] snap-start">
                    <MinimalProjectCard project={project} />
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-32 text-text-muted text-xl font-light">
              No projects found in this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Featured Bento Card (Tier 1) ──────────────────────────────── */
function FeaturedProjectBento({ project }: { project: Project }) {
  const linkHref = project.slug ? `/projects/${project.slug}` : (project.live || project.github || "#");

  return (
    <div className="bento-item h-[400px] lg:h-[500px] group flex flex-col justify-end p-6 lg:p-10">
      <Image 
        src={project.image} 
        alt={project.title} 
        fill 
        className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-80" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      
      <div className="relative z-10 max-w-2xl transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
        <div className="flex gap-2 mb-4">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-mono text-white border border-white/20">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-3xl lg:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">{project.title}</h3>
        <p className="text-text-secondary text-sm lg:text-base line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {project.description}
        </p>
        
        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
          {project.slug && (
            <Link href={`/projects/${project.slug}`} className="px-6 py-3 bg-accent text-black font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Case Study
            </Link>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-xl transition-colors">
              <Github className="w-5 h-5" />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-xl transition-colors">
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Project Card (Tier 2) ───────────────────────────────────────────── */
function ProjectCard({ project }: { project: Project }) {
  const linkHref = project.slug ? `/projects/${project.slug}` : (project.live || project.github || "#");

  return (
    <div className="bento-item h-[400px] group flex flex-col justify-end p-6">
      <Image 
        src={project.image} 
        alt={project.title} 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
      
      <div className="relative z-10">
        <span className="text-accent text-xs font-mono mb-2 block">{project.category}</span>
        <h3 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-accent transition-colors">
          <Link href={linkHref} className="after:absolute after:inset-0">{project.title}</Link>
        </h3>
        <p className="text-text-secondary text-sm line-clamp-3 mb-4">{project.description}</p>
        <div className="flex gap-2 relative z-20">
          {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white rounded-lg transition-colors"><Github className="w-4 h-4" /></a>}
          {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white rounded-lg transition-colors"><ExternalLink className="w-4 h-4" /></a>}
        </div>
      </div>
    </div>
  );
}

/* ─── Minimal Project Card (Tier 3) ───────────────────────────────────────────── */
function MinimalProjectCard({ project }: { project: Project }) {
  const linkHref = project.slug ? `/projects/${project.slug}` : (project.live || project.github || "#");
  
  return (
    <div className="bento-item p-6 h-full flex flex-col justify-between group">
      <div>
        <h4 className="font-bold text-white text-lg group-hover:text-accent transition-colors mb-2">
          <Link href={linkHref} className="after:absolute after:inset-0">{project.title}</Link>
        </h4>
        <p className="text-sm text-text-muted line-clamp-4">{project.description}</p>
      </div>
      <div className="flex items-center justify-between mt-6 relative z-20">
        <div className="flex gap-1">
          {project.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-text-secondary">{tag}</span>
          ))}
        </div>
        <div className="flex gap-2 text-text-muted">
          {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github className="w-4 h-4" /></a>}
          {project.slug && <Link href={linkHref} className="hover:text-white transition-colors"><ArrowUpRight className="w-4 h-4" /></Link>}
        </div>
      </div>
    </div>
  );
}
