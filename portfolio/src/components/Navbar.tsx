"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Certificates", href: "/certificates" },
  { label: "Contact", href: "/contact" },
];

import ThemeCustomizer from "./ThemeCustomizer";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Handle case study routes acting as active project tab
  const getIsActive = (href: string) => {
    if (href === "/" && pathname !== "/") return false;
    if (href !== "/" && pathname?.startsWith(href)) return true;
    return pathname === href;
  };

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto transition-all duration-500 rounded-full px-4 md:px-6 py-3 flex items-center justify-between gap-4 md:gap-8 border ${
            scrolled
              ? "bg-black/70 backdrop-blur-xl border-white/10 shadow-2xl"
              : "bg-black/20 backdrop-blur-md border-transparent hover:bg-black/40 hover:border-white/5"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="relative group shrink-0">
            <span className="text-xl font-bold tracking-tight">
              T<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = getIsActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                    isActive
                      ? "text-accent"
                      : "text-text-secondary hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg bg-accent/10 border border-accent/20"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA & Theme (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeCustomizer />
            <a
              href="https://wa.me/923432744101?text=I%20have%20visited%20your%20portfolio%20website%20and%20want%20to%20chat%20with%20you"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 bg-accent/10 border border-accent/30 text-accent text-sm font-medium rounded-full hover:bg-accent/20 transition-all duration-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Let&apos;s Connect
            </a>
          </div>

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
        </motion.nav>
      </div>

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
                {NAV_LINKS.map((link, i) => {
                  const isActive = getIsActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`w-full text-center py-4 text-lg font-medium rounded-xl transition-all block ${
                        isActive
                          ? "text-accent bg-accent/10 border border-accent/20"
                          : "text-white hover:text-accent hover:bg-white/5"
                      }`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 + 0.1 }}
                      >
                        {link.label}
                      </motion.div>
                    </Link>
                  );
                })}
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
