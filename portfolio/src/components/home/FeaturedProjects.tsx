import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, ExternalLink, BookOpen } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default async function FeaturedProjects() {
  const projects = await prisma.project.findMany({
    where: { tier: 1 },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    take: 3,
  });

  if (projects.length === 0) return null;

  const [main, ...rest] = projects;

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 section-dark" />
      <div className="absolute inset-0 dot-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-accent/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-mono text-accent tracking-[0.2em] uppercase mb-3 block">Featured Work</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Projects that ship.
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-accent transition-colors shrink-0"
          >
            View all projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-5">
          {/* Main large card */}
          {main && (
            <AnimatedSection delay={0.1} className="lg:col-span-3">
              <div className="group relative h-[420px] md:h-[520px] rounded-2xl overflow-hidden featured-card-border bg-black cursor-pointer">
                <Image
                  src={main.image}
                  alt={main.title}
                  fill
                  className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-9">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {main.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2.5 py-1 text-[10px] font-mono bg-accent/15 text-accent rounded-full border border-accent/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-mono text-text-muted uppercase tracking-widest mb-2">{main.category}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">{main.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed line-clamp-2 mb-6 max-w-md">{main.description}</p>
                  <div className="flex items-center gap-3">
                    {main.slug && (
                      <Link
                        href={`/projects/${main.slug}`}
                        className="flex items-center gap-2 px-5 py-2.5 bg-accent text-black text-sm font-bold rounded-xl hover:bg-accent/90 hover:scale-105 transition-all shadow-lg"
                      >
                        <BookOpen className="w-4 h-4" /> Case Study
                      </Link>
                    )}
                    {main.github && (
                      <a href={main.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl border border-white/20 text-white hover:border-accent/50 hover:text-accent transition-all">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {main.live && (
                      <a href={main.live} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl border border-white/20 text-white hover:border-accent/50 hover:text-accent transition-all">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Side cards */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {rest.map((project, i) => (
              <AnimatedSection key={project.id} delay={0.2 + i * 0.1} className="flex-1">
                <div className="group relative h-[195px] md:h-[245px] rounded-2xl overflow-hidden featured-card-border bg-black cursor-pointer">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-40 group-hover:opacity-65 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                    <span className="text-[10px] font-mono text-accent uppercase tracking-widest mb-1">{project.category}</span>
                    <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-accent/90 transition-colors">{project.title}</h3>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {project.slug && (
                        <Link href={`/projects/${project.slug}`} className="flex items-center gap-1.5 text-xs text-accent font-semibold hover:underline">
                          Case Study <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-white transition-colors">
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}

            {/* If only 1 rest item, fill with placeholder CTA */}
            {rest.length < 2 && (
              <AnimatedSection delay={0.4} className="flex-1">
                <Link href="/projects" className="group h-full min-h-[195px] rounded-2xl border border-white/8 bg-white/[0.02] hover:border-accent/30 hover:bg-accent/5 transition-all flex flex-col items-center justify-center gap-3 p-6">
                  <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform" />
                  </div>
                  <span className="text-sm font-semibold text-text-secondary group-hover:text-white transition-colors">Explore All Work</span>
                </Link>
              </AnimatedSection>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
