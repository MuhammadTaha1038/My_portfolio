import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, ExternalLink } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

// Local DataCamp badges stored in public/certificate badges/data scientisst/
const DATACAMP_BADGE_PATH = "/certificate badges/data scientisst/DS - Badge with outline.png";

function isCertFromDataCamp(issuer: string): boolean {
  return issuer.toLowerCase().includes("datacamp");
}

export default async function FeaturedCertifications() {
  const certs = await prisma.certificate.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    take: 4,
  });

  if (certs.length === 0) return null;

  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 section-dark" />
      <div className="absolute inset-0 dot-bg opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      <div className="absolute -bottom-20 left-1/4 w-[500px] h-[300px] bg-accent/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-mono text-accent tracking-[0.2em] uppercase mb-3 block">Credentials</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Certified & verified.
            </h2>
            <p className="text-text-secondary text-base mt-2 max-w-md">
              Industry-recognized certifications from leading platforms.
            </p>
          </div>
          <Link href="/certificates" className="group inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-accent transition-colors shrink-0">
            View all certificates
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory">
            {certs.map((cert) => {
              const isDataCamp = isCertFromDataCamp(cert.issuer);
              const displayImage = isDataCamp ? DATACAMP_BADGE_PATH : cert.image;
              const isLocalBadge = isDataCamp;

              return (
                <div
                  key={cert.id}
                  className="group shrink-0 w-[260px] sm:w-[300px] snap-start glass-card rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300 gradient-border"
                >
                  {/* Badge / thumbnail area */}
                  <div className={`relative overflow-hidden ${isLocalBadge ? "bg-[#05c2de]/5 flex items-center justify-center p-6 h-40" : "h-40 bg-black/40"}`}>
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
                          sizes="300px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      </>
                    )}
                    <div className="absolute top-3 right-3 p-2 bg-accent/15 rounded-lg border border-accent/20">
                      <Award className="w-4 h-4 text-accent" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="text-sm font-semibold text-white leading-snug mb-1.5 line-clamp-2 group-hover:text-accent/90 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-mono text-accent mb-2">{cert.issuer}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-text-muted">{cert.dateEarned}</span>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-muted hover:text-accent transition-colors"
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
            <Link href="/certificates" className="group shrink-0 w-[180px] snap-start rounded-2xl border border-white/8 bg-white/[0.02] hover:border-accent/30 hover:bg-accent/5 transition-all flex flex-col items-center justify-center gap-3 p-6">
              <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="text-xs font-semibold text-text-secondary group-hover:text-white transition-colors text-center">View All</span>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
