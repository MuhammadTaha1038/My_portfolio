import { prisma } from "@/lib/prisma";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "../SectionHeading";
import FeaturedProjectRow from "./FeaturedProjectRow";

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

        {/* 1-column layout mapping over project rows */}
        <div className="flex flex-col mt-12">
          {projects.map((project, i) => (
            <FeaturedProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
