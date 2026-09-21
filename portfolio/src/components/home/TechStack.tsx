"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import SectionHeading from "../SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";

const STACK = [
  {
    label: "BACKEND",
    spanClass: "md:col-span-2 lg:col-span-7",
    colsClass: "sm:grid-cols-5",
    items: [
      { name: "Python", logo: "Python" },
      { name: "FastAPI", logo: "FastAPI" },
      { name: "Node.js", logo: "Node_js" },
      { name: "TypeScript", logo: "TypeScript" },
      { name: "Prisma", logo: "Prisma" },
    ],
  },
  {
    label: "DATA & ML",
    spanClass: "md:col-span-1 lg:col-span-5",
    colsClass: "sm:grid-cols-3",
    items: [
      { name: "scikit-learn", logo: "Scikit_learn" },
      { name: "Pandas", logo: "Pandas" },
      { name: "TensorFlow", logo: "TensorFlow" },
    ],
  },
  {
    label: "DATABASES",
    spanClass: "md:col-span-1 lg:col-span-4",
    colsClass: "sm:grid-cols-3",
    items: [
      { name: "PostgreSQL", logo: "PostgreSQL" },
      { name: "MongoDB", logo: "MongoDB" },
      { name: "Redis", logo: "Redis" },
    ],
  },
  {
    label: "INFRA",
    spanClass: "md:col-span-1 lg:col-span-4",
    colsClass: "sm:grid-cols-3",
    items: [
      { name: "Docker", logo: "Docker" },
      { name: "AWS", logo: "AWS" },
      { name: "Linux", logo: "Linux" },
    ],
  },
  {
    label: "FRONTEND",
    spanClass: "md:col-span-1 lg:col-span-4",
    colsClass: "sm:grid-cols-2",
    items: [
      { name: "Next.js", logo: "Next_js" },
      { name: "React", logo: "React_logo" },
    ],
  },
];

function ToolItem({ name, logo }: { name: string; logo: string }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="group flex flex-col items-center justify-center gap-2 cursor-default transition-all duration-150 hover:-translate-y-[2px]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--color-surface-2)",
        border: "1px solid",
        borderColor: hover ? "var(--color-border-hover)" : "var(--color-border)",
        borderRadius: "8px",
        height: "88px",
        boxShadow: hover ? "var(--shadow-elevation)" : "none",
      }}
    >
      <div
        className="w-7 h-7 flex items-center justify-center"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={`/logos/${logo}.svg`} 
          alt="" 
          className="w-full h-full object-contain" 
        />
      </div>
      <span
        className="text-[13px] transition-colors duration-150"
        style={{ color: hover ? "var(--color-text)" : "var(--color-text-secondary)" }}
      >
        {name}
      </span>
    </div>
  );
}

export default function TechStack() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.03,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 4 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section 
      id="stack"
      className="relative section-padding overflow-hidden"
      style={{ scrollMarginTop: "80px" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      
      <div className="relative container-content">
        <AnimatedSection>
          <SectionHeading
            label="STACK"
            title="Tools I work with"
          />
        </AnimatedSection>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4"
          variants={containerVariants}
          initial={shouldReduceMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {STACK.map((row) => (
            <motion.div
              key={row.label}
              variants={cardVariants}
              className={`flex flex-col p-6 h-full ${row.spanClass}`}
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "12px",
              }}
            >
              {/* Card Header */}
              <div className="mb-4 shrink-0">
                <span
                  className="font-mono text-[12px] uppercase"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {row.label}
                </span>
              </div>

              {/* Tiles Grid */}
              <div className={`grid grid-cols-3 ${row.colsClass} gap-3 w-full mt-auto`}>
                {row.items.map((item) => (
                  <motion.div key={item.name} variants={itemVariants}>
                    <ToolItem {...item} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
