import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "../SectionHeading";

export default async function FeaturedCertifications() {
  let certs: Awaited<ReturnType<typeof prisma.certificate.findMany>> = [];
  try {
    certs = await prisma.certificate.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      take: 2, 
    });
  } catch {
    // DB temporarily unavailable
  }

  if (certs.length === 0) return null;

  // We need at least one cert for this display
  const frontBadge = certs[0];
  const backBadge = certs.length > 1 ? certs[1] : certs[0];

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 section-dark" />
      <div className="absolute inset-0 dot-bg opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      <div className="relative container-content">
        <AnimatedSection>
          <SectionHeading
            label="Credentials"
            title="Certified & verified."
            description="Industry-recognized certifications from leading platforms."
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[12px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-12 hover:border-[var(--color-border-hover)] transition-colors w-full">
            {/* Left Side */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 w-full md:w-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://www.google.com/s2/favicons?domain=datacamp.com&sz=128" 
                alt="DataCamp" 
                width={48} 
                height={48} 
                className="mb-6 rounded-md opacity-90 object-contain" 
              />
              <h3 className="text-[28px] md:text-[32px] font-bold text-[var(--color-text-primary)] mb-3 relative inline-block">
                Certified Data Scientist
                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[var(--color-accent)] rounded-full" />
              </h3>
              <p className="text-base text-[var(--color-text-secondary)] mb-8">
                {certs.length} certifications earned on DataCamp
              </p>
              <Link 
                href="/certificates" 
                className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-medium"
              >
                View certificates <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Right Side - Badge Stack */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 shrink-0 flex items-center justify-center">
              {/* Back badge */}
              <div className="absolute w-36 h-36 md:w-48 md:h-48 transition-all duration-200 -rotate-6 translate-x-4 translate-y-4 group-hover:-translate-x-12 group-hover:-rotate-2 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] shadow-sm z-0">
                <Image 
                  src={backBadge.image} 
                  alt="secondary badge" 
                  fill 
                  className="object-contain p-4 drop-shadow-md" 
                />
              </div>
              {/* Front badge */}
              <div className="absolute w-36 h-36 md:w-48 md:h-48 transition-all duration-200 rotate-3 -translate-x-4 -translate-y-4 group-hover:translate-x-12 group-hover:rotate-0 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] shadow-md z-10">
                <Image 
                  src={frontBadge.image} 
                  alt="primary badge" 
                  fill 
                  className="object-contain p-4 drop-shadow-lg" 
                />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
