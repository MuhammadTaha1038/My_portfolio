"use client";

import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { Mail, Check, Copy, ArrowUpRight, Send, MapPin, Clock, Sparkles } from "lucide-react";

/* ── Brand SVG Icons ── */
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const KaggleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.336z"/>
  </svg>
);

const SOCIAL_PROFILES = [
  {
    name: "LinkedIn",
    handle: "muhammad-taha",
    href: "https://www.linkedin.com/in/muhammad-taha-b88807248",
    Icon: LinkedInIcon,
    detail: "Professional profile & updates",
  },
  {
    name: "GitHub",
    handle: "MuhammadTaha1038",
    href: "https://github.com/MuhammadTaha1038",
    Icon: GitHubIcon,
    detail: "Source code & repositories",
  },
  {
    name: "Kaggle",
    handle: "muhammadtaha1038",
    href: "https://www.kaggle.com/muhammadtaha1038",
    Icon: KaggleIcon,
    detail: "ML models & notebooks",
  },
];

const INQUIRY_TYPES = [
  "Full-time Role",
  "ML / AI Pipeline",
  "Backend Architecture",
  "General Collaboration",
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES[0]);
  const [message, setMessage] = useState("");

  const emailAddress = "contact.taha2005@gmail.com";

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
    const subject = encodeURIComponent(`[${inquiryType}] Project Inquiry from ${name || "Portfolio Visitor"}`);
    const body = encodeURIComponent(
      `Hello Muhammad Taha,\n\nName: ${name || "N/A"}\nEmail: ${email || "N/A"}\nInquiry Type: ${inquiryType}\n\nMessage:\n${message}\n\nSent from muhammadtahatech.me/contact`
    );
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
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
              Have an engineering role, machine learning pipeline, or backend architecture problem to discuss?
              Reach out directly or send a message below.
            </p>
          </div>
        </AnimatedSection>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Info & Channels */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Primary Email Card */}
            <AnimatedSection delay={0.05}>
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
                      background: "var(--color-surface-2)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-accent)",
                    }}
                  >
                    <Mail className="w-5 h-5" />
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
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-mono rounded-[var(--radius-sm)] border transition-all"
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

            {/* Availability & Location Card */}
            <AnimatedSection delay={0.1}>
              <div
                className="p-6 rounded-[var(--radius-md)] border flex flex-col gap-4 text-xs font-mono"
                style={{
                  background: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
                  <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>STATUS</span>
                  </div>
                  <span className="text-[var(--color-text)] font-medium">Looking for opportunities</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
                  <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                    <MapPin className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                    <span>LOCATION</span>
                  </div>
                  <span className="text-[var(--color-text)] font-medium">Pakistan (Remote Ready)</span>
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

            {/* Social Profiles Grid */}
            <AnimatedSection delay={0.15}>
              <div className="flex flex-col gap-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] block px-1">
                  Profiles &amp; Code
                </span>
                <div className="flex flex-col gap-2">
                  {SOCIAL_PROFILES.map(({ name, handle, href, Icon, detail }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-3.5 rounded-[var(--radius-md)] border flex items-center justify-between transition-all hover:border-[var(--color-border-hover)]"
                      style={{
                        background: "var(--color-surface)",
                        borderColor: "var(--color-border)",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-[var(--radius-sm)] flex items-center justify-center border text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors"
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
                      <ArrowUpRight className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </a>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Direct Message Composer */}
          <div className="lg:col-span-7">
            <AnimatedSection delay={0.1}>
              <form
                onSubmit={handleSendMessage}
                className="p-6 md:p-8 rounded-[var(--radius-md)] border flex flex-col gap-6"
                style={{
                  background: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--color-accent)] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Send a Message
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--color-text)]">
                    Project or Role Inquiry
                  </h2>
                </div>

                {/* Inquiry Type Chips */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] block mb-2">
                    Inquiry Topic
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {INQUIRY_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setInquiryType(type)}
                        className="px-3.5 py-1.5 rounded-[var(--radius-sm)] text-xs font-mono border transition-all"
                        style={{
                          background: inquiryType === type ? "var(--color-surface-2)" : "transparent",
                          borderColor: inquiryType === type ? "var(--color-accent)" : "var(--color-border)",
                          color: inquiryType === type ? "var(--color-accent)" : "var(--color-text-secondary)",
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
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

                {/* Message Field */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] block mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell me about your project, timeline, architecture requirements, or role details..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-[var(--radius-sm)] text-sm border bg-[var(--color-surface-2)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none transition-colors resize-y min-h-[120px]"
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
                    Opens your email client with structured pre-filled details.
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
