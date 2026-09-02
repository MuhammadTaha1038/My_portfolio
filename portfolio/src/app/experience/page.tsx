import Experience from "@/components/Experience";

export const metadata = {
  title: "Experience",
  description: "My professional journey, roles, and career milestones.",
};

export default function ExperiencePage() {
  return (
    <main className="pt-24 min-h-screen">
      <Experience />
    </main>
  );
}
