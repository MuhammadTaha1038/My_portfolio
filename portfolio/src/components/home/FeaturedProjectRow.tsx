"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function FeaturedProjectRow({ project, index }: { project: any, index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax drift from -20px to +20px
  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const href = project.content && project.slug ? `/projects/${project.slug}` : (project.github || project.live || "#");

  // Extract first sentence for summary
  const firstSentence = project.description?.split(/(?<=[.?!])\s+/)[0] || project.description;

  const metrics = project.metrics ? (typeof project.metrics === "string" ? JSON.parse(project.metrics) : project.metrics) : null;

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 py-12 border-b border-[var(--color-border)] last:border-0"
    >
      {/* Clickable overlay for entire row */}
      <Link href={href} className="absolute inset-0 z-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-2xl" aria-label={`View ${project.title}`} />

      {/* Left: Image (Col span 7) */}
      <div className="lg:col-span-7 relative z-10 pointer-events-none">
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <motion.div
            style={shouldReduceMotion ? {} : { y }}
            className="absolute inset-[-20px] transition-transform duration-200 ease-out group-hover:scale-[1.03]"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </motion.div>
        </div>
      </div>

      {/* Right: Text (Col span 5) */}
      <div className="lg:col-span-5 flex flex-col justify-center relative z-10 pointer-events-none">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-sm text-[var(--color-text-muted)]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
            {project.category}
          </span>
        </div>

        <h3 className="text-[28px] font-bold leading-tight mb-4 text-[var(--color-text-primary)]">
          {project.title}
        </h3>

        <p className="text-[16px] leading-relaxed text-[var(--color-text-secondary)] line-clamp-2 mb-6">
          {firstSentence}
        </p>

        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            {metrics.slice(0, 3).map((m: any, i: number) => (
              <div key={i} className="flex flex-col">
                <span className="text-[28px] font-bold tabular-nums text-[var(--color-text-primary)] leading-none mb-1">
                  {m.value}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
          {project.tags.slice(0, 4).map((tag: string) => (
            <span key={tag} className="px-3 py-1 text-xs font-medium rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-secondary)]">
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pointer-events-auto mt-auto">
          {project.content ? (
            <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-2 font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-md px-1 -ml-1">
              Read case study <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <span className="font-medium text-[var(--color-text-muted)]">No case study</span>
          )}

          <div className="flex items-center gap-3 ml-auto">
            {project.github && (
              <Link href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface-2)] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]" aria-label="GitHub Repository">
                <Github className="w-5 h-5" />
              </Link>
            )}
            {project.live && (
              <Link href={project.live} target="_blank" rel="noopener noreferrer" className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface-2)] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]" aria-label="Live Demo">
                <ExternalLink className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
