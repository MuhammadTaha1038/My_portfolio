"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Counter from "@/components/Counter";

export default function FeaturedProjectRow({ project, index }: { project: any, index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  
  // Trigger at 25% visibility
  const inView = useInView(ref, { once: true, amount: 0.25 });

  const href = project.content && project.slug ? `/projects/${project.slug}` : (project.github || project.live || "#");

  // Summary: explicit summary, or first sentence of description
  const summary = project.summary || (project.description?.split(/(?<=[.?!])\s+/)[0] || project.description);
  const metrics = project.metrics ? (typeof project.metrics === "string" ? JSON.parse(project.metrics) : project.metrics) : null;

  // Zig-zag layout
  // 0-indexed: 0 is "Row 1" (Image Left), 1 is "Row 2" (Image Right)
  const isImageRight = index % 2 === 1;
  const imageOrder = isImageRight ? "lg:order-2" : "lg:order-1";
  const textOrder = isImageRight ? "lg:order-1" : "lg:order-2";
  
  // Wipe direction based on image position
  const wipeInitial = isImageRight ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)";
  const textTranslateX = isImageRight ? -40 : 40;

  // Framer Motion Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.07, delayChildren: 0.15 }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, x: textTranslateX },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div
      ref={ref}
      className="group relative flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 py-12 border-b border-[var(--color-border)] last:border-0 lg:items-center overflow-x-clip"
    >
      {/* Clickable overlay for entire row */}
      <Link href={href} className="absolute inset-0 z-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-2xl" aria-label={`View ${project.title}`} />

      {/* Image Column (Span 7) */}
      <div className={`lg:col-span-7 relative z-10 pointer-events-none ${imageOrder}`}>
        <motion.div
          initial={shouldReduceMotion ? false : { clipPath: wipeInitial }}
          animate={shouldReduceMotion ? false : (inView ? { clipPath: "inset(0% 0% 0% 0%)" } : { clipPath: wipeInitial })}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full aspect-[16/9] overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] group-hover:border-[var(--color-border-hover)] transition-colors duration-200"
        >
          <motion.div
            initial={shouldReduceMotion ? false : { scale: 1.06 }}
            animate={shouldReduceMotion ? false : (inView ? { scale: 1 } : { scale: 1.06 })}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full relative"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-200 ease-out sm:group-hover:scale-[1.015]"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Text Column (Span 5) */}
      <motion.div 
        variants={shouldReduceMotion ? {} : containerVariants}
        initial="hidden"
        animate={inView || shouldReduceMotion ? "visible" : "hidden"}
        className={`lg:col-span-5 flex flex-col gap-5 relative z-10 pointer-events-none ${textOrder} text-left`}
      >
        <motion.div variants={textItemVariants} className="flex items-center gap-4">
          <span className="font-mono text-sm text-[var(--color-text-muted)]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
            {project.category}
          </span>
        </motion.div>

        <motion.h3 variants={textItemVariants} className="text-[28px] font-bold leading-tight text-[var(--color-text-primary)]">
          {project.title}
        </motion.h3>

        <motion.p variants={textItemVariants} className="text-[16px] leading-relaxed text-[var(--color-text-secondary)] line-clamp-3">
          {summary}
        </motion.p>

        {metrics && metrics.length > 0 && (
          <motion.div variants={textItemVariants} className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {metrics.slice(0, 3).map((m: any, i: number) => (
              <div key={i} className="flex flex-col gap-1">
                <Counter value={m.value} className="text-[28px] font-bold tabular-nums text-[var(--color-text-primary)] leading-none" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
                  {m.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        <motion.div variants={textItemVariants} className="flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag: string) => (
            <span key={tag} className="px-3 py-1 text-xs font-medium rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-secondary)]">
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Actions */}
        <motion.div variants={textItemVariants} className="flex items-center gap-4 pointer-events-auto">
          {project.content && (
            <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-2 font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-md px-1 -ml-1 group/link">
              Read case study 
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1 sm:group-hover:translate-x-1" />
            </Link>
          )}

          <div className={`flex items-center gap-3 ${project.content ? "ml-auto" : ""}`}>
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
        </motion.div>
      </motion.div>
    </div>
  );
}
