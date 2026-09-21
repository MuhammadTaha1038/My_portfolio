import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "../SectionHeading";

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

  return (
    <section
      className="section-padding"
      style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-bg)" }}
    >
      <div className="container-content">

        {/* Section header */}
        <AnimatedSection>
          <SectionHeading
            label="Featured Work"
            title="Projects that ship."
            viewAllLink="/projects"
          />
        </AnimatedSection>

        {/* 3-column grid >= 1024px, 1-col mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const href = project.slug ? `/projects/${project.slug}` : project.live || project.github || "#";
            
            return (
              <AnimatedSection key={project.id} delay={0.12 + i * 0.08} className="flex flex-col">
                <Link
                  href={href}
                  className="group proj-card hover-lift flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                >
                  {/* Image on Top (16:9) */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden" style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>

                  {/* Text Below */}
                  <div className="p-6 flex flex-col flex-1" style={{ background: "var(--color-surface)" }}>
                    <p className="text-eyebrow mb-2">{project.category}</p>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--color-text)" }}>
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed line-clamp-3 mb-6" style={{ color: "var(--color-text-secondary)" }}>
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto pt-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="chip" style={{ background: "var(--color-surface-2)" }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
