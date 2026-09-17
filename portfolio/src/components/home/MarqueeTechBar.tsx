"use client";

// Devicons CDN for tech icons - much broader coverage than Simple Icons
// Format: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{name}/{name}-original.svg
// Simple Icons for brand/service logos that aren't in devicons
const TECH_ROW_1 = [
  { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "FastAPI", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Prisma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
  { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Redis", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Vercel", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
];

const TECH_ROW_2 = [
  { name: "Scikit-learn", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
  { name: "Pandas", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { name: "TensorFlow", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "GitHub", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Linux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "JWT", url: "https://cdn.simpleicons.org/jsonwebtokens/ffffff" },
  { name: "Cloudinary", url: "https://cdn.simpleicons.org/cloudinary/3448C5" },
];

function TechPill({ name, url }: { name: string; url: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 mx-2 rounded-full border border-white/6 bg-white/[0.025] hover:border-white/20 hover:bg-white/5 transition-all duration-300 cursor-default group shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={name}
        width={14}
        height={14}
        className="w-3.5 h-3.5 object-contain opacity-60 group-hover:opacity-100 transition-opacity"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
      <span className="text-xs font-medium text-text-muted group-hover:text-white transition-colors whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export default function MarqueeTechBar() {
  return (
    <section className="relative py-7 overflow-hidden border-y border-white/[0.04]">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-[#06060a] to-black" />
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="relative flex flex-col gap-3 marquee-wrapper">
        <div className="overflow-hidden">
          <div className="marquee-track marquee-left">
            {[...TECH_ROW_1, ...TECH_ROW_1].map((tech, i) => (
              <TechPill key={`r1-${i}`} name={tech.name} url={tech.url} />
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track marquee-right">
            {[...TECH_ROW_2, ...TECH_ROW_2].map((tech, i) => (
              <TechPill key={`r2-${i}`} name={tech.name} url={tech.url} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
