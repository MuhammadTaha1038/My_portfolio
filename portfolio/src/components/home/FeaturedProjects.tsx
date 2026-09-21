import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, ExternalLink, BookOpen } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default async function FeaturedProjects() {
  let projects: Awaited<ReturnType<typeof prisma.project.findMany>> = [];
  try {
    projects = await prisma.project.findMany({
      where: { tier: 1 },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      take: 3,
    });
  } catch {
    // DB temporarily unavailable
  }

  if (projects.length === 0) return null;

  const [main, ...rest] = projects;

  return (
    <section
      className="section-padding"
      style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-bg)" }}
    >
      <div className="container-content">

        {/* Section header */}
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-eyebrow mb-2">Featured Work</p>
            <h2 className="text-h2" style={{ color: "var(--color-text)" }}>
              Projects that ship.
            </h2>
          </div>
          <Link href="/projects" className="view-all-link">
            View all <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
          </Link>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-4">
          {/* Main large card */}
          {main && (
            <AnimatedSection delay={0.06} className="lg:col-span-3">
              <div
                className="group proj-card relative cursor-pointer"
                style={{ height: "clamp(320px, 45vw, 500px)" }}
              >
                <Image
                  src={main.image}
                  alt={main.title}
                  fill
                  className="object-cover opacity-45 group-hover:opacity-65 group-hover:scale-[1.03] transition-all duration-500"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {main.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="chip">{tag}</span>
                    ))}
                  </div>
                  <p className="text-eyebrow mb-2">{main.category}</p>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 leading-tight"
                    style={{ color: "var(--color-text)" }}>
                    {main.title}
                  </h3>
                  <p className="text-sm leading-relaxed line-clamp-2 mb-6"
                    style={{ color: "var(--color-text-secondary)", maxWidth: "52ch" }}>
                    {main.description}
                  </p>
                  <div className="flex items-center gap-2">
                    {main.slug && (
                      <Link href={`/projects/${main.slug}`} className="btn btn-primary"
                        style={{ height: "36px", fontSize: "13px" }}>
                        <BookOpen className="w-3.5 h-3.5" strokeWidth={1.5} />
                        Case Study
                      </Link>
                    )}
                    {main.github && (
                      <a href={main.github} target="_blank" rel="noopener noreferrer"
                        aria-label={`GitHub: ${main.title}`}
                        className="social-icon-btn">
                        <Github className="w-4 h-4" strokeWidth={1.5} />
                      </a>
                    )}
                    {main.live && (
                      <a href={main.live} target="_blank" rel="noopener noreferrer"
                        aria-label={`Live demo: ${main.title}`}
                        className="social-icon-btn">
                        <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Side cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {rest.map((project, i) => (
              <AnimatedSection key={project.id} delay={0.12 + i * 0.06} className="flex-1">
                <div
                  className="group proj-card relative cursor-pointer"
                  style={{ height: "clamp(160px, 22vw, 238px)" }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-35 group-hover:opacity-55 group-hover:scale-[1.03] transition-all duration-500"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <p className="text-eyebrow mb-1">{project.category}</p>
                    <h3 className="text-base font-semibold mb-3 leading-snug"
                      style={{ color: "var(--color-text)" }}>
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                      {project.slug && (
                        <Link href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-medium"
                          style={{ color: "var(--color-accent)" }}>
                          Case Study <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          aria-label={`GitHub: ${project.title}`}
                          style={{ color: "var(--color-text-muted)" }}>
                          <Github className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}

            {rest.length < 2 && (
              <AnimatedSection delay={0.24} className="flex-1">
                <Link href="/projects"
                  className="group hover-surface flex flex-col items-center justify-center gap-3 p-6 transition-all duration-150"
                  style={{
                    height: "100%",
                    minHeight: "160px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-border)",
                    background: "transparent",
                  }}>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    style={{ color: "var(--color-text-muted)" }} strokeWidth={1.5} />
                  <span className="text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>
                    Explore All Work
                  </span>
                </Link>
              </AnimatedSection>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
