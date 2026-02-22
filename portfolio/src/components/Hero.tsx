"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, ChevronDown, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import ParticleField from "./ParticleField";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* === Background Layers === */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050508] to-black" />
      <div className="absolute inset-0 grid-bg" />
      <ParticleField />
      <div className="noise-overlay" />

      {/* Gradient orbs */}
      <div className="absolute top-20 -left-40 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 -right-40 w-[350px] h-[350px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[120px] pointer-events-none" />

      {/* Edge fades */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

      {/* === Main Content === */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm text-accent text-sm font-mono mb-8"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
              </span>
              Open to Opportunities
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-[1.1]"
            >
              Muhammad
              <br />
              <span className="gradient-text">Taha</span>
            </motion.h1>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-8 bg-accent/60" />
              <p className="text-accent font-mono text-sm md:text-base tracking-wide typing-cursor">
                Backend & Decision Systems Engineer
              </p>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-text-secondary text-base md:text-lg max-w-lg mb-10 leading-relaxed"
            >
              I design scalable backend systems and intelligent decision engines
              that transform raw data into production-grade infrastructure.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <a
                href="#projects"
                className="group flex items-center gap-2.5 px-7 py-3.5 bg-accent text-black font-semibold rounded-xl hover:bg-accent-light transition-all duration-300 hover:shadow-[0_0_40px_rgba(245,197,24,0.3)] hover:-translate-y-0.5"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#"
                className="group flex items-center gap-2.5 px-7 py-3.5 glass-card rounded-xl text-white hover:text-accent transition-all duration-300 hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
              <a
                href="#contact"
                className="group flex items-center gap-2.5 px-7 py-3.5 glass-card rounded-xl text-white hover:text-accent transition-all duration-300 hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" />
                Contact
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex items-center gap-4"
            >
              <a
                href="https://github.com/muhammadtaha"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-border hover:border-accent/40 hover:text-accent hover:bg-accent/5 transition-all text-text-muted"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/muhammadtaha"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-border hover:border-accent/40 hover:text-accent hover:bg-accent/5 transition-all text-text-muted"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <div className="h-6 w-px bg-border mx-2" />
              <span className="text-text-muted text-sm font-mono">taha@example.com</span>
            </motion.div>
          </div>

          {/* Right: Photo + Stats */}
          <div className="order-1 lg:order-2 flex flex-col items-center">
            {/* Profile Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mb-10"
            >
              {/* Outer glow rings */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-accent/20 via-transparent to-accent/10 blur-xl animate-pulse-glow" />
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-accent/30 via-accent/5 to-accent/20 p-px">
                <div className="w-full h-full rounded-full bg-black" />
              </div>

              {/* Photo container */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-accent/30 glow-ring">
                <Image
                  src="/profile.png"
                  alt="Muhammad Taha — Backend & Decision Systems Engineer"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
                />
              </div>

              {/* Floating badges around photo */}
              <div className="absolute -top-2 -right-2 px-3 py-1.5 glass-card rounded-lg text-accent text-xs font-mono animate-float">
                FastAPI
              </div>
              <div className="absolute top-1/2 -left-6 px-3 py-1.5 glass-card rounded-lg text-accent text-xs font-mono animate-float-delay">
                Python
              </div>
              <div className="absolute -bottom-2 right-4 px-3 py-1.5 glass-card rounded-lg text-accent text-xs font-mono animate-float-slow">
                ML Ops
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 w-full max-w-sm"
            >
              {[
                { value: "4+", label: "Projects" },
                { value: "10+", label: "Technologies" },
                { value: "1+", label: "Year Exp" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center glass-card rounded-xl py-4 px-3"
                >
                  <div className="text-2xl md:text-3xl font-bold gradient-text font-mono">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-text-muted mt-1 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#profile"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-text-muted hover:text-accent transition-colors cursor-pointer"
      >
        <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </motion.a>
    </section>
  );
}
