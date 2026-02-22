interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div className={`mb-16 md:mb-20 ${align === "center" ? "text-center" : ""}`}>
      <div className={`flex items-center gap-3 mb-5 ${align === "center" ? "justify-center" : ""}`}>
        <div className="h-px w-8 bg-accent/50" />
        <span className="text-accent font-mono text-xs sm:text-sm tracking-[0.2em] uppercase">
          {label}
        </span>
        <div className="h-px w-8 bg-accent/50" />
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 tracking-tight leading-tight">
        {title}
      </h2>
      {description && (
        <p className={`text-text-secondary text-base md:text-lg leading-relaxed ${align === "center" ? "max-w-2xl mx-auto" : "max-w-xl"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
