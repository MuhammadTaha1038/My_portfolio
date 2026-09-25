"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

import { parseDates, ExperienceCard, type ExperienceType } from "./ExperienceCard";

export default function ExperienceClient({ experiences, certCount = 0 }: { experiences: ExperienceType[], certCount?: number }) {
  const shouldReduceMotion = useReducedMotion();
  const allParsed = experiences.map((e) => parseDates(e.duration));
  const maxMonths = Math.max(...allParsed.map((p) => p.months), 1);
  const earliestYear = Math.min(...allParsed.map((p) => p.start.getFullYear()));
  const yearsSpan = Math.max(1, new Date().getFullYear() - earliestYear);

  return (
    <section id="experience" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      <div className="relative container-content max-w-5xl">
        <AnimatedSection>
          <div className="w-full mb-16 md:mb-24">
            <h1 className="text-4xl md:text-[56px] font-bold tracking-tight text-[var(--color-text-primary)] mb-4 leading-tight">
              Professional Journey
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              {experiences.length} roles spanning {yearsSpan} years of engineering.
            </p>
          </div>
        </AnimatedSection>

        <div className="w-full relative">
          {experiences.map((exp, i) => {
            const isCurrent = i === 0;
            const isLast = i === experiences.length - 1;

            return (
              <AnimatedSection key={exp.id} delay={i * 0.1}>
                <div className="relative pl-[40px] md:pl-[64px] pb-12">
                  {/* Timeline line */}
                  {!isLast && (
                    <motion.div
                      className={`absolute left-[11px] md:left-[23px] top-10 bottom-[-40px] w-[2px] origin-top ${
                        isCurrent ? "bg-[var(--color-accent)]" : "bg-[var(--color-border)]"
                      }`}
                      initial={shouldReduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: "-20%" }}
                      transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                    />
                  )}

                  {/* Timeline node */}
                  <div
                    className={`absolute left-[6px] md:left-[18px] top-10 w-3 h-3 rounded-full border-[2px] ${
                      isCurrent
                        ? "bg-[var(--color-accent)] border-[var(--color-accent)] motion-safe:animate-pulse z-10"
                        : "bg-[var(--color-bg)] border-[var(--color-border)] z-10"
                    }`}
                  />

                  {/* Card */}
                  <ExperienceCard exp={exp} isCurrent={isCurrent} maxMonths={maxMonths} />
                </div>
              </AnimatedSection>
            );
          })}
          
          {/* Credentials Panel */}
          {certCount > 0 && (
            <AnimatedSection delay={0.2}>
              <div className="pl-[40px] md:pl-[64px] pb-8 pt-4">
                <div className="w-full md:max-w-[340px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[12px] p-5 hover:border-[var(--color-border-hover)] transition-colors">
                  <span className="text-eyebrow mb-4 block">Credentials</span>
                  <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="https://www.google.com/s2/favicons?domain=datacamp.com&sz=128" 
                      alt="DataCamp" 
                      className="w-8 h-8 object-contain shrink-0" 
                    />
                    <div className="flex flex-col">
                      <span className="text-sm text-[var(--color-text)] font-medium mb-1">{certCount} certifications earned</span>
                      <Link href="/certificates" className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors inline-flex items-center gap-1">
                        View certificates <span>&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>
  );
}
