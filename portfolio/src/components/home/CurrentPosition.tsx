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
            <div className="lg:w-72 shrink-0">
              <span className="text-eyebrow mb-4 block">Current Position</span>
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                </span>
                <span className="text-xs font-mono" style={{ color: "var(--color-text-secondary)" }}>Open to Work</span>
              </div>

              <div className="proj-card p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div 
                    className="p-2 rounded-lg mt-0.5 shrink-0" 
                    style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}
                  >
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm leading-snug" style={{ color: "var(--color-text)" }}>{role}</p>
                    <p className="font-mono text-xs mt-1" style={{ color: "var(--color-text-secondary)" }}>{company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono mt-3 pl-9" style={{ color: "var(--color-text-muted)" }}>
                  <Calendar className="w-3 h-3" />
                  {duration}
                </div>
              </div>

              <Link
                href="/experience"
                className="mt-5 inline-flex items-center gap-2 text-sm transition-colors group"
                style={{ color: "var(--color-text-secondary)" }}
              >
                <span className="group-hover:text-[var(--color-text)] transition-colors">Full experience</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:text-[var(--color-text)] transition-all" />
              </Link>
            </div>

            {/* Right: highlights */}
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight" style={{ color: "var(--color-text)" }}>
                What I am building right now
              </h2>
              <div className="space-y-4">
                {highlights.slice(0, 4).map((h, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-4 p-4 rounded-xl transition-all duration-300"
                    style={{ 
                      background: "var(--color-surface-2)", 
                      border: "1px solid var(--color-border)" 
                    }}
                  >
                    <div className="shrink-0 mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <p className="text-sm leading-relaxed transition-colors" style={{ color: "var(--color-text-secondary)" }}>
                      <span className="group-hover:text-[var(--color-text)] transition-colors">{h}</span>
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