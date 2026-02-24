"use client";

import { Heart } from "lucide-react";

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
            <p className="text-text-muted text-sm mb-1">&copy; {year} Muhammad Taha</p>
            <p className="text-text-muted text-xs">
              Software Engineer &middot;{" "}
              <a
                href="https://ummahtechinnovations.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-light transition-colors"
              >
                UmmahTech Innovations
              </a>
            </p>
          </div>

          {/* Center */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-text-muted">
              <span>Built with</span>
              <Heart className="w-3.5 h-3.5 text-accent fill-accent" />
              <span>and</span>
              <span className="font-mono text-accent text-xs">&lt;code/&gt;</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3 sm:justify-end">
            <a
              href="https://github.com/MuhammadTaha1038"
              target="_blank" rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-border hover:border-accent/30 hover:text-accent hover:bg-accent/5 transition-all text-text-muted"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-taha-b88807248"
              target="_blank" rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-border hover:border-accent/30 hover:text-accent hover:bg-accent/5 transition-all text-text-muted"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a
              href="https://www.kaggle.com/muhammadtaha1038"
              target="_blank" rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-border hover:border-accent/30 hover:text-accent hover:bg-accent/5 transition-all text-text-muted"
              aria-label="Kaggle"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.336z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
