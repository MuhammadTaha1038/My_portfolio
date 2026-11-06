"use client";

import AnimatedSection from "./AnimatedSection";
import Image from "next/image";

export default function Profile() {
  return (
    <section id="profile" className="pt-10 pb-16 md:pb-24 overflow-hidden" style={{ background: "var(--color-bg)" }}>
      <div className="container-content">
        <AnimatedSection>
          {/* Two-column layout at >=1024px: portrait left, text right */}
          <div className="flex flex-col lg:grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Portrait */}
            <div className="w-full flex justify-center lg:justify-start">
              <div
                className="relative overflow-hidden w-full max-w-[280px] lg:max-w-none shrink-0"
                style={{
                  width: "clamp(240px, 24vw, 320px)",
                  aspectRatio: "4/5",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-surface)",
                }}
              >
                <Image
                  src="/hero.png"
                  alt="Muhammad Taha, Applied Data Scientist and Backend Systems Engineer"
                  fill
                  className="object-cover object-[center_20%]"
                  priority
                  sizes="(max-width: 1024px) 280px, 320px"
                />
              </div>
            </div>

            {/* Right Column: Eyebrow, H1, Role, Bio, Facts */}
            <div className="flex flex-col w-full max-w-[62ch]">
              {/* Mono Eyebrow aligned to top of portrait */}
              <span className="text-eyebrow block mb-3">About Me</span>

              {/* H1 Name */}
              <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold tracking-tight text-[var(--color-text)] mb-2 leading-tight">
                Muhammad Taha
              </h1>

              {/* Role Line */}
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-6">
                APPLIED DATA SCIENTIST &amp; BACKEND SYSTEMS ENGINEER
              </p>

              {/* Bio Copy */}
              <div className="flex flex-col gap-4 text-[17px] leading-[1.7] text-[var(--color-text-secondary)] mb-8">
                <p>
                  I build data-driven applications and intelligent systems at the intersection of Data Science, AI, and Backend Engineering.
                </p>
                <p>
                  My technical journey has evolved from data analysis and predictive modeling into Machine Learning, Deep Learning, and now Agentic AI. Over time, I&apos;ve developed a broader perspective on software engineering, where building a model or implementing a feature is only one part of delivering a complete solution.
                </p>
                <p>
                  I believe a model alone isn&apos;t a product. It needs reliable APIs, data pipelines, backend infrastructure, and well-designed workflows to create real-world value. That&apos;s the engineering layer I particularly enjoy working on.
                </p>
                <p>
                  As part of the UmmahTech Innovations team, I&apos;ve gained hands-on experience across the software development lifecycle, from understanding requirements and designing system architecture to implementation, integration, and deployment. I also leverage AI-assisted development tools to accelerate engineering workflows and turn ideas into functional software systems.
                </p>
                <p>
                  My current focus is on advancing the intersection of Machine Learning, Deep Learning, Agentic AI, and production-oriented software engineering, building systems that are not only technically capable but also practical, scalable, and useful.
                </p>
              </div>

              {/* Facts List */}
              <div className="pt-6 border-t border-[var(--color-border)] flex flex-col gap-3 font-mono text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 py-1.5">
                  <span className="text-[var(--color-text-muted)] uppercase tracking-wider w-24 shrink-0">
                    LOCATION
                  </span>
                  <span className="text-[var(--color-text)] font-medium">Pakistan</span>
                </div>
              </div>
            </div>

          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
