"use client";

// Using Simple Icons CDN for logos — free, official brand SVGs
const TECH_ROW_1 = [
  { name: "AWS", slug: "amazonaws", color: "#FF9900" },
  { name: "Python", slug: "python", color: "#3776AB" },
  { name: "FastAPI", slug: "fastapi", color: "#009688" },
  { name: "Next.js", slug: "nextdotjs", color: "#ffffff" },
  { name: "PostgreSQL", slug: "postgresql", color: "#4169E1" },
  { name: "Docker", slug: "docker", color: "#2496ED" },
  { name: "SendGrid", slug: "sendgrid", color: "#1A82E2" },
  { name: "Prisma", slug: "prisma", color: "#ffffff" },
  { name: "Make.com", slug: "make", color: "#6D00CC" },
  { name: "Klaviyo", slug: "klaviyo", color: "#2AA3BD" },
];

const TECH_ROW_2 = [
  { name: "Scikit-learn", slug: "scikitlearn", color: "#F7931E" },
  { name: "TypeScript", slug: "typescript", color: "#3178C6" },
  { name: "Redis", slug: "redis", color: "#FF4438" },
  { name: "Pandas", slug: "pandas", color: "#150458" },
  { name: "TensorFlow", slug: "tensorflow", color: "#FF6F00" },
  { name: "Cloudinary", slug: "cloudinary", color: "#3448C5" },
  { name: "JWT", slug: "jsonwebtokens", color: "#ffffff" },
  { name: "GitHub", slug: "github", color: "#ffffff" },
  { name: "Hostinger", slug: "hostinger", color: "#673DE6" },
  { name: "Vercel", slug: "vercel", color: "#ffffff" },
];

function TechPill({ name, slug, color }: { name: string; slug: string; color: string }) {
  const iconUrl = `https://cdn.simpleicons.org/${slug}`;

  return (
    <div className="flex items-center gap-2.5 px-4 py-2 mx-2.5 rounded-full border border-white/6 bg-white/[0.025] hover:border-white/20 hover:bg-white/5 transition-all duration-300 cursor-default group shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={iconUrl}
        alt={name}
        width={16}
        height={16}
        className="w-4 h-4 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
        style={{ filter: color === "#ffffff" ? "brightness(2)" : "none" }}
        onError={(e) => {
          // Fallback: hide the broken image
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
    <section className="relative py-8 overflow-hidden border-y border-white/[0.04]">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-[#06060a] to-black" />
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="relative flex flex-col gap-3 marquee-wrapper">
        <div className="overflow-hidden">
          <div className="marquee-track marquee-left">
            {[...TECH_ROW_1, ...TECH_ROW_1].map((tech, i) => (
              <TechPill key={`r1-${i}`} name={tech.name} slug={tech.slug} color={tech.color} />
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track marquee-right">
            {[...TECH_ROW_2, ...TECH_ROW_2].map((tech, i) => (
              <TechPill key={`r2-${i}`} name={tech.name} slug={tech.slug} color={tech.color} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
