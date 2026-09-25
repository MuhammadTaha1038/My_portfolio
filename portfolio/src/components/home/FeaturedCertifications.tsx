import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
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
            viewAllLink="/certificates"
            viewAllText="View all certificates"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {certs.map((cert, index) => {
              const isLatest = index === 0;

              return (
                <div
                  key={cert.id}
                  className="group flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden hover:border-[var(--color-border-hover)] transition-colors relative"
                >
                  {/* Badge / thumbnail area */}
                  <div className="relative overflow-hidden flex items-center justify-center p-8 h-56 bg-[var(--color-surface-2)] border-b border-[var(--color-border)]">
                    {isLatest && (
                      <div className="absolute top-4 left-4 px-2 py-1 rounded-full border border-[var(--color-accent)] bg-[var(--color-surface)] z-10 flex items-center justify-center shadow-sm">
                        <span className="text-[11px] font-mono uppercase text-[var(--color-text-primary)] leading-none tracking-wider font-medium">Latest</span>
                      </div>
                    )}
                    <Image
                      src={cert.image}
                      alt={`${cert.title} badge`}
                      fill
                      className="object-contain p-8 drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-[18px] font-semibold leading-snug mb-1 text-[var(--color-text-primary)]">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-8">{cert.issuer}</p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-border)]">
                      <span className="text-sm font-mono text-[var(--color-text-muted)]">{cert.dateEarned}</span>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors flex items-center justify-center"
                          aria-label={`View credential for ${cert.title}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
