"use client";

const TECH_ROW_1 = [
  { name: "AWS", emoji: "??" },
  { name: "Python", emoji: "??" },
  { name: "FastAPI", emoji: "?" },
  { name: "Next.js", emoji: "?" },
  { name: "PostgreSQL", emoji: "??" },
  { name: "Docker", emoji: "??" },
  { name: "SendGrid", emoji: "??" },
  { name: "Prisma", emoji: "??" },
  { name: "Make.com", emoji: "??" },
  { name: "Klaviyo", emoji: "??" },
];

const TECH_ROW_2 = [
  { name: "Hostinger", emoji: "??" },
  { name: "MessageFlow", emoji: "??" },
  { name: "Scikit-learn", emoji: "??" },
  { name: "Pandas", emoji: "??" },
  { name: "TensorFlow", emoji: "??" },
  { name: "Redis", emoji: "??" },
  { name: "TypeScript", emoji: "??" },
  { name: "Cloudinary", emoji: "???" },
  { name: "JWT", emoji: "??" },
  { name: "REST APIs", emoji: "??" },
];

function TechPill({ name, emoji }: { name: string; emoji: string }) {
  return (
    <div className="flex items-center gap-2.5 px-5 py-2.5 mx-3 rounded-full border border-white/8 bg-white/[0.03] hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 cursor-default group shrink-0">
      <span className="text-base leading-none">{emoji}</span>
      <span className="text-sm font-medium text-text-secondary group-hover:text-white transition-colors whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export default function MarqueeTechBar() {
  return (
    <section className="relative py-10 overflow-hidden border-y border-white/[0.05]">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-[#06060a] to-black" />
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      <div className="relative flex flex-col gap-4 marquee-wrapper">
        <div className="overflow-hidden">
          <div className="marquee-track marquee-left">
            {[...TECH_ROW_1, ...TECH_ROW_1].map((tech, i) => (
              <TechPill key={`r1-${i}`} name={tech.name} emoji={tech.emoji} />
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track marquee-right">
            {[...TECH_ROW_2, ...TECH_ROW_2].map((tech, i) => (
              <TechPill key={`r2-${i}`} name={tech.name} emoji={tech.emoji} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
