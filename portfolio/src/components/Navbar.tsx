"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About", href: "#profile" },
  { label: "Skills", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Track active section
      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(`#${id}`);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/60 backdrop-blur-2xl border-b border-accent/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-18 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="relative group">
            <span className="text-2xl font-bold tracking-tight">
              M<span className="text-accent">.</span> Taha
            </span>
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-300" />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                  activeSection === link.href
                    ? "text-accent"
                    : "text-text-secondary hover:text-white"
                }`}
              >
                {link.label}
                {activeSection === link.href && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg bg-accent/10 border border-accent/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* CTA button (desktop) */}
          <a
            href="https://wa.me/923432744101?text=I%20have%20visited%20your%20portfolio%20website%20and%20want%20to%20chat%20with%20you"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-5 py-2 bg-accent/10 border border-accent/30 text-accent text-sm font-medium rounded-full hover:bg-accent/20 transition-all duration-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            Let&apos;s Connect
          </a>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg border border-border hover:border-accent/30 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(30px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/90 md:hidden flex flex-col"
          >
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <nav className="flex flex-col items-center gap-3 w-full max-w-xs">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                    className={`w-full text-center py-4 text-lg font-medium rounded-xl transition-all ${
                      activeSection === link.href
                        ? "text-accent bg-accent/10 border border-accent/20"
                        : "text-white hover:text-accent hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <motion.a
                href="https://wa.me/923432744101?text=I%20have%20visited%20your%20portfolio%20website%20and%20want%20to%20chat%20with%20you"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 px-8 py-3.5 bg-accent text-black font-semibold rounded-xl text-lg"
              >
                Let&apos;s Connect
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
