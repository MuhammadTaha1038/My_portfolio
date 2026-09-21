"use client";

import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import * as LucideIcons from "lucide-react";

type TechCategory = {
  title: string;
  iconName?: string | null;
  skills: string[];
};

export default function TechStackClient({ categories }: { categories: TechCategory[] }) {
  return (
    <section
      id="stack"
      className="section-padding"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="container-content">
        <AnimatedSection>
          <SectionHeading
            label="Tech Stack"
            title="Technical Arsenal"
            description="Production-tested technologies across the full data science and backend engineering pipeline."
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
          {categories.map((cat, i) => {
            // @ts-ignore
            const IconComponent = cat.iconName && LucideIcons[cat.iconName] ? LucideIcons[cat.iconName] : LucideIcons.Code2;
            
            return (
              <AnimatedSection key={cat.title} delay={i * 0.1}>
                <div
                  className="proj-card h-full p-6 md:p-8"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6 pb-6" style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <div
                      className="flex items-center justify-center shrink-0 w-12 h-12"
                      style={{
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--color-border)",
                        background: "var(--color-surface-2)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      <IconComponent className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold" style={{ color: "var(--color-text)" }}>{cat.title}</h3>
                      <p className="text-eyebrow mt-1" style={{ fontSize: "10px" }}>
                        {cat.skills.length} capabilities
                      </p>
                    </div>
                  </div>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span key={skill} className="chip">
                        {skill}
                      </span>
                    ))}
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
