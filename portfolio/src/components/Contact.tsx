"use client";

import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { Mail, Check, Copy, ArrowUpRight, MapPin, Clock, MessageCircle } from "lucide-react";

/* ── Authentic Brand SVGs ── */
const WhatsAppIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} shrink-0`} fill="#25D366" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const GmailIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} shrink-0`} fill="#EA4335" aria-hidden>
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="#0A66C2" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="#FFFFFF" aria-hidden>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
  </svg>
);

const KaggleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="#20BEFF" aria-hidden>
    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.336z"/>
  </svg>
);

const SOCIAL_PROFILES = [
  {
    name: "LinkedIn",
    handle: "muhammad-taha",
    href: "https://www.linkedin.com/in/muhammad-taha-b88807248",
    Icon: LinkedInIcon,
    detail: "Professional networking, roles, and career updates",
    cta: "Connect on LinkedIn",
  },
  {
    name: "GitHub",
    handle: "MuhammadTaha1038",
    href: "https://github.com/MuhammadTaha1038",
    Icon: GitHubIcon,
    detail: "Repositories, system architectures, and open source",
    cta: "Explore Repositories",
  },
  {
    name: "Kaggle",
    handle: "muhammadtaha1038",
    href: "https://www.kaggle.com/muhammadtaha1038",
    Icon: KaggleIcon,
    detail: "Machine learning models, notebooks, and datasets",
    cta: "View Kaggle Profile",
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const emailAddress = "contact.taha2005@gmail.com";
  const whatsappNumber = "923432744101";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi Taha, I visited your portfolio website and would like to discuss a project / opportunity."
  )}`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section
      id="contact"
      className="pt-10 pb-16 md:pb-24 overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="container-content max-w-5xl">
        <AnimatedSection>
          {/* Header Block */}
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <span className="text-eyebrow block mb-3">Contact</span>
            <h1 className="text-3xl md:text-4xl lg:text-[44px] font-bold tracking-tight text-[var(--color-text)] mb-4 leading-tight">
              Let&apos;s Build Something Useful
            </h1>
            <p className="text-[17px] leading-[1.7] text-[var(--color-text-secondary)]">
              Whether you have an engineering role, a machine learning pipeline, full-stack development, or a backend architecture to discuss, feel free to reach out directly through WhatsApp, email, or LinkedIn.
            </p>
          </div>
        </AnimatedSection>

        {/* Primary Channels: 2-Column Hero Cards */}
        <AnimatedSection delay={0.05}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* WhatsApp Hero Card */}
            <div
              className="p-7 md:p-8 rounded-[var(--radius-md)] border flex flex-col justify-between transition-all duration-200"
              style={{
                background: "var(--color-surface)",
                borderColor: "rgba(37, 211, 102, 0.3)",
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-12 h-12 rounded-[var(--radius-sm)] flex items-center justify-center border"
                      style={{
                        background: "rgba(37, 211, 102, 0.08)",
                        borderColor: "rgba(37, 211, 102, 0.25)",
                      }}
                    >
                      <WhatsAppIcon />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#25D366] font-semibold block">
                        Instant WhatsApp
                      </span>
                      <span className="text-lg md:text-xl font-bold text-[var(--color-text)]">
                        +92 343 2744101
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                    Fastest
                  </span>
                </div>

                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  Direct two-way messaging for quick project discussions, questions, and immediate communication.
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-[var(--radius-sm)] text-sm font-semibold text-black bg-[#25D366] hover:brightness-105 active:scale-[0.99] transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-black text-[#25D366]" />
                Chat on WhatsApp
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Direct Email Card */}
            <div
              className="p-7 md:p-8 rounded-[var(--radius-md)] border flex flex-col justify-between transition-all duration-200"
              style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-12 h-12 rounded-[var(--radius-sm)] flex items-center justify-center border"
                      style={{
                        background: "rgba(234, 67, 53, 0.08)",
                        borderColor: "rgba(234, 67, 53, 0.25)",
                      }}
                    >
                      <GmailIcon />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] font-semibold block">
                        Direct Email
                      </span>
                      <a
                        href={`mailto:${emailAddress}`}
                        className="text-base md:text-lg font-bold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors break-all"
                      >
                        {emailAddress}
                      </a>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-muted)]">
                    Official
                  </span>
                </div>

                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  For engineering opportunities, detailed technical specifications, or formal contract consulting.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-mono font-medium rounded-[var(--radius-sm)] border transition-all cursor-pointer"
                  style={{
                    background: copied ? "rgba(34, 197, 94, 0.1)" : "var(--color-surface-2)",
                    borderColor: copied ? "#22c55e" : "var(--color-border)",
                    color: copied ? "#22c55e" : "var(--color-text)",
                  }}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      Copied to Clipboard
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[var(--color-text-muted)]" />
                      Copy Email Address
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${emailAddress}`}
                  className="inline-flex items-center justify-center gap-1.5 py-3 px-5 text-xs font-mono font-medium rounded-[var(--radius-sm)] border text-[var(--color-accent)] border-[var(--color-border)] hover:bg-[var(--color-surface-2)] transition-all"
                >
                  <Mail className="w-4 h-4" />
                  Compose
                </a>
              </div>
            </div>

          </div>
        </AnimatedSection>

        {/* Secondary Channels: 3-Up Professional Profiles Grid */}
        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {SOCIAL_PROFILES.map(({ name, handle, href, Icon, detail, cta }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-[var(--radius-md)] border flex flex-col justify-between transition-all duration-200 hover:border-[var(--color-border-hover)]"
                style={{
                  background: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-[var(--radius-sm)] flex items-center justify-center border"
                      style={{
                        background: "var(--color-surface-2)",
                        borderColor: "var(--color-border)",
                      }}
                    >
                      <Icon />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  <h2 className="text-base font-bold text-[var(--color-text)] mb-0.5">
                    {name}
                  </h2>
                  <span className="text-xs font-mono text-[var(--color-text-muted)] block mb-3">
                    @{handle}
                  </span>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-5">
                    {detail}
                  </p>
                </div>

                <span className="text-xs font-mono text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors flex items-center gap-1 font-medium">
                  {cta} &rarr;
                </span>
              </a>
            ))}
          </div>
        </AnimatedSection>

        {/* Status & Availability Strip */}
        <AnimatedSection delay={0.15}>
          <div
            className="p-5 md:p-6 rounded-[var(--radius-md)] border grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-xs font-mono text-center md:text-left"
            style={{
              background: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <div>
                <span className="text-[var(--color-text-muted)] uppercase tracking-wider block text-[10px]">
                  STATUS
                </span>
                <span className="text-[var(--color-text)] font-medium">
                  Looking for opportunities
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3 md:border-l md:border-[var(--color-border)] md:pl-6">
              <MapPin className="w-4 h-4 text-[var(--color-text-muted)] shrink-0" />
              <div>
                <span className="text-[var(--color-text-muted)] uppercase tracking-wider block text-[10px]">
                  LOCATION
                </span>
                <span className="text-[var(--color-text)] font-medium">
                  Pakistan (Remote Worldwide)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3 md:border-l md:border-[var(--color-border)] md:pl-6">
              <Clock className="w-4 h-4 text-[var(--color-text-muted)] shrink-0" />
              <div>
                <span className="text-[var(--color-text-muted)] uppercase tracking-wider block text-[10px]">
                  RESPONSE TIME
                </span>
                <span className="text-[var(--color-text)] font-medium">
                  Typically within 24 hours
                </span>
              </div>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
