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
    <div className={`section-header ${align === "center" ? "text-center items-center" : "items-start"}`}>
      <p className="text-eyebrow">{label}</p>
      <h2 className="text-h2" style={{ color: "var(--color-text)" }}>
        {title}
      </h2>
      {description && (
        <p className={`text-body ${align === "center" ? "max-w-2xl text-center" : "max-w-xl"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
