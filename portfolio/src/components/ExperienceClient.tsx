"use client";

import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import { Briefcase, CheckCircle2, Calendar, MapPin } from "lucide-react";

type ExperienceType = {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
};

export default function ExperienceClient({ experiences }: { experiences: ExperienceType[] }) {
  return (
    <section id="experience" className="relative py-24 md:py-32 section-dark overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
      <div className="noise-overlay" />
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-accent/3 rounded-full blur-[100px] pointer-events-none" />

      {/* Top divider */}
      <div className="section-divider" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-8">
        <AnimatedSection>
          <SectionHeading
            label="Experience"
            title="Professional Journey"
            description="Building production systems and delivering enterprise-grade engineering solutions."
          />
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, i) => (
            <AnimatedSection key={exp.id} delay={i * 0.15}>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/30 to-transparent hidden md:block" />

                {/* Timeline dot */}
                <div className="absolute left-[18px] top-8 w-3 h-3 rounded-full bg-accent border-4 border-black animate-pulse-glow hidden md:block" />

                {/* Card */}
                <div className="md:ml-16 glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden gradient-border">
                  {/* Background shimmer */}
                  <div className="shimmer absolute inset-0 rounded-2xl pointer-events-none" />

                  {/* Header */}
                  <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <h3 className="text-2xl font-bold">{exp.role}</h3>
                      </div>
                      <p className="text-accent font-mono text-sm ml-12 md:ml-[52px]">
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 md:flex-col md:items-end">
                      <span className="inline-flex items-center gap-2 text-sm text-text-muted font-mono px-4 py-2 rounded-full border border-border bg-black/50">
                        <Calendar className="w-3.5 h-3.5 text-accent" />
                        {exp.duration}
                      </span>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="relative">
                    <div className="grid gap-4">
                      {exp.description.map((a, j) => (
                        <div
                          key={j}
                          className="group/item flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-accent/15 hover:bg-accent/5 transition-all duration-300"
                        >
                          <div className="mt-0.5 shrink-0">
                            <CheckCircle2 className="w-5 h-5 text-accent" />
                          </div>
                          <span className="text-text-secondary text-sm leading-relaxed group-hover/item:text-white/90 transition-colors">
                            {a}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
