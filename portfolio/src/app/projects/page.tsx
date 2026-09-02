import Projects from "@/components/Projects";

export const metadata = {
  title: "Projects & Case Studies",
  description: "Explore my latest projects, case studies, and technical achievements.",
};

export default function ProjectsPage() {
  return (
    <main className="pt-24 min-h-screen">
      <Projects />
    </main>
  );
}
