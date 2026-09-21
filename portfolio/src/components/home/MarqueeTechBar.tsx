"use client";

const ALL_TECH = [
  { name: "AWS",         url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Python",      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "FastAPI",     url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "Next.js",     url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "PostgreSQL",  url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Docker",      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "TypeScript",  url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Redis",       url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Scikit-learn",url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
  { name: "Pandas",      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { name: "TensorFlow",  url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "React",       url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js",     url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "MongoDB",     url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Linux",       url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Prisma",      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
];

function TechItem({ name, url }: { name: string; url: string }) {
  return (
    <div
      className="group flex items-center gap-2.5 shrink-0 cursor-default"
      style={{ padding: "6px 16px" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt=""
        aria-hidden
        width={16}
        height={16}
        className="w-4 h-4 object-contain transition-opacity duration-200"
        style={{ opacity: 0.5 }}
        onMouseOver={(e) => ((e.target as HTMLImageElement).style.opacity = "1")}
        onMouseOut={(e) => ((e.target as HTMLImageElement).style.opacity = "0.5")}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
      <span
        className="text-xs font-mono whitespace-nowrap transition-colors duration-200"
        style={{ color: "var(--color-text-muted)" }}
      >
        {name}
      </span>
    </div>
  );
}

export default function MarqueeTechBar() {
  const ROW_1 = ALL_TECH.slice(0, 8);
  const ROW_2 = ALL_TECH.slice(8);

  return (
    <section
      aria-label="Technology stack"
      style={{
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        padding: "20px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Edge fade masks */}
      <div
        aria-hidden
        style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", zIndex: 2,
          background: "linear-gradient(to right, var(--color-surface), transparent)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", zIndex: 2,
          background: "linear-gradient(to left, var(--color-surface), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Animated rows — hidden when prefers-reduced-motion */}
      <div className="marquee-wrapper flex flex-col gap-3 motion-safe:block hidden">
        <div className="overflow-hidden">
          <div className="marquee-track marquee-left">
            {[...ROW_1, ...ROW_1].map((t, i) => <TechItem key={`r1-${i}`} {...t} />)}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track marquee-right">
            {[...ROW_2, ...ROW_2].map((t, i) => <TechItem key={`r2-${i}`} {...t} />)}
          </div>
        </div>
      </div>

      {/* Static fallback for prefers-reduced-motion */}
      <div
        className="motion-reduce:flex hidden container-content flex-wrap gap-x-4 gap-y-2 justify-center"
      >
        {ALL_TECH.map((t) => <TechItem key={t.name} {...t} />)}
      </div>
    </section>
  );
}
