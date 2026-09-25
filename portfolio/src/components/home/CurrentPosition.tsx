import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Briefcase, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default async function CurrentPosition() {
  // Pull the top-ordered experience as the "current position"
  let topExp = null;
  try {
    topExp = await prisma.experience.findFirst({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    // DB temporarily unavailable - use fallback content below
  }

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
    <section id="experience" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 section-elevated" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      <div className="absolute bottom-0 left-0 right-0 h-px section-divider" />
      
      {/* Glow removed to adhere to neutral tokens */}

      <div className="relative container-content">
        <AnimatedSection>
          <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16">
            {/* Left: meta card */}
            <div className="lg:w-64 shrink-0 flex flex-col justify-between">
              <span className="text-eyebrow mb-4 block">Current Position</span>
              
              <Link
                href="/experience"
                className="mt-2 inline-flex items-center gap-2 text-sm transition-colors group text-[var(--color-text-secondary)]"
              >
                <span className="group-hover:text-[var(--color-text)] transition-colors">Full experience</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:text-[var(--color-text)] transition-all" />
              </Link>
            </div>

            {/* Right: merged card */}
            <div className="flex-1 w-full">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight text-[var(--color-text)]">
                What I am building right now
              </h2>
              
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden w-full">
                {/* Header Row */}
                <div className="p-4 sm:p-6 flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 w-full sm:w-auto">
                    <div className="p-2.5 sm:p-3 rounded-lg shrink-0 bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-secondary)]">
                      <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <span className="font-semibold text-sm sm:text-base text-[var(--color-text)]">{role}</span>
                      <span className="hidden sm:inline text-[var(--color-text-muted)]">•</span>
                      <span className="text-[var(--color-text-secondary)] font-mono text-xs sm:text-sm">{company}</span>
                      <span className="hidden sm:inline text-[var(--color-text-muted)]">•</span>
                      <span className="text-[var(--color-text-secondary)] font-mono text-xs sm:text-sm">{duration}</span>
                    </div>
                  </div>
                  
                  {/* Open to Work Pill */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/10 bg-emerald-500/5 shrink-0 mt-2 sm:mt-0">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
                    <span className="text-xs font-mono text-[var(--color-text-secondary)]">Open to Work</span>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-[var(--color-border)] w-full" />
                
                {/* List */}
                <ul className="p-4 sm:p-6 flex flex-col gap-4">
                  {highlights.slice(0, 4).map((h: string, i: number) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <div className="shrink-0 mt-[10px] w-1.5 h-1.5 bg-[var(--color-text-muted)] rounded-sm group-hover:bg-[var(--color-text-secondary)] transition-colors" />
                      <p className="text-[var(--color-text-secondary)] leading-[1.7] text-sm sm:text-base">
                        {h}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}