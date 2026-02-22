"use client";

import { Github, Linkedin, ExternalLink, Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-accent/10 bg-black">
      <div className="noise-overlay" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid sm:grid-cols-3 gap-8 items-center">
          {/* Logo & Copyright */}
          <div>
            <a href="#home" className="text-2xl font-bold tracking-tight mb-3 inline-block">
              M<span className="text-accent">.</span>Taha
            </a>
            <p className="text-text-muted text-sm">
              &copy; {year} Muhammad Taha
            </p>
          </div>

          {/* Built with */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-text-muted">
              <span>Built with</span>
              <Heart className="w-3.5 h-3.5 text-accent fill-accent" />
              <span>and</span>
              <span className="font-mono text-accent text-xs">&lt;code/&gt;</span>
            </div>
            <p className="text-xs text-text-muted mt-1.5 font-mono">
              Next.js &middot; TailwindCSS &middot; TypeScript
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3 sm:justify-end">
            {[
              { icon: Github, href: "https://github.com/muhammadtaha", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/muhammadtaha", label: "LinkedIn" },
              { icon: ExternalLink, href: "https://upwork.com/freelancers/muhammadtaha", label: "Upwork" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-border hover:border-accent/30 hover:text-accent hover:bg-accent/5 transition-all text-text-muted"
                aria-label={link.label}
              >
                <link.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
