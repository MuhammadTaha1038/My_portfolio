"use client";

import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import Image from "next/image";

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

        {/* 2-Column Intro: Left Portrait, Right Bio + Facts */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-col lg:grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-start">
            
            {/* Left Column: Portrait */}
            <div className="w-full flex justify-center lg:justify-start">
              <div
                className="relative overflow-hidden w-full max-w-[280px] lg:w-[320px] shrink-0"
                style={{
                  aspectRatio: "4/5",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-surface)",
                }}
              >
                <Image
                  src="/hero.png"
                  alt="Muhammad Taha, Applied Data Scientist and Backend Engineer"
                  fill
                  className="object-cover object-[center_20%]"
                  priority
                  sizes="(max-width: 1024px) 280px, 320px"
                />
              </div>
            </div>

            {/* Right Column: Bio + Facts */}
            <div className="flex flex-col w-full max-w-[62ch]">
              {/* Name & Role */}
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text)] mb-2">
                  Muhammad Taha
                </h1>
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                  Software Engineer &amp; Applied Data Scientist
                </p>
              </div>

              {/* Bio copy (strictly preserved) */}
              <p
                className="text-[17px] leading-[1.7] text-[var(--color-text-secondary)] mb-8"
              >
                Software Engineer at{" "}
                <a
                  href="https://ummahtechinnovations.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text)] underline decoration-[var(--color-border-hover)] hover:decoration-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                >
                  UmmahTech Innovations
                </a>
                , specializing in{" "}
                <span className="text-[var(--color-text)] font-medium">Applied Data Science</span> and
                Backend Systems Engineering. Studying at{" "}
                <span className="text-[var(--color-text)] font-medium">
                  University of Engineering and Technology, Taxila
                </span>
                . I build end-to-end pipelines that move from data exploration to real-world
                deployment, integrating ML models into scalable backend architectures with
                APIs, authentication, and structured database design.
              </p>

              {/* Facts list */}
              <div className="pt-6 border-t border-[var(--color-border)] flex flex-col gap-3 font-mono text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 py-1.5 border-b border-[var(--color-border)]/40 last:border-0">
                  <span className="text-[var(--color-text-muted)] uppercase tracking-wider w-24 shrink-0">
                    LOCATION
                  </span>
                  <span className="text-[var(--color-text)] font-medium">Pakistan</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 py-1.5 border-b border-[var(--color-border)]/40 last:border-0">
                  <span className="text-[var(--color-text-muted)] uppercase tracking-wider w-24 shrink-0">
                    STUDYING
                  </span>
                  <span className="text-[var(--color-text)] font-medium">
                    University of Engineering and Technology, Taxila
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 py-1.5 border-b border-[var(--color-border)]/40 last:border-0">
                  <span className="text-[var(--color-text-muted)] uppercase tracking-wider w-24 shrink-0">
                    WORKING
                  </span>
                  <span className="text-[var(--color-text)] font-medium">
                    UmmahTech Innovations (2025 to present)
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 py-1.5 border-b border-[var(--color-border)]/40 last:border-0">
                  <span className="text-[var(--color-text-muted)] uppercase tracking-wider w-24 shrink-0">
                    STATUS
                  </span>
                  <span className="text-[var(--color-text)] font-medium inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                    Open to Work
                  </span>
                </div>
              </div>
            </div>

          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
