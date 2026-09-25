"use client";

import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

type ExperienceType = {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
};

function parseDates(durationStr: string) {
  const parts = durationStr.split(/[-—to]+/).map((s) => s.trim());
  if (parts.length === 0) return { start: new Date(), end: new Date(), months: 1 };

  const start = new Date(parts[0]);
  let end = new Date();

  if (parts.length > 1 && parts[1].toLowerCase() !== "present") {
    const parsedEnd = new Date(parts[1]);
    if (!isNaN(parsedEnd.getTime())) end = parsedEnd;
  }

  let months = (end.getFullYear() - (isNaN(start.getFullYear()) ? end.getFullYear() : start.getFullYear())) * 12 + (end.getMonth() - (isNaN(start.getMonth()) ? end.getMonth() : start.getMonth()));
  months = Math.max(1, months || 1);

  return { start: isNaN(start.getTime()) ? new Date() : start, end, months };
}

function getChipsForRole(role: string) {
  const r = role.toLowerCase();
  if (r.includes("data") || r.includes("machine learning")) {
    return [
      { name: "Python", logo: "Python" },
      { name: "scikit-learn", logo: "Scikit_learn" },
      { name: "Pandas", logo: "Pandas" },
      { name: "FastAPI", logo: "FastAPI" },
    ];
  }
  if (r.includes("backend") || r.includes("engineer")) {
    return [
      { name: "Node.js", logo: "Node_js" },
      { name: "TypeScript", logo: "TypeScript" },
      { name: "PostgreSQL", logo: "PostgreSQL" },
      { name: "AWS", logo: "AWS" },
    ];
  }
  return [
    { name: "Python", logo: "Python" },
    { name: "Docker", logo: "Docker" },
    { name: "Linux", logo: "Linux" },
  ];
}

function StackChip({ name, logo, muted = false }: { name: string; logo: string; muted?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)] transition-opacity ${
        muted ? "opacity-60 grayscale" : ""
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/logos/${logo}.svg`} alt="" className="w-4 h-4 object-contain" />
      <span className="text-xs font-mono text-[var(--color-text-secondary)]">{name}</span>
    </div>
  );
}

function ExperienceCard({
  exp,
  isCurrent,
  maxMonths,
}: {
  exp: ExperienceType;
  isCurrent: boolean;
  maxMonths: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(isCurrent || shouldReduceMotion);
  const parsed = parseDates(exp.duration);
  const percent = Math.min(100, Math.max(5, (parsed.months / maxMonths) * 100));
  const chips = getChipsForRole(exp.role);

  if (isCurrent) {
    return (
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] border-l-4 border-l-[var(--color-accent)] rounded-xl overflow-hidden w-full p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
              {exp.role}
            </h3>
            <p className="text-base text-[var(--color-text-secondary)]">{exp.company}</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/10 bg-emerald-500/5 shrink-0">
            <span className="h-2 w-2 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
            <span className="text-xs font-mono text-[var(--color-text-secondary)]">Open to Work</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mt-8 mb-8">
          <div className="flex-1 max-w-[200px] h-[6px] rounded-full bg-[var(--color-surface-2)] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[var(--color-accent)]"
              initial={shouldReduceMotion ? { width: `${percent}%` } : { width: 0 }}
              whileInView={{ width: `${percent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
          <span className="text-xs font-mono text-[var(--color-text-muted)]">
            {exp.duration} · {parsed.months} mos
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {chips.map((chip) => (
            <StackChip key={chip.name} {...chip} />
          ))}
        </div>

        <ul className="flex flex-col gap-4">
          {exp.description.map((a: string, j: number) => (
            <li key={j} className="flex items-start gap-4">
              <div className="shrink-0 mt-[10px] w-1.5 h-1.5 bg-[var(--color-text-muted)] rounded-sm" />
              <p className="text-[var(--color-text-secondary)] leading-[1.7] text-sm md:text-base">
                {a}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Past Role Card (Collapsible)
  return (
    <div
      className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden w-full cursor-pointer transition-colors hover:border-[var(--color-border-hover)]"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-5 md:p-6">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 flex-1">
            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{exp.role}</h3>
            <span className="hidden md:inline text-[var(--color-text-muted)]">•</span>
            <p className="text-[var(--color-text-secondary)]">{exp.company}</p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span className="text-xs font-mono text-[var(--color-text-muted)] w-[160px] text-left xl:text-right">
              {exp.duration} · {parsed.months} mos
            </span>
            <div className="w-[100px] h-[6px] rounded-full bg-[var(--color-surface-2)] overflow-hidden hidden md:block">
              <motion.div
                className="h-full rounded-full bg-[var(--color-text-muted)]"
                initial={shouldReduceMotion ? { width: `${percent}%` } : { width: 0 }}
                whileInView={{ width: `${percent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
            <ChevronDown
              className={`w-5 h-5 text-[var(--color-text-muted)] transition-transform duration-250 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {chips.map((chip) => (
            <StackChip key={chip.name} {...chip} muted />
          ))}
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={shouldReduceMotion ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={shouldReduceMotion ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-[var(--color-border)]">
                <ul className="flex flex-col gap-4">
                  {exp.description.map((a: string, j: number) => (
                    <li key={j} className="flex items-start gap-4">
                      <div className="shrink-0 mt-[10px] w-1.5 h-1.5 bg-[var(--color-text-muted)] rounded-sm" />
                      <p className="text-[var(--color-text-secondary)] leading-[1.7] text-sm md:text-base">
                        {a}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ExperienceClient({ experiences }: { experiences: ExperienceType[] }) {
  const shouldReduceMotion = useReducedMotion();
  const allParsed = experiences.map((e) => parseDates(e.duration));
  const maxMonths = Math.max(...allParsed.map((p) => p.months), 1);
  const earliestYear = Math.min(...allParsed.map((p) => p.start.getFullYear()));
  const yearsSpan = Math.max(1, new Date().getFullYear() - earliestYear);

  return (
    <section id="experience" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      <div className="relative container-content max-w-5xl">
        <AnimatedSection>
          <div className="w-full mb-16 md:mb-24">
            <h1 className="text-4xl md:text-[56px] font-bold tracking-tight text-[var(--color-text-primary)] mb-4 leading-tight">
              Professional Journey
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              {experiences.length} roles spanning {yearsSpan} years of engineering.
            </p>
          </div>
        </AnimatedSection>

        <div className="w-full relative">
          {experiences.map((exp, i) => {
            const isCurrent = i === 0;
            const isLast = i === experiences.length - 1;

            return (
              <AnimatedSection key={exp.id} delay={i * 0.1}>
                <div className="relative pl-[40px] md:pl-[64px] pb-12">
                  {/* Timeline line */}
                  {!isLast && (
                    <motion.div
                      className={`absolute left-[11px] md:left-[23px] top-10 bottom-[-40px] w-[2px] origin-top ${
                        isCurrent ? "bg-[var(--color-accent)]" : "bg-[var(--color-border)]"
                      }`}
                      initial={shouldReduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: "-20%" }}
                      transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                    />
                  )}

                  {/* Timeline node */}
                  <div
                    className={`absolute left-[6px] md:left-[18px] top-10 w-3 h-3 rounded-full border-[2px] ${
                      isCurrent
                        ? "bg-[var(--color-accent)] border-[var(--color-accent)] motion-safe:animate-pulse z-10"
                        : "bg-[var(--color-bg)] border-[var(--color-border)] z-10"
                    }`}
                  />

                  {/* Card */}
                  <ExperienceCard exp={exp} isCurrent={isCurrent} maxMonths={maxMonths} />
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
