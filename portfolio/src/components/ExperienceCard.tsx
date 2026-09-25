"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

export type ExperienceType = {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
};

export function parseDates(durationStr: string) {
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

export function getChipsForRole(role: string) {
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

export function StackChip({ name, logo, muted = false }: { name: string; logo: string; muted?: boolean }) {
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

export function ExperienceCard({
  exp,
  isCurrent,
  maxMonths,
  footer,
}: {
  exp: ExperienceType;
  isCurrent: boolean;
  maxMonths: number;
  footer?: React.ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(isCurrent || shouldReduceMotion);
  const parsed = parseDates(exp.duration);
  const percent = Math.min(100, Math.max(5, (parsed.months / maxMonths) * 100));
  const chips = getChipsForRole(exp.role);

  if (isCurrent) {
    return (
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] border-l-4 border-l-[var(--color-accent)] rounded-xl overflow-hidden w-full">
        <div className="p-6 md:p-8">
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
        
        {footer && (
          <>
            <div className="h-px bg-[var(--color-border)] w-full" />
            <div className="px-4 py-4 sm:px-6 flex justify-end bg-[var(--color-surface-2)]">
              {footer}
            </div>
          </>
        )}
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
