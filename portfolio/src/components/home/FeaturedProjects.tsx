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
        <AnimatedSection className="section-header-row mb-12">
          <div className="section-header" style={{ marginBottom: 0 }}>
            <p className="text-eyebrow">Featured Work</p>
            <h2 className="text-h2" style={{ color: "var(--color-text)" }}>
              Projects that ship.
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm transition-colors shrink-0"
            style={{ color: "var(--color-text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
          >
            View all
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
          </Link>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-4">
          {/* Main large card */}
          {main && (
            <AnimatedSection delay={0.06} className="lg:col-span-3">
              <div
                className="group relative overflow-hidden cursor-pointer"
                style={{
                  height: "clamp(320px, 45vw, 500px)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  transition: "border-color 150ms ease-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-border-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
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
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-3 leading-tight"
                    style={{ color: "var(--color-text)" }}
                  >
                    {main.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed line-clamp-2 mb-6"
                    style={{ color: "var(--color-text-secondary)", maxWidth: "52ch" }}
                  >
                    {main.description}
                  </p>
                  <div className="flex items-center gap-2">
                    {main.slug && (
                      <Link
                        href={`/projects/${main.slug}`}
                        className="btn btn-primary"
                        style={{ height: "36px", fontSize: "13px" }}
                      >
                        <BookOpen className="w-3.5 h-3.5" strokeWidth={1.5} />
                        Case Study
                      </Link>
                    )}
                    {main.github && (
                      <a
                        href={main.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub: ${main.title}`}
                        className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-sm)] border transition-colors"
                        style={{ borderColor: "rgba(255,255,255,0.15)", color: "var(--color-text-secondary)" }}
                      >
                        <Github className="w-4 h-4" strokeWidth={1.5} />
                      </a>
                    )}
                    {main.live && (
                      <a
                        href={main.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Live demo: ${main.title}`}
                        className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-sm)] border transition-colors"
                        style={{ borderColor: "rgba(255,255,255,0.15)", color: "var(--color-text-secondary)" }}
                      >
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
                  className="group relative overflow-hidden cursor-pointer"
                  style={{
                    height: "clamp(160px, 22vw, 238px)",
                    borderRadius: "var(--radius-md)",
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    transition: "border-color 150ms ease-out",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-border-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
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
                    <h3
                      className="text-base font-semibold mb-3 leading-snug"
                      style={{ color: "var(--color-text)" }}
                    >
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                      {project.slug && (
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-medium transition-colors"
                          style={{ color: "var(--color-accent)" }}
                        >
                          Case Study <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub: ${project.title}`}
                          style={{ color: "var(--color-text-muted)" }}
                        >
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
                <Link
                  href="/projects"
                  className="group flex flex-col items-center justify-center gap-3 p-6"
                  style={{
                    height: "100%",
                    minHeight: "160px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-border)",
                    background: "transparent",
                    transition: "border-color 150ms ease-out, background 150ms ease-out",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-hover)";
                    (e.currentTarget as HTMLElement).style.background = "var(--color-surface)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <ArrowRight
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    style={{ color: "var(--color-text-muted)" }}
                    strokeWidth={1.5}
                  />
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
