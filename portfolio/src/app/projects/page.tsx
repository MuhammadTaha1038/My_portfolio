import Projects from "@/components/Projects";

export const metadata = {
  title: "Projects & Case Studies",
  description: "Explore Muhammad Taha's latest ML, data science and backend engineering projects, with detailed case studies and technical breakdowns.",
  alternates: {
    canonical: "https://www.muhammadtahatech.me/projects",
  },
  openGraph: {
    title: "Projects & Case Studies | Muhammad Taha",
    description: "Explore Muhammad Taha's latest ML, data science and backend engineering projects.",
    url: "https://www.muhammadtahatech.me/projects",
  },
};


export default function ProjectsPage() {
  return (
    <main className="pt-24 min-h-screen">
      <Projects />
    </main>
  );
}
