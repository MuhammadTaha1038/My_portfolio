"use client";

import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import Image from "next/image";
import { GraduationCap, Target, Lightbulb, Zap, Code2, BrainCircuit } from "lucide-react";

const FOCUS_ITEMS = [
  { icon: BrainCircuit, text: "Applied Machine Learning" },
  { icon: Target, text: "Data-Driven System Design" },
  { icon: Zap, text: "ML Deployment & API Integration" },
  { icon: Code2, text: "Backend Architecture & Security" },
  { icon: Lightbulb, text: "End-to-End Engineering Solutions" },
];

const PHILOSOPHY = [
  {
    title: "Production-Oriented",
    desc: "Systems are built with deployment, scaling, and maintainability in mind."
  },
  {
    title: "Security by Design",
    desc: "Authentication, authorization, validation and secure data handling are considered from the architecture stage."
  },
  {
    title: "Architecture Before Code",
    desc: "Data models and API contracts are defined before implementation begins."
  },
  {
    title: "Business-Aware Engineering",
    desc: "Technical decisions are aligned with practical business requirements and timelines."
  }
];

export default function Profile() {
  return (
    <section id="profile" className="section-padding" style={{ background: "var(--color-bg)" }}>
      <div className="container-content">
        <AnimatedSection>
          <SectionHeading
            label="About Me"
            title="Engineering Profile"
            description="Bridging data science and backend engineering to build production-ready, deployable systems."
          />
        </AnimatedSection>

        {/* Profile Grid: Photo/Bio + Cards */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          
          {/* Photo + Bio (Wider Column) */}
          <AnimatedSection className="lg:col-span-2">
            <div className="proj-card p-6 md:p-8 cursor-default">
              
              {/* Photo */}
              <div
                className="relative w-full aspect-square max-w-[280px] mx-auto mb-6 overflow-hidden"
                style={{ borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}
              >
                <Image
                  src="/about-me.png"
                  alt="Muhammad Taha"
                  fill
                  className="object-cover object-top"
                  sizes="280px"
                />
              </div>

              {/* Bio Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2" style={{ color: "var(--color-text)" }}>
                  <GraduationCap className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                  <h3 className="text-lg font-semibold">Muhammad Taha</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  Software Engineer at{" "}
                  <a href="https://ummahtechinnovations.com/" target="_blank" rel="noopener noreferrer" className="hover-text transition-colors" style={{ color: "var(--color-text)" }}>UmmahTech Innovations</a>,
                  specializing in <span style={{ color: "var(--color-text)" }}>Applied Data Science</span> and
                  Backend Systems Engineering. Studying at <span style={{ color: "var(--color-text)" }}>University of Engineering and Technology, Taxila</span>.
                  I build end-to-end pipelines that move from data exploration to real-world
                  deployment — integrating ML models into scalable backend architectures with
                  APIs, authentication, and structured database design.
                </p>
                
                {/* Location / Status*/}
                <div className="flex flex-wrap gap-2 pt-2 mb-4">
                  <span className="chip">Pakistan</span>
                  <span className="chip">Remote Ready</span>
                  <span className="chip">Open to Work</span>
                </div>

                {/* Currently Exploring */}
                <div className="mt-6 pt-6" style={{ borderTop: "1px solid var(--color-border)" }}>
                  <h4 className="text-eyebrow mb-2">Currently Exploring</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    Production ML systems, backend architecture, data-intensive applications, and practical AI engineering.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Side: Focus + Philosophy Cards */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4 lg:gap-6">
            {/* Core Focus Card */}
            <AnimatedSection delay={0.1} className="sm:col-span-2">
              <div className="proj-card p-6 md:p-8 cursor-default">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-3" style={{ color: "var(--color-text)" }}>
                  <div
                    className="flex items-center justify-center w-10 h-10"
                    style={{ borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", background: "var(--color-surface-2)" }}
                  >
                    <Target className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  Core Focus
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  {FOCUS_ITEMS.map((item) => (
                    <div
                      key={item.text}
                      className="group hover-border flex items-center gap-3 p-4 transition-colors"
                      style={{ borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface-2)" }}
                    >
                      <div
                        className="flex items-center justify-center w-8 h-8 shrink-0 transition-colors"
                        style={{ borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}
                      >
                        <item.icon className="w-4 h-4 hover-text group-hover:text-[var(--color-text)]" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm transition-colors hover-text group-hover:text-[var(--color-text)]" style={{ color: "var(--color-text-secondary)" }}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Philosophy Card */}
            <AnimatedSection delay={0.2} className="sm:col-span-2">
              <div className="proj-card p-6 md:p-8 cursor-default">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-3" style={{ color: "var(--color-text)" }}>
                  <div
                    className="flex items-center justify-center w-10 h-10"
                    style={{ borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", background: "var(--color-surface-2)" }}
                  >
                    <Lightbulb className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  How I approach engineering problems
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  {PHILOSOPHY.map((item) => (
                    <div
                      key={item.title}
                      className="hover-border flex flex-col gap-1 p-4 transition-colors group"
                      style={{ borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface-2)" }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-text-muted)" }} />
                        <span className="text-sm font-semibold transition-colors group-hover:text-[var(--color-text)]" style={{ color: "var(--color-text)" }}>
                          {item.title}
                        </span>
                      </div>
                      <span
                        className="text-xs leading-relaxed pl-3.5 transition-colors group-hover:border-[var(--color-border-hover)]"
                        style={{ color: "var(--color-text-muted)", borderLeft: "1px solid var(--color-border)" }}
                      >
                        {item.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
