"use client";

import AnimatedSection from "./AnimatedSection";
import { MessageSquare, Send } from "lucide-react";

/* ── Official brand SVG icons ── */
const GmailIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const KaggleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.336z"/>
  </svg>
);

const CONTACTS = [
  {
    Icon: GmailIcon,
    label: "Gmail",
    href: "mailto:contact.taha2005@gmail.com",
    color: "hover:text-red-400 hover:border-red-400/40 hover:bg-red-500/5",
  },
  {
    Icon: GitHubIcon,
    label: "GitHub",
    href: "https://github.com/MuhammadTaha1038",
    color: "hover:text-white hover:border-white/40 hover:bg-white/5",
  },
  {
    Icon: LinkedInIcon,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammad-taha-b88807248",
    color: "hover:text-blue-400 hover:border-blue-400/40 hover:bg-blue-500/5",
  },
  {
    Icon: KaggleIcon,
    label: "Kaggle",
    href: "https://www.kaggle.com/muhammadtaha1038",
    color: "hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-500/5",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 section-dark overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
      <div className="noise-overlay" />
      <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-accent/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="section-divider" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center pt-8">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm text-accent text-sm font-mono mb-8">
            <MessageSquare className="w-4 h-4" />
            Let&apos;s Connect
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Let&apos;s Build
            <br />
            <span className="gradient-text">Intelligent Systems</span>
          </h2>

          <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto mb-14 leading-relaxed">
            Looking for a backend engineer who thinks in systems?
            Let&apos;s connect and discuss how we can build something extraordinary together.
          </p>
        </AnimatedSection>

        {/* Icon Row */}
        <AnimatedSection delay={0.15}>
          <div className="flex items-center justify-center gap-6 mb-14">
            {CONTACTS.map(({ Icon, label, href, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`group relative p-5 rounded-2xl border border-border text-text-muted transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${color}`}
              >
                <Icon />
                {/* Tooltip */}
                <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-black/80 border border-border text-text-muted text-xs font-mono rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.3}>
          <a
            href="mailto:contact.taha2005@gmail.com"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-black font-semibold text-lg rounded-xl hover:bg-accent-light transition-all duration-300 hover:shadow-[0_0_50px_rgba(245,197,24,0.3)] hover:-translate-y-0.5"
          >
            <Send className="w-5 h-5" />
            Send Email
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

