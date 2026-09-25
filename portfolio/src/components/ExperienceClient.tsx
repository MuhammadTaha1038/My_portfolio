"use client";

import AnimatedSection from "./AnimatedSection";
import { Briefcase, Calendar } from "lucide-react";

type ExperienceType = {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
};

export default function ExperienceClient({ experiences }: { experiences: ExperienceType[] }) {
  return (
    <section id="experience" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />

      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      <div className="relative container-content">
        <AnimatedSection>
          <div className="w-full mb-12 lg:mb-16">
            <span className="text-eyebrow mb-4 block">EXPERIENCE</span>
            <h2 className="text-h2 font-bold tracking-tight text-[var(--color-text-primary)]">
              Professional Journey
            </h2>
          </div>
        </AnimatedSection>

        <div className="w-full">
          {experiences.map((exp, i) => {
            const isCurrent = i === 0;

            return (
              <AnimatedSection key={exp.id} delay={i * 0.15}>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-[19px] sm:left-[23px] top-8 bottom-[-32px] w-px bg-[var(--color-border)] hidden sm:block" />

                  {/* Timeline dot */}
                  <div className="absolute left-[15px] sm:left-[19px] top-[40px] hidden sm:flex items-center justify-center">
                    {isCurrent ? (
                       <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] motion-safe:animate-pulse" />
                    ) : (
                       <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-border)]" />
                    )}
                  </div>

                  {/* Card */}
                  <div className="sm:ml-12 lg:ml-16 mb-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden w-full">
                    {/* Header Row */}
                    <div className="p-4 sm:p-6 flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-4">
                      <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 w-full sm:w-auto">
                        <div className="p-2.5 sm:p-3 rounded-lg shrink-0 bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-secondary)]">
                          <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                          <span className="font-semibold text-lg sm:text-xl text-[var(--color-text-primary)]">{exp.role}</span>
                          <span className="hidden sm:inline text-[var(--color-text-muted)]">•</span>
                          <span className="text-[var(--color-text-secondary)] font-mono text-xs sm:text-sm">{exp.company}</span>
                        </div>
                      </div>
                      
                      {/* Date Badge */}
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${isCurrent ? 'border-[var(--color-accent)]' : 'border-[var(--color-border)]'} bg-[var(--color-surface-2)] shrink-0 mt-2 sm:mt-0`}>
                        <Calendar className="w-3.5 h-3.5 text-[var(--color-text-secondary)]" />
                        <span className="text-xs font-mono text-[var(--color-text-secondary)]">{exp.duration}</span>
                      </div>
                    </div>
                    
                    {/* Divider */}
                    <div className="h-px bg-[var(--color-border)] w-full" />
                    
                    {/* List */}
                    <ul className="p-4 sm:p-6 flex flex-col gap-4">
                      {exp.description.map((a: string, j: number) => (
                        <li key={j} className="flex items-start gap-4 group">
                          <div className="shrink-0 mt-[10px] w-1.5 h-1.5 bg-[var(--color-text-muted)] rounded-sm group-hover:bg-[var(--color-text-secondary)] transition-colors" />
                          <p className="text-[var(--color-text-secondary)] leading-[1.7] text-sm sm:text-base">
                            {a}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
