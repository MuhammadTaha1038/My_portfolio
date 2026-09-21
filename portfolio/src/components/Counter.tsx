"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export default function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  const shouldReduceMotion = useReducedMotion();
  
  // Regex to match numbers (with optional commas/decimals) and optional text suffix
  const match = value.match(/^([\d.,]+)(.*)$/);
  const isNumeric = match !== null;
  
  const numValue = isNumeric ? parseFloat(match[1].replace(/,/g, '')) : 0;
  const suffix = isNumeric ? match[2] : "";
  const hasDecimals = match && match[1].includes('.');

  const [display, setDisplay] = useState(
    isNumeric && !shouldReduceMotion ? `0${suffix}` : value
  );

  useEffect(() => {
    if (!isNumeric || shouldReduceMotion) return;
    
    if (inView) {
      import("framer-motion").then(({ animate }) => {
        animate(0, numValue, {
          duration: 0.8,
          ease: "easeOut",
          onUpdate: (v) => {
            const formatted = hasDecimals ? v.toFixed(1) : Math.floor(v).toString();
            setDisplay(formatted + suffix);
          }
        });
      });
    }
  }, [inView, isNumeric, numValue, suffix, shouldReduceMotion, hasDecimals]);

  if (!isNumeric || shouldReduceMotion) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
