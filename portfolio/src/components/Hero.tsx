"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ParticleField from "./ParticleField";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden perspective-container"
    >
      {/* === Background Layers === */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#050508] to-black" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <ParticleField />
      <div className="noise-overlay" />

      {/* Dramatic cinematic lighting */}
      <div className="ambient-glow w-[800px] h-[400px] top-0 left-1/2 -translate-x-1/2 opacity-20 bg-accent blur-[150px]" />
      <div className="ambient-glow w-[600px] h-[600px] bottom-0 left-0 opacity-10 bg-accent/50 blur-[200px]" />

      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 lg:px-12 transform-3d">
        <div className="bento-grid grid-rows-[auto_auto] gap-6 md:gap-8">
          
          {/* Top Left: Massive Typography (Spans 12 cols on mobile, 8 on desktop) */}
          <div className="col-span-12 lg:col-span-8 flex flex-col justify-end pt-12 lg:pt-24 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="cinematic-text text-white mb-6 uppercase">
                Muhammad <br />
                <span className="text-accent">Taha.</span>
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="h-px w-12 bg-accent/60 hidden sm:block" />
                <p className="text-text-secondary text-lg md:text-xl font-light tracking-wide max-w-xl leading-relaxed">
                  Applied Data Scientist & Backend Engineer. I build data-driven backend systems from ML models to production.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Top Right: Profile Image Box (Spans 12 cols on mobile, 4 on desktop) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 md:col-span-6 lg:col-span-4 bento-item group aspect-square lg:aspect-auto lg:h-full relative min-h-[300px]"
          >
            <Image
              src="/hero.png"
              alt="Muhammad Taha"
              fill
              className="object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 filter grayscale group-hover:grayscale-0"
              priority
              sizes="(max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-flex px-3 py-1 bg-accent/20 border border-accent/30 text-accent text-xs font-mono rounded-full mb-2">Available for Work</div>
              <h3 className="text-white font-semibold text-lg">Based in Pakistan</h3>
            </div>
          </motion.div>

          {/* Bottom Left: Quick Stats (Spans 12 cols on mobile, 4 on desktop) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="col-span-12 md:col-span-6 lg:col-span-4 bento-item p-8 flex flex-col justify-between min-h-[200px]"
          >
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="flex flex-col justify-center border-r border-b border-white/10 pb-4 pr-4">
                <span className="text-4xl font-bold text-white">13+</span>
                <span className="text-xs text-text-muted uppercase tracking-wider mt-1">Projects</span>
              </div>
              <div className="flex flex-col justify-center border-b border-white/10 pb-4 pl-4">
                <span className="text-4xl font-bold text-accent">3</span>
                <span className="text-xs text-text-muted uppercase tracking-wider mt-1">Domains</span>
              </div>
              <div className="flex flex-col justify-center border-r border-white/10 pt-4 pr-4">
                <span className="text-4xl font-bold text-white">2+</span>
                <span className="text-xs text-text-muted uppercase tracking-wider mt-1">Years</span>
              </div>
              <div className="flex flex-col justify-center pt-4 pl-4">
                <ArrowRight className="w-8 h-8 text-accent/50" />
              </div>
            </div>
          </motion.div>

          {/* Bottom Middle: CTA Area (Spans 12 cols on mobile, 8 on desktop) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="col-span-12 lg:col-span-8 bento-item p-8 flex flex-col sm:flex-row items-center justify-between gap-8 bg-gradient-to-br from-white/5 to-transparent border-t border-l border-white/10"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Ready to architect a solution?</h3>
              <p className="text-text-muted text-sm max-w-md">Let's discuss how we can build robust backend systems or integrate intelligent models into your product.</p>
            </div>
            
            <div className="flex items-center gap-4 shrink-0">
              <Link
                href="/projects"
                className="group relative px-6 py-4 bg-white text-black font-bold rounded-xl overflow-hidden hover-glow transition-all"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </Link>
              <Link
                href="/contact"
                className="p-4 rounded-xl border border-white/20 text-white hover:text-accent hover:border-accent hover:bg-accent/10 transition-all"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
