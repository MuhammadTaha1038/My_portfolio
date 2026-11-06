"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeading from "../SectionHeading";

// Only using slugs/URLs that are confirmed to exist
const COMPANIES = [
  {
    name: "AWS",
    desc: "Cloud Infrastructure",
    iconUrl: "/logos/AWS.svg",
    color: "#FF9900",
    project: { name: "Market Pulse", link: "/projects" },
  },
  {
    name: "Hostinger",
    desc: "Web Hosting",
    iconUrl: "https://www.google.com/s2/favicons?domain=hostinger.com&sz=128",
    color: "#673DE6",
  },
  {
    name: "SendGrid",
    desc: "Email Delivery",
    iconUrl: "https://www.google.com/s2/favicons?domain=sendgrid.com&sz=128",
    color: "#1A82E2",
    project: { name: "Employee Survey Invitation System", link: "/projects" },
  },
  {
    name: "Make.com",
    desc: "Workflow Automation",
    iconUrl: "https://www.google.com/s2/favicons?domain=make.com&sz=128",
    color: "#6D00CC",
    project: { name: "Make.com E-Commerce Email Pipeline", link: "/projects" },
  },
  {
    name: "Klaviyo",
    desc: "Marketing Platform",
    iconUrl: "https://www.google.com/s2/favicons?domain=klaviyo.com&sz=128",
    color: "#2AA3BD",
    project: { name: "Make.com E-Commerce Email Pipeline", link: "/projects" },
  },
  {
    name: "MessageFlow",
    desc: "Messaging Automation",
    isMonogram: true,
    monogramLetter: "M",
    color: "#A3A3A3",
  },
  {
    name: "Cloudinary",
    desc: "Media Management",
    iconUrl: "https://cdn.simpleicons.org/cloudinary/3448C5",
    color: "#3448C5",
  },
];

function CompanyCard({
  name,
  desc,
  iconUrl,
  color,
  project,
  isMonogram,
  monogramLetter,
}: {
  name: string;
  desc: string;
  iconUrl?: string;
  color: string;
  project?: { name: string; link: string };
  isMonogram?: boolean;
  monogramLetter?: string;
}) {
  const [hover, setHover] = useState(false);

  const content = (
    <div
      className="group flex flex-col items-center text-center p-6 transition-all duration-150 hover:-translate-y-[2px] h-full w-full"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--color-surface-2)",
        border: "1px solid",
        borderColor: hover ? "var(--color-border-hover)" : "var(--color-border)",
        borderRadius: "12px",
        boxShadow: hover ? "var(--shadow-elevation)" : "none",
      }}
    >
      {/* Logo container - standardized 40x40 fixed height so all logos align on one horizontal line */}
      <div
        className="w-10 h-10 flex items-center justify-center shrink-0 mb-3"
        aria-hidden
      >
        {isMonogram ? (
          <div
            className="w-10 h-10 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-center font-bold font-mono text-base text-[var(--color-text-secondary)]"
          >
            {monogramLetter || "M"}
          </div>
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={iconUrl}
              alt={name}
              className="w-full h-full object-contain"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = "none";
                const dot = img.nextElementSibling as HTMLElement | null;
                if (dot) dot.style.display = "block";
              }}
            />
            {/* Fallback dot */}
            <span
              className="w-3 h-3 rounded-full shrink-0 hidden"
              style={{ backgroundColor: color }}
            />
          </>
        )}
      </div>

      {/* Content flex column with flex-1 so titles align and 'Used in' drops to bottom */}
      <div className="flex flex-col items-center flex-1 w-full justify-between">
        <div>
          <span
            className="font-semibold text-sm transition-colors duration-150 mb-1 block"
            style={{ color: hover ? "var(--color-text)" : "var(--color-text-secondary)" }}
          >
            {name}
          </span>
          <span className="text-xs text-[var(--color-text-secondary)] block">{desc}</span>
        </div>
        {project ? (
          <span className="text-[11px] text-[var(--color-text-muted)] mt-4 leading-tight max-w-[150px] block">
            Used in: {project.name}
          </span>
        ) : (
          <div className="h-0" />
        )}
      </div>
    </div>
  );

  if (project) {
    return (
      <Link href={project.link} className="block h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-xl">
        {content}
      </Link>
    );
  }

  return <div className="h-full w-full cursor-default">{content}</div>;
}

export default function LogoCloud() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 section-elevated" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      <div className="relative container-content">
        <AnimatedSection>
          <SectionHeading
            label="Ecosystem"
            title="Platforms I have worked with"
            description="Cloud, hosting, and external services I use in production"
          />
        </AnimatedSection>

        {/* 4 columns on large screens, equal tile heights, left-aligned last row */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full"
          variants={containerVariants}
          initial={shouldReduceMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {COMPANIES.map((company) => (
            <motion.div 
              key={company.name} 
              variants={itemVariants}
              className="h-full w-full"
            >
              <CompanyCard
                name={company.name}
                desc={company.desc}
                iconUrl={company.iconUrl}
                color={company.color}
                project={company.project}
                isMonogram={company.isMonogram}
                monogramLetter={company.monogramLetter}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}