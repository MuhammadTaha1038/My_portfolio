"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function FeaturedProjectRow({ project, index }: { project: any, index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  
  // Trigger at 25% visibility
  const inView = useInView(ref, { once: true, amount: 0.25 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Desktop scroll drift (+/- 60px), tablet (+/- 30px), mobile static (handled via CSS/Tailwind media queries or custom hook, but easier to use framer motion useTransform and CSS classes)
  const yDesktop = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const yTablet = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const href = project.content && project.slug ? `/projects/${project.slug}` : (project.github || project.live || "#");

  // Summary logic
  const summary = project.summary || (project.description?.split(/(?<=[.?!])\s+/)[0] || project.description);

  // Zig-zag layout
  // 0-indexed: 0 is "Row 1" (Image Left), 1 is "Row 2" (Image Right)
  const isImageRight = index % 2 === 1;
  const imageOrder = isImageRight ? "lg:order-2" : "lg:order-1";
  const textOrder = isImageRight ? "lg:order-1" : "lg:order-2";
  
  // Banner slide-in translation values
  // Left banner moves from -X to 0. Right banner moves from +X to 0.
  const bannerInitialX = isImageRight ? "clamp(80px, 14vw, 220px)" : "calc(-1 * clamp(80px, 14vw, 220px))";
  
  // Numeral placement
  const numeralPosition = isImageRight ? "left-0 -translate-x-[20%]" : "right-0 translate-x-[20%]";

  return (
    <div
      ref={ref}
      className="group relative flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 py-12 lg:items-center overflow-x-clip border-b border-[var(--color-border)] last:border-0"
    >
      {/* Clickable overlay for entire row */}
      <Link href={href} className="absolute inset-0 z-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-2xl" aria-label={`View ${project.title}`} />

      {/* Decorative Numeral Layer (Behind everything) */}
      <motion.div
        className={`absolute top-1/2 -translate-y-1/2 z-[-10] pointer-events-none ${numeralPosition}`}
        aria-hidden="true"
        style={shouldReduceMotion ? {} : {
          // Responsive y-axis drift using CSS vars mapped from Framer Motion
          y: yDesktop
        }}
      >
        <span 
          className="font-bold hidden lg:block opacity-25 lg:opacity-100"
          style={{
            fontSize: "clamp(160px, 22vw, 320px)",
            WebkitTextStroke: "1px var(--color-border)",
            color: "transparent"
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </motion.div>
      <motion.div
        className={`absolute top-1/2 -translate-y-1/2 z-[-10] pointer-events-none ${numeralPosition}`}
        aria-hidden="true"
        style={shouldReduceMotion ? {} : { y: yTablet }}
      >
        <span 
          className="font-bold hidden sm:block lg:hidden opacity-25"
          style={{
            fontSize: "clamp(160px, 22vw, 320px)",
            WebkitTextStroke: "1px var(--color-border)",
            color: "transparent"
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </motion.div>
      <div className={`absolute top-1/2 -translate-y-1/2 z-[-10] pointer-events-none ${numeralPosition}`} aria-hidden="true">
        <span 
          className="font-bold block sm:hidden opacity-25"
          style={{
            fontSize: "clamp(160px, 22vw, 320px)",
            WebkitTextStroke: "1px var(--color-border)",
            color: "transparent"
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Image Column (Span 7) */}
      <div className={`lg:col-span-7 relative z-10 pointer-events-none ${imageOrder}`}>
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: bannerInitialX, y: 40 }}
          animate={shouldReduceMotion ? false : (inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: bannerInitialX, y: 40 })}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full aspect-[16/9] overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] group-hover:border-[var(--color-border-hover)] transition-colors duration-200"
        >
          <Image
            src={project.image}
            alt={`${project.title} project banner`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </motion.div>
      </div>

      {/* Text Column (Span 5) */}
      <motion.div 
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={shouldReduceMotion ? false : (inView ? { opacity: 1 } : { opacity: 0 })}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`lg:col-span-5 flex flex-col justify-center gap-5 relative z-10 pointer-events-none ${textOrder} text-left h-fit`}
      >
        <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
          {project.category}
        </span>

        <h3 className="text-[28px] font-bold leading-tight text-[var(--color-text-primary)]">
          {project.title}
        </h3>

        {/* Mobile ONLY summary */}
        <p className="text-[16px] leading-relaxed text-[var(--color-text-secondary)] line-clamp-2 block sm:hidden">
          {summary}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag: string) => (
            <span key={tag} className="px-3 py-1 text-xs font-medium rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-secondary)]">
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pointer-events-auto">
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
        </div>
      </motion.div>
    </div>
  );
}
