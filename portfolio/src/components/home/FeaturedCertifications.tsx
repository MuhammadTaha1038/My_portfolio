import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, ExternalLink } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "../SectionHeading";

// Local DataCamp badges stored in public/certificate badges/data scientisst/
const DATACAMP_BADGE_PATH = "/certificate%20badges/data%20scientisst/DS%20-%20Badge%20with%20outline.png";

function isCertFromDataCamp(issuer: string): boolean {
  return issuer.toLowerCase().includes("datacamp");
}

export default async function FeaturedCertifications() {
  let certs: Awaited<ReturnType<typeof prisma.certificate.findMany>> = [];
  try {
    certs = await prisma.certificate.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      take: 2, // We need exactly 2 certs to fit the 3-col grid with the View All card
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
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {certs.map((cert) => {
              const isDataCamp = isCertFromDataCamp(cert.issuer);
              const displayImage = isDataCamp ? DATACAMP_BADGE_PATH : cert.image;
              const isLocalBadge = isDataCamp;

              return (
                <div
                  key={cert.id}
                  className="group flex flex-col proj-card hover-lift cursor-default"
                >
                  {/* Badge / thumbnail area */}
                  <div 
                    className="relative overflow-hidden flex items-center justify-center p-6 h-48"
                    style={{ background: isLocalBadge ? "var(--color-surface-2)" : "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}
                  >
                    {isLocalBadge ? (
                      <Image
                        src={displayImage}
                        alt={`${cert.issuer} badge`}
                        width={120}
                        height={120}
                        className="object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <>
                        <Image
                          src={displayImage}
                          alt={cert.title}
                          fill
                          className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      </>
                    )}
                    <div 
                      className="absolute top-3 right-3 p-2 rounded-lg"
                      style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}
                    >
                      <Award className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 flex flex-col flex-1" style={{ background: "var(--color-surface)" }}>
                    <h3 className="text-sm font-semibold leading-snug mb-1.5 line-clamp-2 transition-colors" style={{ color: "var(--color-text)" }}>
                      {cert.title}
                    </h3>
                    <p className="text-xs font-mono mb-4" style={{ color: "var(--color-text-secondary)" }}>{cert.issuer}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-[10px] font-mono" style={{ color: "var(--color-text-muted)" }}>{cert.dateEarned}</span>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover-text transition-colors"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* View all CTA card */}
            <Link 
              href="/certificates" 
              className="group proj-card hover-surface flex flex-col items-center justify-center gap-3 p-6 h-full transition-all"
              style={{ minHeight: "280px" }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                style={{ border: "1px solid var(--color-border)", background: "var(--color-surface-2)" }}
              >
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" style={{ color: "var(--color-text-secondary)" }} />
              </div>
              <span className="text-sm font-semibold transition-colors" style={{ color: "var(--color-text-secondary)" }}>
                <span className="group-hover:text-[var(--color-text)] transition-colors">View All Certificates</span>
              </span>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
