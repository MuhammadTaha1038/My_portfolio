"use client";

import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import { Rocket, Layout, Shield, LineChart, Cpu } from "lucide-react";

const DIFFERENTIATORS = [
  {
    icon: Rocket,
    title: "Deploys ML Models",
    description:
      "Doesn't just train models - deploys them into production-ready API endpoints with monitoring and scaling.",
    stat: "Production-Ready",
  },
  {
    icon: Layout,
    title: "Full Backend Ecosystems",
    description:
      "Designs complete backend architectures, not isolated endpoints. Thinks in systems, not scripts.",
    stat: "Systems Thinking",
  },
  {
    icon: Cpu,
    title: "Architecture First",
    description:
      "Focuses on system design and architecture before writing code. Every implementation follows a blueprint.",
    stat: "Design-Driven",
  },
  {
    icon: Shield,
    title: "Security-First",
    description:
      "Every system built with authentication, validation, and security as foundational requirements.",
    stat: "Zero-Trust",
  },
  {
    icon: LineChart,
    title: "Business-Aware",
    description:
      "Understands the business context behind every technical decision. Engineering meets strategy.",
    stat: "ROI-Focused",
  },
];

export default function Differentiation() {
  return (
    <section id="approach" className="relative section-padding section-elevated overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-bg pointer-events-none opacity-40" />
      <div className="noise-overlay" />

      {/* Top divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="relative container-content">
        <AnimatedSection>
          <SectionHeading
            label="Approach"
            title="Engineering Approach"
            description="What sets my engineering practice apart from the ordinary."
          />
        </AnimatedSection>

        {/* Bento-style grid: 6 cols total. Row 1: 3 items spanning 2. Row 2: 2 items spanning 3. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {DIFFERENTIATORS.map((diff, i) => (
            <AnimatedSection
              key={diff.title}
              delay={i * 0.08}
              className={i < 3 ? "lg:col-span-2" : "lg:col-span-3"}
            >
              <div className="group h-full proj-card hover-lift p-6 md:p-8 cursor-default">
                
                <div className="relative h-full flex flex-col">
                  {/* Icon + stat badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div 
                      className="p-3 rounded-xl transition-all duration-300"
                      style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}
                    >
                      <diff.icon className="w-6 h-6" />
                    </div>
                    <span className="chip">
                      {diff.stat}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-3 group-hover:text-[var(--color-text)] transition-colors" style={{ color: "var(--color-text)" }}>
                    {diff.title}
                  </h3>

                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {diff.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
