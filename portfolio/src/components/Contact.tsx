"use client";

import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { Mail, Check, Copy, ArrowUpRight, Send, MapPin, Clock, MessageCircle } from "lucide-react";

/* ── Official Brand SVGs with Authentic Colors ── */
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="#25D366" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
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

const GmailIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="#EA4335" aria-hidden>
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
  </svg>
);

const SOCIAL_PROFILES = [
  {
    name: "LinkedIn",
    handle: "muhammad-taha",
    href: "https://www.linkedin.com/in/muhammad-taha-b88807248",
    Icon: LinkedInIcon,
    accentColor: "#0A66C2",
    detail: "Professional profile & networking",
  },
  {
    name: "GitHub",
    handle: "MuhammadTaha1038",
    href: "https://github.com/MuhammadTaha1038",
    Icon: GitHubIcon,
    accentColor: "#FFFFFF",
    detail: "Codebases, repositories & open source",
  },
  {
    name: "Kaggle",
    handle: "muhammadtaha1038",
    href: "https://www.kaggle.com/muhammadtaha1038",
    Icon: KaggleIcon,
    accentColor: "#20BEFF",
    detail: "Machine learning models & notebooks",
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(
      subject ? `[Portfolio] ${subject}` : `Project / Inquiry from ${name || "Visitor"}`
    );
    const body = encodeURIComponent(
      `Hello Muhammad Taha,\n\nName: ${name || "N/A"}\nEmail: ${email || "N/A"}\n\nMessage:\n${message}\n\nSent from muhammadtahatech.me/contact`
    );
    window.location.href = `mailto:${emailAddress}?subject=${mailSubject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="pt-10 pb-16 md:pb-24 overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="container-content">
        <AnimatedSection>
          {/* Header Block */}
          <div className="mb-10 lg:mb-12">
            <span className="text-eyebrow block mb-3">Contact</span>
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold tracking-tight text-[var(--color-text)] mb-3 leading-tight">
              Let&apos;s Build Something Useful
            </h1>
            <p className="text-[17px] leading-[1.7] text-[var(--color-text-secondary)] max-w-2xl">
              Whether you have an engineering role, a machine learning pipeline, full-stack development, or a backend system to build — reach out directly through WhatsApp, Email, or the message composer below.
            </p>
          </div>
        </AnimatedSection>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Channels & Prominent Socials */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* 1. Hero Priority: Direct WhatsApp Action */}
            <AnimatedSection delay={0.05}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-6 rounded-[var(--radius-md)] border transition-all duration-200 block"
                style={{
                  background: "var(--color-surface)",
                  borderColor: "rgba(37, 211, 102, 0.3)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-[var(--radius-sm)] flex items-center justify-center border"
                      style={{
                        background: "rgba(37, 211, 102, 0.08)",
                        borderColor: "rgba(37, 211, 102, 0.25)",
                      }}
                    >
                      <WhatsAppIcon />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#25D366] block font-semibold">
                        Instant WhatsApp
                      </span>
                      <span className="text-base font-bold text-[var(--color-text)] group-hover:text-[#25D366] transition-colors">
                        +92 343 2744101
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] group-hover:text-[#25D366] group-hover:bg-[rgba(37,211,102,0.1)] transition-all">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-4">
                  Best for quick discussions, project inquiries, and instant direct communication.
                </p>

                <div className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-[var(--radius-sm)] text-xs font-mono font-medium text-black bg-[#25D366] group-hover:brightness-105 transition-all">
                  <MessageCircle className="w-4 h-4 fill-black text-[#25D366]" />
                  Chat on WhatsApp
                </div>
              </a>
            </AnimatedSection>

            {/* 2. Direct Email Card */}
            <AnimatedSection delay={0.1}>
              <div
                className="p-6 rounded-[var(--radius-md)] border transition-colors"
                style={{
                  background: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-[var(--radius-sm)] flex items-center justify-center border"
                    style={{
                      background: "rgba(234, 67, 53, 0.08)",
                      borderColor: "rgba(234, 67, 53, 0.25)",
                    }}
                  >
                    <GmailIcon />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] block">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${emailAddress}`}
                      className="text-base font-semibold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      {emailAddress}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-[var(--color-border)]">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-mono rounded-[var(--radius-sm)] border transition-all cursor-pointer"
                    style={{
                      background: copied ? "rgba(34, 197, 94, 0.1)" : "var(--color-surface-2)",
                      borderColor: copied ? "#22c55e" : "var(--color-border)",
                      color: copied ? "#22c55e" : "var(--color-text-secondary)",
                    }}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Copied to Clipboard
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Email
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${emailAddress}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-mono rounded-[var(--radius-sm)] border text-[var(--color-accent)] transition-all hover:bg-[var(--color-surface-2)]"
                    style={{
                      borderColor: "var(--color-border)",
                    }}
                  >
                    Send Mail
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* 3. Availability & Location Info */}
            <AnimatedSection delay={0.15}>
              <div
                className="p-5 rounded-[var(--radius-md)] border flex flex-col gap-3.5 text-xs font-mono"
                style={{
                  background: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div className="flex items-center justify-between pb-2.5 border-b border-[var(--color-border)]">
                  <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>STATUS</span>
                  </div>
                  <span className="text-[var(--color-text)] font-medium">Looking for opportunities</span>
                </div>

                <div className="flex items-center justify-between pb-2.5 border-b border-[var(--color-border)]">
                  <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                    <MapPin className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                    <span>LOCATION</span>
                  </div>
                  <span className="text-[var(--color-text)] font-medium">Pakistan (Remote Worldwide)</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                    <Clock className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                    <span>RESPONSE</span>
                  </div>
                  <span className="text-[var(--color-text)] font-medium">Within 24 hours</span>
                </div>
              </div>
            </AnimatedSection>

            {/* 4. Prominent Professional Channels with Official Brand Colors */}
            <AnimatedSection delay={0.2}>
              <div className="flex flex-col gap-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] block px-1">
                  Profiles &amp; Code
                </span>
                <div className="flex flex-col gap-2.5">
                  {SOCIAL_PROFILES.map(({ name, handle, href, Icon, accentColor, detail }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-4 rounded-[var(--radius-md)] border flex items-center justify-between transition-all hover:border-[var(--color-border-hover)]"
                      style={{
                        background: "var(--color-surface)",
                        borderColor: "var(--color-border)",
                      }}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className="w-10 h-10 rounded-[var(--radius-sm)] flex items-center justify-center border transition-all"
                          style={{
                            background: "var(--color-surface-2)",
                            borderColor: "var(--color-border)",
                          }}
                        >
                          <Icon />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[var(--color-text)] flex items-center gap-1.5">
                            {name}
                            <span className="text-xs font-mono font-normal text-[var(--color-text-muted)]">
                              @{handle}
                            </span>
                          </div>
                          <span className="text-xs text-[var(--color-text-muted)] block">
                            {detail}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight
                        className="w-4 h-4 text-[var(--color-text-muted)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                        style={{ color: "var(--color-text-muted)" }}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Clean Open Message Composer (No Categories) */}
          <div className="lg:col-span-7">
            <AnimatedSection delay={0.1}>
              <form
                onSubmit={handleSendMessage}
                className="p-6 md:p-8 rounded-[var(--radius-md)] border flex flex-col gap-5"
                style={{
                  background: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent)] block mb-1">
                    Send a Direct Note
                  </span>
                  <h2 className="text-2xl font-bold text-[var(--color-text)] tracking-tight">
                    Start a Conversation
                  </h2>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                    Have an idea, project, or role? Drop a message and let&apos;s talk through the details.
                  </p>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] block mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-[var(--radius-sm)] text-sm border bg-[var(--color-surface-2)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none transition-colors"
                      style={{
                        borderColor: "var(--color-border)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] block mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-[var(--radius-sm)] text-sm border bg-[var(--color-surface-2)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none transition-colors"
                      style={{
                        borderColor: "var(--color-border)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                    />
                  </div>
                </div>

                {/* Optional Subject */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] block mb-2">
                    Subject (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Full-stack build / Engineering role / Project inquiry"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-[var(--radius-sm)] text-sm border bg-[var(--color-surface-2)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none transition-colors"
                    style={{
                      borderColor: "var(--color-border)",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] block mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Tell me about what you're looking to build, your timeline, or role requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-[var(--radius-sm)] text-sm border bg-[var(--color-surface-2)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none transition-colors resize-y min-h-[140px]"
                    style={{
                      borderColor: "var(--color-border)",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                  />
                </div>

                {/* Submit Action */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <span className="text-xs text-[var(--color-text-muted)]">
                    Direct delivery straight to Muhammad Taha.
                  </span>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-sm rounded-[var(--radius-sm)] transition-all cursor-pointer hover:brightness-110 active:scale-[0.98]"
                    style={{
                      background: "var(--color-accent)",
                      color: "#000000",
                    }}
                  >
                    <Send className="w-4 h-4" />
                    Send Inquiry
                  </button>
                </div>
              </form>
            </AnimatedSection>
          </div>

        </div>
      </div>
    </section>
  );
}
