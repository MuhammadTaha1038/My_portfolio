"use client";

import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import { Server, BrainCircuit, Network, Wrench } from "lucide-react";

import * as LucideIcons from "lucide-react";

type TechCategory = {
  title: string;
  iconName?: string | null;
  skills: string[];
};

export default function TechStackClient({ categories }: { categories: TechCategory[] }) {
  return (
    <section id="stack" className="relative py-24 md:py-32 section-dark overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" />
      <div className="noise-overlay" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350px] h-[300px] bg-accent/3 rounded-full blur-[100px] pointer-events-none" />

      {/* Top divider */}
      <div className="section-divider" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-8">
        <AnimatedSection>
          <SectionHeading
            label="Tech Stack"
            title="Technical Arsenal"
            description="Production-tested technologies across the full data science and backend engineering pipeline."
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((cat, i) => {
            // @ts-ignore
            const IconComponent = cat.iconName && LucideIcons[cat.iconName] ? LucideIcons[cat.iconName] : LucideIcons.Code2;
            
            return (
            <AnimatedSection key={cat.title} delay={i * 0.1}>
              <div className="glass-card rounded-2xl p-6 md:p-8 h-full relative overflow-hidden gradient-border group">
                {/* Glow effect */}
                <div className="absolute -top-20 -right-20 w-44 h-44 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:bg-accent/15 transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{cat.title}</h3>
                      <p className="text-xs text-text-muted font-mono">
                        {cat.skills.length} capabilities
                      </p>
                    </div>
                  </div>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-xs font-mono text-text-secondary bg-white/[0.03] border border-white/[0.07] rounded-lg hover:border-accent/30 hover:text-accent hover:bg-accent/5 transition-all duration-200 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
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
