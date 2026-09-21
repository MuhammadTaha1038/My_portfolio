"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import SectionHeading from "../SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";

const STACK = [
  {
    label: "BACKEND",
    items: [
      { name: "Python", logo: "python", color: "#3776AB" },
      { name: "FastAPI", logo: "fastapi", color: "#009688" },
      { name: "Node.js", logo: "nodejs", color: "#339933" },
      { name: "TypeScript", logo: "typescript", color: "#3178C6" },
      { name: "Prisma", logo: "prisma", color: "var(--color-text)" },
    ],
  },
  {
    label: "DATA & ML",
    items: [
      { name: "scikit-learn", logo: "scikitlearn", color: "#F7931E" },
      { name: "Pandas", logo: "pandas", color: "var(--color-text)" },
      { name: "TensorFlow", logo: "tensorflow", color: "#FF6F00" },
    ],
  },
  {
    label: "DATABASES",
    items: [
      { name: "PostgreSQL", logo: "postgresql", color: "#336791" },
      { name: "MongoDB", logo: "mongodb", color: "#47A248" },
      { name: "Redis", logo: "redis", color: "#DC382D" },
    ],
  },
  {
    label: "INFRA",
    items: [
      { name: "Docker", logo: "docker", color: "#2496ED" },
      { name: "AWS", logo: "aws", color: "#FF9900" },
      { name: "Linux", logo: "linux", color: "#FCC624" },
    ],
  },
  {
    label: "FRONTEND",
    items: [
      { name: "Next.js", logo: "nextjs", color: "var(--color-text)" },
      { name: "React", logo: "react", color: "#61DAFB" },
    ],
  },
];

function ToolItem({ name, logo, color }: { name: string; logo: string; color: string }) {
  const [hover, setHover] = useState(false);
  
  return (
    <div
      className="flex items-center gap-2.5 cursor-default shrink-0"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="w-6 h-6 transition-colors duration-150"
        style={{
          WebkitMaskImage: `url(/logos/${logo}.svg)`,
          maskImage: `url(/logos/${logo}.svg)`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          backgroundColor: hover ? color : "var(--color-text-secondary)",
        }}
        aria-hidden
      />
      <span
        className="text-[15px] transition-colors duration-150"
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

  const rowVariants = {
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
    <section className="relative section-padding overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      
      <div className="relative container-content">
        <AnimatedSection>
          <SectionHeading
            label="STACK"
            title="Tools I work with"
          />
        </AnimatedSection>

        <motion.div
          className="overflow-hidden"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "12px",
          }}
          variants={containerVariants}
          initial={shouldReduceMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {STACK.map((row, i) => (
            <motion.div
              key={row.label}
              variants={rowVariants}
              className="flex flex-col md:flex-row px-6 py-5"
              style={{
                borderBottom: i === STACK.length - 1 ? "none" : "1px solid var(--color-border)",
              }}
            >
              {/* Left Column (Label) */}
              <div className="md:w-[120px] lg:w-[160px] shrink-0 mb-4 md:mb-0 flex items-center">
                <span
                  className="font-mono text-[12px] uppercase"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {row.label}
                </span>
              </div>

              {/* Right Column (Items) */}
              <div className="grid grid-cols-2 md:flex md:flex-wrap gap-x-8 gap-y-5 w-full items-center">
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
