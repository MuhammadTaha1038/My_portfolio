"use client";

import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import { Rocket, Layout, Shield, LineChart, Cpu } from "lucide-react";

const DIFFERENTIATORS = [
  {
    icon: Rocket,
    title: "Deploys ML Models",
    description:
      "Doesn't just train models — deploys them into production-ready API endpoints with monitoring and scaling.",
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
    <section id="approach" className="relative py-24 md:py-32 section-elevated overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-bg pointer-events-none opacity-40" />
      <div className="noise-overlay" />
      <div className="absolute bottom-20 left-0 w-[350px] h-[350px] bg-accent/3 rounded-full blur-[100px] pointer-events-none" />

      {/* Top divider */}
      <div className="section-divider" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-8">
        <AnimatedSection>
          <SectionHeading
            label="Approach"
            title="Engineering Approach"
            description="What sets my engineering practice apart from the ordinary."
          />
        </AnimatedSection>

        {/* Bento-style grid */}
        <div className="bento-grid">
          {DIFFERENTIATORS.map((diff, i) => (
            <AnimatedSection
              key={diff.title}
              delay={i * 0.08}
              className={`col-span-12 ${i < 2 ? 'md:col-span-6' : 'md:col-span-4'}`}
            >
              <div className="bento-item h-full p-6 md:p-8 group flex flex-col justify-between">
                
                <div className="relative z-10">
                  {/* Icon + stat badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-black transition-colors duration-300">
                      <diff.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase px-3 py-1 border border-white/10 rounded-full bg-white/5">
                      {diff.stat}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-accent transition-colors">
                    {diff.title}
                  </h3>

                  <p className="text-text-secondary text-sm leading-relaxed">
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
