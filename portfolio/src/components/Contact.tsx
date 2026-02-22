"use client";

import AnimatedSection from "./AnimatedSection";
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ArrowUpRight,
  Send,
  MessageSquare,
} from "lucide-react";

const SOCIAL_LINKS = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:taha@example.com",
    display: "taha@example.com",
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/muhammadtaha",
    display: "github.com/muhammadtaha",
    color: "from-gray-500/20 to-slate-500/20",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/muhammadtaha",
    display: "linkedin.com/in/muhammadtaha",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: ExternalLink,
    label: "Upwork",
    href: "https://upwork.com/freelancers/muhammadtaha",
    display: "upwork.com/muhammadtaha",
    color: "from-green-500/20 to-emerald-500/20",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 section-dark overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
      <div className="noise-overlay" />

      {/* Gradient orbs */}
      <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-accent/3 rounded-full blur-[100px] pointer-events-none" />

      {/* Top divider */}
      <div className="section-divider" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-12 text-center pt-8">
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

        {/* Social Links Grid */}
        <AnimatedSection delay={0.15}>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-card rounded-2xl p-5 flex items-center gap-4 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`p-3 rounded-xl bg-gradient-to-br ${link.color} text-accent group-hover:scale-110 transition-transform duration-300`}>
                  <link.icon className="w-5 h-5" />
                </div>
                <div className="text-left flex-grow min-w-0">
                  <div className="text-[10px] text-text-muted uppercase tracking-[0.15em] font-mono mb-0.5">
                    {link.label}
                  </div>
                  <div className="text-sm text-white font-medium truncate group-hover:text-accent transition-colors">
                    {link.display}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </a>
            ))}
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-black font-semibold text-lg rounded-xl hover:bg-accent-light transition-all duration-300 hover:shadow-[0_0_50px_rgba(245,197,24,0.3)] hover:-translate-y-0.5"
            >
              Download Resume
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="mailto:taha@example.com"
              className="group inline-flex items-center gap-3 px-8 py-4 glass-card rounded-xl text-white hover:text-accent text-lg font-medium transition-all duration-300 hover:-translate-y-0.5"
            >
              <Send className="w-5 h-5" />
              Send Email
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
