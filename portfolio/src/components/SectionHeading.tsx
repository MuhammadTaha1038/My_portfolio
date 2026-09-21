import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  viewAllLink?: string;
  viewAllText?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
  viewAllLink,
  viewAllText = "View all",
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
      <div className="flex flex-col items-start text-left">
        <p className="text-eyebrow mb-2">{label}</p>
        <h2 className="text-h2" style={{ color: "var(--color-text)" }}>
          {title}
        </h2>
        {description && (
          <p className="text-body max-w-xl mt-2">
            {description}
          </p>
        )}
      </div>
      {viewAllLink && (
        <Link href={viewAllLink} className="view-all-link shrink-0">
          {viewAllText} <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
        </Link>
      )}
    </div>
  );
}
