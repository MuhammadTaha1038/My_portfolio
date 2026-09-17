import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Briefcase, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default async function CurrentPosition() {
  // Pull the top-ordered experience as the "current position"
  const topExp = await prisma.experience.findFirst({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  // Fallback static if no experiences in DB yet
  const role = topExp?.role ?? "Applied Data Scientist & Backend Engineer";
  const company = topExp?.company ?? "Freelance / Open to Opportunities";
  const duration = topExp?.duration ?? "2024 - Present";
  const highlights = topExp?.description ?? [
    "Building ML-powered backend systems deployed to production with FastAPI & AWS",
    "Designing automated data pipelines using Make.com, Klaviyo, and SendGrid",
    "Architecting full-stack applications with Next.js, PostgreSQL, and Prisma ORM",
  ];

  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 section-elevated" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      <div className="absolute bottom-0 left-0 right-0 h-px section-divider" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
            {/* Left: meta card */}
            <div className="lg:w-72 shrink-0">
              <span className="text-xs font-mono text-accent tracking-[0.2em] uppercase mb-4 block">Current Position</span>
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                </span>
                <span className="text-xs font-mono text-green-400">Open to Work</span>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-white/8">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent mt-0.5 shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm leading-snug">{role}</p>
                    <p className="text-accent font-mono text-xs mt-1">{company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-text-muted text-xs font-mono mt-3 pl-9">
                  <Calendar className="w-3 h-3" />
                  {duration}
                </div>
              </div>

              <Link
                href="/experience"
                className="mt-5 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors group"
              >
                Full experience
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right: highlights */}
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
                What I am building right now
              </h2>
              <div className="space-y-4">
                {highlights.slice(0, 4).map((h, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-accent/20 hover:bg-accent/5 transition-all duration-300"
                  >
                    <div className="shrink-0 mt-0.5">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                      {h}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}