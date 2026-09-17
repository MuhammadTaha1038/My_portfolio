import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default async function FeaturedCaseStudy() {
  // Get the top case study (tier 1 with a slug)
  let project = null;
  try {
    project = await prisma.project.findFirst({
      where: { tier: 1, NOT: { slug: null } },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    // DB temporarily unavailable
  }

  if (!project) return null;

  return (
    <section className="relative py-0 overflow-hidden">
      <div className="relative min-h-[500px] md:min-h-[600px] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority={false}
          />
          <div className="cinematic-overlay absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
          <AnimatedSection className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-accent" />
              <span className="text-xs font-mono text-accent uppercase tracking-[0.2em]">Featured Case Study</span>
            </div>

            <span className="text-xs font-mono text-white/50 uppercase tracking-widest mb-3 block">{project.category}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
              {project.title}
            </h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-md">
              {project.description}
            </p>

            {/* Highlights preview */}
            {project.highlights.slice(0, 3).length > 0 && (
              <ul className="space-y-3 mb-10">
                {project.highlights.slice(0, 3).map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="leading-snug">{h}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex items-center gap-4">
              <Link
                href={`/projects/${project.slug}`}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-accent text-black font-bold rounded-xl hover:bg-accent/90 transition-all shadow-[0_0_30px_rgba(245,197,24,0.25)] hover:shadow-[0_0_50px_rgba(245,197,24,0.4)]"
              >
                <BookOpen className="w-4 h-4" />
                Read Full Case Study
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
