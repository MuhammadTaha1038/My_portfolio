import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import type { Metadata } from "next";

export const revalidate = 3600; // Revalidate every hour (or use ISR as needed)

type Params = {
  params: {
    slug: string;
  };
};

// generateStaticParams removed to prevent Vercel SSG connection pool exhaustion (Neon DB wsarecv error)

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
  });

  if (!project) return {};

  const summary = project.summary || (project.description ? project.description.split(/(?<=[.?!])\s+/)[0] : "") || project.description;

  return {
    title: `${project.title} | M. Taha`,
    description: summary,
    openGraph: {
      title: project.title,
      description: summary,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectDetailPage({ params }: Params) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
  });

  if (!project) notFound();

  // Get previous and next projects for footer navigation
  const allProjects = await prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    select: { id: true, title: true, slug: true, category: true },
  });

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const summary = project.summary || (project.description ? project.description.split(/(?<=[.?!])\s+/)[0] : "") || project.description;
  
  let metrics = null;
  if (project.metrics) {
    try {
      metrics = typeof project.metrics === "string" ? JSON.parse(project.metrics) : project.metrics;
    } catch (error) {
      console.error("Error parsing metrics for project:", project.slug, error);
      metrics = null;
    }
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg)] pt-32 pb-24">
      <div className="container-content">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-md px-1 -ml-1"
          >
            <ArrowLeft className="w-4 h-4" /> All projects
          </Link>

          <p className="font-mono text-sm uppercase tracking-wider text-[var(--color-text-secondary)] mb-4">
            {project.category}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-3xl leading-relaxed">
            {summary}
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] mb-16 lg:mb-24">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* Two-Column Layout */}
        <div className="lg:grid lg:grid-cols-12 gap-16 lg:gap-24 relative">
          
          {/* Left: Markdown Body */}
          <div className="lg:col-span-8 mb-16 lg:mb-0">
            {project.content ? (
              <MarkdownRenderer content={project.content} />
            ) : (
              <p className="text-[var(--color-text-secondary)] italic">
                No detailed case study available for this project.
              </p>
            )}
          </div>

          {/* Right: Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 flex flex-col gap-12">
              
              {/* Metrics */}
              {metrics && metrics.length > 0 && (
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-6">Impact</h4>
                  <div className="grid grid-cols-2 gap-6">
                    {metrics.slice(0, 4).map((m: any, i: number) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-3xl font-bold tabular-nums text-[var(--color-text-primary)] leading-none mb-2">
                          {m.value}
                        </span>
                        <span className="text-sm text-[var(--color-text-secondary)]">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stack */}
              {project.tags && project.tags.length > 0 && (
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-4">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                      <span key={tag} className="px-3 py-1.5 text-sm font-medium rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-secondary)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              {(project.github || project.live) && (
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-4">Links</h4>
                  <div className="flex flex-col gap-3">
                    {project.live && (
                      <Link href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-[var(--color-text-primary)] text-black font-semibold rounded-xl hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]">
                        <ExternalLink className="w-4 h-4" /> Visit Live Site
                      </Link>
                    )}
                    {project.github && (
                      <Link href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-semibold rounded-xl hover:border-[var(--color-border-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]">
                        <Github className="w-4 h-4" /> Source Code
                      </Link>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-24 pt-12 border-t border-[var(--color-border)] grid grid-cols-1 md:grid-cols-2 gap-8">
          {prevProject ? (
            <Link href={prevProject.slug ? `/projects/${prevProject.slug}` : "#"} className="group flex flex-col items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-xl p-4 -ml-4 hover:bg-[var(--color-surface-2)] transition-colors">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-2 flex items-center gap-2 group-hover:text-[var(--color-accent)] transition-colors">
                <ArrowLeft className="w-3 h-3" /> Previous Project
              </span>
              <span className="text-lg font-semibold text-[var(--color-text-primary)]">{prevProject.title}</span>
            </Link>
          ) : <div />}

          {nextProject ? (
            <Link href={nextProject.slug ? `/projects/${nextProject.slug}` : "#"} className="group flex flex-col items-end text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-xl p-4 -mr-4 hover:bg-[var(--color-surface-2)] transition-colors">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-2 flex items-center gap-2 group-hover:text-[var(--color-accent)] transition-colors">
                Next Project <ArrowLeft className="w-3 h-3 rotate-180" />
              </span>
              <span className="text-lg font-semibold text-[var(--color-text-primary)]">{nextProject.title}</span>
            </Link>
          ) : <div />}
        </div>

      </div>
    </main>
  );
}
