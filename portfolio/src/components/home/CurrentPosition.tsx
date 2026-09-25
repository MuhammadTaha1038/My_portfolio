import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { ExperienceCard, parseDates, type ExperienceType } from "@/components/ExperienceCard";

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
  const exp: ExperienceType = {
    id: topExp?.id ?? "1",
    role: topExp?.role ?? "Software Engineer",
    company: topExp?.company ?? "Freelance / Open to Opportunities",
    duration: topExp?.duration ?? "2024 - Present",
    description: topExp?.description ?? [
      "Building ML-powered backend systems deployed to production with FastAPI & AWS",
      "Designing automated data pipelines using Make.com, Klaviyo, and SendGrid",
      "Architecting full-stack applications with Next.js, PostgreSQL, and Prisma ORM",
    ]
  };

  const parsed = parseDates(exp.duration);

  return (
    <section id="experience" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 section-elevated" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      <div className="absolute bottom-0 left-0 right-0 h-px section-divider" />
      
      <div className="relative container-content">
        <AnimatedSection>
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Header Block */}
            <div className="w-full">
              <span className="text-eyebrow mb-4 block">Current Position</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-text)]">
                What I am building right now
              </h2>
            </div>

            <ExperienceCard 
              exp={exp} 
              isCurrent={true} 
              maxMonths={parsed.months} 
              footer={
                <Link
                  href="/experience"
                  className="inline-flex items-center gap-2 text-sm transition-colors group text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                >
                  <span>Full experience</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                </Link>
              }
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}