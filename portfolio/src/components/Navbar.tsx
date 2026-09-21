"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home",         href: "/" },
  { label: "About",        href: "/about" },
  { label: "Projects",     href: "/projects" },
  { label: "Experience",   href: "/experience" },
  { label: "Certificates", href: "/certificates" },
  { label: "Contact",      href: "/contact" },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  /* ── Scroll state ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Body scroll lock on mobile menu ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* ── Esc closes mobile menu ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  /* ── Active link logic ── */
  const isActive = (href: string) => {
    if (href === "/" ) return pathname === "/";
    return pathname?.startsWith(href) ?? false;
  };

  return (
    <>
      {/* ── Desktop / always-visible bar ── */}
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled ? "nav-scrolled" : "nav-base"
        }`}
      >
        <div className="container-content flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-[var(--color-text)] hover:text-[var(--color-text)] transition-colors"
            aria-label="Muhammad Taha - home"
          >
            M. Taha
          </Link>

          {/* Desktop links */}
          <div className="max-[900px]:hidden min-[900px]:flex items-center gap-6" role="list">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                role="listitem"
                className={`nav-link text-sm font-medium ${
                  isActive(link.href) ? "nav-link-active" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="max-[900px]:hidden min-[900px]:flex items-center gap-3">
            <a
              href="https://wa.me/923432744101?text=I%20have%20visited%20your%20portfolio%20website%20and%20want%20to%20chat%20with%20you"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              style={{ height: "36px", fontSize: "13px" }}
            >
              Let&apos;s Connect
            </a>
          </div>

          {/* Mobile hamburger — 44×44 touch target */}
          <button
            onClick={() => setMobileOpen(true)}
            className="max-[900px]:flex min-[900px]:hidden items-center justify-center w-11 h-11 rounded-[var(--radius-sm)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* ── Mobile menu sheet ── */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-50 max-[900px]:flex min-[900px]:hidden flex-col"
          style={{ 
            background: "var(--color-bg)",
            height: "100dvh",
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)"
          }}
        >
          {/* Header row */}
          <div
            className="flex items-center justify-between h-16 border-b"
            style={{
              borderColor: "var(--color-border)",
              paddingLeft: "var(--container-px-mobile)",
              paddingRight: "var(--container-px-mobile)",
            }}
          >
            <span
              className="text-xl font-bold tracking-tight"
              style={{ color: "var(--color-text)" }}
            >
              M. Taha
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-11 h-11 rounded-[var(--radius-sm)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Links */}
          <nav
            className="flex flex-col gap-1 flex-1 overflow-y-auto py-6"
            style={{
              paddingLeft: "var(--container-px-mobile)",
              paddingRight: "var(--container-px-mobile)",
            }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center h-11 px-3 rounded-[var(--radius-sm)] text-base font-medium transition-colors"
                style={{
                  color: isActive(link.href)
                    ? "var(--color-text)"
                    : "var(--color-text-secondary)",
                  background: isActive(link.href)
                    ? "var(--color-surface)"
                    : "transparent",
                  borderLeft: isActive(link.href)
                    ? `2px solid var(--color-accent)`
                    : "2px solid transparent",
                }}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-6 pt-6" style={{ borderTop: `1px solid var(--color-border)` }}>
              <a
                href="https://wa.me/923432744101?text=I%20have%20visited%20your%20portfolio%20website%20and%20want%20to%20chat%20with%20you"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full justify-center"
                onClick={() => setMobileOpen(false)}
              >
                Let&apos;s Connect
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
