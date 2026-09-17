import AnimatedSection from "@/components/AnimatedSection";

const COMPANIES = [
  { name: "DataCamp", desc: "Data Science Platform", slug: "datacamp", color: "#03ef62" },
  { name: "AWS", desc: "Cloud Infrastructure", slug: "amazonaws", color: "#FF9900" },
  { name: "Hostinger", desc: "Web Hosting", slug: "hostinger", color: "#673DE6" },
  { name: "MessageFlow", desc: "Messaging Automation", slug: "minutemailer", color: "#4CAF50" },
  { name: "SendGrid", desc: "Email Delivery", slug: "sendgrid", color: "#1A82E2" },
  { name: "Make.com", desc: "Workflow Automation", slug: "make", color: "#6D00CC" },
  { name: "Klaviyo", desc: "Marketing Platform", slug: "klaviyo", color: "#2AA3BD" },
  { name: "Cloudinary", desc: "Media Management", slug: "cloudinary", color: "#3448C5" },
];

function CompanyCard({
  name,
  desc,
  slug,
  color,
}: {
  name: string;
  desc: string;
  slug: string;
  color: string;
}) {
  const iconUrl = `https://cdn.simpleicons.org/${slug}`;

  return (
    <div className="group relative glass-card rounded-2xl p-5 hover:border-white/15 transition-all duration-300 overflow-hidden cursor-default">
      {/* Subtle top tint on hover */}
      <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative flex items-center gap-3 mb-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={iconUrl}
          alt={name}
          width={20}
          height={20}
          className="w-5 h-5 object-contain opacity-60 group-hover:opacity-90 transition-opacity shrink-0"
          onError={(e) => {
            // Fallback: show colored dot
            const img = e.target as HTMLImageElement;
            img.style.display = "none";
            const dot = img.nextElementSibling as HTMLElement;
            if (dot) dot.style.display = "block";
          }}
        />
        {/* Fallback dot (hidden by default) */}
        <span
          className="w-2 h-2 rounded-full shrink-0 hidden"
          style={{ backgroundColor: color }}
        />
        <span className="font-semibold text-white text-sm">{name}</span>
      </div>
      <p className="text-text-muted text-xs font-mono pl-8">{desc}</p>
    </div>
  );
}

export default function LogoCloud() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 section-elevated" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection className="mb-10">
          <p className="text-xs font-mono text-text-muted uppercase tracking-[0.2em]">Ecosystem</p>
          <h2 className="text-xl md:text-2xl font-semibold text-white mt-2">
            Platforms I have worked with
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {COMPANIES.map((company) => (
              <CompanyCard
                key={company.name}
                name={company.name}
                desc={company.desc}
                slug={company.slug}
                color={company.color}
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}