"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/* Shared fade-up variant for staggered children */
const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0  },
};

const STATS = [
  { value: "13+", label: "Projects Built"      },
  { value: "3",   label: "Engineering Domains" },
  { value: "2+",  label: "Years Exp"           },
];

export default function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      style={{ background: "var(--color-bg)" }}
      className="relative min-h-[100svh] pt-16 flex items-center overflow-hidden"
    >
      {/* Subtle corner radial — 5% alpha max, no yellow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(255,255,255,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Main content ── */}
      <div
        className="relative z-10 w-full py-12"
      >
        <div
          className="container-content grid lg:grid-cols-[7fr_5fr] gap-12 lg:gap-8 items-center"
        >
          {/* ── Left: text ── */}
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.1 }}
            className="order-1"
          >
            {/* Role - mono, no dash, no typewriter */}
            <motion.p
              variants={fadeUp}
              className="text-eyebrow mb-6"
              style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}
            >
              Applied Data Scientist &amp; Backend Engineer
            </motion.p>

            {/* H1 — "Muhammad" neutral, "Taha" accent */}
            <motion.h1
              variants={fadeUp}
              className="text-h1 mb-6"
              style={{ color: "var(--color-text)" }}
            >
              Muhammad
              <br />
              <span style={{ color: "var(--color-accent)" }}>Taha</span>
              <span className="sr-only"> - Applied Data Scientist &amp; Backend Engineer</span>
            </motion.h1>

            {/* Body */}
            <motion.p
              variants={fadeUp}
              className="text-body mb-10"
              style={{ maxWidth: "52ch" }}
            >
              I build data-driven backend systems: from ML models and APIs to
              production-ready applications.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-4 mb-16"
            >
              <Link href="/projects" className="btn btn-primary">
                View Projects
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                <Mail className="w-4 h-4" strokeWidth={1.5} />
                Contact
              </Link>
            </motion.div>

            {/* Stats — horizontal strip, no card backgrounds */}
            <motion.div variants={fadeUp}>
              <div
                className="flex items-stretch divide-x"
                style={{ borderColor: "var(--color-border)" }}
                role="list"
                aria-label="Quick stats"
              >
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    role="listitem"
                    className="flex flex-col gap-1 pr-8 pl-8 first:pl-0 last:pr-0"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <span
                      className="text-3xl font-bold tracking-tight leading-none"
                      style={{ color: "var(--color-text)" }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="font-mono uppercase"
                      style={{ fontSize: "12px", letterSpacing: "0.04em", color: "var(--color-text-secondary)" }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: portrait ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1   }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="order-2 flex justify-center lg:justify-end w-full"
          >
            <div
              className="relative overflow-hidden mx-auto lg:mx-0 w-full max-w-[280px] lg:max-w-none"
              style={{
                width: "clamp(260px, 28vw, 400px)",
                aspectRatio: "4/5",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
              }}
            >
              <Image
                src="/hero.png"
                alt="Muhammad Taha, Applied Data Scientist and Backend Engineer"
                fill
                className="object-cover object-[center_20%]"
                priority
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 400px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
