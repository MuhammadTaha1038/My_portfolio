import AnimatedSection from "@/components/AnimatedSection";

const COMPANIES = [
  { name: "DataCamp", desc: "Data Science Platform", color: "#05c2de" },
  { name: "AWS", desc: "Cloud Infrastructure", color: "#FF9900" },
  { name: "Hostinger", desc: "Web Hosting", color: "#7E57C2" },
  { name: "MessageFlow", desc: "Messaging Automation", color: "#4CAF50" },
  { name: "SendGrid", desc: "Email Delivery", color: "#1A82E2" },
  { name: "Make.com", desc: "Workflow Automation", color: "#6B47FF" },
  { name: "Klaviyo", desc: "Marketing Platform", color: "#E8462C" },
  { name: "Cloudinary", desc: "Media Management", color: "#3448C5" },
];

function CompanyCard({ name, desc, color }: { name: string; desc: string; color: string }) {
  return (
    <div className="group relative glass-card rounded-2xl p-5 md:p-6 hover:border-white/20 transition-all duration-300 overflow-hidden cursor-default">
      <div className="relative">
        <div className="flex items-center gap-2.5 mb-2">
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: color }}
          />
          <span className="font-bold text-white text-sm md:text-base">
            {name}
          </span>
        </div>
        <p className="text-text-muted text-xs font-mono pl-5">{desc}</p>
      </div>
    </div>
  );
}

export default function LogoCloud() {
  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 section-elevated" />
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection className="text-center mb-14">
          <span className="text-xs font-mono text-accent tracking-[0.2em] uppercase mb-4 block">Ecosystem</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Platforms and tools I have worked with
          </h2>
          <p className="text-text-secondary text-base max-w-xl mx-auto">
            From cloud infrastructure to marketing automation — I operate across the full modern tech stack.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {COMPANIES.map((company) => (
              <CompanyCard
                key={company.name}
                name={company.name}
                desc={company.desc}
                color={company.color}
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}