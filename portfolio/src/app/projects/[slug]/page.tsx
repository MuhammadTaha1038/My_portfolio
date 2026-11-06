import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import type { Metadata } from "next";

export const revalidate = 3600; // Revalidate every hour (or use ISR as needed)

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

// generateStaticParams removed to prevent Vercel SSG connection pool exhaustion (Neon DB wsarecv error)

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
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
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
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
        <div className="mb-10 max-w-4xl">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-8 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-md px-1 -ml-1"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            All projects
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-eyebrow">{project.category}</span>
            {project.featured && (
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-secondary)]">
                Featured Case Study
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text)] mb-6 leading-[1.12]">
            {project.title}
          </h1>

          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed">
            {summary}
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] mb-14 lg:mb-20 shadow-lg">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
          />
        </div>

        {/* Two-Column Layout */}
        <div className="lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
          
          {/* Left: Markdown Body */}
          <div className="lg:col-span-8 mb-16 lg:mb-0">
            {project.content ? (
              <MarkdownRenderer content={project.content} />
            ) : (
              <div className="card p-8 text-center">
                <p className="text-[var(--color-text-secondary)] italic">
                  No detailed case study writeup available for this project.
                </p>
              </div>
            )}
          </div>

          {/* Right: Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 flex flex-col gap-6">
              
              {/* Primary Actions Card */}
              {(project.github || project.live) && (
                <div className="card p-6 flex flex-col gap-3">
                  <h4 className="text-eyebrow mb-1">Project Links</h4>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full justify-center"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit Live Site
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost w-full justify-center"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
                  )}
                </div>
              )}

              {/* Metrics & Impact */}
              {metrics && metrics.length > 0 && (
                <div className="card p-6">
                  <h4 className="text-eyebrow mb-5">Impact &amp; Results</h4>
                  <div className="grid grid-cols-2 gap-5">
                    {metrics.slice(0, 4).map((m: any, i: number) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-2xl sm:text-3xl font-bold font-mono text-[var(--color-text)] tabular-nums leading-none mb-1.5">
                          {m.value}
                        </span>
                        <span className="text-xs text-[var(--color-text-secondary)] leading-snug">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              {project.tags && project.tags.length > 0 && (
                <div className="card p-6">
                  <h4 className="text-eyebrow mb-4">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-mono rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Metadata Overview Card */}
              <div className="card p-6 flex flex-col gap-4">
                <h4 className="text-eyebrow mb-1">Details</h4>
                <div className="flex items-center justify-between text-xs py-2 border-b border-[var(--color-border)] last:border-0">
                  <span className="text-[var(--color-text-muted)]">Category</span>
                  <span className="text-[var(--color-text)] font-medium">{project.category}</span>
                </div>
                {project.featured && (
                  <div className="flex items-center justify-between text-xs py-2 border-b border-[var(--color-border)] last:border-0">
                    <span className="text-[var(--color-text-muted)]">Type</span>
                    <span className="text-[var(--color-text)] font-medium">Featured Project</span>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-24 pt-12 border-t border-[var(--color-border)]">
          <div className="flex items-center justify-between gap-4 mb-6">
            <span className="text-eyebrow">More Projects</span>
            <Link
              href="/projects"
              className="text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors inline-flex items-center gap-1.5"
            >
              All Projects &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {prevProject ? (
              <Link
                href={prevProject.slug ? `/projects/${prevProject.slug}` : "#"}
                className="card p-6 flex flex-col justify-between group text-left"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-3 flex items-center gap-2 group-hover:text-[var(--color-text)] transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                  Previous Project
                </span>
                <span className="text-base sm:text-lg font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-1">
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}

            {nextProject ? (
              <Link
                href={nextProject.slug ? `/projects/${nextProject.slug}` : "#"}
                className="card p-6 flex flex-col justify-between group text-right sm:items-end"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-3 flex items-center gap-2 group-hover:text-[var(--color-text)] transition-colors">
                  Next Project
                  <ArrowLeft className="w-3.5 h-3.5 rotate-180 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-base sm:text-lg font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-1">
                  {nextProject.title}
                </span>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
