"use client";

import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import { Server, BrainCircuit, Network, Wrench } from "lucide-react";

const STACK_CATEGORIES = [
  {
    icon: Server,
    title: "Backend Engineering",
    color: "#F5C518",
    skills: [
      { name: "FastAPI", level: 92 },
      { name: "Django", level: 85 },
      { name: "Node.js", level: 78 },
      { name: "REST APIs", level: 95 },
      { name: "JWT Auth", level: 90 },
      { name: "PostgreSQL", level: 88 },
      { name: "MySQL", level: 82 },
    ],
  },
  {
    icon: BrainCircuit,
    title: "Data & Machine Learning",
    color: "#FFE066",
    skills: [
      { name: "Pandas", level: 90 },
      { name: "NumPy", level: 88 },
      { name: "Scikit-learn", level: 85 },
      { name: "Feature Engineering", level: 82 },
      { name: "Model Evaluation", level: 80 },
      { name: "ML API Deployment", level: 88 },
    ],
  },
  {
    icon: Network,
    title: "System Architecture",
    color: "#D4A617",
    skills: [
      { name: "Microservices", level: 85 },
      { name: "Secure Payouts", level: 88 },
      { name: "Transaction Validation", level: 90 },
      { name: "Decision Engines", level: 92 },
      { name: "API Security", level: 87 },
    ],
  },
  {
    icon: Wrench,
    title: "DevOps & Tooling",
    color: "#F5C518",
    skills: [
      { name: "Docker", level: 82 },
      { name: "Git & GitHub", level: 95 },
      { name: "GitHub Actions", level: 78 },
      { name: "Linux", level: 80 },
      { name: "Postman", level: 90 },
      { name: "Vercel", level: 85 },
    ],
  },
];

export default function TechStack() {
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
            description="Production-tested technologies across the full backend and ML deployment pipeline."
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {STACK_CATEGORIES.map((cat, i) => (
            <AnimatedSection key={cat.title} delay={i * 0.1}>
              <div className="glass-card rounded-2xl p-6 md:p-8 h-full relative overflow-hidden gradient-border group">
                {/* Glow effect */}
                <div className="absolute -top-20 -right-20 w-44 h-44 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:bg-accent/15 transition-colors">
                      <cat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{cat.title}</h3>
                      <p className="text-xs text-text-muted font-mono">
                        {cat.skills.length} technologies
                      </p>
                    </div>
                  </div>

                  {/* Skills with progress bars */}
                  <div className="space-y-4">
                    {cat.skills.map((skill) => (
                      <div key={skill.name} className="group/skill">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm text-text-secondary group-hover/skill:text-white transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-xs font-mono text-accent/60">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="skill-bar">
                          <div
                            className="skill-bar-fill"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
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
