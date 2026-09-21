"use client";

import AnimatedSection from "@/components/AnimatedSection";

// Using devicons + simple icons for official brand logos
// Only using slugs/URLs that are confirmed to exist
const COMPANIES = [
  {
    name: "DataCamp",
    desc: "Data Science Platform",
    iconUrl: "https://www.google.com/s2/favicons?domain=datacamp.com&sz=128",
    color: "#03ef62",
  },
  {
    name: "AWS",
    desc: "Cloud Infrastructure",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    color: "#FF9900",
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
  },
  {
    name: "Make.com",
    desc: "Workflow Automation",
    iconUrl: "https://www.google.com/s2/favicons?domain=make.com&sz=128",
    color: "#6D00CC",
  },
  {
    name: "Klaviyo",
    desc: "Marketing Platform",
    iconUrl: "https://www.google.com/s2/favicons?domain=klaviyo.com&sz=128",
    color: "#2AA3BD",
  },
  {
    name: "MessageFlow",
    desc: "Messaging Automation",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#4CAF50",
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
}: {
  name: string;
  desc: string;
  iconUrl: string;
  color: string;
}) {
  return (
    <div className="group relative glass-card rounded-2xl p-4 hover:border-white/15 transition-all duration-300 overflow-hidden cursor-default">
      <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative flex items-center gap-2.5 mb-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={iconUrl}
          alt={name}
          width={18}
          height={18}
          className="w-4.5 h-4.5 object-contain opacity-70 group-hover:opacity-100 transition-opacity shrink-0"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.style.display = "none";
            const dot = img.nextElementSibling as HTMLElement | null;
            if (dot) dot.style.display = "block";
          }}
        />
        {/* Fallback dot */}
        <span
          className="w-2 h-2 rounded-full shrink-0 hidden"
          style={{ backgroundColor: color }}
        />
        <span className="font-semibold text-white text-xs">{name}</span>
      </div>
      <p className="text-text-muted text-[10px] font-mono leading-tight pl-6">{desc}</p>
    </div>
  );
}

export default function LogoCloud() {
  return (
    <section className="relative py-14 md:py-16 overflow-hidden">
      <div className="absolute inset-0 section-elevated" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection className="mb-8">
          <p className="text-xs font-mono text-text-muted uppercase tracking-[0.2em]">
            Ecosystem - Platforms I have worked with
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {COMPANIES.map((company) => (
              <CompanyCard
                key={company.name}
                name={company.name}
                desc={company.desc}
                iconUrl={company.iconUrl}
                color={company.color}
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}