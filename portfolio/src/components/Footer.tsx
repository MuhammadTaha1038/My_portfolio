import { Heart } from "lucide-react";
import Link from "next/link";

const QUICK_LINKS = [
  { label: "Home",         href: "/" },
  { label: "About",        href: "/about" },
  { label: "Projects",     href: "/projects" },
  { label: "Experience",   href: "/experience" },
  { label: "Certificates", href: "/certificates" },
  { label: "Contact",      href: "/contact" },
];

const SOCIAL = [
  {
    label: "GitHub",
    href: "https://github.com/MuhammadTaha1038",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammad-taha-b88807248",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Kaggle",
    href: "https://www.kaggle.com/muhammadtaha1038",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.336z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-auto"
      style={{
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="container-content py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-8">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-block text-xl font-bold tracking-tight mb-4"
              style={{ color: "var(--color-text)" }}>
              M. Taha
            </Link>
            <p className="text-sm leading-relaxed mb-6"
              style={{ color: "var(--color-text-muted)", maxWidth: "28ch" }}>
              Software Engineer &amp; Applied Data Scientist specializing in ML
              pipelines and scalable backend architectures.
            </p>
            <p className="flex items-center gap-1.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
              Built with
              <Heart className="w-3 h-3" style={{ color: "var(--color-accent)" }} aria-hidden />
              and <code style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-secondary)" }}>&lt;code/&gt;</code>
            </p>
          </div>

          {/* Links */}
          <div>
            <h2 className="text-eyebrow mb-5">Navigation</h2>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h2 className="text-eyebrow mb-5">Connect</h2>
            <div className="flex items-center gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="social-icon-btn"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--color-border)" }}>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            &copy; {year} Muhammad Taha. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            Software Engineer &middot;{" "}
            <a href="https://ummahtechinnovations.com/" target="_blank" rel="noopener noreferrer"
              className="footer-link" style={{ fontSize: "inherit" }}>
              UmmahTech Innovations
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
