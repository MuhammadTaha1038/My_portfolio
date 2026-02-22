"use client";

import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import Image from "next/image";
import { GraduationCap, Target, Lightbulb, Zap, Code2 } from "lucide-react";

const FOCUS_ITEMS = [
  { icon: Target, text: "Backend API Architecture" },
  { icon: Zap, text: "Decision Intelligence Systems" },
  { icon: Code2, text: "Secure Payout Logic Design" },
  { icon: Lightbulb, text: "ML System Deployment" },
];

const PHILOSOPHY = [
  "Production-first mindset",
  "Clean system architecture",
  "Business-aware engineering",
  "Security-focused implementation",
];

export default function Profile() {
  return (
    <section id="profile" className="relative py-24 md:py-32 section-elevated overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 dot-bg pointer-events-none opacity-50" />
      <div className="noise-overlay" />
      <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-accent/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <SectionHeading
            label="About Me"
            title="Engineering Profile"
            description="Building systems that bridge the gap between raw data and production-ready intelligence."
          />
        </AnimatedSection>

        {/* Profile Grid: Photo/Bio + Cards */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          
          {/* Photo + Bio (Wider Column) */}
          <AnimatedSection direction="left" className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              
              {/* Photo */}
              <div className="relative w-full aspect-square max-w-[280px] mx-auto mb-6 rounded-2xl overflow-hidden border border-accent/20">
                <Image
                  src="/profile.png"
                  alt="Muhammad Taha"
                  fill
                  className="object-cover object-top"
                  sizes="280px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Bio Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-accent shrink-0" />
                  <h3 className="text-lg font-semibold">Muhammad Taha</h3>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Software Engineering student at <span className="text-accent">UET Taxila</span> with
                  specialization in backend systems and data-driven architecture.
                  Focused on building production-grade engineering solutions
                  that solve real-world problems.
                </p>
                
                {/* Location / Status*/}
                <div className="flex flex-wrap gap-3 pt-2">
                  <span className="px-3 py-1 text-xs font-mono text-accent bg-accent/10 rounded-full border border-accent/20">
                    Pakistan
                  </span>
                  <span className="px-3 py-1 text-xs font-mono text-accent bg-accent/10 rounded-full border border-accent/20">
                    Remote Ready
                  </span>
                  <span className="px-3 py-1 text-xs font-mono text-accent bg-accent/10 rounded-full border border-accent/20">
                    Freelancer
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Side: Focus + Philosophy Cards */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6">
            {/* Core Focus Card */}
            <AnimatedSection delay={0.1} className="sm:col-span-2">
              <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden gradient-border">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
                
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <Target className="w-5 h-5" />
                  </div>
                  Core Focus
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  {FOCUS_ITEMS.map((item) => (
                    <div
                      key={item.text}
                      className="group flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-accent/20 hover:bg-accent/5 transition-all duration-300"
                    >
                      <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors shrink-0">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-text-secondary group-hover:text-white transition-colors">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Philosophy Card */}
            <AnimatedSection delay={0.2} className="sm:col-span-2">
              <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden gradient-border">
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
                
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  Engineering Philosophy
                </h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  {PHILOSOPHY.map((item, i) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 p-3 rounded-lg shimmer relative"
                      style={{ animationDelay: `${i * 0.5}s` }}
                    >
                      <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                      <span className="text-sm text-text-secondary">{item}</span>
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
