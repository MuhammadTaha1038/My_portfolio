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
                  alt="Muhammad Taha, Applied Data Scientist and Backend Engineer"
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
                APPLIED DATA SCIENTIST &amp; BACKEND ENGINEER
              </p>

              {/* Bio Copy */}
              <div className="flex flex-col gap-4 text-[17px] leading-[1.7] text-[var(--color-text-secondary)] mb-8">
                <p>
                  I&apos;m a software engineering student at UET Taxila. I started with data analysis, moved into data science and then deep learning, and right now I&apos;m focused on agentic AI.
                </p>
                <p>
                  What I care about most is the part after the model works. A model on its own isn&apos;t a solution. It needs APIs, data pipelines and a workflow around it before anyone can use it, and I like building that part.
                </p>
                <p>
                  I&apos;m part of the UmmahTech Innovations team, where I work through the whole build, from requirements and architecture to integration and deployment. I use AI coding tools along the way.
                </p>
                <p>
                  Two projects to start with: Tasty Bytes, a model that predicts which recipes drive high traffic, and International Tijarat, a multi-vendor e-commerce platform.
                </p>
              </div>

              {/* Facts List */}
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
                    TEAM
                  </span>
                  <span className="text-[var(--color-text)] font-medium">
                    UmmahTech Innovations
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 py-1.5 border-b border-[var(--color-border)]/40 last:border-0">
                  <span className="text-[var(--color-text-muted)] uppercase tracking-wider w-24 shrink-0">
                    STATUS
                  </span>
                  <span className="text-[var(--color-text)] font-medium inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                    Looking for opportunities
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
